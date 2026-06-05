"""
data/contributory.py — THE matched-pair contributory model.

This module is the single, shared expression of "generator and grid are one design
artifact" (DOMAIN.md §2). Both `data/comp_generator.py` (which BAKES attribute deltas
into synthetic prices) and `domain/grid.py` (which RECOVERS them) import these functions,
so they cannot drift on coefficients or functional form. The round-trip invariant
(tests/test_roundtrip.py) then proves the *rest* of the pipeline — time engine sign,
rounding, canonical ordering, reconciliation — does not corrupt the recovery.

Sign convention (DOMAIN.md §1): each line adjustment is the amount ADDED TO THE COMP to
make it equivalent to the subject. A comp SUPERIOR on a line (bigger, newer, better)
yields a NEGATIVE adjustment (subtract its surplus); inferior yields positive. Concretely
every line is `contributory(subject) − contributory(comp)`.

All non-CREB magnitudes are US/North-American PROXIES (see AdjustmentConfig); this module
applies them, it does not assert they are Canadian ground truth.
"""

from __future__ import annotations

from kvcomp.schemas.config import AdjustmentConfig
from kvcomp.schemas.subject import Condition, GarageType, Quality, Subject

# Canonical grid-row order (MEMO_CONTRACT SelectedComp.lines, minus the trailing "time"
# line which grid.py appends from the time engine).
CANONICAL_KEYS: tuple[str, ...] = ("gla", "lot", "bed", "bath", "bsmt", "gar", "age", "cond", "qual")

LINE_LABELS: dict[str, str] = {
    "gla": "Above-grade GLA",
    "lot": "Site / lot",
    "bed": "Bedrooms",
    "bath": "Bathrooms",
    "bsmt": "Basement",
    "gar": "Garage",
    "age": "Age / eff-age",
    "cond": "Condition",
    "qual": "Quality",
    "time": "Time / market cond.",
}


# ---- attribute helpers -----------------------------------------------------
def _cond_step(c: Condition) -> int:
    """C1..C6 -> 1..6. Lower step = better condition (C1 best), so higher value."""
    return int(c.value[1:])


def _qual_step(q: Quality) -> int:
    """Q1..Q6 -> 1..6. Lower step = better quality (Q1 best), so higher value."""
    return int(q.value[1:])


def _garage_equiv_stalls(gtype: GarageType, stalls: int, cfg: AdjustmentConfig) -> float:
    """Stalls weighted by type: attached x1.0, detached x0.67, tandem x0.5, none x0."""
    factor = {
        GarageType.NONE: 0.0,
        GarageType.ATTACHED: cfg.garage_attached_factor,
        GarageType.DETACHED: cfg.garage_detached_factor,
        GarageType.TANDEM: cfg.garage_tandem_factor,
    }[gtype]
    return stalls * factor


def _basement_value(sqft: int, walkout: bool, cfg: AdjustmentConfig) -> float:
    """Finished below-grade value: $/sf finished, plus a walkout premium within below-grade."""
    base = sqft * cfg.basement_adj_per_sqft
    return base * (1.0 + cfg.basement_walkout_premium) if walkout else base


# ---- per-line adjustment (comp -> subject) --------------------------------
def line_adjustment(key: str, subject: Subject, comp: Subject, cfg: AdjustmentConfig) -> int:
    """The signed dollar adjustment applied TO `comp` on line `key` to match `subject`.

    Superior comp -> negative. Integer dollars. This is the inverse the generator bakes in.
    """
    if key == "gla":
        return int(round(cfg.gla_adj_per_sqft * (subject.gla_sqft - comp.gla_sqft)))

    if key == "lot":
        delta = subject.lot_sqft - comp.lot_sqft
        if abs(delta) <= cfg.lot_no_adj_band_sqft:
            return 0
        # Linear $/sf beyond the no-adjustment band. The diminishing-returns exponent is
        # retained in AdjustmentConfig as a future calibration knob but is not applied by
        # default: appraisers expect a transparent $/sf site rate, and a non-linear curve
        # would break the exact matched-pair inversion the round-trip test asserts.
        return int(round(cfg.lot_adj_per_sqft * delta))

    if key == "bed":
        return int(round(cfg.bedroom_adj * (subject.beds_ag - comp.beds_ag)))

    if key == "bath":
        full = cfg.full_bath_adj * (subject.full_baths - comp.full_baths)
        half = cfg.half_bath_adj * (subject.half_baths - comp.half_baths)
        return int(round(full + half))

    if key == "bsmt":
        sub_v = _basement_value(subject.basement_finished_sqft, subject.basement_walkout, cfg)
        comp_v = _basement_value(comp.basement_finished_sqft, comp.basement_walkout, cfg)
        return int(round(sub_v - comp_v))

    if key == "gar":
        sub_g = _garage_equiv_stalls(subject.garage_type, subject.garage_stalls, cfg)
        comp_g = _garage_equiv_stalls(comp.garage_type, comp.garage_stalls, cfg)
        return int(round(cfg.garage_adj_per_stall * (sub_g - comp_g)))

    if key == "age":
        # Straight-line $/yr on year-built delta (actual age as effective-age proxy).
        # Older comp (smaller year_built) -> positive adjustment toward the newer subject.
        return int(round(cfg.age_adj_per_year * (subject.year_built - comp.year_built)))

    if key == "cond":
        # Value rises as step falls (C1 best). adj = rate * (comp_step - subject_step).
        return int(round(cfg.condition_adj_per_step * (_cond_step(comp.condition) - _cond_step(subject.condition))))

    if key == "qual":
        return int(round(cfg.quality_adj_per_step * (_qual_step(comp.quality) - _qual_step(subject.quality))))

    raise ValueError(f"unknown grid line key: {key!r}")


def all_line_adjustments(subject: Subject, comp: Subject, cfg: AdjustmentConfig) -> dict[str, int]:
    """Every structural (non-time) line adjustment, in canonical order."""
    return {k: line_adjustment(k, subject, comp, cfg) for k in CANONICAL_KEYS}


def structural_net(subject: Subject, comp: Subject, cfg: AdjustmentConfig) -> int:
    """Sum of signed structural line adjustments (excludes time). The quantity the
    generator inverts: comp_value_at_effective = subject_value − structural_net."""
    return sum(all_line_adjustments(subject, comp, cfg).values())
