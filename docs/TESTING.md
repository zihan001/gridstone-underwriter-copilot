# TESTING

Tests earn their keep or they don't get written. The single most important test is the **round-trip invariant** — the matched-pair proof. Write it FIRST (TDD): it forces the generator and grid into a single coherent design before any pipeline plumbing exists.

## 1. The round-trip invariant (write first, most important)
**Claim:** if the adjustment grid is the correct inverse of the generator's pricing function, then adjusting a set of synthetic comps back toward the subject must recover the subject's true (no-noise) value.

```
generate N comps with KNOWN attribute deltas from the subject, noise OFF
   → run them through the adjustment grid + time engine
   → assert every adjusted_value clusters in a TIGHT band around the
     generator's no-noise true subject price (within ε)
```
- With noise OFF, ε is near-zero (pure structural recovery) — this is the hard assertion.
- With noise ON, assert the *weighted reconciled point* lands within a calibrated tolerance of the true price, and the spread widens predictably.
- This test is the contract between `comp_generator.py` and `grid.py`. It fails loudly if either side drifts. It is the engineer-facing credibility artifact referenced in the README.

Boundary variants worth having: single-attribute deltas (vary only GLA, only baths, only basement, only age, only condition) — each isolates one grid line and proves that line recovers that generator coefficient. This is paired-sales analysis run in reverse on synthetic data.

## 2. Targeted unit tests (earn their keep)
- **Time engine math:** known contract date + known effective date against the encoded CREB series → exact expected % and dollar adjustment; contract-date (not close-date) anchoring; extrapolation path beyond the series.
- **Weighted reconciliation:** weighting de-emphasizes far/stale/heavily-adjusted comps; result is a RANGE; equal inputs reduce to the simple case; a dominant strong comp pulls the point toward it (but bounded — anchoring guard).
- **Each flag's trigger boundary:** for every flag in the catalog, one case just below threshold (no flag) and one just above (flag fires). Net 15% / gross 25% / line 10% / freshness window / min comp count / wide-spread / high-comp anchoring / deep widening / value-outside-range / unsupported-time-adj.
- **lender_profile behavior:** `fnma_off` emits net/gross as informational; `gse_on` raises severity. Same numbers, different flag treatment.
- **Sign convention:** superior comp → negative adjustment, inferior → positive (one assertion per direction).
- **Schema freeze:** `Subject`/`Comp`/`AdjustmentConfig` are frozen; mutation raises.
- **Assessed-value anchor (queue regression guard):** every inbox deal's reconciled point lands within ±5% of its subject's real assessed value × `ASSESSMENT_TO_MARKET` (`tests/test_inbox.py`; DECISIONS.md ADR-010 — observed gap is under ±3%, the guard trips the benchmark-collapse bug that ran it to −20%).

## 3. Explicitly NOT worth testing
- The render-only web viewer (navigation only; no logic).
- LLM prose output (non-deterministic; assert only that the seam passes computed numbers in and returns strings — never assert wording, never let a test depend on the model).
- HTML rendering beyond a smoke test that the memo template fills without error.
- Plumbing / glue / I/O wiring.
- Open Calgary fetch internals (mock the record; one integration smoke test that a real pull maps to a valid `Subject`).

## Test order (TDD)
1. round-trip invariant, noise OFF (drives generator + grid design)
2. single-attribute round-trips (each grid line)
3. time engine
4. round-trip with noise ON + weighted reconciliation
5. flag boundaries
6. lender_profile + sign convention + schema freeze
7. memo render smoke test
