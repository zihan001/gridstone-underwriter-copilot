"""
domain/triage.py — queue-level disposition for a finished memo (green / yellow / red).

This is the brains of the triage queue: instead of an underwriter reading one memo at a
time, the queue ranks a stack of deals so a human looks only where judgment is needed.
Triage is a CLASSIFIER, not a valuation step — it reads ONLY values the deterministic core
already computed (the confidence band/score and the fired flags, each carrying its existing
severity and detail text) and never originates a number. So every figure a row shows still
traces to the core, exactly like the memo it drills into.

The cut (worst condition met wins):

  RED   — the evidence cannot support a defensible range:
            confidence band LOW, OR any of VALUE_OUTSIDE_RANGE / THIN_COMP_SET /
            WIDE_UNADJUSTED_SPREAD fired.
  YELLOW— a human should look before filing:
            band LIMITED (the ≥0.45 tier), OR any other REVIEW-severity flag fired,
            OR ≥ 2 TOLERANCE-severity flags fired.
  GREEN — band HIGH or MODERATE, no REVIEW flag, at most one TOLERANCE flag (INFO ignored).

AIC STANCE (locked by a test): a TOLERANCE breach alone NEVER forces RED. Lender
net/gross/line tolerances are commentary triggers, not fails — internal consistency is the
point, so a single breach with an otherwise-clean MODERATE memo stays GREEN.

Band-name mapping: confidence.py emits HIGH / MODERATE / LIMITED / LOW. The brief's
"LOW-MODERATE (the ≥0.45 tier)" is the LIMITED band; "LOW" is the sub-0.45 band.
"""

from __future__ import annotations

from kvcomp.schemas.results import (
    FlagCode,
    FlagStatus,
    MemoArtifact,
    Severity,
    TriageResult,
    TriageVerdict,
)

# Confidence bands (confidence.py:_band_label) that drive a verdict on their own.
_BAND_RED = "LOW"
_BAND_YELLOW = "LIMITED"          # the ≥0.45 tier

# REVIEW-severity flags so severe that, fired, the evidence can't defend a range -> RED.
# Every OTHER review-severity flag is a YELLOW trigger (driven off Severity below, so the
# two sets can't drift as the registry grows).
_RED_FLAGS = frozenset({
    FlagCode.VALUE_OUTSIDE_RANGE,
    FlagCode.THIN_COMP_SET,
    FlagCode.WIDE_UNADJUSTED_SPREAD,
})

# Most-severe-first ordering for picking the 1-2 flags that name the reason.
_SEVERITY_RANK = {Severity.REVIEW: 0, Severity.TOLERANCE: 1, Severity.INFO: 2}


def _reason_from_flags(flags) -> str:
    """Reason text built from the triggering flags' EXISTING detail strings (1-2 most severe,
    joined). Triage writes no prose of its own — it quotes what the core already authored."""
    ordered = sorted(flags, key=lambda f: _SEVERITY_RANK.get(f.severity, 99))
    return " · ".join(f.detail for f in ordered[:2])


def triage(memo: MemoArtifact) -> TriageResult:
    """Classify a finished memo into a queue verdict. Reads only confidence + fired flags."""
    band = memo.confidence.band
    score = memo.confidence.score

    fired = [f for f in memo.flags if f.status == FlagStatus.FIRED]
    review_fired = [f for f in fired if f.severity == Severity.REVIEW]
    tolerance_fired = [f for f in fired if f.severity == Severity.TOLERANCE]
    review_flag_count = len(review_fired)

    red_hits = [f for f in fired if f.code in _RED_FLAGS]

    # RED — start at the worst condition that applies.
    if band == _BAND_RED or red_hits:
        reason = _reason_from_flags(red_hits) if red_hits else f"{band}; no review flags"
        verdict = TriageVerdict.RED
    else:
        # YELLOW — non-red review flags (any review flag, since none are red here), the
        # LIMITED band, or two-plus tolerance breaches.
        yellow_review = [f for f in review_fired if f.code not in _RED_FLAGS]
        two_plus_tolerance = len(tolerance_fired) >= 2
        if band == _BAND_YELLOW or yellow_review or two_plus_tolerance:
            triggering = list(yellow_review)
            if two_plus_tolerance:
                triggering += tolerance_fired
            reason = _reason_from_flags(triggering) if triggering else f"{band}; no review flags"
            verdict = TriageVerdict.YELLOW
        else:
            # GREEN — band HIGH/MODERATE, no review flag, ≤1 tolerance flag. INFO ignored.
            reason = f"{band}; no review flags"
            verdict = TriageVerdict.GREEN

    return TriageResult(
        verdict=verdict, reason=reason, review_flag_count=review_flag_count, score=score,
    )
