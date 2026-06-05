"""
domain/confidence.py — confidence from EVIDENCE QUALITY, not model certainty (DOMAIN §7).

A deterministic function of the case, decomposed into named drivers so the memo shows its
work: comp count, adjusted-value spread, recency, distance, adjustment burden, and
widening depth. Each driver contributes a signed delta from the base prior; the drivers
sum EXACTLY to `score − base` (the serializer contract test asserts this). No learned
probability — fully traceable.
"""

from __future__ import annotations

import statistics

from kvcomp.domain.retrieval import contract_age_days
from kvcomp.domain.widening import SelectionResult
from kvcomp.schemas.config import AdjustmentConfig
from kvcomp.schemas.results import AdjustedComp, ConfidenceBreakdown, ConfidenceDriver, ValueRange
from kvcomp.schemas.subject import Subject

_BAND_HALF = 0.05


def _clamp(x: float, lo: float, hi: float) -> float:
    return max(lo, min(hi, x))


def _band_label(score: float) -> str:
    if score >= 0.80:
        return "HIGH"
    if score >= 0.60:
        return "MODERATE"
    if score >= 0.45:
        return "LIMITED"
    return "LOW"


def assess(
    subject: Subject,
    adjusted: list[AdjustedComp],
    selection: SelectionResult,
    value_range: ValueRange,
    cfg: AdjustmentConfig,
) -> ConfidenceBreakdown:
    n = len(adjusted)
    drivers: list[ConfidenceDriver] = []

    # comp count: meeting the minimum is a positive; below it is penalised hard.
    if n >= cfg.min_comp_count:
        c_count = _clamp(0.08 + 0.03 * (n - cfg.min_comp_count), 0.0, 0.16)
        count_detail = f"{n} selected (≥ minimum {cfg.min_comp_count})"
    else:
        c_count = -0.10 * (cfg.min_comp_count - n)
        count_detail = f"{n} selected (below minimum {cfg.min_comp_count})"
    drivers.append(ConfidenceDriver(key="compCount", label="Comp count", detail=count_detail, contrib=round(c_count, 4)))

    # adjusted-value spread: tight band -> positive.
    spread_pct = value_range.spread_pct
    c_spread = round(_clamp(0.18 - 0.025 * spread_pct, -0.05, 0.16), 4)
    vals = [ac.adjusted_value for ac in adjusted]
    band = (max(vals) - min(vals)) if vals else 0
    drivers.append(ConfidenceDriver(
        key="spread", label="Adjusted-value spread",
        detail=f"${band:,} range · {spread_pct:.1f}% of point", contrib=c_spread))

    # recency: median contract age.
    ages = sorted(max(0, contract_age_days(subject, ac.comp)) for ac in adjusted)
    median_age = int(statistics.median(ages)) if ages else 0
    c_recency = round(_clamp(0.08 * (1.0 - median_age / 180.0), -0.06, 0.08), 4)
    drivers.append(ConfidenceDriver(key="recency", label="Recency",
                                    detail=f"median contract age {median_age} days", contrib=c_recency))

    # distance: average distance, adjacent-district count.
    dists = [ac.comp.distance_km or 0.0 for ac in adjusted]
    avg_dist = sum(dists) / len(dists) if dists else 0.0
    adj_district = sum(1 for ac in adjusted if not ac.comp.same_district)
    c_dist = round(_clamp(0.06 * (1.0 - avg_dist / 4.0), -0.06, 0.06), 4)
    drivers.append(ConfidenceDriver(
        key="distance", label="Distance",
        detail=f"{min(dists):.1f}–{max(dists):.1f} km · {adj_district} adjacent-district", contrib=c_dist))

    # adjustment burden: worst gross adjustment.
    max_gross = max((ac.gross_pct for ac in adjusted), default=0.0)
    c_burden = round(_clamp(0.04 - 0.006 * max_gross, -0.08, 0.05), 4)
    drivers.append(ConfidenceDriver(
        key="burden", label="Adjustment burden",
        detail=f"worst comp at {max_gross:.1f}% gross", contrib=c_burden))

    # widening depth: the accumulated per-tier penalty.
    c_widen = round(selection.total_penalty, 4)
    drivers.append(ConfidenceDriver(
        key="widening", label="Widening depth",
        detail=f"tier-{selection.final_tier} reached (depth {selection.widening_depth})", contrib=c_widen))

    base = cfg.confidence_base
    score = round(base + sum(d.contrib for d in drivers), 4)
    return ConfidenceBreakdown(
        base=base, score=score, low=round(score - _BAND_HALF, 4), high=round(score + _BAND_HALF, 4),
        band=_band_label(score), drivers=drivers,
    )
