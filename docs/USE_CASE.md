# USE_CASE

This is the literal **end-to-end acceptance spec** and the **demo script**. One concrete sample subject is carried through every pipeline stage; the intermediate artifact at each stage is what the render-only viewer shows and what the demo narrates. If a stage's artifact isn't on screen, it's plumbing or scope creep.

## The demo makes ONE thing believed
**This understands real appraisal practice.** Implied viewer: an underwriter (end user). The matched-pair belief is deliberately NOT demoed (not narratable, underwriter doesn't care) — it lives in the README + round-trip test for the engineer reviewer. Demo serves the underwriter; repo serves the engineer.

## Sample subject (concrete, carried end-to-end)
A South-district detached, grounded from a real Open Calgary assessment record:
```
address: <real Open Calgary parcel>, district: SOUTH
gla_sqft: 1,450   lot_sqft: 5,242   beds_ag: 3   full_baths: 2   half_baths: 1
year_built: 1984  basement_finished_sqft: 600 (no walkout)
garage: attached, 2 stalls   condition: C3   quality: Q3
assessed_value: <real>   effective_date: 2026-06-01
```
(District South CREB typical attributes; benchmark $721,600.)

## Storyboard = acceptance spec (verbatim demo beats)

### Beat 1 — 0:00–0:20 FRAME (subject, REAL data)
- Narration: "An underwriter's bottleneck isn't computing a value — it's defending one."
- Screen: subject loads, **grounded from REAL Open Calgary assessment data**. Say "real public data."
- Artifact shown: `Subject` populated from the live assessment record (address, district, assessed value, attributes).
- Acceptance: subject fields trace to an Open Calgary record; provenance `source=open_calgary_assessment` visible.

### Beat 2 — 0:20–1:10 COMP SELECTION AS JUDGMENT (biggest beat)
- Screen: candidate comps retrieved → **tiered widening loop fires** (e.g. tier 0 same district + 6mo + ±15% GLA; relaxes to tier 1 adjacent district; tier 2 wider date; each step logs rationale + adds a confidence penalty) → **REJECTED comps shown with reason codes** beside selected ones.
- Artifacts shown: candidate set, `SimilarityScore`s, `WideningStep` log (tier, criteria relaxed, rationale, penalty), `RejectionRecord`s (reason codes: e.g. `TOO_STALE`, `WRONG_DISTRICT_AFTER_WIDENING`, `GROSS_ADJ_TOO_HIGH`, `DUPLICATE`, `OUTLIER_PRICE`).
- Narration: rejections are the tell — knowing why you threw a comp out, and recording it, is what an appraiser does and a black-box AVM can't.
- Acceptance: every rejected comp has a code + human-readable detail; every widening step has logged rationale and a visible penalty.

### Beat 3 — 1:10–2:10 GRID + RECONCILIATION
- Screen: transparent **sales-comparison grid** — rows = subject schema, columns = comps, each line adjustment signed. Name the practices on screen:
  - market-extracted-style adjustments (fractions of contributory value),
  - **time adjustment from each comp's CONTRACT date** off the actual CREB monthly series,
  - **net / gross totals vs 15 / 25 thresholds — flagged, not failed (per AIC)**.
- Then **weighted (not averaged) reconciliation → a RANGE**.
- Artifacts shown: filled `GridLine`s per comp, `AdjustedComp` (net%, gross%, max-line%, adjusted value, weight), `ValueRange(low, point, high)`.
- Acceptance: time adjustments reference contract dates and the CREB series; net/gross breaches appear as flags not rejections; output is a range with a weighted central point, never a bare number.

### Beat 4 — 2:10–2:45 CONFIDENCE + FLAGS
- Screen: confidence **band broken into evidence-quality drivers** (count, recency, distance, adjusted-value spread, adjustment burden, widening depth); **human-review flags** fired (from the DOMAIN.md catalog).
- Narration: "It never decides — it builds the case and tells the underwriter exactly where to look."
- Artifacts shown: `ConfidenceBreakdown` (per-driver contribution + band), fired `Flag`s with messages.
- Acceptance: confidence is decomposed and traceable; each fired flag names its trigger.

### Beat 5 — 2:45–3:00 THE MEMO
- Screen: one scroll of the rendered **audit-ready memo**.
- Narration: "Exported as a document an underwriter could put in a file and defend in review."
- Artifact shown: `MemoArtifact` rendered to HTML — subject, selected/rejected comps, grid, range, confidence, flags, LLM narrative.
- Acceptance: the memo is self-contained and legible; numbers match the deterministic core exactly.

## Stage → demo beat → timestamp map
| Pipeline stage | Artifact | Beat | Time |
|---|---|---|---|
| intake / subject grounding | `Subject` (real Open Calgary) | 1 | 0:00–0:20 |
| retrieval + similarity | candidate set, `SimilarityScore` | 2 | 0:20–1:10 |
| tiered widening | `WideningStep` log + penalty | 2 | 0:20–1:10 |
| rejection codes | `RejectionRecord` | 2 | 0:20–1:10 |
| adjustment grid | `GridLine`, `AdjustedComp` | 3 | 1:10–2:10 |
| time engine | per-comp time adj (CREB series) | 3 | 1:10–2:10 |
| weighted reconciliation | `ValueRange` | 3 | 1:10–2:10 |
| evidence-quality confidence | `ConfidenceBreakdown` | 4 | 2:10–2:45 |
| flag engine | `Flag`s | 4 | 2:10–2:45 |
| memo render | `MemoArtifact` → HTML | 5 | 2:45–3:00 |
