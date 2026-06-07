"""
pipeline.py — orchestrates the deterministic core in dependency order into a MemoArtifact.

    intake (Subject) → retrieve candidates → tiered widening + rejection codes →
    adjustment grid + time engine → weighted reconciliation (RANGE) →
    evidence-quality confidence → flag registry → [LLM/template prose] → MemoArtifact

All math is done here and in domain/; the LLM only fills the narrative afterwards, and the
artifact is fully valid even if the LLM is disabled (ARCHITECTURE seam). The CLI
(`python -m kvcomp.pipeline`) builds the sample-subject memo and writes out/data.js via the
serializer, so `./scripts/run.sh` is a single call.
"""

from __future__ import annotations

from dataclasses import dataclass

from kvcomp.data.constants import CITY_BENCHMARK_EFFECTIVE, DISTRICT_BENCHMARK
from kvcomp.data.scenario import generate_universe
from kvcomp.data.subject_loader import default_subject
from kvcomp.domain import confidence as confidence_mod
from kvcomp.domain import flags as flags_mod
from kvcomp.domain.grid import adjust_comp
from kvcomp.domain.reconcile import ReconcileResult, reconcile
from kvcomp.domain.retrieval import retrieve
from kvcomp.domain.widening import SelectionResult, run_selection
from kvcomp.narrative import llm as narrative_llm
from kvcomp.schemas.config import AdjustmentConfig
from kvcomp.schemas.results import MemoArtifact, SearchSummary
from kvcomp.schemas.subject import Subject


@dataclass(frozen=True)
class PipelineResult:
    """The MemoArtifact plus the side data the serializer needs (weights drivers, source)."""
    memo: MemoArtifact
    reconcile: ReconcileResult
    selection: SelectionResult
    config: AdjustmentConfig
    narrative_source: str
    universe: list  # retrieved candidates (so the serializer can resolve rejected comps)


def run(
    subject: Subject | None = None,
    cfg: AdjustmentConfig | None = None,
    *,
    candidates=None,
    use_llm: bool | None = None,
) -> PipelineResult:
    subject = subject or default_subject()
    cfg = cfg or AdjustmentConfig()

    # 1. intake -> retrieve candidate comps (synthetic universe for the demo subject).
    universe = candidates if candidates is not None else generate_universe(subject, cfg)
    universe = retrieve(subject, universe)

    # 2. similarity-scored tiered widening + rejection reason codes.
    selection = run_selection(subject, universe, cfg)

    # 3. adjustment grid + time engine on the selected comps.
    adjusted = [adjust_comp(c, subject, cfg) for c in selection.selected]

    # 4. weighted reconciliation -> value RANGE (fills per-comp weights).
    recon = reconcile(subject, adjusted, cfg)

    # 5. evidence-quality confidence breakdown.
    conf = confidence_mod.assess(subject, recon.adjusted, selection, recon.value_range, cfg)

    # 6. advisory flag registry (fired + clear).
    flags = flags_mod.evaluate(subject, recon.adjusted, selection, recon, cfg)

    search_summary = SearchSummary(
        retrieved=selection.retrieved, selected=len(selection.selected),
        rejected=len(selection.rejected), final_tier=selection.final_tier,
        widening_depth=selection.widening_depth, total_penalty=selection.total_penalty,
    )

    memo = MemoArtifact(
        subject=subject,
        selected=recon.adjusted,
        rejected=selection.rejected,
        widening=selection.widening,
        search_summary=search_summary,
        value_range=recon.value_range,
        confidence=conf,
        flags=flags,
        district_benchmark=DISTRICT_BENCHMARK.get(subject.district, 0),
        city_benchmark=CITY_BENCHMARK_EFFECTIVE,
    )

    # 7. prose seam — LLM if a key is present, else the deterministic template.
    narrative, source = narrative_llm.generate(memo, use_llm=use_llm)
    memo = memo.model_copy(update={"narrative": narrative})

    return PipelineResult(memo=memo, reconcile=recon, selection=selection,
                          config=cfg, narrative_source=source, universe=universe)


def main() -> None:
    from kvcomp.data.subject_loader import default_subject
    from kvcomp.narrative.orchestrator import demo_listing, run_with_agents, trace_to_window
    from kvcomp.serialize.memo_to_window import write_data_js

    # The agents BRACKET the unchanged pipeline: intake (from a blurb that round-trips to the
    # hero subject) before, sensitivity after. data.js carries the read-only agentTrace block.
    subject = default_subject()
    result, trace = run_with_agents(listing=demo_listing(subject), effective_date=subject.effective_date)
    path = write_data_js(result, agent_trace=trace_to_window(trace))
    vr = result.memo.value_range
    print(f"✓ pipeline complete — narrative via {result.narrative_source}")
    print(f"  selected {len(result.memo.selected)} / rejected {len(result.memo.rejected)} / "
          f"final tier {result.memo.search_summary.final_tier}")
    print(f"  value range {vr.low:,} – {vr.point:,} – {vr.high:,} "
          f"(confidence {result.memo.confidence.band} {result.memo.confidence.score:.2f})")
    print(f"  wrote {path}")


if __name__ == "__main__":
    main()
