"""
data/comp_generator.py — the synthetic comp generator: the BAKING half of the matched
pair. Prices each comp from the shared contributory model (data/contributory.py) so that
the grid (domain/grid.py) recovers the subject's no-noise value (round-trip invariant).

Construction (per comp), the exact inverse of the grid:
    structural   = Σ line_adjustment(subject, comp)         # amount the grid will add back
    value_at_eff = subject_value − structural                # comp's no-noise value today
    sale_no_noise = value_at_eff × bm[contract] / bm[effective]   # de-trend to contract month
    sale_price    = round(sale_no_noise × noise_factor)

`true_price_no_noise` is the SUBJECT'S value (every comp adjusts back to it), recorded in
CompProvenance as the round-trip target. Seeded RNG => a given (subject, seed) reproduces
the same comps (ARCHITECTURE: determinism is reviewable/testable).
"""

from __future__ import annotations

import math
import random
from datetime import date, timedelta

from kvcomp.data.constants import (
    BENCHMARK_SERIES,
    CITY_BENCHMARK_FALLBACK,
    DISTRICT_BENCHMARK,
    DISTRICT_TYPICAL,
    GENERATOR_VERSION,
)
from kvcomp.data.contributory import structural_net
from kvcomp.domain.time_engine import benchmark_at, month_key, series_for
from kvcomp.schemas.comp import Comp, CompProvenance
from kvcomp.schemas.config import AdjustmentConfig
from kvcomp.schemas.subject import (
    Condition,
    District,
    GarageType,
    Quality,
    Subject,
)

_NOISE_SIGMA = 0.012  # log-normal sigma (~1.2%); only applied when noise=True


def subject_true_value(subject: Subject, cfg: AdjustmentConfig) -> int:
    """The subject's no-noise market value at the effective date: the district benchmark
    plus the contributory premium of the subject over its district-typical home."""
    typ = DISTRICT_TYPICAL[subject.district]
    typical_home = subject.model_copy(
        update={
            "gla_sqft": typ.gla_sqft,
            "lot_sqft": typ.lot_sqft,
            "beds_ag": typ.beds_ag,
            "full_baths": typ.full_baths,
            "half_baths": typ.half_baths,
            "year_built": typ.year_built,
            # basement / garage / condition / quality: take the subject's own as the
            # district-typical baseline (the open data has no district-typical for them).
        }
    )
    premium = structural_net(subject, typical_home, cfg)  # subject − typical
    return DISTRICT_BENCHMARK[subject.district] + premium


def _series_keys(district: District) -> list[str]:
    return sorted(BENCHMARK_SERIES.get(district, CITY_BENCHMARK_FALLBACK))


def _contract_date_for_month(key: str, rng: random.Random) -> date:
    y, m = int(key[:4]), int(key[5:7])
    day = rng.randint(2, 27)
    return date(y, m, day)


# ---- attribute sampling ----------------------------------------------------
_CONDITION_BY_STEP = {1: Condition.C1, 2: Condition.C2, 3: Condition.C3,
                      4: Condition.C4, 5: Condition.C5, 6: Condition.C6}
_QUALITY_BY_STEP = {1: Quality.Q1, 2: Quality.Q2, 3: Quality.Q3,
                    4: Quality.Q4, 5: Quality.Q5, 6: Quality.Q6}


def _vary_only_overrides(attr: str, subject: Subject, idx: int) -> dict:
    """Deterministic single-attribute deltas (isolates one grid line for the round-trip)."""
    if attr == "gla_sqft":
        return {"gla_sqft": subject.gla_sqft + (idx + 1) * 60}
    if attr == "full_baths":
        return {"full_baths": max(0, subject.full_baths + (idx - 1))}
    if attr == "half_baths":
        return {"half_baths": max(0, subject.half_baths + (idx % 2))}
    if attr == "basement_finished_sqft":
        return {"basement_finished_sqft": max(0, subject.basement_finished_sqft + (idx + 1) * 80)}
    if attr == "year_built":
        return {"year_built": subject.year_built + (idx + 1) * 4}
    if attr == "lot_sqft":
        return {"lot_sqft": subject.lot_sqft + (idx + 1) * 1500}
    if attr == "condition":
        base = int(subject.condition.value[1:])
        return {"condition": _CONDITION_BY_STEP[min(6, max(1, base - (idx + 1)))]}
    if attr == "quality":
        base = int(subject.quality.value[1:])
        return {"quality": _QUALITY_BY_STEP[min(6, max(1, base - (idx + 1)))]}
    raise ValueError(f"vary_only attr not supported: {attr!r}")


def _random_overrides(subject: Subject, rng: random.Random) -> dict:
    """Modest random deltas around the subject (keeps comps comparable, gross adj sane)."""
    return {
        "gla_sqft": subject.gla_sqft + rng.randint(-120, 140),
        "lot_sqft": subject.lot_sqft + rng.randint(-400, 600),
        "beds_ag": max(2, subject.beds_ag + rng.choice([0, 0, 1])),
        "full_baths": max(1, subject.full_baths + rng.choice([-1, 0, 0])),
        "half_baths": max(0, subject.half_baths + rng.choice([-1, 0, 1])),
        "basement_finished_sqft": max(0, subject.basement_finished_sqft + rng.randint(-120, 160)),
        "year_built": subject.year_built + rng.randint(-6, 8),
        "condition": _CONDITION_BY_STEP[min(6, max(1, int(subject.condition.value[1:]) + rng.choice([-1, 0, 0])))],
        "quality": _QUALITY_BY_STEP[min(6, max(1, int(subject.quality.value[1:]) + rng.choice([-1, 0, 0])))],
    }


def build_comp(
    subject: Subject,
    cfg: AdjustmentConfig,
    overrides: dict,
    contract_date: date,
    seed: int,
    noise: bool,
    rng: random.Random,
    comp_id: str,
    label: str,
    mls: str | None = None,
    district: District | None = None,
    tier: int = 0,
) -> Comp:
    """Price one comp from the contributory model so the grid recovers `subject_true_value`."""
    dist = district or subject.district
    # Resolve benchmarks through the SAME time-engine lookup the grid uses, so de-trending
    # (here) and re-trending (grid) cancel exactly for every district — including fallback
    # districts where the effective month is extrapolated past the encoded series.
    series, _ = series_for(dist)
    bm_eff, _ = benchmark_at(series, month_key(subject.effective_date))
    bm_con, _ = benchmark_at(series, month_key(contract_date))

    V = subject_true_value(subject, cfg)

    # Provisional comp carrying the target attributes (price filled below).
    fields = {
        "address": f"comp parcel {comp_id}",
        "district": dist,
        "lat": subject.lat + rng.uniform(-0.02, 0.02),
        "lon": subject.lon + rng.uniform(-0.02, 0.02),
        "gla_sqft": subject.gla_sqft,
        "lot_sqft": subject.lot_sqft,
        "beds_ag": subject.beds_ag,
        "full_baths": subject.full_baths,
        "half_baths": subject.half_baths,
        "year_built": subject.year_built,
        "basement_finished_sqft": subject.basement_finished_sqft,
        "basement_walkout": subject.basement_walkout,
        "garage_type": subject.garage_type if subject.garage_type != GarageType.NONE else GarageType.ATTACHED,
        "garage_stalls": subject.garage_stalls,
        "condition": subject.condition,
        "quality": subject.quality,
        "effective_date": subject.effective_date,
    }
    fields.update(overrides)

    skeleton = Subject(**fields)
    structural = structural_net(subject, skeleton, cfg)  # grid will add this back
    value_at_eff = V - structural
    sale_no_noise = value_at_eff * bm_con / bm_eff

    noise_factor = 1.0
    if noise:
        # Per-comp deterministic draw, decoupled from the geo draws above, so each comp's
        # noise is reproducible and mean-zero in log space (tight, unbiased demo spread).
        nrng = random.Random(f"{seed}:{comp_id}")
        noise_factor = math.exp(nrng.gauss(0.0, _NOISE_SIGMA))
    sale_price = int(round(sale_no_noise * noise_factor))

    provenance = CompProvenance(
        is_synthetic=True,
        generator_seed=seed,
        generator_version=GENERATOR_VERSION,
        district_benchmark=DISTRICT_BENCHMARK[dist],
        true_price_no_noise=V,
        noise_factor=noise_factor,
        notes="SYNTHETIC — priced from the contributory model (matched pair).",
    )

    return Comp(
        comp_id=comp_id,
        label=label,
        mls=mls,
        sale_price=sale_price,
        contract_date=contract_date,
        close_date=contract_date + timedelta(days=rng.randint(20, 45)),
        distance_km=None,
        same_district=(dist == subject.district),
        tier=tier,
        provenance=provenance,
        **fields,
    )


def generate_comps(
    subject: Subject,
    n: int = 6,
    seed: int = 42,
    noise: bool = True,
    vary_only: str | None = None,
    cfg: AdjustmentConfig | None = None,
) -> list[Comp]:
    """Generate `n` synthetic comps for `subject`. With noise=False every comp adjusts back
    to exactly `subject_true_value` (the round-trip target). `vary_only` isolates a single
    attribute (single-line round-trip)."""
    cfg = cfg or AdjustmentConfig()
    rng = random.Random(seed)
    keys = _series_keys(subject.district)
    # Prefer recent months (within ~6 of effective) so comps are plausibly fresh.
    recent = keys[-7:-1] if len(keys) >= 7 else keys[:-1]

    comps: list[Comp] = []
    for i in range(n):
        overrides = (
            _vary_only_overrides(vary_only, subject, i) if vary_only else _random_overrides(subject, rng)
        )
        month = recent[i % len(recent)]
        contract_date = _contract_date_for_month(month, rng)
        letter = chr(ord("A") + i)
        comps.append(
            build_comp(
                subject, cfg, overrides, contract_date, seed, noise, rng,
                comp_id=f"C-{letter}", label=f"COMP-{letter}", mls=f"C-{1000 + i}",
            )
        )
    return comps
