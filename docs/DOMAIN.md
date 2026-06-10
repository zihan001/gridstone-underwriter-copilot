# DOMAIN

Appraisal-method reference for the sales-comparison approach as implemented here. Every figure carries a source + confidence tag. **All non-CREB dollar magnitudes are US/North-American PROXIES** — Canadian standards (AIC/CUSPAP, UBC BUSI 330) deliberately publish no fixed dollar schedule and mandate **market extraction** (paired-sales / regression / grouped-data). We treat the proxies as priors and the synthetic generator as our stand-in for paired-sales calibration (see "matched pair" below).

---

## 1. The sales-comparison grid
The core appraisal artifact. Rows = the **subject's attribute schema**; columns = subject + each comp. Each comp's sale price is adjusted, line by line, toward the subject:

> adjusted_comp_value = sale_price + Σ(line adjustments) + time adjustment

Sign convention: if a comp is **superior** to the subject on a line, the adjustment is **negative** (we subtract the comp's surplus to make it comparable to the subject); if **inferior**, positive. The grid rows are exactly the frozen `Subject` fields (see DATA_CONTRACTS.md) so the grid is schema-driven, not hand-coded per attribute.

## 2. How adjustments are derived — and why synthetic stands in for paired-sales
Real Canadian practice extracts each adjustment from the market: find two sales differing in **one** attribute, the price delta ≈ that attribute's contributory value (paired-sales analysis). No Canadian body publishes rule-of-thumb dollars (UBC BUSI 330; aicanada.ca — Alberta-specific, high confidence).

We cannot run live paired-sales (no MLS). So:
- The **synthetic generator** prices each comp from a known, explicit contributory-value function (the "true" market).
- The **adjustment grid** is the inverse of that function.
- The **matched-pair principle:** generator and grid are one design artifact. If the grid's adjustment constants don't recover the generator's pricing structure, the round-trip test fails. This is the engineer-facing proof of domain correctness (see TESTING.md). The constants below are the proxy *priors*; the generator's true coefficients are what the grid must recover.

## 3. Adjustment line items (CALIBRATED rate card — all editable in `AdjustmentConfig`)
Each adjustment is a **fraction of contributory value**, NOT full price-per-sqft (the sale price embeds lot, garage, basement, etc.; applying full PPSF to GLA double-counts). Defaults below are the **calibrated** rate card (docs/DECISIONS.md ADR-001/002), not the raw PPSF-derived priors; the PPSF prior is retained in `AdjustmentConfig` as a `*_prior` provenance field showing what we calibrated down from.

| Line | Calibrated magnitude | Basis / confidence |
|---|---|---|
| **GLA (above-grade sqft)** | **$85/sqft** (calibrated down from the $474 PPSF × 0.45 ≈ $213 prior, which double-counted; ADR-001) | Fannie LL-2015-02 (median GLA adj < $50/sqft in all 50 states ≪ PPSF); diminishing returns. Method high conf; magnitude calibrated proxy |
| **Finished basement (below-grade)** | **$35/sqft** finished (≈ 41% of the $85 AG rate; within the 25–60% band); walkout premium +15% | PlanSnapper/Redfin/CREM/WorkingRE. Method high conf (Cdn sources confirm discount); magnitude proxy. Reported on a SEPARATE grid line, never in GLA (ANSI/RMS) |
| **Full bath** | **$6,000** | RE Financial Planner; Sacramento Appraisal Blog. Proxy, med conf |
| **Half bath** | **$3,500** | same. Proxy, med conf |
| **Bedroom** | **$4,000** (note: DOMAIN prior was $0-unless-functional; the calibrated card prices a small explicit delta, ADR-001) | Bedroom value largely captured inside GLA; small residual. Proxy, med conf |
| **Garage / stall** | **$7,500/stall**; attached ×1.0, detached ×0.67, tandem ×0.5 | Urban Luxe (Denver); RE Financial Planner. Proxy, med conf |
| **Lot size** | **$12/sqft**, diminishing-returns exponent 0.7; no adj if within ~1,000 sqft | JVM Lending; AppraisersForum. Proxy, med conf |
| **Age** | **$700/yr** effective-age delta; age-life depreciation% = effective_age ÷ economic_life (60 yr), straight-line | Marshall Valuation Service econ life; CoreLogic. Method high conf; magnitude proxy |
| **Condition (C1–C6)** | **$12,000 / one-step** (was ~5% of price; now $/step matching the viewer card + CoreLogic median ~$12k) | WorkingRE; CoreLogic. US UAD construct; Cdn CUSPAP analog — labeled proxy. Proxy, med conf |
| **Quality (Q1–Q6)** | **$15,000 / one-step**; absolute not market-relative | Freddie UAD FAQ; McKissock. Labeled proxy |

## 4. Time / market-conditions adjustment (HIGH confidence, Alberta-specific data)
Method (universal): convert a market trend (monthly %) into a dollar adjustment applied **from each comp's CONTRACT date** to the effective date — never close-of-escrow (Fannie B4-1.3-09; UBC BUSI 330: "usually a monthly percentage figure based on actual sales").

We encode the **actual CREB detached benchmark monthly series PER DISTRICT** (Alberta-specific, high confidence). The city-wide series below is the fallback; `data/constants.py` also encodes the **South-district** series (the sample subject's district — smoother and lower than city-wide), and the time engine selects the series by the comp's district (ADR-003). The South series in `viewer/data.js` is the authoritative fixture for `test_time_engine.py`.

City-wide fallback series:

```
2025: Jan 749,300 Feb 758,400 Mar 766,600 Apr 766,300 May 766,300 Jun 761,300
      Jul 758,100 Aug 752,500 Sep 746,500 Oct 740,400 Nov 730,300 Dec 726,300
2026: Jan 724,000 Feb 734,300 Mar 741,300 Apr 745,400 May 747,800
```
- Each comp's contract date indexes into its **district** series; adjustment = (benchmark@effective ÷ benchmark@contract − 1) × sale_price.
- If a comp's district lacks an encoded series it falls back to city-wide and fires `UNSUPPORTED_TIME_ADJ`.
- Implied trend mid-2026: ~+0.3%/month recent up-leg; YoY May 2026 **−2.41%**.
- For dates beyond the series, extrapolate a mild seasonal sinusoid (spring peak, winter trough) around a −2% to −3%/yr drift. (CREB / WOWA, high conf.)

## 5. Net vs. gross adjustment treatment — FLAGS, not fails
- **Two-tier thresholds (ADR-002).** Hard tolerances: **line 10% / net 15% / gross 25%** of the comp's sale price (Fannie legacy B4-1.4-17). Soft review bands fire *below* the hard line — **line 5% / net 8% / gross 12%** — flagging for narrative support before a tolerance is breached. A separate **candidate gross cap (25%)** rejects too-dissimilar comps *before* selection (`GROSS_ADJ_TOO_HIGH`). Net = Σ signed; gross = Σ absolute.
- **Fannie RETIRED 15/25 in 2014** (SEL-2014-16 / LL-2015-02): 95%/94% of comps already sat under the limits → appraisers were fitting adjustments to the cap, not the market. CU does not enforce them. **Freddie/FHA/VA/USDA may still apply.**
- **AIC (Alberta, high conf):** where lender Terms of Reference conflict with good practice, threshold "criteria … should not supersede good appraisal practice." Pick best comps first; explain breaches in commentary.
- **Implementation:** compute net%, gross%, max-line% per comp → emit a FLAG with auto-commentary stub on breach. Configurable per `lender_profile` (`fnma_off` = informational; `gse_on` = breach flagged louder). Never reject a comp on threshold alone.

## 6. Reconciliation — weighted, NOT averaged (and why)
Averaging treats a poorly-supported comp (far, stale, heavily adjusted) equally with a strong one — appraisal practice weights toward the most similar, least-adjusted, most-recent comps. We compute a **weight per comp** from inverse evidence-cost (similarity, recency, distance, gross-adjustment burden) and reconcile the weighted distribution of adjusted values into a **RANGE** (e.g., weighted central tendency ± a spread driven by adjusted-value dispersion). The output is a defensible band with a point of central tendency, never a single number sold as "the value."

## 7. Confidence from EVIDENCE QUALITY (not model certainty)
Confidence is a deterministic function of the *case*, decomposed into named drivers so the memo can show its work:
- comp **count** (more supported comps ↑)
- **recency** (contract dates near effective date ↑)
- **distance** (tighter geographic/district clustering ↑)
- **adjusted-value spread** (tight band ↑)
- **adjustment burden** (low gross% ↑)
- **widening depth** (each tier the search had to widen ↓ — penalty)

Reported as a band + a per-driver breakdown. No learned probability; fully traceable.

## 8. FLAG CATALOG — each with its trigger
All flags are advisory; they direct underwriter attention, never block. The registry is emitted in full every run — both **FIRED** and **CLEAR** — so the memo shows what was checked and passed (ADR-002). Each flag carries a `severity` (`review` / `info` / `tolerance`). Codes are the closed `FlagCode` enum in `results.py`.

| Flag | Severity | Trigger condition |
|---|---|---|
| `STALE_COMP` | review | a SELECTED comp's contract age > soft watch window (120 days) — still selected, weight reduced |
| `DEEP_WIDENING` | review | search reached tier ≥ `deep_widening_tier` (2) to fill the set |
| `THIN_COMP_SET` | review | selected comp count < `min_comp_count` (4) after widening |
| `EXCESSIVE_NET_ADJ` | review | a selected comp's net adj % > soft review band (8%) |
| `EXCESSIVE_GROSS_ADJ` | review | a selected comp's gross adj % > soft review band (12%) |
| `NET_ADJ_BREACH` | tolerance | a selected comp's net adj % > hard tolerance (15%) |
| `GROSS_ADJ_BREACH` | tolerance | a selected comp's gross adj % > hard tolerance (25%) |
| `LINE_ADJ_BREACH` | tolerance | any single line adj > hard tolerance (10% of price) |
| `ADJACENT_DISTRICT_COMP` | info | a selected comp is outside the subject district (location absorbed via weighting) |
| `OUTLIER_PRICE_INCLUDED` | review | a SELECTED comp's PPSF > `outlier_mad_threshold` (2.0) MAD from set median |
| `VALUE_OUTSIDE_RANGE` | review | reconciled point falls outside [min, max] of adjusted comp values |
| `HIGH_COMP_ANCHORING` | review | reconciled point biased toward the highest comp beyond `high_comp_anchor_tolerance` |
| `UNSUPPORTED_TIME_ADJ` | review | time adj applied without a contract date, or comp date/district outside the encoded series (extrapolated/fallback) |
| `WIDE_UNADJUSTED_SPREAD` | review | raw (pre-adjustment) comp price range exceeds `wide_unadjusted_spread_pct` (30%) |

(`TOO_STALE`, `GROSS_ADJ_TOO_HIGH`, `WRONG_DISTRICT_AFTER_WIDENING`, `OUTLIER_PRICE`, `DUPLICATE` are rejection **reason codes**, not flags — they remove a candidate *before* selection; see `ReasonCode`.)

Flag thresholds live in `AdjustmentConfig`/profile so they're tunable and testable at the boundary (TESTING.md): one case just below each threshold (CLEAR) and one just above (FIRED), covering both the soft band and the hard tolerance for net/gross/line.

## 9. Comp scoring — the data reasoning behind the numbers

The similarity function (`domain/retrieval.py`) blends three components into a [0,1] score:

> score = **0.6 × structural + 0.2 × distance + 0.2 × recency**

with structural closeness itself a weighted blend of relative deltas
(0.9·GLA + 0.5·lot + 0.6·age + 0.3·beds + 0.3·baths + 0.3·basement, capped at 1), distance
decaying linearly to zero at 8 km, and recency decaying to zero at 274 days (the same ~9-month
horizon as the hard `TOO_STALE` cut, so the score and the rejection rule agree on what "too
old" means).

**Why structural dominates the score — and location doesn't.** Calgary's detached market is
district-bifurcated roughly 2:1 (West ~$1.005M vs East ~$489k benchmark, per the Research
Report / CREB), which is exactly why location is **not** trusted to a soft weight: a
cross-market comp shouldn't score 20% worse, it should be *out*. So geography is enforced
upstream as hard rules — the tiered widening loop only admits adjacent districts at tier 1
(per the encoded adjacency topology; South never reaches West across the Glenmore corridor),
and a comp from a non-adjacent district is rejected outright (`WRONG_DISTRICT_AFTER_WIDENING`).
By the time the similarity score ranks candidates, they are already in-market, and *within* a
market the structural attributes (GLA above all — the 0.9 inner weight) are what drive price
comparability; distance and recency then act as tie-breakers feeding the widening preference
order and the reconciliation weights.

**Why these features, and why condition is deliberately NOT in similarity.** Structure,
distance, and recency are the three axes a comp can be a *bad analogue* on. Condition and
quality are excluded from the score on purpose, though both carry real money in the grid
($12,000/$15,000 per step): they are subjective intake fields (UAD-analog labels, not measured
quantities), and a condition delta is exactly what the adjustment grid corrects — penalizing
it again in retrieval would double-count it and bury the C4 fixer that is otherwise the best
comp on the street. The rule of thumb: **measured, price-driving deltas score; subjective,
grid-correctable deltas adjust.**

**Edge case the data forced: MAD on tiny samples.** PPSF outlier rejection uses median
absolute deviation (robust to the very outliers it hunts). On small candidate sets it is
unstable — with 3–4 comps a single legitimately larger, lower-PPSF comp can read as >2 MAD
from the median and get falsely rejected (this happened; see IMPLEMENTATION.md §6). Fix:
`rejection.outliers` requires a **minimum sample of 5** before the rule may fire at all, and
the planted-reject scaffold (DECISIONS.md ADR-007) was designed so its own members help meet
that floor on thin decks.

**The framing.** The data thinking here went into making every scoring and adjustment decision
a defensible **rule** rather than a learned weight — because the hard problem in this domain is
traceability, not prediction accuracy. When real sales data exists (an MLS/CREB feed),
regression against it is the named path to extract these coefficients from the market
(paired-sales at scale); the architecture already isolates every coefficient in
`AdjustmentConfig` so calibration replaces constants, not code.
