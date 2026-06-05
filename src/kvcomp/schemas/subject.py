"""
schemas/subject.py — the shared attribute schema (grid rows).

Provenance change (Jun 5): the free Open Calgary parcel dataset grounds only
identity, assessed value, land use, and (ROLL_YEAR >= 2020) year built. Above-grade
GLA, beds, baths, basement, garage, condition, and quality are NOT in the open data —
they live in the paid Assessment Details Report. So those fields are an inspection/
intake step, defaulted here to CREB district-typical values. Subject now carries a
per-field provenance map so the memo can show, line by line, where each value came
from. This is good audit practice, not a workaround.
"""

from __future__ import annotations
from datetime import date
from enum import Enum
from pydantic import BaseModel, Field, model_validator


# ---- enums -----------------------------------------------------------------
class District(str, Enum):
    CITY_CENTRE = "city_centre"; NORTH_EAST = "north_east"; NORTH = "north"
    NORTH_WEST = "north_west"; WEST = "west"; SOUTH = "south"
    SOUTH_EAST = "south_east"; EAST = "east"


class Condition(str, Enum):   # UAD C1–C6 analog (labeled proxy)
    C1 = "C1"; C2 = "C2"; C3 = "C3"; C4 = "C4"; C5 = "C5"; C6 = "C6"


class Quality(str, Enum):     # UAD Q1–Q6 analog (labeled proxy)
    Q1 = "Q1"; Q2 = "Q2"; Q3 = "Q3"; Q4 = "Q4"; Q5 = "Q5"; Q6 = "Q6"


class GarageType(str, Enum):
    NONE = "none"; DETACHED = "detached"; ATTACHED = "attached"; TANDEM = "tandem"


class LenderProfile(str, Enum):
    FNMA_OFF = "fnma_off"     # 15/25 informational only
    GSE_ON = "gse_on"         # 15/25 flagged louder (Freddie/FHA/VA/USDA)


class FieldSource(str, Enum):
    """Per-field provenance. Drives the provenance column in the memo."""
    OPEN_CALGARY = "open_calgary"            # grounded in the free parcel dataset
    INSPECTION = "inspection"                # appraiser/underwriter-supplied (intake)
    DISTRICT_DEFAULT = "district_typical"    # CREB district-typical fallback (research report)
    ASSESSMENT_DETAIL = "assessment_detail"  # from the PAID Assessment Details Report (optional)


# Which Subject fields the free Open Calgary parcel dataset can actually ground.
# Everything else defaults to INSPECTION (or DISTRICT_DEFAULT when auto-filled).
OPEN_CALGARY_GROUNDED: frozenset[str] = frozenset({
    "address", "district", "lat", "lon", "roll_number",
    "assessed_value", "land_use", "year_built",   # year_built only if ROLL_YEAR >= 2020
})

# The physical attributes the open data does NOT contain — grid rows that must be
# inspected or defaulted. Asserting this set keeps the provenance map honest.
PHYSICAL_INTAKE_FIELDS: frozenset[str] = frozenset({
    "gla_sqft", "lot_sqft", "beds_ag", "full_baths", "half_baths",
    "basement_finished_sqft", "basement_walkout",
    "garage_type", "garage_stalls", "condition", "quality",
})


# ---- subject ---------------------------------------------------------------
class Subject(BaseModel, frozen=True):
    # --- identity / grounding (Open Calgary) ---
    address: str
    district: District
    lat: float
    lon: float
    roll_number: str | None = None
    assessed_value: int | None = None            # from Open Calgary
    land_use: str | None = None                  # zoning designation, e.g. "R-C1"
    assessment_roll_year: int | None = None      # year_built grounded only if >= 2020

    # --- physical attributes (grid rows) — NOT in free open data; intake/default ---
    gla_sqft: int                                # above grade only (RMS excludes basement)
    lot_sqft: int
    beds_ag: int
    full_baths: int
    half_baths: int
    year_built: int
    basement_finished_sqft: int = 0              # below grade, separate grid line
    basement_walkout: bool = False
    garage_type: GarageType = GarageType.NONE
    garage_stalls: int = 0
    condition: Condition = Condition.C3
    quality: Quality = Quality.Q3

    effective_date: date                         # valuation date

    # --- provenance: field name -> where its value came from ---
    # Defaults to a sane map; subject_loader.py overrides per actual fetch result
    # (e.g. year_built -> OPEN_CALGARY when roll_year >= 2020, else INSPECTION).
    provenance: dict[str, FieldSource] = Field(default_factory=dict)

    @model_validator(mode="after")
    def _fill_and_check_provenance(self) -> "Subject":
        # Backfill any unspecified field with a defensible default source so the
        # memo never shows an unlabeled value. frozen=True means we mutate via
        # object.__setattr__ inside the validator (allowed during construction).
        prov = dict(self.provenance)
        for name in OPEN_CALGARY_GROUNDED:
            prov.setdefault(name, FieldSource.OPEN_CALGARY)
        for name in PHYSICAL_INTAKE_FIELDS:
            prov.setdefault(name, FieldSource.INSPECTION)
        prov.setdefault("year_built", FieldSource.INSPECTION)
        prov.setdefault("effective_date", FieldSource.INSPECTION)
        # Invariant: no physical grid row may claim to be Open-Calgary-grounded,
        # because the free dataset does not contain it. Fail loud if it does.
        bad = [f for f in PHYSICAL_INTAKE_FIELDS
               if prov.get(f) == FieldSource.OPEN_CALGARY]
        if bad:
            raise ValueError(
                f"physical fields cannot be open_calgary-grounded (not in free dataset): {bad}"
            )
        object.__setattr__(self, "provenance", prov)
        return self
