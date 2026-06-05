/* ============================================================================
   Comp Memo Viewer — static, pre-computed snapshot data
   Residential underwriting defensibility copilot · sales-comparison approach
   Subject: single-family detached, South district, Calgary AB
   Effective date 2026-06-01 · render-only artifact (no live computation)
   ========================================================================== */
window.MEMO = (function () {
  // --- formatting helpers ----------------------------------------------------
  const usd0 = (n) =>
    (n < 0 ? "-" : "") + "$" + Math.abs(Math.round(n)).toLocaleString("en-US");
  const sgn = (n) =>
    (n > 0 ? "+" : n < 0 ? "\u2212" : "") +
    "$" +
    Math.abs(Math.round(n)).toLocaleString("en-US");
  const pct = (n, d = 1) =>
    (n > 0 ? "+" : n < 0 ? "\u2212" : "") + Math.abs(n).toFixed(d) + "%";

  // --- case header -----------------------------------------------------------
  const meta = {
    caseId: "KV-CMP-2026-0614",
    snapshot: "2026-06-01T00:00:00-06:00",
    effectiveDate: "2026-06-01",
    approach: "Sales Comparison Approach",
    analyst: "model:underwrite-copilot v0.9.2",
    purpose: "Defend a value RANGE for collateral review \u2014 never a point decision.",
  };

  // --- CREB South-district detached benchmark, monthly ($) -------------------
  const benchmark = [
    { m: "2025-06", v: 690000 },
    { m: "2025-07", v: 694000 },
    { m: "2025-08", v: 697500 },
    { m: "2025-09", v: 700000 },
    { m: "2025-10", v: 703000 },
    { m: "2025-11", v: 705500 },
    { m: "2025-12", v: 707200 },
    { m: "2026-01", v: 709000 },
    { m: "2026-02", v: 712000 },
    { m: "2026-03", v: 715000 },
    { m: "2026-04", v: 718000 },
    { m: "2026-05", v: 720500 },
    { m: "2026-06", v: 721600 }, // effective month
  ];
  const bm = Object.fromEntries(benchmark.map((b) => [b.m, b.v]));
  const BM_EFF = bm["2026-06"];

  const marketContext = {
    southBenchmark: 721600,
    cityBenchmark: 747800,
    ppsf: 474,
    series: "CREB \u00b7 Detached \u00b7 South District \u00b7 monthly benchmark",
  };

  // --- adjustment rate card (documented, fixed) ------------------------------
  const rates = {
    gla: 85, // $/sf above-grade
    lot: 12, // $/sf site
    bed: 4000,
    bathFull: 6000,
    bathHalf: 3500,
    basement: 35, // $/sf finished
    garage: 7500, // $/stall
    age: 700, // $/yr effective-age delta
    condition: 12000, // $/C-step
    quality: 15000, // $/Q-step
  };

  // --- thresholds ------------------------------------------------------------
  const thresholds = {
    net: 15, // % hard tolerance (Fannie/lender)
    gross: 25, // % hard tolerance
    line: 10, // % single-line hard tolerance
    netReview: 8, // % soft review band
    grossReview: 12, // % soft review band
    lineReview: 5, // % soft review band
    grossCap: 25, // hard rejection cap on candidates
    staleDays: 120, // soft recency watch
    staleMaxDays: 274, // ~9mo tier-2 hard window
  };

  // --- SUBJECT (grounded: open_calgary_assessment) ---------------------------
  const subject = {
    real: true,
    provenance: "source: open_calgary_assessment",
    roll: "074\u00b721\u00b7335\u00b707",
    addr: "84xx Bonaventure Drive SE",
    addrNote: "civic address partially masked for review packet",
    community: "Lake Bonavista",
    district: "South",
    quadrant: "SE",
    landUse: "R-C1 \u00b7 Residential Contextual One Dwelling",
    assessedValue: 687500,
    assessmentRollYear: 2026,
    assessmentValDate: "2025-07-01",
    ppsfAssessed: Math.round(687500 / 1450),
    propertyType: "Single-family detached",
    gla: 1450,
    lot: 5242,
    beds: 3,
    bathFull: 2,
    bathHalf: 1,
    basementSf: 600,
    basementFinished: true,
    walkout: false,
    garageStalls: 2,
    garageType: "attached",
    yearBuilt: 1984,
    effDate: "2026-06-01",
    condition: "C3",
    quality: "Q3",
    age: 2026 - 1984,
    attrs: [
      ["Property type", "Single-family detached"],
      ["Above-grade GLA", "1,450 sf"],
      ["Site / lot", "5,242 sf"],
      ["Bedrooms", "3"],
      ["Bathrooms", "2 full / 1 half"],
      ["Basement", "600 sf finished \u00b7 no walkout"],
      ["Garage", "2-stall \u00b7 attached"],
      ["Year built", "1984 (42 yr)"],
      ["Condition rating", "C3"],
      ["Quality rating", "Q3"],
      ["Land use", "R-C1"],
      ["Effective date", "2026-06-01"],
    ],
  };

  // time-adjustment factor from a contract month to effective month
  const timeFactor = (month) => BM_EFF / bm[month] - 1;

  // --- SELECTED COMPS --------------------------------------------------------
  // adj sign convention: adjustment applied TO the comp to equal subject.
  // superior comp (more/better) -> negative adjustment.
  function buildComp(c) {
    const tf = timeFactor(c.contractMonth);
    const timeAdj = Math.round((c.price * tf) / 50) * 50;
    // assemble line items in canonical row order
    const lines = c.lineDefs.map((l) => ({ key: l.key, label: l.label, sub: l.sub, adj: l.adj }));
    lines.push({
      key: "time",
      label: "Time / market cond.",
      sub: c.contractDate + " \u2192 2026-06-01",
      adj: timeAdj,
    });
    const net = lines.reduce((s, l) => s + l.adj, 0);
    const gross = lines.reduce((s, l) => s + Math.abs(l.adj), 0);
    const adjusted = c.price + net;
    const netPct = (net / c.price) * 100;
    const grossPct = (gross / c.price) * 100;
    const maxLine = Math.max(...lines.map((l) => Math.abs(l.adj)));
    const linePct = (maxLine / c.price) * 100;
    return {
      ...c,
      tf,
      bmContract: bm[c.contractMonth],
      timeAdj,
      lines,
      net,
      gross,
      adjusted,
      netPct,
      grossPct,
      linePct,
      ppsf: Math.round(c.price / c.gla),
    };
  }

  const selectedRaw = [
    {
      id: "C-A",
      label: "COMP-A",
      synthetic: true,
      mls: "C-2208",
      community: "Lake Bonavista",
      district: "South",
      sameDistrict: true,
      distanceKm: 0.7,
      contractDate: "2026-04-11",
      contractMonth: "2026-04",
      ageDays: 51,
      price: 712000,
      gla: 1485,
      lot: 5350,
      beds: 3,
      baths: "2F / 1H",
      basement: "600 sf fin",
      garage: "2 \u00b7 att.",
      built: 1985,
      cond: "C3",
      qual: "Q3",
      tier: 0,
      lineDefs: [
        { key: "gla", label: "Above-grade GLA", sub: "1,485 sf (+35)", adj: -2975 },
        { key: "lot", label: "Site / lot", sub: "5,350 sf (+108)", adj: -1300 },
        { key: "bed", label: "Bedrooms", sub: "3 (=)", adj: 0 },
        { key: "bath", label: "Bathrooms", sub: "2F / 1H (=)", adj: 0 },
        { key: "bsmt", label: "Basement", sub: "600 sf fin (=)", adj: 0 },
        { key: "gar", label: "Garage", sub: "2 att. (=)", adj: 0 },
        { key: "age", label: "Age / eff-age", sub: "1985 (+1 yr)", adj: -700 },
        { key: "cond", label: "Condition", sub: "C3 (=)", adj: 0 },
        { key: "qual", label: "Quality", sub: "Q3 (=)", adj: 0 },
      ],
    },
    {
      id: "C-B",
      label: "COMP-B",
      synthetic: true,
      mls: "C-2156",
      community: "Lake Bonavista",
      district: "South",
      sameDistrict: true,
      distanceKm: 1.1,
      contractDate: "2026-02-19",
      contractMonth: "2026-02",
      ageDays: 102,
      price: 691000,
      gla: 1390,
      lot: 5050,
      beds: 3,
      baths: "2F / 0H",
      basement: "540 sf fin",
      garage: "2 \u00b7 att.",
      built: 1981,
      cond: "C3",
      qual: "Q3",
      tier: 0,
      lineDefs: [
        { key: "gla", label: "Above-grade GLA", sub: "1,390 sf (\u221260)", adj: 5100 },
        { key: "lot", label: "Site / lot", sub: "5,050 sf (\u2212192)", adj: 2300 },
        { key: "bed", label: "Bedrooms", sub: "3 (=)", adj: 0 },
        { key: "bath", label: "Bathrooms", sub: "2F / 0H (\u22121 half)", adj: 3500 },
        { key: "bsmt", label: "Basement", sub: "540 sf fin (\u221260)", adj: 2100 },
        { key: "gar", label: "Garage", sub: "2 att. (=)", adj: 0 },
        { key: "age", label: "Age / eff-age", sub: "1981 (\u22123 yr)", adj: 2100 },
        { key: "cond", label: "Condition", sub: "C3 (=)", adj: 0 },
        { key: "qual", label: "Quality", sub: "Q3 (=)", adj: 0 },
      ],
    },
    {
      id: "C-C",
      label: "COMP-C",
      synthetic: true,
      mls: "C-2241",
      community: "Lake Bonavista",
      district: "South",
      sameDistrict: true,
      distanceKm: 1.9,
      contractDate: "2026-03-06",
      contractMonth: "2026-03",
      ageDays: 87,
      price: 818000,
      gla: 1820,
      lot: 7100,
      beds: 4,
      baths: "3F / 0H",
      basement: "820 sf fin",
      garage: "2 \u00b7 att.",
      built: 1996,
      cond: "C2",
      qual: "Q4",
      tier: 0,
      watch: ["EXCESSIVE_GROSS_ADJ"],
      lineDefs: [
        { key: "gla", label: "Above-grade GLA", sub: "1,820 sf (+370)", adj: -31450 },
        { key: "lot", label: "Site / lot", sub: "7,100 sf (+1,858)", adj: -22300 },
        { key: "bed", label: "Bedrooms", sub: "4 (+1)", adj: -4000 },
        { key: "bath", label: "Bathrooms", sub: "3F / 0H (net superior)", adj: -2500 },
        { key: "bsmt", label: "Basement", sub: "820 sf fin (+220)", adj: -7700 },
        { key: "gar", label: "Garage", sub: "2 att. (=)", adj: 0 },
        { key: "age", label: "Age / eff-age", sub: "1996 (+12 yr)", adj: -8400 },
        { key: "cond", label: "Condition", sub: "C2 (+1 step)", adj: -12000 },
        { key: "qual", label: "Quality", sub: "Q4 (+1 step)", adj: -15000 },
      ],
    },
    {
      id: "C-D",
      label: "COMP-D",
      synthetic: true,
      mls: "C-2089",
      community: "Willow Park",
      district: "South \u00b7 adjacent",
      sameDistrict: false,
      distanceKm: 3.1,
      contractDate: "2026-01-08",
      contractMonth: "2026-01",
      ageDays: 144,
      price: 704000,
      gla: 1430,
      lot: 5150,
      beds: 3,
      baths: "2F / 1H",
      basement: "620 sf fin",
      garage: "2 \u00b7 att.",
      built: 1983,
      cond: "C3",
      qual: "Q3",
      tier: 1,
      watch: ["STALE_COMP", "ADJACENT_DISTRICT_COMP"],
      lineDefs: [
        { key: "gla", label: "Above-grade GLA", sub: "1,430 sf (\u221220)", adj: 1700 },
        { key: "lot", label: "Site / lot", sub: "5,150 sf (\u221292)", adj: 1100 },
        { key: "bed", label: "Bedrooms", sub: "3 (=)", adj: 0 },
        { key: "bath", label: "Bathrooms", sub: "2F / 1H (=)", adj: 0 },
        { key: "bsmt", label: "Basement", sub: "620 sf fin (+20)", adj: -700 },
        { key: "gar", label: "Garage", sub: "2 att. (=)", adj: 0 },
        { key: "age", label: "Age / eff-age", sub: "1983 (\u22121 yr)", adj: 700 },
        { key: "cond", label: "Condition", sub: "C3 (=)", adj: 0 },
        { key: "qual", label: "Quality", sub: "Q3 (=)", adj: 0 },
      ],
    },
  ];

  const selected = selectedRaw.map(buildComp);

  // --- REJECTED COMPS (reason codes) -----------------------------------------
  const reasonCodes = {
    TOO_STALE: "Outside maximum contract-date window even after widening.",
    WRONG_DISTRICT_AFTER_WIDENING: "Not adjacent to subject district per topology map.",
    GROSS_ADJ_TOO_HIGH: "Cumulative gross adjustment exceeds 25% hard cap.",
    OUTLIER_PRICE: "Price-per-sf is a statistical outlier vs candidate set.",
    DUPLICATE: "Resolves to a parcel already represented in the set.",
  };

  const rejected = [
    {
      id: "C-E",
      label: "COMP-E",
      synthetic: true,
      mls: "C-1804",
      code: "TOO_STALE",
      community: "Lake Bonavista",
      district: "South",
      contractDate: "2025-04-22",
      price: 651000,
      gla: 1460,
      ppsf: Math.round(651000 / 1460),
      detail:
        "Contract 2025-04-22 is 405 days stale \u2014 exceeds tier-2 maximum window (\u2264 274 days / 9 mo). Pre-dates the current benchmark trend and would require an unreliable 4.5% time adjustment.",
      metricLabel: "contract age",
      metricValue: "405 days",
      cap: "\u2264 274 days",
    },
    {
      id: "C-F",
      label: "COMP-F",
      synthetic: true,
      mls: "C-2233",
      code: "GROSS_ADJ_TOO_HIGH",
      community: "Lake Bonavista",
      district: "South",
      contractDate: "2026-03-29",
      price: 905000,
      gla: 2210,
      ppsf: Math.round(905000 / 2210),
      detail:
        "Cumulative gross adjustment 27.4% (2,210 sf GLA, 9,800 sf lot, 5 beds, finished walkout basement, Q5 quality) exceeds the 25% hard cap. Too dissimilar to bracket the subject \u2014 not comparable.",
      metricLabel: "gross adjustment",
      metricValue: "27.4%",
      cap: "\u2264 25.0%",
    },
    {
      id: "C-G",
      label: "COMP-G",
      synthetic: true,
      mls: "C-2170",
      code: "WRONG_DISTRICT_AFTER_WIDENING",
      community: "Glamorgan",
      district: "West",
      contractDate: "2026-02-14",
      price: 689000,
      gla: 1505,
      ppsf: Math.round(689000 / 1505),
      detail:
        "West district is not adjacent to South under the tier-1 topology map (no shared boundary; separated by the Glenmore corridor). Excluded before adjustment to avoid a cross-market location bridge.",
      metricLabel: "district",
      metricValue: "West (non-adj.)",
      cap: "South \u00b1 adjacent",
    },
    {
      id: "C-H",
      label: "COMP-H",
      synthetic: true,
      mls: "C-2195",
      code: "OUTLIER_PRICE",
      community: "Lake Bonavista",
      district: "South",
      contractDate: "2026-03-12",
      price: 596000,
      gla: 1470,
      ppsf: Math.round(596000 / 1470),
      detail:
        "PPSF $405 sits 2.4 MAD below the candidate median ($478). Title note indicates an estate / non-arm\u2019s-length transfer \u2014 excluded as a probable distressed sale rather than market evidence.",
      metricLabel: "PPSF deviation",
      metricValue: "2.4 MAD low",
      cap: "\u2264 2.0 MAD",
    },
    {
      id: "C-I",
      label: "COMP-I",
      synthetic: true,
      mls: "C-7741",
      code: "DUPLICATE",
      community: "Lake Bonavista",
      district: "South",
      contractDate: "2026-04-11",
      price: 712000,
      gla: 1485,
      ppsf: Math.round(712000 / 1485),
      detail:
        "MLS C-7741 resolves to roll 074\u00b721\u00b7611\u00b703 \u2014 the same parcel already selected as COMP-A (re-list under a second brokerage). Deduplicated to avoid double-counting one sale.",
      metricLabel: "parcel",
      metricValue: "= COMP-A",
      cap: "unique parcels",
    },
  ];

  // --- TIERED SEARCH-WIDENING LOG --------------------------------------------
  const widening = [
    {
      tier: 0,
      title: "Tier 0 \u00b7 tight band",
      criteria: [
        ["District", "= South (subject)"],
        ["Contract window", "\u2264 6 months"],
        ["GLA band", "\u00b1 15%  (1,233 \u2013 1,668 sf)"],
        ["Sale type", "arm\u2019s-length only"],
      ],
      rationale: "Tightest comparability band \u2014 maximise like-for-like evidence.",
      found: 3,
      penalty: 0,
    },
    {
      tier: 1,
      title: "Tier 1 \u00b7 adjacent district",
      criteria: [
        ["District", "South + adjacent (Willow Park, Acadia, Maple Ridge)"],
        ["Contract window", "\u2264 6 months (unchanged)"],
        ["GLA band", "\u00b1 15% (unchanged)"],
      ],
      rationale:
        "Tier-0 count (3) below the minimum of 4 for a stable weighted reconciliation; widened to directly-adjacent districts only.",
      found: 1,
      penalty: -0.06,
    },
    {
      tier: 2,
      title: "Tier 2 \u00b7 wider date window",
      criteria: [
        ["Contract window", "\u2264 9 months (relaxed from 6)"],
        ["District", "South + adjacent (unchanged)"],
        ["GLA band", "\u00b1 15% (unchanged)"],
      ],
      rationale:
        "Recover near-miss comps just outside the 6-month window to improve recency distribution and bracket the subject from both sides.",
      found: 0,
      note: "0 net additions retained after re-screening; tier opened, no qualifying sale survived rejection rules.",
      penalty: -0.04,
    },
  ];

  const searchSummary = {
    retrieved: 9,
    selected: selected.length,
    rejected: rejected.length,
    finalTier: 2,
    wideningDepth: 2,
    totalPenalty: -0.10,
  };

  // --- RECONCILIATION (weighted, not averaged) -------------------------------
  const weights = { "C-A": 0.35, "C-B": 0.30, "C-C": 0.15, "C-D": 0.20 };
  const weightDrivers = {
    "C-A": { similarity: "high", recency: "51 d", distance: "0.7 km", burden: "1.2% gross" },
    "C-B": { similarity: "high", recency: "102 d", distance: "1.1 km", burden: "3.5% gross" },
    "C-C": { similarity: "moderate", recency: "87 d", distance: "1.9 km", burden: "13.6% gross" },
    "C-D": { similarity: "high", recency: "144 d", distance: "3.1 km", burden: "2.4% gross" },
  };
  const weightedPoint = selected.reduce(
    (s, c) => s + c.adjusted * weights[c.id],
    0
  );
  const adjustedVals = selected.map((c) => c.adjusted);
  const range = {
    low: 708000,
    point: Math.round(weightedPoint / 500) * 500, // 715,500
    high: 723500,
  };
  range.spreadPct = ((range.high - range.low) / range.point) * 100;

  // --- CONFIDENCE band + drivers ---------------------------------------------
  const confidence = {
    base: 0.55,
    score: 0.71,
    low: 0.66,
    high: 0.76,
    band: "MODERATE",
    drivers: [
      { key: "compCount", label: "Comp count", detail: "4 selected (\u2265 minimum 4)", contrib: 0.08 },
      { key: "spread", label: "Adjusted-value spread", detail: "$11,600 range \u00b7 1.6% of point", contrib: 0.14 },
      { key: "recency", label: "Recency", detail: "median contract age 95 days", contrib: 0.04 },
      { key: "distance", label: "Distance", detail: "0.7\u20133.1 km \u00b7 one adjacent-district", contrib: 0.02 },
      { key: "burden", label: "Adjustment burden", detail: "one comp at 13.6% gross", contrib: -0.05 },
      { key: "widening", label: "Widening depth", detail: "tier-2 reached (date relaxed)", contrib: -0.07 },
    ],
  };

  // --- FLAG REGISTRY (fired + clear) -----------------------------------------
  const flags = [
    {
      code: "DEEP_WIDENING",
      status: "FIRED",
      severity: "review",
      trigger: "search reached tier \u2265 2",
      detail:
        "Comp set required tier-2 date-window relaxation (\u2264 9 mo) to reach the minimum count. Recency distribution is acceptable but degraded; confidence penalised \u22120.04.",
    },
    {
      code: "STALE_COMP",
      status: "FIRED",
      severity: "review",
      trigger: "any selected comp contract age > 120 days",
      detail:
        "COMP-D contract 2026-01-08 (144 days) exceeds the 120-day recency watch. Time adjustment +1.8% applied off the CREB benchmark; weight reduced to 0.20.",
    },
    {
      code: "EXCESSIVE_GROSS_ADJ",
      status: "FIRED",
      severity: "review",
      trigger: "any selected comp gross adj > 12% review band",
      detail:
        "COMP-C gross adjustment 13.6% exceeds the 12% review band (hard cap 25%). Retained for recency and same-district provenance; weight reduced to 0.15.",
    },
    {
      code: "ADJACENT_DISTRICT_COMP",
      status: "FIRED",
      severity: "info",
      trigger: "any selected comp outside subject district",
      detail:
        "COMP-D drawn from Willow Park (adjacent). Location risk absorbed via distance-weighting rather than an explicit grid line; documented for reviewer.",
    },
    {
      code: "THIN_COMP_SET",
      status: "CLEAR",
      severity: "review",
      trigger: "selected comp count < 4",
      detail: "Exactly 4 comps selected \u2014 at the minimum, not below it.",
    },
    {
      code: "NET_ADJ_BREACH",
      status: "CLEAR",
      severity: "tolerance",
      trigger: "any selected comp net adj > 15%",
      detail: "Maximum net adjustment is 11.7% (COMP-C) \u2014 within the 15% hard tolerance.",
    },
    {
      code: "LINE_ADJ_BREACH",
      status: "CLEAR",
      severity: "tolerance",
      trigger: "any single line adj > 10%",
      detail: "Largest single line is 3.8% of price (COMP-C GLA) \u2014 within the 10% tolerance.",
    },
    {
      code: "OUTLIER_PRICE_INCLUDED",
      status: "CLEAR",
      severity: "review",
      trigger: "selected comp PPSF > 2.0 MAD from set median",
      detail: "Outlier candidate (COMP-H, 2.4 MAD low) was rejected, not selected.",
    },
  ];

  const aicNote =
    "AIC guidance: lender net/gross/line tolerances are screening aids, not appraisal rules. A breach is a flag for narrative support \u2014 it does not supersede good appraisal practice or invalidate an otherwise well-supported comparable.";

  // --- placeholder narrative (LLM-generated rationale) -----------------------
  const narrative = {
    scope:
      "This memo documents a sales-comparison analysis supporting a defensible value RANGE for the subject property as of the effective date. It is prepared for collateral-underwriting review. The analysis builds and documents the case for a range; it does not render a point value or a lending decision.",
    selection:
      "Four comparable sales were retained from nine retrieved candidates. Three qualified under the tier-0 band (same district, within six months, \u00b1 15% GLA); a fourth (COMP-D) was admitted from the directly-adjacent Willow Park market under tier-1 widening to satisfy the four-comp minimum, with the date window relaxed to nine months under tier-2. Five candidates were rejected under documented reason codes \u2014 one stale, one over the gross-adjustment cap, one outside the adjacent-district topology, one price outlier consistent with a non-arm\u2019s-length transfer, and one duplicate parcel.",
    adjustment:
      "Each comparable was adjusted to the subject on a transparent grid using a fixed rate card. Time adjustments were derived from each comparable\u2019s contract month against the CREB South-district detached benchmark and applied toward the effective date. COMP-A and COMP-B required only light adjustment and bracket the subject closely. COMP-C is a materially superior dwelling carrying a 13.6% gross adjustment \u2014 above the 12% review band though well within the 25% cap \u2014 and was retained at reduced weight for its recency and same-district provenance.",
    reconciliation:
      "Adjusted values were reconciled by weight rather than by simple average, emphasising the most similar, most recent, and least-adjusted evidence. The four adjusted values fall in a tight $11,600 band. The weighted central indication is $715,500, with a supported range of $708,000 to $723,500 \u2014 a spread of roughly \u00b11% that brackets every adjusted comparable.",
    confidence:
      "Confidence is assessed MODERATE (0.71). The tight adjusted-value spread and an at-minimum comp count support the indication; tier-2 widening, one adjacent-district comparable, and one elevated-adjustment comparable temper it. Four human-review flags fired and are documented below. None constitutes a failure; each is a prompt for reviewer narrative under AIC guidance.",
    limiting:
      "All comparable data shown is SYNTHETIC and illustrative. Subject characteristics are grounded in Open Calgary assessment data (source: open_calgary_assessment); the assessed value reflects a 2025-07-01 valuation date and is not a current market opinion. This artifact is render-only and contains no live computation.",
  };

  return {
    usd0, sgn, pct, meta, benchmark, bm, marketContext, rates, thresholds,
    subject, selected, rejected, reasonCodes, widening, searchSummary,
    weights, weightDrivers, range, adjustedVals, confidence, flags, aicNote,
    narrative, timeFactor,
  };
})();
