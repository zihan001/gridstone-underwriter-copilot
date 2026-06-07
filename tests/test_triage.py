"""
§1 — the triage classifier (domain/triage.py).

Triage is a queue-level disposition over a FINISHED memo: green (file it) / yellow (a human
should look) / red (evidence can't defend a range). It computes no valuation — it reads the
core's already-computed confidence band/score and fired flags and classifies them.

Per the repo's "never hand-construct" principle, every fixture starts from REAL pipeline
output (run(use_llm=False)) and is nudged with model_copy — flipping a flag's status or the
confidence band — so the Flag detail text and ConfidenceBreakdown shape stay authentic.

The load-bearing assertion is the AIC stance: a TOLERANCE breach alone NEVER forces RED.
"""

from __future__ import annotations

import pytest

from kvcomp.domain.triage import triage
from kvcomp.pipeline import run
from kvcomp.schemas.results import FlagCode, FlagStatus, Severity, TriageVerdict


@pytest.fixture(autouse=True)
def _no_api_key(monkeypatch):
    monkeypatch.delenv("ANTHROPIC_API_KEY", raising=False)


@pytest.fixture
def base():
    """A real, fully-computed memo (the South hero). Naturally lands YELLOW."""
    return run(use_llm=False).memo


def _with_band(memo, band):
    return memo.model_copy(
        update={"confidence": memo.confidence.model_copy(update={"band": band})})


def _with_fired(memo, fired_codes):
    """Return a copy where exactly `fired_codes` are FIRED and every other flag is CLEAR.
    The full 14-flag registry is emitted each run, so any code can be addressed."""
    codes = set(fired_codes)
    flags = [f.model_copy(update={
        "status": FlagStatus.FIRED if f.code in codes else FlagStatus.CLEAR})
        for f in memo.flags]
    return memo.model_copy(update={"flags": flags})


def _fired_details(memo):
    return [f.detail for f in memo.flags if f.status == FlagStatus.FIRED]


# --- one memo per bucket ----------------------------------------------------
def test_green_bucket(base):
    memo = _with_band(_with_fired(base, set()), "MODERATE")
    res = triage(memo)
    assert res.verdict == TriageVerdict.GREEN
    assert res.reason == "MODERATE; no review flags"
    assert res.review_flag_count == 0


def test_yellow_bucket(base):
    # The hero as-is: MODERATE band with review-severity flags fired -> YELLOW.
    res = triage(base)
    assert res.verdict == TriageVerdict.YELLOW
    assert res.review_flag_count >= 1
    assert res.reason


def test_red_bucket(base):
    memo = _with_fired(base, {FlagCode.THIN_COMP_SET})
    res = triage(memo)
    assert res.verdict == TriageVerdict.RED


# --- boundaries -------------------------------------------------------------
def test_single_tolerance_breach_on_clean_moderate_is_green(base):
    """AIC stance, part 1: one tolerance breach + otherwise-clean MODERATE -> GREEN."""
    memo = _with_band(_with_fired(base, {FlagCode.NET_ADJ_BREACH}), "MODERATE")
    res = triage(memo)
    assert res.verdict == TriageVerdict.GREEN


def test_two_tolerance_breaches_is_yellow(base):
    memo = _with_band(
        _with_fired(base, {FlagCode.NET_ADJ_BREACH, FlagCode.GROSS_ADJ_BREACH}), "MODERATE")
    res = triage(memo)
    assert res.verdict == TriageVerdict.YELLOW


def test_tolerance_breaches_alone_never_force_red(base):
    """AIC stance, part 2 (the locked invariant): tolerance breaches are commentary triggers,
    not fails — even all three, even on a HIGH band, must NOT be RED."""
    memo = _with_band(
        _with_fired(base, {FlagCode.NET_ADJ_BREACH, FlagCode.GROSS_ADJ_BREACH,
                           FlagCode.LINE_ADJ_BREACH}), "HIGH")
    res = triage(memo)
    assert res.verdict != TriageVerdict.RED
    assert res.verdict == TriageVerdict.YELLOW  # >=2 tolerance -> yellow, never red


def test_value_outside_range_forces_red_regardless_of_band(base):
    memo = _with_band(_with_fired(base, {FlagCode.VALUE_OUTSIDE_RANGE}), "HIGH")
    res = triage(memo)
    assert res.verdict == TriageVerdict.RED


def test_low_band_alone_is_red_with_band_reason(base):
    memo = _with_band(_with_fired(base, set()), "LOW")
    res = triage(memo)
    assert res.verdict == TriageVerdict.RED
    assert res.reason == "LOW; no review flags"


# --- reason provenance + sort keys ------------------------------------------
def test_reason_is_nonempty_and_derived_from_a_real_flag_detail(base):
    res = triage(base)
    assert res.reason
    # The reason is built by joining real flag details; at least one fired flag's detail
    # text must appear verbatim in it (triage writes no prose of its own).
    assert any(detail in res.reason for detail in _fired_details(base))


def test_review_flag_count_counts_only_fired_review_flags(base):
    expected = sum(1 for f in base.flags
                   if f.status == FlagStatus.FIRED and f.severity == Severity.REVIEW)
    assert triage(base).review_flag_count == expected


def test_score_is_the_memo_confidence_score(base):
    assert triage(base).score == base.confidence.score
