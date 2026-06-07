"""
Phase 2 — the sensitivity prober (narrative/sensitivity_agent.py).

The agent stress-tests a FINISHED valuation. These tests run key-less (deterministic probe
path). They assert: (1) each tool re-invokes the core and returns deterministic output;
(2) the agent produces a prose note + trace; (3) running the agent does NOT change the
baseline memo's numbers; (4) leave-one-out actually exercises the core (a known comp drops).
"""

from __future__ import annotations

import pytest

from kvcomp.narrative.sensitivity_agent import build_sensitivity_tools, run_sensitivity
from kvcomp.pipeline import run


@pytest.fixture(autouse=True)
def _no_api_key(monkeypatch):
    monkeypatch.delenv("ANTHROPIC_API_KEY", raising=False)


@pytest.fixture
def baseline():
    return run(use_llm=False)


def test_tools_are_deterministic(baseline):
    tools = build_sensitivity_tools(baseline)
    a = tools["rerun_with_profile"](profile="gse_on")
    b = tools["rerun_with_profile"](profile="gse_on")
    assert a == b                      # same input -> byte-identical core output
    assert "point" in a and "$" in a   # quotes core-computed dollars


def test_profile_flip_preserves_value_but_is_reported(baseline):
    tools = build_sensitivity_tools(baseline)
    out = tools["rerun_with_profile"](profile="gse_on")
    # Lender profile is informational: the point value must not move under a profile flip.
    bv = baseline.memo.value_range
    assert f"point ${bv.point:,.0f} -> ${bv.point:,.0f}" in out


def test_leave_one_out_invokes_the_core(baseline):
    tools = build_sensitivity_tools(baseline)
    comp_id = baseline.memo.selected[0].comp.comp_id
    out = tools["recompute_dropping_comp"](comp_id=comp_id)
    assert f"dropping comp {comp_id}" in out
    # A bogus id changes nothing and is reported as such.
    none = tools["recompute_dropping_comp"](comp_id="NOPE-999")
    assert "nothing dropped" in none


def test_agent_produces_prose_note_and_trace(baseline):
    res = run_sensitivity(baseline)
    assert res.source == "deterministic"
    assert isinstance(res.note, str) and len(res.note) > 80
    assert res.trace                                   # probes were recorded
    names = {tc.tool_name for tc in res.trace}
    assert "rerun_with_profile" in names
    assert "recompute_dropping_comp" in names


def test_running_the_agent_does_not_change_core_numbers(baseline):
    before = (baseline.memo.value_range.low, baseline.memo.value_range.point,
              baseline.memo.value_range.high, baseline.memo.confidence.score)
    run_sensitivity(baseline)
    after = (baseline.memo.value_range.low, baseline.memo.value_range.point,
             baseline.memo.value_range.high, baseline.memo.confidence.score)
    assert before == after        # the probe never mutates the delivered valuation
