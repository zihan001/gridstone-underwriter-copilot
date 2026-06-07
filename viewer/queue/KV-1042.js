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
    "caseId": "KV-CMP-2026-5-07",
    "snapshot": "2026-06-01T00:00:00-06:00",
    "effectiveDate": "2026-06-01",
    "approach": "Sales Comparison Approach",
    "analyst": "model:underwrite-copilot v1.0.0",
    "purpose": "Defend a value RANGE for collateral review — never a point decision."
  },
  "benchmark": [
    {
      "m": "2025-06",
      "v": 690000
    },
    {
      "m": "2025-07",
      "v": 694000
    },
    {
      "m": "2025-08",
      "v": 697500
    },
    {
      "m": "2025-09",
      "v": 700000
    },
    {
      "m": "2025-10",
      "v": 703000
    },
    {
      "m": "2025-11",
      "v": 705500
    },
    {
      "m": "2025-12",
      "v": 707200
    },
    {
      "m": "2026-01",
      "v": 709000
    },
    {
      "m": "2026-02",
      "v": 712000
    },
    {
      "m": "2026-03",
      "v": 715000
    },
    {
      "m": "2026-04",
      "v": 718000
    },
    {
      "m": "2026-05",
      "v": 720500
    },
    {
      "m": "2026-06",
      "v": 721600
    }
  ],
  "bm": {
    "2025-06": 690000,
    "2025-07": 694000,
    "2025-08": 697500,
    "2025-09": 700000,
    "2025-10": 703000,
    "2025-11": 705500,
    "2025-12": 707200,
    "2026-01": 709000,
    "2026-02": 712000,
    "2026-03": 715000,
    "2026-04": 718000,
    "2026-05": 720500,
    "2026-06": 721600
  },
  "marketContext": {
    "southBenchmark": 721600,
    "cityBenchmark": 747800,
    "ppsf": 474,
    "series": "CREB · Detached · South District · monthly benchmark"
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
    "roll": "074·21·335·07",
    "addr": "84xx Bonaventure Drive SE",
    "addrNote": "civic address partially masked for review packet",
    "community": "South district",
    "district": "South",
    "quadrant": "SE",
    "landUse": "R-C1 · Residential Contextual One Dwelling",
    "assessedValue": 687500,
    "assessmentRollYear": 2026,
    "assessmentValDate": "2025-07-01",
    "ppsfAssessed": 474,
    "propertyType": "Single-family detached",
    "gla": 1450,
    "lot": 5242,
    "beds": 3,
    "bathFull": 2,
    "bathHalf": 1,
    "basementSf": 600,
    "basementFinished": true,
    "walkout": false,
    "garageStalls": 2,
    "garageType": "attached",
    "yearBuilt": 1984,
    "effDate": "2026-06-01",
    "condition": "C3",
    "quality": "Q3",
    "age": 42,
    "attrs": [
      [
        "Property type",
        "Single-family detached"
      ],
      [
        "Above-grade GLA",
        "1,450 sf"
      ],
      [
        "Site / lot",
        "5,242 sf"
      ],
      [
        "Bedrooms",
        "3"
      ],
      [
        "Bathrooms",
        "2 full / 1 half"
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
        "1984 (42 yr)"
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
      "id": "F-A",
      "label": "COMP-A",
      "synthetic": true,
      "mls": "C-2000",
      "community": "Lake Bonavista",
      "district": "South",
      "sameDistrict": true,
      "distanceKm": 0.6,
      "contractDate": "2026-05-10",
      "contractMonth": "2026-05",
      "ageDays": 22,
      "price": 712239,
      "gla": 1330,
      "lot": 4642,
      "beds": 3,
      "baths": "2F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1984,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,330 sf (−120)",
          "adj": 10200
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "4,642 sf (−600)",
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
          "sub": "2F / 1H (=)",
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
          "sub": "1984 (=)",
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
          "sub": "2026-05-10 → 2026-06-01",
          "adj": 1100
        }
      ],
      "tf": 0.001527,
      "bmContract": 720500,
      "timeAdj": 1100,
      "net": 11300,
      "gross": 11300,
      "adjusted": 723539,
      "netPct": 1.5865,
      "grossPct": 1.5865,
      "linePct": 1.4321,
      "ppsf": 536
    },
    {
      "id": "F-B",
      "label": "COMP-B",
      "synthetic": true,
      "mls": "C-2001",
      "community": "Lake Bonavista",
      "district": "South",
      "sameDistrict": true,
      "distanceKm": 0.9,
      "contractDate": "2026-04-17",
      "contractMonth": "2026-04",
      "ageDays": 45,
      "price": 706056,
      "gla": 1390,
      "lot": 4942,
      "beds": 3,
      "baths": "2F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1984,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,390 sf (−60)",
          "adj": 5100
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "4,942 sf (−300)",
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
          "sub": "2F / 1H (=)",
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
          "sub": "1984 (=)",
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
          "adj": 3550
        }
      ],
      "tf": 0.005014,
      "bmContract": 718000,
      "timeAdj": 3550,
      "net": 8650,
      "gross": 8650,
      "adjusted": 714706,
      "netPct": 1.2251,
      "grossPct": 1.2251,
      "linePct": 0.7223,
      "ppsf": 508
    },
    {
      "id": "F-C",
      "label": "COMP-C",
      "synthetic": true,
      "mls": "C-2002",
      "community": "Lake Bonavista",
      "district": "South",
      "sameDistrict": true,
      "distanceKm": 1.2,
      "contractDate": "2026-03-25",
      "contractMonth": "2026-03",
      "ageDays": 68,
      "price": 720303,
      "gla": 1450,
      "lot": 5242,
      "beds": 3,
      "baths": "2F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1984,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,450 sf (=)",
          "adj": 0
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,242 sf (=)",
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
          "sub": "2F / 1H (=)",
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
          "sub": "1984 (=)",
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
          "adj": 6650
        }
      ],
      "tf": 0.009231,
      "bmContract": 715000,
      "timeAdj": 6650,
      "net": 6650,
      "gross": 6650,
      "adjusted": 726953,
      "netPct": 0.9232,
      "grossPct": 0.9232,
      "linePct": 0.9232,
      "ppsf": 497
    },
    {
      "id": "F-D",
      "label": "COMP-D",
      "synthetic": true,
      "mls": "C-2003",
      "community": "Lake Bonavista",
      "district": "South",
      "sameDistrict": true,
      "distanceKm": 1.5,
      "contractDate": "2026-03-03",
      "contractMonth": "2026-03",
      "ageDays": 90,
      "price": 716671,
      "gla": 1520,
      "lot": 5592,
      "beds": 3,
      "baths": "2F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1984,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,520 sf (+70)",
          "adj": -5950
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,592 sf (+350)",
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
          "sub": "2F / 1H (=)",
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
          "sub": "1984 (=)",
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
          "adj": 6600
        }
      ],
      "tf": 0.009231,
      "bmContract": 715000,
      "timeAdj": 6600,
      "net": 650,
      "gross": 12550,
      "adjusted": 717321,
      "netPct": 0.0907,
      "grossPct": 1.7512,
      "linePct": 0.9209,
      "ppsf": 471
    },
    {
      "id": "F-E",
      "label": "COMP-E",
      "synthetic": true,
      "mls": "C-2004",
      "community": "Lake Bonavista",
      "district": "South",
      "sameDistrict": true,
      "distanceKm": 1.8,
      "contractDate": "2026-02-13",
      "contractMonth": "2026-02",
      "ageDays": 108,
      "price": 720756,
      "gla": 1590,
      "lot": 5942,
      "beds": 3,
      "baths": "2F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1984,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,590 sf (+140)",
          "adj": -11900
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,942 sf (+700)",
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
          "sub": "2F / 1H (=)",
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
          "sub": "1984 (=)",
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
          "adj": 9700
        }
      ],
      "tf": 0.013483,
      "bmContract": 712000,
      "timeAdj": 9700,
      "net": -2200,
      "gross": 21600,
      "adjusted": 718556,
      "netPct": -0.3052,
      "grossPct": 2.9969,
      "linePct": 1.651,
      "ppsf": 453
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
          "= South (subject)"
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
    }
  ],
  "searchSummary": {
    "retrieved": 5,
    "selected": 5,
    "rejected": 0,
    "finalTier": 0,
    "wideningDepth": 0,
    "totalPenalty": 0.0
  },
  "weights": {
    "F-A": 0.2657,
    "F-B": 0.2365,
    "F-C": 0.2078,
    "F-D": 0.1626,
    "F-E": 0.1273
  },
  "weightDrivers": {
    "F-A": {
      "similarity": "high",
      "recency": "22 d",
      "distance": "0.6 km",
      "burden": "1.6% gross"
    },
    "F-B": {
      "similarity": "high",
      "recency": "45 d",
      "distance": "0.9 km",
      "burden": "1.2% gross"
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
      "burden": "1.8% gross"
    },
    "F-E": {
      "similarity": "moderate",
      "recency": "108 d",
      "distance": "1.8 km",
      "burden": "3.0% gross"
    }
  },
  "range": {
    "low": 714500,
    "point": 720500,
    "high": 726500,
    "spreadPct": 1.67
  },
  "adjustedVals": [
    723539,
    714706,
    726953,
    717321,
    718556
  ],
  "confidence": {
    "base": 0.55,
    "score": 0.912,
    "low": 0.862,
    "high": 0.962,
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
        "detail": "$12,247 range · 1.7% of point",
        "contrib": 0.1382
      },
      {
        "key": "recency",
        "label": "Recency",
        "detail": "median contract age 68 days",
        "contrib": 0.0498
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
        "detail": "worst comp at 3.0% gross",
        "contrib": 0.022
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
      "detail": "Max net adjustment 1.6% — within the 15% tolerance."
    },
    {
      "code": "GROSS_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any selected comp gross adj > 25%",
      "detail": "Max gross adjustment 3.0% — within the 25% tolerance."
    },
    {
      "code": "LINE_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any single line adj > 10%",
      "detail": "Largest single line 1.7% of price — within the 10% tolerance."
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
      "detail": "Raw (pre-adjustment) price spread 2% within the 30% watch."
    }
  ],
  "aicNote": "AIC guidance: lender net/gross/line tolerances are screening aids, not appraisal rules. A breach is a flag for narrative support — it does not supersede good appraisal practice or invalidate an otherwise well-supported comparable.",
  "narrative": {
    "scope": "This memo documents a sales-comparison analysis supporting a defensible value RANGE for the subject property as of the effective date, prepared for collateral-underwriting review. It builds and documents the case for a range; it does not render a point value or a lending decision.",
    "selection": "5 comparable sales were retained from 5 retrieved candidates. Selection began in the tight tier-0 band (subject district, within six months) and widened to tier 0 only as needed to reach the minimum count. 0 candidates were rejected under documented reason codes () — the rejections are the tell a black-box AVM cannot give.",
    "adjustment": "Each comparable was adjusted to the subject on a transparent grid using a fixed rate card, with time adjustments derived from each comparable's contract month against the CREB district benchmark and applied toward the effective date. No comparable exceeded the gross-adjustment review band.",
    "reconciliation": "Adjusted values were reconciled by weight rather than simple average, emphasising the most similar, most recent, and least-adjusted evidence. The weighted central indication is $720,500, within a supported range of $714,500 to $726,500 (spread 1.7%) that brackets the adjusted comparables.",
    "confidence": "Confidence is assessed HIGH (0.91). No human-review flags fired.",
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
