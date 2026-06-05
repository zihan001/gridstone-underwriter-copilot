# CLAUDE_CODE_KICKOFF

Paste this to Claude Code after the seed files are in place. It scaffolds the rest
against already-frozen contracts. **Do not modify** anything in `src/kvcomp/schemas/`,
`docs/`, or `viewer/` — those are frozen (the schemas, the spec, the locked UI). Build
only `data/`, `domain/`, `pipeline.py`, `narrative/`, `serialize/`, and `tests/`.

---

You are scaffolding a Python project whose contracts are already frozen. Read these
first, in order, and treat them as binding:

- `docs/SCOPE.md`, `docs/DOMAIN.md`, `docs/ARCHITECTURE.md` — what we build and why.
- `docs/DATA_CONTRACTS.md` + `src/kvcomp/schemas/*.py` — frozen input/result schemas.
- `docs/MEMO_CONTRACT.md` — the frozen `window.MEMO` output the locked `viewer/` reads.
- `docs/DECISIONS.md` — ADRs reconciling the specs with the delivered frontend. Honor them.
- `docs/USE_CASE.md`, `docs/TESTING.md`, `docs/BUILD_PLAN.md` — sample subject, test order, schedule.
- `viewer/data.js` — the GOLDEN OUTPUT FIXTURE (ADR-004). Your serializer must emit a
  `window.MEMO` of this exact shape for the sample South subject.

Core invariant (ARCHITECTURE): **the deterministic core does ALL math; the LLM writes
prose only.** `narrative/llm.py` imports nothing from `domain/` except read-only result
types and returns only strings; the pipeline must produce a fully valid `MemoArtifact`
with the LLM disabled (template fallback).

Build in this dependency order (BUILD_PLAN spine), TDD where TESTING.md says so:

1. `src/kvcomp/data/constants.py` — encode, as typed constants: the per-district CREB
   monthly benchmark series (South + city-wide at minimum; ADR-003), the district
   benchmark table, and the CREB typical-attributes table. Cross-check every number
   against `docs/research/Research_Report.md` and the South series in `viewer/data.js`.
2. `src/kvcomp/data/comp_generator.py` — matched-pair half 1. Price each synthetic Comp
   from an EXPLICIT contributory-value function using the SAME coefficients as
   `AdjustmentConfig` (gla=85, basement=35, …). Seeded RNG; record `true_price_no_noise`,
   `noise_factor`, `generator_seed`, `generator_version` in `CompProvenance`.
3. `tests/test_roundtrip.py` — WRITE FIRST, RED. Generate N comps with known deltas,
   noise OFF → run grid+time_engine → assert every adjusted_value clusters within ε of
   `true_price_no_noise`. Add single-attribute variants (vary only GLA, only baths, …).
4. `src/kvcomp/domain/grid.py` + `time_engine.py` — invert the generator; make round-trip
   GREEN. Grid rows ARE the Subject fields (schema-driven). Sign convention: superior
   comp → negative. Emit `GridLine`s in canonical order `gla,lot,bed,bath,bsmt,gar,age,
   cond,qual` + trailing `time`. Time = (bm[eff]/bm[contract]−1)×price off the
   district series, anchored on contract_date.
5. `src/kvcomp/domain/{retrieval,widening,rejection}.py` — similarity scoring; tiered
   widening with logged rationale + per-tier penalty; rejection reason codes (closed
   `ReasonCode` enum). Reproduce the tier structure and the five rejections in the fixture.
6. `src/kvcomp/domain/{reconcile,confidence,flags}.py` — weighted (NOT averaged) range;
   evidence-quality confidence with per-driver breakdown reconciling to `score − base`;
   full flag registry (fired + CLEAR) per ADR-002 two-tier model.
7. `src/kvcomp/data/subject_loader.py` — real Open Calgary assessment → `Subject`.
   Per-field provenance per `subject.py`: only OPEN_CALGARY_GROUNDED fields are grounded;
   physical fields default to district-typical (DISTRICT_DEFAULT) or inspection. One
   integration smoke test, mock the record otherwise (TESTING §3).
8. `src/kvcomp/pipeline.py` — wire `domain/` in dependency order → `MemoArtifact`.
9. `src/kvcomp/narrative/{llm.py,prompts.py}` — single batched Anthropic call,
   computed-artifact-in → six prose strings out; deterministic template fallback.
10. `src/kvcomp/serialize/memo_to_window.py` — `MemoArtifact` → `out/data.js` in the exact
    MEMO_CONTRACT shape, splicing the verbatim `usd0/sgn/pct/timeFactor` JS helpers around
    a `json.dumps`'d data object. Provide a CLI: `python -m kvcomp.serialize` writes
    `out/data.js`, then the run script copies it to `viewer/data.js`.
11. Remaining tests per TESTING.md order: time_engine, reconcile+noise-ON, flag
    boundaries (soft band AND hard tolerance edges), lender_profile, sign convention,
    schema-freeze, memo-render smoke, and `test_serialize_contract.py` (every
    MEMO_CONTRACT key present, types right, weights sum to 1, adjustedVals match, every
    flag/reason code resolves).

Tech: Python 3.11+, pydantic v2 frozen, pytest, ruff, stdlib+httpx core, Jinja2 only if
the memo HTML render needs it (the viewer is pre-built; serializer just emits data.js).
No DB, no auth, no web framework beyond `python -m http.server` for the viewer.

End state: `pytest` green; `python -m kvcomp.pipeline <subject>` → `MemoArtifact` →
`out/data.js` → `cp viewer/` → open `viewer/index.html` renders the generated memo.
Fill README "How to run" with the exact commands.
