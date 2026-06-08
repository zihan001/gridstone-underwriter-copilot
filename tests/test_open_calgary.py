"""
Commit 0 — grounding the inbox subjects in REAL Open Calgary parcel records.

These tests lock three things:
  * the committed cache fixture exists, is non-trivial, and parses (the repo stays hermetic —
    every grounded subject traces to a record a reviewer can look up, with no network at run);
  * the loader maps a real cached row to a valid Subject whose IDENTITY and LOT are
    Open-Calgary-grounded, with lat/lon derived from the parcel geometry (NOT the old fake
    50.95/-114.05 default);
  * the validator invariant still bites — a field genuinely absent from the free dataset
    (gla_sqft) may NOT claim open-data grounding, even after lot_sqft moved into it.

The fetch path is exercised against a MOCKED transport — the suite never makes a live HTTP call.
"""

from __future__ import annotations

from datetime import date

import pytest

from kvcomp.data import open_calgary
from kvcomp.data.open_calgary import (
    CURATED_COMMUNITIES,
    fetch_detached_parcels,
    load_fixture,
)
from kvcomp.data.subject_loader import subject_from_open_calgary
from kvcomp.schemas.subject import (
    OPEN_CALGARY_GROUNDED,
    PHYSICAL_INTAKE_FIELDS,
    FieldSource,
    Subject,
)

_REQUIRED_KEYS = (
    "roll_number", "address", "comm_code", "assessed_value",
    "year_of_construction", "land_use_designation", "land_size_sf", "multipolygon",
)


@pytest.fixture(scope="module")
def rows() -> list[dict]:
    return load_fixture()


# ---------------------------------------------------------------------------
# The committed fixture.
# ---------------------------------------------------------------------------
def test_fixture_exists_and_is_non_trivial(rows):
    assert len(rows) >= 12, f"fixture has only {len(rows)} parcels"


def test_every_row_has_the_required_fields_and_they_parse(rows):
    for r in rows:
        for key in _REQUIRED_KEYS:
            assert key in r, f"row {r.get('roll_number')} missing {key}"
        # The numeric fields are string-typed in SODA ("729000.0") — they must parse.
        assert int(float(r["assessed_value"])) > 0
        assert 1850 < int(float(r["year_of_construction"])) <= 2026
        assert int(float(r["land_size_sf"])) > 0
        # Geometry is a GeoJSON MultiPolygon with a usable first ring.
        assert r["multipolygon"]["coordinates"][0][0]


def test_every_fixture_comm_code_is_in_the_curated_map(rows):
    """Every cached community resolves to a curated District (the fallback included)."""
    known = set(CURATED_COMMUNITIES) | set(open_calgary.FALLBACK_COMMUNITIES)
    for r in rows:
        assert r["comm_code"] in known, f"uncurated comm_code {r['comm_code']!r}"


# ---------------------------------------------------------------------------
# Mapping a real cached row -> Subject.
# ---------------------------------------------------------------------------
def test_real_row_maps_to_valid_grounded_subject(rows):
    row = rows[0]
    subj = subject_from_open_calgary(row, effective_date=date(2026, 6, 1))
    assert isinstance(subj, Subject)
    # Identity + lot are Open-Calgary-grounded.
    assert subj.provenance["address"] == FieldSource.OPEN_CALGARY
    assert subj.provenance["lot_sqft"] == FieldSource.OPEN_CALGARY
    assert subj.lot_sqft > 0
    # lat/lon come from the multipolygon centroid -> inside the Calgary bbox, NOT 50.95/-114.05.
    assert 50.8 <= subj.lat <= 51.2, f"lat {subj.lat} outside Calgary"
    assert -114.3 <= subj.lon <= -113.8, f"lon {subj.lon} outside Calgary"
    assert (subj.lat, subj.lon) != (50.95, -114.05), "fell back to the old fake default"


def test_district_is_resolved_from_comm_code(rows):
    by_code = {r["comm_code"]: r for r in rows}
    for code, district in CURATED_COMMUNITIES.items():
        if code not in by_code:
            continue
        subj = subject_from_open_calgary(by_code[code], effective_date=date(2026, 6, 1))
        assert subj.district == district


# ---------------------------------------------------------------------------
# The validator invariant survives the lot_sqft move.
# ---------------------------------------------------------------------------
def test_lot_sqft_moved_into_open_calgary_grounded():
    assert "lot_sqft" in OPEN_CALGARY_GROUNDED
    assert "lot_sqft" not in PHYSICAL_INTAKE_FIELDS


def test_validator_still_rejects_gla_claiming_open_calgary(rows):
    """gla_sqft is genuinely not in the free dataset — claiming it is must still fail loud."""
    subj = subject_from_open_calgary(rows[0], effective_date=date(2026, 6, 1))
    kwargs = {name: getattr(subj, name) for name in Subject.model_fields if name != "provenance"}
    bad = {**subj.provenance, "gla_sqft": FieldSource.OPEN_CALGARY}
    with pytest.raises(ValueError, match="open_calgary"):
        Subject(**kwargs, provenance=bad)


# ---------------------------------------------------------------------------
# The fetch path — MOCKED, never a live HTTP call. (Constructing an httpx.Client is offline;
# only .get() would touch the network, and _fetch_community — its only caller — is stubbed.)
# ---------------------------------------------------------------------------
def test_fetch_detached_parcels_visits_communities_without_network(monkeypatch):
    calls: list[str] = []

    def fake_fetch_community(client, comm_code, per_community, **kw):
        calls.append(comm_code)
        return [{"roll_number": f"{comm_code}-1", "comm_code": comm_code}]

    monkeypatch.setattr(open_calgary, "_fetch_community", fake_fetch_community)

    got = fetch_detached_parcels(per_community=1)
    # Every curated community is visited; the fallback (ROY) is also pulled because the 11
    # curated communities are fewer than the twelve the cache guarantees.
    assert set(CURATED_COMMUNITIES).issubset(calls)
    assert set(open_calgary.FALLBACK_COMMUNITIES).issubset(calls)
    assert len(got) == len(calls) == len(CURATED_COMMUNITIES) + len(open_calgary.FALLBACK_COMMUNITIES)
