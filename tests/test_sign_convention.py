"""
Sign convention (TESTING §2): a SUPERIOR comp yields a NEGATIVE adjustment, an INFERIOR
comp a POSITIVE one — one assertion per direction, per the DOMAIN §1 rule.
"""

from __future__ import annotations

from kvcomp.data.contributory import line_adjustment


def _comp(sample_subject, **overrides):
    return sample_subject.model_copy(update=overrides)


def test_superior_gla_is_negative(sample_subject, config):
    superior = _comp(sample_subject, gla_sqft=sample_subject.gla_sqft + 200)  # bigger = superior
    assert line_adjustment("gla", sample_subject, superior, config) < 0


def test_inferior_gla_is_positive(sample_subject, config):
    inferior = _comp(sample_subject, gla_sqft=sample_subject.gla_sqft - 200)  # smaller = inferior
    assert line_adjustment("gla", sample_subject, inferior, config) > 0


def test_superior_condition_is_negative(sample_subject, config):
    from kvcomp.schemas.subject import Condition
    better = _comp(sample_subject, condition=Condition.C2)  # C2 better than subject C3
    assert line_adjustment("cond", sample_subject, better, config) < 0


def test_newer_comp_is_negative(sample_subject, config):
    newer = _comp(sample_subject, year_built=sample_subject.year_built + 10)
    assert line_adjustment("age", sample_subject, newer, config) < 0


def test_identical_attribute_is_zero(sample_subject, config):
    same = _comp(sample_subject)
    for key in ("gla", "lot", "bed", "bath", "bsmt", "gar", "age", "cond", "qual"):
        assert line_adjustment(key, sample_subject, same, config) == 0
