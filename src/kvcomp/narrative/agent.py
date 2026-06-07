"""
narrative/agent.py — a tiny, generic Anthropic tool-use loop (the agent HARNESS).

This is the shared spine for the two bracketing agents (intake before the pipeline,
sensitivity after). It deliberately knows NOTHING about subjects, memos, or domain math:
it drives a tool-use conversation and returns prose + a trace of the tool calls made.

INVARIANT SUPPORT. The harness never authors a number that enters a result:
  * Tools are supplied by the caller as plain Python callables. Whatever a tool computes,
    it computes in deterministic Python (reading grounded data or re-invoking the core);
    the model only *chooses which tool to call with which arguments*.
  * The model's textual output is prose only. Callers that need structured data read it
    from the side effects of their own tools, never by parsing numbers out of `final_text`.
  * No key (or any failure) → the loop is skipped and the caller's deterministic `fallback`
    string is returned with an empty trace, mirroring narrative/llm.py. The system stays
    fully functional with the LLM disabled.

Public surface:
    run_agent(system_prompt, tools, task, *, fallback, ...) -> (final_text, trace)
    ToolCall = (tool_name, args, result_summary)
"""

from __future__ import annotations

import inspect
import os
from typing import Callable, NamedTuple

_DEFAULT_MODEL = "claude-sonnet-4-20250514"
_ANTHROPIC_URL = "https://api.anthropic.com/v1/messages"
_MAX_TURNS = 8           # bounds cost: at most this many model round-trips per agent run
_SUMMARY_CHARS = 400     # one-line trace summary cap (fits a full per-scenario delta line)


class ToolCall(NamedTuple):
    """One tool invocation the agent made, recorded for the audit trace panel."""
    tool_name: str
    args: dict
    result_summary: str


def run_agent(
    system_prompt: str,
    tools: dict[str, Callable[..., object]],
    task: str,
    *,
    fallback: str | Callable[[], str],
    model: str | None = None,
    max_turns: int = _MAX_TURNS,
) -> tuple[str, list[ToolCall]]:
    """Drive a tool-use loop and return (final prose, trace).

    `fallback` is the caller's deterministic text used verbatim when no API key is set or
    anything goes wrong — the harness never fabricates prose of its own. Returns an empty
    trace on the fallback path.

    A callable `fallback` is evaluated LAZILY — only at the moment it is actually returned.
    This matters when the fallback reads state the tool loop mutates (e.g. intake's reasoning
    is derived from a ledger the tools populate): computing it eagerly would snapshot that
    state while it is still empty. It also avoids paying for an expensive fallback when the
    model succeeds.
    """
    fb = lambda: (fallback() if callable(fallback) else fallback)  # noqa: E731 — lazy on purpose
    key = os.environ.get("ANTHROPIC_API_KEY", "").strip()
    if not key:
        return fb(), []
    try:
        text, trace = _run_loop(system_prompt, tools, task, key=key,
                                model=model, max_turns=max_turns)
        # If the model never produced closing prose, prefer the deterministic fallback
        # text but keep the (real) trace of tool calls that did happen.
        return (text or fb()), trace
    except Exception:
        # Reliability over cleverness: any failure degrades to the deterministic fallback.
        return fb(), []


def _run_loop(
    system_prompt: str,
    tools: dict[str, Callable[..., object]],
    task: str,
    *,
    key: str,
    model: str | None,
    max_turns: int,
) -> tuple[str, list[ToolCall]]:
    import httpx  # lazy import so the core has no hard runtime dep on the network stack

    model = (model or os.environ.get("KVCOMP_LLM_MODEL", _DEFAULT_MODEL)).strip() or _DEFAULT_MODEL
    schemas = [_tool_schema(name, fn) for name, fn in tools.items()]
    headers = {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
    }
    messages: list[dict] = [{"role": "user", "content": task}]
    trace: list[ToolCall] = []

    for _ in range(max_turns):
        payload = {
            "model": model,
            "max_tokens": 1500,
            "system": system_prompt,
            "tools": schemas,
            "messages": messages,
        }
        resp = httpx.post(_ANTHROPIC_URL, headers=headers, json=payload, timeout=45.0)
        resp.raise_for_status()
        data = resp.json()
        content = data.get("content", []) or []
        messages.append({"role": "assistant", "content": content})

        if data.get("stop_reason") != "tool_use":
            text = "".join(b.get("text", "") for b in content if b.get("type") == "text")
            return text.strip(), trace

        # Execute every requested tool, record the trace, feed results back.
        results = []
        for block in content:
            if block.get("type") != "tool_use":
                continue
            name = block.get("name", "")
            args = block.get("input", {}) or {}
            output = _invoke_tool(tools, name, args)
            trace.append(ToolCall(name, args, _one_line(output)))
            results.append({"type": "tool_result", "tool_use_id": block.get("id"), "content": output})
        messages.append({"role": "user", "content": results})

    # Turns exhausted without a closing message — return what we have (caller falls back).
    return "", trace


def _invoke_tool(tools: dict[str, Callable[..., object]], name: str, args: dict) -> str:
    """Run one tool, always returning a string for the model to read (errors included)."""
    fn = tools.get(name)
    if fn is None:
        return f"error: unknown tool '{name}'"
    try:
        return str(fn(**args))
    except Exception as exc:  # surface tool errors to the model rather than crashing the loop
        return f"error: {type(exc).__name__}: {exc}"


def _tool_schema(name: str, fn: Callable[..., object]) -> dict:
    """Derive an Anthropic tool schema from a callable's signature + docstring.

    The function signature IS the contract — annotations map to JSON-Schema types and
    parameters without defaults are required. No parallel schema to drift.
    """
    sig = inspect.signature(fn)
    props: dict[str, dict] = {}
    required: list[str] = []
    for pname, p in sig.parameters.items():
        if p.kind in (inspect.Parameter.VAR_POSITIONAL, inspect.Parameter.VAR_KEYWORD):
            continue
        props[pname] = {"type": _json_type(p.annotation)}
        if p.default is inspect.Parameter.empty:
            required.append(pname)
    return {
        "name": name,
        "description": (inspect.getdoc(fn) or "").strip(),
        "input_schema": {"type": "object", "properties": props, "required": required},
    }


def _json_type(annotation: object) -> str:
    # `from __future__ import annotations` in a tool's module makes annotations strings
    # (e.g. "bool"), so accept both the type objects and their names.
    by_type = {bool: "boolean", int: "integer", float: "number"}
    by_name = {"bool": "boolean", "int": "integer", "float": "number"}
    if isinstance(annotation, str):
        return by_name.get(annotation, "string")
    return by_type.get(annotation, "string")


def _one_line(text: str) -> str:
    flat = " ".join(str(text).split())
    return flat if len(flat) <= _SUMMARY_CHARS else flat[: _SUMMARY_CHARS - 1] + "…"
