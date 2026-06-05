"""
schemas/config.py — AdjustmentConfig.

Every adjustment constant is editable and proxy-labeled. Defaults are the CALIBRATED
rate card adopted from the delivered viewer (see docs/DECISIONS.md ADR-001), NOT the raw
474×0.45 prior — that prior is retained as documented provenance only.

Threshold model is the two-tier soft-review + hard-tolerance scheme adopted from the
viewer (ADR-002). All non-CREB magnitudes remain US/North-American PROXIES to be locally
calibrated; Canadian standards (AIC/CUSPAP, UBC BUSI 330) publish no fixed schedule.
"""

from __future__ import annotations

from pydantic import BaseModel

# LenderProfile is defined once, in subject.py, to avoid a duplicate enum.
from kvcomp.schemas.subject import LenderProfile  # noqa: F401  (re-exported)


class AdjustmentConfig(BaseModel, frozen=True):
    lender_profile: LenderProfile = LenderProfile.FNMA_OFF

    # --- GLA -----------------------------------------------------------------
    # Calibrated effective rate (ADR-001). The PPSF prior below is kept only as
    # provenance: gla_adj_per_sqft is what the grid actually applies.
    gla_adj_per_sqft: int = 85                 # CALIBRATED ($/sf above grade)
    local_ppsf_prior: float = 474.0            # Calgary mid-2025 city-wide (provenance)
    gla_contributory_fraction_prior: float = 0.45  # 40–50% (provenance; → ~$213, rejected)

    # --- Lot (proxy) — diminishing returns -----------------------------------
    lot_adj_per_sqft: int = 12                 # frontend card ($/sf site)
    lot_no_adj_band_sqft: int = 1000           # within this delta → no adj
    lot_diminishing_exponent: float = 0.7      # <1 = diminishing returns

    # --- Bedrooms / baths (proxy) --------------------------------------------
    bedroom_adj: int = 4000                    # frontend card (note: DOMAIN prior was $0)
    bedroom_functional_threshold: int = 2      # below this, beds start to matter
    full_bath_adj: int = 6000                  # 5,000–7,000
    half_bath_adj: int = 3500                  # 2,000–3,500

    # --- Basement (proxy) — fraction of AG rate; SEPARATE grid line ----------
    basement_adj_per_sqft: int = 35            # CALIBRATED ($/sf finished below-grade)
    basement_fraction_of_ag_prior: float = 0.45   # 25–60% (provenance: 35/85 ≈ 0.41)
    basement_walkout_premium: float = 0.15     # extra within below-grade

    # --- Garage (proxy) — attached > detached; tandem at half ----------------
    garage_adj_per_stall: int = 7500           # frontend card (single rate)
    garage_attached_factor: float = 1.0
    garage_detached_factor: float = 0.67
    garage_tandem_factor: float = 0.5

    # --- Age (method high-conf; magnitude proxy) — straight-line age-life -----
    age_adj_per_year: int = 700                # $/yr effective-age delta (frontend card)
    economic_life_years: int = 60              # Marshall Valuation; depreciation = eff_age/life

    # --- Condition / Quality (proxy; UAD analog, labeled) --------------------
    condition_adj_per_step: int = 12000        # $/C-step (CoreLogic median ~$12k)
    quality_adj_per_step: int = 15000          # $/Q-step

    # --- Thresholds: two-tier (ADR-002) --------------------------------------
    # HARD tolerances (Fannie legacy / lender) — breach => *_ADJ_BREACH flag.
    net_threshold: float = 0.15
    gross_threshold: float = 0.25
    line_threshold: float = 0.10
    # SOFT review bands (fire below the hard line; AIC narrative-support posture).
    net_review_band: float = 0.08
    gross_review_band: float = 0.12
    line_review_band: float = 0.05
    # Candidate hard rejection cap (pre-selection) — => GROSS_ADJ_TOO_HIGH rejection.
    candidate_gross_cap: float = 0.25

    # --- Recency windows -----------------------------------------------------
    stale_watch_days: int = 120                # soft → STALE_COMP flag (still selected)
    stale_max_days: int = 274                  # ~9mo hard → TOO_STALE rejection

    # --- Selection / widening / reconciliation flag thresholds ---------------
    min_comp_count: int = 4                    # below → THIN_COMP_SET (frontend uses 4)
    wide_unadjusted_spread_pct: float = 0.30
    high_comp_anchor_tolerance: float = 0.02
    deep_widening_tier: int = 2                # tier >= this → DEEP_WIDENING flag
    outlier_mad_threshold: float = 2.0         # PPSF MAD distance → OUTLIER_PRICE

    # --- Confidence model ----------------------------------------------------
    confidence_base: float = 0.55             # prior before evidence-quality drivers

    def gla_rate(self) -> int:
        return self.gla_adj_per_sqft

    def rate_card(self) -> dict[str, int]:
        """The documented rate card, in the exact shape MEMO_CONTRACT RateCard expects."""
        return {
            "gla": self.gla_adj_per_sqft,
            "lot": self.lot_adj_per_sqft,
            "bed": self.bedroom_adj,
            "bathFull": self.full_bath_adj,
            "bathHalf": self.half_bath_adj,
            "basement": self.basement_adj_per_sqft,
            "garage": self.garage_adj_per_stall,
            "age": self.age_adj_per_year,
            "condition": self.condition_adj_per_step,
            "quality": self.quality_adj_per_step,
        }
