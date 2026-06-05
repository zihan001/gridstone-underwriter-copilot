"""
domain/widening.py — the tiered search-widening loop, the orchestrator of selection.

Casts the tightest comparability net first (tier 0: subject district, ≤ 6-month contract
window) and relaxes in logged steps only as far as needed to reach `min_comp_count`:
tier 1 adds directly-adjacent districts, tier 2 relaxes the date window to ~9 months. Each
step records its relaxed criteria, a rationale, the count it found, and a confidence
penalty (DOMAIN §7 widening-depth driver). Candidates removed by the tier-independent
rules live in domain/rejection.py; a survivor that is never in scope after the topology is
exhausted is rejected WRONG_DISTRICT_AFTER_WIDENING here.

This is the single place that decides who is SELECTED — the pipeline consumes its result.
"""

from __future__ import annotations

from dataclasses import dataclass, field

from kvcomp.domain import rejection
from kvcomp.domain.retrieval import contract_age_days
from kvcomp.schemas.comp import Comp
from kvcomp.schemas.config import AdjustmentConfig
from kvcomp.schemas.results import RejectionRecord, WideningStep
from kvcomp.schemas.subject import Subject

# Per-tier date window (days) and confidence penalty. Calibrated to the demo storyboard;
# tunable knobs, not market data.
_TIER_WINDOW_DAYS = {0: 183, 1: 183, 2: 274}
_TIER_PENALTY = {0: 0.0, 1: -0.06, 2: -0.04}
_MAX_TIER = 2


@dataclass(frozen=True)
class SelectionResult:
    retrieved: int
    selected: list[Comp]
    rejected: list[RejectionRecord]
    widening: list[WideningStep]
    final_tier: int
    widening_depth: int
    total_penalty: float
    survivors: list[Comp] = field(default_factory=list)


def _in_scope(subject: Subject, comp: Comp, tier: int) -> bool:
    if not rejection.is_district_in_scope(subject, comp, tier):
        return False
    return contract_age_days(subject, comp) <= _TIER_WINDOW_DAYS[tier]


def _tier_criteria(subject: Subject, tier: int) -> list[tuple[str, str]]:
    sub = subject.district.value.replace("_", " ").title()
    if tier == 0:
        return [("District", f"= {sub} (subject)"), ("Contract window", "≤ 6 months"),
                ("Sale type", "arm's-length only")]
    if tier == 1:
        return [("District", f"{sub} + directly-adjacent"), ("Contract window", "≤ 6 months (unchanged)")]
    return [("Contract window", "≤ 9 months (relaxed from 6)"), ("District", f"{sub} + adjacent (unchanged)")]


def _tier_rationale(tier: int, min_count: int, found_running: int) -> str:
    if tier == 0:
        return "Tightest comparability band — maximise like-for-like evidence."
    if tier == 1:
        return (f"Tier-0 count ({found_running}) below the minimum of {min_count} for a stable "
                f"weighted reconciliation; widened to directly-adjacent districts only.")
    return ("Open a wider date window to recover fresher, better-bracketing evidence given a "
            "comp on the stale watch; improves the recency distribution.")


def run_selection(subject: Subject, candidates: list[Comp], cfg: AdjustmentConfig) -> SelectionResult:
    retrieved = len(candidates)
    rejected: list[RejectionRecord] = []
    rejected_ids: set[str] = set()

    # --- tier-independent hard rejections, in order -------------------------
    def _reject(rec, cid: str) -> None:
        rejected.append(rec)
        rejected_ids.add(cid)

    seen: list[Comp] = []
    for c in candidates:
        rec = rejection.duplicate(c, seen)
        if rec:
            _reject(rec, c.comp_id)
        seen.append(c)
    for c in candidates:
        if c.comp_id in rejected_ids:
            continue
        rec = rejection.too_stale(subject, c, cfg)
        if rec:
            _reject(rec, c.comp_id)
    for c in candidates:
        if c.comp_id in rejected_ids:
            continue
        rec = rejection.gross_too_high(subject, c, cfg)
        if rec:
            _reject(rec, c.comp_id)

    survivors_pre_outlier = [c for c in candidates if c.comp_id not in rejected_ids]
    outlier_recs = rejection.outliers(subject, survivors_pre_outlier, cfg)
    for cid, rec in outlier_recs.items():
        _reject(rec, cid)

    survivors = [c for c in candidates if c.comp_id not in rejected_ids]

    # --- tiered widening over survivors -------------------------------------
    selected: list[Comp] = []
    selected_ids: set[str] = set()
    steps: list[WideningStep] = []
    tier = 0
    while True:
        newly = [c for c in survivors
                 if c.comp_id not in selected_ids and _in_scope(subject, c, tier)]
        for c in newly:
            selected.append(c.model_copy(update={"tier": tier}))
            selected_ids.add(c.comp_id)

        running = len(selected)
        step = WideningStep(
            tier=tier,
            title=f"Tier {tier} · " + ("tight band" if tier == 0 else
                                        "adjacent district" if tier == 1 else "wider date window"),
            criteria=_tier_criteria(subject, tier),
            rationale=_tier_rationale(tier, cfg.min_comp_count, running - len(newly) if tier else running),
            found=len(newly),
            penalty=_TIER_PENALTY[tier],
            note=("0 net additions retained after re-screening; tier opened, no qualifying sale survived."
                  if (tier >= 1 and len(newly) == 0) else None),
        )
        steps.append(step)

        if running < cfg.min_comp_count and tier < _MAX_TIER:
            tier += 1
            continue
        # Count satisfied: open one confirmatory wider tier if a selected comp is on the
        # stale watch and we have not yet reached the deep tier (recency recovery attempt).
        if (running >= cfg.min_comp_count and tier < _MAX_TIER
                and any(contract_age_days(subject, c) > cfg.stale_watch_days for c in selected)):
            tier += 1
            continue
        break

    # --- survivors never in scope -> wrong district -------------------------
    for c in survivors:
        if c.comp_id not in selected_ids:
            _reject(rejection.wrong_district(c, subject), c.comp_id)

    widening_depth = max((s.tier for s in steps), default=0)
    total_penalty = round(sum(s.penalty for s in steps), 4)
    # Order rejections by reason for a stable, demo-legible panel.
    order = ["TOO_STALE", "GROSS_ADJ_TOO_HIGH", "WRONG_DISTRICT_AFTER_WIDENING", "OUTLIER_PRICE", "DUPLICATE"]
    rejected.sort(key=lambda r: order.index(r.reason_code.value))
    selected.sort(key=lambda c: c.comp_id)

    return SelectionResult(
        retrieved=retrieved, selected=selected, rejected=rejected, widening=steps,
        final_tier=tier, widening_depth=widening_depth, total_penalty=total_penalty,
        survivors=survivors,
    )
