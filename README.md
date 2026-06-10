# KV Capital — Underwriting Triage Copilot

> **Status: implemented.** Deterministic core, pipeline, narrative seam, serializer, a triage
> classifier, a queue of 12 real-parcel demo deals, and one LLM **intake agent that fronts the
> pipeline** are built and tested (`uv run pytest` → 113 passed, 2 skipped). The locked viewer
> opens on a triage queue and drills into the audit-ready memo for any deal. See **How to run**
> below.
>
> **Key decisions:** the reasoning trail — including everything that changed after the original
> plan — is in [`docs/DECISIONS.md`](docs/DECISIONS.md) (ADR-001…011).

## Problem
Deals don't arrive one at a time. Brokers, originators, and builders send them — by email, by
portal — and they **pile up**. For each one the lender has to independently value the
collateral; it can't take the submitted number on faith. The bottleneck isn't computing a
value, it's **defending** one across a whole stack, fast enough to keep up, with an audit
trail when a deal is questioned. A black-box AVM doesn't help: it returns a number nobody can
defend in review.

## What this is
A **triage copilot** for single-family **detached** homes in **Calgary, AB**. It values every
deal in the stack with a deterministic sales-comparison engine, ranks them **green / yellow /
red** so an underwriter looks only where judgment is actually needed, and backs each one with
an **audit-ready comp memo** defending a value **RANGE** — never a point decision. It never
decides value; it builds the case and tells the underwriter exactly where to look.

This models the **residential resale slice**. The same engine — grounded subject, sales grid,
flagged tolerances, weighted range, evidence-quality confidence — extends to KV's **commercial
deals**; that's the next cut, not a rewrite.

## The triage cut (green / yellow / red)
The queue is the new top surface; the per-deal memo is the drill-down. Triage is a
**classifier, not a valuation** — it reads the confidence band and fired flags the core
already computed and sorts deals by how much human attention they need (`domain/triage.py`):

- **RED** — the evidence can't defend a range yet: confidence band **LOW**, or any of
  `VALUE_OUTSIDE_RANGE` / `THIN_COMP_SET` / `WIDE_UNADJUSTED_SPREAD` fired.
- **YELLOW** — a human should look first: band **LIMITED** (the ≥0.45 tier), any other
  review-severity flag (stale comp, deep widening, heavy adjustment, outlier, unsupported time
  adj…), or **two or more** tolerance breaches.
- **GREEN** — band HIGH or MODERATE, no review flag, at most one tolerance breach. File it.

**Why a tolerance breach never forces red.** Lender net/gross/line tolerances (15% / 25% / 10%)
are **commentary triggers, not fails** — the AIC stance the product is built on: a breach asks
for narrative support, it doesn't invalidate an otherwise well-supported comp (Fannie retired
the 15/25 auto-fail in 2014). So a single breach on an otherwise-clean memo stays green;
internal consistency, not threshold-thumping, is the point. A test locks this.

## Approach (named appraisal practice)
- **Sales-comparison grid** with adjustments as fractions of **contributory value** (not full
  price-per-sqft).
- **Time / market-conditions adjustment** from each comp's **contract date** off the actual
  **CREB detached benchmark monthly series**.
- **Tiered search-widening** with logged rationale + per-tier confidence penalty; **rejected
  comps carry reason codes** — the appraiser move a black box can't make.
- **Net / gross / line tolerances treated as FLAGS requiring commentary, not auto-fails** (the
  AIC stance above).
- **Weighted (not averaged) reconciliation** to a value RANGE.
- **Confidence from evidence quality** — comp count, recency, distance, adjusted-value spread,
  adjustment burden, widening depth — decomposed and traceable.

## Architecture (one line)
A **deterministic core does ALL the math**; the **LLM only writes prose** (rejection rationale,
memo narrative) and **interprets unstructured intake**. The memo is fully valid even if the LLM
is disabled.

## Where the agents are — and aren't
The math core is intentionally **agent-free** — auditability requires it. The LLM appears in
**exactly two places**: interpreting **unstructured intake** (judgment a function can't encode)
and **writing prose** from finished numbers. An agent anywhere else would add latency and
unauditability for no decision quality.

```
listing ─► intake agent ─► Subject ─► pipeline.run() ─► triage ─► queue / memo / PDF
            (grounding)              [UNCHANGED SPINE]   (classify)
```

- **Intake** turns a free-text listing into a validated `Subject` using read-only tools
  (Open-Calgary lookup, listing-field parse, CREB district-typical fallback, geocode). The
  `Subject` is assembled from a ledger of **tool** results, never from model prose; a field
  absent from the listing falls back to district-typical, **never an estimate**. See it live:
  `python -m kvcomp.serialize --intake` prints blurb-in → Subject-out with per-field provenance.
- The post-pipeline **sensitivity agent was removed**. An LLM choosing from a fixed probe set
  added latency and unauditability with no decision quality — the probe set is deterministic,
  so the model was doing arithmetic a function already does. Intake is the one agent that earns
  its place.

No agent ever authors a number. `tests/test_agent_invariant.py` asserts the serialized payload
with intake enabled is **byte-identical** to the disabled payload, modulo the additive,
read-only `agentTrace` block the viewer renders.

## Data — what is real, exactly
Subject identity, assessed value, and lot size are grounded in real Open Calgary records
(every queue deal is a real parcel — look up its roll number); above-grade physical
attributes (GLA, beds, baths, condition) are an inspection step, defaulted here to CREB
district-typical values and labeled as such; comps are synthetic and labeled.

- The real parcels are fetched once (`data/open_calgary.py`, the only module that touches
  the network) into a committed offline fixture, so a fresh clone runs hermetically. Each
  subject carries a **per-field provenance map** (`FieldSource`) that the memo renders —
  the honesty is enforced in code, not just claimed here.
- The **synthetic, principled, clearly-labeled** sold comps and the adjustment grid are a
  **matched pair**.

### Engineer-facing credibility artifact: the matched-pair round-trip test
Generate comps with known attribute deltas, run them through the grid, and assert the adjusted
values recover the generator's no-noise true price. If the grid isn't a correct inverse of the
generator, this test fails. It is paired-sales analysis run in reverse on synthetic data, and
it is the proof that the domain logic is real. _(see docs/TESTING.md)_

## How to run
Python 3.11+ and [`uv`](https://docs.astral.sh/uv/) (deps are installed into an isolated
`.venv`, never the base interpreter).

```bash
# 1. install (creates ./.venv and installs the package + dev tools)
uv venv --python 3.11
uv pip install -e ".[dev]"

# 2. run the test suite — the matched-pair round-trip is the credibility gate
uv run pytest -q

# 3. build the triage queue + per-deal memo snapshots, then view the stack
uv run python -m kvcomp.pipeline                          # hero memo → out/data.js
cp out/data.js viewer/data.js
./scripts/build_snapshots.sh                              # data.{south,east,west}.js + queue.js + queue/<id>.js
uv run python -m http.server 8000 -d viewer
#   → open http://localhost:8000/index.html  (opens on the queue; click a row to drill in)
```

Other entry points:

```bash
python -m kvcomp.serialize --queue --out viewer/queue.js     # rebuild the queue snapshot
python -m kvcomp.serialize --intake --deal KV-1042           # live intake beat (blurb → Subject + provenance)
python -m kvcomp.serialize --pdf KV-1042 --out out/KV-1042.pdf   # fileable PDF for a deal
```

The deterministic core runs with **no API key** — prose degrades to deterministic templates,
the intake agent falls back to a deterministic tool sequence (so the agent-trace panel is still
populated), and every number is identical. To enable genuine LLM tool use (intake agent grounds
the `Subject`, memo prose is model-written — all prose only; no number ever enters the result),
set `ANTHROPIC_API_KEY` (see `.env.example`) before step 3.

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
- **Live email / portal ingestion** as a thin adapter over the same intake step — the inbox
  becomes real deals instead of demo ones; nothing downstream changes.
- **Commercial-deal extension** — the same grounded-subject → graded-evidence → defended-range
  engine over KV's commercial collateral.
- **Real paired-sales calibration** to replace the US/North-American proxy adjustment constants,
  plus quarterly CREB re-benchmarking.

## Explicit cuts (NOT built — by design)
Commercial borrowers (next, not now) · new-construction / as-improved / builder-finance /
progress-advance · condos & other property types · learned/trained AVM · image / CV condition
scoring · live MLS/CREB integration · generic chat UI · auth / persistence / multi-user.

> The cut **chat UI** stays cut. The viewer is render-only: the queue and the "Agent Trace"
> section are read-only audits — no inputs, no chat, no in-browser recomputation. See
> `docs/DECISIONS.md` ADR-005 for why a read-only trace is not a reversal of that cut.

A **focused agent that works beats a general one that doesn't.** Every dollar adjustment
magnitude not sourced from CREB is a **US/North-American proxy** to be locally calibrated —
labeled as such throughout.

## Docs
`docs/SCOPE.md` · `docs/DOMAIN.md` · `docs/ARCHITECTURE.md` · `docs/DATA_CONTRACTS.md` ·
`docs/USE_CASE.md` · `docs/TESTING.md` · `docs/BUILD_PLAN.md` · `docs/DECISIONS.md` ·
`docs/MEMO_CONTRACT.md` · `docs/research/Research_Report.md`
