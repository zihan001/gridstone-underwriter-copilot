# SCOPE

## Product in one line
A **defensibility copilot** for residential underwriting at KV Capital: it assembles, challenges, and documents a supportable sales-comparison case for a single Calgary detached home, and emits an **audit-ready comp memo** defending a value **RANGE** (never a point estimate).

It is not an AVM. It does not decide value. It builds the case and points the underwriter to exactly where judgment is required.

## Locked scope (in)
- **Subject type:** single-family DETACHED, City of Calgary, AB. Existing resale-style underwriting.
- **Pipeline:** structured intake → retrieve candidate comps → similarity scoring → tiered search-widening loop (logged rationale + per-tier confidence penalty) → rejected-comp reason codes → transparent adjustment grid (market-extracted-style, named practice) → weighted (not averaged) reconciliation to a value RANGE → confidence from EVIDENCE QUALITY → human-review flags.
- **Data:**
  - REAL public Calgary data for the SUBJECT (Open Calgary parcel assessments; permits as optional red-flag stretch).
  - SYNTHETIC, principled, clearly-labeled sold comps. Generator + adjustment grid are a **matched pair**.
- **Domain rules are FLAGS, not auto-fails.** Encode Fannie/Freddie review failure modes as flags only.
- **Architecture:** deterministic core does ALL math; LLM writes prose only.
- **UI:** thin, render-only memo viewer. Navigation only — no live re-running, no editable inputs.

## Explicit cuts (out) — stated loudly in README
| Cut | One-line WHY |
|---|---|
| Commercial borrowers | Different underwriting + comp universe; out of the residential slice. |
| New-construction / as-improved / builder-finance / progress-advance | A separate valuation discipline (cost approach, draws); would dilute the resale slice KV judges. |
| Condos / other property types | Different comp attributes (strata, floor, exposure); detached is the focused slice. |
| Learned/trained AVM | Black-box; contradicts the defensibility thesis and is unauditable. |
| Image / CV condition scoring | Needs labeled data + a model we can't defend in a memo; condition is an intake field. |
| Live MLS / CREB integration | Licensing + flaky deps; synthetic comps make the matched-pair test possible. |
| Generic chat UI | The product is a memo, not a chatbot; chat invites scope creep. |
| Auth / persistence / multi-user | Demo is single-run; not judged; pure plumbing. |

## Why this scope (the invited path, taken deliberately)

KV's brief invites "focus on residential," permits "any public dataset or synthesize your
own," and says it is testing how you scope down to something focused and shippable.
Residential + synthetic comps is that invited path:

- **Detached resale only** — condos need different comp logic (strata, floor, exposure);
  the classic over-general trap.
- **Synthetic comps** — no MLS/CREB license; a principled, matched-pair-tested generator is
  the defensible substitute, and the brief explicitly permits synthesizing data.
- **No learned AVM** — an unexplainable model is the opposite of a defensible value; the
  cut IS the thesis.
- **Residential over commercial** — sales-comparison is a deep, nameable, demonstrable
  discipline with real public data; a shallow income-approach toy would score worse on
  domain authenticity.

The engine itself is approach-agnostic: an explicit contributory model, weighted
reconciliation to a range, and advisory flags. For commercial income-approach collateral,
the contributory lines become cap-rate and NOI drivers (lease terms, vacancy, condition of
income), reconciliation weights stabilized-income comps instead of sales, and the same
reason-coded rejection and evidence-quality confidence carry over unchanged. That next ring
is understood — and deliberately deferred.

## Judging criteria → where addressed
| Criterion (KV) | Where in build | Evidence in demo/repo |
|---|---|---|
| **Domain understanding (TOP)** | `domain/` modules; named practices (paired-sales, sales-comparison grid, age-life, net/gross caps, weighted reconciliation, time-from-contract-date); `docs/DOMAIN.md` | Demo beats 0:20–2:10; DOMAIN.md source/confidence tags |
| **Judgment (focused > general)** | Locked scope + explicit cuts; rejection reason codes; flags-not-fails | README cuts section; rejected-comp panel (beat 0:20) |
| **Agent quality (reliability, latency, experience)** | Deterministic core, frozen pydantic schemas, single LLM provider, fast cold-start; render-only viewer | ARCHITECTURE.md latency strategy; the demo click-through |
| **Code clarity / structure / tests where they earn keep** | Module boundaries; round-trip invariant test first (TDD); targeted unit tests | TESTING.md; the matched-pair round-trip test |
