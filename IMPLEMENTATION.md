# Implementation Summary

A map of the codebase for reviewers: what was built, how the pieces fit, and the
decisions worth knowing. For *what the product is* and *how to run it*, see the
[README](README.md); for the frozen specs it was built against, see [`docs/`](docs/).

**~2,300 LOC across 18 modules · 53 tests (51 pass, 2 intentional skips) · clean
dependency-ordered history.** Built with Claude Code against the frozen contracts; the
commit history mirrors the dependency spine (each commit is one scoped step, co-authored
and disclosed).

---

## 1. The central invariant

> **The deterministic Python core does ALL the math; the LLM writes prose only.**

`narrative/llm.py` imports nothing from `domain/` except read-only result types, receives a
fully-computed `MemoArtifact`, and returns six strings — it never produces a number that
enters the underwriting result. The memo is fully valid with the LLM **disabled**: prose
degrades to deterministic templates and every number is identical. Default behaviour (no
`ANTHROPIC_API_KEY`) is the template path. This is the architectural expression of the
defensibility thesis, enforced by module boundaries rather than convention.

---

## 2. The matched pair — why the synthetic comps are defensible

The generator and the grid are **one design artifact**, sharing a single contributory model:

- **`data/contributory.py`** — the single shared model of per-line market reaction
  (`gla=$85/sf`, `basement=$35/sf`, condition `$12k/step`, …). Both halves import it, so they
  cannot drift on coefficients or functional form. Sign convention: a comp *superior* on a
  line yields a *negative* adjustment (`contributory(subject) − contributory(comp)`).
- **`data/comp_generator.py`** (bakes) — prices each comp as
  `value_at_eff = subject_value − Σ line_adjustment`, then de-trends to the contract month
  off the CREB benchmark series. Records `true_price_no_noise`, `noise_factor`, seed, and
  `generator_version` in `CompProvenance`.
- **`domain/grid.py`** (recovers) — re-applies `+Σ line_adjustment` and the inverse time
  factor.

Because the de-trend (generator) and re-trend (grid) cancel algebraically, the grid recovers
the subject's no-noise value for *every* comp:

```
adjusted = sale_price + Σ line_adj + time_adj
         = (value_at_eff − Σ line_adj) + Σ line_adj      # time cancels the de-trend
         = subject_value
```

The delivered `tests/test_roundtrip.py` asserts this within ε = $1,500 (noise off),
including five single-attribute isolations — paired-sales analysis run in reverse on
synthetic data. It is *self-falsifying*: because the time engine, canonical row ordering,
and `×50` rounding sit between bake and recover, a passing test proves the whole pipeline is
sound, and it genuinely can fail (it caught two real bugs during the build — see §6).

---

## 3. Module map

| Layer | Module | Responsibility |
|---|---|---|
| **data** | `constants.py` | CREB South + city-wide monthly benchmark series, district benchmark table, district adjacency topology, CREB typical-attributes — cross-checked vs `docs/research/Research_Report.md` |
| | `contributory.py` | the shared per-line adjustment model (the matched pair's single source of truth) |
| | `comp_generator.py` | seeded synthetic comps priced from the model + `CompProvenance` |
| | `scenario.py` | curated 9-comp demo universe that deterministically exercises all 3 widening tiers and all 5 rejection reason codes |
| | `subject_loader.py` | real Open Calgary assessment → `Subject` with honest per-field provenance |
| **domain** | `time_engine.py` | contract-date-anchored CREB-series time adjustment (`bm[eff]/bm[contract]−1`, `×50` rounding, city fallback + unsupported flag) |
| | `grid.py` | the sales-comparison adjustment grid (recovering half) → `AdjustedComp` |
| | `retrieval.py` | similarity scoring (structural + distance + recency) + haversine |
| | `widening.py` | the tiered widening loop — the single place that decides who is SELECTED |
| | `rejection.py` | five closed-enum reason codes (stale, duplicate, gross-cap, MAD outlier, wrong-district) |
| | `reconcile.py` | weighted (not averaged) range from inverse evidence-cost; weights sum to 1 |
| | `confidence.py` | evidence-quality drivers that sum *exactly* to `score − base` |
| | `flags.py` | the full 14-flag registry (fired + clear) under the two-tier soft-review / hard-tolerance model |
| **seam** | `pipeline.py` | orchestrates the core in dependency order → `MemoArtifact` |
| | `narrative/prompts.py` | deterministic template prose + the single batched LLM prompt |
| | `narrative/llm.py` | one Anthropic call; falls back to the template on no-key / failure / malformed response |
| | `serialize/memo_to_window.py` | `MemoArtifact` → `out/data.js` in the exact `MEMO_CONTRACT` shape (optional render-only `agentTrace`) |
| **agents** (bracket the spine) | `narrative/agent.py` | generic Anthropic tool-use harness: `run_agent(system, tools, task)` → `(prose, trace)`; tool schemas derived from callables; no key → caller's deterministic fallback + empty trace |
| | `narrative/intake_agent.py` | **before** the pipeline — listing text → validated `Subject` via read-only tools (`lookup_open_calgary`, `parse_listing_field`, `district_typical`, `geocode`); Subject assembled from a ledger, never from model prose |
| | `narrative/sensitivity_agent.py` | **after** the pipeline — probes the finished memo with core-routed tools (`rerun_with_profile`, `rerun_widening`, `recompute_dropping_comp`), each re-invoking `pipeline.run` verbatim; prose note + trace |
| | `narrative/orchestrator.py` | the only place that wires the agents *around* the unchanged pipeline: `run_with_agents` (intake → run → sensitivity) + `trace_to_window` |

---

## 4. Pipeline flow (sample South subject)

```
Subject (real Open Calgary grounding, per-field provenance)
  → retrieve 9 candidates (similarity, distance, same-district)
  → tiered widening: tier 0 South ≤6mo → tier 1 adjacent districts → tier 2 date relax
        4 SELECTED (tiers 0,0,0,1) · 5 REJECTED (one per reason code)
  → adjustment grid + time engine (per-comp lines, net/gross/line %, time off CREB series)
  → weighted reconciliation → RANGE  $708,000 – $716,000 – $724,000
  → evidence-quality confidence  MODERATE 0.69  (6 named drivers, reconcile to score−base)
  → flag registry  14 flags (6 fired)
  → narrative (template default / LLM optional)
  → MemoArtifact → serialize → window.MEMO → locked viewer renders unchanged
```

Reconciled output lands within a whisker of the golden fixture's hand-authored
$708,000 / $715,500 / $723,500 — but every number here is computed by the matched-pair-tested
core (ADR-004: the core's numbers win and overwrite the fixture).

### Agents bracket the spine — they never run inside it

The pipeline above is **unchanged**. Two LLM agents were added *around* it, not in it:

```
BEFORE:   Subject  ─────────────────►  pipeline.run()  ─►  serialize
AFTER:    listing ─► intake agent ─► Subject ─► pipeline.run() ─► sensitivity agent ─► serialize
                     (grounding)          [UNCHANGED SPINE]        (robustness probe)
```

`narrative/orchestrator.run_with_agents` is the only wiring point. Both agents act solely
through tools that are **(a) read-only over already-computed data** (intake) or **(b)
re-invocations of the deterministic core that return its output verbatim** (sensitivity).
No agent authors a number: the intake `Subject` is assembled from a ledger of tool results,
and the sensitivity note only narrates core re-runs. `tests/test_agent_invariant.py` proves
it — the serialized payload with agents enabled is byte-identical to the disabled payload once
the additive, render-only `agentTrace` block is removed. Control flow is strict: intake runs
before `run()`, sensitivity strictly after; if either step would sit *upstream of a number in
the result*, that would break the round-trip invariant — so it does not.

---

## 5. Testing strategy

TDD around the round-trip invariant (delivered RED, driven GREEN before any pipeline
plumbing). 53 tests that earn their keep (`docs/TESTING.md`):

- **`test_roundtrip`** — the matched-pair invariant + single-attribute isolations (delivered).
- **`test_time_engine`** — exact CREB-series factor/dollars, contract-date (not close) anchoring, fallback + extrapolation flagged unsupported.
- **`test_reconcile`** — noise-ON weighted point near true price, weights sum to 1, strong comp out-weighs far/stale, output is a range.
- **`test_flags`** — full registry every run + each boundary fires above / clears below.
- **`test_lender_profile` · `test_sign_convention` · `test_schema_freeze`** (incl. the `Comp.provenance` regression).
- **`test_serialize_contract`** — the `MEMO_CONTRACT` boundary: every key/type, weights sum to 1, `adjustedVals` match `selected.adjusted`, every flag/reason code resolves, confidence drivers reconcile to `score − base`.
- **`test_subject_loader`** (mock + gated live smoke) · **`test_memo_render`** (end-to-end smoke; the seam passes numbers in, returns strings — never asserts wording).

End-to-end additionally verified by loading the generated `data.js` in the actual viewer
headlessly: zero render errors, all numbers trace to the core.

---

## 6. Notable decisions

- **One-line frozen-schema repair** (committed in isolation as `fix(schemas): …`). The seed
  `Subject` validator, inherited by `Comp`, ran `dict(self.provenance)` unconditionally —
  and pydantic v2's `dict(model)` flattens a `CompProvenance` into a plain dict, clobbering
  it and making the delivered `test_roundtrip.py` impossible to pass (it reads
  `comp.provenance.true_price_no_noise` by attribute). An `isinstance` guard scopes the
  backfill to `Subject`'s dict provenance; `Subject` behaviour is byte-identical.

- **Core wins over the fixture (ADR-004).** Two hand-authored fixture inconsistencies were
  corrected by the core: COMP-A's lot adjustment (a +108 sqft delta inside the no-adjustment
  band should be $0, not −$1,300) and COMP-C's quality (relabeled Q4 → Q2 so "materially
  superior" stays coherent with the sign convention, yielding the intended −$15,000).

- **Two real bugs the invariant + demo caught:** (1) a fallback-district benchmark mismatch
  where the generator anchored the effective month with `series[last]` while the grid
  *extrapolated* — fixed by resolving both through the same `time_engine` lookup; (2) MAD-based
  outlier detection was unstable on tiny samples (a legitimately larger, lower-PPSF comp read
  as an outlier) — fixed by requiring a minimum sample of 5.

---

## 7. Explicit non-goals (by design)

Commercial borrowers · new-construction / builder-finance · condos & other property types ·
learned/trained AVM · image/CV condition scoring · live MLS/CREB integration · generic chat
UI · auth / persistence / multi-user. A focused agent that works beats a general one that
doesn't; every non-CREB dollar magnitude is a labeled US/North-American proxy to be locally
calibrated.
