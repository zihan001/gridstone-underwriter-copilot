"""
domain/grid.py — the sales-comparison adjustment grid: the recovering half of the matched
pair. Inverts the generator by applying `contributory.line_adjustment` (the shared model)
on every canonical row, then appends the time line from `time_engine`.

    adjusted_value = sale_price + Σ(structural line adjustments) + time adjustment

Because the generator baked the comp's price as `subject_value − structural_net`,
de-trended to the contract month, and the grid re-applies `+structural_net` and the
inverse time factor, the two cancel and `adjusted_value` recovers the subject's no-noise
value (tests/test_roundtrip.py). Sign convention: superior comp -> negative (DOMAIN §1).
"""

from __future__ import annotations

from kvcomp.data.contributory import (
    CANONICAL_KEYS,
    LINE_LABELS,
    _cond_step,
    _qual_step,
    all_line_adjustments,
)
from kvcomp.domain.time_engine import time_adjustment
from kvcomp.schemas.comp import Comp
from kvcomp.schemas.config import AdjustmentConfig
from kvcomp.schemas.results import AdjustedComp, GridLine
from kvcomp.schemas.subject import Subject


def _fmt_int(n: int) -> str:
    return f"{n:,}"


def _signed(n: int, unit: str = "") -> str:
    if n == 0:
        return "="
    sign = "+" if n > 0 else "−"  # − for negative
    return f"{sign}{abs(n):,}{unit}"


def _sub_string(key: str, subject: Subject, comp: Comp) -> str:
    """Human-readable delta string for the grid cell (display only)."""
    if key == "gla":
        return f"{_fmt_int(comp.gla_sqft)} sf ({_signed(comp.gla_sqft - subject.gla_sqft)})"
    if key == "lot":
        return f"{_fmt_int(comp.lot_sqft)} sf ({_signed(comp.lot_sqft - subject.lot_sqft)})"
    if key == "bed":
        return f"{comp.beds_ag} ({_signed(comp.beds_ag - subject.beds_ag)})"
    if key == "bath":
        d_full = comp.full_baths - subject.full_baths
        d_half = comp.half_baths - subject.half_baths
        base = f"{comp.full_baths}F / {comp.half_baths}H"
        if d_full == 0 and d_half == 0:
            return f"{base} (=)"
        parts = []
        if d_full:
            parts.append(f"{_signed(d_full)} full")
        if d_half:
            parts.append(f"{_signed(d_half)} half")
        return f"{base} ({', '.join(parts)})"
    if key == "bsmt":
        wk = " walkout" if comp.basement_walkout else ""
        return f"{_fmt_int(comp.basement_finished_sqft)} sf fin{wk} ({_signed(comp.basement_finished_sqft - subject.basement_finished_sqft)})"
    if key == "gar":
        return f"{comp.garage_stalls} {comp.garage_type.value[:3]}. ({'=' if comp.garage_type == subject.garage_type and comp.garage_stalls == subject.garage_stalls else 'diff'})"
    if key == "age":
        return f"{comp.year_built} ({_signed(comp.year_built - subject.year_built, ' yr')})"
    if key == "cond":
        step = _cond_step(comp.condition) - _cond_step(subject.condition)
        return f"{comp.condition.value} ({'=' if step == 0 else _signed(-step, ' step')})"
    if key == "qual":
        step = _qual_step(comp.quality) - _qual_step(subject.quality)
        return f"{comp.quality.value} ({'=' if step == 0 else _signed(-step, ' step')})"
    raise ValueError(key)


def adjust_comp(comp: Comp, subject: Subject, cfg: AdjustmentConfig) -> AdjustedComp:
    """Run one comp through the full grid + time engine -> AdjustedComp (weight unset)."""
    adjustments = all_line_adjustments(subject, comp, cfg)
    lines: list[GridLine] = [
        GridLine(key=k, label=LINE_LABELS[k], sub=_sub_string(k, subject, comp), adjustment=adjustments[k])
        for k in CANONICAL_KEYS
    ]

    ta = time_adjustment(comp.district, comp.contract_date, subject.effective_date, comp.sale_price)
    lines.append(
        GridLine(
            key="time",
            label=LINE_LABELS["time"],
            sub=f"{comp.contract_date.isoformat()} → {subject.effective_date.isoformat()}",
            adjustment=ta.time_adj,
        )
    )

    net = sum(ln.adjustment for ln in lines)
    gross = sum(abs(ln.adjustment) for ln in lines)
    adjusted_value = comp.sale_price + net
    price = comp.sale_price
    max_line = max(abs(ln.adjustment) for ln in lines)
    return AdjustedComp(
        comp=comp,
        lines=lines,
        time_adj=ta.time_adj,
        benchmark_at_contract=ta.benchmark_at_contract,
        time_factor=ta.time_factor,
        net=net,
        gross=gross,
        adjusted_value=adjusted_value,
        net_pct=net / price * 100.0,
        gross_pct=gross / price * 100.0,
        max_line_pct=max_line / price * 100.0,
        weight=0.0,
    )
