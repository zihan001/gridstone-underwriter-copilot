"""
data/constants.py — Alberta-specific, HIGH-confidence CREB constants encoded as typed
tables. Cross-checked against docs/research/Research_Report.md (AREA 2 + AREA 4) and the
authoritative South-district series in viewer/data.js (ADR-003/ADR-004).

These are the only non-proxy numbers in the system: the CREB monthly benchmark series
(per district), the district benchmark table, and the CREB "typical home attributes"
table. Every dollar magnitude in AdjustmentConfig is a labeled US/North-American proxy;
everything here is Alberta market data.
"""

from __future__ import annotations

from kvcomp.schemas.subject import District

# ---------------------------------------------------------------------------
# CREB detached benchmark — monthly series, per district ($).
# Oldest -> effective month. The South series is the authoritative fixture for
# test_time_engine.py (ADR-003); it matches viewer/data.js exactly. City-wide is the
# documented fallback (DOMAIN.md §4 / Research_Report AREA 2) used when a comp's district
# has no encoded series -> fires UNSUPPORTED_TIME_ADJ.
# ---------------------------------------------------------------------------

SOUTH_BENCHMARK_SERIES: dict[str, int] = {
    "2025-06": 690000,
    "2025-07": 694000,
    "2025-08": 697500,
    "2025-09": 700000,
    "2025-10": 703000,
    "2025-11": 705500,
    "2025-12": 707200,
    "2026-01": 709000,
    "2026-02": 712000,
    "2026-03": 715000,
    "2026-04": 718000,
    "2026-05": 720500,
    "2026-06": 721600,  # effective month
}

# City-wide detached benchmark (DOMAIN.md §4 fallback; Research_Report AREA 2).
CITY_BENCHMARK_SERIES: dict[str, int] = {
    "2025-01": 749300, "2025-02": 758400, "2025-03": 766600, "2025-04": 766300,
    "2025-05": 766300, "2025-06": 761300, "2025-07": 758100, "2025-08": 752500,
    "2025-09": 746500, "2025-10": 740400, "2025-11": 730300, "2025-12": 726300,
    "2026-01": 724000, "2026-02": 734300, "2026-03": 741300, "2026-04": 745400,
    "2026-05": 747800,
}

# Per-district series registry. Only South is encoded at monthly resolution for the
# sample; any other district falls back to city-wide (and the time engine flags it).
BENCHMARK_SERIES: dict[District, dict[str, int]] = {
    District.SOUTH: SOUTH_BENCHMARK_SERIES,
}

CITY_BENCHMARK_FALLBACK = CITY_BENCHMARK_SERIES

# Effective-date benchmark used for the market-context header.
CITY_BENCHMARK_EFFECTIVE = 747800  # CREB May 2026 city-wide (latest published)


# ---------------------------------------------------------------------------
# District benchmark table (CREB May 2026; Research_Report AREA 4). Used for the
# market-context header and as the generator's per-district price anchor.
# ---------------------------------------------------------------------------
DISTRICT_BENCHMARK: dict[District, int] = {
    District.WEST: 1005200,
    District.CITY_CENTRE: 985500,
    District.NORTH_WEST: 799000,
    District.SOUTH: 721600,
    District.SOUTH_EAST: 704200,
    District.NORTH: 647200,
    District.NORTH_EAST: 563900,
    District.EAST: 489100,
}


# ---------------------------------------------------------------------------
# District adjacency topology (tier-1 widening). South is adjacent to SE/East but NOT
# West — West is separated by the Glenmore corridor (viewer/data.js COMP-G rejection
# rationale). Symmetric map; used by widening + the WRONG_DISTRICT_AFTER_WIDENING code.
# ---------------------------------------------------------------------------
DISTRICT_ADJACENCY: dict[District, frozenset[District]] = {
    District.CITY_CENTRE: frozenset({District.NORTH_WEST, District.NORTH_EAST, District.WEST, District.EAST}),
    District.NORTH: frozenset({District.NORTH_WEST, District.NORTH_EAST}),
    District.NORTH_EAST: frozenset({District.NORTH, District.CITY_CENTRE, District.EAST}),
    District.NORTH_WEST: frozenset({District.NORTH, District.CITY_CENTRE, District.WEST}),
    District.WEST: frozenset({District.NORTH_WEST, District.CITY_CENTRE}),
    District.SOUTH: frozenset({District.SOUTH_EAST, District.EAST}),
    District.SOUTH_EAST: frozenset({District.SOUTH, District.EAST}),
    District.EAST: frozenset({District.SOUTH, District.SOUTH_EAST, District.NORTH_EAST, District.CITY_CENTRE}),
}


def is_adjacent(a: District, b: District) -> bool:
    """True if district b is the subject district a or directly adjacent to it."""
    return a == b or b in DISTRICT_ADJACENCY.get(a, frozenset())


# ---------------------------------------------------------------------------
# CREB "typical home attributes — detached", per district (Research_Report AREA 4).
# Generator defaults; the sample South subject matches its district-typical row.
# ---------------------------------------------------------------------------
class TypicalAttributes:
    __slots__ = ("gla_sqft", "lot_sqft", "beds_ag", "year_built", "full_baths", "half_baths")

    def __init__(self, gla_sqft, lot_sqft, beds_ag, year_built, full_baths, half_baths):
        self.gla_sqft = gla_sqft
        self.lot_sqft = lot_sqft
        self.beds_ag = beds_ag
        self.year_built = year_built
        self.full_baths = full_baths
        self.half_baths = half_baths


DISTRICT_TYPICAL: dict[District, TypicalAttributes] = {
    District.CITY_CENTRE: TypicalAttributes(1257, 5252, 3, 1952, 2, 0),
    District.NORTH_EAST: TypicalAttributes(1198, 4119, 3, 1985, 2, 1),
    District.NORTH: TypicalAttributes(1396, 4380, 3, 1998, 2, 1),
    District.NORTH_WEST: TypicalAttributes(1582, 5349, 3, 1994, 2, 1),
    District.WEST: TypicalAttributes(1769, 5608, 3, 1998, 2, 1),
    District.SOUTH: TypicalAttributes(1450, 5242, 3, 1984, 2, 1),
    District.SOUTH_EAST: TypicalAttributes(1522, 4262, 3, 2001, 2, 1),
    District.EAST: TypicalAttributes(1103, 4871, 3, 1973, 2, 0),
}

# City-wide PPSF above-grade (CENTURY 21 mid-2025; Research_Report AREA 4). Provenance /
# header only — NOT used as a line rate (the GLA line uses the calibrated $85/sf).
CITY_PPSF_ABOVE_GRADE = 474

GENERATOR_VERSION = "kvcomp-gen/1.0.0"
