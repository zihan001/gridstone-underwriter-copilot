# BUILD_PLAN

> **Historical document:** this is the ORIGINAL Jun-5 plan, kept as written;
> `docs/DECISIONS.md` (ADR-001…011) records where execution diverged from it.

Jun 5 → Jun 12, 2026 (due Fri Jun 12, 11:59 PM MST). Solo. Strict dependency order, demo beats built first, buffer built in. Permit-aware red-flag panel is an OPTIONAL stretch only if core lands with 2 days to spare — assessment grounding already banks the "real data" point, so permits earn no demo beat.

Principle: the matched pair (generator + grid + round-trip test) is built BEFORE the pipeline, TDD-style, so the invariant is enforced from the start.

---

### Day 0 — Thu/Fri Jun 5 — Contracts frozen
- **Goal:** freeze the data contracts and `AdjustmentConfig` so generator, grid, and tests share one schema.
- **Deliverable:** `src/schemas/` — `Subject`, `Comp`, `CompProvenance`, `AdjustmentConfig`, enums, result types — all pydantic `frozen=True`. CREB series + district benchmarks + typical-attributes table encoded as constants.
- **Done when:** schemas import cleanly; a frozen-mutation test passes; constants match the research report.

### Day 1 — Sat Jun 6 — Matched pair, part 1 (TDD)
- **Goal:** generator + round-trip test (noise OFF) before the grid is complete.
- **Deliverable:** `data/comp_generator.py` (prices comps from an explicit contributory-value function, seeded RNG, records `true_price_no_noise`); `tests/test_roundtrip.py` written first and RED.
- **Done when:** generator emits valid `Comp`s with provenance; round-trip test exists and fails for the right reason (no grid yet).

### Day 2 — Sun Jun 7 — Matched pair, part 2 (invariant GREEN)
- **Goal:** the adjustment grid + time engine that invert the generator.
- **Deliverable:** `domain/grid.py`, `domain/time_engine.py`; single-attribute round-trips + noise-OFF invariant GREEN; time-engine unit tests GREEN.
- **Done when:** noise-OFF adjusted values cluster within ε of true price; each single-attribute round-trip passes. **This is the credibility milestone.**

### Day 3 — Mon Jun 8 — Selection pipeline
- **Goal:** retrieval → similarity → tiered widening → rejection codes.
- **Deliverable:** `domain/retrieval.py`, `domain/widening.py`, `domain/rejection.py`; widening logs rationale + penalty; rejection reason codes as closed enum.
- **Done when:** for the sample subject, candidates retrieved, widening fires with logged steps, rejected comps carry codes; (Beat 2 data exists).

### Day 4 — Tue Jun 9 — Reconcile + confidence + flags + real data
- **Goal:** finish the deterministic core AND bank the real-data hook.
- **Deliverable:** `domain/reconcile.py` (weighted RANGE), `domain/confidence.py` (per-driver breakdown), `domain/flags.py` (full catalog); `data/subject_loader.py` pulling a REAL Open Calgary assessment → `Subject`. `pipeline.py` wires the core end-to-end → `MemoArtifact`. Flag-boundary + reconciliation + noise-ON tests GREEN.
- **Done when:** `pipeline.run(subject)` produces a complete `MemoArtifact` with range, confidence, flags; a real Open Calgary record loads as a valid Subject (Beat 1 data banked early).

### Day 5 — Wed Jun 10 — LLM prose seam + memo render
- **Goal:** prose seam and the demo surface.
- **Deliverable:** `narrative/llm.py` + `prompts.py` (single batched call; computed-artifact-in → prose-out; deterministic template fallback if disabled); `memo/render.py` (MemoArtifact → static HTML); `web/` render-only viewer with section navigation.
- **Done when:** memo renders end-to-end from a real subject; numbers match the core exactly; viewer navigates subject → comps/rejections → grid → reconciliation → confidence/flags → memo. Memo render smoke test GREEN.

### Day 6 — Thu Jun 11 — README + demo record + polish
- **Goal:** ship-ready repo + the ≤3-min demo.
- **Deliverable:** fill README (problem, approach, how-to-run, what's next, cuts stated loudly, matched-pair round-trip test called out as the engineer-facing credibility artifact); record demo against the USE_CASE.md storyboard; clean up.
- **Done when:** `git clone` → documented steps → pipeline + viewer run; demo video ≤3 min linked from README hits all five beats.

### Day 7 — Fri Jun 12 — Buffer / stretch / submit
- **Goal:** absorb slip; submit early.
- **Optional stretch (only if core solid):** permit-aware red-flag panel from Open Calgary building/development permits (open dev permit, recent major reno → effective-age/condition red flag). Otherwise a README "next steps" item.
- **Done when:** repo public, README + demo linked, submitted before 11:59 PM MST. **Do not start new scope today.**

---

## Dependency order (the spine)
contracts → generator → grid+time (invariant GREEN) → retrieval/widening/rejection → reconcile/confidence/flags + real subject → pipeline → LLM seam → memo render → viewer → README + demo.

Real Open Calgary grounding is pulled into Day 4 (not later) so the demo's 0:20 "real data" hook is banked before crunch.
