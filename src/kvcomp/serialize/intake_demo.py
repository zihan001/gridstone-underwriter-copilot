"""
serialize/intake_demo.py — the live intake beat: blurb in -> grounded Subject out.

The demo's weak spot used to be that intake parsing was *assumed*. This surfaces it: it takes
one raw, unstructured listing blurb from the inbox, runs the EXISTING intake agent
(narrative/intake_agent.run_intake — unchanged), and prints the resulting Subject field by
field WITH its provenance, so you can see exactly which values were grounded in Open Calgary,
which were read from the listing, and which fell back to a CREB district-typical default.

This is the deliverable form chosen: a CLI (`python -m kvcomp.serialize --intake [--deal <id>]`).
The viewer also carries the intake trace in §07 for the hero case; this CLI makes the
blurb -> Subject step legible for any inbox deal. No valuation runs here — intake is strictly
before the pipeline; it grounds the Subject, it computes no number.
"""

from __future__ import annotations

from kvcomp.data.inbox import inbox
from kvcomp.narrative.intake_agent import run_intake

# The physical/identity fields to show, in a sensible reading order.
_FIELDS = (
    "address", "district", "roll_number", "assessed_value", "land_use", "year_built",
    "gla_sqft", "lot_sqft", "beds_ag", "full_baths", "half_baths",
    "basement_finished_sqft", "basement_walkout", "garage_type", "garage_stalls",
    "condition", "quality",
)


def render_intake(deal_id: str | None = None) -> str:
    """Run the real intake agent on a deal's blurb and render blurb -> Subject + provenance."""
    deals = inbox()
    deal = next((d for d in deals if d.id == deal_id), None) if deal_id else deals[0]
    if deal is None:
        ids = ", ".join(d.id for d in deals)
        raise SystemExit(f"unknown deal '{deal_id}'. Known: {ids}")

    res = run_intake(deal.blurb, effective_date=deal.subject.effective_date)
    subject, prov = res.subject, res.subject.provenance

    lines: list[str] = []
    lines.append(f"Listing blurb ({deal.id}) — unstructured text in:")
    lines.append(f'  "{deal.blurb}"')
    lines.append("")
    lines.append(f"Intake agent: {res.source}")
    lines.append(f"Reasoning: {res.reasoning}")
    lines.append("")
    lines.append("Grounded Subject — per-field provenance out:")
    lines.append(f"  {'field':<24}{'value':<34}source")
    lines.append(f"  {'-' * 22}  {'-' * 32}  {'-' * 16}")
    for name in _FIELDS:
        value = getattr(subject, name, None)
        value = value.value if hasattr(value, "value") else value     # enums -> their value
        source = prov.get(name)
        source = source.value if source is not None else "—"
        lines.append(f"  {name:<24}{str(value):<34}{source}")
    return "\n".join(lines)


def main(argv: list[str] | None = None) -> None:
    import argparse

    parser = argparse.ArgumentParser(
        prog="python -m kvcomp.serialize --intake",
        description="Live intake beat: run the intake agent on a deal blurb, show the Subject + provenance.")
    parser.add_argument("--intake", action="store_true", help="(routing flag; required by the dispatcher)")
    parser.add_argument("--deal", default=None, help="inbox deal id (default: the first deal).")
    args = parser.parse_args(argv)
    print(render_intake(args.deal))
