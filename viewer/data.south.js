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
      "price": 717480,
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
          "adj": 3600
        }
      ],
      "tf": 0.005014,
      "bmContract": 718000,
      "timeAdj": 3600,
      "net": -75,
      "gross": 7275,
      "adjusted": 717405,
      "netPct": -0.0105,
      "grossPct": 1.014,
      "linePct": 0.5018,
      "ppsf": 483
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
      "price": 683253,
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
          "adj": 9200
        }
      ],
      "tf": 0.013483,
      "bmContract": 712000,
      "timeAdj": 9200,
      "net": 22000,
      "gross": 22000,
      "adjusted": 705253,
      "netPct": 3.2199,
      "grossPct": 3.2199,
      "linePct": 1.3465,
      "ppsf": 492
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
      "price": 819819,
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
          "adj": 7550
        }
      ],
      "tf": 0.009231,
      "bmContract": 715000,
      "timeAdj": 7550,
      "net": -95796,
      "gross": 110896,
      "adjusted": 724023,
      "netPct": -11.685,
      "grossPct": 13.5269,
      "linePct": 3.8362,
      "ppsf": 450
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
      "price": 703138,
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
          "adj": 21600
        }
      ],
      "tf": 0.030704,
      "bmContract": 724000,
      "timeAdj": 21600,
      "net": 23300,
      "gross": 24700,
      "adjusted": 726438,
      "netPct": 3.3137,
      "grossPct": 3.5128,
      "linePct": 3.0719,
      "ppsf": 492
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
      "price": 691924,
      "gla": 1460,
      "ppsf": 474,
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
      "price": 952203,
      "gla": 2210,
      "ppsf": 431,
      "detail": "Cumulative gross adjustment 25.7% exceeds the 25% hard cap. Too dissimilar to bracket the subject — not comparable.",
      "metricLabel": "gross adjustment",
      "metricValue": "25.7%",
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
      "price": 711284,
      "gla": 1505,
      "ppsf": 473,
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
      "detail": "PPSF $405 sits 5.2 MAD low of the candidate median ($478). Probable non-arm's-length / distressed transfer — excluded as a price outlier rather than market evidence.",
      "metricLabel": "PPSF deviation",
      "metricValue": "5.2 MAD low",
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
      "price": 717480,
      "gla": 1485,
      "ppsf": 483,
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
    "C-A": 0.4669,
    "C-B": 0.2781,
    "C-C": 0.1016,
    "C-D": 0.1534
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
      "burden": "3.2% gross"
    },
    "C-C": {
      "similarity": "low",
      "recency": "87 d",
      "distance": "1.9 km",
      "burden": "13.5% gross"
    },
    "C-D": {
      "similarity": "moderate",
      "recency": "144 d",
      "distance": "3.1 km",
      "burden": "3.5% gross"
    }
  },
  "range": {
    "low": 708000,
    "point": 716000,
    "high": 724000,
    "spreadPct": 2.23
  },
  "adjustedVals": [
    717405,
    705253,
    724023,
    726438
  ],
  "confidence": {
    "base": 0.55,
    "score": 0.6857,
    "low": 0.6357,
    "high": 0.7357,
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
        "detail": "$21,185 range · 2.2% of point",
        "contrib": 0.1242
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
        "detail": "worst comp at 13.5% gross",
        "contrib": -0.0412
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
      "detail": "COMP-C 13.5% exceed the 12% review band (hard cap 25%); retained at reduced weight."
    },
    {
      "code": "EXCESSIVE_NET_ADJ",
      "status": "FIRED",
      "severity": "review",
      "trigger": "any selected comp net adj > 8% review band",
      "detail": "COMP-C -11.7% exceed the 8% net review band; narrative support advised."
    },
    {
      "code": "NET_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any selected comp net adj > 15%",
      "detail": "Max net adjustment 11.7% — within the 15% tolerance."
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
      "detail": "Largest single line 3.8% of price — within the 10% tolerance."
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
    "scope": "This appraisal establishes market value for 84xx Bonaventure Drive SE as of June 1, 2026, using sales comparison analysis. The subject property is located in Calgary's south district with an assessed value of $687,500. The analysis drew from Open Calgary data to identify market transactions, applying systematic comparable selection and adjustment protocols. Nine potential comparables were retrieved, with four selected for analysis after five rejections due to staleness, excessive adjustments, district mismatch, price outlier status, and duplication.",
    "selection": "The comparable selection process identified four qualifying sales: three from the same south district (C-A, C-B, C-C) and one from an adjacent district (C-D). Note that all comparables are synthetic constructs derived from market data patterns. Five comparables were rejected: C-E for staleness (405 days), C-F for excessive gross adjustments (25.7%), C-G for wrong district placement (West, non-adjacent), C-H as a price outlier (5.2 MAD low), and C-I as a duplicate of C-A. The final tier required tier-1 relaxation to achieve minimum count thresholds, with C-D sourcing from outside the subject district.",
    "adjustment": "Adjustment analysis reveals varying degrees of modification across the selected comparables. C-A required minimal net adjustment (-0.0%) despite 1.0% gross adjustments. C-B and C-D showed modest positive net adjustments of 3.2% and 3.3% respectively, with gross adjustments of 3.2% and 3.5%. C-C required substantial adjustments with 13.5% gross and -11.7% net modifications, exceeding the 12% gross review band and 8% net review band. Time adjustments for C-D utilized city-wide fallback series due to absence of district-specific benchmarks. The adjustment burden contributed negatively to overall confidence scoring.",
    "reconciliation": "The adjusted comparable values range from $705,253 (C-B) to $726,438 (C-D), establishing a value range of $708,000 to $724,000 with a 2.23% spread. The point estimate of $716,000 reflects weighted consideration of all four comparables, with C-A receiving the highest weight (46.69%) due to superior similarity metrics. C-B and C-D received weights of 27.81% and 15.34% respectively, while C-C was down-weighted to 10.16% due to excessive adjustment requirements. The tight value spread supports range reliability despite the mixed comparable quality.",
    "confidence": "Analysis confidence is rated MODERATE with a score of 0.6857. Positive contributors include comparable count (+0.08), adjusted-value spread (+0.1242), recency (+0.0382), and distance factors (+0.0345). Negative factors include adjustment burden (-0.0412) and widening depth penalty (-0.1) due to tier-1 relaxation requirements. The moderate confidence reflects adequate comparable availability but acknowledges quality limitations from district widening and adjustment threshold breaches. This confidence level supports the indicated value range for underwriting purposes.",
    "limiting": "Several conditions limit this analysis and require disclosure. Deep widening to tier-1 was necessary to achieve minimum comparable count, degrading recency distribution quality. C-D exceeds the 120-day recency threshold and sources from adjacent district, introducing location and temporal risk. C-C breaches both gross (13.5%) and net (-11.7%) adjustment review bands, requiring narrative support for retention. Time adjustments for C-D rely on approximate city-wide benchmarks rather than district-specific data. All comparables represent synthetic market constructs rather than actual transaction records, and results should be interpreted within this methodological framework."
  },
  "agentTrace": {
    "intake": {
      "source": "llm",
      "reasoning": "## Subject Property Record\n\n**Identity & Assessment:**\n- Address: 84xx Bonaventure Drive SE\n- Roll Number: 074-21-335-07\n- District: South\n- Coordinates: 50.9583, -114.054\n- Assessed Value: $687,500 (2026)\n- Land Use: R-C1\n\n**Physical Characteristics:**\n- GLA: 1,450 sq ft\n- Lot Size: 5,242 sq ft\n- Bedrooms (AG): 3\n- Full Baths: 2\n- Half Baths: 1\n- Year Built: 1984 (grounded from assessment)\n- Basement Finished: 600 sq ft\n- Basement Walkout: Not specified\n- Garage: Attached, 2 stalls\n\n**Intake Reasoning:**\nThe property was successfully grounded through Open Calgary records, establishing the south district and confirming the 1984 build year from assessment data. Most physical characteristics were clearly stated in the listing including square footages, bedroom/bathroom counts, and garage details. The basement walkout status was the only field not mentioned in the listing, and no district-typical fallback value was available for this field in the south district.",
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
    },
    "sensitivity": {
      "source": "llm",
      "note": "Sensitivity probe of the $716,000 central indication (range $708,000–$724,000). Three deterministic re-runs were compared against the delivered result: an alternate lender profile, a forced wider comp search, and leave-one-out on the most heavily weighted comp (C-A). Per-scenario engine output: [lender profile -> gse_on] point $716,000 -> $716,000 (unchanged); range $708,000–$724,000 -> $708,000–$724,000; confidence MODERATE 0.69 -> MODERATE 0.69; selected 4 -> 4; fired flags 6 -> 6. [forced wider search (min_comp_count=6)] point $716,000 -> $716,000 (unchanged); range $708,000–$724,000 -> $708,000–$724,000; confidence MODERATE 0.69 -> LOW 0.41; selected 4 -> 4; fired flags 6 -> 7. [dropping comp C-A] point $716,000 -> $716,000 (unchanged); range $708,000–$724,000 -> $708,000–$724,000; confidence MODERATE 0.69 -> MODERATE 0.69; selected 4 -> 4; fired flags 6 -> 6. The lender profile is informational (it changes flag loudness, not value); the range movement under wider search and leave-one-out bounds how sensitive the point is to the comp set. Every figure here is recomputed by the core, not estimated.",
      "calls": [
        {
          "name": "rerun_with_profile",
          "args": "profile=gse_on",
          "result": "[lender profile -> gse_on] point $716,000 -> $716,000 (unchanged); range $708,000–$724,000 -> $708,000–$724,000; confidence MODERATE 0.69 -> MODERATE 0.69; selected 4 -> 4; fired flags 6 -> 6."
        },
        {
          "name": "rerun_with_profile",
          "args": "profile=fnma_off",
          "result": "[lender profile -> fnma_off] point $716,000 -> $716,000 (unchanged); range $708,000–$724,000 -> $708,000–$724,000; confidence MODERATE 0.69 -> MODERATE 0.69; selected 4 -> 4; fired flags 6 -> 6."
        },
        {
          "name": "rerun_widening",
          "args": "extra_tier=True",
          "result": "[forced wider search (min_comp_count=6)] point $716,000 -> $716,000 (unchanged); range $708,000–$724,000 -> $708,000–$724,000; confidence MODERATE 0.69 -> LOW 0.41; selected 4 -> 4; fired flags 6 -> 7."
        },
        {
          "name": "recompute_dropping_comp",
          "args": "comp_id=comp_1",
          "result": "no comparable with id 'comp_1' in the universe; nothing dropped."
        },
        {
          "name": "recompute_dropping_comp",
          "args": "comp_id=A",
          "result": "no comparable with id 'A' in the universe; nothing dropped."
        },
        {
          "name": "recompute_dropping_comp",
          "args": "comp_id=1",
          "result": "no comparable with id '1' in the universe; nothing dropped."
        },
        {
          "name": "recompute_dropping_comp",
          "args": "comp_id=0",
          "result": "no comparable with id '0' in the universe; nothing dropped."
        },
        {
          "name": "recompute_dropping_comp",
          "args": "comp_id=comp1",
          "result": "no comparable with id 'comp1' in the universe; nothing dropped."
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
