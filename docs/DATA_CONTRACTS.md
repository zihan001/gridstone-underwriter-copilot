# DATA_CONTRACTS

Schemas are **frozen before implementation** because the matched pair (generator ↔ grid) and the round-trip test depend on a single shared attribute schema: the grid rows ARE the `Subject` fields, the generator emits `Comp`s on the same fields, and the round-trip test asserts the grid recovers what the generator baked in. If the schema drifts mid-build, the matched pair breaks silently. Freezing also lets every `domain/` module and test be written against a stable contract. All models are pydantic v2 `frozen=True`.

## Enums
```python
class District(str, Enum):
    CITY_CENTRE="city_centre"; NORTH_EAST="north_east"; NORTH="north"
    NORTH_WEST="north_west"; WEST="west"; SOUTH="south"
    SOUTH_EAST="south_east"; EAST="east"

class Condition(str, Enum):   # UAD C1–C6 analog (labeled proxy)
    C1="C1"; C2="C2"; C3="C3"; C4="C4"; C5="C5"; C6="C6"

class Quality(str, Enum):     # UAD Q1–Q6 analog (labeled proxy)
    Q1="Q1"; Q2="Q2"; Q3="Q3"; Q4="Q4"; Q5="Q5"; Q6="Q6"

class GarageType(str, Enum):
    NONE="none"; DETACHED="detached"; ATTACHED="attached"; TANDEM="tandem"

class LenderProfile(str, Enum):
    FNMA_OFF="fnma_off"     # 15/25 informational only
    GSE_ON="gse_on"         # 15/25 flagged louder (Freddie/FHA/VA/USDA)
```

## Subject — the shared attribute schema (grid rows)
```python
class Subject(BaseModel, frozen=True):
    # identity / grounding
    address: str
    district: District
    lat: float; lon: float
    source: str = "open_calgary_assessment"     # REAL data provenance
    roll_number: str | None = None
    assessed_value: int | None = None            # from Open Calgary
    # physical attributes (grid rows)
    gla_sqft: int                                # above grade only (RMS excludes basement)
    lot_sqft: int
    beds_ag: int
    full_baths: int
    half_baths: int
    year_built: int
    basement_finished_sqft: int = 0              # below grade, separate grid line
    basement_walkout: bool = False
    garage_type: GarageType = GarageType.NONE
    garage_stalls: int = 0
    condition: Condition = Condition.C3
    quality: Quality = Quality.Q3
    effective_date: date                         # valuation date
```

## Comp = Subject attributes + sale facts + synthetic flag + provenance
```python
class CompProvenance(BaseModel, frozen=True):
    is_synthetic: bool = True                    # ALWAYS true here; labeled clearly
    generator_seed: int
    generator_version: str
    district_benchmark: int                      # CREB benchmark used as the price anchor
    true_price_no_noise: int                     # generator's no-noise true price (round-trip target)
    noise_factor: float                          # log-normal multiplier applied
    notes: str = ""

class Comp(Subject, frozen=True):
    sale_price: int
    contract_date: date                          # time adjustment anchors HERE, not close date
    close_date: date | None = None
    distance_km: float | None = None             # filled at retrieval vs a given subject
    provenance: CompProvenance
```

## AdjustmentConfig — every constant editable; proxies labeled

> **CALIBRATED (see docs/DECISIONS.md ADR-001/002/003).** Defaults below are the
> calibrated rate card adopted from the delivered viewer, NOT the raw `474 × 0.45`
> derivation. The PPSF figures are retained as `*_prior` provenance fields (the prior we
> calibrated *down from*), so the audit trail shows the $213/sqft prior was deliberately
> rejected in favor of $85/sqft, not ignored. Condition/Quality are now **$/step**
> (matching the viewer rate card and CoreLogic medians), not the earlier `pct_per_step`.
> Thresholds are the two-tier soft-review + hard-tolerance model (ADR-002). This block is
> the source of truth and mirrors `src/kvcomp/schemas/config.py` exactly.

```python
class AdjustmentConfig(BaseModel, frozen=True):
    lender_profile: LenderProfile = LenderProfile.FNMA_OFF

    # --- GLA --- calibrated effective rate; PPSF kept only as provenance prior
    gla_adj_per_sqft: int = 85                       # CALIBRATED ($/sf above grade)
    local_ppsf_prior: float = 474.0                  # Calgary mid-2025 (provenance)
    gla_contributory_fraction_prior: float = 0.45    # 40–50% (provenance; →$213, rejected)

    # --- Lot (proxy) — diminishing returns
    lot_adj_per_sqft: int = 12                        # frontend card ($/sf site)
    lot_no_adj_band_sqft: int = 1000                  # within this delta → no adj
    lot_diminishing_exponent: float = 0.7             # <1 = diminishing returns

    # --- Bedrooms / baths (proxy)
    bedroom_adj: int = 4000                           # frontend card (DOMAIN prior was $0)
    bedroom_functional_threshold: int = 2             # below this, beds start to matter
    full_bath_adj: int = 6000                         # 5,000–7,000
    half_bath_adj: int = 3500                         # 2,000–3,500

    # --- Basement (proxy) — fraction of AG rate; SEPARATE grid line
    basement_adj_per_sqft: int = 35                   # CALIBRATED ($/sf finished below-grade)
    basement_fraction_of_ag_prior: float = 0.45       # 25–60% (provenance: 35/85 ≈ 0.41)
    basement_walkout_premium: float = 0.15            # extra within below-grade

    # --- Garage (proxy) — attached > detached; tandem at half
    garage_adj_per_stall: int = 7500                  # frontend card (single rate)
    garage_attached_factor: float = 1.0
    garage_detached_factor: float = 0.67
    garage_tandem_factor: float = 0.5

    # --- Age (method high-conf; magnitude proxy) — straight-line age-life
    age_adj_per_year: int = 700                       # $/yr effective-age delta
    economic_life_years: int = 60                     # depreciation = eff_age / life

    # --- Condition / Quality (proxy; UAD analog, labeled) — $/step
    condition_adj_per_step: int = 12000               # CoreLogic median ~$12k
    quality_adj_per_step: int = 15000

    # --- Thresholds: two-tier (ADR-002)
    # HARD tolerances (Fannie legacy / lender) — breach => *_ADJ_BREACH flag
    net_threshold: float = 0.15
    gross_threshold: float = 0.25
    line_threshold: float = 0.10
    # SOFT review bands (fire below the hard line; AIC narrative-support posture)
    net_review_band: float = 0.08
    gross_review_band: float = 0.12
    line_review_band: float = 0.05
    # Candidate hard rejection cap (pre-selection) — => GROSS_ADJ_TOO_HIGH rejection
    candidate_gross_cap: float = 0.25

    # --- Recency windows
    stale_watch_days: int = 120                       # soft → STALE_COMP (still selected)
    stale_max_days: int = 274                         # ~9mo hard → TOO_STALE rejection

    # --- Selection / widening / reconciliation flag thresholds
    min_comp_count: int = 4                           # below → THIN_COMP_SET
    wide_unadjusted_spread_pct: float = 0.30
    high_comp_anchor_tolerance: float = 0.02
    deep_widening_tier: int = 2                        # tier >= this → DEEP_WIDENING
    outlier_mad_threshold: float = 2.0                # PPSF MAD distance → OUTLIER_PRICE

    # --- Confidence model
    confidence_base: float = 0.55                     # prior before evidence-quality drivers
```

## Result types (produced by the deterministic core; consumed by LLM + renderer)
Frozen models, sketched: `SimilarityScore`, `WideningStep(tier, criteria_relaxed, rationale, penalty)`, `RejectionRecord(comp_id, reason_code, detail)`, `GridLine(attribute, subject_val, comp_val, adjustment)`, `AdjustedComp(comp, lines, net_pct, gross_pct, max_line_pct, adjusted_value, weight)`, `ValueRange(low, point, high, spread_pct)`, `ConfidenceBreakdown(base, score, low, high, band, drivers)`, `Flag(code, status, severity, trigger, detail)`, `MemoArtifact(subject, selected, rejected, range, confidence, flags, + prose slots)`.

Reason codes (`ReasonCode`) and flag codes (`FlagCode`), plus `FlagStatus`/`Severity`, are closed enums so tests can assert at the boundary. The full set ships in `src/kvcomp/schemas/results.py` and matches the viewer registry (DECISIONS.md ADR-002).
