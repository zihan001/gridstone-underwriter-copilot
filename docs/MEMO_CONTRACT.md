# MEMO_CONTRACT

The frozen contract between the deterministic core (`serialize/memo_to_window.py`) and
the **locked, render-only viewer** (`viewer/`). The viewer is finished and authored by
hand; we do not change it. Instead the pipeline must emit a `window.MEMO` object with
**exactly** the keys and shapes below, so the existing JSX renders generated output
unchanged.

This is the downstream twin of `DATA_CONTRACTS.md`: that doc freezes the *input* schema
(Subject/Comp), this one freezes the *output* schema (the viewer payload). If either
drifts, the matched pair or the render breaks silently — hence both are frozen before
implementation.

> Source of truth: the field surface was extracted directly from the viewer JSX
> (`grep M.* / c.* / f.* / d.* / w.*`). Every key below is **read by the UI**. Adding keys
> is safe; removing or renaming any key here breaks a section render.

---

## Top-level `window.MEMO`

```
MEMO = {
  // formatting helpers — the viewer calls these; serializer must provide them.
  // Emit as the SAME JS helper functions data.js ships (copy verbatim); the Python
  // serializer writes the data object, the helpers stay in the data.js template.
  usd0(n) -> "$715,500"          // signed-off integer dollars, no decimals
  sgn(n)  -> "+$5,100" / "−$2,975"
  pct(n,d=1) -> "+1.6%" / "−2.41%"

  meta:           CaseMeta
  benchmark:      [{ m: "YYYY-MM", v: int }]      // monthly series, oldest→effective
  bm:             { "YYYY-MM": int }              // map form of benchmark (derived)
  marketContext:  MarketContext
  rates:          RateCard                        // the documented adjustment rate card
  thresholds:     Thresholds
  subject:        SubjectView
  selected:       [SelectedComp]                  // post-buildComp (computed lines+totals)
  rejected:       [RejectedComp]
  reasonCodes:    { CODE: "human description" }
  widening:       [WideningTier]
  searchSummary:  SearchSummary
  weights:        { compId: float }               // sums to 1.0
  weightDrivers:  { compId: { similarity, recency, distance, burden } }
  range:          ValueRange
  adjustedVals:   [int]                           // = selected.map(c => c.adjusted)
  confidence:     Confidence
  flags:          [Flag]
  aicNote:        string
  narrative:      Narrative
  agentTrace:     AgentTrace | absent              // OPTIONAL, render-only (see below)
  timeFactor(month) -> float                       // bm[eff]/bm[month] - 1  (helper)
}
```

`agentTrace` is **additive and optional**. It is present only when the run was fronted by the
intake agent (`narrative/orchestrator.run_with_agents`); a snapshot without it renders unchanged
(the viewer's Agent Trace section degrades to "no agent trace"). It carries NO number that feeds
underwriting — it is a read-only audit of tool calls + prose. (The post-pipeline sensitivity
agent was removed; the block now carries the `intake` half only.)

---

## Component shapes

### CaseMeta
```
{ caseId, snapshot (ISO8601 w/ tz), effectiveDate "YYYY-MM-DD",
  approach, analyst, purpose }
```

### MarketContext
```
{ southBenchmark: int, cityBenchmark: int, ppsf: int, series: str }
```
NB the viewer reads `marketContext.southBenchmark` AND `cityBenchmark`. Keep the
district benchmark under `southBenchmark` for the sample subject; if you generalize to
other districts, the key name stays `southBenchmark` (it's the *subject-district*
benchmark — the UI label is generic) OR add `districtBenchmark` and update the one JSX
read. Prefer keeping the existing key to avoid touching the locked viewer.

### RateCard  (the documented, fixed adjustment constants the grid USED)
```
{ gla: int($/sf), lot: int($/sf), bed: int, bathFull: int, bathHalf: int,
  basement: int($/sf), garage: int($/stall), age: int($/yr),
  condition: int($/C-step), quality: int($/Q-step) }
```
**These must equal the constants the core's grid actually applied.** The rate card is not
decoration — it's the audit trail. Serializer derives it from `AdjustmentConfig`, it is
not hand-typed. (See DECISIONS.md ADR-001: the calibrated defaults are gla=85, basement=35,
not the 474×0.45 prior.)

### Thresholds
```
{ net:15, gross:25, line:10,            // HARD tolerances (Fannie legacy / lender)
  netReview:8, grossReview:12, lineReview:5,  // SOFT review bands (see DECISIONS ADR-002)
  grossCap:25,                          // hard rejection cap on CANDIDATES (pre-select)
  staleDays:120,                        // soft recency watch (STALE_COMP fires)
  staleMaxDays:274 }                    // ~9mo tier-2 hard window (TOO_STALE rejects)
```

### SubjectView  (flattened, display-oriented projection of `Subject`)
```
{ real: bool, provenance: "source: open_calgary_assessment",
  roll, addr, addrNote, community, district, quadrant, landUse,
  assessedValue: int, assessmentRollYear: int, assessmentValDate "YYYY-MM-DD",
  ppsfAssessed: int, propertyType,
  gla:int, lot:int, beds:int, bathFull:int, bathHalf:int,
  basementSf:int, basementFinished:bool, walkout:bool,
  garageStalls:int, garageType, yearBuilt:int, effDate "YYYY-MM-DD",
  condition "C3", quality "Q3", age:int,
  attrs: [[label, value], ...] }     // display table; serializer builds from fields
```
`attrs` is the rendered key/value table — generate it from the typed fields, don't
hand-author. This is also where the per-field provenance map from `subject.py` surfaces
(extend `attrs` rows to carry a source tag if you want the provenance column on screen).

### SelectedComp  (this is the POST-`buildComp` shape the UI consumes)
The viewer's `data.js` runs `buildComp()` to compute `lines`(+time), `net`, `gross`,
`adjusted`, `netPct`, `grossPct`, `linePct`, `ppsf`, `tf`, `bmContract`, `timeAdj`.
**The Python core computes all of this** — do NOT replicate `buildComp` in JS. Emit the
fully-computed comp:
```
{ id, label, synthetic:true, mls, community, district, sameDistrict:bool,
  distanceKm:float, contractDate "YYYY-MM-DD", contractMonth "YYYY-MM",
  ageDays:int, price:int, gla:int, lot:int, beds:int,
  baths:"2F / 1H", basement:"600 sf fin", garage:"2 · att.",
  built:int, cond "C3", qual "Q3", tier:int, watch?:[FLAG_CODE],
  // --- computed by core (grid + time_engine) ---
  lines: [{ key, label, sub, adj:int }],   // canonical row order + trailing time line
  tf:float, bmContract:int, timeAdj:int,
  net:int, gross:int, adjusted:int,
  netPct:float, grossPct:float, linePct:float, ppsf:int }
```
Canonical `lines` key order (must match grid rows): `gla, lot, bed, bath, bsmt, gar, age,
cond, qual, time`. `sub` is the human-readable delta string ("1,485 sf (+35)").

### RejectedComp
```
{ id, label, synthetic:true, mls, code: REASON_CODE, community, district,
  contractDate, price:int, gla:int, ppsf:int,
  detail: "full prose reason", metricLabel, metricValue, cap }
```
`code` ∈ reasonCodes keys. `metricLabel/metricValue/cap` drive the "405 days ≤ 274 days"
style chip.

### WideningTier
```
{ tier:int, title, criteria: [[label, value]], rationale, found:int,
  note?:str, penalty:float }      // penalty is negative or 0
```

### SearchSummary
```
{ retrieved:int, selected:int, rejected:int, finalTier:int,
  wideningDepth:int, totalPenalty:float }
```

### ValueRange
```
{ low:int, point:int, high:int, spreadPct:float }
```

### Confidence
```
{ base:float, score:float, low:float, high:float, band: "MODERATE",
  drivers: [{ key, label, detail, contrib:float }] }   // contribs ≈ score - base
```

### Flag
```
{ code, status: "FIRED"|"CLEAR", severity: "review"|"info"|"tolerance",
  trigger: "human trigger condition", detail: "what happened / why retained" }
```
`severity` enum is richer than DOMAIN.md's catalog — see DECISIONS.md ADR-002.

### Narrative  (LLM prose — the ONLY block the LLM populates)
```
{ scope, selection, adjustment, reconciliation, confidence, limiting }
```
All six are plain strings. Template fallback fills them deterministically if the LLM is
disabled (ARCHITECTURE seam guarantee).

### AgentTrace  (OPTIONAL, render-only — the intake agent that fronts the pipeline)
```
{
  intake:      AgentBlock | null      // before the pipeline: listing text → grounded Subject
}
AgentBlock = {
  source: "llm" | "deterministic"     // which path produced it (no key → deterministic)
  reasoning: string                   // prose ONLY (intake grounding narrative)
  calls: [{ name: string, args: string, result: string }]   // ordered tool-call trace
}
```
Every value in a `calls[].result` originates in a read-only / core-routed tool, never in the
model. The block is rendered read-only (viewer section 07); it never feeds a number back into
the memo. Produced by `narrative/orchestrator.trace_to_window`. (The `sensitivity` key was
removed with the post-pipeline sensitivity agent.)

---

## Serialization rule

`viewer/index.html` loads `viewer/data.js` via an external `<script src="data.js">` (it was
converted from a self-contained file to an external load so regeneration is a single file
write — see the note below). `serialize/memo_to_window.py` takes a frozen `MemoArtifact`
and writes a `data.js` that defines `window.MEMO`:

```
window.MEMO = (function () {
  <verbatim usd0/sgn/pct/timeFactor helpers>
  const DATA = <json.dumps(memo_window_dict)>;
  // splice DATA fields onto the helper-bearing object
  return { usd0, sgn, pct, timeFactor, ...DATA };
})();
```

Run loop: `python -m kvcomp.serialize` writes `out/data.js`, then `cp out/data.js
viewer/data.js`, then open `viewer/index.html` (no build step, no server required —
matches ARCHITECTURE "renders without a running backend"; `python -m http.server` only if
the browser blocks `file://` script loads).

> **Viewer note (already done in this bundle):** `index.html` originally inlined both
> `window.MEMO` and the JSX. The inlined `window.MEMO` block was replaced with
> `<script src="data.js">` so the pipeline only ever rewrites `data.js`. The JSX section
> components remain inlined in `index.html` (they're static and never regenerated). Do not
> re-inline `data.js`.

## Contract test (TESTING.md add)
`test_serialize_contract.py`: assert the generated dict contains **every key listed
above** at the right nesting, types match, `weights` sum to 1.0, `adjustedVals ==
[c.adjusted for c in selected]`, every `flag.code` resolves, every `rejected.code` is in
`reasonCodes`, and `confidence.drivers` contribs reconcile to `score - base ± ε`. This is
the boundary test that keeps core and the locked viewer from drifting.
