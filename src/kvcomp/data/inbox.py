"""
data/inbox.py — a small demo "inbox" of deals for the triage queue.

The product story: deals arrive (brokers, originators, builders — by email or portal) and
pile up; the lender must independently value each one's collateral. This module stands in for
that intake queue with 12 deterministic demo deals, deliberately spread so triage lands four
GREEN (file it), five YELLOW (a human should look), and three RED (evidence can't defend a
range yet).

Each deal is the SAME KIND the core already handles: a grounded Subject plus a candidate comp
universe priced through the matched-pair contributory model (data/comp_generator.build_comp),
so every deal runs through the unchanged run()/pipeline path — no new core, no new math. The
bucket a deal lands in is an emergent property of its comp set, not a label we attach:

  * fresh, in-district, well-bracketed sets stop at tier 0 -> GREEN
  * a stale comp opens the deep-widening tier, or heavy adjustments fire review flags -> YELLOW
  * a thin set (< min_comp_count) or a too-wide raw spread -> RED

Every deal's universe is a SHARED PLANTED-REJECT SCAFFOLD (scenario.reject_scaffold — the five
reason-coded rejects: TOO_STALE, GROSS_ADJ_TOO_HIGH, WRONG_DISTRICT_AFTER_WIDENING, OUTLIER_PRICE,
DUPLICATE) plus a per-flavor SURVIVOR set. The rejects are constant, so comp rejection — the
highest-value domain beat — is visible on every row; the survivor set alone steers the bucket.

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
from kvcomp.data.scenario import adjacent_district, reject_scaffold
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


# GLA deltas for a clean 5-comp survivor set. CLUSTERED, not linearly spaced, on purpose: a
# symmetric linear spread {-2a,-a,0,a,2a} puts the extreme comp at exactly 2·MAD of the set, right
# on the OUTLIER_PRICE_INCLUDED threshold, so per-comp sale noise tips a legitimate GREEN survivor
# in and out of "outlier" at random. Bunching the outer pair near the inner one keeps max-dev/MAD
# comfortably below 2 (no selected survivor reads as an outlier) while still giving MAD a non-zero
# base so the planted C-H reject is caught.
_CLEAN_GLAD = (-110, -80, 0, 80, 110)


def _with_scaffold(subject: Subject, cfg: AdjustmentConfig, seed: int,
                   rows: list[dict]) -> list[Comp]:
    """Every deal's universe = the shared 5 planted rejects (scenario.reject_scaffold) + this
    flavor's survivor set. The rejects are constant, so comp rejection is visible on EVERY deal
    (the highest-value domain beat); the survivor set alone steers which bucket the deal lands
    in. Survivor ids are G-* (the rejects are C-*), so the two groups never collide.

    The scaffold's wrong-district reject (C-G, ~subject PPSF) and outlier reject (C-H) also
    supply two of the ≥5 candidates the MAD outlier rule needs, so a survivor set of ≥3 still
    surfaces all five reason codes."""
    return reject_scaffold(subject, cfg, seed) + _build(subject, cfg, rows, seed)


def _green(subject: Subject, cfg: AdjustmentConfig, seed: int) -> list[Comp]:
    """Five fresh, in-district, well-bracketed survivors — all inside the stale watch, modest
    deltas. Selection stops at tier 0: no widening, no stale comp, small adjustments, no review
    flag -> GREEN. The 5 planted rejects are still shown, reason-coded, alongside."""
    ages = [22, 45, 68, 90, 108]
    rows = [{"cid": f"G-{chr(65 + i)}", "age": ages[i],
             "gla_sqft": subject.gla_sqft + _CLEAN_GLAD[i],
             "lot_sqft": subject.lot_sqft + _CLEAN_GLAD[i] * 5} for i in range(5)]
    return _with_scaffold(subject, cfg, seed, rows)


def _stale_survivor(subject: Subject, cfg: AdjustmentConfig, seed: int) -> list[Comp]:
    """Four fresh survivors plus one on the stale watch (~155 days). The selected stale comp
    opens the confirmatory deep-widening tier -> DEEP_WIDENING + STALE_COMP (both review) ->
    YELLOW. Five survivors selected, so the set is not thin."""
    ages = [35, 58, 80, 101, 155]
    rows = [{"cid": f"G-{chr(65 + i)}", "age": ages[i],
             "gla_sqft": subject.gla_sqft + _CLEAN_GLAD[i],
             "lot_sqft": subject.lot_sqft + _CLEAN_GLAD[i] * 5} for i in range(5)]
    return _with_scaffold(subject, cfg, seed, rows)


def _superior(subject: Subject, cfg: AdjustmentConfig, seed: int) -> list[Comp]:
    """Five survivors that are UNIFORMLY a class above the subject (top quality and condition), so
    every one carries a net downward adjustment past the net review band -> EXCESSIVE_NET_ADJ
    (review) -> YELLOW. Keeping the upgrade uniform makes the five a single tight PPSF cluster — no
    member is a lone MAD outlier, so all five stay selected (the heavy adjustment is the story, not
    a thin set). They share the clustered GLA spread for a stable MAD base."""
    ages = [30, 52, 68, 86, 104]
    rows = [{"cid": f"G-{chr(65 + i)}", "age": ages[i],
             "gla_sqft": subject.gla_sqft + _CLEAN_GLAD[i],
             "lot_sqft": subject.lot_sqft + _CLEAN_GLAD[i] * 5,
             "quality": Quality.Q1, "condition": Condition.C1,
             "full_baths": subject.full_baths + 1,
             "basement_finished_sqft": subject.basement_finished_sqft + 400} for i in range(5)]
    return _with_scaffold(subject, cfg, seed, rows)


def _adjacent(subject: Subject, cfg: AdjustmentConfig, seed: int) -> list[Comp]:
    """Two in-district survivors plus two from the adjacent district. Tier-0 finds only two, so
    selection widens to tier 1; the adjacent comps price off the city-wide fallback series ->
    UNSUPPORTED_TIME_ADJ (review) + ADJACENT_DISTRICT_COMP (info) -> YELLOW."""
    adj = adjacent_district(subject.district)
    rows = [
        {"cid": "G-A", "age": 40, "gla_sqft": subject.gla_sqft - 90},
        {"cid": "G-B", "age": 70, "gla_sqft": subject.gla_sqft + 80},
        {"cid": "G-C", "age": 60, "gla_sqft": subject.gla_sqft + 20, "district": adj, "dist": 3.2},
        {"cid": "G-D", "age": 92, "gla_sqft": subject.gla_sqft - 40, "district": adj, "dist": 3.8},
    ]
    return _with_scaffold(subject, cfg, seed, rows)


def _thin(subject: Subject, cfg: AdjustmentConfig, seed: int) -> list[Comp]:
    """Only three qualifying survivors — after the planted rejects are filtered, the selected
    count falls below min_comp_count -> THIN_COMP_SET (a red flag), and chasing the count down
    the tiers fires DEEP_WIDENING: a genuinely hard-to-bracket subject, not a starved feed -> RED.
    The single thin red in the roster (the brief allows at most one)."""
    rows = [
        {"cid": "G-A", "age": 44, "gla_sqft": subject.gla_sqft + 15},
        {"cid": "G-B", "age": 73, "gla_sqft": subject.gla_sqft - 35},
        {"cid": "G-C", "age": 96, "gla_sqft": subject.gla_sqft + 45},
    ]
    return _with_scaffold(subject, cfg, seed, rows)


# Graduated quality/condition/age ladder across six fresh survivors: the RAW (pre-adjustment)
# sale prices span well past the 30% wide-spread watch while each comp still brackets the subject
# within the hard caps. The story is "evidence too dispersed to defend a tight range," not "too
# few comps" — WIDE_UNADJUSTED_SPREAD (a red flag) -> RED. The two band-driven reds use this.
_WIDE_LADDER = [
    {"age": 35, "gla_d": 70, "condition": Condition.C1, "quality": Quality.Q1, "year_built": 2012,
     "bsmt_d": 600, "full_d": 1},
    {"age": 48, "gla_d": 30, "condition": Condition.C1, "quality": Quality.Q2, "year_built": 2006},
    {"age": 62, "gla_d": 5, "condition": Condition.C2, "quality": Quality.Q3, "year_built": 1998},
    {"age": 75, "gla_d": -10, "condition": Condition.C4, "quality": Quality.Q4, "year_built": 1978},
    {"age": 88, "gla_d": -25, "condition": Condition.C5, "quality": Quality.Q5, "year_built": 1966},
    {"age": 100, "gla_d": 20, "condition": Condition.C5, "quality": Quality.Q5, "year_built": 1962},
]


def _wide(subject: Subject, cfg: AdjustmentConfig, seed: int) -> list[Comp]:
    """Six fresh survivors graduated from a top-quality new build to an original-condition older
    home, so the raw price range exceeds the wide-unadjusted-spread watch -> WIDE_UNADJUSTED_SPREAD
    (a red flag) -> RED. Band-driven, not starvation: the set is full, just too dispersed."""
    rows = []
    for i, r in enumerate(_WIDE_LADDER):
        row = {"cid": f"G-{chr(65 + i)}", "age": r["age"],
               "gla_sqft": subject.gla_sqft + r["gla_d"], "condition": r["condition"],
               "quality": r["quality"], "year_built": r["year_built"]}
        if "bsmt_d" in r:
            row["basement_finished_sqft"] = subject.basement_finished_sqft + r["bsmt_d"]
        if "full_d" in r:
            row["full_baths"] = subject.full_baths + r["full_d"]
        rows.append(row)
    return _with_scaffold(subject, cfg, seed, rows)


# ---------------------------------------------------------------------------
# The deals.
# ---------------------------------------------------------------------------
def _deals() -> list[tuple[str, str, Subject, str]]:
    """(deal id, blurb opener, subject, flavor name). Subjects span districts and value tiers;
    the flavor's survivor set steers the bucket. Every deal carries the shared 5 planted rejects,
    so rejection is visible on all twelve. Target emergent spread: 4 GREEN / 5 YELLOW / 3 RED,
    with exactly one thin red and two band-driven (wide-spread) reds.

    Bucket robustness rests on two district facts. GREEN deals sit in SERIES-BACKED, mid-value
    districts (South/East): the encoded benchmark means no in-district fallback fires (no
    UNSUPPORTED_TIME_ADJ), and the value scale keeps the planted gross/outlier rejects firing
    cleanly rather than leaking into selection. YELLOW deals sit in NO-SERIES districts
    (South East / North / North East): every in-district comp prices off the city-wide fallback,
    so UNSUPPORTED_TIME_ADJ (review) fires for any healthy survivor set — a robust yellow floor
    that the per-flavor flag (STALE_COMP, EXCESSIVE_NET_ADJ, ADJACENT_DISTRICT_COMP) sits on top
    of. RED deals get there on survivor structure alone (thin set, or too-wide raw spread)."""
    return [
        # --- GREEN: clean, fresh, well-bracketed (series-backed, mid-value) ----
        ("KV-1042", "Detached two-storey",
         _subject(address="84xx Bonaventure Drive SE", district=District.SOUTH,
                  lat=50.9583, lon=-114.0540, roll_number="074-21-335-07", assessed_value=687_500,
                  year_built=1984, gla_sqft=1450, lot_sqft=5242, beds_ag=3, full_baths=2, half_baths=1),
         "green"),
        ("KV-1043", "Detached family home",
         _subject(address="9xx Penbrooke Road SE", district=District.EAST,
                  lat=51.0402, lon=-113.9461, roll_number="058-13-915-04", assessed_value=472_000,
                  year_built=1979, gla_sqft=1180, lot_sqft=4600, beds_ag=3, full_baths=1, half_baths=1),
         "green"),
        ("KV-1044", "Renovated two-storey",
         _subject(address="51xx Lake Bonavista Drive SE", district=District.SOUTH,
                  lat=50.9610, lon=-114.0612, roll_number="074-22-118-04", assessed_value=712_000,
                  year_built=1988, gla_sqft=1560, lot_sqft=5500, beds_ag=3, full_baths=2, half_baths=1),
         "green"),
        ("KV-1045", "Updated bungalow",
         _subject(address="74xx 21A Street SE", district=District.EAST,
                  lat=51.0380, lon=-113.9520, roll_number="058-15-402-06", assessed_value=448_000,
                  year_built=1977, gla_sqft=1140, lot_sqft=4500, beds_ag=3, full_baths=1, half_baths=0),
         "green"),

        # --- YELLOW: a human should look (no-series districts) ----------------
        ("KV-1051", "Detached two-storey",
         _subject(address="14xx Lake Sylvan Drive SE", district=District.SOUTH_EAST,
                  lat=50.9210, lon=-113.9750, roll_number="081-30-441-08", assessed_value=706_000,
                  year_built=1992, gla_sqft=1530, lot_sqft=4400, beds_ag=3, full_baths=2, half_baths=1),
         "stale_survivor"),
        ("KV-1052", "Larger detached home",
         _subject(address="52xx 4th Street NE", district=District.NORTH,
                  lat=51.0930, lon=-114.0560, roll_number="029-30-118-02", assessed_value=651_000,
                  year_built=1996, gla_sqft=1420, lot_sqft=4400, beds_ag=3, full_baths=2, half_baths=1),
         "superior"),
        ("KV-1053", "Detached bungalow",
         _subject(address="38xx Marbank Drive NE", district=District.NORTH_EAST,
                  lat=51.0710, lon=-113.9760, roll_number="047-12-330-01", assessed_value=561_000,
                  year_built=1980, gla_sqft=1240, lot_sqft=4800, beds_ag=3, full_baths=2, half_baths=1),
         "adjacent"),
        ("KV-1054", "Detached two-storey",
         _subject(address="92xx Auburn Bay Avenue SE", district=District.SOUTH_EAST,
                  lat=50.8970, lon=-113.9580, roll_number="081-34-552-01", assessed_value=698_000,
                  year_built=1998, gla_sqft=1560, lot_sqft=4500, beds_ag=4, full_baths=2, half_baths=1),
         "superior"),
        ("KV-1055", "Character home",
         _subject(address="15xx 7th Street NE", district=District.NORTH,
                  lat=51.0750, lon=-113.9850, roll_number="029-09-114-06", assessed_value=638_000,
                  year_built=1986, gla_sqft=1400, lot_sqft=4300, beds_ag=3, full_baths=2, half_baths=1),
         "stale_survivor"),

        # --- RED: evidence can't defend a range yet ---------------------------
        ("KV-1061", "Detached two-storey",
         _subject(address="61xx Maple Ridge Drive SE", district=District.SOUTH,
                  lat=50.9550, lon=-114.0500, roll_number="074-19-770-03", assessed_value=695_000,
                  year_built=1983, gla_sqft=1440, lot_sqft=5200, beds_ag=3, full_baths=2, half_baths=1),
         "thin"),
        ("KV-1062", "Detached family home",
         _subject(address="3xx Penworth Road SE", district=District.EAST,
                  lat=51.0360, lon=-113.9510, roll_number="058-18-980-07", assessed_value=466_000,
                  year_built=1981, gla_sqft=1200, lot_sqft=4600, beds_ag=3, full_baths=2, half_baths=0),
         "wide"),
        ("KV-1063", "Detached bungalow",
         _subject(address="51xx Rundlehorn Drive NE", district=District.NORTH_EAST,
                  lat=51.0820, lon=-113.9560, roll_number="047-24-117-05", assessed_value=548_000,
                  year_built=1978, gla_sqft=1220, lot_sqft=4700, beds_ag=3, full_baths=1, half_baths=1),
         "wide"),
    ]


_FLAVORS = {
    "green": _green,
    "stale_survivor": _stale_survivor,
    "superior": _superior,
    "adjacent": _adjacent,
    "thin": _thin,
    "wide": _wide,
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
