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
    "caseId": "KV-CMP-2026-2304",
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
    "roll": "073012304",
    "addr": "5437 VALENTINE CR SE",
    "addrNote": "civic address partially masked for review packet",
    "community": "East district",
    "district": "East",
    "quadrant": "SE",
    "landUse": "R-CG · Residential Contextual One Dwelling",
    "assessedValue": 463000,
    "assessmentRollYear": 2026,
    "assessmentValDate": "2025-07-01",
    "ppsfAssessed": 420,
    "propertyType": "Single-family detached",
    "gla": 1103,
    "lot": 5952,
    "beds": 3,
    "bathFull": 2,
    "bathHalf": 0,
    "basementSf": 600,
    "basementFinished": true,
    "walkout": false,
    "garageStalls": 2,
    "garageType": "attached",
    "yearBuilt": 1960,
    "effDate": "2026-06-01",
    "condition": "C3",
    "quality": "Q3",
    "age": 66,
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
        "5,952 sf"
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
        "1960 (66 yr)"
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
      "contractDate": "2026-04-27",
      "contractMonth": "2026-04",
      "ageDays": 35,
      "price": 589761,
      "gla": 1173,
      "lot": 5952,
      "beds": 3,
      "baths": "3F / 0H",
      "basement": "1200 sf fin",
      "garage": "2 · att.",
      "built": 2012,
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
          "sub": "1,173 sf (+70)",
          "adj": -5950
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,952 sf (=)",
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
          "sub": "3F / 0H (+1 full)",
          "adj": -6000
        },
        {
          "key": "bsmt",
          "label": "Basement",
          "sub": "1,200 sf fin (+600)",
          "adj": -21000
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
          "sub": "2012 (+52 yr)",
          "adj": -36400
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
          "sub": "2026-04-27 → 2026-06-01",
          "adj": 2900
        }
      ],
      "tf": 0.004931,
      "bmContract": 486700,
      "timeAdj": 2900,
      "net": -120450,
      "gross": 126250,
      "adjusted": 469311,
      "netPct": -20.4235,
      "grossPct": 21.407,
      "linePct": 6.172,
      "ppsf": 503
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
      "contractDate": "2026-04-14",
      "contractMonth": "2026-04",
      "ageDays": 48,
      "price": 544109,
      "gla": 1133,
      "lot": 5952,
      "beds": 3,
      "baths": "2F / 0H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 2006,
      "cond": "C1",
      "qual": "Q2",
      "tier": 0,
      "watch": [
        "EXCESSIVE_GROSS_ADJ"
      ],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,133 sf (+30)",
          "adj": -2550
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,952 sf (=)",
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
          "sub": "2006 (+46 yr)",
          "adj": -32200
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
          "sub": "Q2 (+1 step)",
          "adj": -15000
        },
        {
          "key": "time",
          "label": "Time / market cond.",
          "sub": "2026-04-14 → 2026-06-01",
          "adj": 2700
        }
      ],
      "tf": 0.004931,
      "bmContract": 486700,
      "timeAdj": 2700,
      "net": -71050,
      "gross": 76450,
      "adjusted": 473059,
      "netPct": -13.058,
      "grossPct": 14.0505,
      "linePct": 5.9179,
      "ppsf": 480
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
      "contractDate": "2026-03-31",
      "contractMonth": "2026-03",
      "ageDays": 62,
      "price": 507085,
      "gla": 1108,
      "lot": 5952,
      "beds": 3,
      "baths": "2F / 0H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1998,
      "cond": "C2",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,108 sf (+5)",
          "adj": -425
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,952 sf (=)",
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
          "sub": "1998 (+38 yr)",
          "adj": -26600
        },
        {
          "key": "cond",
          "label": "Condition",
          "sub": "C2 (+1 step)",
          "adj": -12000
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
          "sub": "2026-03-31 → 2026-06-01",
          "adj": 4700
        }
      ],
      "tf": 0.009286,
      "bmContract": 484600,
      "timeAdj": 4700,
      "net": -34325,
      "gross": 43725,
      "adjusted": 472760,
      "netPct": -6.7691,
      "grossPct": 8.6228,
      "linePct": 5.2457,
      "ppsf": 458
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
      "contractDate": "2026-03-18",
      "contractMonth": "2026-03",
      "ageDays": 75,
      "price": 460650,
      "gla": 1093,
      "lot": 5952,
      "beds": 3,
      "baths": "2F / 0H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1978,
      "cond": "C4",
      "qual": "Q4",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,093 sf (−10)",
          "adj": 850
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,952 sf (=)",
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
          "sub": "1978 (+18 yr)",
          "adj": -12600
        },
        {
          "key": "cond",
          "label": "Condition",
          "sub": "C4 (−1 step)",
          "adj": 12000
        },
        {
          "key": "qual",
          "label": "Quality",
          "sub": "Q4 (−1 step)",
          "adj": 15000
        },
        {
          "key": "time",
          "label": "Time / market cond.",
          "sub": "2026-03-18 → 2026-06-01",
          "adj": 4300
        }
      ],
      "tf": 0.009286,
      "bmContract": 484600,
      "timeAdj": 4300,
      "net": 19550,
      "gross": 44750,
      "adjusted": 480200,
      "netPct": 4.244,
      "grossPct": 9.7145,
      "linePct": 3.2563,
      "ppsf": 421
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
      "contractDate": "2026-03-05",
      "contractMonth": "2026-03",
      "ageDays": 88,
      "price": 424298,
      "gla": 1078,
      "lot": 5952,
      "beds": 3,
      "baths": "2F / 0H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1966,
      "cond": "C5",
      "qual": "Q5",
      "tier": 0,
      "watch": [
        "EXCESSIVE_GROSS_ADJ"
      ],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,078 sf (−25)",
          "adj": 2125
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,952 sf (=)",
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
          "sub": "1966 (+6 yr)",
          "adj": -4200
        },
        {
          "key": "cond",
          "label": "Condition",
          "sub": "C5 (−2 step)",
          "adj": 24000
        },
        {
          "key": "qual",
          "label": "Quality",
          "sub": "Q5 (−2 step)",
          "adj": 30000
        },
        {
          "key": "time",
          "label": "Time / market cond.",
          "sub": "2026-03-05 → 2026-06-01",
          "adj": 3950
        }
      ],
      "tf": 0.009286,
      "bmContract": 484600,
      "timeAdj": 3950,
      "net": 55875,
      "gross": 64275,
      "adjusted": 480173,
      "netPct": 13.1688,
      "grossPct": 15.1486,
      "linePct": 7.0705,
      "ppsf": 394
    },
    {
      "id": "G-F",
      "label": "COMP-F",
      "synthetic": true,
      "mls": "C-2005",
      "community": "Lake Bonavista",
      "district": "East",
      "sameDistrict": true,
      "distanceKm": 2.1,
      "contractDate": "2026-02-21",
      "contractMonth": "2026-02",
      "ageDays": 100,
      "price": 420161,
      "gla": 1123,
      "lot": 5952,
      "beds": 3,
      "baths": "2F / 0H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1962,
      "cond": "C5",
      "qual": "Q5",
      "tier": 0,
      "watch": [
        "EXCESSIVE_GROSS_ADJ"
      ],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,123 sf (+20)",
          "adj": -1700
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,952 sf (=)",
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
          "sub": "1962 (+2 yr)",
          "adj": -1400
        },
        {
          "key": "cond",
          "label": "Condition",
          "sub": "C5 (−2 step)",
          "adj": 24000
        },
        {
          "key": "qual",
          "label": "Quality",
          "sub": "Q5 (−2 step)",
          "adj": 30000
        },
        {
          "key": "time",
          "label": "Time / market cond.",
          "sub": "2026-02-21 → 2026-06-01",
          "adj": 5650
        }
      ],
      "tf": 0.013469,
      "bmContract": 482600,
      "timeAdj": 5650,
      "net": 56550,
      "gross": 62750,
      "adjusted": 476711,
      "netPct": 13.4591,
      "grossPct": 14.9348,
      "linePct": 7.1401,
      "ppsf": 374
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
      "price": 508287,
      "gla": 1460,
      "ppsf": 348,
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
      "price": 765650,
      "gla": 2303,
      "ppsf": 332,
      "detail": "Cumulative gross adjustment 38.1% exceeds the 25% hard cap. Too dissimilar to bracket the subject — not comparable.",
      "metricLabel": "gross adjustment",
      "metricValue": "38.1%",
      "cap": "≤ 25.0%"
    },
    {
      "id": "C-H",
      "label": "COMP-H",
      "synthetic": true,
      "mls": "C-2195",
      "code": "GROSS_ADJ_TOO_HIGH",
      "community": "Lake Bonavista",
      "district": "East",
      "contractDate": "2026-03-12",
      "price": 261872,
      "gla": 1470,
      "ppsf": 178,
      "detail": "Cumulative gross adjustment 30.9% exceeds the 25% hard cap. Too dissimilar to bracket the subject — not comparable.",
      "metricLabel": "gross adjustment",
      "metricValue": "30.9%",
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
      "price": 488146,
      "gla": 1103,
      "ppsf": 443,
      "detail": "West is not adjacent to the subject district under the tier-1 topology map (no shared boundary). Excluded before adjustment to avoid a cross-market location bridge.",
      "metricLabel": "district",
      "metricValue": "West (non-adj.)",
      "cap": "East ± adjacent"
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
      "price": 508287,
      "gla": 1460,
      "ppsf": 348,
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
      "found": 6,
      "note": null,
      "penalty": 0.0
    }
  ],
  "searchSummary": {
    "retrieved": 11,
    "selected": 6,
    "rejected": 5,
    "finalTier": 0,
    "wideningDepth": 0,
    "totalPenalty": 0.0
  },
  "weights": {
    "G-A": 0.1074,
    "G-B": 0.1861,
    "G-C": 0.1894,
    "G-D": 0.1922,
    "G-E": 0.1707,
    "G-F": 0.1542
  },
  "weightDrivers": {
    "G-A": {
      "similarity": "low",
      "recency": "35 d",
      "distance": "0.6 km",
      "burden": "21.4% gross"
    },
    "G-B": {
      "similarity": "moderate",
      "recency": "48 d",
      "distance": "0.9 km",
      "burden": "14.1% gross"
    },
    "G-C": {
      "similarity": "moderate",
      "recency": "62 d",
      "distance": "1.2 km",
      "burden": "8.6% gross"
    },
    "G-D": {
      "similarity": "moderate",
      "recency": "75 d",
      "distance": "1.5 km",
      "burden": "9.7% gross"
    },
    "G-E": {
      "similarity": "high",
      "recency": "88 d",
      "distance": "1.8 km",
      "burden": "15.1% gross"
    },
    "G-F": {
      "similarity": "high",
      "recency": "100 d",
      "distance": "2.1 km",
      "burden": "14.9% gross"
    }
  },
  "range": {
    "low": 471500,
    "point": 475500,
    "high": 479500,
    "spreadPct": 1.68
  },
  "adjustedVals": [
    469311,
    473059,
    472760,
    480200,
    480173,
    476711
  ],
  "confidence": {
    "base": 0.55,
    "score": 0.8376,
    "low": 0.7876,
    "high": 0.8876,
    "band": "HIGH",
    "drivers": [
      {
        "key": "compCount",
        "label": "Comp count",
        "detail": "6 selected (≥ minimum 4)",
        "contrib": 0.14
      },
      {
        "key": "spread",
        "label": "Adjusted-value spread",
        "detail": "$10,889 range · 1.7% of point",
        "contrib": 0.138
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
        "detail": "0.6–2.1 km · 0 adjacent-district",
        "contrib": 0.0398
      },
      {
        "key": "burden",
        "label": "Adjustment burden",
        "detail": "worst comp at 21.4% gross",
        "contrib": -0.08
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
      "detail": "6 comps selected — at or above the minimum of 4."
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
      "detail": "COMP-A 21.4%, COMP-B 14.1%, COMP-E 15.1%, COMP-F 14.9% exceed the 12% review band (hard cap 25%); retained at reduced weight."
    },
    {
      "code": "EXCESSIVE_NET_ADJ",
      "status": "FIRED",
      "severity": "review",
      "trigger": "any selected comp net adj > 8% review band",
      "detail": "COMP-A -20.4%, COMP-B -13.1%, COMP-E +13.2%, COMP-F +13.5% exceed the 8% net review band; narrative support advised."
    },
    {
      "code": "NET_ADJ_BREACH",
      "status": "FIRED",
      "severity": "tolerance",
      "trigger": "any selected comp net adj > 15%",
      "detail": "COMP-A -20.4% breach the 15% hard tolerance — explain in commentary (AIC: not a fail)."
    },
    {
      "code": "GROSS_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any selected comp gross adj > 25%",
      "detail": "Max gross adjustment 21.4% — within the 25% tolerance."
    },
    {
      "code": "LINE_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any single line adj > 10%",
      "detail": "Largest single line 7.1% of price — within the 10% tolerance."
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
      "status": "FIRED",
      "severity": "review",
      "trigger": "raw comp price range > 30%",
      "detail": "Raw (pre-adjustment) price spread 40% exceeds the 30% watch."
    }
  ],
  "aicNote": "AIC guidance: lender net/gross/line tolerances are screening aids, not appraisal rules. A breach is a flag for narrative support — it does not supersede good appraisal practice or invalidate an otherwise well-supported comparable.",
  "narrative": {
    "scope": "This memo documents a sales-comparison analysis supporting a defensible value RANGE for the subject property as of the effective date, prepared for collateral-underwriting review. It builds and documents the case for a range; it does not render a point value or a lending decision.",
    "selection": "6 comparable sales were retained from 11 retrieved candidates. Selection began in the tight tier-0 band (subject district, within six months) and widened to tier 0 only as needed to reach the minimum count. 5 candidates were rejected under documented reason codes (duplicate, gross adj too high, too stale, wrong district after widening) — the rejections are the tell a black-box AVM cannot give.",
    "adjustment": "Each comparable was adjusted to the subject on a transparent grid using a fixed rate card, with time adjustments derived from each comparable's contract month against the CREB district benchmark and applied toward the effective date. G-A, G-B, G-E, G-F carried an above-review-band gross adjustment and were retained at reduced weight.",
    "reconciliation": "Adjusted values were reconciled by weight rather than simple average, emphasising the most similar, most recent, and least-adjusted evidence. The weighted central indication is $475,500, within a supported range of $471,500 to $479,500 (spread 1.7%) that brackets the adjusted comparables.",
    "confidence": "Confidence is assessed HIGH (0.84). 4 human-review flags fired and are documented below; none constitutes a failure — each is a prompt for reviewer narrative under AIC guidance.",
    "limiting": "All comparable data shown is SYNTHETIC and illustrative, priced from an explicit contributory model (the matched pair). Subject characteristics are grounded in Open Calgary assessment data (source: open_calgary_assessment); physical attributes are intake/district-typical where the free dataset does not publish them. Every non-CREB dollar magnitude is a US/North-American proxy to be locally calibrated. This artifact is render-only and contains no live computation."
  },
  "agentTrace": {
    "intake": {
      "source": "deterministic",
      "reasoning": "Intake grounded 9 identity/assessment field(s) from Open Calgary (address, assessed_value, assessment_roll_year, district, land_use, lat, lon, roll_number, year_built); read 8 attribute(s) from the listing (basement_finished_sqft, beds_ag, full_baths, garage_stalls, garage_type, gla_sqft, half_baths, lot_sqft); and fell back to CREB district-typical values for 0 field(s) (none) the listing did not state. No physical value was estimated; absent fields are labelled district_typical.",
      "calls": [
        {
          "name": "lookup_open_calgary",
          "args": "address_or_roll=5437 VALENTINE",
          "result": "{\"address\": \"5437 VALENTINE CR SE\", \"district\": \"east\", \"lat\": 51.03891575, \"lon\": -113.95627364999999, \"roll_number\": \"073012304\", \"assessed_value\": 463000, \"land_use\": \"R-CG\", \"assessment_roll_year\": 2026, \"year_built\": 1960}"
        },
        {
          "name": "parse_listing_field",
          "args": "field=gla_sqft",
          "result": "gla_sqft=1103 (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=lot_sqft",
          "result": "lot_sqft=5952 (from listing)"
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
