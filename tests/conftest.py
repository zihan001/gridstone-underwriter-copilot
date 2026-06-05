"""
Shared fixtures. The `sample_subject` is the ONE concrete subject carried end-to-end
(docs/USE_CASE.md) — a South-district detached grounded from an Open Calgary record.
Every test and the demo use it, so it lives here once.
"""

from __future__ import annotations

from datetime import date

import pytest

from kvcomp.schemas import AdjustmentConfig, District, Subject


@pytest.fixture
def config() -> AdjustmentConfig:
    return AdjustmentConfig()


@pytest.fixture
def sample_subject() -> Subject:
    # District South CREB typical attributes; benchmark $721,600 (USE_CASE.md).
    return Subject(
        address="84xx Bonaventure Drive SE",
        district=District.SOUTH,
        lat=50.9583,
        lon=-114.0540,
        roll_number="074-21-335-07",
        assessed_value=687_500,
        land_use="R-C1",
        assessment_roll_year=2026,
        gla_sqft=1450,
        lot_sqft=5242,
        beds_ag=3,
        full_baths=2,
        half_baths=1,
        year_built=1984,
        basement_finished_sqft=600,
        basement_walkout=False,
        garage_stalls=2,
        # garage_type / condition / quality default per schema
        effective_date=date(2026, 6, 1),
    )
