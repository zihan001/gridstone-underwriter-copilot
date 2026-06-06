# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Environment & commands

Dependencies are managed with **`uv`** in an isolated project venv. **Never `pip install` into the base/system interpreter.**

```bash
uv venv --python 3.11 && uv pip install -e ".[dev]"   # one-time setup
uv run pytest -q                                       # full suite
uv run pytest tests/test_flags.py -q                   # one file
uv run pytest tests/test_roundtrip.py::test_roundtrip_noise_off_recovers_true_price  # one test
uv run ruff check src/kvcomp/data src/kvcomp/domain src/kvcomp/narrative src/kvcomp/serialize src/kvcomp/pipeline.py tests/
uv run python -m kvcomp.pipeline                        # run core → out/data.js
uv run python -m kvcomp.serialize                       # serialize only → out/data.js
./scripts/run.sh                                        # pipeline → out/data.js → cp viewer/ → serve :8000
```

Ruff note: scope lint to the dirs above. The frozen `src/kvcomp/schemas/` deliberately uses enum-style semicolons and `noqa` re-exports — do **not** "fix" them.

## Hard boundaries (frozen)

`src/kvcomp/schemas/`, `docs/`, and `viewer/` (except `viewer/data.js`) are **frozen contracts** — the matched pair and the locked viewer depend on a stable shape. Do not redesign them. The one deliberate exception already in place is a documented `isinstance` guard in `schemas/subject.py` that stops the inherited validator from clobbering `Comp.provenance`; **do not revert it** (without it the delivered round-trip test cannot pass). `viewer/data.js` is generated output — regenerate it, never hand-edit.

## The core invariant

**The deterministic Python core does ALL math; the LLM writes prose only.** `narrative/llm.py` imports nothing from `domain/` except read-only result types and returns only strings. The pipeline must produce a fully valid `MemoArtifact` with the LLM **disabled** (template fallback is the default; no API key needed). Don't let a number originate in the narrative layer.

## The matched pair (most important architecture)

The synthetic comp generator and the adjustment grid are **one design artifact** sharing a single model:

- `data/contributory.py` is the *single source* of per-line adjustment math. Both `data/comp_generator.py` (bakes prices) and `domain/grid.py` (recovers them) import it, so they can't drift.
- `tests/test_roundtrip.py` proves the grid is a correct inverse of the generator (noise off → recovers the subject's true value within ε). It is the credibility gate.

**Consequence:** if you change any adjustment coefficient or the contributory formula, the round-trip test guards correctness — but you must keep generator and grid reading the *same* model, and you must resolve benchmarks through `time_engine` on **both** sides (the de-trend and re-trend cancel only if they use the same series lookup). After any change to `contributory.py`, `grid.py`, `time_engine.py`, or the config, **regenerate `viewer/data.js`** (`uv run python -m kvcomp.pipeline && cp out/data.js viewer/data.js`).

## Output contract & the drift guard

The pipeline emits a `MemoArtifact`; `serialize/memo_to_window.py` turns it into a `window.MEMO` object with **exactly** the keys/shapes in `docs/MEMO_CONTRACT.md`, spliced into `serialize/data_js.template` (which carries the verbatim JS helpers). `tests/test_serialize_contract.py` is the boundary test that keeps the core and the locked viewer from drifting — run it after touching the serializer, the result types, or any flag/reason code. Per **ADR-004**, when the core's computed number disagrees with the hand-authored `viewer/data.js` fixture, the core wins and the fixture is overwritten.

## Pipeline dependency order

`pipeline.py` wires the core in this order (read it as the map):

```
subject_loader → scenario/comp_generator → retrieval → widening (+rejection) →
grid (+time_engine) → reconcile → confidence → flags → narrative → MemoArtifact → serialize
```

`domain/widening.py` is the single place that decides which comps are SELECTED; `domain/rejection.py` holds the five closed-enum reason codes; `domain/flags.py` emits the full 14-flag registry (fired + clear) every run under the two-tier soft-review / hard-tolerance model.

## Gotchas

- **Two comp tracks:** `comp_generator.generate_comps(...)` produces *random* comps for the round-trip test; `scenario.generate_universe(...)` is the *curated* 9-comp demo universe (exercises all 3 widening tiers + all 5 reason codes). Don't conflate them.
- **MAD outlier detection needs ≥5 samples** (`rejection.outliers`, `flags.py`) — below that it's unstable and false-positives a legitimately larger/lower-PPSF comp.
- **Confidence drivers must sum to `score − base`** exactly (the contract test asserts it). If you add a driver, the score follows from the contribs, not vice-versa.
- Non-CREB dollar magnitudes are labeled US/North-American **proxies** in `AdjustmentConfig`; the CREB series/benchmarks in `data/constants.py` are the only Alberta ground-truth numbers.

See `IMPLEMENTATION.md` for the full module map and `docs/DECISIONS.md` for the ADRs reconciling the specs with the delivered viewer.
