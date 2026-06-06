"""
Flag-boundary tests (TESTING §2): the full registry is emitted every run (fired + clear),
and each named flag fires just above its threshold and clears just below — covering both
the soft review band and the hard tolerance (ADR-002 two-tier model).
"""

from __future__ import annotations

from kvcomp.data.scenario import generate_universe
from kvcomp.schemas.results import FlagCode

from tests._support import evaluate_chain

ALL_CODES = {c.value for c in FlagCode}


def _universe(sample_subject, config):
    return generate_universe(sample_subject, config)


def test_full_registry_emitted_every_run(sample_subject, config):
    status, _, _, _, _ = evaluate_chain(sample_subject, _universe(sample_subject, config), config)
    assert set(status) == ALL_CODES  # all 14 codes present, no more, no fewer


def test_demo_flag_pattern(sample_subject, config):
    status, severity, *_ = evaluate_chain(sample_subject, _universe(sample_subject, config), config)
    # Fired in the sample case:
    assert status["DEEP_WIDENING"] == "FIRED"            # tier-2 reached
    assert status["STALE_COMP"] == "FIRED"               # COMP-D 144 days
    assert status["ADJACENT_DISTRICT_COMP"] == "FIRED"   # COMP-D from South East
    assert status["EXCESSIVE_GROSS_ADJ"] == "FIRED"      # COMP-C over the 12% band
    assert status["UNSUPPORTED_TIME_ADJ"] == "FIRED"     # COMP-D fallback district series
    # Clear in the sample case:
    assert status["THIN_COMP_SET"] == "CLEAR"            # exactly 4 selected
    assert status["GROSS_ADJ_BREACH"] == "CLEAR"         # none over the 25% hard cap
    assert status["OUTLIER_PRICE_INCLUDED"] == "CLEAR"   # outlier was rejected, not selected
    # Severities per ADR-002:
    assert severity["ADJACENT_DISTRICT_COMP"] == "info"
    assert severity["GROSS_ADJ_BREACH"] == "tolerance"
    assert severity["DEEP_WIDENING"] == "review"


def test_thin_comp_set_boundary(sample_subject, config):
    universe = _universe(sample_subject, config)
    # All four real selected comps -> at the minimum -> CLEAR.
    full = [c for c in universe if c.comp_id in {"C-A", "C-B", "C-C", "C-D"}]
    status_full, *_ = evaluate_chain(sample_subject, full, config)
    assert status_full["THIN_COMP_SET"] == "CLEAR"
    # Drop one -> below the minimum -> FIRED.
    fewer = [c for c in full if c.comp_id != "C-D"]
    status_few, *_ = evaluate_chain(sample_subject, fewer, config)
    assert status_few["THIN_COMP_SET"] == "FIRED"


def test_gross_review_band_boundary(sample_subject, config):
    universe = _universe(sample_subject, config)
    _, _, adjusted, *_ = evaluate_chain(sample_subject, universe, config)
    worst = max(ac.gross_pct for ac in adjusted)
    # Band just under the worst gross -> FIRED; just over -> CLEAR.
    below = config.model_copy(update={"gross_review_band": (worst - 1) / 100})
    above = config.model_copy(update={"gross_review_band": (worst + 1) / 100})
    s_below, *_ = evaluate_chain(sample_subject, universe, below)
    s_above, *_ = evaluate_chain(sample_subject, universe, above)
    assert s_below["EXCESSIVE_GROSS_ADJ"] == "FIRED"
    assert s_above["EXCESSIVE_GROSS_ADJ"] == "CLEAR"


def test_net_hard_tolerance_boundary(sample_subject, config):
    universe = _universe(sample_subject, config)
    _, _, adjusted, *_ = evaluate_chain(sample_subject, universe, config)
    worst_net = max(abs(ac.net_pct) for ac in adjusted)
    below = config.model_copy(update={"net_threshold": (worst_net - 1) / 100})
    above = config.model_copy(update={"net_threshold": (worst_net + 1) / 100})
    s_below, *_ = evaluate_chain(sample_subject, universe, below)
    s_above, *_ = evaluate_chain(sample_subject, universe, above)
    assert s_below["NET_ADJ_BREACH"] == "FIRED"
    assert s_above["NET_ADJ_BREACH"] == "CLEAR"


def test_deep_widening_boundary(sample_subject, config):
    universe = _universe(sample_subject, config)
    # Default deep tier 2 -> fired (final tier 2). Raise the bar to 3 -> clear.
    s_default, *_ = evaluate_chain(sample_subject, universe, config)
    s_raised, *_ = evaluate_chain(sample_subject, universe, config.model_copy(update={"deep_widening_tier": 3}))
    assert s_default["DEEP_WIDENING"] == "FIRED"
    assert s_raised["DEEP_WIDENING"] == "CLEAR"


def test_value_outside_range_single_comp_does_not_false_fire(sample_subject, config):
    """Degenerate single-comp case: min == max == the one comp's adjusted value, while the
    reconciled point is rounded to $500 and floored to a ~0.8% spread. Without the guard the
    adjusted-value envelope clause would ALWAYS false-fire; with it, VALUE_OUTSIDE_RANGE is
    CLEAR and the point still sits inside its own [low, high] band."""
    universe = _universe(sample_subject, config)
    one = [c for c in universe if c.comp_id == "C-A"]
    status, _, adjusted, _, recon = evaluate_chain(sample_subject, one, config)
    assert len(adjusted) == 1                              # genuinely the degenerate case
    assert status["VALUE_OUTSIDE_RANGE"] == "CLEAR"        # no spurious fire
    vr = recon.value_range
    assert vr.low <= vr.point <= vr.high                   # range ordering still holds


def test_stale_watch_boundary(sample_subject, config):
    universe = _universe(sample_subject, config)
    # COMP-D is 144 days. Watch at 120 -> fired; raise watch above 144 -> clear.
    s_fire, *_ = evaluate_chain(sample_subject, universe, config)
    s_clear, *_ = evaluate_chain(sample_subject, universe, config.model_copy(update={"stale_watch_days": 200}))
    assert s_fire["STALE_COMP"] == "FIRED"
    assert s_clear["STALE_COMP"] == "CLEAR"
