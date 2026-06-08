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
    "caseId": "KV-CMP-2026-2204",
    "snapshot": "2026-06-01T00:00:00-06:00",
    "effectiveDate": "2026-06-01",
    "approach": "Sales Comparison Approach",
    "analyst": "model:underwrite-copilot v1.0.0",
    "purpose": "Defend a value RANGE for collateral review — never a point decision."
  },
  "narrativeSource": "template",
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
    "southBenchmark": 647200,
    "cityBenchmark": 747800,
    "ppsf": 474,
    "series": "CREB · Detached · North District · monthly benchmark"
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
    "roll": "445032204",
    "addr": "42 PANORAMA HILLS GR NW",
    "addrNote": "civic address partially masked for review packet",
    "community": "North district",
    "district": "North",
    "quadrant": "NW",
    "landUse": "R-G · Residential Contextual One Dwelling",
    "assessedValue": 712000,
    "assessmentRollYear": 2026,
    "assessmentValDate": "2025-07-01",
    "ppsfAssessed": 510,
    "propertyType": "Single-family detached",
    "gla": 1396,
    "lot": 4944,
    "beds": 3,
    "bathFull": 2,
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
        "1,396 sf"
      ],
      [
        "Site / lot",
        "4,944 sf"
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
        "R-G"
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
      "district": "North",
      "sameDistrict": true,
      "distanceKm": 0.6,
      "contractDate": "2026-05-02",
      "contractMonth": "2026-05",
      "ageDays": 30,
      "price": 723986,
      "gla": 1286,
      "lot": 4394,
      "beds": 3,
      "baths": "3F / 1H",
      "basement": "1000 sf fin",
      "garage": "2 · att.",
      "built": 1996,
      "cond": "C1",
      "qual": "Q1",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,286 sf (−110)",
          "adj": 9350
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "4,394 sf (−550)",
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
          "sub": "3F / 1H (+1 full)",
          "adj": -6000
        },
        {
          "key": "bsmt",
          "label": "Basement",
          "sub": "1,000 sf fin (+400)",
          "adj": -14000
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
          "sub": "C1 (+2 step)",
          "adj": -24000
        },
        {
          "key": "qual",
          "label": "Quality",
          "sub": "Q1 (+2 step)",
          "adj": -30000
        },
        {
          "key": "time",
          "label": "Time / market cond.",
          "sub": "2026-05-02 → 2026-06-01",
          "adj": -1500
        }
      ],
      "tf": -0.002099,
      "bmContract": 747800,
      "timeAdj": -1500,
      "net": -66150,
      "gross": 84850,
      "adjusted": 657836,
      "netPct": -9.1369,
      "grossPct": 11.7198,
      "linePct": 4.1437,
      "ppsf": 563
    },
    {
      "id": "G-B",
      "label": "COMP-B",
      "synthetic": true,
      "mls": "C-2001",
      "community": "Lake Bonavista",
      "district": "North",
      "sameDistrict": true,
      "distanceKm": 0.9,
      "contractDate": "2026-04-10",
      "contractMonth": "2026-04",
      "ageDays": 52,
      "price": 714295,
      "gla": 1316,
      "lot": 4544,
      "beds": 3,
      "baths": "3F / 1H",
      "basement": "1000 sf fin",
      "garage": "2 · att.",
      "built": 1996,
      "cond": "C1",
      "qual": "Q1",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,316 sf (−80)",
          "adj": 6800
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "4,544 sf (−400)",
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
          "sub": "3F / 1H (+1 full)",
          "adj": -6000
        },
        {
          "key": "bsmt",
          "label": "Basement",
          "sub": "1,000 sf fin (+400)",
          "adj": -14000
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
          "sub": "C1 (+2 step)",
          "adj": -24000
        },
        {
          "key": "qual",
          "label": "Quality",
          "sub": "Q1 (+2 step)",
          "adj": -30000
        },
        {
          "key": "time",
          "label": "Time / market cond.",
          "sub": "2026-04-10 → 2026-06-01",
          "adj": 800
        }
      ],
      "tf": 0.001113,
      "bmContract": 745400,
      "timeAdj": 800,
      "net": -66400,
      "gross": 81600,
      "adjusted": 647895,
      "netPct": -9.2959,
      "grossPct": 11.4239,
      "linePct": 4.1999,
      "ppsf": 543
    },
    {
      "id": "G-C",
      "label": "COMP-C",
      "synthetic": true,
      "mls": "C-2002",
      "community": "Lake Bonavista",
      "district": "North",
      "sameDistrict": true,
      "distanceKm": 1.2,
      "contractDate": "2026-03-25",
      "contractMonth": "2026-03",
      "ageDays": 68,
      "price": 719982,
      "gla": 1396,
      "lot": 4944,
      "beds": 3,
      "baths": "3F / 1H",
      "basement": "1000 sf fin",
      "garage": "2 · att.",
      "built": 1996,
      "cond": "C1",
      "qual": "Q1",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,396 sf (=)",
          "adj": 0
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "4,944 sf (=)",
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
          "sub": "3F / 1H (+1 full)",
          "adj": -6000
        },
        {
          "key": "bsmt",
          "label": "Basement",
          "sub": "1,000 sf fin (+400)",
          "adj": -14000
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
          "sub": "C1 (+2 step)",
          "adj": -24000
        },
        {
          "key": "qual",
          "label": "Quality",
          "sub": "Q1 (+2 step)",
          "adj": -30000
        },
        {
          "key": "time",
          "label": "Time / market cond.",
          "sub": "2026-03-25 → 2026-06-01",
          "adj": 4800
        }
      ],
      "tf": 0.00665,
      "bmContract": 741300,
      "timeAdj": 4800,
      "net": -69200,
      "gross": 78800,
      "adjusted": 650782,
      "netPct": -9.6114,
      "grossPct": 10.9447,
      "linePct": 4.1668,
      "ppsf": 516
    },
    {
      "id": "G-D",
      "label": "COMP-D",
      "synthetic": true,
      "mls": "C-2003",
      "community": "Lake Bonavista",
      "district": "North",
      "sameDistrict": true,
      "distanceKm": 1.5,
      "contractDate": "2026-03-07",
      "contractMonth": "2026-03",
      "ageDays": 86,
      "price": 726345,
      "gla": 1476,
      "lot": 5344,
      "beds": 3,
      "baths": "3F / 1H",
      "basement": "1000 sf fin",
      "garage": "2 · att.",
      "built": 1996,
      "cond": "C1",
      "qual": "Q1",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,476 sf (+80)",
          "adj": -6800
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,344 sf (+400)",
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
          "sub": "3F / 1H (+1 full)",
          "adj": -6000
        },
        {
          "key": "bsmt",
          "label": "Basement",
          "sub": "1,000 sf fin (+400)",
          "adj": -14000
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
          "sub": "C1 (+2 step)",
          "adj": -24000
        },
        {
          "key": "qual",
          "label": "Quality",
          "sub": "Q1 (+2 step)",
          "adj": -30000
        },
        {
          "key": "time",
          "label": "Time / market cond.",
          "sub": "2026-03-07 → 2026-06-01",
          "adj": 4850
        }
      ],
      "tf": 0.00665,
      "bmContract": 741300,
      "timeAdj": 4850,
      "net": -75950,
      "gross": 85650,
      "adjusted": 650395,
      "netPct": -10.4565,
      "grossPct": 11.7919,
      "linePct": 4.1303,
      "ppsf": 492
    },
    {
      "id": "G-E",
      "label": "COMP-E",
      "synthetic": true,
      "mls": "C-2004",
      "community": "Lake Bonavista",
      "district": "North",
      "sameDistrict": true,
      "distanceKm": 1.8,
      "contractDate": "2026-02-17",
      "contractMonth": "2026-02",
      "ageDays": 104,
      "price": 701432,
      "gla": 1506,
      "lot": 5494,
      "beds": 3,
      "baths": "3F / 1H",
      "basement": "1000 sf fin",
      "garage": "2 · att.",
      "built": 1996,
      "cond": "C1",
      "qual": "Q1",
      "tier": 0,
      "watch": [
        "EXCESSIVE_GROSS_ADJ"
      ],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,506 sf (+110)",
          "adj": -9350
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,494 sf (+550)",
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
          "sub": "3F / 1H (+1 full)",
          "adj": -6000
        },
        {
          "key": "bsmt",
          "label": "Basement",
          "sub": "1,000 sf fin (+400)",
          "adj": -14000
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
          "sub": "C1 (+2 step)",
          "adj": -24000
        },
        {
          "key": "qual",
          "label": "Quality",
          "sub": "Q1 (+2 step)",
          "adj": -30000
        },
        {
          "key": "time",
          "label": "Time / market cond.",
          "sub": "2026-02-17 → 2026-06-01",
          "adj": 11400
        }
      ],
      "tf": 0.016247,
      "bmContract": 734300,
      "timeAdj": 11400,
      "net": -71950,
      "gross": 94750,
      "adjusted": 629482,
      "netPct": -10.2576,
      "grossPct": 13.5081,
      "linePct": 4.277,
      "ppsf": 466
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
      "district": "North",
      "contractDate": "2025-04-22",
      "price": 672818,
      "gla": 1460,
      "ppsf": 461,
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
      "district": "North",
      "contractDate": "2026-03-29",
      "price": 912444,
      "gla": 2596,
      "ppsf": 351,
      "detail": "Cumulative gross adjustment 30.1% exceeds the 25% hard cap. Too dissimilar to bracket the subject — not comparable.",
      "metricLabel": "gross adjustment",
      "metricValue": "30.1%",
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
      "price": 635062,
      "gla": 1396,
      "ppsf": 455,
      "detail": "West is not adjacent to the subject district under the tier-1 topology map (no shared boundary). Excluded before adjustment to avoid a cross-market location bridge.",
      "metricLabel": "district",
      "metricValue": "West (non-adj.)",
      "cap": "North ± adjacent"
    },
    {
      "id": "C-H",
      "label": "COMP-H",
      "synthetic": true,
      "mls": "C-2195",
      "code": "OUTLIER_PRICE",
      "community": "Lake Bonavista",
      "district": "North",
      "contractDate": "2026-03-12",
      "price": 355190,
      "gla": 1470,
      "ppsf": 242,
      "detail": "PPSF $242 sits 6.8 MAD low of the candidate median ($492). Probable non-arm's-length / distressed transfer — excluded as a price outlier rather than market evidence.",
      "metricLabel": "PPSF deviation",
      "metricValue": "6.8 MAD low",
      "cap": "≤ 2.0 MAD"
    },
    {
      "id": "C-I",
      "label": "COMP-I",
      "synthetic": true,
      "mls": "C-7741",
      "code": "DUPLICATE",
      "community": "Lake Bonavista",
      "district": "North",
      "contractDate": "2025-04-22",
      "price": 672818,
      "gla": 1460,
      "ppsf": 461,
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
          "= North (subject)"
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
    "G-A": 0.261,
    "G-B": 0.2277,
    "G-C": 0.2139,
    "G-D": 0.1659,
    "G-E": 0.1316
  },
  "weightDrivers": {
    "G-A": {
      "similarity": "moderate",
      "recency": "30 d",
      "distance": "0.6 km",
      "burden": "11.7% gross"
    },
    "G-B": {
      "similarity": "moderate",
      "recency": "52 d",
      "distance": "0.9 km",
      "burden": "11.4% gross"
    },
    "G-C": {
      "similarity": "moderate",
      "recency": "68 d",
      "distance": "1.2 km",
      "burden": "10.9% gross"
    },
    "G-D": {
      "similarity": "moderate",
      "recency": "86 d",
      "distance": "1.5 km",
      "burden": "11.8% gross"
    },
    "G-E": {
      "similarity": "moderate",
      "recency": "104 d",
      "distance": "1.8 km",
      "burden": "13.5% gross"
    }
  },
  "range": {
    "low": 639500,
    "point": 649000,
    "high": 658500,
    "spreadPct": 2.93
  },
  "adjustedVals": [
    657836,
    647895,
    650782,
    650395,
    629482
  ],
  "confidence": {
    "base": 0.55,
    "score": 0.8175,
    "low": 0.7675,
    "high": 0.8675,
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
        "detail": "$28,354 range · 2.9% of point",
        "contrib": 0.1067
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
        "detail": "worst comp at 13.5% gross",
        "contrib": -0.041
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
      "status": "FIRED",
      "severity": "review",
      "trigger": "any selected comp gross adj > 12% review band",
      "detail": "COMP-E 13.5% exceed the 12% review band (hard cap 25%); retained at reduced weight."
    },
    {
      "code": "EXCESSIVE_NET_ADJ",
      "status": "FIRED",
      "severity": "review",
      "trigger": "any selected comp net adj > 8% review band",
      "detail": "COMP-A -9.1%, COMP-B -9.3%, COMP-C -9.6%, COMP-D -10.5%, COMP-E -10.3% exceed the 8% net review band; narrative support advised."
    },
    {
      "code": "NET_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any selected comp net adj > 15%",
      "detail": "Max net adjustment 10.5% — within the 15% tolerance."
    },
    {
      "code": "GROSS_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any selected comp gross adj > 25%",
      "detail": "Max gross adjustment 13.5% — within the 25% tolerance."
    },
    {
      "code": "LINE_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any single line adj > 10%",
      "detail": "Largest single line 4.3% of price — within the 10% tolerance."
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
      "detail": "Raw (pre-adjustment) price spread 4% within the 30% watch."
    }
  ],
  "aicNote": "AIC guidance: lender net/gross/line tolerances are screening aids, not appraisal rules. A breach is a flag for narrative support — it does not supersede good appraisal practice or invalidate an otherwise well-supported comparable.",
  "narrative": {
    "scope": "This memo documents a sales-comparison analysis supporting a defensible value RANGE for the subject property as of the effective date, prepared for collateral-underwriting review. It builds and documents the case for a range; it does not render a point value or a lending decision.",
    "selection": "5 comparable sales were retained from 10 retrieved candidates. Selection began in the tight tier-0 band (subject district, within six months) and widened to tier 0 only as needed to reach the minimum count. 5 candidates were rejected under documented reason codes (duplicate, gross adj too high, outlier price, too stale, wrong district after widening) — the rejections are the tell a black-box AVM cannot give.",
    "adjustment": "Each comparable was adjusted to the subject on a transparent grid using a fixed rate card, with time adjustments derived from each comparable's contract month against the CREB district benchmark and applied toward the effective date. G-E carried an above-review-band gross adjustment and was retained at reduced weight.",
    "reconciliation": "Adjusted values were reconciled by weight rather than simple average, emphasising the most similar, most recent, and least-adjusted evidence. The weighted central indication is $649,000, within a supported range of $639,500 to $658,500 (spread 2.9%) that brackets the adjusted comparables.",
    "confidence": "Confidence is assessed HIGH (0.82). 3 human-review flags fired and are documented below; none constitutes a failure — each is a prompt for reviewer narrative under AIC guidance.",
    "limiting": "All comparable data shown is SYNTHETIC and illustrative, priced from an explicit contributory model (the matched pair). Subject characteristics are grounded in Open Calgary assessment data (source: open_calgary_assessment); physical attributes are intake/district-typical where the free dataset does not publish them. Every non-CREB dollar magnitude is a US/North-American proxy to be locally calibrated. This artifact is render-only and contains no live computation."
  },
  "agentTrace": {
    "intake": {
      "source": "deterministic",
      "reasoning": "Intake grounded 9 identity/assessment field(s) from Open Calgary (address, assessed_value, assessment_roll_year, district, land_use, lat, lon, roll_number, year_built); read 8 attribute(s) from the listing (basement_finished_sqft, beds_ag, full_baths, garage_stalls, garage_type, gla_sqft, half_baths, lot_sqft); and fell back to CREB district-typical values for 0 field(s) (none) the listing did not state. No physical value was estimated; absent fields are labelled district_typical.",
      "calls": [
        {
          "name": "lookup_open_calgary",
          "args": "address_or_roll=42 PANORAMA HILLS GR NW",
          "result": "{\"address\": \"42 PANORAMA HILLS GR NW\", \"district\": \"north\", \"lat\": 51.14794354285715, \"lon\": -114.07863947142857, \"roll_number\": \"445032204\", \"assessed_value\": 712000, \"land_use\": \"R-G\", \"assessment_roll_year\": 2026, \"year_built\": 1996}"
        },
        {
          "name": "parse_listing_field",
          "args": "field=gla_sqft",
          "result": "gla_sqft=1396 (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=lot_sqft",
          "result": "lot_sqft=4944 (from listing)"
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
