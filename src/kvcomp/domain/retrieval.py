"""
domain/retrieval.py — candidate retrieval + similarity scoring.

Fills retrieval-time fields (distance_km, same_district) against a given subject and
scores each candidate's similarity in [0,1] from a weighted blend of structural distance,
geographic distance, and recency. Similarity feeds the widening preference order and the
reconciliation weights (domain/reconcile.py). No rejection logic here — that is
domain/rejection.py; no selection — that is domain/widening.py.
"""

from __future__ import annotations

import math

from kvcomp.schemas.comp import Comp
from kvcomp.schemas.config import AdjustmentConfig
from kvcomp.schemas.results import SimilarityScore
from kvcomp.schemas.subject import Subject

_EARTH_KM = 6371.0


def haversine_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlmb = math.radians(lon2 - lon1)
    a = math.sin(dphi / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dlmb / 2) ** 2
    return _EARTH_KM * 2 * math.asin(math.sqrt(a))


def ppsf(comp: Comp) -> int:
    return round(comp.sale_price / comp.gla_sqft)


def contract_age_days(subject: Subject, comp: Comp) -> int:
    return (subject.effective_date - comp.contract_date).days


def retrieve(subject: Subject, comps: list[Comp]) -> list[Comp]:
    """Fill distance_km (haversine if absent) and same_district for each candidate."""
    out: list[Comp] = []
    for c in comps:
        dist = c.distance_km
        if dist is None:
            dist = round(haversine_km(subject.lat, subject.lon, c.lat, c.lon), 1)
        out.append(c.model_copy(update={
            "distance_km": dist,
            "same_district": c.district == subject.district,
        }))
    return out


def similarity(subject: Subject, comp: Comp, cfg: AdjustmentConfig) -> SimilarityScore:
    """Blend structural closeness, distance, and recency into a [0,1] score."""
    # Structural component: relative deltas on the key continuous attributes.
    gla_d = abs(comp.gla_sqft - subject.gla_sqft) / max(1, subject.gla_sqft)
    lot_d = abs(comp.lot_sqft - subject.lot_sqft) / max(1, subject.lot_sqft)
    age_d = abs(comp.year_built - subject.year_built) / 60.0
    bed_d = abs(comp.beds_ag - subject.beds_ag) / 3.0
    bath_d = (abs(comp.full_baths - subject.full_baths) + abs(comp.half_baths - subject.half_baths)) / 3.0
    bsmt_d = abs(comp.basement_finished_sqft - subject.basement_finished_sqft) / max(1, subject.basement_finished_sqft or 1)
    struct = 1.0 - min(1.0, 0.9 * gla_d + 0.5 * lot_d + 0.6 * age_d + 0.3 * bed_d + 0.3 * bath_d + 0.3 * bsmt_d)

    dist_km = comp.distance_km if comp.distance_km is not None else 0.0
    dist_score = max(0.0, 1.0 - dist_km / 8.0)        # 0 km -> 1, 8 km -> 0

    age_days = max(0, contract_age_days(subject, comp))
    recency_score = max(0.0, 1.0 - age_days / 274.0)  # effective -> 1, 9 mo -> 0

    score = max(0.0, min(1.0, 0.6 * struct + 0.2 * dist_score + 0.2 * recency_score))
    return SimilarityScore(
        comp_id=comp.comp_id,
        score=round(score, 4),
        components={
            "structural": round(struct, 4),
            "distance": round(dist_score, 4),
            "recency": round(recency_score, 4),
        },
    )


def similarity_label(score: float) -> str:
    return "high" if score >= 0.82 else "moderate" if score >= 0.6 else "low"
