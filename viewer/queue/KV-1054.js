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
    "caseId": "KV-CMP-2026-2-01",
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
    "southBenchmark": 799000,
    "cityBenchmark": 747800,
    "ppsf": 474,
    "series": "CREB · Detached · North West District · monthly benchmark"
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
    "roll": "063·18·552·01",
    "addr": "40xx Brentwood Road NW",
    "addrNote": "civic address partially masked for review packet",
    "community": "North West district",
    "district": "North West",
    "quadrant": "NW",
    "landUse": "R-C1 · Residential Contextual One Dwelling",
    "assessedValue": 765000,
    "assessmentRollYear": 2026,
    "assessmentValDate": "2025-07-01",
    "ppsfAssessed": 478,
    "propertyType": "Single-family detached",
    "gla": 1600,
    "lot": 5600,
    "beds": 4,
    "bathFull": 2,
    "bathHalf": 1,
    "basementSf": 600,
    "basementFinished": true,
    "walkout": false,
    "garageStalls": 2,
    "garageType": "attached",
    "yearBuilt": 1990,
    "effDate": "2026-06-01",
    "condition": "C3",
    "quality": "Q3",
    "age": 36,
    "attrs": [
      [
        "Property type",
        "Single-family detached"
      ],
      [
        "Above-grade GLA",
        "1,600 sf"
      ],
      [
        "Site / lot",
        "5,600 sf"
      ],
      [
        "Bedrooms",
        "4"
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
        "1990 (36 yr)"
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
      "district": "North West",
      "sameDistrict": true,
      "distanceKm": 0.6,
      "contractDate": "2026-05-10",
      "contractMonth": "2026-05",
      "ageDays": 22,
      "price": 813428,
      "gla": 1480,
      "lot": 5000,
      "beds": 4,
      "baths": "2F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1990,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,480 sf (−120)",
          "adj": 10200
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,000 sf (−600)",
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
          "sub": "1990 (=)",
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
          "adj": -1700
        }
      ],
      "tf": -0.002099,
      "bmContract": 747800,
      "timeAdj": -1700,
      "net": 8500,
      "gross": 11900,
      "adjusted": 821928,
      "netPct": 1.045,
      "grossPct": 1.4629,
      "linePct": 1.254,
      "ppsf": 550
    },
    {
      "id": "F-B",
      "label": "COMP-B",
      "synthetic": true,
      "mls": "C-2001",
      "community": "Lake Bonavista",
      "district": "North West",
      "sameDistrict": true,
      "distanceKm": 0.9,
      "contractDate": "2026-04-17",
      "contractMonth": "2026-04",
      "ageDays": 45,
      "price": 812531,
      "gla": 1540,
      "lot": 5300,
      "beds": 4,
      "baths": "2F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1990,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,540 sf (−60)",
          "adj": 5100
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,300 sf (−300)",
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
          "sub": "1990 (=)",
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
          "adj": 900
        }
      ],
      "tf": 0.001113,
      "bmContract": 745400,
      "timeAdj": 900,
      "net": 6000,
      "gross": 6000,
      "adjusted": 818531,
      "netPct": 0.7384,
      "grossPct": 0.7384,
      "linePct": 0.6277,
      "ppsf": 528
    },
    {
      "id": "F-C",
      "label": "COMP-C",
      "synthetic": true,
      "mls": "C-2002",
      "community": "Lake Bonavista",
      "district": "North West",
      "sameDistrict": true,
      "distanceKm": 1.2,
      "contractDate": "2026-03-25",
      "contractMonth": "2026-03",
      "ageDays": 68,
      "price": 792051,
      "gla": 1600,
      "lot": 5600,
      "beds": 4,
      "baths": "2F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1990,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,600 sf (=)",
          "adj": 0
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,600 sf (=)",
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
          "sub": "1990 (=)",
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
          "adj": 5250
        }
      ],
      "tf": 0.00665,
      "bmContract": 741300,
      "timeAdj": 5250,
      "net": 5250,
      "gross": 5250,
      "adjusted": 797301,
      "netPct": 0.6628,
      "grossPct": 0.6628,
      "linePct": 0.6628,
      "ppsf": 495
    },
    {
      "id": "F-D",
      "label": "COMP-D",
      "synthetic": true,
      "mls": "C-2003",
      "community": "Lake Bonavista",
      "district": "North West",
      "sameDistrict": true,
      "distanceKm": 1.5,
      "contractDate": "2026-03-03",
      "contractMonth": "2026-03",
      "ageDays": 90,
      "price": 807962,
      "gla": 1670,
      "lot": 5950,
      "beds": 4,
      "baths": "2F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1990,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,670 sf (+70)",
          "adj": -5950
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,950 sf (+350)",
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
          "sub": "1990 (=)",
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
          "adj": 5350
        }
      ],
      "tf": 0.00665,
      "bmContract": 741300,
      "timeAdj": 5350,
      "net": -600,
      "gross": 11300,
      "adjusted": 807362,
      "netPct": -0.0743,
      "grossPct": 1.3986,
      "linePct": 0.7364,
      "ppsf": 484
    },
    {
      "id": "F-E",
      "label": "COMP-E",
      "synthetic": true,
      "mls": "C-2004",
      "community": "Lake Bonavista",
      "district": "North West",
      "sameDistrict": true,
      "distanceKm": 1.8,
      "contractDate": "2026-02-13",
      "contractMonth": "2026-02",
      "ageDays": 108,
      "price": 794351,
      "gla": 1740,
      "lot": 6300,
      "beds": 4,
      "baths": "2F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1990,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,740 sf (+140)",
          "adj": -11900
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "6,300 sf (+700)",
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
          "sub": "1990 (=)",
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
          "adj": 12900
        }
      ],
      "tf": 0.016247,
      "bmContract": 734300,
      "timeAdj": 12900,
      "net": 1000,
      "gross": 24800,
      "adjusted": 795351,
      "netPct": 0.1259,
      "grossPct": 3.122,
      "linePct": 1.624,
      "ppsf": 457
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
          "= North West (subject)"
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
    "F-A": 0.2661,
    "F-B": 0.2368,
    "F-C": 0.2069,
    "F-D": 0.1628,
    "F-E": 0.1275
  },
  "weightDrivers": {
    "F-A": {
      "similarity": "high",
      "recency": "22 d",
      "distance": "0.6 km",
      "burden": "1.5% gross"
    },
    "F-B": {
      "similarity": "high",
      "recency": "45 d",
      "distance": "0.9 km",
      "burden": "0.7% gross"
    },
    "F-C": {
      "similarity": "high",
      "recency": "68 d",
      "distance": "1.2 km",
      "burden": "0.7% gross"
    },
    "F-D": {
      "similarity": "high",
      "recency": "90 d",
      "distance": "1.5 km",
      "burden": "1.4% gross"
    },
    "F-E": {
      "similarity": "moderate",
      "recency": "108 d",
      "distance": "1.8 km",
      "burden": "3.1% gross"
    }
  },
  "range": {
    "low": 799500,
    "point": 810500,
    "high": 821500,
    "spreadPct": 2.71
  },
  "adjustedVals": [
    821928,
    818531,
    797301,
    807362,
    795351
  ],
  "confidence": {
    "base": 0.55,
    "score": 0.8853,
    "low": 0.8353,
    "high": 0.9353,
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
        "detail": "$26,577 range · 2.7% of point",
        "contrib": 0.1122
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
        "detail": "worst comp at 3.1% gross",
        "contrib": 0.0213
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
      "detail": "Max net adjustment 1.0% — within the 15% tolerance."
    },
    {
      "code": "GROSS_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any selected comp gross adj > 25%",
      "detail": "Max gross adjustment 3.1% — within the 25% tolerance."
    },
    {
      "code": "LINE_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any single line adj > 10%",
      "detail": "Largest single line 1.6% of price — within the 10% tolerance."
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
    "scope": "This sales comparison analysis supports market value estimation for 40xx Brentwood Road NW as of June 1, 2026. The subject property is located in Calgary's north west district with an assessed value of $765,000. The analysis employs synthetic comparable sales generated from Open Calgary assessment data, with the subject property grounded in the same municipal dataset. All monetary figures are expressed in Canadian dollars.",
    "selection": "The comparable selection process retrieved 5 potential sales and selected all 5 for analysis, with no rejections recorded. All selected comparables (F-A through F-E) are classified as tier 0 properties located within the same north west district as the subject. The selection demonstrates strong geographic consistency, with all comparables sharing the subject's district classification and meeting primary similarity criteria.",
    "adjustment": "Individual comparable adjustments range from 0.7% to 3.1% gross adjustment, with net adjustments spanning from -0.1% to 1.0%. Comparable F-E exhibits the highest gross adjustment burden at 3.1%, while F-D shows minimal net adjustment at -0.1%. The adjustment analysis flags reliance on city-wide fallback time adjustment series for all comparables (F-A through F-E), as no district-specific temporal benchmarks were encoded, rendering time adjustments approximate rather than district-calibrated.",
    "reconciliation": "The weighted analysis produces adjusted values ranging from $795,351 (F-E) to $821,928 (F-A), with weights distributed from 0.1275 to 0.2661 based on reliability metrics. The reconciliation yields a value range of $799,500 to $821,500, with a point estimate of $810,500 and a spread of 2.71%. The narrow spread indicates strong comparable consensus despite the temporal adjustment approximations flagged in the analysis.",
    "confidence": "The analysis achieves a HIGH confidence band with a score of 0.8853. Primary confidence drivers include comparable count contribution (0.11), adjusted-value spread contribution (0.1122), and recency contribution (0.0498). Distance and adjustment burden factors contribute 0.042 and 0.0213 respectively. Widening depth shows zero contribution, indicating no tier expansion was required. The high confidence score supports the reliability of the $799,500 to $821,500 value range.",
    "limiting": "This analysis is subject to the limitation that all comparable time adjustments rely on city-wide fallback series rather than district-specific temporal benchmarks, as flagged under code UNSUPPORTED_TIME_ADJ. This condition introduces approximation in temporal adjustments for the north west district market. The synthetic nature of comparable sales data, while grounded in Open Calgary assessment records, may not capture all market nuances present in actual transaction data. These limitations do not invalidate the analysis but require acknowledgment in valuation conclusions."
  },
  "agentTrace": {
    "intake": {
      "source": "deterministic",
      "reasoning": "Intake grounded 9 identity/assessment field(s) from Open Calgary (address, assessed_value, assessment_roll_year, district, land_use, lat, lon, roll_number, year_built); read 8 attribute(s) from the listing (basement_finished_sqft, beds_ag, full_baths, garage_stalls, garage_type, gla_sqft, half_baths, lot_sqft); and fell back to CREB district-typical values for 0 field(s) (none) the listing did not state. No physical value was estimated; absent fields are labelled district_typical.",
      "calls": [
        {
          "name": "lookup_open_calgary",
          "args": "address_or_roll=40xx Brentwood Road NW",
          "result": "{\"address\": \"40xx Brentwood Road NW\", \"district\": \"north_west\", \"lat\": 51.085, \"lon\": -114.134, \"roll_number\": \"063-18-552-01\", \"assessed_value\": 765000, \"land_use\": \"R-C1\", \"assessment_roll_year\": 2026, \"year_built\": 1990}"
        },
        {
          "name": "parse_listing_field",
          "args": "field=gla_sqft",
          "result": "gla_sqft=1600 (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=lot_sqft",
          "result": "lot_sqft=5600 (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=beds_ag",
          "result": "beds_ag=4 (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=full_baths",
          "result": "full_baths=2 (from listing)"
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
