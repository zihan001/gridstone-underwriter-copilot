"""
domain/reconcile.py — weighted (NOT averaged) reconciliation to a value RANGE (DOMAIN §6).

Averaging treats a far/stale/heavily-adjusted comp the same as a strong one. Instead each
comp earns a weight from inverse evidence-cost — similarity × recency × proximity × (low
adjustment burden) — normalized to sum to 1. The point is the weighted central indication;
the range brackets it with a spread driven by the adjusted-value dispersion. Output is a
defensible band with a central tendency, never a bare number.
"""

from __future__ import annotations

import statistics
from dataclasses import dataclass

from kvcomp.domain.retrieval import contract_age_days, similarity, similarity_label
from kvcomp.schemas.config import AdjustmentConfig
from kvcomp.schemas.results import AdjustedComp, ValueRange
from kvcomp.schemas.subject import Subject


def _round_to(n: float, step: int) -> int:
    return int(round(n / step) * step)


@dataclass(frozen=True)
class ReconcileResult:
    adjusted: list[AdjustedComp]                 # weights filled, sum to 1
    value_range: ValueRange
    weights: dict[str, float]
    weight_drivers: dict[str, dict[str, str]]


def _raw_weight(subject: Subject, ac: AdjustedComp, cfg: AdjustmentConfig) -> float:
    comp = ac.comp
    sim = similarity(subject, comp, cfg).score
    age = max(0, contract_age_days(subject, comp))
    recency = max(0.05, 1.0 - age / 274.0)
    dist = comp.distance_km or 0.0
    proximity = max(0.05, 1.0 - dist / 8.0)
    burden = max(0.05, 1.0 - ac.gross_pct / 100.0)   # less adjusted -> heavier
    return sim * recency * proximity * burden


def reconcile(subject: Subject, adjusted: list[AdjustedComp], cfg: AdjustmentConfig) -> ReconcileResult:
    raws = {ac.comp.comp_id: _raw_weight(subject, ac, cfg) for ac in adjusted}
    total = sum(raws.values()) or 1.0
    weights = {cid: round(w / total, 4) for cid, w in raws.items()}

    weighted = [ac.model_copy(update={"weight": weights[ac.comp.comp_id]}) for ac in adjusted]

    vals = [ac.adjusted_value for ac in adjusted]
    point_raw = sum(ac.adjusted_value * weights[ac.comp.comp_id] for ac in adjusted)
    point = _round_to(point_raw, 500)
    dispersion = statistics.pstdev(vals) if len(vals) > 1 else 0.0
    spread = max(dispersion, point * 0.008)          # floor the band at ~0.8% of point
    low = _round_to(point - spread, 500)
    high = _round_to(point + spread, 500)
    high = max(high, point)                           # guard ordering
    spread_pct = round((high - low) / point * 100.0, 2) if point else 0.0

    value_range = ValueRange(low=low, point=point, high=high, spread_pct=spread_pct)

    drivers: dict[str, dict[str, str]] = {}
    for ac in adjusted:
        comp = ac.comp
        sim = similarity(subject, comp, cfg).score
        drivers[comp.comp_id] = {
            "similarity": similarity_label(sim),
            "recency": f"{max(0, contract_age_days(subject, comp))} d",
            "distance": f"{comp.distance_km:.1f} km" if comp.distance_km is not None else "—",
            "burden": f"{ac.gross_pct:.1f}% gross",
        }

    return ReconcileResult(adjusted=weighted, value_range=value_range, weights=weights, weight_drivers=drivers)
