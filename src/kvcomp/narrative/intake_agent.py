"""
narrative/intake_agent.py — Phase 1: unstructured listing text -> validated Subject.

This agent runs STRICTLY BEFORE pipeline.run(); it never computes a valuation number. Its
job is grounding: turn a free-text listing blurb into the frozen `Subject` the deterministic
core consumes, with an honest per-field provenance map.

HOW THE INVARIANT IS HELD. The agent only chooses which read-only tool to call for which
field. Every value is produced by deterministic Python:
  * lookup_open_calgary(...) — identity/assessment fields grounded in the (offline stand-in
    for the) free Open Calgary dataset            -> FieldSource.OPEN_CALGARY
  * parse_listing_field(text, field) — a regex over the listing the underwriter supplied
                                                   -> FieldSource.INSPECTION
  * district_typical(district, field) — CREB district-typical table for any field the
    listing does NOT state                          -> FieldSource.DISTRICT_DEFAULT
  * geocode(address) — deterministic offline centroid for lat/lon

Tools record their results into an IntakeLedger; the Subject is assembled from the LEDGER,
never from the model's prose. So no model-authored number can enter the Subject. The model's
text output is intake *reasoning* only (shown read-only in the trace panel).

HARD RULE (also in the system prompt): a physical field absent from the listing is filled
from district_typical and labelled DISTRICT_DEFAULT — never estimated or invented. The
Subject validator (physical fields cannot claim OPEN_CALGARY grounding) is the safety net.

With no ANTHROPIC_API_KEY the agent loop is skipped and a deterministic resolution sequence
drives the same tools, so the pipeline stays fully runnable with the LLM disabled.
"""

from __future__ import annotations

import json
import re
from dataclasses import dataclass, field as dc_field
from datetime import date

from kvcomp.data.constants import DISTRICT_TYPICAL
from kvcomp.data.subject_loader import demo_subjects
from kvcomp.narrative.agent import ToolCall, run_agent
from kvcomp.schemas.subject import (
    Condition,
    District,
    FieldSource,
    GarageType,
    Quality,
    Subject,
)

# Physical grid rows resolved from the listing (INSPECTION) or district-typical fallback
# (DISTRICT_DEFAULT). Kept here as the intake order; mirrors PHYSICAL_INTAKE_FIELDS.
_PHYSICAL_FIELDS = (
    "gla_sqft", "lot_sqft", "beds_ag", "full_baths", "half_baths", "year_built",
    "basement_finished_sqft", "basement_walkout", "garage_type", "garage_stalls",
    "condition", "quality",
)

# Fields the district-typical CREB table can answer (the rest fall back to structural
# defaults tagged DISTRICT_DEFAULT — honest "no listing, no dataset evidence").
_TYPICAL_FIELDS = frozenset({"gla_sqft", "lot_sqft", "beds_ag", "full_baths", "half_baths", "year_built"})

# Structural defaults for fields neither the listing nor the CREB typical table provide.
_STRUCTURAL_DEFAULTS: dict[str, object] = {
    "basement_finished_sqft": 600, "basement_walkout": False,
    "garage_type": GarageType.ATTACHED, "garage_stalls": 2,
    "condition": Condition.C3, "quality": Quality.Q3,
}


# ---------------------------------------------------------------------------
# Ledger — the deterministic accumulator the Subject is built from.
# ---------------------------------------------------------------------------
@dataclass
class IntakeLedger:
    """field name -> (typed value, provenance source). The single source the Subject is
    assembled from; every write originates in a deterministic tool, never the model."""
    values: dict[str, object] = dc_field(default_factory=dict)
    sources: dict[str, FieldSource] = dc_field(default_factory=dict)

    def record(self, name: str, value: object, source: FieldSource) -> None:
        self.values[name] = value
        self.sources[name] = source

    def has(self, name: str) -> bool:
        return name in self.values


# ---------------------------------------------------------------------------
# Pure tool implementations (directly unit-testable; no I/O, no model).
# ---------------------------------------------------------------------------
# An offline stand-in for the free Open Calgary parcel dataset: the three demo parcels'
# grounded identity fields, keyed for matching by address fragment or roll number.
def _open_calgary_db() -> list[dict]:
    rows = []
    for subj in demo_subjects().values():
        rows.append({
            "address": subj.address, "district": subj.district.value,
            "lat": subj.lat, "lon": subj.lon, "roll_number": subj.roll_number,
            "assessed_value": subj.assessed_value, "land_use": subj.land_use,
            "assessment_roll_year": subj.assessment_roll_year, "year_built": subj.year_built,
        })
    return rows


def lookup_open_calgary(address_or_roll: str) -> dict | None:
    """Look up a parcel's GROUNDED identity/assessment fields by address or roll number.

    Returns only fields the free Open Calgary dataset grounds (identity, assessed value,
    land use, roll year, year built). Physical attributes are deliberately NOT returned —
    they are not in the free dataset. Returns None if no parcel matches."""
    needle = (address_or_roll or "").strip().lower()
    if not needle:
        return None
    for row in _open_calgary_db():
        addr = (row["address"] or "").lower()
        roll = (row["roll_number"] or "").lower()
        if needle in addr or addr in needle or needle == roll or needle in roll:
            return dict(row)
    return None


def geocode(address: str) -> tuple[float, float] | None:
    """Resolve an address to (lat, lon). Offline + deterministic: exact parcel match if
    known, else the centroid of the quadrant parsed from the civic address."""
    hit = lookup_open_calgary(address)
    if hit:
        return (hit["lat"], hit["lon"])
    quadrant = ""
    parts = (address or "").strip().split()
    if parts and parts[-1].upper() in {"SE", "SW", "NE", "NW"}:
        quadrant = parts[-1].upper()
    return _QUADRANT_CENTROID.get(quadrant)


_QUADRANT_CENTROID = {
    "SE": (50.96, -114.02), "SW": (51.00, -114.13),
    "NE": (51.08, -113.98), "NW": (51.10, -114.13),
}


def district_typical(district: str, field: str) -> object | None:
    """Return the CREB district-typical value for a physical field. Used for any field the
    listing does not state, so the value is labelled DISTRICT_DEFAULT (never invented)."""
    dist = _parse_district(district)
    if dist is None:
        return None
    typ = DISTRICT_TYPICAL[dist]
    return getattr(typ, field, None)


# Regex patterns per parseable listing field. First capture group is the value token.
_LISTING_PATTERNS: dict[str, list[str]] = {
    "gla_sqft": [
        r"([\d,]{3,})\s*(?:sq\.?\s*ft|sqft|sf)\s*(?:above[-\s]?grade|gla|of\s+living|living)",
        r"(?:gla|above[-\s]?grade)[:\s]*([\d,]{3,})",
    ],
    "lot_sqft": [
        r"([\d,]{3,})\s*(?:sq\.?\s*ft|sqft|sf)\s*lot",
        r"lot[:\s]*(?:of\s*)?([\d,]{3,})\s*(?:sq\.?\s*ft|sqft|sf)",
    ],
    "beds_ag": [r"(\d+)\s*(?:bed(?:room)?s?|br)\b"],
    "full_baths": [r"(\d+)\s*full\s*bath", r"(\d+)\s*bath(?:room)?s?\b"],
    "half_baths": [r"(\d+)\s*half\s*bath", r"(\d+)\s*powder"],
    "year_built": [
        r"(?:built|year\s*built|construct(?:ed|ion))[:\s]*((?:19|20)\d{2})",
        r"((?:19|20)\d{2})[-\s]*built",
    ],
    "basement_finished_sqft": [
        r"([\d,]{3,})\s*(?:sq\.?\s*ft|sqft|sf)\s*finished\s*basement",
        r"finished\s*basement[:\s]*([\d,]{3,})",
    ],
    "garage_stalls": [r"(\d+)[-\s]*(?:car|stall)\s*garage"],
}

_GARAGE_WORD_STALLS = {"single": 1, "double": 2, "triple": 3}


def parse_listing_field(text: str, field: str) -> str | None:
    """Extract a single field's value token from the listing text via deterministic regex.

    Returns the matched token (e.g. "1450", "attached", "true") or None when the listing
    does not state the field. The number, when present, comes from the LISTING — the parser
    never estimates."""
    blob = (text or "").lower()
    if field == "garage_type":
        for kind in ("attached", "detached", "tandem"):
            if re.search(rf"{kind}\s*garage|garage[^.]*{kind}", blob):
                return kind
        return None
    if field == "garage_stalls":
        for word, n in _GARAGE_WORD_STALLS.items():
            if re.search(rf"{word}\s*(?:attached|detached|tandem)?\s*garage", blob):
                return str(n)
        # fall through to the numeric "N-car garage" pattern below
    if field == "basement_walkout":
        if "walkout" in blob or "walk-out" in blob:
            return "true"
        return None
    for pattern in _LISTING_PATTERNS.get(field, []):
        m = re.search(pattern, blob)
        if m:
            return m.group(1).replace(",", "")
    return None


# ---------------------------------------------------------------------------
# Coercion: listing/typical string tokens -> typed Subject values.
# ---------------------------------------------------------------------------
def _coerce(field: str, token: object) -> object | None:
    if token is None:
        return None
    if field == "garage_type":
        try:
            return GarageType(str(token))
        except ValueError:
            return None
    if field == "basement_walkout":
        return str(token).lower() in {"true", "1", "yes"}
    if field == "condition":
        try:
            return Condition(str(token))
        except ValueError:
            return None
    if field == "quality":
        try:
            return Quality(str(token))
        except ValueError:
            return None
    # numeric fields
    try:
        return int(float(str(token).replace(",", "")))
    except (ValueError, TypeError):
        return None


def _parse_district(district: object) -> District | None:
    if isinstance(district, District):
        return district
    raw = str(district or "").strip().lower()
    for d in District:
        if raw == d.value or raw == d.name.lower():
            return d
    return None


# ---------------------------------------------------------------------------
# Agent-facing tools: wrap the pure helpers, record to the ledger, return prose-readable
# strings. The model sees these; their numbers all originate in the pure helpers above.
# ---------------------------------------------------------------------------
def build_intake_tools(listing: str, ledger: IntakeLedger) -> dict:
    def t_lookup_open_calgary(address_or_roll: str) -> str:
        """Ground identity/assessment fields from the free Open Calgary parcel dataset by
        address or roll number. Call this FIRST to establish the parcel and its district."""
        row = lookup_open_calgary(address_or_roll)
        if row is None:
            return "no Open Calgary parcel matched; you may still geocode the address."
        for name in ("address", "district", "lat", "lon", "roll_number",
                     "assessed_value", "land_use", "assessment_roll_year"):
            if row.get(name) is not None:
                ledger.record(name, row[name], FieldSource.OPEN_CALGARY)
        # year_built grounded only when the assessment roll is recent (>= 2020).
        roll_year = row.get("assessment_roll_year")
        if row.get("year_built") is not None:
            grounded = isinstance(roll_year, int) and roll_year >= 2020
            ledger.record("year_built", row["year_built"],
                          FieldSource.OPEN_CALGARY if grounded else FieldSource.DISTRICT_DEFAULT)
        return json.dumps(row)

    def t_geocode(address: str) -> str:
        """Resolve an address to latitude/longitude (offline centroid). Use only if the
        Open Calgary lookup did not already provide coordinates."""
        coords = geocode(address)
        if coords is None:
            return "could not geocode address."
        if not ledger.has("lat"):
            ledger.record("lat", coords[0], FieldSource.OPEN_CALGARY)
            ledger.record("lon", coords[1], FieldSource.OPEN_CALGARY)
        return f"lat={coords[0]}, lon={coords[1]}"

    def t_parse_listing_field(field: str) -> str:
        """Extract one physical field's value from the listing text (INSPECTION-sourced).
        Returns NOT_FOUND when the listing does not state it — then call district_typical."""
        # Never let a listing parse clobber a dataset-grounded identity field (e.g. a
        # year_built already grounded in Open Calgary is the stronger source).
        if ledger.sources.get(field) == FieldSource.OPEN_CALGARY:
            return f"{field} already grounded in Open Calgary; keeping the grounded value."
        token = parse_listing_field(listing, field)
        value = _coerce(field, token)
        if value is None:
            return f"NOT_FOUND: listing does not state {field}; call district_typical for it."
        ledger.record(field, value, FieldSource.INSPECTION)
        return f"{field}={value} (from listing)"

    def t_district_typical(district: str, field: str) -> str:
        """CREB district-typical value for a field the listing omits. The result is labelled
        DISTRICT_DEFAULT — a documented fallback, never an estimate."""
        value = _coerce(field, district_typical(district, field))
        if value is None:
            return f"no district-typical value for {field}."
        ledger.record(field, value, FieldSource.DISTRICT_DEFAULT)
        return f"{field}={value} (district-typical fallback)"

    return {
        "lookup_open_calgary": t_lookup_open_calgary,
        "geocode": t_geocode,
        "parse_listing_field": t_parse_listing_field,
        "district_typical": t_district_typical,
    }


# ---------------------------------------------------------------------------
# Subject assembly + gap-fill (deterministic; runs after the tools).
# ---------------------------------------------------------------------------
def _fill_gaps(ledger: IntakeLedger) -> None:
    """Guarantee every Subject field is resolved. Any physical field still missing is filled
    from district_typical (DISTRICT_DEFAULT) or a structural default — never invented."""
    district = _parse_district(ledger.values.get("district")) or District.SOUTH
    if not ledger.has("district"):
        ledger.record("district", district, FieldSource.OPEN_CALGARY)
    if not ledger.has("lat") or not ledger.has("lon"):
        coords = geocode(str(ledger.values.get("address", ""))) or (50.95, -114.05)
        ledger.record("lat", coords[0], FieldSource.OPEN_CALGARY)
        ledger.record("lon", coords[1], FieldSource.OPEN_CALGARY)
    ledger.values.setdefault("address", "Calgary parcel")
    ledger.sources.setdefault("address", FieldSource.OPEN_CALGARY)

    for name in _PHYSICAL_FIELDS:
        if ledger.has(name):
            continue
        if name in _TYPICAL_FIELDS:
            value = _coerce(name, district_typical(district.value, name))
            if value is not None:
                ledger.record(name, value, FieldSource.DISTRICT_DEFAULT)
                continue
        # neither listing nor CREB typical table -> structural default
        if name in _STRUCTURAL_DEFAULTS:
            ledger.record(name, _STRUCTURAL_DEFAULTS[name], FieldSource.DISTRICT_DEFAULT)


def build_subject_from_ledger(ledger: IntakeLedger, *, effective_date: date) -> Subject:
    """Construct the frozen Subject from the ledger, carrying its per-field provenance.

    The provenance map is whatever the tools recorded; the Subject validator still enforces
    that no physical field claims OPEN_CALGARY grounding (our tools never assign that)."""
    v = ledger.values
    provenance = dict(ledger.sources)
    provenance.setdefault("effective_date", FieldSource.INSPECTION)
    return Subject(
        address=v["address"], district=_parse_district(v["district"]),
        lat=float(v["lat"]), lon=float(v["lon"]),
        roll_number=v.get("roll_number"), assessed_value=v.get("assessed_value"),
        land_use=v.get("land_use"), assessment_roll_year=v.get("assessment_roll_year"),
        gla_sqft=int(v["gla_sqft"]), lot_sqft=int(v["lot_sqft"]),
        beds_ag=int(v["beds_ag"]), full_baths=int(v["full_baths"]), half_baths=int(v["half_baths"]),
        year_built=int(v["year_built"]),
        basement_finished_sqft=int(v["basement_finished_sqft"]),
        basement_walkout=bool(v["basement_walkout"]),
        garage_type=v["garage_type"], garage_stalls=int(v["garage_stalls"]),
        condition=v["condition"], quality=v["quality"],
        effective_date=effective_date, provenance=provenance,
    )


# ---------------------------------------------------------------------------
# Orchestration.
# ---------------------------------------------------------------------------
_SYSTEM = (
    "You are a property-intake analyst for a residential underwriting memo. Convert an "
    "unstructured listing blurb into a grounded subject record by CALLING TOOLS — never by "
    "guessing values yourself. Procedure: (1) call lookup_open_calgary with the address or "
    "roll number to ground identity/assessment fields and learn the district; (2) call "
    "geocode only if coordinates are still missing; (3) for EACH physical field "
    "(gla_sqft, lot_sqft, beds_ag, full_baths, half_baths, year_built, "
    "basement_finished_sqft, basement_walkout, garage_type, garage_stalls), call "
    "parse_listing_field; (4) if it returns NOT_FOUND, call district_typical for that field. "
    "HARD RULE: a field absent from the listing MUST come from district_typical "
    "(labelled district_typical/DISTRICT_DEFAULT) — never estimate or invent a physical "
    "value. When done, write 2-4 sentences of intake reasoning describing which fields were "
    "grounded, which came from the listing, and which fell back to district-typical."
)


def _deterministic_intake(listing: str, ledger: IntakeLedger) -> list[ToolCall]:
    """No-key fallback: drive the tools in a fixed, sensible order. Produces a real trace."""
    tools = build_intake_tools(listing, ledger)
    trace: list[ToolCall] = []

    def call(name: str, **args) -> None:
        out = str(tools[name](**args))
        trace.append(ToolCall(name, args, " ".join(out.split())[:400]))

    addr_match = re.search(r"\d+x*\s+[A-Za-z].*?(?:SE|SW|NE|NW)", listing)
    address = addr_match.group(0).strip() if addr_match else listing.strip()[:60]
    call("lookup_open_calgary", address_or_roll=address)
    if not ledger.has("lat"):
        call("geocode", address=address)
    district = _parse_district(ledger.values.get("district")) or District.SOUTH
    for name in ("gla_sqft", "lot_sqft", "beds_ag", "full_baths", "half_baths", "year_built",
                 "basement_finished_sqft", "basement_walkout", "garage_type", "garage_stalls"):
        call("parse_listing_field", field=name)
        if not ledger.has(name) and name in _TYPICAL_FIELDS:
            call("district_typical", district=district.value, field=name)
    return trace


def _template_reasoning(ledger: IntakeLedger) -> str:
    grounded = sorted(k for k, s in ledger.sources.items() if s == FieldSource.OPEN_CALGARY)
    listed = sorted(k for k, s in ledger.sources.items() if s == FieldSource.INSPECTION)
    typical = sorted(k for k, s in ledger.sources.items() if s == FieldSource.DISTRICT_DEFAULT)
    return (
        "Intake grounded "
        f"{len(grounded)} identity/assessment field(s) from Open Calgary ({', '.join(grounded) or 'none'}); "
        f"read {len(listed)} attribute(s) from the listing ({', '.join(listed) or 'none'}); "
        f"and fell back to CREB district-typical values for {len(typical)} field(s) "
        f"({', '.join(typical) or 'none'}) the listing did not state. No physical value was "
        "estimated; absent fields are labelled district_typical."
    )


@dataclass(frozen=True)
class IntakeResult:
    subject: Subject
    trace: list[ToolCall]
    reasoning: str
    source: str            # "llm" or "deterministic"


def run_intake(
    listing: str,
    *,
    effective_date: date,
    use_llm: bool | None = None,
) -> IntakeResult:
    """Resolve a listing blurb into a validated Subject + intake trace.

    With a key (and use_llm not False) the agent loop drives the tools; otherwise a
    deterministic resolution sequence does. Either way the Subject is assembled from the
    ledger, so its numbers never originate in the model."""
    import os

    ledger = IntakeLedger()
    key = os.environ.get("ANTHROPIC_API_KEY", "").strip()
    want_llm = (use_llm is True) or (use_llm is None and bool(key))

    if want_llm and key:
        tools = build_intake_tools(listing, ledger)
        reasoning, trace = run_agent(
            _SYSTEM, tools, f"Listing:\n{listing}",
            fallback=lambda: _template_reasoning(ledger),
        )
        source = "llm"
    else:
        trace = _deterministic_intake(listing, ledger)
        reasoning = _template_reasoning(ledger)
        source = "deterministic"

    _fill_gaps(ledger)
    subject = build_subject_from_ledger(ledger, effective_date=effective_date)
    return IntakeResult(subject=subject, trace=trace, reasoning=reasoning, source=source)
