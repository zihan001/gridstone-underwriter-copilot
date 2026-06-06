"""
Durability guards for the multi-case demo (South hero + West/East contrasts).

Two invariants the earlier district-agnostic pass left true only by coincidence:

1. The South hero's West-district reject (C-G) must price off the CITY-WIDE fallback series,
   NOT BENCHMARK_SERIES[WEST]. This is what keeps the committed hero (viewer/data.js) byte-
   invariant to the newly-added West series — assert it explicitly, with a non-vacuous contrast.
2. Each demo case's reconciled point must land in a sane band of its district benchmark, so a
   re-priced universe that silently drifted off-market would be caught.
"""

from __future__ import annotations

import pytest

from kvcomp.data import constants
from kvcomp.data.constants import DISTRICT_BENCHMARK
from kvcomp.data.scenario import generate_universe
from kvcomp.data.subject_loader import default_subject, demo_subjects
from kvcomp.pipeline import run
from kvcomp.schemas.results import ReasonCode
from kvcomp.schemas.subject import District


def _by_id(comps):
    return {c.comp_id: c for c in comps}


def test_hero_west_reject_prices_off_city_fallback_not_west_series(monkeypatch):
    """C-G (the South hero's non-adjacent reject) resolves to West and is priced off the
    city-wide fallback, so its price — and thus the committed hero — is invariant to the
    West series. The contrast half proves the West series is genuinely live elsewhere."""
    south = default_subject()
    cg_base = _by_id(generate_universe(south))["C-G"]
    # nonadjacent(South) == West (across the Glenmore corridor); it never reaches the grid.
    assert cg_base.district is District.WEST

    # Baselines captured BEFORE patching: the South hero C-G, and a genuinely West in-district
    # comp (the West case's tier-0 C-A, priced off the West series, not forced to fallback).
    west = demo_subjects()["west"]
    ca_west_base = _by_id(generate_universe(west))["C-A"]
    assert ca_west_base.district is District.WEST and ca_west_base.same_district

    # Perturb the SHAPE of the West series (mutate the dict the time engine reads by reference).
    # A uniform rescale would cancel in the matched pair (price depends only on the
    # contract/effective benchmark RATIO), so skew month-to-month to break that ratio.
    src = constants.BENCHMARK_SERIES[District.WEST]
    perturbed = {k: int(src[k] * (1.0 + 0.4 * i)) for i, k in enumerate(sorted(src))}
    monkeypatch.setitem(constants.BENCHMARK_SERIES, District.WEST, perturbed)

    # The hero's C-G is UNCHANGED — it prices off the city-wide fallback, not the West series.
    cg_after = _by_id(generate_universe(south))["C-G"]
    assert cg_after.sale_price == cg_base.sale_price

    # ...and the perturbation is NOT a no-op: a West in-district comp DOES move. Without this,
    # the invariance above could pass simply because the West series were dead/unused code.
    ca_west_after = _by_id(generate_universe(west))["C-A"]
    assert ca_west_after.sale_price != ca_west_base.sale_price


def test_hero_west_reject_is_wrong_district_rejection():
    """Tie the invariant to behaviour: C-G is excluded as WRONG_DISTRICT_AFTER_WIDENING, i.e.
    it never reaches the grid — which is precisely why forcing it onto the fallback is safe."""
    result = run(default_subject())
    rej = {r.comp_id: r.reason_code for r in result.memo.rejected}
    assert rej.get("C-G") is ReasonCode.WRONG_DISTRICT_AFTER_WIDENING


@pytest.mark.parametrize("case", ["south", "east", "west"])
def test_demo_case_point_lands_near_district_benchmark(case):
    """Each case's reconciled point lands within a sane band (±5%) of its district benchmark:
    South ≈ $721,600, East ≈ $489,100, West ≈ $1,005,200."""
    subject = demo_subjects()[case]
    point = run(subject).memo.value_range.point
    benchmark = DISTRICT_BENCHMARK[subject.district]
    assert abs(point - benchmark) / benchmark < 0.05, (
        f"{case}: point {point:,} drifted >5% from district benchmark {benchmark:,}"
    )
