"""
Time-engine math (TESTING §2): contract-date (not close-date) anchoring against the encoded
CREB South series; exact factor + dollar; extrapolation path beyond the series.
"""

from __future__ import annotations

from datetime import date

from kvcomp.data.constants import SOUTH_BENCHMARK_SERIES as S
from kvcomp.domain.time_engine import time_adjustment
from kvcomp.schemas.subject import District


def test_factor_and_dollars_off_south_series():
    # contract 2026-04 (718,000) -> effective 2026-06 (721,600)
    ta = time_adjustment(District.SOUTH, date(2026, 4, 11), date(2026, 6, 1), sale_price=712_000)
    expected_factor = S["2026-06"] / S["2026-04"] - 1
    assert ta.time_factor == expected_factor
    assert ta.benchmark_at_contract == 718_000
    assert ta.benchmark_at_effective == 721_600
    # dollar adjustment is rounded to the nearest $50 (matches the locked viewer buildComp)
    assert ta.time_adj == round(712_000 * expected_factor / 50) * 50
    assert ta.unsupported is False


def test_anchors_on_contract_not_close_date():
    early = time_adjustment(District.SOUTH, date(2026, 1, 8), date(2026, 6, 1), 700_000)
    late = time_adjustment(District.SOUTH, date(2026, 5, 8), date(2026, 6, 1), 700_000)
    # An older contract month sits lower on the rising series -> a larger upward adjustment.
    assert early.time_adj > late.time_adj > 0


def test_missing_contract_date_is_unsupported_zero():
    ta = time_adjustment(District.SOUTH, None, date(2026, 6, 1), 700_000)
    assert ta.time_adj == 0 and ta.unsupported is True


def test_fallback_district_flagged_unsupported():
    # South East has no encoded series -> city-wide fallback -> unsupported flag.
    ta = time_adjustment(District.SOUTH_EAST, date(2026, 2, 14), date(2026, 6, 1), 700_000)
    assert ta.unsupported is True


def test_extrapolation_beyond_series_is_unsupported():
    # 2025-01 is before the South series start (2025-06) -> extrapolated, unsupported.
    ta = time_adjustment(District.SOUTH, date(2025, 1, 15), date(2026, 6, 1), 650_000)
    assert ta.unsupported is True
    assert ta.benchmark_at_contract > 0
