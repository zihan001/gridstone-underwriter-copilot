"""
domain/time_engine.py — market-conditions (time) adjustment from each comp's CONTRACT
date (never close date; Fannie B4-1.3-09, UBC BUSI 330), off the CREB monthly benchmark
series for the comp's DISTRICT (ADR-003).

    time_factor = bm[effective_month] / bm[contract_month] − 1
    time_adj    = round_to_50( sale_price × time_factor )

The ×50 rounding matches the viewer's buildComp so generated numbers align with the
locked render. A comp whose district has no encoded series falls back to the city-wide
series and is reported `unsupported=True` (the flag engine raises UNSUPPORTED_TIME_ADJ).
Dates beyond the encoded range are extrapolated from the nearest endpoint with a mild
monthly drift (Research_Report AREA 2: ~−2% to −3%/yr), also reported unsupported.
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import date

from kvcomp.data.constants import BENCHMARK_SERIES, CITY_BENCHMARK_FALLBACK
from kvcomp.schemas.subject import District

# Monthly drift used only to extrapolate beyond the encoded series endpoints.
_EXTRAP_MONTHLY_DRIFT = -0.0021  # ~−2.5%/yr (Research_Report AREA 2)


def month_key(d: date) -> str:
    return f"{d.year:04d}-{d.month:02d}"


def _months_between(a: str, b: str) -> int:
    """Signed whole-month distance from a to b (b − a), keys 'YYYY-MM'."""
    ay, am = int(a[:4]), int(a[5:7])
    by, bm = int(b[:4]), int(b[5:7])
    return (by - ay) * 12 + (bm - am)


def series_for(district: District) -> tuple[dict[str, int], bool]:
    """Return (series, supported). Supported is False when we fell back to city-wide."""
    s = BENCHMARK_SERIES.get(district)
    if s is not None:
        return s, True
    return CITY_BENCHMARK_FALLBACK, False


def benchmark_at(series: dict[str, int], key: str) -> tuple[int, bool]:
    """Benchmark value at month `key`. If outside the series, extrapolate from the nearest
    endpoint with the monthly drift and report in_range=False."""
    if key in series:
        return series[key], True
    keys = sorted(series)
    lo, hi = keys[0], keys[-1]
    if key < lo:
        n = _months_between(key, lo)  # months earlier than lo (positive)
        val = series[lo] * (1.0 - _EXTRAP_MONTHLY_DRIFT) ** n  # walk backward
        return int(round(val)), False
    # key > hi
    n = _months_between(hi, key)
    val = series[hi] * (1.0 + _EXTRAP_MONTHLY_DRIFT) ** n
    return int(round(val)), False


@dataclass(frozen=True)
class TimeAdjustment:
    time_adj: int
    benchmark_at_contract: int
    benchmark_at_effective: int
    time_factor: float
    unsupported: bool          # district fallback OR date extrapolated


def time_adjustment(
    district: District,
    contract_date: date | None,
    effective_date: date,
    sale_price: int,
) -> TimeAdjustment:
    series, supported = series_for(district)
    eff_key = month_key(effective_date)
    bm_eff, eff_in = benchmark_at(series, eff_key)

    if contract_date is None:
        # No contract date: cannot anchor the trend. Zero adjustment, flagged unsupported.
        return TimeAdjustment(0, bm_eff, bm_eff, 0.0, unsupported=True)

    con_key = month_key(contract_date)
    bm_con, con_in = benchmark_at(series, con_key)
    time_factor = bm_eff / bm_con - 1.0
    time_adj = int(round(sale_price * time_factor / 50.0) * 50)
    unsupported = (not supported) or (not con_in) or (not eff_in)
    return TimeAdjustment(time_adj, bm_con, bm_eff, time_factor, unsupported)
