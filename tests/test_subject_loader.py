"""
Subject grounding (TESTING §3): a mocked Open Calgary record maps to a valid Subject with
honest per-field provenance; physical fields are NEVER claimed as open-data-grounded. One
optional live integration smoke test (skipped without network).
"""

from __future__ import annotations

import os
from datetime import date

import pytest

from kvcomp.schemas.subject import District, FieldSource, Subject
from kvcomp.data.subject_loader import (
    default_subject,
    fetch_open_calgary,
    subject_from_open_calgary,
)

MOCK_RECORD = {
    "roll_number": "074-21-335-07",
    "address": "84xx Bonaventure Drive SE",
    "comm_name": "LAKE BONAVISTA",
    "assessed_value": "687500",
    "land_use_designation": "R-C1",
    "roll_year": "2026",
    "year_of_construction": "1984",
    "latitude": "50.9583",
    "longitude": "-114.0540",
}


def test_mock_record_maps_to_valid_subject():
    subj = subject_from_open_calgary(MOCK_RECORD, effective_date=date(2026, 6, 1))
    assert isinstance(subj, Subject)
    assert subj.district == District.SOUTH
    assert subj.assessed_value == 687_500
    assert subj.land_use == "R-C1"
    assert subj.year_built == 1984


def test_physical_fields_are_not_open_calgary_grounded():
    subj = subject_from_open_calgary(MOCK_RECORD, effective_date=date(2026, 6, 1))
    for field in ("gla_sqft", "lot_sqft", "beds_ag", "full_baths", "condition", "quality"):
        assert subj.provenance[field] != FieldSource.OPEN_CALGARY
    # Identity IS grounded.
    assert subj.provenance["assessed_value"] == FieldSource.OPEN_CALGARY
    assert subj.provenance["address"] == FieldSource.OPEN_CALGARY


def test_year_built_grounded_only_when_roll_year_recent():
    recent = subject_from_open_calgary(MOCK_RECORD, effective_date=date(2026, 6, 1))
    assert recent.provenance["year_built"] == FieldSource.OPEN_CALGARY  # roll_year 2026 >= 2020
    old = subject_from_open_calgary({**MOCK_RECORD, "roll_year": "2015"}, effective_date=date(2026, 6, 1))
    assert old.provenance["year_built"] != FieldSource.OPEN_CALGARY


def test_default_subject_is_the_use_case_sample():
    subj = default_subject()
    assert subj.district == District.SOUTH
    assert (subj.gla_sqft, subj.lot_sqft, subj.year_built) == (1450, 5242, 1984)
    assert subj.effective_date == date(2026, 6, 1)


@pytest.mark.skipif(not os.environ.get("KVCOMP_LIVE_OPENCALGARY"),
                    reason="set KVCOMP_LIVE_OPENCALGARY=1 to run the live Open Calgary integration smoke test")
def test_live_open_calgary_smoke():
    subj = fetch_open_calgary("074-21-335-07", effective_date=date(2026, 6, 1))
    assert isinstance(subj, Subject)
