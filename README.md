# KV Capital — Comp Defensibility Copilot

> **Status: planning / scaffolding.** Implementation has not started. Sections marked _(fill during build)_ are placeholders.

## Problem
An underwriter's bottleneck in residential lending isn't computing a value — it's **defending** one. Comp analysis (finding comparable recent sales and reasoning to a supportable value) is manual, slow, and hard to audit. A black-box AVM doesn't help: it produces a number nobody can defend in review.

## What this is
A **defensibility copilot** for single-family **detached** homes in **Calgary, AB** (existing resale-style underwriting). It assembles, challenges, and **documents** a sales-comparison case and emits an **audit-ready comp memo** defending a value **RANGE** — not a point estimate. It never decides value; it builds the case and tells the underwriter exactly where to look.

## Approach (named appraisal practice)
- **Sales-comparison grid** with adjustments as fractions of **contributory value** (not full price-per-sqft).
- **Time / market-conditions adjustment** from each comp's **contract date** off the actual **CREB detached benchmark monthly series**.
- **Tiered search-widening** with logged rationale + per-tier confidence penalty; **rejected comps carry reason codes** — the appraiser move a black box can't make.
- **Net / gross adjustment caps (15% / 25% / 10% line)** treated as **FLAGS requiring commentary, not auto-fails** (per AIC: lender thresholds should not supersede good appraisal practice; Fannie retired 15/25 in 2014).
- **Weighted (not averaged) reconciliation** to a value RANGE.
- **Confidence from evidence quality** — comp count, recency, distance, adjusted-value spread, adjustment burden, widening depth — decomposed and traceable.

## Architecture (one line)
A **deterministic core does ALL the math**; the **LLM only writes prose** (rejection rationale, memo narrative, exception summaries) from already-computed outputs. The memo is fully valid even if the LLM is disabled.

## Data
- **Real** public Calgary data for the SUBJECT (Open Calgary parcel assessments).
- **Synthetic, principled, clearly-labeled** sold comps. The generator and the adjustment grid are a **matched pair**.

### Engineer-facing credibility artifact: the matched-pair round-trip test
Generate comps with known attribute deltas, run them through the grid, and assert the adjusted values recover the generator's no-noise true price. If the grid isn't a correct inverse of the generator, this test fails. It is paired-sales analysis run in reverse on synthetic data, and it is the proof that the domain logic is real. _(see docs/TESTING.md)_

## How to run
_(fill during build — clone, install, run pipeline, open viewer; record exact commands)_

## What's next
- Permit-aware red-flag panel (Open Calgary building/development permits → effective-age / condition red flags). _(stretch)_
- Real paired-sales calibration to replace US/North-American proxy adjustment constants.
- Quarterly CREB re-benchmarking.

## Explicit cuts (NOT built — by design)
Commercial borrowers · new-construction / as-improved / builder-finance / progress-advance · condos & other property types · learned/trained AVM · image / CV condition scoring · live MLS/CREB integration · generic chat UI · auth / persistence / multi-user.

A **focused agent that works beats a general one that doesn't.** Every dollar adjustment magnitude not sourced from CREB is a **US/North-American proxy** to be locally calibrated — labeled as such throughout.

## Docs
`docs/SCOPE.md` · `docs/DOMAIN.md` · `docs/ARCHITECTURE.md` · `docs/DATA_CONTRACTS.md` · `docs/USE_CASE.md` · `docs/TESTING.md` · `docs/BUILD_PLAN.md` · `docs/DECISIONS.md` · `docs/MEMO_CONTRACT.md` · `docs/research/Research_Report.md`
