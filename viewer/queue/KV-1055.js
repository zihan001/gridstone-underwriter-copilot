/* ============================================================================
   GENERATED — do not edit by hand. Produced by kvcomp.serialize.memo_to_window
   from a frozen MemoArtifact. Regenerate with ./scripts/run.sh
   ----------------------------------------------------------------------------
   This template carries the verbatim JS formatting helpers the locked viewer
   calls (usd0 / sgn / pct / timeFactor). The Python serializer replaces the
   data token (below) with json.dumps(memo_window_dict) and writes the result
   to out/data.js. The helpers must match the originals in the delivered viewer
   exactly, byte for byte, so render is unchanged. See docs/MEMO_CONTRACT.md.
   ========================================================================== */
window.MEMO = (function () {
  const usd0 = (n) =>
    (n < 0 ? "-" : "") + "$" + Math.abs(Math.round(n)).toLocaleString("en-US");
  const sgn = (n) =>
    (n > 0 ? "+" : n < 0 ? "\u2212" : "") +
    "$" +
    Math.abs(Math.round(n)).toLocaleString("en-US");
  const pct = (n, d = 1) =>
    (n > 0 ? "+" : n < 0 ? "\u2212" : "") + Math.abs(n).toFixed(d) + "%";

  // All data (computed by the deterministic core) is spliced in here.
  const DATA = {
  "meta": {
    "caseId": "KV-CMP-2026-4-06",
    "snapshot": "2026-06-01T00:00:00-06:00",
    "effectiveDate": "2026-06-01",
    "approach": "Sales Comparison Approach",
    "analyst": "model:underwrite-copilot v1.0.0",
    "purpose": "Defend a value RANGE for collateral review — never a point decision."
  },
  "narrativeSource": "llm",
  "benchmark": [
    {
      "m": "2025-01",
      "v": 749300
    },
    {
      "m": "2025-02",
      "v": 758400
    },
    {
      "m": "2025-03",
      "v": 766600
    },
    {
      "m": "2025-04",
      "v": 766300
    },
    {
      "m": "2025-05",
      "v": 766300
    },
    {
      "m": "2025-06",
      "v": 761300
    },
    {
      "m": "2025-07",
      "v": 758100
    },
    {
      "m": "2025-08",
      "v": 752500
    },
    {
      "m": "2025-09",
      "v": 746500
    },
    {
      "m": "2025-10",
      "v": 740400
    },
    {
      "m": "2025-11",
      "v": 730300
    },
    {
      "m": "2025-12",
      "v": 726300
    },
    {
      "m": "2026-01",
      "v": 724000
    },
    {
      "m": "2026-02",
      "v": 734300
    },
    {
      "m": "2026-03",
      "v": 741300
    },
    {
      "m": "2026-04",
      "v": 745400
    },
    {
      "m": "2026-05",
      "v": 747800
    }
  ],
  "bm": {
    "2025-01": 749300,
    "2025-02": 758400,
    "2025-03": 766600,
    "2025-04": 766300,
    "2025-05": 766300,
    "2025-06": 761300,
    "2025-07": 758100,
    "2025-08": 752500,
    "2025-09": 746500,
    "2025-10": 740400,
    "2025-11": 730300,
    "2025-12": 726300,
    "2026-01": 724000,
    "2026-02": 734300,
    "2026-03": 741300,
    "2026-04": 745400,
    "2026-05": 747800
  },
  "marketContext": {
    "southBenchmark": 563900,
    "cityBenchmark": 747800,
    "ppsf": 474,
    "series": "CREB · Detached · North East District · monthly benchmark"
  },
  "rates": {
    "gla": 85,
    "lot": 12,
    "bed": 4000,
    "bathFull": 6000,
    "bathHalf": 3500,
    "basement": 35,
    "garage": 7500,
    "age": 700,
    "condition": 12000,
    "quality": 15000
  },
  "thresholds": {
    "net": 15,
    "gross": 25,
    "line": 10,
    "netReview": 8,
    "grossReview": 12,
    "lineReview": 5,
    "grossCap": 25,
    "staleDays": 120,
    "staleMaxDays": 274
  },
  "subject": {
    "real": true,
    "provenance": "source: open_calgary_assessment",
    "roll": "047·09·114·06",
    "addr": "15xx 7th Street NE",
    "addrNote": "civic address partially masked for review packet",
    "community": "North East district",
    "district": "North East",
    "quadrant": "NE",
    "landUse": "R-C1 · Residential Contextual One Dwelling",
    "assessedValue": 548000,
    "assessmentRollYear": 2026,
    "assessmentValDate": "2025-07-01",
    "ppsfAssessed": 442,
    "propertyType": "Single-family detached",
    "gla": 1240,
    "lot": 4800,
    "beds": 3,
    "bathFull": 1,
    "bathHalf": 1,
    "basementSf": 600,
    "basementFinished": true,
    "walkout": false,
    "garageStalls": 2,
    "garageType": "attached",
    "yearBuilt": 1976,
    "effDate": "2026-06-01",
    "condition": "C3",
    "quality": "Q3",
    "age": 50,
    "attrs": [
      [
        "Property type",
        "Single-family detached"
      ],
      [
        "Above-grade GLA",
        "1,240 sf"
      ],
      [
        "Site / lot",
        "4,800 sf"
      ],
      [
        "Bedrooms",
        "3"
      ],
      [
        "Bathrooms",
        "1 full / 1 half"
      ],
      [
        "Basement",
        "600 sf finished · no walkout"
      ],
      [
        "Garage",
        "2-stall · attached"
      ],
      [
        "Year built",
        "1976 (50 yr)"
      ],
      [
        "Condition rating",
        "C3"
      ],
      [
        "Quality rating",
        "Q3"
      ],
      [
        "Land use",
        "R-C1"
      ],
      [
        "Effective date",
        "2026-06-01"
      ]
    ]
  },
  "selected": [
    {
      "id": "S-A",
      "label": "COMP-A",
      "synthetic": true,
      "mls": "C-2000",
      "community": "Lake Bonavista",
      "district": "North East",
      "sameDistrict": true,
      "distanceKm": 0.6,
      "contractDate": "2026-04-27",
      "contractMonth": "2026-04",
      "ageDays": 35,
      "price": 540460,
      "gla": 1120,
      "lot": 4200,
      "beds": 3,
      "baths": "1F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1976,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,120 sf (−120)",
          "adj": 10200
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "4,200 sf (−600)",
          "adj": 0
        },
        {
          "key": "bed",
          "label": "Bedrooms",
          "sub": "3 (=)",
          "adj": 0
        },
        {
          "key": "bath",
          "label": "Bathrooms",
          "sub": "1F / 1H (=)",
          "adj": 0
        },
        {
          "key": "bsmt",
          "label": "Basement",
          "sub": "600 sf fin (=)",
          "adj": 0
        },
        {
          "key": "gar",
          "label": "Garage",
          "sub": "2 att. (=)",
          "adj": 0
        },
        {
          "key": "age",
          "label": "Age / eff-age",
          "sub": "1976 (=)",
          "adj": 0
        },
        {
          "key": "cond",
          "label": "Condition",
          "sub": "C3 (=)",
          "adj": 0
        },
        {
          "key": "qual",
          "label": "Quality",
          "sub": "Q3 (=)",
          "adj": 0
        },
        {
          "key": "time",
          "label": "Time / market cond.",
          "sub": "2026-04-27 → 2026-06-01",
          "adj": 600
        }
      ],
      "tf": 0.001113,
      "bmContract": 745400,
      "timeAdj": 600,
      "net": 10800,
      "gross": 10800,
      "adjusted": 551260,
      "netPct": 1.9983,
      "grossPct": 1.9983,
      "linePct": 1.8873,
      "ppsf": 483
    },
    {
      "id": "S-B",
      "label": "COMP-B",
      "synthetic": true,
      "mls": "C-2001",
      "community": "Lake Bonavista",
      "district": "North East",
      "sameDistrict": true,
      "distanceKm": 0.9,
      "contractDate": "2026-04-04",
      "contractMonth": "2026-04",
      "ageDays": 58,
      "price": 555125,
      "gla": 1180,
      "lot": 4500,
      "beds": 3,
      "baths": "1F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1976,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,180 sf (−60)",
          "adj": 5100
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "4,500 sf (−300)",
          "adj": 0
        },
        {
          "key": "bed",
          "label": "Bedrooms",
          "sub": "3 (=)",
          "adj": 0
        },
        {
          "key": "bath",
          "label": "Bathrooms",
          "sub": "1F / 1H (=)",
          "adj": 0
        },
        {
          "key": "bsmt",
          "label": "Basement",
          "sub": "600 sf fin (=)",
          "adj": 0
        },
        {
          "key": "gar",
          "label": "Garage",
          "sub": "2 att. (=)",
          "adj": 0
        },
        {
          "key": "age",
          "label": "Age / eff-age",
          "sub": "1976 (=)",
          "adj": 0
        },
        {
          "key": "cond",
          "label": "Condition",
          "sub": "C3 (=)",
          "adj": 0
        },
        {
          "key": "qual",
          "label": "Quality",
          "sub": "Q3 (=)",
          "adj": 0
        },
        {
          "key": "time",
          "label": "Time / market cond.",
          "sub": "2026-04-04 → 2026-06-01",
          "adj": 600
        }
      ],
      "tf": 0.001113,
      "bmContract": 745400,
      "timeAdj": 600,
      "net": 5700,
      "gross": 5700,
      "adjusted": 560825,
      "netPct": 1.0268,
      "grossPct": 1.0268,
      "linePct": 0.9187,
      "ppsf": 470
    },
    {
      "id": "S-C",
      "label": "COMP-C",
      "synthetic": true,
      "mls": "C-2002",
      "community": "Lake Bonavista",
      "district": "North East",
      "sameDistrict": true,
      "distanceKm": 1.2,
      "contractDate": "2026-03-13",
      "contractMonth": "2026-03",
      "ageDays": 80,
      "price": 556230,
      "gla": 1240,
      "lot": 4800,
      "beds": 3,
      "baths": "1F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1976,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,240 sf (=)",
          "adj": 0
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "4,800 sf (=)",
          "adj": 0
        },
        {
          "key": "bed",
          "label": "Bedrooms",
          "sub": "3 (=)",
          "adj": 0
        },
        {
          "key": "bath",
          "label": "Bathrooms",
          "sub": "1F / 1H (=)",
          "adj": 0
        },
        {
          "key": "bsmt",
          "label": "Basement",
          "sub": "600 sf fin (=)",
          "adj": 0
        },
        {
          "key": "gar",
          "label": "Garage",
          "sub": "2 att. (=)",
          "adj": 0
        },
        {
          "key": "age",
          "label": "Age / eff-age",
          "sub": "1976 (=)",
          "adj": 0
        },
        {
          "key": "cond",
          "label": "Condition",
          "sub": "C3 (=)",
          "adj": 0
        },
        {
          "key": "qual",
          "label": "Quality",
          "sub": "Q3 (=)",
          "adj": 0
        },
        {
          "key": "time",
          "label": "Time / market cond.",
          "sub": "2026-03-13 → 2026-06-01",
          "adj": 3700
        }
      ],
      "tf": 0.00665,
      "bmContract": 741300,
      "timeAdj": 3700,
      "net": 3700,
      "gross": 3700,
      "adjusted": 559930,
      "netPct": 0.6652,
      "grossPct": 0.6652,
      "linePct": 0.6652,
      "ppsf": 449
    },
    {
      "id": "S-D",
      "label": "COMP-D",
      "synthetic": true,
      "mls": "C-2003",
      "community": "Lake Bonavista",
      "district": "North East",
      "sameDistrict": true,
      "distanceKm": 1.5,
      "contractDate": "2026-02-20",
      "contractMonth": "2026-02",
      "ageDays": 101,
      "price": 553227,
      "gla": 1310,
      "lot": 5150,
      "beds": 3,
      "baths": "1F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1976,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,310 sf (+70)",
          "adj": -5950
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,150 sf (+350)",
          "adj": 0
        },
        {
          "key": "bed",
          "label": "Bedrooms",
          "sub": "3 (=)",
          "adj": 0
        },
        {
          "key": "bath",
          "label": "Bathrooms",
          "sub": "1F / 1H (=)",
          "adj": 0
        },
        {
          "key": "bsmt",
          "label": "Basement",
          "sub": "600 sf fin (=)",
          "adj": 0
        },
        {
          "key": "gar",
          "label": "Garage",
          "sub": "2 att. (=)",
          "adj": 0
        },
        {
          "key": "age",
          "label": "Age / eff-age",
          "sub": "1976 (=)",
          "adj": 0
        },
        {
          "key": "cond",
          "label": "Condition",
          "sub": "C3 (=)",
          "adj": 0
        },
        {
          "key": "qual",
          "label": "Quality",
          "sub": "Q3 (=)",
          "adj": 0
        },
        {
          "key": "time",
          "label": "Time / market cond.",
          "sub": "2026-02-20 → 2026-06-01",
          "adj": 9000
        }
      ],
      "tf": 0.016247,
      "bmContract": 734300,
      "timeAdj": 9000,
      "net": 3050,
      "gross": 14950,
      "adjusted": 556277,
      "netPct": 0.5513,
      "grossPct": 2.7023,
      "linePct": 1.6268,
      "ppsf": 422
    },
    {
      "id": "S-E",
      "label": "COMP-E",
      "synthetic": true,
      "mls": "C-2004",
      "community": "Lake Bonavista",
      "district": "North East",
      "sameDistrict": true,
      "distanceKm": 1.8,
      "contractDate": "2025-12-28",
      "contractMonth": "2025-12",
      "ageDays": 155,
      "price": 547703,
      "gla": 1380,
      "lot": 5500,
      "beds": 3,
      "baths": "1F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1976,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [
        "STALE_COMP"
      ],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,380 sf (+140)",
          "adj": -11900
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,500 sf (+700)",
          "adj": 0
        },
        {
          "key": "bed",
          "label": "Bedrooms",
          "sub": "3 (=)",
          "adj": 0
        },
        {
          "key": "bath",
          "label": "Bathrooms",
          "sub": "1F / 1H (=)",
          "adj": 0
        },
        {
          "key": "bsmt",
          "label": "Basement",
          "sub": "600 sf fin (=)",
          "adj": 0
        },
        {
          "key": "gar",
          "label": "Garage",
          "sub": "2 att. (=)",
          "adj": 0
        },
        {
          "key": "age",
          "label": "Age / eff-age",
          "sub": "1976 (=)",
          "adj": 0
        },
        {
          "key": "cond",
          "label": "Condition",
          "sub": "C3 (=)",
          "adj": 0
        },
        {
          "key": "qual",
          "label": "Quality",
          "sub": "Q3 (=)",
          "adj": 0
        },
        {
          "key": "time",
          "label": "Time / market cond.",
          "sub": "2025-12-28 → 2026-06-01",
          "adj": 15050
        }
      ],
      "tf": 0.02744,
      "bmContract": 726300,
      "timeAdj": 15050,
      "net": 3150,
      "gross": 26950,
      "adjusted": 550853,
      "netPct": 0.5751,
      "grossPct": 4.9206,
      "linePct": 2.7478,
      "ppsf": 397
    }
  ],
  "rejected": [],
  "reasonCodes": {
    "TOO_STALE": "Outside the maximum contract-date window even after widening.",
    "WRONG_DISTRICT_AFTER_WIDENING": "Not adjacent to the subject district per the topology map.",
    "GROSS_ADJ_TOO_HIGH": "Cumulative gross adjustment exceeds the 25% hard cap.",
    "OUTLIER_PRICE": "Price-per-sf is a statistical outlier vs the candidate set.",
    "DUPLICATE": "Resolves to a parcel already represented in the set."
  },
  "widening": [
    {
      "tier": 0,
      "title": "Tier 0 · tight band",
      "criteria": [
        [
          "District",
          "= North East (subject)"
        ],
        [
          "Contract window",
          "≤ 6 months"
        ],
        [
          "Sale type",
          "arm's-length only"
        ]
      ],
      "rationale": "Tightest comparability band — maximise like-for-like evidence.",
      "found": 5,
      "note": null,
      "penalty": 0.0
    },
    {
      "tier": 1,
      "title": "Tier 1 · adjacent district",
      "criteria": [
        [
          "District",
          "North East + directly-adjacent"
        ],
        [
          "Contract window",
          "≤ 6 months (unchanged)"
        ]
      ],
      "rationale": "Tier-0 count (5) below the minimum of 4 for a stable weighted reconciliation; widened to directly-adjacent districts only.",
      "found": 0,
      "note": "0 net additions retained after re-screening; tier opened, no qualifying sale survived.",
      "penalty": -0.06
    },
    {
      "tier": 2,
      "title": "Tier 2 · wider date window",
      "criteria": [
        [
          "Contract window",
          "≤ 9 months (relaxed from 6)"
        ],
        [
          "District",
          "North East + adjacent (unchanged)"
        ]
      ],
      "rationale": "Open a wider date window to recover fresher, better-bracketing evidence given a comp on the stale watch; improves the recency distribution.",
      "found": 0,
      "note": "0 net additions retained after re-screening; tier opened, no qualifying sale survived.",
      "penalty": -0.04
    }
  ],
  "searchSummary": {
    "retrieved": 5,
    "selected": 5,
    "rejected": 0,
    "finalTier": 2,
    "wideningDepth": 2,
    "totalPenalty": -0.1
  },
  "weights": {
    "S-A": 0.2748,
    "S-B": 0.2463,
    "S-C": 0.2178,
    "S-D": 0.1668,
    "S-E": 0.0943
  },
  "weightDrivers": {
    "S-A": {
      "similarity": "high",
      "recency": "35 d",
      "distance": "0.6 km",
      "burden": "2.0% gross"
    },
    "S-B": {
      "similarity": "high",
      "recency": "58 d",
      "distance": "0.9 km",
      "burden": "1.0% gross"
    },
    "S-C": {
      "similarity": "high",
      "recency": "80 d",
      "distance": "1.2 km",
      "burden": "0.7% gross"
    },
    "S-D": {
      "similarity": "high",
      "recency": "101 d",
      "distance": "1.5 km",
      "burden": "2.7% gross"
    },
    "S-E": {
      "similarity": "moderate",
      "recency": "155 d",
      "distance": "1.8 km",
      "burden": "4.9% gross"
    }
  },
  "range": {
    "low": 552000,
    "point": 556500,
    "high": 561000,
    "spreadPct": 1.62
  },
  "adjustedVals": [
    551260,
    560825,
    559930,
    556277,
    550853
  ],
  "confidence": {
    "base": 0.55,
    "score": 0.7964,
    "low": 0.7464,
    "high": 0.8464,
    "band": "MODERATE",
    "drivers": [
      {
        "key": "compCount",
        "label": "Comp count",
        "detail": "5 selected (≥ minimum 4)",
        "contrib": 0.11
      },
      {
        "key": "spread",
        "label": "Adjusted-value spread",
        "detail": "$9,972 range · 1.6% of point",
        "contrib": 0.1395
      },
      {
        "key": "recency",
        "label": "Recency",
        "detail": "median contract age 80 days",
        "contrib": 0.0444
      },
      {
        "key": "distance",
        "label": "Distance",
        "detail": "0.6–1.8 km · 0 adjacent-district",
        "contrib": 0.042
      },
      {
        "key": "burden",
        "label": "Adjustment burden",
        "detail": "worst comp at 4.9% gross",
        "contrib": 0.0105
      },
      {
        "key": "widening",
        "label": "Widening depth",
        "detail": "tier-2 reached (depth 2)",
        "contrib": -0.1
      }
    ]
  },
  "flags": [
    {
      "code": "DEEP_WIDENING",
      "status": "FIRED",
      "severity": "review",
      "trigger": "search reached tier ≥ 2",
      "detail": "Comp set required tier-2 relaxation to reach the minimum count; recency distribution degraded, confidence penalised -0.10."
    },
    {
      "code": "STALE_COMP",
      "status": "FIRED",
      "severity": "review",
      "trigger": "any selected comp contract age > 120 days",
      "detail": "COMP-E exceed the 120-day recency watch; time-adjusted off the CREB benchmark, weight reduced."
    },
    {
      "code": "THIN_COMP_SET",
      "status": "CLEAR",
      "severity": "review",
      "trigger": "selected comp count < 4",
      "detail": "5 comps selected — at or above the minimum of 4."
    },
    {
      "code": "ADJACENT_DISTRICT_COMP",
      "status": "CLEAR",
      "severity": "info",
      "trigger": "any selected comp outside the subject district",
      "detail": "All selected comps fall inside the subject district."
    },
    {
      "code": "EXCESSIVE_GROSS_ADJ",
      "status": "CLEAR",
      "severity": "review",
      "trigger": "any selected comp gross adj > 12% review band",
      "detail": "Worst gross adjustment within the 12% review band."
    },
    {
      "code": "EXCESSIVE_NET_ADJ",
      "status": "CLEAR",
      "severity": "review",
      "trigger": "any selected comp net adj > 8% review band",
      "detail": "Worst net adjustment within the 8% review band."
    },
    {
      "code": "NET_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any selected comp net adj > 15%",
      "detail": "Max net adjustment 2.0% — within the 15% tolerance."
    },
    {
      "code": "GROSS_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any selected comp gross adj > 25%",
      "detail": "Max gross adjustment 4.9% — within the 25% tolerance."
    },
    {
      "code": "LINE_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any single line adj > 10%",
      "detail": "Largest single line 2.7% of price — within the 10% tolerance."
    },
    {
      "code": "OUTLIER_PRICE_INCLUDED",
      "status": "CLEAR",
      "severity": "review",
      "trigger": "selected comp PPSF > 2.0 MAD from set median",
      "detail": "No selected comp is a PPSF outlier (any outlier was rejected, not selected)."
    },
    {
      "code": "VALUE_OUTSIDE_RANGE",
      "status": "CLEAR",
      "severity": "review",
      "trigger": "reconciled point outside [min, max] of adjusted comp values",
      "detail": "Reconciled point sits inside the adjusted-value envelope."
    },
    {
      "code": "HIGH_COMP_ANCHORING",
      "status": "CLEAR",
      "severity": "review",
      "trigger": "reconciled point biased toward the highest comp beyond 2%",
      "detail": "Reconciled point is not anchored to the highest comp."
    },
    {
      "code": "UNSUPPORTED_TIME_ADJ",
      "status": "FIRED",
      "severity": "review",
      "trigger": "time adj applied without an encoded district series (fallback/extrapolated)",
      "detail": "COMP-A, COMP-B, COMP-C, COMP-D, COMP-E use the city-wide fallback series (no encoded district benchmark); time adjustment is approximate."
    },
    {
      "code": "WIDE_UNADJUSTED_SPREAD",
      "status": "CLEAR",
      "severity": "review",
      "trigger": "raw comp price range > 30%",
      "detail": "Raw (pre-adjustment) price spread 3% within the 30% watch."
    }
  ],
  "aicNote": "AIC guidance: lender net/gross/line tolerances are screening aids, not appraisal rules. A breach is a flag for narrative support — it does not supersede good appraisal practice or invalidate an otherwise well-supported comparable.",
  "narrative": {
    "scope": "This appraisal establishes a market value range for 15xx 7th Street NE as of June 1, 2026, using sales comparison methodology. The subject property is located in Calgary's north_east district with an assessed value of $548,000. Analysis employs synthetic comparable sales paired with the subject property grounded in Open Calgary data. The effective date reflects current market conditions within the specified geographic area.",
    "selection": "The comparable selection process retrieved 5 properties and selected all 5 for analysis, with no rejections recorded. All selected comparables are located within the same north_east district as the subject. The final comparable tier reached 2, indicating the selection required tier-2 relaxation to achieve minimum count thresholds. This broader search pattern is captured in the DEEP_WIDENING flag, which notes recency distribution degradation and applies a -0.10 confidence penalty.",
    "adjustment": "Adjustment analysis shows gross adjustment percentages ranging from 0.7% to 4.9% across the comparable set. Net adjustments range from 0.6% to 2.0%, with four comparables requiring net adjustments at or below 1.0%. Comparable S-A shows the highest net adjustment at 2.0%, while S-D and S-E both settle at 0.6% net. Time adjustments utilize city-wide fallback series due to absence of encoded district benchmarks, as noted in the UNSUPPORTED_TIME_ADJ flag. Comparable S-E exceeds the 120-day recency threshold, triggering the STALE_COMP flag with corresponding weight reduction.",
    "reconciliation": "The weighted analysis produces adjusted values ranging from $550,853 to $560,825. Comparable weights reflect adjustment burden and market proximity, with S-A receiving the highest weight at 0.2748 and S-E the lowest at 0.0943 due to staleness penalties. The reconciled range spans $552,000 to $561,000 with a point estimate of $556,500, representing a 1.62% spread. This tight spread suggests reasonable comparable alignment despite the tier-2 selection requirements.",
    "confidence": "The confidence assessment yields a score of 0.7964, falling within the MODERATE confidence band. Primary positive contributors include comparable count (+0.11), adjusted-value spread (+0.1395), recency (+0.0444), distance (+0.042), and adjustment burden (+0.0105). The primary detractor is widening depth (-0.10), reflecting the tier-2 relaxation impact. The MODERATE rating indicates acceptable reliability while acknowledging the search depth requirements and time adjustment limitations.",
    "limiting": "This analysis is subject to several limiting conditions that may affect reliability. Time adjustments rely on city-wide trends rather than district-specific benchmarks, introducing approximation into temporal corrections. One comparable exceeds preferred recency standards, though weight adjustments partially mitigate this concern. The tier-2 selection depth suggests limited highly comparable recent sales activity in the immediate market area. Users should consider these factors when applying the concluded range to decision-making processes."
  },
  "agentTrace": {
    "intake": {
      "source": "llm",
      "reasoning": "## Grounded Subject Record\n\n**Property Identity & Assessment:**\n- Address: 15xx 7th Street NE\n- Roll Number: 047-09-114-06\n- District: north_east\n- Coordinates: 51.075, -113.985\n- Assessed Value: $548,000\n- Land Use: R-C1\n- Assessment Year: 2026\n\n**Physical Characteristics:**\n- GLA: 1,240 sqft (from listing)\n- Lot Size: 4,800 sqft (from listing)\n- Bedrooms (AG): 3 (from listing)\n- Full Baths: 1 (from listing)\n- Half Baths: 1 (from listing)\n- Year Built: 1976 (grounded via Open Calgary)\n- Basement Finished: 600 sqft (from listing)\n- Basement Walkout: Not specified (no district default available)\n- Garage Type: Attached (from listing)\n- Garage Stalls: 2 (from listing)\n\n**Intake Reasoning:** The property was successfully grounded through Open Calgary using the address, establishing the parcel identity, district (north_east), and year built (1976). Most physical characteristics were clearly stated in the listing including square footages, bedroom/bathroom counts, and garage details. The basement walkout status was not mentioned in the listing and no district-typical fallback was available for this field. All other required fields were captured either from the listing text or grounded assessment data.",
      "calls": [
        {
          "name": "lookup_open_calgary",
          "args": "address_or_roll=15xx 7th Street NE",
          "result": "{\"address\": \"15xx 7th Street NE\", \"district\": \"north_east\", \"lat\": 51.075, \"lon\": -113.985, \"roll_number\": \"047-09-114-06\", \"assessed_value\": 548000, \"land_use\": \"R-C1\", \"assessment_roll_year\": 2026, \"year_built\": 1976}"
        },
        {
          "name": "parse_listing_field",
          "args": "field=gla_sqft",
          "result": "gla_sqft=1240 (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=lot_sqft",
          "result": "lot_sqft=4800 (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=beds_ag",
          "result": "beds_ag=3 (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=full_baths",
          "result": "full_baths=1 (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=half_baths",
          "result": "half_baths=1 (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=year_built",
          "result": "year_built already grounded in Open Calgary; keeping the grounded value."
        },
        {
          "name": "parse_listing_field",
          "args": "field=basement_finished_sqft",
          "result": "basement_finished_sqft=600 (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=basement_walkout",
          "result": "NOT_FOUND: listing does not state basement_walkout; call district_typical for it."
        },
        {
          "name": "parse_listing_field",
          "args": "field=garage_type",
          "result": "garage_type=GarageType.ATTACHED (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=garage_stalls",
          "result": "garage_stalls=2 (from listing)"
        },
        {
          "name": "district_typical",
          "args": "district=north_east, field=basement_walkout",
          "result": "no district-typical value for basement_walkout."
        }
      ]
    }
  }
};

  // timeFactor is data-dependent (uses the emitted benchmark map), so it is
  // reconstructed here from DATA rather than hard-coded.
  const bm = DATA.bm;
  const BM_EFF = bm[DATA.meta.effectiveDate.slice(0, 7)];
  const timeFactor = (month) => BM_EFF / bm[month] - 1;

  return Object.assign({ usd0, sgn, pct, timeFactor }, DATA);
})();
