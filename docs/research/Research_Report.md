# Calibration Reference: Synthetic Sold-Comp Generator & Dollar-Adjustment Grid for Calgary Detached Homes

**Scope:** Single-family DETACHED, existing resale, City of Calgary, Alberta. Current date June 2026. Every figure carries a (source), an uncertainty/confidence flag, and an Alberta-specific vs. labeled-proxy tag. All dollar figures are ready to drop into code.

## TL;DR
- Anchor the engine to the Calgary detached benchmark of **$747,800 (CREB, May 2026)** and a recent monthly trend of **+0.3%/month** (CREB: detached "rose from $724,000 in January to $747,800 in May" 2026); this is the single highest-confidence, Alberta-specific input.
- For adjustment magnitudes, **no Canadian appraisal body publishes a fixed dollar schedule** — Canadian practice (AIC/CUSPAP, UBC BUSI 330) mandates market extraction — so encode adjustments as *fractions of contributory value* (GLA as a fraction of price-per-sqft, finished basement ≈ 25–60% of the above-grade rate) seeded from US proxies and flagged for local paired-sales calibration.
- Encode net/gross review thresholds (15% net / 25% gross / 10% line) as *soft flags requiring commentary*, not auto-fails: Fannie Mae formally retired them in 2014, lenders (Freddie/FHA/VA/USDA) may still apply them, and AIC warns lender thresholds "should not supersede good appraisal practice."

## Key Findings
1. The GLA adjustment must reflect marginal contributory value, not full price-per-sqft. Fannie Mae's own data is striking: per Lender Letter LL-2015-02, "Only in Hawaii does the median GLA adjustment break $50 per square foot, even though median GLA price exceeds $50 per square foot in all 50 states and is significantly higher in certain market areas" — i.e., appraiser GLA adjustments run well below total PPSF everywhere because non-GLA features are adjusted on separate grid lines and living area shows diminishing returns.
2. CREB publishes exact "typical home attributes" for detached homes by district, directly usable as synthetic-generator defaults (city-wide typical detached: 1,410 sqft above grade, lot 4,897 sqft, 3 beds, 2 full baths, year built 1992).
3. Calgary detached prices are bifurcated by district. Per the CREB May 2026 report, the West fell "just 0.19 per cent to a whopping $1,005,200" (most expensive) while the East fell "6.78 per cent to $489,100, which also made it the least expensive area of the city" — a ~2x spread any realistic generator must encode at the district level.

## Details

### AREA 1 — Adjustment Magnitudes (detached)

**Critical framing (Alberta-specific, high confidence):** No Canadian appraisal authority (AIC, BCREA) publishes rule-of-thumb dollar adjustments. Canadian appraisal education — UBC Sauder BUSI 330 and *The Appraisal of Real Estate, Canadian Edition* — mandates that adjustments be market-extracted via paired-sales, regression, or grouped-data analysis. (Source: UBC Sauder BUSI 330; aicanada.ca.) Therefore every dollar figure below outside CREB data is a **US/North American proxy** to be locally calibrated.

**GLA / per-square-foot:**
- *Why not full PPSF:* the total sale price embeds lot, garage, basement, landscaping, etc.; isolating the GLA line and applying full PPSF would double-count features adjusted elsewhere. The GLA adjustment captures only the *marginal* value of living area, which the market pays progressively less for as homes grow (diminishing returns). (Source: Calculator Academy; Appraisal Buzz "Contributory Value." Confidence high — universal principle, applies in Canada.)
- *Depreciated/contributory mechanism:* marginal cost × market reaction. Example: 200 sqft costs $20,000 to build; if the market pays 70% (remaining-economic-life ratio), contributory value = $14,000 = $70/sqft. (Source: Appraisal Buzz. Proxy; high confidence on method.)
- *Typical magnitude:* national appraiser behavior keeps the **median GLA adjustment under $50/sqft in all 50 states** despite far higher PPSF (Source: Fannie Mae LL-2015-02). Practitioner ranges cite **$25–$75/sqft**; a regression example produced **$80.64/sqft = 47.1% of average comp value/sqft**, and a trainee rule of thumb is "50% of avg sale price/sqft, capped ~$80/sqft." (Source: Calculator Academy; WorkingRE. Proxy, medium confidence.)
- *Calgary applied estimate:* city-wide detached ≈ $474/sqft above grade (mid-2025), so a 40–50% rule implies a GLA adjustment around $190–$235/sqft — INFERENCE only, no Calgary source confirms; flag for paired-sales calibration. (Confidence low.)

**Bathrooms:**
- Full bath commonly **$5,000–$7,000**; half bath **$2,000–$3,000**. One worked appraisal used $6,000 full / $3,000 half; another $2,000 full and ¾ / $1,000 half. (Source: Real Estate Financial Planner; Sacramento Appraisal Blog. Proxy, medium confidence — varies widely by price tier.)

**Bedrooms:**
- Often **$5,000–$10,000** as "filler," but properly **$0** when count doesn't impair functional utility (3+ above-grade beds typical). Bedroom value is frequently captured inside the GLA adjustment. (Source: Sacramento Appraisal Blog; Urban Luxe. Proxy, medium confidence.)

**Garage per stall:**
- Suburban **$4,000–$5,000/bay**; tandem/built-in at half; dense urban cores $10,000+/bay. One appraisal: $10,000/attached stall, $5,000/built-in tandem; another $7,000/car. Detached garages generally adjusted lower than attached. (Source: Urban Luxe Real Estate (Denver); Real Estate Financial Planner. Proxy, medium confidence.)

**Finished basement / below-grade:**
- Below-grade finished area contributes **25–60% (commonly 50–75%)** of the above-grade per-sqft rate, reflecting lower ceilings, less light, buyer preference. Walkouts command a premium within below-grade. Worked example: $14–$21/sqft for basement finish; a US "homes under $200k" rule is $10/sqft + $10/sqft finished. (Source: PlanSnapper; Redfin; Canadian Real Estate Magazine; WorkingRE. Method universal/high confidence; Canadian sources confirm the 50–75% discount concept.)
- *Below vs. above grade:* per Fannie/ANSI, any level partly below grade is below-grade regardless of finish; reported on a separate "Basement & Finished Rooms Below-Grade" grid line, never in GLA. Alberta's RMS likewise excludes basement from stated sqft. (Source: McKissock; Fannie Mae; New Homes Alberta. High confidence.)

**Lot size:**
- Diminishing returns: value per unit area falls as lot grows. Typical adjustment only **$3–$5/sqft** in many neighborhoods; no adjustment if comp lot is within ~1,000 sqft of subject. Derive via price-per-acre/sqft graphing or site extraction; lot utility (slope, shape, density) can override raw size. (Source: JVM Lending; AppraisersForum. Proxy, medium confidence.)

**Age / effective age depreciation:**
- Age-life method: depreciation % = effective age ÷ total economic life, applied straight-line. Total economic life typically **60 years (non-high-end), 65 (high-end)** per Marshall Valuation Service. Effective age (condition-driven) ≠ actual age; renovation lowers effective age. Example: 15/60 = 25% depreciation. Actual-age line-item adjustments are small (~$1,000, applied ~25% of the time in CoreLogic data). (Source: WorkingRE; Solomon/Cleveland Appraisal; Appraisers Blogs. Method universal/high confidence; magnitudes proxy.)

**Condition (C1–C6) and Quality (Q1–Q6):**
- UAD scales: C1 new/like-new → C6 substantial damage/safety issue (any C6 portion forces whole-dwelling C6; Freddie won't buy C5/C6). Q1 exceptional/custom → Q6 minimal/substandard; quality is absolute, not market-relative. (Source: Freddie Mac UAD FAQ; McKissock. High confidence — US GSE constructs; Canadian lenders use analogous CUSPAP form fields, a labeled proxy.)
- *Magnitude per tier:* one common method = ~**5% of sale price per one-step condition change**, extracted via paired sales. CoreLogic national medians: condition ~$12,000 (made ~50% of the time), location ~$10,000, age ~$1,000; high-value markets run condition 5% ≈ $40,000–$50,000. (Source: WorkingRE "A Spreadsheet Solution"; Appraisers Blogs. Proxy, medium confidence.)

### AREA 2 — Time / Market-Conditions Adjustments

**Method (universal/high confidence):** The market-conditions (date-of-sale) adjustment converts a market trend (monthly %) into a dollar adjustment applied from each comp's *contract date* to the effective date. Derivation methods: paired resales of the same/similar property, repeat-sales, HPI indexing, or regression. Example: 20% annual rise → ÷12 → **1.6%/month**; or sale/resale $100k→$140k over 24 months → +$1,666/month. Fannie Mae requires time adjustments be evidence-supported and measured from contract date, not close-of-escrow. (Source: Fannie Mae B4-1.3-09; DW Slater; WorkingRE; Garfield County CO; UBC BUSI 330. High confidence.) Canadian note: BUSI 330 states the time adjustment is "usually a monthly percentage figure based on actual sales."

**Calgary detached benchmark trend (CREB, Alberta-specific, HIGH confidence) — directly encodable monthly series:**

2025 detached benchmark: Jan $749,300 · Feb $758,400 · Mar $766,600 · Apr $766,300 · May $766,300 · Jun $761,300 · Jul $758,100 · Aug $752,500 · Sep $746,500 · Oct $740,400 · Nov $730,300 · Dec $726,300.

2026 detached benchmark: Jan $724,000 · Feb $734,300 · Mar $741,300 · Apr $745,400 · May $747,800.

(Source: CREB May 2026 Monthly Stats Package, City of Calgary, detached table.)

- *Implied monthly trends to encode:* a soft seasonal up-leg in winter→spring (Jan–May 2026: $724,000→$747,800 ≈ +3.3% over 4 months ≈ **+0.8%/month**; CREB chief economist Ann-Marie Lurie: detached "rose from $724,000 in January to $747,800 in May," and the latest single-month move was **+0.3% MoM**), and a summer→winter down-leg (May–Dec 2025: $766,300→$726,300 ≈ −5.2% over 7 months ≈ **−0.75%/month**). Year-over-year May 2026 was **−2.41%**. (Source: CREB; WOWA. High confidence.)
- For a realistic generator, encode a mild seasonal sinusoid (spring peak ~Apr–May, trough ~Dec–Jan) around a slightly negative YoY drift of about −2% to −3%/yr as of mid-2026.

### AREA 3 — Net vs. Gross Adjustment Caps

- **The conventional thresholds:** line item **10%**, net adjustment **15%**, gross adjustment **25%** of the comparable's sale price. Net = sum of signed adjustments; gross = sum of absolute values. (Source: Fannie Mae legacy Selling Guide B4-1.4-17; AppraisersForum. High confidence.)
- **Origin:** Fannie Mae/Freddie Mac guideline; the 10% line-item is a *lender* overlay, never a formal FNMA rule. Premise: the best comp needs the fewest adjustments. (Source: AppraisersForum; KapRE. High confidence.)
- **Status:** Fannie Mae **eliminated** the 15%/25% guidelines in 2014 (Selling Guide Announcement SEL-2014-16 / Lender Letter LL-2015-02). The catalyst, in FNMA's own words: "Fannie Mae analyzed 700,000 appraisals submitted to Fannie Mae in Q1 2014, including analysis of more than 2.5 million comparable sales. Nearly 95% of comps analyzed had net adjustments less than 15%, suggesting that appraisers strictly adhered to the net adjustments guideline... nearly 94% of comps having gross adjustments less than 25%" — evidence that appraisers were fitting adjustments to the limits rather than to market reaction. Current FNMA stance: "Fannie Mae does not have specific limitations or guidelines associated with net or gross adjustments." Collateral Underwriter does NOT enforce 15/25. **Freddie Mac, FHA, VA, and USDA may still apply them.** (Source: Fannie Mae LL-2015-02; Appraisers Blogs; SAMCO. High confidence.)
- **Breach treatment:** flags requiring commentary, NOT auto-fails. The appraiser must explain why no more-similar comp was available; comps exceeding thresholds remain usable. Many lenders still request the legacy commentary as a review-consistency tool. (Source: AppraisersForum; Fannie Mae CU job aid. High confidence.)
- **AIC perspective (Alberta/Canada-specific, high confidence):** CUSPAP governs; where lender Terms of Reference conflict with good appraisal practice, "criteria on the timeliness and the extent of required adjustment...should not supersede good appraisal practice." AIC notes lenders won't accept a grid with no adjustments (gross/net would read as too high) and that unique properties or slow markets routinely force threshold breaches. Best practice: select the best comps first, explain breaches in commentary. (Source: AIC "Underwriter risk requirements versus good appraisal practice"; AIC "Your input matters more than you realize"; UBC/Sauder claim-prevention bulletin. High confidence.)

### AREA 4 — Calgary Detached Market Parameters (synthetic generator inputs)

**Benchmark price (CREB, May 2026, Alberta-specific, HIGH confidence):**
- City-wide detached benchmark **$747,800** (−2.41% YoY, +0.32% MoM). Detached average **$844,352** ("down 0.3% year-over-year and up 1.7% from April"); median **$715,000**; detached at 2.45 months of supply ("seller's market conditions persist"). (Source: CREB May 2026; WOWA June 2, 2026.)

**District-level detached benchmark (CREB May 2026, HIGH confidence) — encode at district level:**

| District | Benchmark | YoY | MoM |
|---|---|---|---|
| West | $1,005,200 | −0.19% | −0.24% |
| City Centre | $985,500 | −0.74% | +0.69% |
| North West | $799,000 | −1.14% | +0.44% |
| South | $721,600 | −2.42% | +0.14% |
| South East | $704,200 | −2.98% | +1.08% |
| North | $647,200 | −5.05% | +0.28% |
| North East | $563,900 | −6.96% | −0.21% |
| East | $489,100 | −6.78% | +0.33% |
| **TOTAL CITY** | **$747,800** | **−2.41%** | **+0.32%** |

(Source: CREB May 2026 District table; corroborated by Daily Hive.)

**Price per square foot (above-grade):**
- City-wide Calgary detached **$474/sqft** mid-2025: per the CENTURY 21 Canada Price Per Square Foot Survey 2025 (released July 28, 2025; data Jan 1–Jun 30, 2025), "Calgary's increases were less than one per cent, but sit at $474 for a house and $422 for a condo." Corroborated by New Homes Alberta ("~$470/sq. ft."). (Alberta-specific, medium-high confidence — note this is mid-2025, slightly stale for June 2026.)
- No published quadrant-level $/sqft table exists; directionally, SE/outer suburbs run below city-wide (newer, larger stock) while inner SW (Marda Loop/Altadore) and inner NW run well above. HonestDoor community pages are the drill-down source. (Source: subagent research. Low-medium confidence.)

**Typical home attributes by district (CREB May 2026 "Typical Home Attributes — Detached," Alberta-specific, HIGH confidence) — ideal generator defaults:**

| District | GLA (above grade, sqft) | Lot (sqft) | Beds (AG) | Year Built | Full Bath | Half Bath |
|---|---|---|---|---|---|---|
| City Centre | 1,257 | 5,252 | 3 | 1952 | 2 | 0 |
| North East | 1,198 | 4,119 | 3 | 1985 | 2 | 1 |
| North | 1,396 | 4,380 | 3 | 1998 | 2 | 1 |
| North West | 1,582 | 5,349 | 3 | 1994 | 2 | 1 |
| West | 1,769 | 5,608 | 3 | 1998 | 2 | 1 |
| South | 1,450 | 5,242 | 3 | 1984 | 2 | 1 |
| South East | 1,522 | 4,262 | 3 | 2001 | 2 | 1 |
| East | 1,103 | 4,871 | 3 | 1973 | 2 | 0 |
| **City of Calgary** | **1,410** | **4,897** | **3** | **1992** | **2** | **1** |

(Source: CREB May 2026 Stats Package, p.9.)

**GLA ranges:** typical Calgary detached **1,800–2,400 sqft above grade** per industry sources (skews to newer builds; CREB's "typical" of ~1,410 sqft is lower because it includes older/smaller stock). A developed basement frequently pushes total living space >3,000 sqft; Alberta RMS excludes basement from stated sqft. (Source: New Homes Alberta; CREB. Medium confidence; the CREB figure is highest-confidence for the resale stock.)

**Bedroom/bathroom distribution:** CREB typical = 3 above-grade beds, 2 full baths, 0–1 half bath across all districts. (Source: CREB. High confidence.)

**Lot size:** CREB typical detached lot **4,897 sqft city-wide** (range ~4,119 NE to 5,608 West). New builds trend to narrow/zero-lot-line (min width 7.5 m under 2026 zoning); established communities are larger. No single City of Calgary published median lot figure exists; parcel-level land size is in the Open Calgary Property Assessments dataset. (Source: CREB; New Homes Alberta; City of Calgary. Medium-high confidence on the CREB figure.)

**Age / year-built distribution:** CREB typical year-built ranges **1952 (City Centre) to 2001 (South East)**, city-wide median ~1992. Newest detached construction is concentrated in the north (Livingston, Cornerstone) and south (Seton, Mahogany). Full year-built distribution is not published as a summary; it is available at the parcel level in Open Calgary (ROLL_YEAR 2020+). (Source: CREB; City of Calgary 2026 assessment. High confidence on typical year; low confidence on distribution.)

**City of Calgary 2026 assessment context (Alberta-specific, high confidence):** 345,687 detached/semi accounts; median single-residential assessed value **$706,000** (valuation date July 1, 2025); median detached sale price **$715,000** (+7%); ~80% of detached/semi sales suburban; median 16 days on market. (Source: City of Calgary 2026 Property Assessment Residential Market Trends; CBC; City Newsroom.)

## Recommendations

**Staged build:**
1. **Seed the generator with CREB district defaults** (the typical-attributes table) and draw each synthetic comp's district from the district benchmark distribution. Use district benchmark ± a log-normal noise term calibrated so the synthetic median matches the $747,800 city / district benchmarks. Re-benchmark quarterly as new CREB packages publish.
2. **Time engine:** encode the actual 2025–2026 monthly benchmark series above; for forward dates extrapolate with a seasonal pattern (spring peak, winter trough) around a −2% to −3%/yr YoY drift. Apply the time adjustment from contract date to effective date as a monthly %.
3. **Adjustment grid:** parameterize every line as a *fraction of contributory value* with editable constants — GLA at 40–50% of local PPSF (start ~$200/sqft for Calgary and calibrate down), basement at 25–60% of the above-grade rate, garage $5,000–$10,000/stall (attached > detached), full bath $5,000–$7,000, half bath $2,000–$3,000, bedroom $0 unless functional, lot $3–$5/sqft with a diminishing-returns curve, condition ~5%/step, age via age-life on a 60-yr economic life.
4. **Review module:** compute net%, gross%, and max line% per comp; flag (do not reject) breaches of 15/25/10; auto-generate a commentary stub. Make thresholds configurable per "lender profile" (FNMA-off vs. Freddie/FHA/VA/USDA-on).

**Benchmarks that change the recommendation:** if a future CREB package shows the detached benchmark trend flipping positive (YoY > 0) or the monthly trend exceeding ±1.5%/month, re-fit the time engine. If you obtain genuine Calgary paired-sales extractions for any line item, replace the US proxy constant immediately and lower that item's uncertainty flag.

## Caveats
- All non-CREB dollar adjustment magnitudes are **US/North American proxies**; Canadian standards deliberately avoid fixed schedules and require local market extraction. Treat them as priors, not ground truth.
- The $474/sqft Calgary figure is mid-2025 and city-wide; it is stale relative to June 2026 and masks large district/community variation.
- UAD C1–C6 / Q1–Q6 are US GSE constructs; Canadian (CUSPAP) reporting uses analogous but not identical condition/quality fields — a labeled proxy.
- CREB "typical attributes" describe the benchmark home (a statistical construct), not a simple average; the ~1,410 sqft GLA reflects inclusion of older/smaller stock and reads low versus new-build marketing figures of 1,800–2,400 sqft.
- Lot-size and year-built distributions and quadrant-level $/sqft are not published as summary statistics; they require custom queries against the Open Calgary Property Assessments dataset.