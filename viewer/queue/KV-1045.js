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
    "caseId": "KV-CMP-2026-2502",
    "snapshot": "2026-06-01T00:00:00-06:00",
    "effectiveDate": "2026-06-01",
    "approach": "Sales Comparison Approach",
    "analyst": "model:underwrite-copilot v1.0.0",
    "purpose": "Defend a value RANGE for collateral review — never a point decision."
  },
  "narrativeSource": "template",
  "benchmark": [
    {
      "m": "2025-06",
      "v": 467700
    },
    {
      "m": "2025-07",
      "v": 470400
    },
    {
      "m": "2025-08",
      "v": 472800
    },
    {
      "m": "2025-09",
      "v": 474500
    },
    {
      "m": "2025-10",
      "v": 476500
    },
    {
      "m": "2025-11",
      "v": 478200
    },
    {
      "m": "2025-12",
      "v": 479300
    },
    {
      "m": "2026-01",
      "v": 480600
    },
    {
      "m": "2026-02",
      "v": 482600
    },
    {
      "m": "2026-03",
      "v": 484600
    },
    {
      "m": "2026-04",
      "v": 486700
    },
    {
      "m": "2026-05",
      "v": 488400
    },
    {
      "m": "2026-06",
      "v": 489100
    }
  ],
  "bm": {
    "2025-06": 467700,
    "2025-07": 470400,
    "2025-08": 472800,
    "2025-09": 474500,
    "2025-10": 476500,
    "2025-11": 478200,
    "2025-12": 479300,
    "2026-01": 480600,
    "2026-02": 482600,
    "2026-03": 484600,
    "2026-04": 486700,
    "2026-05": 488400,
    "2026-06": 489100
  },
  "marketContext": {
    "southBenchmark": 489100,
    "cityBenchmark": 747800,
    "ppsf": 474,
    "series": "CREB · Detached · East District · monthly benchmark"
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
    "roll": "579002502",
    "addr": "6920 15 AV SE",
    "addrNote": "civic address partially masked for review packet",
    "community": "East district",
    "district": "East",
    "quadrant": "SE",
    "landUse": "R-CG · Residential Contextual One Dwelling",
    "assessedValue": 465000,
    "assessmentRollYear": 2026,
    "assessmentValDate": "2025-07-01",
    "ppsfAssessed": 422,
    "propertyType": "Single-family detached",
    "gla": 1103,
    "lot": 4614,
    "beds": 3,
    "bathFull": 2,
    "bathHalf": 0,
    "basementSf": 600,
    "basementFinished": true,
    "walkout": false,
    "garageStalls": 2,
    "garageType": "attached",
    "yearBuilt": 1982,
    "effDate": "2026-06-01",
    "condition": "C3",
    "quality": "Q3",
    "age": 44,
    "attrs": [
      [
        "Property type",
        "Single-family detached"
      ],
      [
        "Above-grade GLA",
        "1,103 sf"
      ],
      [
        "Site / lot",
        "4,614 sf"
      ],
      [
        "Bedrooms",
        "3"
      ],
      [
        "Bathrooms",
        "2 full / 0 half"
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
        "1982 (44 yr)"
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
        "R-CG"
      ],
      [
        "Effective date",
        "2026-06-01"
      ]
    ]
  },
  "selected": [
    {
      "id": "G-A",
      "label": "COMP-A",
      "synthetic": true,
      "mls": "C-2000",
      "community": "Lake Bonavista",
      "district": "East",
      "sameDistrict": true,
      "distanceKm": 0.6,
      "contractDate": "2026-05-10",
      "contractMonth": "2026-05",
      "ageDays": 22,
      "price": 472080,
      "gla": 993,
      "lot": 4064,
      "beds": 3,
      "baths": "2F / 0H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1982,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "993 sf (−110)",
          "adj": 9350
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "4,064 sf (−550)",
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
          "sub": "2F / 0H (=)",
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
          "sub": "1982 (=)",
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
          "adj": 700
        }
      ],
      "tf": 0.001433,
      "bmContract": 488400,
      "timeAdj": 700,
      "net": 10050,
      "gross": 10050,
      "adjusted": 482130,
      "netPct": 2.1289,
      "grossPct": 2.1289,
      "linePct": 1.9806,
      "ppsf": 475
    },
    {
      "id": "G-B",
      "label": "COMP-B",
      "synthetic": true,
      "mls": "C-2001",
      "community": "Lake Bonavista",
      "district": "East",
      "sameDistrict": true,
      "distanceKm": 0.9,
      "contractDate": "2026-04-17",
      "contractMonth": "2026-04",
      "ageDays": 45,
      "price": 470316,
      "gla": 1023,
      "lot": 4214,
      "beds": 3,
      "baths": "2F / 0H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1982,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,023 sf (−80)",
          "adj": 6800
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "4,214 sf (−400)",
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
          "sub": "2F / 0H (=)",
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
          "sub": "1982 (=)",
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
          "adj": 2300
        }
      ],
      "tf": 0.004931,
      "bmContract": 486700,
      "timeAdj": 2300,
      "net": 9100,
      "gross": 9100,
      "adjusted": 479416,
      "netPct": 1.9349,
      "grossPct": 1.9349,
      "linePct": 1.4458,
      "ppsf": 460
    },
    {
      "id": "G-C",
      "label": "COMP-C",
      "synthetic": true,
      "mls": "C-2002",
      "community": "Lake Bonavista",
      "district": "East",
      "sameDistrict": true,
      "distanceKm": 1.2,
      "contractDate": "2026-03-25",
      "contractMonth": "2026-03",
      "ageDays": 68,
      "price": 474400,
      "gla": 1103,
      "lot": 4614,
      "beds": 3,
      "baths": "2F / 0H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1982,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,103 sf (=)",
          "adj": 0
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "4,614 sf (=)",
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
          "sub": "2F / 0H (=)",
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
          "sub": "1982 (=)",
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
          "adj": 4400
        }
      ],
      "tf": 0.009286,
      "bmContract": 484600,
      "timeAdj": 4400,
      "net": 4400,
      "gross": 4400,
      "adjusted": 478800,
      "netPct": 0.9275,
      "grossPct": 0.9275,
      "linePct": 0.9275,
      "ppsf": 430
    },
    {
      "id": "G-D",
      "label": "COMP-D",
      "synthetic": true,
      "mls": "C-2003",
      "community": "Lake Bonavista",
      "district": "East",
      "sameDistrict": true,
      "distanceKm": 1.5,
      "contractDate": "2026-03-03",
      "contractMonth": "2026-03",
      "ageDays": 90,
      "price": 478538,
      "gla": 1183,
      "lot": 5014,
      "beds": 3,
      "baths": "2F / 0H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1982,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,183 sf (+80)",
          "adj": -6800
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,014 sf (+400)",
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
          "sub": "2F / 0H (=)",
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
          "sub": "1982 (=)",
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
          "adj": 4450
        }
      ],
      "tf": 0.009286,
      "bmContract": 484600,
      "timeAdj": 4450,
      "net": -2350,
      "gross": 11250,
      "adjusted": 476188,
      "netPct": -0.4911,
      "grossPct": 2.3509,
      "linePct": 1.421,
      "ppsf": 405
    },
    {
      "id": "G-E",
      "label": "COMP-E",
      "synthetic": true,
      "mls": "C-2004",
      "community": "Lake Bonavista",
      "district": "East",
      "sameDistrict": true,
      "distanceKm": 1.8,
      "contractDate": "2026-02-13",
      "contractMonth": "2026-02",
      "ageDays": 108,
      "price": 474001,
      "gla": 1213,
      "lot": 5164,
      "beds": 3,
      "baths": "2F / 0H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1982,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,213 sf (+110)",
          "adj": -9350
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,164 sf (+550)",
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
          "sub": "2F / 0H (=)",
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
          "sub": "1982 (=)",
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
          "adj": 6400
        }
      ],
      "tf": 0.013469,
      "bmContract": 482600,
      "timeAdj": 6400,
      "net": -2950,
      "gross": 15750,
      "adjusted": 471051,
      "netPct": -0.6224,
      "grossPct": 3.3228,
      "linePct": 1.9726,
      "ppsf": 391
    }
  ],
  "rejected": [
    {
      "id": "C-E",
      "label": "COMP-E",
      "synthetic": true,
      "mls": "C-1804",
      "code": "TOO_STALE",
      "community": "Lake Bonavista",
      "district": "East",
      "contractDate": "2025-04-22",
      "price": 495086,
      "gla": 1460,
      "ppsf": 339,
      "detail": "Contract 2025-04-22 is 405 days stale — exceeds the tier-2 maximum window (≤ 274 days / ~9 mo). Pre-dates the current benchmark trend; the implied time adjustment would be unreliable.",
      "metricLabel": "contract age",
      "metricValue": "405 days",
      "cap": "≤ 274 days"
    },
    {
      "id": "C-F",
      "label": "COMP-F",
      "synthetic": true,
      "mls": "C-2233",
      "code": "GROSS_ADJ_TOO_HIGH",
      "community": "Lake Bonavista",
      "district": "East",
      "contractDate": "2026-03-29",
      "price": 748424,
      "gla": 2303,
      "ppsf": 325,
      "detail": "Cumulative gross adjustment 39.1% exceeds the 25% hard cap. Too dissimilar to bracket the subject — not comparable.",
      "metricLabel": "gross adjustment",
      "metricValue": "39.1%",
      "cap": "≤ 25.0%"
    },
    {
      "id": "C-G",
      "label": "COMP-G",
      "synthetic": true,
      "mls": "C-2170",
      "code": "WRONG_DISTRICT_AFTER_WIDENING",
      "community": "Glamorgan",
      "district": "West",
      "contractDate": "2026-02-14",
      "price": 474942,
      "gla": 1103,
      "ppsf": 431,
      "detail": "West is not adjacent to the subject district under the tier-1 topology map (no shared boundary). Excluded before adjustment to avoid a cross-market location bridge.",
      "metricLabel": "district",
      "metricValue": "West (non-adj.)",
      "cap": "East ± adjacent"
    },
    {
      "id": "C-H",
      "label": "COMP-H",
      "synthetic": true,
      "mls": "C-2195",
      "code": "OUTLIER_PRICE",
      "community": "Lake Bonavista",
      "district": "East",
      "contractDate": "2026-03-12",
      "price": 264330,
      "gla": 1470,
      "ppsf": 180,
      "detail": "PPSF $180 sits 8.3 MAD low of the candidate median ($430). Probable non-arm's-length / distressed transfer — excluded as a price outlier rather than market evidence.",
      "metricLabel": "PPSF deviation",
      "metricValue": "8.3 MAD low",
      "cap": "≤ 2.0 MAD"
    },
    {
      "id": "C-I",
      "label": "COMP-I",
      "synthetic": true,
      "mls": "C-7741",
      "code": "DUPLICATE",
      "community": "Lake Bonavista",
      "district": "East",
      "contractDate": "2025-04-22",
      "price": 495086,
      "gla": 1460,
      "ppsf": 339,
      "detail": "Resolves to the same parcel already represented by COMP-E (re-list under a second MLS number). Deduplicated to avoid double-counting one sale.",
      "metricLabel": "parcel",
      "metricValue": "= COMP-E",
      "cap": "unique parcels"
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
          "= East (subject)"
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
    "retrieved": 10,
    "selected": 5,
    "rejected": 5,
    "finalTier": 0,
    "wideningDepth": 0,
    "totalPenalty": 0.0
  },
  "weights": {
    "G-A": 0.2658,
    "G-B": 0.2322,
    "G-C": 0.2115,
    "G-D": 0.1608,
    "G-E": 0.1296
  },
  "weightDrivers": {
    "G-A": {
      "similarity": "high",
      "recency": "22 d",
      "distance": "0.6 km",
      "burden": "2.1% gross"
    },
    "G-B": {
      "similarity": "high",
      "recency": "45 d",
      "distance": "0.9 km",
      "burden": "1.9% gross"
    },
    "G-C": {
      "similarity": "high",
      "recency": "68 d",
      "distance": "1.2 km",
      "burden": "0.9% gross"
    },
    "G-D": {
      "similarity": "high",
      "recency": "90 d",
      "distance": "1.5 km",
      "burden": "2.4% gross"
    },
    "G-E": {
      "similarity": "moderate",
      "recency": "108 d",
      "distance": "1.8 km",
      "burden": "3.3% gross"
    }
  },
  "range": {
    "low": 474500,
    "point": 478500,
    "high": 482500,
    "spreadPct": 1.67
  },
  "adjustedVals": [
    482130,
    479416,
    478800,
    476188,
    471051
  ],
  "confidence": {
    "base": 0.55,
    "score": 0.9101,
    "low": 0.8601,
    "high": 0.9601,
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
        "detail": "$11,079 range · 1.7% of point",
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
        "detail": "worst comp at 3.3% gross",
        "contrib": 0.0201
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
      "detail": "Max net adjustment 2.1% — within the 15% tolerance."
    },
    {
      "code": "GROSS_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any selected comp gross adj > 25%",
      "detail": "Max gross adjustment 3.3% — within the 25% tolerance."
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
      "detail": "Raw (pre-adjustment) price spread 2% within the 30% watch."
    }
  ],
  "aicNote": "AIC guidance: lender net/gross/line tolerances are screening aids, not appraisal rules. A breach is a flag for narrative support — it does not supersede good appraisal practice or invalidate an otherwise well-supported comparable.",
  "narrative": {
    "scope": "This memo documents a sales-comparison analysis supporting a defensible value RANGE for the subject property as of the effective date, prepared for collateral-underwriting review. It builds and documents the case for a range; it does not render a point value or a lending decision.",
    "selection": "5 comparable sales were retained from 10 retrieved candidates. Selection began in the tight tier-0 band (subject district, within six months) and widened to tier 0 only as needed to reach the minimum count. 5 candidates were rejected under documented reason codes (duplicate, gross adj too high, outlier price, too stale, wrong district after widening) — the rejections are the tell a black-box AVM cannot give.",
    "adjustment": "Each comparable was adjusted to the subject on a transparent grid using a fixed rate card, with time adjustments derived from each comparable's contract month against the CREB district benchmark and applied toward the effective date. No comparable exceeded the gross-adjustment review band.",
    "reconciliation": "Adjusted values were reconciled by weight rather than simple average, emphasising the most similar, most recent, and least-adjusted evidence. The weighted central indication is $478,500, within a supported range of $474,500 to $482,500 (spread 1.7%) that brackets the adjusted comparables.",
    "confidence": "Confidence is assessed HIGH (0.91). No human-review flags fired.",
    "limiting": "All comparable data shown is SYNTHETIC and illustrative, priced from an explicit contributory model (the matched pair). Subject characteristics are grounded in Open Calgary assessment data (source: open_calgary_assessment); physical attributes are intake/district-typical where the free dataset does not publish them. Every non-CREB dollar magnitude is a US/North-American proxy to be locally calibrated. This artifact is render-only and contains no live computation."
  },
  "agentTrace": {
    "intake": {
      "source": "deterministic",
      "reasoning": "Intake grounded 9 identity/assessment field(s) from Open Calgary (address, assessed_value, assessment_roll_year, district, land_use, lat, lon, roll_number, year_built); read 8 attribute(s) from the listing (basement_finished_sqft, beds_ag, full_baths, garage_stalls, garage_type, gla_sqft, half_baths, lot_sqft); and fell back to CREB district-typical values for 0 field(s) (none) the listing did not state. No physical value was estimated; absent fields are labelled district_typical.",
      "calls": [
        {
          "name": "lookup_open_calgary",
          "args": "address_or_roll=15 AV SE",
          "result": "{\"address\": \"6924 15 AV SE\", \"district\": \"east\", \"lat\": 51.03981815833333, \"lon\": -113.93377142499999, \"roll_number\": \"579002403\", \"assessed_value\": 470500, \"land_use\": \"R-CG\", \"assessment_roll_year\": 2026, \"year_built\": 1982}"
        },
        {
          "name": "parse_listing_field",
          "args": "field=gla_sqft",
          "result": "gla_sqft=1103 (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=lot_sqft",
          "result": "lot_sqft=4614 (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=beds_ag",
          "result": "beds_ag=3 (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=full_baths",
          "result": "full_baths=2 (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=half_baths",
          "result": "half_baths=0 (from listing)"
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
