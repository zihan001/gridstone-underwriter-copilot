"""
Schema freeze (TESTING §2): Subject / Comp / AdjustmentConfig are frozen — mutation raises.
Also guards the seed-defect repair: Comp.provenance must stay a CompProvenance (attribute
access), not be flattened to a dict by the inherited Subject validator.
"""

from __future__ import annotations

import pytest
from pydantic import ValidationError

from kvcomp.data.comp_generator import generate_comps
from kvcomp.schemas.comp import CompProvenance


def test_subject_is_frozen(sample_subject):
    with pytest.raises(ValidationError):
        sample_subject.gla_sqft = 9999


def test_config_is_frozen(config):
    with pytest.raises(ValidationError):
        config.gla_adj_per_sqft = 1


def test_comp_is_frozen(sample_subject, config):
    comp = generate_comps(sample_subject, n=1, seed=1, noise=False)[0]
    with pytest.raises(ValidationError):
        comp.sale_price = 0


def test_comp_provenance_stays_a_model(sample_subject):
    """Regression for the inherited-validator clobber: provenance keeps attribute access."""
    comp = generate_comps(sample_subject, n=1, seed=1, noise=False)[0]
    assert isinstance(comp.provenance, CompProvenance)
    assert comp.provenance.true_price_no_noise > 0
    assert comp.provenance.is_synthetic is True
