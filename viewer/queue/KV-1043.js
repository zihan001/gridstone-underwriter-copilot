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
    "caseId": "KV-CMP-2026-8-09",
    "snapshot": "2026-06-01T00:00:00-06:00",
    "effectiveDate": "2026-06-01",
    "approach": "Sales Comparison Approach",
    "analyst": "model:underwrite-copilot v1.0.0",
    "purpose": "Defend a value RANGE for collateral review — never a point decision."
  },
  "narrativeSource": "llm",
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
    "roll": "091·44·218·09",
    "addr": "120xx Canso Place SW",
    "addrNote": "civic address partially masked for review packet",
    "community": "West district",
    "district": "West",
    "quadrant": "SW",
    "landUse": "R-C1 · Residential Contextual One Dwelling",
    "assessedValue": 962000,
    "assessmentRollYear": 2026,
    "assessmentValDate": "2025-07-01",
    "ppsfAssessed": 529,
    "propertyType": "Single-family detached",
    "gla": 1820,
    "lot": 6100,
    "beds": 4,
    "bathFull": 3,
    "bathHalf": 1,
    "basementSf": 600,
    "basementFinished": true,
    "walkout": false,
    "garageStalls": 2,
    "garageType": "attached",
    "yearBuilt": 1998,
    "effDate": "2026-06-01",
    "condition": "C3",
    "quality": "Q3",
    "age": 28,
    "attrs": [
      [
        "Property type",
        "Single-family detached"
      ],
      [
        "Above-grade GLA",
        "1,820 sf"
      ],
      [
        "Site / lot",
        "6,100 sf"
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
        "1998 (28 yr)"
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
      "id": "F-B",
      "label": "COMP-B",
      "synthetic": true,
      "mls": "C-2001",
      "community": "Lake Bonavista",
      "district": "West",
      "sameDistrict": true,
      "distanceKm": 0.9,
      "contractDate": "2026-04-17",
      "contractMonth": "2026-04",
      "ageDays": 45,
      "price": 994938,
      "gla": 1760,
      "lot": 5800,
      "beds": 4,
      "baths": "3F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1998,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,760 sf (−60)",
          "adj": 5100
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,800 sf (−300)",
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
          "sub": "1998 (=)",
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
          "sub": "2026-04-17 → 2026-06-01",
          "adj": 4950
        }
      ],
      "tf": 0.004999,
      "bmContract": 1000200,
      "timeAdj": 4950,
      "net": 10050,
      "gross": 10050,
      "adjusted": 1004988,
      "netPct": 1.0101,
      "grossPct": 1.0101,
      "linePct": 0.5126,
      "ppsf": 565
    },
    {
      "id": "F-C",
      "label": "COMP-C",
      "synthetic": true,
      "mls": "C-2002",
      "community": "Lake Bonavista",
      "district": "West",
      "sameDistrict": true,
      "distanceKm": 1.2,
      "contractDate": "2026-03-25",
      "contractMonth": "2026-03",
      "ageDays": 68,
      "price": 1002802,
      "gla": 1820,
      "lot": 6100,
      "beds": 4,
      "baths": "3F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1998,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,820 sf (=)",
          "adj": 0
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "6,100 sf (=)",
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
          "sub": "1998 (=)",
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
          "sub": "2026-03-25 → 2026-06-01",
          "adj": 9250
        }
      ],
      "tf": 0.009237,
      "bmContract": 996000,
      "timeAdj": 9250,
      "net": 9250,
      "gross": 9250,
      "adjusted": 1012052,
      "netPct": 0.9224,
      "grossPct": 0.9224,
      "linePct": 0.9224,
      "ppsf": 551
    },
    {
      "id": "F-D",
      "label": "COMP-D",
      "synthetic": true,
      "mls": "C-2003",
      "community": "Lake Bonavista",
      "district": "West",
      "sameDistrict": true,
      "distanceKm": 1.5,
      "contractDate": "2026-03-03",
      "contractMonth": "2026-03",
      "ageDays": 90,
      "price": 1000905,
      "gla": 1890,
      "lot": 6450,
      "beds": 4,
      "baths": "3F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1998,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,890 sf (+70)",
          "adj": -5950
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "6,450 sf (+350)",
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
          "sub": "1998 (=)",
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
          "sub": "2026-03-03 → 2026-06-01",
          "adj": 9250
        }
      ],
      "tf": 0.009237,
      "bmContract": 996000,
      "timeAdj": 9250,
      "net": 3300,
      "gross": 15200,
      "adjusted": 1004205,
      "netPct": 0.3297,
      "grossPct": 1.5186,
      "linePct": 0.9242,
      "ppsf": 530
    },
    {
      "id": "F-E",
      "label": "COMP-E",
      "synthetic": true,
      "mls": "C-2004",
      "community": "Lake Bonavista",
      "district": "West",
      "sameDistrict": true,
      "distanceKm": 1.8,
      "contractDate": "2026-02-13",
      "contractMonth": "2026-02",
      "ageDays": 108,
      "price": 1019999,
      "gla": 1960,
      "lot": 6800,
      "beds": 4,
      "baths": "3F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1998,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,960 sf (+140)",
          "adj": -11900
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "6,800 sf (+700)",
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
          "sub": "1998 (=)",
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
          "sub": "2026-02-13 → 2026-06-01",
          "adj": 13800
        }
      ],
      "tf": 0.013511,
      "bmContract": 991800,
      "timeAdj": 13800,
      "net": 1900,
      "gross": 25700,
      "adjusted": 1021899,
      "netPct": 0.1863,
      "grossPct": 2.5196,
      "linePct": 1.3529,
      "ppsf": 520
    }
  ],
  "rejected": [
    {
      "id": "F-A",
      "label": "COMP-A",
      "synthetic": true,
      "mls": "C-2000",
      "code": "OUTLIER_PRICE",
      "community": "Lake Bonavista",
      "district": "West",
      "contractDate": "2026-05-10",
      "price": 1017857,
      "gla": 1700,
      "ppsf": 599,
      "detail": "PPSF $599 sits 2.3 MAD high of the candidate median ($551). Probable non-arm's-length / distressed transfer — excluded as a price outlier rather than market evidence.",
      "metricLabel": "PPSF deviation",
      "metricValue": "2.3 MAD high",
      "cap": "≤ 2.0 MAD"
    }
  ],
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
      "found": 4,
      "note": null,
      "penalty": 0.0
    }
  ],
  "searchSummary": {
    "retrieved": 5,
    "selected": 4,
    "rejected": 1,
    "finalTier": 0,
    "wideningDepth": 0,
    "totalPenalty": 0.0
  },
  "weights": {
    "F-B": 0.3219,
    "F-C": 0.2801,
    "F-D": 0.2218,
    "F-E": 0.1761
  },
  "weightDrivers": {
    "F-B": {
      "similarity": "high",
      "recency": "45 d",
      "distance": "0.9 km",
      "burden": "1.0% gross"
    },
    "F-C": {
      "similarity": "high",
      "recency": "68 d",
      "distance": "1.2 km",
      "burden": "0.9% gross"
    },
    "F-D": {
      "similarity": "high",
      "recency": "90 d",
      "distance": "1.5 km",
      "burden": "1.5% gross"
    },
    "F-E": {
      "similarity": "moderate",
      "recency": "108 d",
      "distance": "1.8 km",
      "burden": "2.5% gross"
    }
  },
  "range": {
    "low": 1001500,
    "point": 1009500,
    "high": 1017500,
    "spreadPct": 1.58
  },
  "adjustedVals": [
    1004988,
    1012052,
    1004205,
    1021899
  ],
  "confidence": {
    "base": 0.55,
    "score": 0.8801,
    "low": 0.8301,
    "high": 0.9301,
    "band": "HIGH",
    "drivers": [
      {
        "key": "compCount",
        "label": "Comp count",
        "detail": "4 selected (≥ minimum 4)",
        "contrib": 0.08
      },
      {
        "key": "spread",
        "label": "Adjusted-value spread",
        "detail": "$17,694 range · 1.6% of point",
        "contrib": 0.1405
      },
      {
        "key": "recency",
        "label": "Recency",
        "detail": "median contract age 79 days",
        "contrib": 0.0449
      },
      {
        "key": "distance",
        "label": "Distance",
        "detail": "0.9–1.8 km · 0 adjacent-district",
        "contrib": 0.0398
      },
      {
        "key": "burden",
        "label": "Adjustment burden",
        "detail": "worst comp at 2.5% gross",
        "contrib": 0.0249
      },
      {
        "key": "widening",
        "label": "Widening depth",
        "detail": "tier-0 reached (depth 0)",
        "contrib": 0.0
      }
    ]
  },
  "flags": [
    {
      "code": "DEEP_WIDENING",
      "status": "CLEAR",
      "severity": "review",
      "trigger": "search reached tier ≥ 2",
      "detail": "Selection completed within the tight band; no deep widening required."
    },
    {
      "code": "STALE_COMP",
      "status": "CLEAR",
      "severity": "review",
      "trigger": "any selected comp contract age > 120 days",
      "detail": "All selected comps contract within 120 days."
    },
    {
      "code": "THIN_COMP_SET",
      "status": "CLEAR",
      "severity": "review",
      "trigger": "selected comp count < 4",
      "detail": "4 comps selected — at or above the minimum of 4."
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
      "detail": "Max net adjustment 1.0% — within the 15% tolerance."
    },
    {
      "code": "GROSS_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any selected comp gross adj > 25%",
      "detail": "Max gross adjustment 2.5% — within the 25% tolerance."
    },
    {
      "code": "LINE_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any single line adj > 10%",
      "detail": "Largest single line 1.4% of price — within the 10% tolerance."
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
    "scope": "This sales comparison analysis values 120xx Canso Place SW in Calgary's west district as of June 1, 2026. The deterministic engine retrieved 5 comparable sales, selected 4 for analysis, and rejected 1. All selected comparables are located within the same district. The subject property data is grounded in Open Calgary assessment records showing an assessed value of $962,000. All comparable sales data represents synthetic transactions generated for analytical purposes.",
    "selection": "The engine selected 4 of 5 retrieved comparables for final analysis. Comparable F-A was rejected due to OUTLIER_PRICE classification, registering 2.3 MAD high relative to the market baseline. The 4 selected comparables (F-B, F-C, F-D, F-E) all achieved tier 0 status and same-district matching, providing optimal comparability for the subject property. No final-tier comparables were required, indicating sufficient primary-tier market evidence.",
    "adjustment": "Adjustment analysis shows varied modification requirements across the selected set. Comparable F-B required minimal intervention with 1.0% gross and net adjustment ratios. F-C showed moderate adjustments at 0.9% net ratio. F-D and F-E required more substantial modifications, with gross adjustment percentages of 1.5% and 2.5% respectively, though net adjustments remained controlled at 0.3% and 0.2%. All adjusted values cluster tightly between $1,004,205 and $1,021,899, supporting reliable value indication.",
    "reconciliation": "The weighted analysis produces a value range of $1,001,500 to $1,017,500 with a point estimate of $1,009,500. The range spread of 1.58% demonstrates strong market consensus. Comparable weights reflect adjustment burden and reliability: F-B carries highest weight at 0.3219, followed by F-C at 0.2801, F-D at 0.2218, and F-E at 0.1761. The reconciled range represents the most probable value corridor given current market conditions and comparable evidence quality.",
    "confidence": "The analysis achieves HIGH confidence with a score of 0.8801. Primary confidence drivers include adjusted-value spread contributing 0.1405 to the score and comparable count adding 0.08. Secondary factors show recency contribution of 0.0449, distance factor of 0.0398, and adjustment burden impact of 0.0249. Widening depth contributed 0.0 as no tier expansion was required. No analytical flags were triggered during processing, supporting the HIGH confidence classification.",
    "limiting": "This analysis relies on synthetic comparable sales data and Open Calgary assessment records. The effective date of June 1, 2026 represents a forward-looking valuation scenario. Market conditions, regulatory changes, or economic factors occurring after the data compilation date could materially affect actual market values. The deterministic engine outputs reflect computational modeling and should be considered within the context of broader market analysis and professional judgment."
  },
  "agentTrace": {
    "intake": {
      "source": "llm",
      "reasoning": "## Subject Property Record\n\n**Property Identity:**\n- Address: 120xx Canso Place SW\n- Roll Number: 091-44-218-09\n- District: west\n- Coordinates: 51.0207, -114.1573\n- Land Use: R-C1\n- Assessed Value: $962,000 (2026)\n\n**Physical Characteristics:**\n- GLA: 1,820 sq ft (from listing)\n- Lot Size: 6,100 sq ft (from listing)\n- Bedrooms Above Grade: 4 (from listing)\n- Full Baths: 3 (from listing)\n- Half Baths: 1 (from listing)\n- Year Built: 1998 (grounded from Open Calgary)\n- Basement Finished: 600 sq ft (from listing)\n- Basement Walkout: Not specified in listing; no district default available\n- Garage Type: Attached (from listing)\n- Garage Stalls: 2 (from listing)\n\n**Intake Reasoning:** The property was successfully grounded through Open Calgary using the address, establishing its west district location and confirming the year built (1998). Most physical characteristics were clearly stated in the listing text, including square footages, bedroom/bathroom counts, and garage details. The basement walkout status was not mentioned in the listing and no district-typical fallback was available for this field. All other key property attributes were successfully extracted either from the grounded data or the listing description.",
      "calls": [
        {
          "name": "lookup_open_calgary",
          "args": "address_or_roll=120xx Canso Place SW",
          "result": "{\"address\": \"120xx Canso Place SW\", \"district\": \"west\", \"lat\": 51.0207, \"lon\": -114.1573, \"roll_number\": \"091-44-218-09\", \"assessed_value\": 962000, \"land_use\": \"R-C1\", \"assessment_roll_year\": 2026, \"year_built\": 1998}"
        },
        {
          "name": "parse_listing_field",
          "args": "field=gla_sqft",
          "result": "gla_sqft=1820 (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=lot_sqft",
          "result": "lot_sqft=6100 (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=beds_ag",
          "result": "beds_ag=4 (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=full_baths",
          "result": "full_baths=3 (from listing)"
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
          "args": "district=west, field=basement_walkout",
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
