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
  "narrativeSource": "llm",
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
      "id": "C-A",
      "label": "COMP-A",
      "synthetic": true,
      "mls": "C-2208",
      "community": "Lake Bonavista",
      "district": "South",
      "sameDistrict": true,
      "distanceKm": 0.7,
      "contractDate": "2026-04-11",
      "contractMonth": "2026-04",
      "ageDays": 51,
      "price": 697349,
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
          "sub": "1,485 sf (+35)",
          "adj": -2975
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,350 sf (+108)",
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
          "sub": "1985 (+1 yr)",
          "adj": -700
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
          "adj": 3500
        }
      ],
      "tf": 0.005014,
      "bmContract": 718000,
      "timeAdj": 3500,
      "net": -175,
      "gross": 7175,
      "adjusted": 697174,
      "netPct": -0.0251,
      "grossPct": 1.0289,
      "linePct": 0.5019,
      "ppsf": 470
    },
    {
      "id": "C-B",
      "label": "COMP-B",
      "synthetic": true,
      "mls": "C-2156",
      "community": "Lake Bonavista",
      "district": "South",
      "sameDistrict": true,
      "distanceKm": 1.1,
      "contractDate": "2026-02-19",
      "contractMonth": "2026-02",
      "ageDays": 102,
      "price": 663636,
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
          "sub": "1,390 sf (−60)",
          "adj": 5100
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,050 sf (−192)",
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
          "sub": "1981 (−3 yr)",
          "adj": 2100
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
          "adj": 8950
        }
      ],
      "tf": 0.013483,
      "bmContract": 712000,
      "timeAdj": 8950,
      "net": 21750,
      "gross": 21750,
      "adjusted": 685386,
      "netPct": 3.2774,
      "grossPct": 3.2774,
      "linePct": 1.3486,
      "ppsf": 477
    },
    {
      "id": "C-C",
      "label": "COMP-C",
      "synthetic": true,
      "mls": "C-2241",
      "community": "Lake Bonavista",
      "district": "South",
      "sameDistrict": true,
      "distanceKm": 1.9,
      "contractDate": "2026-03-06",
      "contractMonth": "2026-03",
      "ageDays": 87,
      "price": 799596,
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
      "watch": [
        "EXCESSIVE_GROSS_ADJ"
      ],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,820 sf (+370)",
          "adj": -31450
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "7,100 sf (+1,858)",
          "adj": -22296
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
          "sub": "1996 (+12 yr)",
          "adj": -8400
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
          "adj": 7400
        }
      ],
      "tf": 0.009231,
      "bmContract": 715000,
      "timeAdj": 7400,
      "net": -95946,
      "gross": 110746,
      "adjusted": 703650,
      "netPct": -11.9993,
      "grossPct": 13.8502,
      "linePct": 3.9332,
      "ppsf": 439
    },
    {
      "id": "C-D",
      "label": "COMP-D",
      "synthetic": true,
      "mls": "C-2089",
      "community": "Willow Park",
      "district": "South East",
      "sameDistrict": false,
      "distanceKm": 3.1,
      "contractDate": "2026-01-08",
      "contractMonth": "2026-01",
      "ageDays": 144,
      "price": 683262,
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
          "sub": "1,430 sf (−20)",
          "adj": 1700
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,150 sf (−92)",
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
          "sub": "1983 (−1 yr)",
          "adj": 700
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
          "adj": 21000
        }
      ],
      "tf": 0.030704,
      "bmContract": 724000,
      "timeAdj": 21000,
      "net": 22700,
      "gross": 24100,
      "adjusted": 705962,
      "netPct": 3.3223,
      "grossPct": 3.5272,
      "linePct": 3.0735,
      "ppsf": 478
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
      "district": "South",
      "contractDate": "2025-04-22",
      "price": 672434,
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
      "district": "South",
      "contractDate": "2026-03-29",
      "price": 931959,
      "gla": 2210,
      "ppsf": 422,
      "detail": "Cumulative gross adjustment 26.2% exceeds the 25% hard cap. Too dissimilar to bracket the subject — not comparable.",
      "metricLabel": "gross adjustment",
      "metricValue": "26.2%",
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
      "price": 691374,
      "gla": 1505,
      "ppsf": 459,
      "detail": "West is not adjacent to the subject district under the tier-1 topology map (no shared boundary). Excluded before adjustment to avoid a cross-market location bridge.",
      "metricLabel": "district",
      "metricValue": "West (non-adj.)",
      "cap": "South ± adjacent"
    },
    {
      "id": "C-H",
      "label": "COMP-H",
      "synthetic": true,
      "mls": "C-2195",
      "code": "OUTLIER_PRICE",
      "community": "Lake Bonavista",
      "district": "South",
      "contractDate": "2026-03-12",
      "price": 596000,
      "gla": 1470,
      "ppsf": 405,
      "detail": "PPSF $405 sits 4.6 MAD low of the candidate median ($464). Probable non-arm's-length / distressed transfer — excluded as a price outlier rather than market evidence.",
      "metricLabel": "PPSF deviation",
      "metricValue": "4.6 MAD low",
      "cap": "≤ 2.0 MAD"
    },
    {
      "id": "C-I",
      "label": "COMP-I",
      "synthetic": true,
      "mls": "C-7741",
      "code": "DUPLICATE",
      "community": "Lake Bonavista",
      "district": "South",
      "contractDate": "2026-04-11",
      "price": 697349,
      "gla": 1485,
      "ppsf": 470,
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
          "South + directly-adjacent"
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
          "South + adjacent (unchanged)"
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
    "C-A": 0.4672,
    "C-B": 0.2781,
    "C-C": 0.1012,
    "C-D": 0.1535
  },
  "weightDrivers": {
    "C-A": {
      "similarity": "high",
      "recency": "51 d",
      "distance": "0.7 km",
      "burden": "1.0% gross"
    },
    "C-B": {
      "similarity": "moderate",
      "recency": "102 d",
      "distance": "1.1 km",
      "burden": "3.3% gross"
    },
    "C-C": {
      "similarity": "low",
      "recency": "87 d",
      "distance": "1.9 km",
      "burden": "13.9% gross"
    },
    "C-D": {
      "similarity": "moderate",
      "recency": "144 d",
      "distance": "3.1 km",
      "burden": "3.5% gross"
    }
  },
  "range": {
    "low": 688000,
    "point": 696000,
    "high": 704000,
    "spreadPct": 2.3
  },
  "adjustedVals": [
    697174,
    685386,
    703650,
    705962
  ],
  "confidence": {
    "base": 0.55,
    "score": 0.6821,
    "low": 0.6321,
    "high": 0.7321,
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
        "detail": "$20,576 range · 2.3% of point",
        "contrib": 0.1225
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
        "detail": "worst comp at 13.9% gross",
        "contrib": -0.0431
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
      "status": "FIRED",
      "severity": "review",
      "trigger": "any selected comp gross adj > 12% review band",
      "detail": "COMP-C 13.9% exceed the 12% review band (hard cap 25%); retained at reduced weight."
    },
    {
      "code": "EXCESSIVE_NET_ADJ",
      "status": "FIRED",
      "severity": "review",
      "trigger": "any selected comp net adj > 8% review band",
      "detail": "COMP-C -12.0% exceed the 8% net review band; narrative support advised."
    },
    {
      "code": "NET_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any selected comp net adj > 15%",
      "detail": "Max net adjustment 12.0% — within the 15% tolerance."
    },
    {
      "code": "GROSS_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any selected comp gross adj > 25%",
      "detail": "Max gross adjustment 13.9% — within the 25% tolerance."
    },
    {
      "code": "LINE_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any single line adj > 10%",
      "detail": "Largest single line 3.9% of price — within the 10% tolerance."
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
      "detail": "Raw (pre-adjustment) price spread 20% within the 30% watch."
    }
  ],
  "aicNote": "AIC guidance: lender net/gross/line tolerances are screening aids, not appraisal rules. A breach is a flag for narrative support — it does not supersede good appraisal practice or invalidate an otherwise well-supported comparable.",
  "narrative": {
    "scope": "This sales comparison analysis supports a market value opinion for 84xx Bonaventure Drive SE as of June 1, 2026. The engine retrieved 9 potential comparables from Open Calgary data, selecting 4 for adjustment analysis after rejecting 5 for various deficiencies. The final comparable set includes 2 tier-0 and 2 tier-1 properties, with 3 from the same south district and 1 from an adjacent district. All comparables are synthetic constructs designed to test valuation methodologies.",
    "selection": "From 9 retrieved comparables, 4 were selected and 5 rejected. Rejections included: C-E (staleness at 405 days), C-F (gross adjustments of 26.2% exceeding limits), C-G (wrong district after widening), C-H (outlier pricing at 4.6 MAD low), and C-I (duplicate of C-A). The final set required tier-2 relaxation to meet minimum count requirements, triggering the DEEP_WIDENING flag and a -0.10 confidence penalty. Selection prioritized recency, location similarity, and adjustment feasibility within established tolerance bands.",
    "adjustment": "Adjusted values range from $685,386 to $705,962. Gross adjustment percentages span 1.0% to 13.9%, with net adjustments from -12.0% to +3.3%. Notable adjustment issues include: C-C exceeding the 12% gross adjustment review band at 13.9% and the 8% net adjustment band at -12.0%, both flagged for narrative support. C-D required time adjustment using city-wide fallback data due to insufficient district-specific benchmarks. Weights range from 0.1012 to 0.4672, with C-A receiving highest weight due to minimal adjustment burden.",
    "reconciliation": "The weighted analysis supports a value range of $688,000 to $704,000 with a point estimate of $696,000, representing a 2.3% spread. This range brackets the subject's assessed value of $687,500. C-A (adjusted value $697,174, weight 0.4672) provides primary support, while C-B ($685,386, weight 0.2781) anchors the lower bound. C-C and C-D, despite higher adjustment burdens, contribute meaningful cross-validation. The range reflects adjustment uncertainty and market variability inherent in the comparable set.",
    "confidence": "Confidence score of 0.6821 places this analysis in the MODERATE band. Positive contributors include comparable count (+0.08), adjusted-value spread management (+0.1225), recency (+0.0382), and distance control (+0.0345). Negative factors include adjustment burden (-0.0431) and widening depth (-0.10). Six flags fired during analysis, including deep widening, stale comparables, adjacent district sourcing, and excessive adjustment thresholds. These flags indicate heightened review requirements but do not invalidate the analysis.",
    "limiting": "This analysis relies on synthetic comparables and Open Calgary data as noted. Limiting conditions include: tier-2 widening required for minimum sample size, one comparable from adjacent district, time adjustments using city-wide benchmarks for C-D, and gross/net adjustment threshold breaches for C-C requiring narrative support. The MODERATE confidence band reflects these analytical constraints. Market conditions as of June 2026 and data availability may impact reliability. This appraisal assumes standard limiting conditions for residential valuation assignments."
  },
  "agentTrace": {
    "intake": {
      "source": "llm",
      "reasoning": "## Property Subject Record\n\n**Identity & Assessment:**\n- Address: 84xx Bonaventure Drive SE\n- Roll Number: 074-21-335-07\n- District: South\n- Coordinates: 50.9583, -114.054\n- Assessed Value: $687,500 (2026 roll)\n- Land Use: R-C1\n\n**Physical Characteristics:**\n- GLA: 1,450 sq ft (from listing)\n- Lot Size: 5,242 sq ft (from listing) \n- Bedrooms Above Grade: 3 (from listing)\n- Full Baths: 2 (from listing)\n- Half Baths: 1 (from listing)\n- Year Built: 1984 (grounded via Open Calgary)\n- Basement Finished: 600 sq ft (from listing)\n- Basement Walkout: No district-typical available\n- Garage Type: Attached (from listing)\n- Garage Stalls: 2 (from listing)\n\n**Intake Reasoning:** The property was successfully grounded through Open Calgary with matching year built validation. Most physical characteristics were clearly stated in the listing including square footages, bedroom/bathroom counts, and garage details. Only basement walkout status was absent from the listing, but no district-typical fallback was available for this field in the south district. The listing provided comprehensive detail with minimal gaps requiring fallback values.",
      "calls": [
        {
          "name": "lookup_open_calgary",
          "args": "address_or_roll=84xx Bonaventure Drive SE",
          "result": "{\"address\": \"84xx Bonaventure Drive SE\", \"district\": \"south\", \"lat\": 50.9583, \"lon\": -114.054, \"roll_number\": \"074-21-335-07\", \"assessed_value\": 687500, \"land_use\": \"R-C1\", \"assessment_roll_year\": 2026, \"year_built\": 1984}"
        },
        {
          "name": "parse_listing_field",
          "args": "field=gla_sqft",
          "result": "gla_sqft=1450 (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=lot_sqft",
          "result": "lot_sqft=5242 (from listing)"
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
        },
        {
          "name": "district_typical",
          "args": "district=south, field=basement_walkout",
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
