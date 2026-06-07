"""
narrative/sensitivity_agent.py — Phase 2: a sensitivity probe over a FINISHED valuation.

This agent runs STRICTLY AFTER pipeline.run(); it never recomputes the memo's numbers and
never authors one. Its job is to stress-test the delivered value range and explain, in
prose, how robust it is.

HOW THE INVARIANT IS HELD. Every tool RE-INVOKES the deterministic core (pipeline.run) with
exactly one knob changed and returns the core's recomputed numbers verbatim, pre-differenced
against the baseline in deterministic Python:
  * rerun_with_profile(profile)       — flip the lender profile, recompute
  * rerun_widening(extra_tier)        — force the search to admit more comparables, recompute
  * recompute_dropping_comp(comp_id)  — leave-one-out: drop a comp from the universe, recompute

The baseline PipelineResult is never mutated. The agent only chooses which scenario to probe
and narrates the tool outputs; the value range, confidence, and deltas all originate in the
core, so no model-authored number enters anything.

With no ANTHROPIC_API_KEY the loop is skipped and a deterministic probe sequence drives the
same tools, so a sensitivity note + trace exist with the LLM disabled.
"""

from __future__ import annotations

import os

from kvcomp.narrative.agent import ToolCall, run_agent
from kvcomp.schemas.subject import LenderProfile

# Imported lazily inside the tools to avoid an import cycle (pipeline imports narrative).


def _usd(n: int) -> str:
    return f"${n:,.0f}"


def _parse_profile(profile: str) -> LenderProfile:
    raw = str(profile or "").strip().lower()
    for p in LenderProfile:
        if raw == p.value or raw == p.name.lower():
            return p
    # default to the louder GSE posture if the agent passes something odd
    return LenderProfile.GSE_ON


def _fired(memo) -> int:
    return sum(1 for f in memo.flags if f.status.value == "FIRED")


def _compare(label: str, baseline, scenario) -> str:
    """Deterministic baseline-vs-scenario summary (the numbers are all core-computed)."""
    b, s = baseline.memo, scenario.memo
    bv, sv = b.value_range, s.value_range
    dpoint = sv.point - bv.point
    moved = "unchanged" if dpoint == 0 else f"{'+' if dpoint > 0 else '−'}{_usd(abs(dpoint))}"
    return (
        f"[{label}] "
        f"point {_usd(bv.point)} -> {_usd(sv.point)} ({moved}); "
        f"range {_usd(bv.low)}–{_usd(bv.high)} -> {_usd(sv.low)}–{_usd(sv.high)}; "
        f"confidence {b.confidence.band} {b.confidence.score:.2f} -> "
        f"{s.confidence.band} {s.confidence.score:.2f}; "
        f"selected {len(b.selected)} -> {len(s.selected)}; "
        f"fired flags {_fired(b)} -> {_fired(s)}."
    )


def build_sensitivity_tools(baseline) -> dict:
    """Tools bound to a finished PipelineResult; each re-invokes the core verbatim."""
    from kvcomp.pipeline import run  # lazy: pipeline imports narrative, avoid the cycle

    subject = baseline.memo.subject
    cfg = baseline.config

    def rerun_with_profile(profile: str) -> str:
        """Re-run the full deterministic valuation under a different lender profile
        ('fnma_off' or 'gse_on') and report how the value range, confidence, and fired-flag
        count change. The profile governs how loudly tolerance breaches are flagged."""
        prof = _parse_profile(profile)
        res = run(subject, cfg.model_copy(update={"lender_profile": prof}), use_llm=False)
        return _compare(f"lender profile -> {prof.value}", baseline, res)

    def rerun_widening(extra_tier: bool = True) -> str:
        """Re-run forcing the search to admit MORE comparables (a deeper widening tier) and
        report how the value range and selected count respond."""
        new_min = max(cfg.min_comp_count, len(baseline.memo.selected) + 2) if extra_tier else cfg.min_comp_count
        res = run(subject, cfg.model_copy(update={"min_comp_count": new_min}), use_llm=False)
        return _compare(f"forced wider search (min_comp_count={new_min})", baseline, res)

    def recompute_dropping_comp(comp_id: str) -> str:
        """Leave-one-out: re-run excluding one comparable from the candidate universe and
        report the resulting range shift, isolating that comp's influence on the point."""
        remaining = [c for c in baseline.universe if c.comp_id != comp_id]
        if len(remaining) == len(baseline.universe):
            return f"no comparable with id '{comp_id}' in the universe; nothing dropped."
        res = run(subject, cfg, candidates=remaining, use_llm=False)
        return _compare(f"dropping comp {comp_id}", baseline, res)

    return {
        "rerun_with_profile": rerun_with_profile,
        "rerun_widening": rerun_widening,
        "recompute_dropping_comp": recompute_dropping_comp,
    }


_SYSTEM = (
    "You are a review appraiser stress-testing a FINISHED collateral valuation. You are given "
    "the computed value range and may probe its robustness ONLY through the provided tools, "
    "each of which re-runs the deterministic engine with one input changed and returns the "
    "recomputed numbers. Probe at least: (1) the alternate lender profile; (2) a forced wider "
    "comp search; (3) leaving out the most heavily weighted comparable. Then write a concise "
    "3-5 sentence sensitivity note for the underwriter: does the point value hold, how wide do "
    "the scenarios swing it, and which lever matters most. CRITICAL: never invent or alter a "
    "number — quote only the figures the tools return; the engine, not you, computes value."
)


def _heaviest_comp_id(baseline) -> str | None:
    selected = baseline.memo.selected
    if not selected:
        return None
    return max(selected, key=lambda ac: ac.weight).comp.comp_id


def _deterministic_probe(baseline) -> tuple[str, list[ToolCall]]:
    """No-key fallback: drive the three probes in a fixed order; return (note, trace)."""
    tools = build_sensitivity_tools(baseline)
    trace: list[ToolCall] = []
    findings: list[str] = []

    def call(name: str, **args) -> str:
        out = str(tools[name](**args))
        trace.append(ToolCall(name, args, " ".join(out.split())[:400]))
        return out

    other = (LenderProfile.GSE_ON if baseline.config.lender_profile == LenderProfile.FNMA_OFF
             else LenderProfile.FNMA_OFF)
    findings.append(call("rerun_with_profile", profile=other.value))
    findings.append(call("rerun_widening", extra_tier=True))
    heavy = _heaviest_comp_id(baseline)
    if heavy:
        findings.append(call("recompute_dropping_comp", comp_id=heavy))

    note = _template_note(baseline, findings, heavy)
    return note, trace


def _template_note(baseline, findings: list[str], heavy: str | None) -> str:
    vr = baseline.memo.value_range
    return (
        f"Sensitivity probe of the {_usd(vr.point)} central indication "
        f"(range {_usd(vr.low)}–{_usd(vr.high)}). Three deterministic re-runs were compared "
        "against the delivered result: an alternate lender profile, a forced wider comp "
        f"search, and leave-one-out on the most heavily weighted comp"
        + (f" ({heavy})" if heavy else "")
        + ". Per-scenario engine output: "
        + " ".join(findings)
        + " The lender profile is informational (it changes flag loudness, not value); the "
        "range movement under wider search and leave-one-out bounds how sensitive the point "
        "is to the comp set. Every figure here is recomputed by the core, not estimated."
    )


class SensitivityResult:
    """Prose sensitivity note + the tool-call trace (read-only; for the trace panel)."""

    __slots__ = ("note", "trace", "source")

    def __init__(self, note: str, trace: list[ToolCall], source: str):
        self.note = note
        self.trace = trace
        self.source = source


def run_sensitivity(baseline, *, use_llm: bool | None = None) -> SensitivityResult:
    """Probe a finished PipelineResult and return a prose note + trace.

    With a key (and use_llm not False) the agent loop drives the probes; otherwise a fixed
    deterministic probe sequence does. The baseline is never mutated — the memo's numbers are
    unaffected by running this."""
    key = os.environ.get("ANTHROPIC_API_KEY", "").strip()
    want_llm = (use_llm is True) or (use_llm is None and bool(key))

    if want_llm and key:
        tools = build_sensitivity_tools(baseline)
        vr = baseline.memo.value_range
        task = (
            f"The finished valuation gives a point of {_usd(vr.point)} within "
            f"{_usd(vr.low)}–{_usd(vr.high)}. Probe its robustness with the tools, then write "
            "the sensitivity note."
        )
        note, trace = run_agent(
            _SYSTEM, tools, task,
            fallback=lambda: _deterministic_probe(baseline)[0],
        )
        return SensitivityResult(note=note, trace=trace, source="llm")

    note, trace = _deterministic_probe(baseline)
    return SensitivityResult(note=note, trace=trace, source="deterministic")
