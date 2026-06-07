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
    "caseId": "KV-CMP-2026-8-03",
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
    "roll": "091·44·218·03",
    "addr": "33xx Signal Hill Heights SW",
    "addrNote": "civic address partially masked for review packet",
    "community": "West district",
    "district": "West",
    "quadrant": "SW",
    "landUse": "R-C1 · Residential Contextual One Dwelling",
    "assessedValue": 985000,
    "assessmentRollYear": 2026,
    "assessmentValDate": "2025-07-01",
    "ppsfAssessed": 557,
    "propertyType": "Single-family detached",
    "gla": 1769,
    "lot": 5608,
    "beds": 3,
    "bathFull": 2,
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
        "1,769 sf"
      ],
      [
        "Site / lot",
        "5,608 sf"
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
      "id": "C-A",
      "label": "COMP-A",
      "synthetic": true,
      "mls": "C-2208",
      "community": "Lake Bonavista",
      "district": "West",
      "sameDistrict": true,
      "distanceKm": 0.7,
      "contractDate": "2026-04-11",
      "contractMonth": "2026-04",
      "ageDays": 51,
      "price": 961529,
      "gla": 1485,
      "lot": 5350,
      "beds": 3,
      "baths": "2F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1985,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,485 sf (−284)",
          "adj": 24140
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,350 sf (−258)",
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
          "sub": "1985 (−13 yr)",
          "adj": 9100
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
          "sub": "2026-04-11 → 2026-06-01",
          "adj": 4800
        }
      ],
      "tf": 0.004999,
      "bmContract": 1000200,
      "timeAdj": 4800,
      "net": 38040,
      "gross": 38040,
      "adjusted": 999569,
      "netPct": 3.9562,
      "grossPct": 3.9562,
      "linePct": 2.5106,
      "ppsf": 647
    },
    {
      "id": "C-B",
      "label": "COMP-B",
      "synthetic": true,
      "mls": "C-2156",
      "community": "Lake Bonavista",
      "district": "West",
      "sameDistrict": true,
      "distanceKm": 1.1,
      "contractDate": "2026-02-19",
      "contractMonth": "2026-02",
      "ageDays": 102,
      "price": 921022,
      "gla": 1390,
      "lot": 5050,
      "beds": 3,
      "baths": "2F / 0H",
      "basement": "540 sf fin",
      "garage": "2 · att.",
      "built": 1981,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,390 sf (−379)",
          "adj": 32215
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,050 sf (−558)",
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
          "sub": "2F / 0H (−1 half)",
          "adj": 3500
        },
        {
          "key": "bsmt",
          "label": "Basement",
          "sub": "540 sf fin (−60)",
          "adj": 2100
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
          "sub": "1981 (−17 yr)",
          "adj": 11900
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
          "sub": "2026-02-19 → 2026-06-01",
          "adj": 12450
        }
      ],
      "tf": 0.013511,
      "bmContract": 991800,
      "timeAdj": 12450,
      "net": 62165,
      "gross": 62165,
      "adjusted": 983187,
      "netPct": 6.7496,
      "grossPct": 6.7496,
      "linePct": 3.4977,
      "ppsf": 663
    },
    {
      "id": "C-C",
      "label": "COMP-C",
      "synthetic": true,
      "mls": "C-2241",
      "community": "Lake Bonavista",
      "district": "West",
      "sameDistrict": true,
      "distanceKm": 1.9,
      "contractDate": "2026-03-06",
      "contractMonth": "2026-03",
      "ageDays": 87,
      "price": 1060600,
      "gla": 1820,
      "lot": 7100,
      "beds": 4,
      "baths": "3F / 0H",
      "basement": "820 sf fin",
      "garage": "2 · att.",
      "built": 1996,
      "cond": "C2",
      "qual": "Q2",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,820 sf (+51)",
          "adj": -4335
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "7,100 sf (+1,492)",
          "adj": -17904
        },
        {
          "key": "bed",
          "label": "Bedrooms",
          "sub": "4 (+1)",
          "adj": -4000
        },
        {
          "key": "bath",
          "label": "Bathrooms",
          "sub": "3F / 0H (+1 full, −1 half)",
          "adj": -2500
        },
        {
          "key": "bsmt",
          "label": "Basement",
          "sub": "820 sf fin (+220)",
          "adj": -7700
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
          "sub": "1996 (−2 yr)",
          "adj": 1400
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
          "sub": "Q2 (+1 step)",
          "adj": -15000
        },
        {
          "key": "time",
          "label": "Time / market cond.",
          "sub": "2026-03-06 → 2026-06-01",
          "adj": 9800
        }
      ],
      "tf": 0.009237,
      "bmContract": 996000,
      "timeAdj": 9800,
      "net": -52239,
      "gross": 74639,
      "adjusted": 1008361,
      "netPct": -4.9254,
      "grossPct": 7.0374,
      "linePct": 1.6881,
      "ppsf": 583
    },
    {
      "id": "C-D",
      "label": "COMP-D",
      "synthetic": true,
      "mls": "C-2089",
      "community": "Willow Park",
      "district": "City Centre",
      "sameDistrict": false,
      "distanceKm": 3.1,
      "contractDate": "2026-01-08",
      "contractMonth": "2026-01",
      "ageDays": 144,
      "price": 944080,
      "gla": 1430,
      "lot": 5150,
      "beds": 3,
      "baths": "2F / 1H",
      "basement": "620 sf fin",
      "garage": "2 · att.",
      "built": 1983,
      "cond": "C3",
      "qual": "Q3",
      "tier": 1,
      "watch": [
        "STALE_COMP",
        "ADJACENT_DISTRICT_COMP"
      ],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,430 sf (−339)",
          "adj": 28815
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,150 sf (−458)",
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
          "sub": "620 sf fin (+20)",
          "adj": -700
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
          "sub": "1983 (−15 yr)",
          "adj": 10500
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
          "sub": "2026-01-08 → 2026-06-01",
          "adj": 29000
        }
      ],
      "tf": 0.030704,
      "bmContract": 724000,
      "timeAdj": 29000,
      "net": 67615,
      "gross": 69015,
      "adjusted": 1011695,
      "netPct": 7.162,
      "grossPct": 7.3103,
      "linePct": 3.0718,
      "ppsf": 660
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
      "district": "West",
      "contractDate": "2025-04-22",
      "price": 928204,
      "gla": 1460,
      "ppsf": 636,
      "detail": "Contract 2025-04-22 is 405 days stale — exceeds the tier-2 maximum window (≤ 274 days / ~9 mo). Pre-dates the current benchmark trend; the implied time adjustment would be unreliable.",
      "metricLabel": "contract age",
      "metricValue": "405 days",
      "cap": "≤ 274 days"
    },
    {
      "id": "C-G",
      "label": "COMP-G",
      "synthetic": true,
      "mls": "C-2170",
      "code": "WRONG_DISTRICT_AFTER_WIDENING",
      "community": "Glamorgan",
      "district": "East",
      "contractDate": "2026-02-14",
      "price": 952645,
      "gla": 1505,
      "ppsf": 633,
      "detail": "East is not adjacent to the subject district under the tier-1 topology map (no shared boundary). Excluded before adjustment to avoid a cross-market location bridge.",
      "metricLabel": "district",
      "metricValue": "East (non-adj.)",
      "cap": "West ± adjacent"
    },
    {
      "id": "C-F",
      "label": "COMP-F",
      "synthetic": true,
      "mls": "C-2233",
      "code": "OUTLIER_PRICE",
      "community": "Lake Bonavista",
      "district": "West",
      "contractDate": "2026-03-29",
      "price": 1193231,
      "gla": 2210,
      "ppsf": 540,
      "detail": "PPSF $540 sits 3.1 MAD low of the candidate median ($633). Probable non-arm's-length / distressed transfer — excluded as a price outlier rather than market evidence.",
      "metricLabel": "PPSF deviation",
      "metricValue": "3.1 MAD low",
      "cap": "≤ 2.0 MAD"
    },
    {
      "id": "C-H",
      "label": "COMP-H",
      "synthetic": true,
      "mls": "C-2195",
      "code": "OUTLIER_PRICE",
      "community": "Lake Bonavista",
      "district": "West",
      "contractDate": "2026-03-12",
      "price": 596000,
      "gla": 1470,
      "ppsf": 405,
      "detail": "PPSF $405 sits 7.6 MAD low of the candidate median ($633). Probable non-arm's-length / distressed transfer — excluded as a price outlier rather than market evidence.",
      "metricLabel": "PPSF deviation",
      "metricValue": "7.6 MAD low",
      "cap": "≤ 2.0 MAD"
    },
    {
      "id": "C-I",
      "label": "COMP-I",
      "synthetic": true,
      "mls": "C-7741",
      "code": "DUPLICATE",
      "community": "Lake Bonavista",
      "district": "West",
      "contractDate": "2026-04-11",
      "price": 961529,
      "gla": 1485,
      "ppsf": 647,
      "detail": "Resolves to the same parcel already represented by COMP-A (re-list under a second MLS number). Deduplicated to avoid double-counting one sale.",
      "metricLabel": "parcel",
      "metricValue": "= COMP-A",
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
      "found": 3,
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
      "rationale": "Tier-0 count (3) below the minimum of 4 for a stable weighted reconciliation; widened to directly-adjacent districts only.",
      "found": 1,
      "note": null,
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
    "retrieved": 9,
    "selected": 4,
    "rejected": 5,
    "finalTier": 2,
    "wideningDepth": 2,
    "totalPenalty": -0.1
  },
  "weights": {
    "C-A": 0.4358,
    "C-B": 0.2303,
    "C-C": 0.2065,
    "C-D": 0.1274
  },
  "weightDrivers": {
    "C-A": {
      "similarity": "moderate",
      "recency": "51 d",
      "distance": "0.7 km",
      "burden": "4.0% gross"
    },
    "C-B": {
      "similarity": "low",
      "recency": "102 d",
      "distance": "1.1 km",
      "burden": "6.7% gross"
    },
    "C-C": {
      "similarity": "low",
      "recency": "87 d",
      "distance": "1.9 km",
      "burden": "7.0% gross"
    },
    "C-D": {
      "similarity": "low",
      "recency": "144 d",
      "distance": "3.1 km",
      "burden": "7.3% gross"
    }
  },
  "range": {
    "low": 988000,
    "point": 999000,
    "high": 1010000,
    "spreadPct": 2.2
  },
  "adjustedVals": [
    999569,
    983187,
    1008361,
    1011695
  ],
  "confidence": {
    "base": 0.55,
    "score": 0.7238,
    "low": 0.6738,
    "high": 0.7738,
    "band": "MODERATE",
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
        "detail": "$28,508 range · 2.2% of point",
        "contrib": 0.125
      },
      {
        "key": "recency",
        "label": "Recency",
        "detail": "median contract age 94 days",
        "contrib": 0.0382
      },
      {
        "key": "distance",
        "label": "Distance",
        "detail": "0.7–3.1 km · 1 adjacent-district",
        "contrib": 0.0345
      },
      {
        "key": "burden",
        "label": "Adjustment burden",
        "detail": "worst comp at 7.3% gross",
        "contrib": -0.0039
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
      "detail": "COMP-D exceed the 120-day recency watch; time-adjusted off the CREB benchmark, weight reduced."
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
      "status": "FIRED",
      "severity": "info",
      "trigger": "any selected comp outside the subject district",
      "detail": "COMP-D drawn from an adjacent district; location risk absorbed via distance-weighting, documented for reviewer."
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
      "detail": "Max net adjustment 7.2% — within the 15% tolerance."
    },
    {
      "code": "GROSS_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any selected comp gross adj > 25%",
      "detail": "Max gross adjustment 7.3% — within the 25% tolerance."
    },
    {
      "code": "LINE_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any single line adj > 10%",
      "detail": "Largest single line 3.5% of price — within the 10% tolerance."
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
      "detail": "COMP-D use the city-wide fallback series (no encoded district benchmark); time adjustment is approximate."
    },
    {
      "code": "WIDE_UNADJUSTED_SPREAD",
      "status": "CLEAR",
      "severity": "review",
      "trigger": "raw comp price range > 30%",
      "detail": "Raw (pre-adjustment) price spread 15% within the 30% watch."
    }
  ],
  "aicNote": "AIC guidance: lender net/gross/line tolerances are screening aids, not appraisal rules. A breach is a flag for narrative support — it does not supersede good appraisal practice or invalidate an otherwise well-supported comparable.",
  "narrative": {
    "scope": "This memo documents a sales-comparison analysis supporting a defensible value RANGE for the subject property as of the effective date, prepared for collateral-underwriting review. It builds and documents the case for a range; it does not render a point value or a lending decision.",
    "selection": "4 comparable sales were retained from 9 retrieved candidates. Selection began in the tight tier-0 band (subject district, within six months) and widened to tier 2 only as needed to reach the minimum count. 5 candidates were rejected under documented reason codes (duplicate, outlier price, too stale, wrong district after widening) — the rejections are the tell a black-box AVM cannot give.",
    "adjustment": "Each comparable was adjusted to the subject on a transparent grid using a fixed rate card, with time adjustments derived from each comparable's contract month against the CREB district benchmark and applied toward the effective date. No comparable exceeded the gross-adjustment review band.",
    "reconciliation": "Adjusted values were reconciled by weight rather than simple average, emphasising the most similar, most recent, and least-adjusted evidence. The weighted central indication is $999,000, within a supported range of $988,000 to $1,010,000 (spread 2.2%) that brackets the adjusted comparables.",
    "confidence": "Confidence is assessed MODERATE (0.72). 4 human-review flags fired and are documented below; none constitutes a failure — each is a prompt for reviewer narrative under AIC guidance. One comparable was drawn from an adjacent district (C-D), absorbed via weighting.",
    "limiting": "All comparable data shown is SYNTHETIC and illustrative, priced from an explicit contributory model (the matched pair). Subject characteristics are grounded in Open Calgary assessment data (source: open_calgary_assessment); physical attributes are intake/district-typical where the free dataset does not publish them. Every non-CREB dollar magnitude is a US/North-American proxy to be locally calibrated. This artifact is render-only and contains no live computation."
  },
  "agentTrace": {
    "intake": {
      "source": "deterministic",
      "reasoning": "Intake grounded 9 identity/assessment field(s) from Open Calgary (address, assessed_value, assessment_roll_year, district, land_use, lat, lon, roll_number, year_built); read 8 attribute(s) from the listing (basement_finished_sqft, beds_ag, full_baths, garage_stalls, garage_type, gla_sqft, half_baths, lot_sqft); and fell back to CREB district-typical values for 0 field(s) (none) the listing did not state. No physical value was estimated; absent fields are labelled district_typical.",
      "calls": [
        {
          "name": "lookup_open_calgary",
          "args": "address_or_roll=33xx Signal Hill Heights SW",
          "result": "{\"address\": \"33xx Signal Hill Heights SW\", \"district\": \"west\", \"lat\": 51.0207, \"lon\": -114.1573, \"roll_number\": \"091-44-218-03\", \"assessed_value\": 985000, \"land_use\": \"R-C1\", \"assessment_roll_year\": 2026, \"year_built\": 1998}"
        },
        {
          "name": "parse_listing_field",
          "args": "field=gla_sqft",
          "result": "gla_sqft=1769 (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=lot_sqft",
          "result": "lot_sqft=5608 (from listing)"
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
