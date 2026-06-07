"""
The CORE INVARIANT under agents (acceptance gate).

The two agents bracket the pipeline but never compute a number that enters the result. This
test proves it at the serialized boundary: for every demo case, the window.MEMO payload with
agents ENABLED is byte-identical to the agents-DISABLED payload once the additive, render-only
`agentTrace` block is removed. Enabling the agents can ONLY add the trace — it can change no
underwriting number.

Also asserts the sensitivity probe does not mutate the finished memo.
"""

from __future__ import annotations

import json

import pytest

from kvcomp.data.subject_loader import demo_subjects
from kvcomp.narrative.orchestrator import demo_listing, run_with_agents, trace_to_window
from kvcomp.narrative.sensitivity_agent import run_sensitivity
from kvcomp.pipeline import run
from kvcomp.serialize.memo_to_window import build_window

CASES = ["south", "east", "west"]


@pytest.fixture(autouse=True)
def _no_api_key(monkeypatch):
    monkeypatch.delenv("ANTHROPIC_API_KEY", raising=False)


@pytest.mark.parametrize("case", CASES)
def test_core_numbers_byte_identical_with_agents_enabled_vs_disabled(case):
    subject = demo_subjects()[case]

    # agents DISABLED: the subject drives the pipeline directly.
    disabled = build_window(run(subject, use_llm=False))

    # agents ENABLED: intake (before) + sensitivity (after) bracket the same pipeline.
    result, trace = run_with_agents(listing=demo_listing(subject), effective_date=subject.effective_date)
    enabled = build_window(result, trace_to_window(trace))

    # The ONLY difference is the additive, render-only agentTrace block.
    assert "agentTrace" in enabled and "agentTrace" not in disabled
    enabled_core = {k: v for k, v in enabled.items() if k != "agentTrace"}
    assert json.dumps(enabled_core, sort_keys=True) == json.dumps(disabled, sort_keys=True), (
        f"{case}: enabling the agents changed a core number"
    )


@pytest.mark.parametrize("case", CASES)
def test_sensitivity_probe_does_not_mutate_the_memo(case):
    baseline = run(demo_subjects()[case], use_llm=False)
    before = json.dumps(build_window(baseline), sort_keys=True)
    run_sensitivity(baseline)              # probe re-runs the core in isolation
    after = json.dumps(build_window(baseline), sort_keys=True)
    assert before == after                 # the delivered valuation is untouched
