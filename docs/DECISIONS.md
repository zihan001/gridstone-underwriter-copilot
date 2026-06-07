# DECISIONS

Architecture decision records. These resolve the three places where the **delivered
frontend** (`viewer/`, authored by hand as a render-only snapshot) disagrees with the
pre-frontend spec docs (`DOMAIN.md`, `DATA_CONTRACTS.md`). In every case we reconcile
toward whichever artifact is more defensible to a KV appraisal reviewer, then make the
core match. Recorded so Claude Code (and the reviewer) sees the reasoning, not a silent
override.

---

## ADR-001 — GLA & basement adjustment rates: adopt the frontend's calibrated card

**Context.** `DATA_CONTRACTS.md` `AdjustmentConfig` derives the GLA rate from
`local_ppsf(474) × gla_contributory_fraction(0.45) ≈ $213/sf`. The delivered viewer's
rate card uses **$85/sf** GLA and **$35/sf** finished basement.

**Decision.** The core uses the **frontend's rate card as the default**: `gla=85`,
`lot=12`, `bed=4000`, `bathFull=6000`, `bathHalf=3500`, `basement=35`, `garage=7500`,
`age=700`, `condition=12000`, `quality=15000`.

**Why.** The Research Report's own evidence (Fannie LL-2015-02: median GLA adjustment
stays under ~$50/sf in 49 states) makes $213/sf indefensible as a *line* adjustment — it
double-counts features adjusted elsewhere. $85/sf is in the defensible band and brackets
the subject cleanly in the worked sample. The `474 × 0.45` figure was always labeled a
*prior to calibrate down*; this ADR records the calibration result.

**Consequence.** `AdjustmentConfig` keeps `local_ppsf` and `gla_contributory_fraction` as
**documented provenance fields** (the prior), but the effective rate is the explicit
`gla_adj_per_sqft` constant, not the derivation. The matched-pair generator must bake in
these same coefficients so the round-trip test recovers them.

---

## ADR-002 — Flags: adopt the frontend's two-tier (soft-review + hard-tolerance) model

**Context.** `DOMAIN.md` §5 + §8 specify hard thresholds (net15/gross25/line10) as flags,
plus a flag catalog. The viewer additionally encodes **soft review bands**
(net 8% / gross 12% / line 5%) *under* the hard tolerances, a richer `severity` enum
(`review` / `info` / `tolerance`), and extra flag codes:
`THIN_COMP_SET`, `NET_ADJ_BREACH`, `LINE_ADJ_BREACH`, `ADJACENT_DISTRICT_COMP`,
`OUTLIER_PRICE_INCLUDED`, plus `DEEP_WIDENING`, `STALE_COMP`, `EXCESSIVE_GROSS_ADJ`.

**Decision.** Adopt the frontend's model into `domain/flags.py` and `AdjustmentConfig`.
Thresholds become: hard `net/gross/line = 15/25/10`, soft `*Review = 8/12/5`, candidate
`grossCap = 25`, `staleDays = 120` (soft watch → `STALE_COMP`), `staleMaxDays = 274`
(hard → `TOO_STALE` rejection). Every flag carries `status` (FIRED|CLEAR) and `severity`.

**Why.** A soft review band that fires *before* the hard tolerance is exactly the AIC
"flag for narrative support, not a fail" posture the whole product argues for — it's more
domain-authentic than a single hard line, and the UI already renders it. Emitting CLEAR
flags (not just fired ones) is good audit practice: the memo shows what was checked and
passed.

**Consequence.** Update `DOMAIN.md` §8 flag catalog to this superset. `flags.py` emits the
full registry every run (fired + clear). Boundary tests (`TESTING.md` §2) cover both the
soft band and the hard tolerance edge for net/gross/line.

---

## ADR-003 — Time engine keys off a PER-DISTRICT CREB series

**Context.** `DOMAIN.md` §4 encodes the **city-wide** detached benchmark series. The
viewer uses a **South-district** series (smoother, lower: $690k→$721.6k Jun25→Jun26).
The sample subject is South; the city series would produce wrong time adjustments for it.

**Decision.** `data/constants.py` encodes CREB monthly benchmark series **per district**
(at minimum South for the sample; city-wide as fallback). `time_engine` selects the
series by the comp's district (or subject district for the market context), indexes by
contract month, and applies `(bm[eff] / bm[contract] − 1) × price`.

**Why.** District benchmarks differ ~2× across Calgary (West $1.005M vs East $489k per the
Research Report); a single city series misprices any non-median district. Per-district is
both more correct and trivially encodable from the CREB district table already in the
report.

**Consequence.** The `UNSUPPORTED_TIME_ADJ` flag also fires when a comp's district lacks an
encoded series (falls back to city, flagged). The South series in the sample's `data.js`
is the authoritative fixture for `test_time_engine.py`.

---

## ADR-004 — `data.js` is the golden output fixture

**Decision.** The delivered `viewer/data.js` is treated as the **golden snapshot** for the
sample South subject. The core's success criterion on that subject is to reproduce a
`window.MEMO` of the same shape with defensible numbers (not necessarily byte-identical —
the hand-authored numbers may not perfectly satisfy the grid arithmetic). Where the
core's computed number and the hand-authored number disagree, **the core's number wins**
and we overwrite the fixture, because the core is the matched-pair-tested source of truth.

**Why.** Gives `MemoArtifact` a concrete target shape (see MEMO_CONTRACT.md) and a
regression anchor, without letting hand-authored fiction override tested arithmetic.

## ADR-005 — The LLM gains tool use, but stays strictly read-only or core-routed

> **Superseded in part by ADR-006:** the post-pipeline **sensitivity** agent was later removed;
> intake remains. The read-only / core-routed principle below still holds for the intake agent.

**Decision.** The LLM was upgraded from a single prose-only call to genuine **tool use**, via
two agents that **bracket** the deterministic pipeline (`narrative/orchestrator.run_with_agents`):

- **Intake** (before `pipeline.run`): unstructured listing text → a validated `Subject`. Its
  tools are read-only / pure — `lookup_open_calgary`, `parse_listing_field`, `district_typical`,
  `geocode`. Each records its result into a ledger; the `Subject` is assembled from the **ledger**,
  never from the model's prose, so no model-authored number can enter it. A field absent from the
  listing falls back to `district_typical` (`DISTRICT_DEFAULT`) — never an estimate.
- **Sensitivity** (after `pipeline.run`): the finished `MemoArtifact` → a prose robustness note.
  Its tools — `rerun_with_profile`, `rerun_widening`, `recompute_dropping_comp` — each **re-invoke
  the deterministic core verbatim** with one knob changed and return the core's recomputed numbers,
  pre-differenced in Python. The agent only narrates.

The shared harness (`narrative/agent.py`) skips the loop and returns a deterministic fallback +
empty trace when `ANTHROPIC_API_KEY` is unset, mirroring `narrative/llm.py`. The pipeline is
**unchanged**; agents never run inside it.

**Why it does not violate the round-trip invariant.** The credibility artifact is that the grid
is a correct inverse of the generator and every number originates in the matched-pair-tested core.
The agents are upstream (intake) or downstream (sensitivity) of the valuation, never *between* a
number and the result. `tests/test_agent_invariant.py` asserts the serialized payload with agents
enabled is **byte-identical** to the disabled payload once the additive `agentTrace` block is
removed — enabling the agents can only add the trace, never move a number.

**The trace panel is NOT a reversal of the cut chat UI.** SCOPE cut an interactive chat/editable
viewer; that cut stands. The viewer remains **render-only**: the new section 07 "Agent Trace" is a
collapsed, read-only audit of tool calls + prose with zero interactivity — no inputs, no chat, no
recomputation in the browser. It *documents* the agents' reasoning; it does not let a user drive
them. A read-only audit trail is the opposite of an interactive surface, so the scope boundary
(deterministic core is authoritative; the browser computes nothing) is preserved, not relaxed.

## ADR-006 — Triage queue layer; remove the sensitivity agent; keep intake

**Decision.** Add a **triage queue** as the new top surface in front of the existing memo, and
**remove the post-pipeline sensitivity agent** (ADR-005). The per-property memo becomes the
drill-down reached by clicking a queue row.

- **Triage** (`domain/triage.py`) classifies a finished `MemoArtifact` green / yellow / red.
  It is a *classifier, not a valuation*: it reads ONLY the core's already-computed confidence
  band/score and fired flags (each with its existing severity + detail) and never originates a
  number. RED = band LOW or `VALUE_OUTSIDE_RANGE` / `THIN_COMP_SET` / `WIDE_UNADJUSTED_SPREAD`
  fired. YELLOW = band LIMITED, any other review-severity flag, or ≥2 tolerance breaches. GREEN
  otherwise. A **tolerance breach alone never forces RED** — the AIC stance (thresholds are
  commentary triggers, not fails); `tests/test_triage.py` locks it.
- **Queue** (`data/inbox.py` + `serialize/queue.py`): a demo inbox of deals, each run through the
  **same** `run()`/pipeline core and triaged, serialized to `window.QUEUE` (sorted RED → YELLOW →
  GREEN, then reviewFlagCount desc, then score asc) plus one per-deal `window.MEMO` snapshot via
  the **unchanged** `memo_to_window` serializer. The queue viewer is a top-level toggle in
  `index.html`, render-only — it computes nothing, consistent with ADR-005's render-only boundary.
- **Sensitivity removed.** An LLM choosing from a *fixed, deterministic* probe set added latency
  and unauditability with no decision quality — the probes are arithmetic a function already does.
  Its `agentTrace.sensitivity` block and the §07 sensitivity card are gone; `agentTrace` now
  carries the `intake` half only.

**Why intake stays.** Interpreting unstructured intake text is judgment a function can't encode —
the one place an LLM earns its seat. The math core stays **agent-free**: the LLM appears only at
intake (before the pipeline) and prose (from finished numbers). `tests/test_agent_invariant.py`
still asserts the serialized payload with intake enabled is byte-identical to the disabled payload
modulo the additive `agentTrace` block.
