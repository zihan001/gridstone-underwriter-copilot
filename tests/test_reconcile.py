"""
Weighted reconciliation (TESTING §2 + test order step 4):
- noise ON: the weighted reconciled point lands within a calibrated tolerance of the true price;
- weighting de-emphasises far / stale / heavily-adjusted comps;
- output is a RANGE (low <= point <= high) that brackets the evidence.
"""

from __future__ import annotations

from datetime import date

from kvcomp.data.comp_generator import generate_comps, subject_true_value
from kvcomp.domain.grid import adjust_comp
from kvcomp.domain.reconcile import reconcile


def _adjusted(subject, comps, cfg):
    return [adjust_comp(c, subject, cfg) for c in comps]


def test_noise_on_weighted_point_near_true_price(sample_subject, config):
    """The matched-pair credibility test with noise ON (round-trip test order step 4)."""
    true_price = subject_true_value(sample_subject, config)
    comps = generate_comps(sample_subject, n=8, seed=11, noise=True)
    recon = reconcile(sample_subject, _adjusted(sample_subject, comps, config), config)
    # Within ~2% of the true price; the band brackets it.
    assert abs(recon.value_range.point - true_price) <= 0.02 * true_price
    assert recon.value_range.low <= recon.value_range.point <= recon.value_range.high


def test_weights_sum_to_one(sample_subject, config):
    comps = generate_comps(sample_subject, n=6, seed=3, noise=True)
    recon = reconcile(sample_subject, _adjusted(sample_subject, comps, config), config)
    assert abs(sum(recon.weights.values()) - 1.0) < 1e-9


def test_heavier_weight_for_closer_fresher_lighter_comp(sample_subject, config):
    """Two comps identical except one is far + stale + lightly different; the strong one
    must earn the larger weight."""
    base = generate_comps(sample_subject, n=1, seed=5, noise=False)[0]
    strong = base.model_copy(update={"comp_id": "C-STRONG", "label": "STRONG",
                                     "distance_km": 0.4, "contract_date": date(2026, 5, 20)})
    weak = base.model_copy(update={"comp_id": "C-WEAK", "label": "WEAK",
                                   "distance_km": 6.5, "contract_date": date(2025, 12, 1)})
    recon = reconcile(sample_subject, _adjusted(sample_subject, [strong, weak], config), config)
    assert recon.weights["C-STRONG"] > recon.weights["C-WEAK"]


def test_output_is_a_range_not_a_point(sample_subject, config):
    comps = generate_comps(sample_subject, n=6, seed=9, noise=True)
    recon = reconcile(sample_subject, _adjusted(sample_subject, comps, config), config)
    assert recon.value_range.high > recon.value_range.low
    assert recon.value_range.spread_pct > 0
