"""
narrative/llm.py — the deterministic-core → LLM seam (ARCHITECTURE).

The LLM writes PROSE ONLY. This module imports nothing from domain/ except read-only
result types (MemoArtifact, Narrative); it receives a fully-computed artifact and returns
six strings. It NEVER produces a number that enters the underwriting result.

A single batched Anthropic call (rejections + narrative + exceptions in one request →
one response) bounds latency. If ANTHROPIC_API_KEY is unset, the call fails, or the
response is malformed, we fall back to the deterministic template — the memo is fully
valid either way, with identical numbers. Default behaviour (no key) is the template.
"""

from __future__ import annotations

import json
import os

from kvcomp.narrative.prompts import SECTIONS, build_prompt, template_narrative
from kvcomp.schemas.results import MemoArtifact, Narrative

_DEFAULT_MODEL = "claude-sonnet-4-20250514"
_ANTHROPIC_URL = "https://api.anthropic.com/v1/messages"


def generate(memo: MemoArtifact, *, use_llm: bool | None = None) -> tuple[Narrative, str]:
    """Return (narrative, source) where source is 'llm' or 'template'.

    `use_llm` forces the path; when None it auto-enables iff ANTHROPIC_API_KEY is present.
    """
    key = os.environ.get("ANTHROPIC_API_KEY", "").strip()
    want_llm = (use_llm is True) or (use_llm is None and bool(key))
    if not want_llm or not key:
        return template_narrative(memo), "template"

    try:
        narrative = _call_anthropic(memo, key)
        return narrative, "llm"
    except Exception as exc:
        # Reliability over cleverness: any failure degrades to the deterministic template —
        # but say so on stderr, otherwise the fallback is indistinguishable from success.
        import sys
        print(f"⚠ LLM narrative failed ({type(exc).__name__}: {exc}); using template fallback", file=sys.stderr)
        return template_narrative(memo), "template"


def _call_anthropic(memo: MemoArtifact, key: str) -> Narrative:
    import httpx  # imported lazily so the core has no hard runtime dep on the network stack

    system, user = build_prompt(memo)
    model = os.environ.get("KVCOMP_LLM_MODEL", _DEFAULT_MODEL).strip() or _DEFAULT_MODEL
    payload = {
        "model": model,
        "max_tokens": 1500,
        "system": system,
        "messages": [{"role": "user", "content": user}],
    }
    headers = {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
    }
    resp = httpx.post(_ANTHROPIC_URL, headers=headers, json=payload, timeout=30.0)
    resp.raise_for_status()
    data = resp.json()
    text = "".join(block.get("text", "") for block in data.get("content", []) if block.get("type") == "text")
    parsed = _extract_json(text)
    # Only accept strings for the known sections; anything missing falls back per-field.
    fallback = template_narrative(memo)
    fields = {s: (parsed.get(s) if isinstance(parsed.get(s), str) and parsed.get(s).strip()
                  else getattr(fallback, s)) for s in SECTIONS}
    return Narrative(**fields)


def _extract_json(text: str) -> dict:
    text = text.strip()
    if text.startswith("```"):
        text = text.split("```", 2)[1]
        if text.startswith("json"):
            text = text[4:]
    start, end = text.find("{"), text.rfind("}")
    if start == -1 or end == -1:
        return {}
    try:
        return json.loads(text[start:end + 1])
    except json.JSONDecodeError:
        return {}
