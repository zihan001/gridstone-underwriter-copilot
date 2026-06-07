# KV Capital — Comp Defensibility Copilot

> **Status: implemented.** Deterministic core, pipeline, narrative seam, serializer, and two LLM **tool-use agents that bracket the pipeline** (intake before, sensitivity after) are built and tested (`uv run pytest` → 86 passed); the locked viewer renders the generated memo plus a read-only agent-trace panel for the sample subject. See **How to run** below.

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

## Agents bracket the pipeline (tool use)
Two LLM agents wrap the **unchanged** core — they never run inside the valuation loop:

```
listing ─► intake agent ─► Subject ─► pipeline.run() ─► sensitivity agent ─► render
            (grounding)              [UNCHANGED SPINE]     (robustness probe)
```

- **Intake** turns a free-text listing into a validated `Subject` using read-only tools (Open-Calgary lookup, listing-field parse, CREB district-typical fallback, geocode). The `Subject` is assembled from a ledger of **tool** results, never from model prose; a field absent from the listing falls back to district-typical, never an estimate.
- **Sensitivity** stress-tests the finished memo with tools that **re-invoke the deterministic core verbatim** (alternate lender profile, forced wider search, leave-one-out) and reports the deltas.

No agent ever authors a number. `tests/test_agent_invariant.py` asserts the serialized payload with agents enabled is **byte-identical** to the disabled payload, modulo the additive, read-only `agentTrace` block. The viewer's new "Agent Trace" section renders that block — read-only, zero interactivity (it is **not** the cut chat UI).

## Data
- **Real** public Calgary data for the SUBJECT (Open Calgary parcel assessments).
- **Synthetic, principled, clearly-labeled** sold comps. The generator and the adjustment grid are a **matched pair**.

### Engineer-facing credibility artifact: the matched-pair round-trip test
Generate comps with known attribute deltas, run them through the grid, and assert the adjusted values recover the generator's no-noise true price. If the grid isn't a correct inverse of the generator, this test fails. It is paired-sales analysis run in reverse on synthetic data, and it is the proof that the domain logic is real. _(see docs/TESTING.md)_

## How to run
Python 3.11+ and [`uv`](https://docs.astral.sh/uv/) (deps are installed into an isolated `.venv`, never the base interpreter).

```bash
# 1. install (creates ./.venv and installs the package + dev tools)
uv venv --python 3.11
uv pip install -e ".[dev]"

# 2. run the test suite — the matched-pair round-trip is the credibility gate
uv run pytest -q

# 3. generate the memo for the sample subject and view it
uv run python -m kvcomp.pipeline      # pipeline → MemoArtifact → out/data.js
cp out/data.js viewer/data.js          # snapshot into the locked viewer
uv run python -m http.server 8000 -d viewer
#   → open http://localhost:8000/index.html

# …or do all of it in one shot:
./scripts/run.sh
```

The deterministic core runs with **no API key** — prose degrades to deterministic templates,
the intake/sensitivity agents fall back to a deterministic tool sequence (so the agent-trace
panel is still populated), and every number is identical. To enable genuine LLM tool use
(intake agent grounds the `Subject`, sensitivity agent probes the range, memo prose is
model-written — all prose only; no number ever enters the result), set `ANTHROPIC_API_KEY`
(see `.env.example`) before step 3. Step 3 runs `pipeline.main`, which brackets the pipeline
with both agents and writes the `agentTrace` block into `out/data.js` automatically.

**Optional:** the live Open Calgary integration smoke test is skipped by default; run it with
`KVCOMP_LIVE_OPENCALGARY=1 uv run pytest tests/test_subject_loader.py`.

### One note on the frozen schema
The delivered `tests/test_roundtrip.py` requires `comp.provenance.true_price_no_noise`
(attribute access), but the seed `Subject` validator inherited by `Comp` flattened that
`CompProvenance` model into a dict — making the companion test impossible to pass as shipped.
A single one-line `isinstance` guard in `schemas/subject.py` scopes the field-source backfill
to `Subject`'s dict provenance, leaving `Subject` behaviour byte-identical. It is the smallest
repair that makes the frozen contract self-consistent; see the comment at that line.

## What's next
- Permit-aware red-flag panel (Open Calgary building/development permits → effective-age / condition red flags). _(stretch)_
- Real paired-sales calibration to replace US/North-American proxy adjustment constants.
- Quarterly CREB re-benchmarking.

## Explicit cuts (NOT built — by design)
Commercial borrowers · new-construction / as-improved / builder-finance / progress-advance · condos & other property types · learned/trained AVM · image / CV condition scoring · live MLS/CREB integration · generic chat UI · auth / persistence / multi-user.

> The cut **chat UI** stays cut. The agents have tool use, but the viewer is still render-only: the "Agent Trace" section is a collapsed, read-only audit of tool calls + prose — no inputs, no chat, no in-browser recomputation. See `docs/DECISIONS.md` ADR-005 for why a read-only trace is not a reversal of that cut.

A **focused agent that works beats a general one that doesn't.** Every dollar adjustment magnitude not sourced from CREB is a **US/North-American proxy** to be locally calibrated — labeled as such throughout.

## Docs
`docs/SCOPE.md` · `docs/DOMAIN.md` · `docs/ARCHITECTURE.md` · `docs/DATA_CONTRACTS.md` · `docs/USE_CASE.md` · `docs/TESTING.md` · `docs/BUILD_PLAN.md` · `docs/DECISIONS.md` · `docs/MEMO_CONTRACT.md` · `docs/research/Research_Report.md`
