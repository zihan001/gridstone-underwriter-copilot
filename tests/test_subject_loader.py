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

# A faithful mock of one real SODA row: every value is a string (note the ".0" suffixes),
# the district comes from the real comm_code (LKB), lot size is published (land_size_sf), and
# there are NO flat lat/lon fields — coordinates live in the GeoJSON multipolygon. The ring is
# a small square near Lake Bonavista so the derived centroid lands inside the Calgary bbox.
MOCK_RECORD = {
    "roll_number": "074-21-335-07",
    "address": "84xx Bonaventure Drive SE",
    "comm_code": "LKB",
    "comm_name": "LAKE BONAVISTA",
    "assessed_value": "687500.0",
    "land_use_designation": "R-C1",
    "land_size_sf": "5242.0",
    "roll_year": "2026",
    "year_of_construction": "1984.0",
    "multipolygon": {
        "type": "MultiPolygon",
        "coordinates": [[[
            [-114.0545, 50.9580], [-114.0545, 50.9586],
            [-114.0535, 50.9586], [-114.0535, 50.9580], [-114.0545, 50.9580],
        ]]],
    },
}


def test_mock_record_maps_to_valid_subject():
    subj = subject_from_open_calgary(MOCK_RECORD, effective_date=date(2026, 6, 1))
    assert isinstance(subj, Subject)
    assert subj.district == District.SOUTH            # from comm_code LKB
    assert subj.assessed_value == 687_500
    assert subj.land_use == "R-C1"
    assert subj.year_built == 1984
    assert subj.lot_sqft == 5242                      # land_size_sf, rounded
    # Coordinates are derived from the parcel geometry, not a fabricated default.
    assert 50.8 <= subj.lat <= 51.2 and -114.3 <= subj.lon <= -113.8


def test_open_data_grounds_identity_and_lot_but_not_above_grade_physicals():
    subj = subject_from_open_calgary(MOCK_RECORD, effective_date=date(2026, 6, 1))
    # Above-grade physicals are NOT in the free dataset -> never claimed as open-data-grounded.
    for field in ("gla_sqft", "beds_ag", "full_baths", "condition", "quality"):
        assert subj.provenance[field] != FieldSource.OPEN_CALGARY
    # Identity AND lot size ARE grounded (land_size_sf is published).
    assert subj.provenance["assessed_value"] == FieldSource.OPEN_CALGARY
    assert subj.provenance["address"] == FieldSource.OPEN_CALGARY
    assert subj.provenance["lot_sqft"] == FieldSource.OPEN_CALGARY


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
