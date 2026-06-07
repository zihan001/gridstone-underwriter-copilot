"""
serialize/memo_to_window.py — MemoArtifact -> out/data.js in the frozen MEMO_CONTRACT shape.

The locked viewer reads `window.MEMO`. This serializer builds the data object with EXACTLY
the keys/shapes MEMO_CONTRACT specifies (every key here is read by the JSX), then splices a
`json.dumps` of it into serialize/data_js.template — which carries the verbatim
usd0/sgn/pct/timeFactor JS helpers, byte-for-byte identical to the delivered viewer, so the
render is unchanged. The Python core computes the post-`buildComp` comp shape (lines, time,
net/gross, pcts); we do NOT replicate buildComp in JS.

CLI: `python -m kvcomp.serialize` writes out/data.js (then run.sh copies it to viewer/).
"""

from __future__ import annotations

import json
from datetime import date
from pathlib import Path

from kvcomp.data.constants import (
    BENCHMARK_SERIES,
    CITY_BENCHMARK_FALLBACK,
    CITY_PPSF_ABOVE_GRADE,
    DISTRICT_BENCHMARK,
)
from kvcomp.data.scenario import community_for
from kvcomp.domain.retrieval import contract_age_days, ppsf
from kvcomp.schemas.results import AdjustedComp, ReasonCode
from kvcomp.schemas.subject import District, Subject

_TEMPLATE = Path(__file__).with_name("data_js.template")
_OUT = Path(__file__).resolve().parents[3] / "out" / "data.js"

_REASON_DESCRIPTIONS = {
    ReasonCode.TOO_STALE: "Outside the maximum contract-date window even after widening.",
    ReasonCode.WRONG_DISTRICT_AFTER_WIDENING: "Not adjacent to the subject district per the topology map.",
    ReasonCode.GROSS_ADJ_TOO_HIGH: "Cumulative gross adjustment exceeds the 25% hard cap.",
    ReasonCode.OUTLIER_PRICE: "Price-per-sf is a statistical outlier vs the candidate set.",
    ReasonCode.DUPLICATE: "Resolves to a parcel already represented in the set.",
}

_AIC_NOTE = (
    "AIC guidance: lender net/gross/line tolerances are screening aids, not appraisal rules. A breach is a "
    "flag for narrative support — it does not supersede good appraisal practice or invalidate an otherwise "
    "well-supported comparable."
)

_DISTRICT_TITLE = {
    District.CITY_CENTRE: "City Centre", District.NORTH_EAST: "North East", District.NORTH: "North",
    District.NORTH_WEST: "North West", District.WEST: "West", District.SOUTH: "South",
    District.SOUTH_EAST: "South East", District.EAST: "East",
}

_GARAGE_ABBR = {"attached": "att.", "detached": "det.", "tandem": "tan.", "none": "none"}


def _month_key(d: date) -> str:
    return f"{d.year:04d}-{d.month:02d}"


def _series_for_district(district: District) -> dict[str, int]:
    return BENCHMARK_SERIES.get(district, CITY_BENCHMARK_FALLBACK)


def _quadrant_from_address(addr: str) -> str:
    last = addr.strip().split()[-1].upper() if addr.strip() else ""
    return last if last in {"SE", "SW", "NE", "NW"} else ""


def _baths_str(full: int, half: int) -> str:
    return f"{full}F / {half}H"


def _basement_str(ac_comp) -> str:
    wk = " walkout" if ac_comp.basement_walkout else ""
    return f"{ac_comp.basement_finished_sqft} sf fin{wk}"


def _garage_str(ac_comp) -> str:
    return f"{ac_comp.garage_stalls} · {_GARAGE_ABBR.get(ac_comp.garage_type.value, ac_comp.garage_type.value)}"


def _watch_codes(subject: Subject, ac: AdjustedComp, cfg) -> list[str]:
    codes: list[str] = []
    if contract_age_days(subject, ac.comp) > cfg.stale_watch_days:
        codes.append("STALE_COMP")
    if not ac.comp.same_district:
        codes.append("ADJACENT_DISTRICT_COMP")
    if ac.gross_pct > cfg.gross_review_band * 100:
        codes.append("EXCESSIVE_GROSS_ADJ")
    return codes


def _selected_view(subject: Subject, ac: AdjustedComp, cfg) -> dict:
    c = ac.comp
    return {
        "id": c.comp_id, "label": c.label, "synthetic": c.provenance.is_synthetic, "mls": c.mls,
        "community": community_for(c.comp_id), "district": _DISTRICT_TITLE[c.district],
        "sameDistrict": bool(c.same_district), "distanceKm": c.distance_km,
        "contractDate": c.contract_date.isoformat(), "contractMonth": _month_key(c.contract_date),
        "ageDays": contract_age_days(subject, c), "price": c.sale_price,
        "gla": c.gla_sqft, "lot": c.lot_sqft, "beds": c.beds_ag,
        "baths": _baths_str(c.full_baths, c.half_baths), "basement": _basement_str(c),
        "garage": _garage_str(c), "built": c.year_built, "cond": c.condition.value, "qual": c.quality.value,
        "tier": c.tier, "watch": _watch_codes(subject, ac, cfg),
        # computed by the core (grid + time engine):
        "lines": [{"key": ln.key, "label": ln.label, "sub": ln.sub, "adj": ln.adjustment} for ln in ac.lines],
        "tf": round(ac.time_factor, 6), "bmContract": ac.benchmark_at_contract, "timeAdj": ac.time_adj,
        "net": ac.net, "gross": ac.gross, "adjusted": ac.adjusted_value,
        "netPct": round(ac.net_pct, 4), "grossPct": round(ac.gross_pct, 4), "linePct": round(ac.max_line_pct, 4),
        "ppsf": ppsf(c),
    }


def _rejected_view(rec, comp) -> dict:
    return {
        "id": rec.comp_id, "label": comp.label if comp else rec.comp_id, "synthetic": True,
        "mls": comp.mls if comp else None, "code": rec.reason_code.value,
        "community": community_for(rec.comp_id),
        "district": _DISTRICT_TITLE[comp.district] if comp else "",
        "contractDate": comp.contract_date.isoformat() if comp else "",
        "price": comp.sale_price if comp else 0, "gla": comp.gla_sqft if comp else 0,
        "ppsf": ppsf(comp) if comp else 0, "detail": rec.detail,
        "metricLabel": rec.metric_label, "metricValue": rec.metric_value, "cap": rec.cap,
    }


def _subject_view(subject: Subject) -> dict:
    roll = (subject.roll_number or "").replace("-", "·")
    age = subject.effective_date.year - subject.year_built
    val_year = subject.assessment_roll_year
    val_date = date(val_year - 1, 7, 1).isoformat() if val_year else ""
    ppsf_assessed = round(subject.assessed_value / subject.gla_sqft) if subject.assessed_value else 0
    attrs = [
        ["Property type", "Single-family detached"],
        ["Above-grade GLA", f"{subject.gla_sqft:,} sf"],
        ["Site / lot", f"{subject.lot_sqft:,} sf"],
        ["Bedrooms", str(subject.beds_ag)],
        ["Bathrooms", f"{subject.full_baths} full / {subject.half_baths} half"],
        ["Basement", f"{subject.basement_finished_sqft} sf finished · {'walkout' if subject.basement_walkout else 'no walkout'}"],
        ["Garage", f"{subject.garage_stalls}-stall · {subject.garage_type.value}"],
        ["Year built", f"{subject.year_built} ({age} yr)"],
        ["Condition rating", subject.condition.value],
        ["Quality rating", subject.quality.value],
        ["Land use", subject.land_use or "—"],
        ["Effective date", subject.effective_date.isoformat()],
    ]
    return {
        "real": True, "provenance": "source: open_calgary_assessment", "roll": roll,
        "addr": subject.address, "addrNote": "civic address partially masked for review packet",
        "community": _DISTRICT_TITLE[subject.district] + " district",
        "district": _DISTRICT_TITLE[subject.district], "quadrant": _quadrant_from_address(subject.address),
        "landUse": f"{subject.land_use} · Residential Contextual One Dwelling" if subject.land_use else "—",
        "assessedValue": subject.assessed_value, "assessmentRollYear": subject.assessment_roll_year,
        "assessmentValDate": val_date, "ppsfAssessed": ppsf_assessed, "propertyType": "Single-family detached",
        "gla": subject.gla_sqft, "lot": subject.lot_sqft, "beds": subject.beds_ag,
        "bathFull": subject.full_baths, "bathHalf": subject.half_baths,
        "basementSf": subject.basement_finished_sqft, "basementFinished": subject.basement_finished_sqft > 0,
        "walkout": subject.basement_walkout, "garageStalls": subject.garage_stalls,
        "garageType": subject.garage_type.value, "yearBuilt": subject.year_built,
        "effDate": subject.effective_date.isoformat(), "condition": subject.condition.value,
        "quality": subject.quality.value, "age": age, "attrs": attrs,
    }


def build_window(result, agent_trace: dict | None = None) -> dict:
    """Build the full window.MEMO data dict (everything except the JS helpers).

    `agent_trace`, when supplied, adds the read-only `agentTrace` block (intake + sensitivity
    reasoning and tool calls). Omitting it leaves the output byte-identical to before, so the
    frozen serializer contract is unaffected on the no-agent path."""
    memo = result.memo
    cfg = result.config
    subject: Subject = memo.subject
    series = _series_for_district(subject.district)
    benchmark = [{"m": k, "v": series[k]} for k in sorted(series)]
    bm = {k: series[k] for k in series}
    universe_by_id = {c.comp_id: c for c in result.universe}

    selected = [_selected_view(subject, ac, cfg) for ac in memo.selected]
    weights = {ac.comp.comp_id: ac.weight for ac in memo.selected}

    window = {
        "meta": {
            "caseId": f"KV-CMP-{subject.effective_date.year}-{(subject.roll_number or '0000')[-4:]}",
            "snapshot": f"{subject.effective_date.isoformat()}T00:00:00-06:00",
            "effectiveDate": subject.effective_date.isoformat(),
            "approach": "Sales Comparison Approach",
            "analyst": "model:underwrite-copilot v1.0.0",
            "purpose": "Defend a value RANGE for collateral review — never a point decision.",
        },
        "benchmark": benchmark,
        "bm": bm,
        "marketContext": {
            "southBenchmark": DISTRICT_BENCHMARK.get(subject.district, memo.district_benchmark),
            "cityBenchmark": memo.city_benchmark,
            "ppsf": CITY_PPSF_ABOVE_GRADE,
            "series": f"CREB · Detached · {_DISTRICT_TITLE[subject.district]} District · monthly benchmark",
        },
        "rates": cfg.rate_card(),
        "thresholds": {
            "net": round(cfg.net_threshold * 100), "gross": round(cfg.gross_threshold * 100),
            "line": round(cfg.line_threshold * 100), "netReview": round(cfg.net_review_band * 100),
            "grossReview": round(cfg.gross_review_band * 100), "lineReview": round(cfg.line_review_band * 100),
            "grossCap": round(cfg.candidate_gross_cap * 100), "staleDays": cfg.stale_watch_days,
            "staleMaxDays": cfg.stale_max_days,
        },
        "subject": _subject_view(subject),
        "selected": selected,
        "rejected": [_rejected_view(r, universe_by_id.get(r.comp_id)) for r in memo.rejected],
        "reasonCodes": {code.value: desc for code, desc in _REASON_DESCRIPTIONS.items()},
        "widening": [
            {"tier": w.tier, "title": w.title, "criteria": [list(c) for c in w.criteria],
             "rationale": w.rationale, "found": w.found, "note": w.note, "penalty": w.penalty}
            for w in memo.widening
        ],
        "searchSummary": {
            "retrieved": memo.search_summary.retrieved, "selected": memo.search_summary.selected,
            "rejected": memo.search_summary.rejected, "finalTier": memo.search_summary.final_tier,
            "wideningDepth": memo.search_summary.widening_depth, "totalPenalty": memo.search_summary.total_penalty,
        },
        "weights": weights,
        "weightDrivers": result.reconcile.weight_drivers,
        "range": {
            "low": memo.value_range.low, "point": memo.value_range.point,
            "high": memo.value_range.high, "spreadPct": memo.value_range.spread_pct,
        },
        "adjustedVals": [ac.adjusted_value for ac in memo.selected],
        "confidence": {
            "base": memo.confidence.base, "score": memo.confidence.score, "low": memo.confidence.low,
            "high": memo.confidence.high, "band": memo.confidence.band,
            "drivers": [{"key": d.key, "label": d.label, "detail": d.detail, "contrib": d.contrib}
                        for d in memo.confidence.drivers],
        },
        "flags": [
            {"code": f.code.value, "status": f.status.value, "severity": f.severity.value,
             "trigger": f.trigger, "detail": f.detail}
            for f in memo.flags
        ],
        "aicNote": _AIC_NOTE,
        "narrative": {
            "scope": memo.narrative.scope, "selection": memo.narrative.selection,
            "adjustment": memo.narrative.adjustment, "reconciliation": memo.narrative.reconciliation,
            "confidence": memo.narrative.confidence, "limiting": memo.narrative.limiting,
        },
    }
    # Additive, render-only: present only when the agents bracketed this run.
    if agent_trace is not None:
        window["agentTrace"] = agent_trace
    return window


def render_data_js(result, agent_trace: dict | None = None) -> str:
    window = build_window(result, agent_trace)
    template = _TEMPLATE.read_text()
    return template.replace("__MEMO_DATA__", json.dumps(window, ensure_ascii=False, indent=2))


def write_data_js(result, path: Path | None = None, agent_trace: dict | None = None) -> Path:
    out = path or _OUT
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(render_data_js(result, agent_trace))
    return out


def main(argv: list[str] | None = None) -> None:
    """CLI: serialize a named demo case to a named file.

    No args reproduces the South hero to out/data.js — so `python -m kvcomp.serialize` and
    ./scripts/run.sh are unchanged in destination. `--case east/west` selects a demo subject;
    `--out` overrides the destination (defaults to out/data.<case>.js for the non-hero cases).
    Each case is bracketed by the intake (before) and sensitivity (after) agents via
    run_with_agents so data.js carries the read-only agentTrace block; the pipeline numbers
    are byte-identical to the subject-driven path (the demo blurb round-trips)."""
    import argparse

    from kvcomp.data.subject_loader import demo_subjects
    from kvcomp.narrative.orchestrator import demo_listing, run_with_agents, trace_to_window

    cases = demo_subjects()
    parser = argparse.ArgumentParser(prog="python -m kvcomp.serialize",
                                     description="Serialize a demo case to a window.MEMO data file.")
    parser.add_argument("--case", choices=sorted(cases), default="south",
                        help="demo case to serialize (default: south, the hero).")
    parser.add_argument("--out", default=None,
                        help="output path (default: out/data.js for south, out/data.<case>.js otherwise).")
    args = parser.parse_args(argv)

    out = Path(args.out) if args.out else (_OUT if args.case == "south" else _OUT.with_name(f"data.{args.case}.js"))
    subject = cases[args.case]
    result, trace = run_with_agents(listing=demo_listing(subject), effective_date=subject.effective_date)
    path = write_data_js(result, out, agent_trace=trace_to_window(trace))
    print(f"wrote {path} ({args.case})")


if __name__ == "__main__":
    main()
