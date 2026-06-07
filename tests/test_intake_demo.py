"""
§4 — the live intake beat (serialize/intake_demo.py).

Proves the demo SHOWS parsing rather than assuming it: a raw inbox blurb is run through the
EXISTING intake agent and the resulting Subject is rendered with per-field provenance. Asserts
the blurb appears, the grounding sources are surfaced, and listing-stated physical fields are
tagged INSPECTION (parsed, not invented).
"""

from __future__ import annotations

import pytest

from kvcomp.data.inbox import inbox
from kvcomp.narrative.intake_agent import run_intake
from kvcomp.schemas.subject import FieldSource
from kvcomp.serialize.intake_demo import render_intake


@pytest.fixture(autouse=True)
def _no_api_key(monkeypatch):
    monkeypatch.delenv("ANTHROPIC_API_KEY", raising=False)


def test_render_intake_shows_blurb_and_provenance_sources():
    deal = inbox()[0]
    out = render_intake(deal.id)
    assert deal.blurb in out                      # the unstructured text is shown
    assert "open_calgary" in out                  # identity grounded in the dataset
    assert "inspection" in out                    # physical fields parsed from the listing


def test_intake_agent_grounds_listing_fields_as_inspection():
    deal = inbox()[0]
    res = run_intake(deal.blurb, effective_date=deal.subject.effective_date)
    prov = res.subject.provenance
    # GLA is stated in every blurb, so the parser must read it from the listing (not invent it).
    assert prov.get("gla_sqft") == FieldSource.INSPECTION
    # Every physical field is resolved to a real provenance source — none missing.
    for field in ("gla_sqft", "lot_sqft", "beds_ag", "year_built", "condition", "quality"):
        assert isinstance(prov.get(field), FieldSource)


def test_unknown_deal_id_is_rejected():
    with pytest.raises(SystemExit):
        render_intake("NOPE-000")
