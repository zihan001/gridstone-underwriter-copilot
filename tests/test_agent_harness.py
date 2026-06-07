"""
Phase 0 — the agent HARNESS invariant (narrative/agent.py).

The harness is generic: it drives a tool-use loop and returns prose + a trace. With no
ANTHROPIC_API_KEY it must skip the loop and return the caller's deterministic fallback
string with an EMPTY trace (mirroring narrative/llm.py). It must never mutate its inputs,
and it derives tool schemas from the callables' signatures.
"""

from __future__ import annotations

import pytest

from kvcomp.narrative.agent import ToolCall, _one_line, _tool_schema, run_agent


@pytest.fixture(autouse=True)
def _no_api_key(monkeypatch):
    # The whole suite runs key-less: assert the deterministic fallback path explicitly.
    monkeypatch.delenv("ANTHROPIC_API_KEY", raising=False)


def _sample_tool(address: str, recent: bool = False) -> str:
    """Echo tool used only for schema-shape assertions."""
    return f"{address}:{recent}"


def test_no_key_returns_fallback_string_and_empty_trace():
    text, trace = run_agent("sys", {"echo": _sample_tool}, "do it", fallback="DETERMINISTIC")
    assert text == "DETERMINISTIC"
    assert trace == []
    assert isinstance(text, str)


def test_fallback_may_be_a_callable():
    calls = {"n": 0}

    def make() -> str:
        calls["n"] += 1
        return "LAZY"

    text, trace = run_agent("sys", {}, "task", fallback=make)
    assert text == "LAZY"
    assert trace == []
    assert calls["n"] == 1


def test_tools_are_never_invoked_on_the_fallback_path():
    touched = {"hit": False}

    def mutating_tool(x: str) -> str:
        touched["hit"] = True
        return x

    text, trace = run_agent("sys", {"t": mutating_tool}, "task", fallback="FB")
    assert text == "FB"
    assert touched["hit"] is False  # no tool ran without a key


def test_tool_schema_derives_from_signature():
    schema = _tool_schema("echo", _sample_tool)
    assert schema["name"] == "echo"
    assert schema["description"].startswith("Echo tool")
    props = schema["input_schema"]["properties"]
    assert props["address"]["type"] == "string"
    assert props["recent"]["type"] == "boolean"   # bool annotation -> boolean
    # `address` has no default -> required; `recent` has a default -> optional.
    assert schema["input_schema"]["required"] == ["address"]


def test_toolcall_is_a_named_triple():
    tc = ToolCall("geocode", {"address": "x"}, "ok")
    assert tc == ("geocode", {"address": "x"}, "ok")   # tuple-shaped
    assert tc.tool_name == "geocode" and tc.result_summary == "ok"


def test_one_line_collapses_and_caps():
    assert _one_line("a\n  b\t c") == "a b c"
    assert len(_one_line("x" * 1000)) <= 160
