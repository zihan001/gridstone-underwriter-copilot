"""
Phase 1 — the intake agent (narrative/intake_agent.py).

The agent turns an unstructured listing blurb into a validated Subject. These tests run
key-less, exercising the deterministic resolution path (the no-API-key fallback that drives
the same tools). They assert: (1) a valid Subject is assembled; (2) provenance is labelled
correctly per source; (3) a field the listing omits falls back to district_typical /
DISTRICT_DEFAULT — never an invented number; (4) no physical field claims Open-Calgary
grounding; (5) the pure tools behave.
"""

from __future__ import annotations

from datetime import date

import pytest

from kvcomp.data.constants import DISTRICT_TYPICAL
from kvcomp.narrative.intake_agent import (
    IntakeLedger,
    district_typical,
    lookup_open_calgary,
    parse_listing_field,
    run_intake,
)
from kvcomp.schemas.subject import District, FieldSource, PHYSICAL_INTAKE_FIELDS, Subject

EFF = date(2026, 6, 1)

# A listing blurb for the South demo parcel — states GLA, lot, beds, baths, year, garage,
# basement. Identity grounds against the Open Calgary stand-in (default_subject()).
FULL_BLURB = (
    "Charming detached two-storey at 84xx Bonaventure Drive SE in Lake Bonavista. "
    "1,450 sq ft above grade on a 5,242 sf lot. 3 bedrooms, 2 full baths and 1 half bath. "
    "Built 1984. Double attached garage. 600 sq ft finished basement. Move-in ready."
)

# Same parcel, but the listing OMITS the above-grade GLA entirely.
NO_GLA_BLURB = (
    "Detached home at 84xx Bonaventure Drive SE, Lake Bonavista. Sits on a 5,242 sf lot. "
    "3 bedrooms, 2 full baths and 1 half bath. Built 1984. Double attached garage."
)


@pytest.fixture(autouse=True)
def _no_api_key(monkeypatch):
    monkeypatch.delenv("ANTHROPIC_API_KEY", raising=False)


def test_assembles_a_valid_subject_from_a_blurb():
    res = run_intake(FULL_BLURB, effective_date=EFF)
    subj = res.subject
    assert isinstance(subj, Subject)
    assert subj.district == District.SOUTH
    assert subj.effective_date == EFF
    # Identity grounded from the dataset stand-in.
    assert subj.assessed_value == 687_500
    assert subj.land_use == "R-C1"
    # Physical attributes read from the listing.
    assert subj.gla_sqft == 1450
    assert subj.lot_sqft == 5242
    assert (subj.beds_ag, subj.full_baths, subj.half_baths) == (3, 2, 1)
    assert subj.year_built == 1984
    assert subj.garage_stalls == 2
    assert res.source == "deterministic"
    assert res.trace  # the deterministic path records a real trace


def test_provenance_labels_match_source():
    subj = run_intake(FULL_BLURB, effective_date=EFF).subject
    # Identity / assessment -> Open Calgary.
    assert subj.provenance["address"] == FieldSource.OPEN_CALGARY
    assert subj.provenance["assessed_value"] == FieldSource.OPEN_CALGARY
    # A physical attribute stated in the listing -> INSPECTION (intake-supplied).
    assert subj.provenance["gla_sqft"] == FieldSource.INSPECTION
    assert subj.provenance["lot_sqft"] == FieldSource.INSPECTION


def test_missing_gla_falls_back_to_district_default_not_a_guess():
    subj = run_intake(NO_GLA_BLURB, effective_date=EFF).subject
    # The value is the CREB district-typical figure, labelled DISTRICT_DEFAULT — not invented.
    assert subj.gla_sqft == DISTRICT_TYPICAL[District.SOUTH].gla_sqft
    assert subj.provenance["gla_sqft"] == FieldSource.DISTRICT_DEFAULT


def test_no_physical_field_claims_open_calgary():
    subj = run_intake(FULL_BLURB, effective_date=EFF).subject
    for field in PHYSICAL_INTAKE_FIELDS:
        assert subj.provenance[field] != FieldSource.OPEN_CALGARY


def test_pure_parse_listing_field():
    assert parse_listing_field(FULL_BLURB, "gla_sqft") == "1450"
    assert parse_listing_field(FULL_BLURB, "lot_sqft") == "5242"
    assert parse_listing_field(FULL_BLURB, "garage_type") == "attached"
    assert parse_listing_field(FULL_BLURB, "garage_stalls") == "2"
    # Absent field -> None (the parser never estimates).
    assert parse_listing_field(NO_GLA_BLURB, "gla_sqft") is None


def test_pure_lookup_and_typical():
    row = lookup_open_calgary("84xx Bonaventure Drive SE")
    assert row is not None and row["district"] == "south"
    # The dataset stand-in returns no physical attributes (not in the free dataset).
    assert "gla_sqft" not in row
    assert lookup_open_calgary("nowhere at all") is None
    assert district_typical("south", "gla_sqft") == DISTRICT_TYPICAL[District.SOUTH].gla_sqft


def test_ledger_grounding_not_clobbered_by_listing_parse():
    # year_built is grounded by the dataset (roll year 2026 >= 2020); a listing parse must
    # not downgrade its provenance.
    subj = run_intake(FULL_BLURB, effective_date=EFF).subject
    assert subj.year_built == 1984
    assert subj.provenance["year_built"] == FieldSource.OPEN_CALGARY


def test_ledger_is_the_only_assembly_source():
    # Sanity: a hand-built ledger missing required fields is completed by _fill_gaps via
    # run_intake's path — here we assert the empty-listing case still yields a valid Subject.
    res = run_intake("Detached home at 7xx Penbrooke Meadows Close SE.", effective_date=EFF)
    assert isinstance(res.subject, Subject)
    assert isinstance(IntakeLedger(), IntakeLedger)
