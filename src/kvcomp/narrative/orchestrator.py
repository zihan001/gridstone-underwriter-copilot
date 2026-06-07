"""
narrative/orchestrator.py — the intake agent runs BEFORE the pipeline; it never runs inside it.

Control flow:

    intake agent  ─►  pipeline.run() [UNCHANGED]  ─►  render
       (before)            the spine

`run_with_agents` is the only place that wires the intake agent in front of the deterministic
core. The pipeline remains authoritative for every number; the agent only adds grounding
(turning a free-text listing into the frozen Subject) plus an audit trace. The agent can be
absent (e.g. no listing supplied) and the pipeline still produces a fully valid memo.

(The post-pipeline sensitivity agent was removed: an LLM choosing from a fixed probe set added
latency and unauditability with no decision quality — the probe set was deterministic. Intake
is the one agent that earns its place: it interprets unstructured text, which a function can't
encode. See README "agent placement".)

`trace_to_window` flattens the collected trace into the read-only `agentTrace` block the
viewer renders (MEMO_CONTRACT, intake half). `demo_listing` renders a deterministic blurb from
a subject so the demo can drive the hero through the *real* intake agent while keeping the
committed viewer numbers byte-identical (the blurb round-trips back to the same subject).
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import date

from kvcomp.narrative.intake_agent import IntakeResult, run_intake
from kvcomp.pipeline import PipelineResult, run
from kvcomp.schemas.config import AdjustmentConfig
from kvcomp.schemas.subject import GarageType, Subject

_STALL_WORD = {1: "single", 2: "double", 3: "triple"}


@dataclass(frozen=True)
class AgentTrace:
    """The intake agent's result (may be None when no listing was supplied)."""
    intake: IntakeResult | None = None


def run_with_agents(
    *,
    subject: Subject | None = None,
    listing: str | None = None,
    cfg: AdjustmentConfig | None = None,
    effective_date: date | None = None,
    use_llm: bool | None = None,
) -> tuple[PipelineResult, AgentTrace]:
    """Front the unchanged pipeline with the intake (before) agent.

    Supply a `listing` to ground the subject via the intake agent, or a ready `subject` to
    skip intake. The pipeline runs exactly as before on whichever subject results."""
    intake_res: IntakeResult | None = None
    if listing is not None:
        eff = effective_date or (subject.effective_date if subject else date(2026, 6, 1))
        intake_res = run_intake(listing, effective_date=eff, use_llm=use_llm)
        subject = intake_res.subject

    result = run(subject, cfg, use_llm=use_llm)               # the spine — unchanged
    return result, AgentTrace(intake=intake_res)


# ---------------------------------------------------------------------------
# Trace -> read-only window block.
# ---------------------------------------------------------------------------
def _args_str(args: dict) -> str:
    return ", ".join(f"{k}={v}" for k, v in args.items())


def _calls_to_window(calls) -> list[dict]:
    return [{"name": c.tool_name, "args": _args_str(c.args), "result": c.result_summary} for c in calls]


def trace_to_window(trace: AgentTrace) -> dict:
    """Flatten an AgentTrace into the MEMO_CONTRACT `agentTrace` shape (render-only, intake)."""
    out: dict = {"intake": None}
    if trace.intake is not None:
        out["intake"] = {
            "source": trace.intake.source,
            "reasoning": trace.intake.reasoning,
            "calls": _calls_to_window(trace.intake.trace),
        }
    return out


# ---------------------------------------------------------------------------
# Deterministic blurb for the demo (round-trips through the intake agent).
# ---------------------------------------------------------------------------
def demo_listing(subject: Subject) -> str:
    """Render a listing blurb from a subject such that run_intake() reconstructs the same
    physical attributes — so the demo exercises the real intake agent without moving any
    committed viewer number. Every parseable field the intake agent reads is stated."""
    g = subject
    stalls = _STALL_WORD.get(g.garage_stalls, f"{g.garage_stalls}-car")
    gtype = g.garage_type.value if g.garage_type != GarageType.NONE else "no"
    walk = " walkout" if g.basement_walkout else ""
    return (
        f"Detached two-storey at {g.address}. "
        f"{g.gla_sqft:,} sq ft above grade on a {g.lot_sqft:,} sf lot. "
        f"{g.beds_ag} bedrooms, {g.full_baths} full baths and {g.half_baths} half bath. "
        f"Built {g.year_built}. {stalls.capitalize()} {gtype} garage. "
        f"{g.basement_finished_sqft} sq ft finished{walk} basement."
    )
