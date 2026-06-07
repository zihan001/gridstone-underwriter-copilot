"""
Phase 3 — the agent trace reaches the viewer payload, render-only and additive.

Asserts: (1) without agents the serializer output is unchanged (no agentTrace key); (2)
run_with_agents brackets the pipeline and trace_to_window yields the documented shape; (3)
the serializer splices agentTrace in; (4) driving the hero through the demo blurb leaves every
underwriting number byte-identical to the subject-driven path (the blurb round-trips).
"""

from __future__ import annotations

import json

import pytest

from kvcomp.data.subject_loader import default_subject
from kvcomp.narrative.orchestrator import demo_listing, run_with_agents, trace_to_window
from kvcomp.pipeline import run
from kvcomp.serialize.memo_to_window import build_window


@pytest.fixture(autouse=True)
def _no_api_key(monkeypatch):
    monkeypatch.delenv("ANTHROPIC_API_KEY", raising=False)


def test_no_agent_trace_key_on_the_plain_path():
    window = build_window(run(use_llm=False))
    assert "agentTrace" not in window      # additive: unchanged when no agents bracket the run


def test_run_with_agents_brackets_pipeline_and_traces():
    subject = default_subject()
    result, trace = run_with_agents(listing=demo_listing(subject), effective_date=subject.effective_date)
    tw = trace_to_window(trace)
    assert set(tw) == {"intake", "sensitivity"}
    for key, prose in (("intake", "reasoning"), ("sensitivity", "note")):
        block = tw[key]
        assert block["source"] == "deterministic"
        assert isinstance(block[prose], str) and block[prose]
        assert block["calls"] and all({"name", "args", "result"} <= set(c) for c in block["calls"])


def test_serializer_splices_agent_trace():
    subject = default_subject()
    result, trace = run_with_agents(listing=demo_listing(subject), effective_date=subject.effective_date)
    window = build_window(result, trace_to_window(trace))
    assert "agentTrace" in window
    assert window["agentTrace"]["intake"]["calls"][0]["name"] == "lookup_open_calgary"


def test_demo_blurb_round_trips_numbers_byte_identical():
    subject = default_subject()
    result, _ = run_with_agents(listing=demo_listing(subject), effective_date=subject.effective_date)
    w_agents = build_window(result)                       # agent-driven subject
    w_plain = build_window(run(subject, use_llm=False))   # subject-driven directly
    assert json.dumps(w_agents, sort_keys=True) == json.dumps(w_plain, sort_keys=True)
