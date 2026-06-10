# USE_CASE

This is the literal **end-to-end acceptance spec**. The product surface is a **12-deal triage
queue** of real-parcel subjects (4 GREEN / 5 YELLOW / 3 RED) that drills into the audit-ready
memo for any deal. Every intermediate artifact named here is what the render-only viewer shows;
if a stage's artifact isn't on screen, it's plumbing or scope creep.

## The product makes ONE thing believed
**This understands real appraisal practice.** Implied viewer: an underwriter (end user). The
matched-pair belief is deliberately NOT surfaced in the viewer (not narratable, underwriter
doesn't care) — it lives in the README + round-trip test for the engineer reviewer. The viewer
serves the underwriter; the repo serves the engineer.

## Data provenance (state it exactly; never overclaim)
Subject identity, assessed value, and lot size are grounded in real Open Calgary records;
above-grade physical attributes (GLA, beds, baths, condition) are an inspection step, defaulted
here to CREB district-typical values and labeled as such; comps are synthetic and labeled.
The per-field `FieldSource` provenance map in `schemas/subject.py` enforces this in code — any
prose describing the data must match it. Do **not** say "all the data is real."

## The queue (the deals, verbatim — from `data/inbox.py`)
Each subject is a real cached Open Calgary parcel (a reviewer can look up its roll number), run
through the unchanged `run()`/pipeline core and triaged. Every deal's universe carries the
shared 5 planted rejects (DECISIONS.md ADR-007), so reason-coded rejection is visible on every
row; the survivor set alone steers the bucket.

| Deal | District (community) | Bucket | Why it lands there |
|---|---|---|---|
| KV-1042 | South (Lake Bonavista) | GREEN | fresh, in-district, well-bracketed; tier 0 |
| KV-1043 | East (Applewood Park) | GREEN | same, at the low-value end |
| KV-1044 | South (Lake Bonavista) | GREEN | same, at the high-value end |
| KV-1045 | East (Applewood Park) | GREEN | same |
| KV-1051 | South East (McKenzie Lake) | YELLOW | a stale survivor opens deep widening → `STALE_COMP` + `DEEP_WIDENING` |
| KV-1052 | North (Panorama Hills) | YELLOW | uniformly superior survivors → `EXCESSIVE_NET_ADJ` |
| KV-1053 | North East (Saddle Ridge) | YELLOW | thin tier 0 widens to the adjacent district → `ADJACENT_DISTRICT_COMP` |
| KV-1054 | South East (Cranston) | YELLOW | superior survivors, heavy adjustments |
| KV-1055 | North (Panorama Hills) | YELLOW | stale survivor |
| KV-1061 | South (Lake Bonavista) | RED | only 3 qualifying survivors → `THIN_COMP_SET` (the one thin red) |
| KV-1062 | East (Penbrooke Meadows) | RED | raw spread too wide → `WIDE_UNADJUSTED_SPREAD` |
| KV-1063 | North East (Taradale) | RED | same — dispersed, not starved |

(The YELLOW deals all sit in no-series districts, so `UNSUPPORTED_TIME_ADJ` provides a robust
yellow floor under the per-flavor flag. Buckets are emergent from the comp evidence, not
labels — `tests/test_inbox.py` locks the 4/5/3 spread.)

## The walkthrough = acceptance spec

### 1 — The queue (triage, REAL parcels)
- Surface: the triage queue — 12 deals, sorted RED → YELLOW → GREEN. Every subject is a real
  Open Calgary parcel; the provenance sentence above applies verbatim.
- Artifact: `window.QUEUE` (verdict, confidence band, review-flag count per deal).
- Acceptance: spread is exactly 4 GREEN / 5 YELLOW / 3 RED; each row shows a verdict the core
  computed (triage is a classifier, not a valuation).

### 2 — Drill-down: comp selection as judgment (the core beat)
- Surface: a deal's memo (e.g. KV-1051). Candidate comps → **tiered widening loop** (logged
  rationale + per-tier confidence penalty) → **REJECTED comps with reason codes** beside
  selected ones — all five codes live in the queue: `TOO_STALE`, `GROSS_ADJ_TOO_HIGH`,
  `WRONG_DISTRICT_AFTER_WIDENING`, `OUTLIER_PRICE`, `DUPLICATE`. Rejections are the tell —
  knowing why a comp was thrown out, and recording it, is what an appraiser does and a
  black-box AVM can't.
- Acceptance: every deal surfaces ≥4 reason-coded rejects; every widening step has logged
  rationale and a visible penalty.

### 3 — Grid + reconciliation
- Surface: the transparent **sales-comparison grid** — rows = subject schema, columns = comps,
  each line adjustment signed; **time adjustment from each comp's CONTRACT date** off the CREB
  monthly series; **net/gross vs 15/25 — flagged, not failed (per AIC)**. Then **weighted (not
  averaged) reconciliation → a RANGE**.
- Acceptance: time adjustments reference contract dates and the CREB series; breaches appear
  as flags not rejections; output is a range with a weighted central point, never a bare
  number — and the point brackets the subject's own assessed value (±5% guard, ADR-010).

### 4 — Confidence + flags
- Surface: confidence **band broken into evidence-quality drivers** (count, recency, distance,
  spread, adjustment burden, widening depth); fired **human-review flags** with triggers; the
  per-field **provenance column** on the subject (what's real vs district-typical). It never
  decides — it builds the case and points the underwriter to exactly where to look.
- Acceptance: confidence is decomposed and traceable; each fired flag names its trigger.

### 5 — The memo
- Surface: the rendered **audit-ready memo**, exportable as a fileable PDF
  (`python -m kvcomp.serialize --pdf KV-1051`). Every queue row has one.
- Acceptance: the memo is self-contained and legible; numbers match the deterministic core
  exactly.

## Stage → artifact map
| Pipeline stage | Artifact | Step |
|---|---|---|
| inbox + triage | `window.QUEUE` (verdict per deal) | 1 |
| subject grounding | `Subject` (real Open Calgary parcel + provenance map) | 1 |
| retrieval + similarity | candidate set, `SimilarityScore` | 2 |
| tiered widening | `WideningStep` log + penalty | 2 |
| rejection codes | `RejectionRecord` | 2 |
| adjustment grid + time engine | `GridLine`, `AdjustedComp` | 3 |
| weighted reconciliation | `ValueRange` | 3 |
| evidence-quality confidence | `ConfidenceBreakdown` | 4 |
| flag engine | `Flag`s | 4 |
| memo render / PDF | `MemoArtifact` → HTML / PDF | 5 |
