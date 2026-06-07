"""
data/inbox.py — a small demo "inbox" of deals for the triage queue.

The product story: deals arrive (brokers, originators, builders — by email or portal) and
pile up; the lender must independently value each one's collateral. This module stands in for
that intake queue with ~13 deterministic demo deals, deliberately spread so triage lands some
GREEN (file it), several YELLOW (a human should look), and at least two RED (evidence can't
defend a range yet).

Each deal is the SAME KIND the core already handles: a grounded Subject plus a candidate comp
universe priced through the matched-pair contributory model (data/comp_generator.build_comp),
so every deal runs through the unchanged run()/pipeline path — no new core, no new math. The
bucket a deal lands in is an emergent property of its comp set, not a label we attach:

  * fresh, in-district, well-bracketed sets stop at tier 0 -> GREEN
  * a stale comp opens the deep-widening tier, or heavy adjustments fire review flags -> YELLOW
  * a thin set (< min_comp_count) or a low confidence band -> RED

Each deal also carries a raw, unstructured `blurb` — the kind of text a broker actually sends —
which the live intake beat (narrative/intake_agent.py) parses into a grounded Subject. The
queue itself builds Subjects directly; the blurb is there so the demo can SHOW intake parsing
one deal rather than assuming it.
"""

from __future__ import annotations

import random
from dataclasses import dataclass
from datetime import date, timedelta

from kvcomp.data.comp_generator import build_comp
from kvcomp.data.scenario import adjacent_district
from kvcomp.data.subject_loader import build_subject
from kvcomp.schemas.comp import Comp
from kvcomp.schemas.config import AdjustmentConfig
from kvcomp.schemas.subject import Condition, District, GarageType, Quality, Subject

_EFF = date(2026, 6, 1)
_STALL_WORD = {1: "single", 2: "double", 3: "triple"}


@dataclass(frozen=True)
class InboxDeal:
    """One queued deal: an id, the raw listing blurb, the grounded Subject, and its candidate
    comp universe. run(subject, candidates=candidates) turns it into a full MemoArtifact."""
    id: str
    blurb: str
    subject: Subject
    candidates: list[Comp]


# ---------------------------------------------------------------------------
# Subject + blurb helpers.
# ---------------------------------------------------------------------------
def _subject(**kw) -> Subject:
    """Thin wrapper over build_subject with the shared effective date + R-C1 land use."""
    kw.setdefault("effective_date", _EFF)
    kw.setdefault("land_use", "R-C1")
    kw.setdefault("assessment_roll_year", 2026)
    return build_subject(**kw)


def _blurb(subject: Subject, *, opener: str) -> str:
    """A natural, unstructured listing blurb stating the fields the intake parser reads, so the
    live intake beat can ground it. Phrasing varies by opener; the parseable tokens do not."""
    g = subject
    stalls = _STALL_WORD.get(g.garage_stalls, f"{g.garage_stalls}-car")
    gtype = g.garage_type.value if g.garage_type != GarageType.NONE else "no"
    walk = " with a walkout" if g.basement_walkout else ""
    return (
        f"{opener} at {g.address}. {g.gla_sqft:,} sq ft above grade on a {g.lot_sqft:,} sf lot, "
        f"{g.beds_ag} bedrooms, {g.full_baths} full baths and {g.half_baths} half bath. "
        f"Built {g.year_built}, {stalls} {gtype} garage, {g.basement_finished_sqft} sq ft "
        f"finished basement{walk}."
    )


# ---------------------------------------------------------------------------
# Universe builder + flavors.
# ---------------------------------------------------------------------------
_PHYS_KEYS = ("gla_sqft", "lot_sqft", "beds_ag", "full_baths", "half_baths",
              "basement_finished_sqft", "year_built", "condition", "quality")


def _build(subject: Subject, cfg: AdjustmentConfig, rows: list[dict], seed: int) -> list[Comp]:
    """Price each row into a Comp via the contributory model. A row gives a contract `age`
    (days before effective), optional attribute overrides, an optional `district`, and an
    optional `price_override` (for an outlier/duplicate-style raw price)."""
    rng = random.Random(seed)
    comps: list[Comp] = []
    for i, r in enumerate(rows):
        contract = subject.effective_date - timedelta(days=r["age"])
        overrides = {k: r[k] for k in _PHYS_KEYS if k in r}
        cid = r["cid"]
        comp = build_comp(
            subject, cfg, overrides, contract, seed, noise=True, rng=rng,
            comp_id=cid, label=f"COMP-{cid.split('-')[-1]}", mls=r.get("mls", f"C-{2000 + i}"),
            district=r.get("district", subject.district),
        )
        if r.get("price_override"):
            comp = comp.model_copy(update={"sale_price": r["price_override"]})
        comp = comp.model_copy(update={"distance_km": r.get("dist", round(0.6 + 0.3 * i, 1))})
        comps.append(comp)
    return comps


# A genuine GLA spread keeps the PPSF distribution wide enough that the MAD outlier rule has a
# stable base — near-identical comps make MAD tiny, so noise alone false-fires OUTLIER_PRICE and
# thins the set. This spread keeps a 5-comp clean set fully selected across South/West/East.
_CLEAN_GLAD = (-120, -60, 0, 70, 140)


def _fresh_clean(subject: Subject, cfg: AdjustmentConfig, seed: int, n: int = 5) -> list[Comp]:
    """n fresh, in-district, well-bracketed comps — all inside the stale watch, modest deltas.
    Selection stops at tier 0: no widening, no stale, small adjustments -> GREEN."""
    ages = [22, 45, 68, 90, 108][:n]
    glad = _CLEAN_GLAD[:n]
    rows = [{"cid": f"F-{chr(65 + i)}", "age": ages[i],
             "gla_sqft": subject.gla_sqft + glad[i],
             "lot_sqft": subject.lot_sqft + glad[i] * 5} for i in range(n)]
    return _build(subject, cfg, rows, seed)


def _one_stale(subject: Subject, cfg: AdjustmentConfig, seed: int) -> list[Comp]:
    """Four fresh comps plus one on the stale watch (~155 days). The stale comp opens the deep
    widening tier -> DEEP_WIDENING + STALE_COMP (both review) -> YELLOW."""
    ages = [35, 58, 80, 101, 155]
    rows = [{"cid": f"S-{chr(65 + i)}", "age": ages[i],
             "gla_sqft": subject.gla_sqft + _CLEAN_GLAD[i],
             "lot_sqft": subject.lot_sqft + _CLEAN_GLAD[i] * 5} for i in range(5)]
    return _build(subject, cfg, rows, seed)


def _superior_set(subject: Subject, cfg: AdjustmentConfig, seed: int) -> list[Comp]:
    """Fresh comps that are materially larger/better than the subject — adjustments push past
    the gross/net review bands (but under the hard 25% candidate cap), firing review flags ->
    YELLOW. n=4 (< 5) so the MAD outlier rule stays off; the superiority is the story."""
    rows = [
        {"cid": "U-A", "age": 30, "gla_sqft": subject.gla_sqft + 500, "quality": Quality.Q1,
         "condition": Condition.C2, "basement_finished_sqft": subject.basement_finished_sqft + 450},
        {"cid": "U-B", "age": 52, "gla_sqft": subject.gla_sqft + 460, "quality": Quality.Q2,
         "condition": Condition.C1},
        {"cid": "U-C", "age": 77, "gla_sqft": subject.gla_sqft + 540, "quality": Quality.Q1,
         "full_baths": subject.full_baths + 1},
        {"cid": "U-D", "age": 99, "gla_sqft": subject.gla_sqft + 480, "quality": Quality.Q2,
         "condition": Condition.C2},
    ]
    return _build(subject, cfg, rows, seed)


def _adjacent_heavy(subject: Subject, cfg: AdjustmentConfig, seed: int) -> list[Comp]:
    """Two in-district comps plus two from the adjacent district. The adjacent comps price off
    the city-wide fallback series -> UNSUPPORTED_TIME_ADJ + ADJACENT_DISTRICT_COMP -> YELLOW."""
    adj = adjacent_district(subject.district)
    rows = [
        {"cid": "J-A", "age": 40, "gla_sqft": subject.gla_sqft - 90},
        {"cid": "J-B", "age": 70, "gla_sqft": subject.gla_sqft + 80},
        {"cid": "J-C", "age": 60, "gla_sqft": subject.gla_sqft + 20, "district": adj, "dist": 3.2},
        {"cid": "J-D", "age": 92, "gla_sqft": subject.gla_sqft - 40, "district": adj, "dist": 3.8},
    ]
    return _build(subject, cfg, rows, seed)


def _thin(subject: Subject, cfg: AdjustmentConfig, seed: int) -> list[Comp]:
    """Only three qualifying comps — below min_comp_count -> THIN_COMP_SET (a red flag): the
    weighted reconciliation has too little evidence to defend a range -> RED."""
    rows = [
        {"cid": "T-A", "age": 44, "gla_sqft": subject.gla_sqft + 15},
        {"cid": "T-B", "age": 73, "gla_sqft": subject.gla_sqft - 35},
        {"cid": "T-C", "age": 96, "gla_sqft": subject.gla_sqft + 45},
    ]
    return _build(subject, cfg, rows, seed)


# ---------------------------------------------------------------------------
# The deals.
# ---------------------------------------------------------------------------
def _deals() -> list[tuple[str, str, Subject, str]]:
    """(deal id, blurb opener, subject, flavor name). Subjects span districts, value tiers,
    staleness, and comp quality so the queue spreads across all three buckets."""
    return [
        # --- GREEN: clean, fresh, well-bracketed -------------------------------
        ("KV-1042", "Detached two-storey",
         _subject(address="84xx Bonaventure Drive SE", district=District.SOUTH,
                  lat=50.9583, lon=-114.0540, roll_number="074-21-335-07", assessed_value=687_500,
                  year_built=1984, gla_sqft=1450, lot_sqft=5242, beds_ag=3, full_baths=2, half_baths=1),
         "fresh_clean"),
        ("KV-1043", "Updated bungalow",
         _subject(address="120xx Canso Place SW", district=District.WEST,
                  lat=51.0207, lon=-114.1573, roll_number="091-44-218-09", assessed_value=962_000,
                  year_built=1998, gla_sqft=1820, lot_sqft=6100, beds_ag=4, full_baths=3, half_baths=1),
         "fresh_clean"),
        ("KV-1044", "Detached family home",
         _subject(address="9xx Penbrooke Road SE", district=District.EAST,
                  lat=51.0402, lon=-113.9461, roll_number="058-13-915-04", assessed_value=472_000,
                  year_built=1979, gla_sqft=1180, lot_sqft=4600, beds_ag=3, full_baths=1, half_baths=1),
         "fresh_clean"),
        ("KV-1045", "Renovated two-storey",
         _subject(address="51xx Lake Bonavista Drive SE", district=District.SOUTH,
                  lat=50.9610, lon=-114.0612, roll_number="074-22-118-04", assessed_value=712_000,
                  year_built=1988, gla_sqft=1560, lot_sqft=5500, beds_ag=3, full_baths=2, half_baths=1),
         "fresh_clean"),

        # --- YELLOW: a human should look --------------------------------------
        ("KV-1051", "Detached two-storey",
         _subject(address="47xx Signal Hill Court SW", district=District.WEST,
                  lat=51.0150, lon=-114.1600, roll_number="091-44-300-02", assessed_value=985_000,
                  year_built=1996, gla_sqft=1900, lot_sqft=6400, beds_ag=4, full_baths=3, half_baths=1),
         "one_stale"),
        ("KV-1052", "Larger detached home",
         _subject(address="98xx Elbow Drive SW", district=District.SOUTH,
                  lat=50.9700, lon=-114.0720, roll_number="074-30-441-08", assessed_value=731_000,
                  year_built=1985, gla_sqft=1470, lot_sqft=5300, beds_ag=3, full_baths=2, half_baths=1),
         "superior"),
        ("KV-1053", "Detached bungalow",
         _subject(address="22xx Acadia Drive SE", district=District.SOUTH,
                  lat=50.9650, lon=-114.0560, roll_number="074-25-208-05", assessed_value=668_000,
                  year_built=1982, gla_sqft=1410, lot_sqft=5100, beds_ag=3, full_baths=2, half_baths=0),
         "adjacent"),
        ("KV-1054", "Detached two-storey",
         _subject(address="40xx Brentwood Road NW", district=District.NORTH_WEST,
                  lat=51.0850, lon=-114.1340, roll_number="063-18-552-01", assessed_value=765_000,
                  year_built=1990, gla_sqft=1600, lot_sqft=5600, beds_ag=4, full_baths=2, half_baths=1),
         "fresh_clean"),  # NW has no encoded series -> UNSUPPORTED_TIME_ADJ -> yellow
        ("KV-1055", "Character home",
         _subject(address="15xx 7th Street NE", district=District.NORTH_EAST,
                  lat=51.0750, lon=-113.9850, roll_number="047-09-114-06", assessed_value=548_000,
                  year_built=1976, gla_sqft=1240, lot_sqft=4800, beds_ag=3, full_baths=1, half_baths=1),
         "one_stale"),

        # --- RED: evidence can't defend a range yet ---------------------------
        ("KV-1061", "Detached two-storey",
         _subject(address="61xx Maple Ridge Drive SE", district=District.SOUTH,
                  lat=50.9550, lon=-114.0500, roll_number="074-19-770-03", assessed_value=695_000,
                  year_built=1983, gla_sqft=1440, lot_sqft=5200, beds_ag=3, full_baths=2, half_baths=1),
         "thin"),
        ("KV-1062", "Detached home",
         _subject(address="29xx Edgemont Boulevard NW", district=District.NORTH_WEST,
                  lat=51.1100, lon=-114.1300, roll_number="063-22-980-07", assessed_value=712_000,
                  year_built=1992, gla_sqft=1520, lot_sqft=5400, beds_ag=3, full_baths=2, half_baths=1),
         "thin"),
        ("KV-1063", "Detached bungalow",
         _subject(address="8xx Inglewood Drive SE", district=District.CITY_CENTRE,
                  lat=51.0350, lon=-114.0200, roll_number="031-04-221-02", assessed_value=942_000,
                  year_built=1971, gla_sqft=1120, lot_sqft=4400, beds_ag=2, full_baths=1, half_baths=0),
         "thin"),
    ]


_FLAVORS = {
    "fresh_clean": _fresh_clean,
    "one_stale": _one_stale,
    "superior": _superior_set,
    "adjacent": _adjacent_heavy,
    "thin": _thin,
}


def inbox_subjects() -> list[Subject]:
    """The deal subjects only (no candidate universes built) — cheap. Used by the intake agent's
    Open Calgary stand-in so a deal blurb grounds to the same parcel the queue values."""
    return [subj for _, _, subj, _ in _deals()]


def inbox(cfg: AdjustmentConfig | None = None) -> list[InboxDeal]:
    """Build the demo inbox. Each deal's comp universe is generated deterministically (seeded
    off the deal id) so the queue is byte-stable across runs."""
    cfg = cfg or AdjustmentConfig()
    deals: list[InboxDeal] = []
    for deal_id, opener, subject, flavor in _deals():
        seed = sum(ord(ch) for ch in deal_id)  # deterministic per-deal seed
        candidates = _FLAVORS[flavor](subject, cfg, seed)
        deals.append(InboxDeal(id=deal_id, blurb=_blurb(subject, opener=opener),
                               subject=subject, candidates=candidates))
    return deals
