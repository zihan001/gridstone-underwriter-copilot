"""
domain/flags.py — the advisory flag engine (DOMAIN §8 / ADR-002 two-tier model).

Every flag is advisory: it directs the underwriter's attention, it never blocks. The full
registry is emitted EVERY run — both FIRED and CLEAR — so the memo shows what was checked
and passed (good audit practice). Each flag carries a `severity` (review / info /
tolerance). Thresholds live in AdjustmentConfig so the boundary is tunable and testable
(one case just below -> CLEAR, one just above -> FIRED).

The two tiers (ADR-002): SOFT review bands (net 8 / gross 12 / line 5 %) fire *before* the
HARD tolerances (net 15 / gross 25 / line 10 %), expressing the AIC "flag for narrative
support, not a fail" posture.

`lender_profile` does not change the numbers — only how loudly net/gross are surfaced:
FNMA_OFF keeps tolerance breaches informational-but-present; GSE_ON raises them.
"""

from __future__ import annotations

from kvcomp.domain.reconcile import ReconcileResult
from kvcomp.domain.retrieval import contract_age_days, ppsf
from kvcomp.domain.time_engine import series_for
from kvcomp.domain.widening import SelectionResult
from kvcomp.schemas.config import AdjustmentConfig
from kvcomp.schemas.results import AdjustedComp, Flag, FlagCode, FlagStatus, Severity
from kvcomp.schemas.subject import LenderProfile, Subject

import statistics


def _flag(code, fired, severity, trigger, detail) -> Flag:
    return Flag(code=code, status=FlagStatus.FIRED if fired else FlagStatus.CLEAR,
                severity=severity, trigger=trigger, detail=detail)


def evaluate(
    subject: Subject,
    adjusted: list[AdjustedComp],
    selection: SelectionResult,
    recon: ReconcileResult,
    cfg: AdjustmentConfig,
) -> list[Flag]:
    flags: list[Flag] = []
    vr = recon.value_range
    n = len(adjusted)
    gse = cfg.lender_profile == LenderProfile.GSE_ON

    # --- widening / recency / selection -------------------------------------
    flags.append(_flag(
        FlagCode.DEEP_WIDENING, selection.final_tier >= cfg.deep_widening_tier, Severity.REVIEW,
        f"search reached tier ≥ {cfg.deep_widening_tier}",
        (f"Comp set required tier-{selection.final_tier} relaxation to reach the minimum count; "
         f"recency distribution degraded, confidence penalised {selection.total_penalty:+.2f}.")
        if selection.final_tier >= cfg.deep_widening_tier else
        "Selection completed within the tight band; no deep widening required."))

    stale = [ac for ac in adjusted if contract_age_days(subject, ac.comp) > cfg.stale_watch_days]
    flags.append(_flag(
        FlagCode.STALE_COMP, bool(stale), Severity.REVIEW,
        f"any selected comp contract age > {cfg.stale_watch_days} days",
        (f"{', '.join(ac.comp.label for ac in stale)} exceed the {cfg.stale_watch_days}-day recency "
         f"watch; time-adjusted off the CREB benchmark, weight reduced.")
        if stale else f"All selected comps contract within {cfg.stale_watch_days} days."))

    flags.append(_flag(
        FlagCode.THIN_COMP_SET, n < cfg.min_comp_count, Severity.REVIEW,
        f"selected comp count < {cfg.min_comp_count}",
        f"{n} comps selected — {'below the minimum' if n < cfg.min_comp_count else 'at or above the minimum'} of {cfg.min_comp_count}."))

    adj_district = [ac for ac in adjusted if not ac.comp.same_district]
    flags.append(_flag(
        FlagCode.ADJACENT_DISTRICT_COMP, bool(adj_district), Severity.INFO,
        "any selected comp outside the subject district",
        (f"{', '.join(ac.comp.label for ac in adj_district)} drawn from an adjacent district; "
         f"location risk absorbed via distance-weighting, documented for reviewer.")
        if adj_district else "All selected comps fall inside the subject district."))

    # --- adjustment burden: soft review bands -------------------------------
    hi_gross = [ac for ac in adjusted if ac.gross_pct > cfg.gross_review_band * 100]
    flags.append(_flag(
        FlagCode.EXCESSIVE_GROSS_ADJ, bool(hi_gross), Severity.REVIEW,
        f"any selected comp gross adj > {cfg.gross_review_band * 100:.0f}% review band",
        (f"{', '.join(f'{ac.comp.label} {ac.gross_pct:.1f}%' for ac in hi_gross)} exceed the "
         f"{cfg.gross_review_band * 100:.0f}% review band (hard cap {cfg.gross_threshold * 100:.0f}%); "
         f"retained at reduced weight.")
        if hi_gross else f"Worst gross adjustment within the {cfg.gross_review_band * 100:.0f}% review band."))

    hi_net = [ac for ac in adjusted if abs(ac.net_pct) > cfg.net_review_band * 100]
    flags.append(_flag(
        FlagCode.EXCESSIVE_NET_ADJ, bool(hi_net), Severity.REVIEW,
        f"any selected comp net adj > {cfg.net_review_band * 100:.0f}% review band",
        (f"{', '.join(f'{ac.comp.label} {ac.net_pct:+.1f}%' for ac in hi_net)} exceed the "
         f"{cfg.net_review_band * 100:.0f}% net review band; narrative support advised.")
        if hi_net else f"Worst net adjustment within the {cfg.net_review_band * 100:.0f}% review band."))

    # --- hard tolerances ----------------------------------------------------
    net_breach = [ac for ac in adjusted if abs(ac.net_pct) > cfg.net_threshold * 100]
    flags.append(_flag(
        FlagCode.NET_ADJ_BREACH, bool(net_breach), Severity.TOLERANCE,
        f"any selected comp net adj > {cfg.net_threshold * 100:.0f}%",
        (f"{'GSE profile: ' if gse else ''}"
         f"{', '.join(f'{ac.comp.label} {ac.net_pct:+.1f}%' for ac in net_breach)} breach the "
         f"{cfg.net_threshold * 100:.0f}% hard tolerance — explain in commentary (AIC: not a fail).")
        if net_breach else
        f"Max net adjustment {max((abs(ac.net_pct) for ac in adjusted), default=0):.1f}% — within the {cfg.net_threshold * 100:.0f}% tolerance."))

    gross_breach = [ac for ac in adjusted if ac.gross_pct > cfg.gross_threshold * 100]
    flags.append(_flag(
        FlagCode.GROSS_ADJ_BREACH, bool(gross_breach), Severity.TOLERANCE,
        f"any selected comp gross adj > {cfg.gross_threshold * 100:.0f}%",
        (f"{', '.join(f'{ac.comp.label} {ac.gross_pct:.1f}%' for ac in gross_breach)} breach the "
         f"{cfg.gross_threshold * 100:.0f}% hard tolerance.")
        if gross_breach else
        f"Max gross adjustment {max((ac.gross_pct for ac in adjusted), default=0):.1f}% — within the {cfg.gross_threshold * 100:.0f}% tolerance."))

    line_breach = [ac for ac in adjusted if ac.max_line_pct > cfg.line_threshold * 100]
    flags.append(_flag(
        FlagCode.LINE_ADJ_BREACH, bool(line_breach), Severity.TOLERANCE,
        f"any single line adj > {cfg.line_threshold * 100:.0f}%",
        (f"{', '.join(f'{ac.comp.label} {ac.max_line_pct:.1f}%' for ac in line_breach)} exceed the "
         f"{cfg.line_threshold * 100:.0f}% single-line tolerance.")
        if line_breach else
        f"Largest single line {max((ac.max_line_pct for ac in adjusted), default=0):.1f}% of price — within the {cfg.line_threshold * 100:.0f}% tolerance."))

    # --- price-structure flags ----------------------------------------------
    ppsfs = [ppsf(ac.comp) for ac in adjusted]
    outlier_included = False
    if len(ppsfs) >= 5:  # MAD needs a stable base; see rejection.outliers
        med = statistics.median(ppsfs)
        devs = [abs(v - med) for v in ppsfs]
        mad = statistics.median(devs) or 1.0
        outlier_included = any(abs(v - med) / mad > cfg.outlier_mad_threshold for v in ppsfs)
    flags.append(_flag(
        FlagCode.OUTLIER_PRICE_INCLUDED, outlier_included, Severity.REVIEW,
        f"selected comp PPSF > {cfg.outlier_mad_threshold:.1f} MAD from set median",
        "A selected comp is a PPSF outlier — review for non-arm's-length character."
        if outlier_included else "No selected comp is a PPSF outlier (any outlier was rejected, not selected)."))

    if not adjusted:
        point_outside = False
    elif len(adjusted) <= 1:
        # Degenerate single-comp case: min == max == the one comp's value, but the reconciled
        # point is rounded to $500 and floored to a ~0.8% spread (reconcile.py), so the
        # adjusted-value envelope clause would ALWAYS false-fire. Only the range-ordering
        # check (low <= point <= high) is meaningful with a single observation.
        point_outside = not (vr.low <= vr.point <= vr.high)
    else:
        lo = min(a.adjusted_value for a in adjusted)
        hi = max(a.adjusted_value for a in adjusted)
        point_outside = not (vr.low <= vr.point <= vr.high) or not (lo <= vr.point <= hi)
    flags.append(_flag(
        FlagCode.VALUE_OUTSIDE_RANGE, bool(point_outside), Severity.REVIEW,
        "reconciled point outside [min, max] of adjusted comp values",
        "Reconciled point falls outside the adjusted-value envelope — re-examine weighting."
        if point_outside else "Reconciled point sits inside the adjusted-value envelope."))

    high_val = max((a.adjusted_value for a in adjusted), default=0)
    anchoring = high_val and (vr.point > high_val * (1 - cfg.high_comp_anchor_tolerance)) and (vr.point >= high_val)
    flags.append(_flag(
        FlagCode.HIGH_COMP_ANCHORING, bool(anchoring), Severity.REVIEW,
        f"reconciled point biased toward the highest comp beyond {cfg.high_comp_anchor_tolerance * 100:.0f}%",
        "Reconciled point hugs the highest adjusted comp — check for upward anchoring."
        if anchoring else "Reconciled point is not anchored to the highest comp."))

    # time support: any selected comp whose district lacks an encoded series (fallback).
    unsupported = [ac for ac in adjusted if not series_for(ac.comp.district)[1]]
    flags.append(_flag(
        FlagCode.UNSUPPORTED_TIME_ADJ, bool(unsupported), Severity.REVIEW,
        "time adj applied without an encoded district series (fallback/extrapolated)",
        (f"{', '.join(ac.comp.label for ac in unsupported)} use the city-wide fallback series "
         f"(no encoded district benchmark); time adjustment is approximate.")
        if unsupported else "Every selected comp's time adjustment used its encoded district series."))

    raw_prices = [ac.comp.sale_price for ac in adjusted]
    raw_spread = (max(raw_prices) - min(raw_prices)) / min(raw_prices) if raw_prices else 0.0
    flags.append(_flag(
        FlagCode.WIDE_UNADJUSTED_SPREAD, raw_spread > cfg.wide_unadjusted_spread_pct, Severity.REVIEW,
        f"raw comp price range > {cfg.wide_unadjusted_spread_pct * 100:.0f}%",
        f"Raw (pre-adjustment) price spread {raw_spread * 100:.0f}% "
        f"{'exceeds' if raw_spread > cfg.wide_unadjusted_spread_pct else 'within'} the "
        f"{cfg.wide_unadjusted_spread_pct * 100:.0f}% watch."))

    return flags
