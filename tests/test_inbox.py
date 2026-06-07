"""
§1 — the inbox deals + the shared planted-reject scaffold (data/inbox.py, scenario.reject_scaffold).

The grade-critical regression guard: comp selection/rejection is the product's highest-value domain
beat, and it must be VISIBLE on every deal. Each deal's universe is the shared 5-reject scaffold
plus a per-flavor survivor set, so every row carries reason-coded rejections and the bucket it lands
in is steered by the survivors alone. These tests lock that contract:

  * every deal surfaces ≥ 4 reason-coded rejects (rejection is never invisible — the regression guard
    for the bug where 11 of 12 deals showed 0 rejected);
  * the inbox as a whole exercises all five reason codes;
  * the emergent triage spread is exactly the locked 4 GREEN / 5 YELLOW / 3 RED trio;
  * at most one red is a thin-comp-set red (the others are band/spread-driven, not starvation).
"""

from __future__ import annotations

from collections import Counter

import pytest

from kvcomp.data.inbox import inbox
from kvcomp.domain.triage import triage
from kvcomp.pipeline import run
from kvcomp.schemas.results import FlagCode, FlagStatus, ReasonCode

_ALL_REASON_CODES = {c.value for c in ReasonCode}
_LOCKED_SPREAD = {"green": 4, "yellow": 5, "red": 3}


@pytest.fixture(autouse=True)
def _no_api_key(monkeypatch):
    # Triage verdicts and rejections are LLM-independent; keep the template path for speed.
    monkeypatch.delenv("ANTHROPIC_API_KEY", raising=False)


@pytest.fixture(scope="module")
def memos():
    """(deal, memo, triage) for every inbox deal, run through the unchanged core once."""
    out = []
    for deal in inbox():
        memo = run(deal.subject, candidates=deal.candidates).memo
        out.append((deal, memo, triage(memo)))
    return out


def test_every_deal_surfaces_at_least_four_reason_coded_rejects(memos):
    """The grade-critical guard: rejection is visible on EVERY deal — no row shows a starved
    feed of zero rejects. Each reject also carries a machine-checkable reason code."""
    for deal, memo, _ in memos:
        codes = {r.reason_code.value for r in memo.rejected}
        assert len(memo.rejected) >= 4, f"{deal.id} shows only {len(memo.rejected)} rejects"
        assert len(codes) >= 4, f"{deal.id} shows only {len(codes)} distinct reason codes: {codes}"


def test_inbox_exercises_all_five_reason_codes(memos):
    """Across the queue, the shared scaffold drives all five closed-enum reason codes."""
    seen = {r.reason_code.value for _, memo, _ in memos for r in memo.rejected}
    assert seen == _ALL_REASON_CODES, f"missing reason codes: {_ALL_REASON_CODES - seen}"


def test_triage_spread_is_the_locked_trio(memos):
    """The emergent spread is exactly 4 GREEN / 5 YELLOW / 3 RED — the demo only lands if the
    queue spans all three buckets in the locked proportions."""
    spread = Counter(t.verdict.value for _, _, t in memos)
    assert dict(spread) == _LOCKED_SPREAD, f"spread drifted to {dict(spread)}"


def test_at_most_one_thin_comp_set_red(memos):
    """A thin set ('couldn't find comps') is the weakest red story, so at most one red may be a
    THIN_COMP_SET red; the other reds are band/spread-driven (a defensible underwriting reason)."""
    thin_reds = 0
    for _, memo, t in memos:
        if t.verdict.value != "red":
            continue
        thin_fired = any(f.code == FlagCode.THIN_COMP_SET and f.status == FlagStatus.FIRED
                         for f in memo.flags)
        thin_reds += int(thin_fired)
    assert thin_reds <= 1, f"{thin_reds} reds are thin-comp-set reds (expected at most 1)"
