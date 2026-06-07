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
    "caseId": "KV-CMP-2026-0-02",
    "snapshot": "2026-06-01T00:00:00-06:00",
    "effectiveDate": "2026-06-01",
    "approach": "Sales Comparison Approach",
    "analyst": "model:underwrite-copilot v1.0.0",
    "purpose": "Defend a value RANGE for collateral review — never a point decision."
  },
  "benchmark": [
    {
      "m": "2025-06",
      "v": 961200
    },
    {
      "m": "2025-07",
      "v": 966800
    },
    {
      "m": "2025-08",
      "v": 971600
    },
    {
      "m": "2025-09",
      "v": 975100
    },
    {
      "m": "2025-10",
      "v": 979300
    },
    {
      "m": "2025-11",
      "v": 982800
    },
    {
      "m": "2025-12",
      "v": 985100
    },
    {
      "m": "2026-01",
      "v": 987600
    },
    {
      "m": "2026-02",
      "v": 991800
    },
    {
      "m": "2026-03",
      "v": 996000
    },
    {
      "m": "2026-04",
      "v": 1000200
    },
    {
      "m": "2026-05",
      "v": 1003700
    },
    {
      "m": "2026-06",
      "v": 1005200
    }
  ],
  "bm": {
    "2025-06": 961200,
    "2025-07": 966800,
    "2025-08": 971600,
    "2025-09": 975100,
    "2025-10": 979300,
    "2025-11": 982800,
    "2025-12": 985100,
    "2026-01": 987600,
    "2026-02": 991800,
    "2026-03": 996000,
    "2026-04": 1000200,
    "2026-05": 1003700,
    "2026-06": 1005200
  },
  "marketContext": {
    "southBenchmark": 1005200,
    "cityBenchmark": 747800,
    "ppsf": 474,
    "series": "CREB · Detached · West District · monthly benchmark"
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
    "roll": "091·44·300·02",
    "addr": "33xx Signal Hill Heights SW",
    "addrNote": "civic address partially masked for review packet",
    "community": "West district",
    "district": "West",
    "quadrant": "SW",
    "landUse": "R-C1 · Residential Contextual One Dwelling",
    "assessedValue": 985000,
    "assessmentRollYear": 2026,
    "assessmentValDate": "2025-07-01",
    "ppsfAssessed": 518,
    "propertyType": "Single-family detached",
    "gla": 1900,
    "lot": 6400,
    "beds": 4,
    "bathFull": 3,
    "bathHalf": 1,
    "basementSf": 600,
    "basementFinished": true,
    "walkout": false,
    "garageStalls": 2,
    "garageType": "attached",
    "yearBuilt": 1996,
    "effDate": "2026-06-01",
    "condition": "C3",
    "quality": "Q3",
    "age": 30,
    "attrs": [
      [
        "Property type",
        "Single-family detached"
      ],
      [
        "Above-grade GLA",
        "1,900 sf"
      ],
      [
        "Site / lot",
        "6,400 sf"
      ],
      [
        "Bedrooms",
        "4"
      ],
      [
        "Bathrooms",
        "3 full / 1 half"
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
        "1996 (30 yr)"
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
      "district": "West",
      "sameDistrict": true,
      "distanceKm": 0.6,
      "contractDate": "2026-04-27",
      "contractMonth": "2026-04",
      "ageDays": 35,
      "price": 1001369,
      "gla": 1780,
      "lot": 5800,
      "beds": 4,
      "baths": "3F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1996,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,780 sf (−120)",
          "adj": 10200
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,800 sf (−600)",
          "adj": 0
        },
        {
          "key": "bed",
          "label": "Bedrooms",
          "sub": "4 (=)",
          "adj": 0
        },
        {
          "key": "bath",
          "label": "Bathrooms",
          "sub": "3F / 1H (=)",
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
          "sub": "1996 (=)",
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
          "adj": 5000
        }
      ],
      "tf": 0.004999,
      "bmContract": 1000200,
      "timeAdj": 5000,
      "net": 15200,
      "gross": 15200,
      "adjusted": 1016569,
      "netPct": 1.5179,
      "grossPct": 1.5179,
      "linePct": 1.0186,
      "ppsf": 563
    },
    {
      "id": "S-B",
      "label": "COMP-B",
      "synthetic": true,
      "mls": "C-2001",
      "community": "Lake Bonavista",
      "district": "West",
      "sameDistrict": true,
      "distanceKm": 0.9,
      "contractDate": "2026-04-04",
      "contractMonth": "2026-04",
      "ageDays": 58,
      "price": 1033284,
      "gla": 1840,
      "lot": 6100,
      "beds": 4,
      "baths": "3F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1996,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,840 sf (−60)",
          "adj": 5100
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "6,100 sf (−300)",
          "adj": 0
        },
        {
          "key": "bed",
          "label": "Bedrooms",
          "sub": "4 (=)",
          "adj": 0
        },
        {
          "key": "bath",
          "label": "Bathrooms",
          "sub": "3F / 1H (=)",
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
          "sub": "1996 (=)",
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
          "adj": 5150
        }
      ],
      "tf": 0.004999,
      "bmContract": 1000200,
      "timeAdj": 5150,
      "net": 10250,
      "gross": 10250,
      "adjusted": 1043534,
      "netPct": 0.992,
      "grossPct": 0.992,
      "linePct": 0.4984,
      "ppsf": 562
    },
    {
      "id": "S-C",
      "label": "COMP-C",
      "synthetic": true,
      "mls": "C-2002",
      "community": "Lake Bonavista",
      "district": "West",
      "sameDistrict": true,
      "distanceKm": 1.2,
      "contractDate": "2026-03-13",
      "contractMonth": "2026-03",
      "ageDays": 80,
      "price": 1021443,
      "gla": 1900,
      "lot": 6400,
      "beds": 4,
      "baths": "3F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1996,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,900 sf (=)",
          "adj": 0
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "6,400 sf (=)",
          "adj": 0
        },
        {
          "key": "bed",
          "label": "Bedrooms",
          "sub": "4 (=)",
          "adj": 0
        },
        {
          "key": "bath",
          "label": "Bathrooms",
          "sub": "3F / 1H (=)",
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
          "sub": "1996 (=)",
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
          "adj": 9450
        }
      ],
      "tf": 0.009237,
      "bmContract": 996000,
      "timeAdj": 9450,
      "net": 9450,
      "gross": 9450,
      "adjusted": 1030893,
      "netPct": 0.9252,
      "grossPct": 0.9252,
      "linePct": 0.9252,
      "ppsf": 538
    },
    {
      "id": "S-D",
      "label": "COMP-D",
      "synthetic": true,
      "mls": "C-2003",
      "community": "Lake Bonavista",
      "district": "West",
      "sameDistrict": true,
      "distanceKm": 1.5,
      "contractDate": "2026-02-20",
      "contractMonth": "2026-02",
      "ageDays": 101,
      "price": 1024179,
      "gla": 1970,
      "lot": 6750,
      "beds": 4,
      "baths": "3F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1996,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,970 sf (+70)",
          "adj": -5950
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "6,750 sf (+350)",
          "adj": 0
        },
        {
          "key": "bed",
          "label": "Bedrooms",
          "sub": "4 (=)",
          "adj": 0
        },
        {
          "key": "bath",
          "label": "Bathrooms",
          "sub": "3F / 1H (=)",
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
          "sub": "1996 (=)",
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
          "adj": 13850
        }
      ],
      "tf": 0.013511,
      "bmContract": 991800,
      "timeAdj": 13850,
      "net": 7900,
      "gross": 19800,
      "adjusted": 1032079,
      "netPct": 0.7713,
      "grossPct": 1.9333,
      "linePct": 1.3523,
      "ppsf": 520
    },
    {
      "id": "S-E",
      "label": "COMP-E",
      "synthetic": true,
      "mls": "C-2004",
      "community": "Lake Bonavista",
      "district": "West",
      "sameDistrict": true,
      "distanceKm": 1.8,
      "contractDate": "2025-12-28",
      "contractMonth": "2025-12",
      "ageDays": 155,
      "price": 1024659,
      "gla": 2040,
      "lot": 7100,
      "beds": 4,
      "baths": "3F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1996,
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
          "sub": "2,040 sf (+140)",
          "adj": -11900
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "7,100 sf (+700)",
          "adj": 0
        },
        {
          "key": "bed",
          "label": "Bedrooms",
          "sub": "4 (=)",
          "adj": 0
        },
        {
          "key": "bath",
          "label": "Bathrooms",
          "sub": "3F / 1H (=)",
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
          "sub": "1996 (=)",
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
          "adj": 20900
        }
      ],
      "tf": 0.020404,
      "bmContract": 985100,
      "timeAdj": 20900,
      "net": 9000,
      "gross": 32800,
      "adjusted": 1033659,
      "netPct": 0.8783,
      "grossPct": 3.2011,
      "linePct": 2.0397,
      "ppsf": 502
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
          "= West (subject)"
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
          "West + directly-adjacent"
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
          "West + adjacent (unchanged)"
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
    "S-A": 0.2782,
    "S-B": 0.2444,
    "S-C": 0.2121,
    "S-D": 0.1674,
    "S-E": 0.0978
  },
  "weightDrivers": {
    "S-A": {
      "similarity": "high",
      "recency": "35 d",
      "distance": "0.6 km",
      "burden": "1.5% gross"
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
      "burden": "0.9% gross"
    },
    "S-D": {
      "similarity": "high",
      "recency": "101 d",
      "distance": "1.5 km",
      "burden": "1.9% gross"
    },
    "S-E": {
      "similarity": "moderate",
      "recency": "155 d",
      "distance": "1.8 km",
      "burden": "3.2% gross"
    }
  },
  "range": {
    "low": 1022000,
    "point": 1030500,
    "high": 1039000,
    "spreadPct": 1.65
  },
  "adjustedVals": [
    1016569,
    1043534,
    1030893,
    1032079,
    1033659
  ],
  "confidence": {
    "base": 0.55,
    "score": 0.8059,
    "low": 0.7559,
    "high": 0.8559,
    "band": "HIGH",
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
        "detail": "$26,965 range · 1.6% of point",
        "contrib": 0.1387
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
        "detail": "worst comp at 3.2% gross",
        "contrib": 0.0208
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
      "detail": "Max net adjustment 1.5% — within the 15% tolerance."
    },
    {
      "code": "GROSS_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any selected comp gross adj > 25%",
      "detail": "Max gross adjustment 3.2% — within the 25% tolerance."
    },
    {
      "code": "LINE_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any single line adj > 10%",
      "detail": "Largest single line 2.0% of price — within the 10% tolerance."
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
      "status": "CLEAR",
      "severity": "review",
      "trigger": "time adj applied without an encoded district series (fallback/extrapolated)",
      "detail": "Every selected comp's time adjustment used its encoded district series."
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
    "scope": "This memo documents a sales-comparison analysis supporting a defensible value RANGE for the subject property as of the effective date, prepared for collateral-underwriting review. It builds and documents the case for a range; it does not render a point value or a lending decision.",
    "selection": "5 comparable sales were retained from 5 retrieved candidates. Selection began in the tight tier-0 band (subject district, within six months) and widened to tier 2 only as needed to reach the minimum count. 0 candidates were rejected under documented reason codes () — the rejections are the tell a black-box AVM cannot give.",
    "adjustment": "Each comparable was adjusted to the subject on a transparent grid using a fixed rate card, with time adjustments derived from each comparable's contract month against the CREB district benchmark and applied toward the effective date. No comparable exceeded the gross-adjustment review band.",
    "reconciliation": "Adjusted values were reconciled by weight rather than simple average, emphasising the most similar, most recent, and least-adjusted evidence. The weighted central indication is $1,030,500, within a supported range of $1,022,000 to $1,039,000 (spread 1.6%) that brackets the adjusted comparables.",
    "confidence": "Confidence is assessed HIGH (0.81). 2 human-review flags fired and are documented below; none constitutes a failure — each is a prompt for reviewer narrative under AIC guidance.",
    "limiting": "All comparable data shown is SYNTHETIC and illustrative, priced from an explicit contributory model (the matched pair). Subject characteristics are grounded in Open Calgary assessment data (source: open_calgary_assessment); physical attributes are intake/district-typical where the free dataset does not publish them. Every non-CREB dollar magnitude is a US/North-American proxy to be locally calibrated. This artifact is render-only and contains no live computation."
  }
};

  // timeFactor is data-dependent (uses the emitted benchmark map), so it is
  // reconstructed here from DATA rather than hard-coded.
  const bm = DATA.bm;
  const BM_EFF = bm[DATA.meta.effectiveDate.slice(0, 7)];
  const timeFactor = (month) => BM_EFF / bm[month] - 1;

  return Object.assign({ usd0, sgn, pct, timeFactor }, DATA);
})();
