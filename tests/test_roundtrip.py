"""
THE round-trip invariant — the matched-pair proof. Written FIRST (TDD), RED until
comp_generator + grid + time_engine exist. This is the engineer-facing credibility
artifact (docs/TESTING.md §1, README).

Claim: if the adjustment grid is the correct inverse of the generator's pricing function,
then adjusting synthetic comps back toward the subject recovers the subject's true
(no-noise) value.
"""

from __future__ import annotations

import pytest

# These imports will fail until Claude Code builds them — that is the intended RED state.
pytest.importorskip("kvcomp.data.comp_generator")
pytest.importorskip("kvcomp.domain.grid")

from kvcomp.data.comp_generator import generate_comps  # noqa: E402
from kvcomp.domain.grid import adjust_comp  # noqa: E402

EPSILON_NO_NOISE = 1_500   # near-zero structural-recovery tolerance ($)


def test_roundtrip_noise_off_recovers_true_price(sample_subject, config):
    """Noise OFF: every adjusted_value must cluster within ε of the generator's
    no-noise true subject price. Hard assertion — pure structural recovery."""
    comps = generate_comps(sample_subject, n=6, seed=42, noise=False)
    for c in comps:
        adj = adjust_comp(c, sample_subject, config)
        true_price = c.provenance.true_price_no_noise
        assert abs(adj.adjusted_value - true_price) <= EPSILON_NO_NOISE, (
            f"{c.comp_id}: adjusted {adj.adjusted_value} vs true {true_price}"
        )


@pytest.mark.parametrize("attr", ["gla_sqft", "full_baths", "basement_finished_sqft",
                                  "year_built", "condition"])
def test_single_attribute_roundtrip(sample_subject, config, attr):
    """Vary ONE attribute at a time — isolates one grid line and proves it recovers
    that generator coefficient. Paired-sales analysis run in reverse on synthetic data."""
    comps = generate_comps(sample_subject, n=3, seed=7, noise=False, vary_only=attr)
    for c in comps:
        adj = adjust_comp(c, sample_subject, config)
        assert abs(adj.adjusted_value - c.provenance.true_price_no_noise) <= EPSILON_NO_NOISE


def test_roundtrip_noise_on_weighted_point(sample_subject, config):
    """Noise ON: the WEIGHTED reconciled point lands within a calibrated tolerance of the
    true price, and the spread widens predictably. (Reconciliation wired in pipeline.)"""
    pytest.skip("enable once reconcile.py is wired (TESTING.md test order step 4)")
