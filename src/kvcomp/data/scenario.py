"""
data/scenario.py — the curated demo comp universe for the sample South subject.

The round-trip test drives `comp_generator.generate_comps` (random deltas). The DEMO,
by contrast, needs a deterministic 9-comp universe that exercises the full pipeline:
exactly three widening tiers and all five rejection reason codes (USE_CASE Beat 2,
viewer/data.js COMP-A…I). Every comp here is priced through the SAME contributory model
(comp_generator.build_comp) so the grid stays internally consistent; only the attributes,
districts, and contract dates are hand-chosen to trigger the real selection rules.

Per ADR-004 the core's computed numbers win over the hand-authored fixture, so prices and
adjustments are derived here, not transcribed.
"""

from __future__ import annotations

import random
from datetime import date

from kvcomp.data.comp_generator import build_comp
from kvcomp.data.constants import DISTRICT_ADJACENCY, DISTRICT_BENCHMARK
from kvcomp.schemas.comp import Comp
from kvcomp.schemas.config import AdjustmentConfig
from kvcomp.schemas.subject import Condition, District, GarageType, Quality, Subject

# Communities are display-only; district drives the topology rules.
_COMMUNITY = {
    "C-A": "Lake Bonavista", "C-B": "Lake Bonavista", "C-C": "Lake Bonavista",
    "C-D": "Willow Park", "C-E": "Lake Bonavista", "C-F": "Lake Bonavista",
    "C-G": "Glamorgan", "C-H": "Lake Bonavista", "C-I": "Lake Bonavista",
}


def community_for(comp_id: str) -> str:
    return _COMMUNITY.get(comp_id, "Lake Bonavista")


def adjacent_district(d: District) -> District:
    """The directly-adjacent district whose benchmark is CLOSEST to the subject's — the most
    comparable tier-1 neighbour. For South this resolves to South East (the curated demo's
    historical tier-1 comp); generalises to any subject district. Tie-break by enum value."""
    anchor = DISTRICT_BENCHMARK[d]
    neighbours = DISTRICT_ADJACENCY.get(d, frozenset())
    if not neighbours:
        return d
    return min(neighbours, key=lambda n: (abs(DISTRICT_BENCHMARK[n] - anchor), n.value))


def nonadjacent_district(d: District) -> District:
    """A genuinely non-adjacent district whose benchmark is FARTHEST from the subject's — a
    clearly different market that should be caught by WRONG_DISTRICT_AFTER_WIDENING. For South
    this resolves to West (across the Glenmore corridor — the historical reject). Tie-break by
    enum value."""
    anchor = DISTRICT_BENCHMARK[d]
    adj = DISTRICT_ADJACENCY.get(d, frozenset())
    candidates = [x for x in District if x != d and x not in adj]
    if not candidates:
        return d
    return max(candidates, key=lambda n: (abs(DISTRICT_BENCHMARK[n] - anchor), n.value))


def _spec() -> list[dict]:
    """Attribute/contract specs for the 9 curated candidates (absolute attribute values).

    `drole` resolves to a concrete district relative to the SUBJECT at build time (see
    generate_universe): 'subject' = same district, 'adjacent' = closest neighbour (tier-1),
    'nonadjacent' = farthest non-neighbour (the wrong-district reject). This keeps the demo
    coherent for any subject district instead of being hard-wired to South."""
    return [
        # --- tier-0, same district, fresh, well-bracketed -> SELECTED ---
        dict(cid="C-A", mls="C-2208", drole="subject", contract=date(2026, 4, 11),
             gla=1485, lot=5350, beds=3, full=2, half=1, bsmt=600, walkout=False,
             gar=GarageType.ATTACHED, stalls=2, built=1985, cond=Condition.C3, qual=Quality.Q3),
        dict(cid="C-B", mls="C-2156", drole="subject", contract=date(2026, 2, 19),
             gla=1390, lot=5050, beds=3, full=2, half=0, bsmt=540, walkout=False,
             gar=GarageType.ATTACHED, stalls=2, built=1981, cond=Condition.C3, qual=Quality.Q3),
        # superior dwelling: bigger/newer/better condition+quality -> EXCESSIVE_GROSS_ADJ flag
        # (Q2, not the fixture's inconsistent Q4 — ADR-004 core-wins; keeps the sign coherent)
        dict(cid="C-C", mls="C-2241", drole="subject", contract=date(2026, 3, 6),
             gla=1820, lot=7100, beds=4, full=3, half=0, bsmt=820, walkout=False,
             gar=GarageType.ATTACHED, stalls=2, built=1996, cond=Condition.C2, qual=Quality.Q2),
        # --- tier-1 adjacent district, stale-ish -> SELECTED w/ flags ---
        dict(cid="C-D", mls="C-2089", drole="adjacent", contract=date(2026, 1, 8),
             gla=1430, lot=5150, beds=3, full=2, half=1, bsmt=620, walkout=False,
             gar=GarageType.ATTACHED, stalls=2, built=1983, cond=Condition.C3, qual=Quality.Q3),
        # --- rejections ---
        # E: contract 405 days before effective -> TOO_STALE
        dict(cid="C-E", mls="C-1804", drole="subject", contract=date(2025, 4, 22),
             gla=1460, lot=5300, beds=3, full=2, half=1, bsmt=600, walkout=False,
             gar=GarageType.ATTACHED, stalls=2, built=1984, cond=Condition.C3, qual=Quality.Q3),
        # F: huge/superior -> gross adjustment over the 25% candidate cap -> GROSS_ADJ_TOO_HIGH
        dict(cid="C-F", mls="C-2233", drole="subject", contract=date(2026, 3, 29),
             gla=2210, lot=9800, beds=5, full=3, half=1, bsmt=1100, walkout=True,
             gar=GarageType.ATTACHED, stalls=3, built=2009, cond=Condition.C1, qual=Quality.Q1),
        # G: non-adjacent district -> WRONG_DISTRICT_AFTER_WIDENING
        dict(cid="C-G", mls="C-2170", drole="nonadjacent", contract=date(2026, 2, 14),
             gla=1505, lot=5400, beds=3, full=2, half=1, bsmt=580, walkout=False,
             gar=GarageType.ATTACHED, stalls=2, built=1986, cond=Condition.C3, qual=Quality.Q3),
        # H: deep price discount (non-arm's-length) -> PPSF outlier -> OUTLIER_PRICE
        dict(cid="C-H", mls="C-2195", drole="subject", contract=date(2026, 3, 12),
             gla=1470, lot=5260, beds=3, full=2, half=1, bsmt=600, walkout=False,
             gar=GarageType.ATTACHED, stalls=2, built=1984, cond=Condition.C4, qual=Quality.Q4,
             price_override=596000),
        # I: same parcel as C-A (re-list) -> DUPLICATE
        dict(cid="C-I", mls="C-7741", drole="subject", contract=date(2026, 4, 11),
             gla=1485, lot=5350, beds=3, full=2, half=1, bsmt=600, walkout=False,
             gar=GarageType.ATTACHED, stalls=2, built=1985, cond=Condition.C3, qual=Quality.Q3,
             duplicate_of="C-A"),
    ]


def generate_universe(subject: Subject, cfg: AdjustmentConfig | None = None,
                      seed: int = 614) -> list[Comp]:
    """Build the curated 9-comp candidate universe, each priced via the contributory model.

    `duplicate_of`/`price_override` let two specs drive the DUPLICATE and OUTLIER_PRICE
    rejections deterministically. Distances are assigned per-spec (display + weighting)."""
    cfg = cfg or AdjustmentConfig()
    rng = random.Random(seed)
    distances = {"C-A": 0.7, "C-B": 1.1, "C-C": 1.9, "C-D": 3.1, "C-E": 0.9,
                 "C-F": 1.4, "C-G": 6.2, "C-H": 1.2, "C-I": 0.7}
    # Resolve each spec's role to a concrete district RELATIVE to this subject, so the demo
    # universe re-districts (not just re-prices) for any subject (Task 1 robustness).
    drole_to_district = {
        "subject": subject.district,
        "adjacent": adjacent_district(subject.district),
        "nonadjacent": nonadjacent_district(subject.district),
    }

    comps: list[Comp] = []
    by_id: dict[str, Comp] = {}
    for s in _spec():
        district = drole_to_district[s["drole"]]
        overrides = {
            "gla_sqft": s["gla"], "lot_sqft": s["lot"], "beds_ag": s["beds"],
            "full_baths": s["full"], "half_baths": s["half"],
            "basement_finished_sqft": s["bsmt"], "basement_walkout": s["walkout"],
            "garage_type": s["gar"], "garage_stalls": s["stalls"],
            "year_built": s["built"], "condition": s["cond"], "quality": s["qual"],
        }
        comp = build_comp(
            subject, cfg, overrides, s["contract"], seed, noise=True, rng=rng,
            comp_id=s["cid"], label=f"COMP-{s['cid'][-1]}", mls=s["mls"], district=district,
            # The wrong-district reject is priced off the city-wide fallback, not its far
            # district's trend (it never reaches the grid), so its price stays invariant to
            # whether that district carries an encoded series.
            force_fallback_series=(s["drole"] == "nonadjacent"),
        )
        # A duplicate re-lists an already-built parcel at the same price.
        if s.get("duplicate_of"):
            twin = by_id[s["duplicate_of"]]
            comp = comp.model_copy(update={"sale_price": twin.sale_price})
        if s.get("price_override"):
            comp = comp.model_copy(update={"sale_price": s["price_override"]})
        comp = comp.model_copy(update={"distance_km": distances.get(s["cid"])})
        comps.append(comp)
        by_id[s["cid"]] = comp
    return comps
