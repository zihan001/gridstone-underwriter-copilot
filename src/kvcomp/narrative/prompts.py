"""
narrative/prompts.py — the deterministic memo prose: template fallback + LLM prompt.

Two jobs, both pure (read-only over a computed MemoArtifact, no math, no I/O):
  1. `template_narrative(MemoArtifact)` — the deterministic fallback the pipeline uses when
     the LLM is disabled. The memo is FULLY VALID without any model call (ARCHITECTURE
     seam): numbers are identical, only the wording is templated.
  2. `build_prompt(MemoArtifact)` — assembles the single batched prompt + JSON facts that
     narrative/llm.py sends to Anthropic. The model receives ALREADY-COMPUTED outputs and
     returns ONLY the six prose strings; it never produces a number.

The six sections mirror MEMO_CONTRACT Narrative: scope, selection, adjustment,
reconciliation, confidence, limiting.
"""

from __future__ import annotations

import json

from kvcomp.schemas.results import MemoArtifact, Narrative

SECTIONS = ("scope", "selection", "adjustment", "reconciliation", "confidence", "limiting")


def _usd(n: int) -> str:
    return f"${n:,.0f}"


def facts(memo: MemoArtifact) -> dict:
    """The computed facts the prose must describe — the LLM's read-only input."""
    subj = memo.subject
    vr = memo.value_range
    cb = memo.confidence
    fired = [f for f in memo.flags if f.status.value == "FIRED"]
    return {
        "subject": {
            "address": getattr(subj, "address", ""),
            "district": getattr(subj, "district").value if getattr(subj, "district", None) else "",
            "effective_date": getattr(subj, "effective_date").isoformat() if getattr(subj, "effective_date", None) else "",
            "assessed_value": getattr(subj, "assessed_value", None),
        },
        "counts": {
            "retrieved": memo.search_summary.retrieved,
            "selected": memo.search_summary.selected,
            "rejected": memo.search_summary.rejected,
            "final_tier": memo.search_summary.final_tier,
        },
        "selected": [
            {"id": ac.comp.comp_id, "adjusted": ac.adjusted_value, "gross_pct": round(ac.gross_pct, 1),
             "net_pct": round(ac.net_pct, 1), "tier": ac.comp.tier, "same_district": ac.comp.same_district,
             "weight": ac.weight}
            for ac in memo.selected
        ],
        "rejections": [{"id": r.comp_id, "code": r.reason_code.value, "metric": r.metric_value} for r in memo.rejected],
        "range": {"low": vr.low, "point": vr.point, "high": vr.high, "spread_pct": vr.spread_pct},
        "confidence": {"score": cb.score, "band": cb.band,
                       "drivers": [{"label": d.label, "contrib": d.contrib} for d in cb.drivers]},
        "fired_flags": [{"code": f.code.value, "detail": f.detail} for f in fired],
    }


def template_narrative(memo: MemoArtifact) -> Narrative:
    f = facts(memo)
    c, vr, cb = f["counts"], f["range"], f["confidence"]
    fired = f["fired_flags"]
    hi_gross = [s for s in f["selected"] if s["gross_pct"] > 12]
    adj_district = [s for s in f["selected"] if not s["same_district"]]

    scope = (
        "This memo documents a sales-comparison analysis supporting a defensible value RANGE for the "
        "subject property as of the effective date, prepared for collateral-underwriting review. It "
        "builds and documents the case for a range; it does not render a point value or a lending decision."
    )
    selection = (
        f"{c['selected']} comparable sales were retained from {c['retrieved']} retrieved candidates. "
        f"Selection began in the tight tier-0 band (subject district, within six months) and widened to "
        f"tier {c['final_tier']} only as needed to reach the minimum count. {c['rejected']} candidates were "
        f"rejected under documented reason codes ("
        + ", ".join(sorted({r['code'] for r in f['rejections']})).lower().replace('_', ' ')
        + ") — the rejections are the tell a black-box AVM cannot give."
    )
    adjustment = (
        "Each comparable was adjusted to the subject on a transparent grid using a fixed rate card, with "
        "time adjustments derived from each comparable's contract month against the CREB district benchmark "
        "and applied toward the effective date. "
        + (f"{', '.join(s['id'] for s in hi_gross)} carried an above-review-band gross adjustment and "
           f"{'was' if len(hi_gross) == 1 else 'were'} retained at reduced weight."
           if hi_gross else "No comparable exceeded the gross-adjustment review band.")
    )
    reconciliation = (
        f"Adjusted values were reconciled by weight rather than simple average, emphasising the most "
        f"similar, most recent, and least-adjusted evidence. The weighted central indication is "
        f"{_usd(vr['point'])}, within a supported range of {_usd(vr['low'])} to {_usd(vr['high'])} "
        f"(spread {vr['spread_pct']:.1f}%) that brackets the adjusted comparables."
    )
    confidence = (
        f"Confidence is assessed {cb['band']} ({cb['score']:.2f}). "
        + (f"{len(fired)} human-review flag{'s' if len(fired) != 1 else ''} fired and "
           f"{'are' if len(fired) != 1 else 'is'} documented below; none constitutes a failure — each is "
           f"a prompt for reviewer narrative under AIC guidance."
           if fired else "No human-review flags fired.")
        + (f" One comparable was drawn from an adjacent district ({adj_district[0]['id']}), absorbed via weighting."
           if adj_district else "")
    )
    limiting = (
        "All comparable data shown is SYNTHETIC and illustrative, priced from an explicit contributory "
        "model (the matched pair). Subject characteristics are grounded in Open Calgary assessment data "
        "(source: open_calgary_assessment); physical attributes are intake/district-typical where the free "
        "dataset does not publish them. Every non-CREB dollar magnitude is a US/North-American proxy to be "
        "locally calibrated. This artifact is render-only and contains no live computation."
    )
    return Narrative(scope=scope, selection=selection, adjustment=adjustment,
                     reconciliation=reconciliation, confidence=confidence, limiting=limiting)


_SYSTEM = (
    "You are an appraisal writer for a residential underwriting memo. You will be given the "
    "ALREADY-COMPUTED outputs of a deterministic sales-comparison engine as JSON. Write concise, "
    "audit-ready prose for six memo sections. CRITICAL RULES: (1) Never invent, alter, or recompute any "
    "number — use only the numbers given. (2) The memo defends a value RANGE, never a single decided value. "
    "(3) Frame threshold breaches as flags requiring commentary (AIC posture), not failures. (4) State that "
    "comparables are synthetic and the subject is grounded in Open Calgary data. Return STRICT JSON with "
    "exactly these string keys: scope, selection, adjustment, reconciliation, confidence, limiting."
)


def build_prompt(memo: MemoArtifact) -> tuple[str, str]:
    """Return (system, user) prompt strings for the single batched Anthropic call."""
    user = (
        "Here are the computed engine outputs as JSON. Write the six memo sections describing exactly "
        "these facts.\n\n```json\n" + json.dumps(facts(memo), indent=2) + "\n```"
    )
    return _SYSTEM, user
