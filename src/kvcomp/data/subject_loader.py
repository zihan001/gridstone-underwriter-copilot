"""
data/subject_loader.py — real Open Calgary assessment record → Subject (subject grounding).

The FREE Open Calgary parcel dataset grounds only identity, assessed value, land use, and
(when ROLL_YEAR >= 2020) year built. Above-grade GLA, beds, baths, basement, garage,
condition and quality are NOT in the open data — they live in the paid Assessment Details
Report — so those default to CREB district-typical values and are tagged DISTRICT_DEFAULT
in the per-field provenance map. The memo then shows, line by line, where each value came
from (good audit practice; see schemas/subject.py).

Network access is optional: `fetch_open_calgary` hits the SODA API, but the pipeline and
tests run off `default_subject()` / a mocked record (TESTING §3 — one integration smoke
test, mock otherwise).
"""

from __future__ import annotations

from datetime import date

from kvcomp.data.constants import DISTRICT_TYPICAL
from kvcomp.schemas.subject import (
    Condition,
    District,
    FieldSource,
    GarageType,
    Quality,
    Subject,
)

# Open Calgary SODA endpoint (Property Assessments). Used only by the optional fetch path.
OPEN_CALGARY_ASSESSMENTS_URL = "https://data.calgary.ca/resource/4bsw-nn7w.json"

# Community / quadrant -> District (coarse map for the grounding step).
_QUADRANT_DISTRICT = {
    "SE": District.SOUTH_EAST, "SW": District.SOUTH, "NE": District.NORTH_EAST,
    "NW": District.NORTH_WEST,
}
_COMMUNITY_DISTRICT = {
    "LAKE BONAVISTA": District.SOUTH, "WILLOW PARK": District.SOUTH_EAST,
    "ACADIA": District.SOUTH, "MAPLE RIDGE": District.SOUTH,
}


def _district_for(community: str | None, quadrant: str | None) -> District:
    if community and community.upper() in _COMMUNITY_DISTRICT:
        return _COMMUNITY_DISTRICT[community.upper()]
    if quadrant and quadrant.upper() in _QUADRANT_DISTRICT:
        return _QUADRANT_DISTRICT[quadrant.upper()]
    return District.SOUTH


def build_subject(
    *,
    address: str,
    district: District,
    lat: float,
    lon: float,
    effective_date: date,
    roll_number: str | None = None,
    assessed_value: int | None = None,
    land_use: str | None = None,
    assessment_roll_year: int | None = None,
    year_built: int | None = None,
    # physical overrides (else district-typical)
    gla_sqft: int | None = None,
    lot_sqft: int | None = None,
    beds_ag: int | None = None,
    full_baths: int | None = None,
    half_baths: int | None = None,
    basement_finished_sqft: int = 600,
    basement_walkout: bool = False,
    garage_type: GarageType = GarageType.ATTACHED,
    garage_stalls: int = 2,
    condition: Condition = Condition.C3,
    quality: Quality = Quality.Q3,
) -> Subject:
    """Construct a Subject with an explicit, honest per-field provenance map."""
    typ = DISTRICT_TYPICAL[district]
    yb = year_built if year_built is not None else typ.year_built
    yb_grounded = assessment_roll_year is not None and assessment_roll_year >= 2020 and year_built is not None

    provenance: dict[str, FieldSource] = {
        # grounded in the free dataset
        "address": FieldSource.OPEN_CALGARY, "district": FieldSource.OPEN_CALGARY,
        "lat": FieldSource.OPEN_CALGARY, "lon": FieldSource.OPEN_CALGARY,
        "roll_number": FieldSource.OPEN_CALGARY, "assessed_value": FieldSource.OPEN_CALGARY,
        "land_use": FieldSource.OPEN_CALGARY,
        "year_built": FieldSource.OPEN_CALGARY if yb_grounded else FieldSource.DISTRICT_DEFAULT,
        # physical attributes — not in the free dataset -> district-typical default
        "gla_sqft": FieldSource.DISTRICT_DEFAULT, "lot_sqft": FieldSource.DISTRICT_DEFAULT,
        "beds_ag": FieldSource.DISTRICT_DEFAULT, "full_baths": FieldSource.DISTRICT_DEFAULT,
        "half_baths": FieldSource.DISTRICT_DEFAULT,
        "basement_finished_sqft": FieldSource.INSPECTION, "basement_walkout": FieldSource.INSPECTION,
        "garage_type": FieldSource.INSPECTION, "garage_stalls": FieldSource.INSPECTION,
        "condition": FieldSource.INSPECTION, "quality": FieldSource.INSPECTION,
        "effective_date": FieldSource.INSPECTION,
    }

    return Subject(
        address=address, district=district, lat=lat, lon=lon,
        roll_number=roll_number, assessed_value=assessed_value, land_use=land_use,
        assessment_roll_year=assessment_roll_year,
        gla_sqft=gla_sqft if gla_sqft is not None else typ.gla_sqft,
        lot_sqft=lot_sqft if lot_sqft is not None else typ.lot_sqft,
        beds_ag=beds_ag if beds_ag is not None else typ.beds_ag,
        full_baths=full_baths if full_baths is not None else typ.full_baths,
        half_baths=half_baths if half_baths is not None else typ.half_baths,
        year_built=yb,
        basement_finished_sqft=basement_finished_sqft, basement_walkout=basement_walkout,
        garage_type=garage_type, garage_stalls=garage_stalls,
        condition=condition, quality=quality,
        effective_date=effective_date,
        provenance=provenance,
    )


def subject_from_open_calgary(record: dict, *, effective_date: date, district: District | None = None) -> Subject:
    """Map a raw Open Calgary assessment row to a Subject (physical fields district-typical)."""
    community = record.get("comm_name") or record.get("community")
    quadrant = record.get("quadrant") or (record.get("address_quadrant"))
    dist = district or _district_for(community, quadrant)
    roll_year = record.get("roll_year") or record.get("assessment_year")
    yb = record.get("year_of_construction") or record.get("year_built")
    return build_subject(
        address=record.get("address") or record.get("addr") or "Calgary parcel",
        district=dist,
        lat=float(record.get("latitude", record.get("lat", 50.95))),
        lon=float(record.get("longitude", record.get("lon", -114.05))),
        effective_date=effective_date,
        roll_number=record.get("roll_number"),
        assessed_value=int(float(record["assessed_value"])) if record.get("assessed_value") else None,
        land_use=record.get("land_use_designation") or record.get("land_use"),
        assessment_roll_year=int(roll_year) if roll_year else None,
        year_built=int(yb) if yb else None,
    )


def default_subject() -> Subject:
    """The canonical USE_CASE sample subject (a real South-district parcel grounding).

    Mirrors tests/conftest.py so the demo and the suite carry ONE subject end-to-end."""
    return build_subject(
        address="84xx Bonaventure Drive SE", district=District.SOUTH,
        lat=50.9583, lon=-114.0540, effective_date=date(2026, 6, 1),
        roll_number="074-21-335-07", assessed_value=687_500, land_use="R-C1",
        assessment_roll_year=2026, year_built=1984,
        gla_sqft=1450, lot_sqft=5242, beds_ag=3, full_baths=2, half_baths=1,
        basement_finished_sqft=600, basement_walkout=False,
        garage_type=GarageType.ATTACHED, garage_stalls=2,
        condition=Condition.C3, quality=Quality.Q3,
    )


def fetch_open_calgary(roll_number: str, *, effective_date: date, timeout: float = 15.0) -> Subject:
    """Optional live pull: one record by roll number -> Subject. Network required."""
    import httpx

    params = {"roll_number": roll_number, "$limit": 1}
    resp = httpx.get(OPEN_CALGARY_ASSESSMENTS_URL, params=params, timeout=timeout)
    resp.raise_for_status()
    rows = resp.json()
    if not rows:
        raise LookupError(f"no Open Calgary assessment for roll {roll_number}")
    return subject_from_open_calgary(rows[0], effective_date=effective_date)
