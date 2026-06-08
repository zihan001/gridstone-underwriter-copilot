"""
data/open_calgary.py — the ONLY module that touches the network.

It fetches real detached-parcel records from the City of Calgary "Current Year Property
Assessments" open dataset (SODA/Socrata id `4bsw-nn7w`) and caches them into a committed
JSON fixture. Every other module reads that fixture offline, so a fresh `git clone -> run`
never hits the network (the repo stays hermetic). Run this directly to (re)build the cache:

    uv run python -m kvcomp.data.open_calgary

What the dataset CAN ground is identity-level: address, roll number, assessed value, year of
construction, land-use designation, lot size, and the parcel geometry (a GeoJSON multipolygon,
from whose ring we derive lat/lon). Physical attributes above grade (GLA, beds, baths, basement,
garage, condition, quality) are NOT in the free dataset — they live in the paid Assessment
Details Report — so subjects default those to CREB district-typical values, honestly tagged
DISTRICT_DEFAULT in the per-field provenance map (see schemas/subject.py, data/subject_loader.py).

Schema notes (every field is string-typed in the SODA JSON):
  roll_number, address, assessed_value ("729000.0"), comm_code, comm_name,
  year_of_construction ("1981.0"), land_use_designation, land_size_sf ("6567.0"),
  roll_year, multipolygon (GeoJSON MultiPolygon; vertices are [lon, lat] — there are NO flat
  lat/lon fields).
"""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path

from kvcomp.schemas.subject import District

# Open Calgary SODA endpoint (Current Year Property Assessments).
OPEN_CALGARY_ASSESSMENTS_URL = "https://data.calgary.ca/resource/4bsw-nn7w.json"

# Curated comm_code -> CREB District map. Each code is a REAL Open Calgary community code
# (verified against the live dataset — the dataset uses LKB/EVE/APP/PEN, not the english
# abbreviations one might guess), grouped under the district the demo queue grounds it in. The
# map spans seven districts so the cached parcels cover the full range of inbox deals. Series
# backing matters downstream: SOUTH/EAST/WEST carry an encoded CREB benchmark series, every
# other district falls back to the city-wide series (data/constants.py).
CURATED_COMMUNITIES: dict[str, District] = {
    # SOUTH (series-backed) — the clean, well-bracketed GREEN deals + the thin-set RED.
    "LKB": District.SOUTH,        # Lake Bonavista
    "EVE": District.SOUTH,        # Evergreen
    # EAST (series-backed) — low-value GREEN deals + a band-driven wide-spread RED.
    "APP": District.EAST,         # Applewood Park
    "PEN": District.EAST,         # Penbrooke Meadows
    # SOUTH_EAST (no series -> city-wide fallback) — YELLOW floor (UNSUPPORTED_TIME_ADJ).
    "MCK": District.SOUTH_EAST,   # McKenzie Lake
    "CRA": District.SOUTH_EAST,   # Cranston
    # NORTH (no series) — YELLOW deals.
    "PAN": District.NORTH,        # Panorama Hills
    # NORTH_EAST (no series) — YELLOW + a band-driven wide-spread RED.
    "SAD": District.NORTH_EAST,   # Saddle Ridge
    "TAR": District.NORTH_EAST,   # Taradale
    # WEST / NORTH_WEST — cached so the fixture genuinely spans the city; not deal-assigned.
    "SIG": District.WEST,         # Signal Hill
    "VAR": District.NORTH_WEST,   # Varsity
}

# Pulled only if one of the curated communities returns zero detached rows, so the cache always
# reaches at least twelve communities.
FALLBACK_COMMUNITIES: dict[str, District] = {"ROY": District.NORTH_WEST}  # Royal Oak

# The detached-house filter, verified working against the live dataset:
#   assessment_class='RE' (residential), property_type='LI' (land + improvement, i.e. a house),
#   a known construction year, and a single-family-sized lot.
_DETACHED_WHERE = (
    "assessment_class='RE' AND property_type='LI' AND year_of_construction IS NOT NULL "
    "AND land_size_sf between '3000' and '9000'"
)

_DEFAULT_FIXTURE = Path(__file__).resolve().parent / "fixtures" / "open_calgary_parcels.json"


def _fetch_community(client, comm_code: str, per_community: int, *, retries: int = 2) -> list[dict]:
    """Pull up to `per_community` detached rows for one community, ordered by roll number.

    Each row carries the full parcel multipolygon, so the payload is large and the SODA
    endpoint occasionally reads slowly; retry a couple of times on a transient timeout before
    giving up."""
    import httpx

    where = f"{_DETACHED_WHERE} AND comm_code='{comm_code}'"
    params = {"$where": where, "$limit": per_community, "$order": "roll_number"}
    last_exc: Exception | None = None
    for _ in range(retries + 1):
        try:
            resp = client.get(OPEN_CALGARY_ASSESSMENTS_URL, params=params)
            resp.raise_for_status()
            return resp.json()
        except (httpx.TimeoutException, httpx.TransportError) as exc:
            last_exc = exc
            print(f"  [retry] {comm_code}: {type(exc).__name__}")
    raise last_exc  # type: ignore[misc]


def fetch_detached_parcels(per_community: int = 4, timeout: float = 15.0) -> list[dict]:
    """Fetch up to `per_community` detached parcels for each curated community.

    Pulling several per community (not one) lets the inbox builder choose a parcel in the right
    assessed-value band per flavor without re-fetching. Raw rows are kept verbatim so the
    fixture preserves the dataset's own field names and string formatting. A community that
    returns zero rows is logged and skipped; the fallback community is pulled only if fewer than
    twelve communities yielded rows.
    """
    import httpx

    rows: list[dict] = []
    yielded = 0
    with httpx.Client(timeout=timeout) as client:
        for comm_code in CURATED_COMMUNITIES:
            got = _fetch_community(client, comm_code, per_community)
            if not got:
                print(f"  [skip] {comm_code}: 0 detached rows")
                continue
            print(f"  [ok]   {comm_code}: {len(got)} rows")
            rows.extend(got)
            yielded += 1
        if yielded < 12:
            for comm_code in FALLBACK_COMMUNITIES:
                got = _fetch_community(client, comm_code, per_community)
                if got:
                    print(f"  [fallback] {comm_code}: {len(got)} rows")
                    rows.extend(got)
    return rows


def write_fixture(path: str | Path = _DEFAULT_FIXTURE, *, per_community: int = 4,
                  timeout: float = 15.0) -> Path:
    """Fetch the curated parcels and dump them (sorted by roll number) into the cache fixture.

    The fixture wraps the rows in a small envelope recording the source URL, the exact query,
    and the fetch timestamp, so the cache carries its OWN provenance — a reviewer can see where
    every grounded subject ultimately came from and re-run the same query."""
    rows = fetch_detached_parcels(per_community=per_community, timeout=timeout)
    rows.sort(key=lambda r: r.get("roll_number", ""))
    envelope = {
        "_source_url": OPEN_CALGARY_ASSESSMENTS_URL,
        "_query": _DETACHED_WHERE,
        "_fetched_at": datetime.now(timezone.utc).isoformat(),
        "rows": rows,
    }
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(envelope, indent=2, sort_keys=True) + "\n")
    print(f"wrote {len(rows)} parcels -> {path}")
    return path


def load_fixture(path: str | Path = _DEFAULT_FIXTURE) -> list[dict]:
    """Read the cached parcel rows offline (no network). Used by data/inbox.py."""
    envelope = json.loads(Path(path).read_text())
    return envelope["rows"]


if __name__ == "__main__":
    write_fixture()
