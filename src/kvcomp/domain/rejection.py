"""
domain/rejection.py — rejected-comp reason codes (closed `ReasonCode` enum).

The appraiser move a black box can't make: every candidate removed BEFORE selection
carries a machine-checkable code + human-readable detail (USE_CASE Beat 2). Five rules:

    TOO_STALE                     contract age > stale_max_days
    DUPLICATE                     same parcel signature as an earlier candidate
    GROSS_ADJ_TOO_HIGH            grid gross adjustment > candidate_gross_cap
    OUTLIER_PRICE                 PPSF > outlier_mad_threshold MADs from the candidate median
    WRONG_DISTRICT_AFTER_WIDENING non-adjacent district, never in scope after widening (widening.py)

The first four are tier-independent and decided here; the fifth is decided by the
widening loop once it has exhausted the topology, and is constructed via `wrong_district`.
"""

from __future__ import annotations

import statistics

from kvcomp.data.constants import is_adjacent
from kvcomp.domain.grid import adjust_comp
from kvcomp.domain.retrieval import contract_age_days, ppsf
from kvcomp.schemas.comp import Comp
from kvcomp.schemas.config import AdjustmentConfig
from kvcomp.schemas.results import RejectionRecord, ReasonCode
from kvcomp.schemas.subject import Subject


def _signature(c: Comp) -> tuple:
    return (c.gla_sqft, c.lot_sqft, c.year_built, c.sale_price, c.contract_date)


def too_stale(subject: Subject, comp: Comp, cfg: AdjustmentConfig) -> RejectionRecord | None:
    age = contract_age_days(subject, comp)
    if age > cfg.stale_max_days:
        return RejectionRecord(
            comp_id=comp.comp_id, reason_code=ReasonCode.TOO_STALE,
            detail=(f"Contract {comp.contract_date.isoformat()} is {age} days stale — exceeds the "
                    f"tier-2 maximum window (≤ {cfg.stale_max_days} days / ~9 mo). Pre-dates the "
                    f"current benchmark trend; the implied time adjustment would be unreliable."),
            metric_label="contract age", metric_value=f"{age} days", cap=f"≤ {cfg.stale_max_days} days",
        )
    return None


def gross_too_high(subject: Subject, comp: Comp, cfg: AdjustmentConfig) -> RejectionRecord | None:
    adj = adjust_comp(comp, subject, cfg)
    if adj.gross_pct / 100.0 > cfg.candidate_gross_cap:
        return RejectionRecord(
            comp_id=comp.comp_id, reason_code=ReasonCode.GROSS_ADJ_TOO_HIGH,
            detail=(f"Cumulative gross adjustment {adj.gross_pct:.1f}% exceeds the "
                    f"{cfg.candidate_gross_cap * 100:.0f}% hard cap. Too dissimilar to bracket the "
                    f"subject — not comparable."),
            metric_label="gross adjustment", metric_value=f"{adj.gross_pct:.1f}%",
            cap=f"≤ {cfg.candidate_gross_cap * 100:.1f}%",
        )
    return None


def duplicate(comp: Comp, earlier: list[Comp]) -> RejectionRecord | None:
    for e in earlier:
        if _signature(e) == _signature(comp):
            return RejectionRecord(
                comp_id=comp.comp_id, reason_code=ReasonCode.DUPLICATE,
                detail=(f"Resolves to the same parcel already represented by {e.label} "
                        f"(re-list under a second MLS number). Deduplicated to avoid "
                        f"double-counting one sale."),
                metric_label="parcel", metric_value=f"= {e.label}", cap="unique parcels",
            )
    return None


def outliers(subject: Subject, candidates: list[Comp], cfg: AdjustmentConfig) -> dict[str, RejectionRecord]:
    """MAD-based PPSF outlier detection over the supplied candidate set.

    Requires a minimum sample (5): MAD on a tiny set is unstable, and a legitimately larger
    comp (lower PPSF via GLA diminishing returns) would falsely read as an outlier."""
    if len(candidates) < 5:
        return {}
    vals = [ppsf(c) for c in candidates]
    med = statistics.median(vals)
    devs = [abs(v - med) for v in vals]
    mad = statistics.median(devs) or 1.0
    out: dict[str, RejectionRecord] = {}
    for c, v in zip(candidates, vals):
        mad_dist = abs(v - med) / mad
        if mad_dist > cfg.outlier_mad_threshold:
            side = "low" if v < med else "high"
            out[c.comp_id] = RejectionRecord(
                comp_id=c.comp_id, reason_code=ReasonCode.OUTLIER_PRICE,
                detail=(f"PPSF ${v} sits {mad_dist:.1f} MAD {side} of the candidate median (${int(med)}). "
                        f"Probable non-arm's-length / distressed transfer — excluded as a price "
                        f"outlier rather than market evidence."),
                metric_label="PPSF deviation", metric_value=f"{mad_dist:.1f} MAD {side}",
                cap=f"≤ {cfg.outlier_mad_threshold:.1f} MAD",
            )
    return out


def wrong_district(comp: Comp, subject: Subject) -> RejectionRecord:
    return RejectionRecord(
        comp_id=comp.comp_id, reason_code=ReasonCode.WRONG_DISTRICT_AFTER_WIDENING,
        detail=(f"{comp.district.value.replace('_', ' ').title()} is not adjacent to the subject "
                f"district under the tier-1 topology map (no shared boundary). Excluded before "
                f"adjustment to avoid a cross-market location bridge."),
        metric_label="district", metric_value=f"{comp.district.value.replace('_', ' ').title()} (non-adj.)",
        cap=f"{subject.district.value.replace('_', ' ').title()} ± adjacent",
    )


def is_district_in_scope(subject: Subject, comp: Comp, tier: int) -> bool:
    """Tier 0 = subject district only; tier >= 1 = subject + adjacent districts."""
    if tier == 0:
        return comp.district == subject.district
    return is_adjacent(subject.district, comp.district)
