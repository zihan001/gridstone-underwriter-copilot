# ARCHITECTURE

## Core invariant
**The deterministic core does ALL math. The LLM writes prose only.** The LLM never produces a number that enters the underwriting result. It receives *computed* outputs and returns *text*. This is the architectural expression of the defensibility thesis and is enforced by module boundaries (the LLM module imports nothing from the math core except read-only result types).

## Module boundaries
```
src/
  schemas/          frozen pydantic models (Subject, Comp, AdjustmentConfig, grid/result types)
  data/
    open_calgary.py      the ONLY module that touches the network: fetches real detached
                         parcels (Socrata 4bsw-nn7w, curated comm_code→District map) into a
                         committed offline fixture (data/fixtures/) — run as a module to
                         (re)build the cache; everything else reads the fixture offline,
                         so a fresh clone never needs the network (hermetic repo)
    subject_loader.py    Open Calgary row (cached or live) → Subject with a per-field
                         provenance map (subject grounding)
    comp_generator.py    SYNTHETIC principled comps (one half of the matched pair)
  domain/                ← DETERMINISTIC CORE, no LLM, no I/O
    retrieval.py         candidate retrieval + similarity scoring
    widening.py          tiered search-widening loop (logged rationale, per-tier penalty)
    rejection.py         rejected-comp reason codes
    grid.py              sales-comparison adjustment grid (other half of the matched pair)
    time_engine.py       CREB monthly-series time adjustment from contract date
    reconcile.py         weighted reconciliation → value RANGE
    confidence.py        evidence-quality confidence breakdown
    flags.py             flag engine (catalog in DOMAIN.md)
  pipeline.py            orchestrates domain/ in dependency order → MemoArtifact (pure data)
  narrative/
    llm.py               single-provider client; computed-artifact-in → prose-out
    prompts.py           rejection rationale, memo narrative, exception summary templates
  memo/
    render.py            MemoArtifact (+ prose) → static HTML
  web/                   render-only viewer (serves the rendered memo; navigation only)
```

## The deterministic → LLM handoff (the seam)
```
pipeline.py  ──produces──▶  MemoArtifact   (frozen, all numbers final)
                                  │
                                  ▼
narrative/llm.py  ── reads MemoArtifact, returns ONLY strings ──▶  prose fields
                                  │
                                  ▼
memo/render.py  ── MemoArtifact + prose ──▶  static HTML  ──▶  web viewer
```
- LLM inputs: the *already-computed* rejection records, grid, range, confidence drivers, fired flags.
- LLM outputs: `rejection_rationale[str]`, `memo_narrative`, `exception_summary` — prose only.
- The pipeline runs and the memo is fully valid (numbers, flags, range) **even if the LLM is disabled** — prose degrades to deterministic templates. This guarantees reliability and bounds latency.

## Pipeline (dependency order)
```
intake (Subject, real Open Calgary)
   ▼
retrieve candidates (synthetic comps)
   ▼
similarity score ──▶ tiered widening loop ──(log rationale, += confidence penalty)
   ▼
rejection reason codes
   ▼
adjustment grid (line items)  ◀── AdjustmentConfig (proxies, editable)
   ▼
time engine (contract-date → CREB series)
   ▼
weighted reconciliation ──▶ value RANGE
   ▼
evidence-quality confidence (per-driver breakdown)
   ▼
flag engine (advisory)
   ▼
MemoArtifact ──▶ [LLM prose] ──▶ HTML memo ──▶ render-only viewer
```

## Latency strategy
- Deterministic core is pure Python over a small in-memory comp set — microseconds; no network.
- The only network hop is the single LLM call (batch all prose into **one** request: rejections + narrative + exceptions in a single structured prompt → single response). Memo is renderable before it returns (template fallback).
- Fast cold-start: minimal deps, no heavyweight ML libs, no DB. Synthetic comps generated in-process or from a small cached file.
- Determinism: fixed RNG seed in the generator so a given subject reproduces the same comp set and memo (reviewable, testable).

## Tech stack (one-line justifications)
| Choice | Why |
|---|---|
| **Python 3.11+** | domain logic + data; fast enough; reviewer-friendly |
| **pydantic v2 (frozen models)** | frozen schemas enforce the data contracts; validation at the boundary |
| **pytest** | round-trip invariant + targeted unit tests |
| **Single LLM provider (Anthropic)** | one client, one prompt path; no abstraction tax |
| **stdlib + httpx only for core** | minimal deps, fast cold-start, reviewable |
| **Jinja2 → static HTML** | the memo IS the artifact; renders without a running backend |
| **FastAPI + StaticFiles (or plain `python -m http.server`)** | lightest possible render-only viewer; navigation only, zero interactivity |
| **No DB / no auth / no state** | explicit cut; single-run demo |

The web layer must not balloon: it serves pre-rendered memo HTML and provides navigation between sections (subject → candidates/rejections → grid → reconciliation → confidence/flags → memo). Every click reveals more **reasoning**, not more features.
