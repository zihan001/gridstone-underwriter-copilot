"""
schemas/comp.py — Comp + CompProvenance.

A Comp IS a Subject (same attribute schema = same grid rows) plus sale facts, a synthetic
flag, and generator provenance. The time adjustment anchors on `contract_date`, never
`close_date` (Fannie B4-1.3-09; UBC BUSI 330). `true_price_no_noise` is the round-trip
target: the grid must recover it from the comp's attribute deltas (TESTING.md §1).
"""

from __future__ import annotations

from datetime import date

from pydantic import BaseModel

from kvcomp.schemas.subject import Subject


class CompProvenance(BaseModel, frozen=True):
    is_synthetic: bool = True                # ALWAYS true here; labeled clearly in UI
    generator_seed: int
    generator_version: str
    district_benchmark: int                  # CREB benchmark used as the price anchor
    true_price_no_noise: int                 # generator's no-noise true price (round-trip target)
    noise_factor: float = 1.0                # log-normal multiplier applied to true price
    notes: str = ""


class Comp(Subject, frozen=True):
    # identity / display
    comp_id: str                             # "C-A"
    label: str                               # "COMP-A"
    mls: str | None = None

    # sale facts
    sale_price: int
    contract_date: date                      # time adjustment anchors HERE
    close_date: date | None = None

    # retrieval-time, filled vs a given subject
    distance_km: float | None = None
    same_district: bool | None = None
    tier: int = 0                            # widening tier this comp entered at

    provenance: CompProvenance
