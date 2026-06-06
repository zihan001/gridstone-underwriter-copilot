/* ============================================================================
   GENERATED — do not edit by hand. Produced by kvcomp.serialize.memo_to_window
   from a frozen MemoArtifact. Regenerate with ./scripts/run.sh
   ----------------------------------------------------------------------------
   This template carries the verbatim JS formatting helpers the locked viewer
   calls (usd0 / sgn / pct / timeFactor). The Python serializer replaces the
   {
  "meta": {
    "caseId": "KV-CMP-2026-2-11",
    "snapshot": "2026-06-01T00:00:00-06:00",
    "effectiveDate": "2026-06-01",
    "approach": "Sales Comparison Approach",
    "analyst": "model:underwrite-copilot v1.0.0",
    "purpose": "Defend a value RANGE for collateral review — never a point decision."
  },
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
    "roll": "058·13·902·11",
    "addr": "7xx Penbrooke Meadows Close SE",
    "addrNote": "civic address partially masked for review packet",
    "community": "East district",
    "district": "East",
    "quadrant": "SE",
    "landUse": "R-C1 · Residential Contextual One Dwelling",
    "assessedValue": 472000,
    "assessmentRollYear": 2026,
    "assessmentValDate": "2025-07-01",
    "ppsfAssessed": 428,
    "propertyType": "Single-family detached",
    "gla": 1103,
    "lot": 4871,
    "beds": 3,
    "bathFull": 2,
    "bathHalf": 0,
    "basementSf": 600,
    "basementFinished": true,
    "walkout": false,
    "garageStalls": 2,
    "garageType": "attached",
    "yearBuilt": 1973,
    "effDate": "2026-06-01",
    "condition": "C3",
    "quality": "Q3",
    "age": 53,
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
        "4,871 sf"
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
        "1973 (53 yr)"
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
      "district": "East",
      "sameDistrict": true,
      "distanceKm": 0.7,
      "contractDate": "2026-04-11",
      "contractMonth": "2026-04",
      "ageDays": 51,
      "price": 527780,
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
          "sub": "1,485 sf (+382)",
          "adj": -32470
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,350 sf (+479)",
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
          "sub": "2F / 1H (+1 half)",
          "adj": -3500
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
          "sub": "1985 (+12 yr)",
          "adj": -8400
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
          "adj": 2600
        }
      ],
      "tf": 0.004931,
      "bmContract": 486700,
      "timeAdj": 2600,
      "net": -41770,
      "gross": 46970,
      "adjusted": 486010,
      "netPct": -7.9143,
      "grossPct": 8.8995,
      "linePct": 6.1522,
      "ppsf": 355
    },
    {
      "id": "C-B",
      "label": "COMP-B",
      "synthetic": true,
      "mls": "C-2156",
      "community": "Lake Bonavista",
      "district": "East",
      "sameDistrict": true,
      "distanceKm": 1.1,
      "contractDate": "2026-02-19",
      "contractMonth": "2026-02",
      "ageDays": 102,
      "price": 498368,
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
          "sub": "1,390 sf (+287)",
          "adj": -24395
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,050 sf (+179)",
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
          "sub": "1981 (+8 yr)",
          "adj": -5600
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
          "adj": 6700
        }
      ],
      "tf": 0.013469,
      "bmContract": 482600,
      "timeAdj": 6700,
      "net": -21195,
      "gross": 38795,
      "adjusted": 477173,
      "netPct": -4.2529,
      "grossPct": 7.7844,
      "linePct": 4.895,
      "ppsf": 359
    },
    {
      "id": "C-C",
      "label": "COMP-C",
      "synthetic": true,
      "mls": "C-2241",
      "community": "Lake Bonavista",
      "district": "East",
      "sameDistrict": true,
      "distanceKm": 1.9,
      "contractDate": "2026-03-06",
      "contractMonth": "2026-03",
      "ageDays": 87,
      "price": 633596,
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
          "sub": "1,820 sf (+717)",
          "adj": -60945
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "7,100 sf (+2,229)",
          "adj": -26748
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
          "sub": "3F / 0H (+1 full)",
          "adj": -6000
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
          "sub": "1996 (+23 yr)",
          "adj": -16100
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
          "adj": 5900
        }
      ],
      "tf": 0.009286,
      "bmContract": 484600,
      "timeAdj": 5900,
      "net": -142593,
      "gross": 154393,
      "adjusted": 491003,
      "netPct": -22.5054,
      "grossPct": 24.3677,
      "linePct": 9.6189,
      "ppsf": 348
    },
    {
      "id": "C-D",
      "label": "COMP-D",
      "synthetic": true,
      "mls": "C-2089",
      "community": "Willow Park",
      "district": "North East",
      "sameDistrict": false,
      "distanceKm": 3.1,
      "contractDate": "2026-01-08",
      "contractMonth": "2026-01",
      "ageDays": 144,
      "price": 515799,
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
          "sub": "1,430 sf (+327)",
          "adj": -27795
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,150 sf (+279)",
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
          "sub": "2F / 1H (+1 half)",
          "adj": -3500
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
          "sub": "1983 (+10 yr)",
          "adj": -7000
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
          "adj": 15850
        }
      ],
      "tf": 0.030704,
      "bmContract": 724000,
      "timeAdj": 15850,
      "net": -23145,
      "gross": 54845,
      "adjusted": 492654,
      "netPct": -4.4872,
      "grossPct": 10.633,
      "linePct": 5.3887,
      "ppsf": 361
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
      "price": 508243,
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
      "price": 765781,
      "gla": 2210,
      "ppsf": 347,
      "detail": "Cumulative gross adjustment 37.6% exceeds the 25% hard cap. Too dissimilar to bracket the subject — not comparable.",
      "metricLabel": "gross adjustment",
      "metricValue": "37.6%",
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
      "price": 523619,
      "gla": 1505,
      "ppsf": 348,
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
      "price": 596000,
      "gla": 1470,
      "ppsf": 405,
      "detail": "PPSF $405 sits 7.4 MAD high of the candidate median ($357). Probable non-arm's-length / distressed transfer — excluded as a price outlier rather than market evidence.",
      "metricLabel": "PPSF deviation",
      "metricValue": "7.4 MAD high",
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
      "contractDate": "2026-04-11",
      "price": 527780,
      "gla": 1485,
      "ppsf": 355,
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
          "East + directly-adjacent"
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
          "East + adjacent (unchanged)"
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
    "C-A": 0.4075,
    "C-B": 0.3429,
    "C-C": 0.1148,
    "C-D": 0.1348
  },
  "weightDrivers": {
    "C-A": {
      "similarity": "low",
      "recency": "51 d",
      "distance": "0.7 km",
      "burden": "8.9% gross"
    },
    "C-B": {
      "similarity": "moderate",
      "recency": "102 d",
      "distance": "1.1 km",
      "burden": "7.8% gross"
    },
    "C-C": {
      "similarity": "low",
      "recency": "87 d",
      "distance": "1.9 km",
      "burden": "24.4% gross"
    },
    "C-D": {
      "similarity": "low",
      "recency": "144 d",
      "distance": "3.1 km",
      "burden": "10.6% gross"
    }
  },
  "range": {
    "low": 478500,
    "point": 484500,
    "high": 490500,
    "spreadPct": 2.48
  },
  "adjustedVals": [
    486010,
    477173,
    491003,
    492654
  ],
  "confidence": {
    "base": 0.55,
    "score": 0.6407,
    "low": 0.5907,
    "high": 0.6907,
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
        "detail": "$15,481 range · 2.5% of point",
        "contrib": 0.118
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
        "detail": "worst comp at 24.4% gross",
        "contrib": -0.08
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
      "detail": "COMP-C 24.4% exceed the 12% review band (hard cap 25%); retained at reduced weight."
    },
    {
      "code": "EXCESSIVE_NET_ADJ",
      "status": "FIRED",
      "severity": "review",
      "trigger": "any selected comp net adj > 8% review band",
      "detail": "COMP-C -22.5% exceed the 8% net review band; narrative support advised."
    },
    {
      "code": "NET_ADJ_BREACH",
      "status": "FIRED",
      "severity": "tolerance",
      "trigger": "any selected comp net adj > 15%",
      "detail": "COMP-C -22.5% breach the 15% hard tolerance — explain in commentary (AIC: not a fail)."
    },
    {
      "code": "GROSS_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any selected comp gross adj > 25%",
      "detail": "Max gross adjustment 24.4% — within the 25% tolerance."
    },
    {
      "code": "LINE_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any single line adj > 10%",
      "detail": "Largest single line 9.6% of price — within the 10% tolerance."
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
      "detail": "Raw (pre-adjustment) price spread 27% within the 30% watch."
    }
  ],
  "aicNote": "AIC guidance: lender net/gross/line tolerances are screening aids, not appraisal rules. A breach is a flag for narrative support — it does not supersede good appraisal practice or invalidate an otherwise well-supported comparable.",
  "narrative": {
    "scope": "This memo documents a sales-comparison analysis supporting a defensible value RANGE for the subject property as of the effective date, prepared for collateral-underwriting review. It builds and documents the case for a range; it does not render a point value or a lending decision.",
    "selection": "4 comparable sales were retained from 9 retrieved candidates. Selection began in the tight tier-0 band (subject district, within six months) and widened to tier 2 only as needed to reach the minimum count. 5 candidates were rejected under documented reason codes (duplicate, gross adj too high, outlier price, too stale, wrong district after widening) — the rejections are the tell a black-box AVM cannot give.",
    "adjustment": "Each comparable was adjusted to the subject on a transparent grid using a fixed rate card, with time adjustments derived from each comparable's contract month against the CREB district benchmark and applied toward the effective date. C-C carried an above-review-band gross adjustment and was retained at reduced weight.",
    "reconciliation": "Adjusted values were reconciled by weight rather than simple average, emphasising the most similar, most recent, and least-adjusted evidence. The weighted central indication is $484,500, within a supported range of $478,500 to $490,500 (spread 2.5%) that brackets the adjusted comparables.",
    "confidence": "Confidence is assessed MODERATE (0.64). 7 human-review flags fired and are documented below; none constitutes a failure — each is a prompt for reviewer narrative under AIC guidance. One comparable was drawn from an adjacent district (C-D), absorbed via weighting.",
    "limiting": "All comparable data shown is SYNTHETIC and illustrative, priced from an explicit contributory model (the matched pair). Subject characteristics are grounded in Open Calgary assessment data (source: open_calgary_assessment); physical attributes are intake/district-typical where the free dataset does not publish them. Every non-CREB dollar magnitude is a US/North-American proxy to be locally calibrated. This artifact is render-only and contains no live computation."
  }
} token with json.dumps(memo_window_dict) and writes the result
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
    "caseId": "KV-CMP-2026-2-11",
    "snapshot": "2026-06-01T00:00:00-06:00",
    "effectiveDate": "2026-06-01",
    "approach": "Sales Comparison Approach",
    "analyst": "model:underwrite-copilot v1.0.0",
    "purpose": "Defend a value RANGE for collateral review — never a point decision."
  },
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
    "roll": "058·13·902·11",
    "addr": "7xx Penbrooke Meadows Close SE",
    "addrNote": "civic address partially masked for review packet",
    "community": "East district",
    "district": "East",
    "quadrant": "SE",
    "landUse": "R-C1 · Residential Contextual One Dwelling",
    "assessedValue": 472000,
    "assessmentRollYear": 2026,
    "assessmentValDate": "2025-07-01",
    "ppsfAssessed": 428,
    "propertyType": "Single-family detached",
    "gla": 1103,
    "lot": 4871,
    "beds": 3,
    "bathFull": 2,
    "bathHalf": 0,
    "basementSf": 600,
    "basementFinished": true,
    "walkout": false,
    "garageStalls": 2,
    "garageType": "attached",
    "yearBuilt": 1973,
    "effDate": "2026-06-01",
    "condition": "C3",
    "quality": "Q3",
    "age": 53,
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
        "4,871 sf"
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
        "1973 (53 yr)"
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
      "district": "East",
      "sameDistrict": true,
      "distanceKm": 0.7,
      "contractDate": "2026-04-11",
      "contractMonth": "2026-04",
      "ageDays": 51,
      "price": 527780,
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
          "sub": "1,485 sf (+382)",
          "adj": -32470
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,350 sf (+479)",
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
          "sub": "2F / 1H (+1 half)",
          "adj": -3500
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
          "sub": "1985 (+12 yr)",
          "adj": -8400
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
          "adj": 2600
        }
      ],
      "tf": 0.004931,
      "bmContract": 486700,
      "timeAdj": 2600,
      "net": -41770,
      "gross": 46970,
      "adjusted": 486010,
      "netPct": -7.9143,
      "grossPct": 8.8995,
      "linePct": 6.1522,
      "ppsf": 355
    },
    {
      "id": "C-B",
      "label": "COMP-B",
      "synthetic": true,
      "mls": "C-2156",
      "community": "Lake Bonavista",
      "district": "East",
      "sameDistrict": true,
      "distanceKm": 1.1,
      "contractDate": "2026-02-19",
      "contractMonth": "2026-02",
      "ageDays": 102,
      "price": 498368,
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
          "sub": "1,390 sf (+287)",
          "adj": -24395
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,050 sf (+179)",
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
          "sub": "1981 (+8 yr)",
          "adj": -5600
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
          "adj": 6700
        }
      ],
      "tf": 0.013469,
      "bmContract": 482600,
      "timeAdj": 6700,
      "net": -21195,
      "gross": 38795,
      "adjusted": 477173,
      "netPct": -4.2529,
      "grossPct": 7.7844,
      "linePct": 4.895,
      "ppsf": 359
    },
    {
      "id": "C-C",
      "label": "COMP-C",
      "synthetic": true,
      "mls": "C-2241",
      "community": "Lake Bonavista",
      "district": "East",
      "sameDistrict": true,
      "distanceKm": 1.9,
      "contractDate": "2026-03-06",
      "contractMonth": "2026-03",
      "ageDays": 87,
      "price": 633596,
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
          "sub": "1,820 sf (+717)",
          "adj": -60945
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "7,100 sf (+2,229)",
          "adj": -26748
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
          "sub": "3F / 0H (+1 full)",
          "adj": -6000
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
          "sub": "1996 (+23 yr)",
          "adj": -16100
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
          "adj": 5900
        }
      ],
      "tf": 0.009286,
      "bmContract": 484600,
      "timeAdj": 5900,
      "net": -142593,
      "gross": 154393,
      "adjusted": 491003,
      "netPct": -22.5054,
      "grossPct": 24.3677,
      "linePct": 9.6189,
      "ppsf": 348
    },
    {
      "id": "C-D",
      "label": "COMP-D",
      "synthetic": true,
      "mls": "C-2089",
      "community": "Willow Park",
      "district": "North East",
      "sameDistrict": false,
      "distanceKm": 3.1,
      "contractDate": "2026-01-08",
      "contractMonth": "2026-01",
      "ageDays": 144,
      "price": 515799,
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
          "sub": "1,430 sf (+327)",
          "adj": -27795
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,150 sf (+279)",
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
          "sub": "2F / 1H (+1 half)",
          "adj": -3500
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
          "sub": "1983 (+10 yr)",
          "adj": -7000
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
          "adj": 15850
        }
      ],
      "tf": 0.030704,
      "bmContract": 724000,
      "timeAdj": 15850,
      "net": -23145,
      "gross": 54845,
      "adjusted": 492654,
      "netPct": -4.4872,
      "grossPct": 10.633,
      "linePct": 5.3887,
      "ppsf": 361
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
      "price": 508243,
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
      "price": 765781,
      "gla": 2210,
      "ppsf": 347,
      "detail": "Cumulative gross adjustment 37.6% exceeds the 25% hard cap. Too dissimilar to bracket the subject — not comparable.",
      "metricLabel": "gross adjustment",
      "metricValue": "37.6%",
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
      "price": 523619,
      "gla": 1505,
      "ppsf": 348,
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
      "price": 596000,
      "gla": 1470,
      "ppsf": 405,
      "detail": "PPSF $405 sits 7.4 MAD high of the candidate median ($357). Probable non-arm's-length / distressed transfer — excluded as a price outlier rather than market evidence.",
      "metricLabel": "PPSF deviation",
      "metricValue": "7.4 MAD high",
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
      "contractDate": "2026-04-11",
      "price": 527780,
      "gla": 1485,
      "ppsf": 355,
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
          "East + directly-adjacent"
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
          "East + adjacent (unchanged)"
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
    "C-A": 0.4075,
    "C-B": 0.3429,
    "C-C": 0.1148,
    "C-D": 0.1348
  },
  "weightDrivers": {
    "C-A": {
      "similarity": "low",
      "recency": "51 d",
      "distance": "0.7 km",
      "burden": "8.9% gross"
    },
    "C-B": {
      "similarity": "moderate",
      "recency": "102 d",
      "distance": "1.1 km",
      "burden": "7.8% gross"
    },
    "C-C": {
      "similarity": "low",
      "recency": "87 d",
      "distance": "1.9 km",
      "burden": "24.4% gross"
    },
    "C-D": {
      "similarity": "low",
      "recency": "144 d",
      "distance": "3.1 km",
      "burden": "10.6% gross"
    }
  },
  "range": {
    "low": 478500,
    "point": 484500,
    "high": 490500,
    "spreadPct": 2.48
  },
  "adjustedVals": [
    486010,
    477173,
    491003,
    492654
  ],
  "confidence": {
    "base": 0.55,
    "score": 0.6407,
    "low": 0.5907,
    "high": 0.6907,
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
        "detail": "$15,481 range · 2.5% of point",
        "contrib": 0.118
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
        "detail": "worst comp at 24.4% gross",
        "contrib": -0.08
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
      "detail": "COMP-C 24.4% exceed the 12% review band (hard cap 25%); retained at reduced weight."
    },
    {
      "code": "EXCESSIVE_NET_ADJ",
      "status": "FIRED",
      "severity": "review",
      "trigger": "any selected comp net adj > 8% review band",
      "detail": "COMP-C -22.5% exceed the 8% net review band; narrative support advised."
    },
    {
      "code": "NET_ADJ_BREACH",
      "status": "FIRED",
      "severity": "tolerance",
      "trigger": "any selected comp net adj > 15%",
      "detail": "COMP-C -22.5% breach the 15% hard tolerance — explain in commentary (AIC: not a fail)."
    },
    {
      "code": "GROSS_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any selected comp gross adj > 25%",
      "detail": "Max gross adjustment 24.4% — within the 25% tolerance."
    },
    {
      "code": "LINE_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any single line adj > 10%",
      "detail": "Largest single line 9.6% of price — within the 10% tolerance."
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
      "detail": "Raw (pre-adjustment) price spread 27% within the 30% watch."
    }
  ],
  "aicNote": "AIC guidance: lender net/gross/line tolerances are screening aids, not appraisal rules. A breach is a flag for narrative support — it does not supersede good appraisal practice or invalidate an otherwise well-supported comparable.",
  "narrative": {
    "scope": "This memo documents a sales-comparison analysis supporting a defensible value RANGE for the subject property as of the effective date, prepared for collateral-underwriting review. It builds and documents the case for a range; it does not render a point value or a lending decision.",
    "selection": "4 comparable sales were retained from 9 retrieved candidates. Selection began in the tight tier-0 band (subject district, within six months) and widened to tier 2 only as needed to reach the minimum count. 5 candidates were rejected under documented reason codes (duplicate, gross adj too high, outlier price, too stale, wrong district after widening) — the rejections are the tell a black-box AVM cannot give.",
    "adjustment": "Each comparable was adjusted to the subject on a transparent grid using a fixed rate card, with time adjustments derived from each comparable's contract month against the CREB district benchmark and applied toward the effective date. C-C carried an above-review-band gross adjustment and was retained at reduced weight.",
    "reconciliation": "Adjusted values were reconciled by weight rather than simple average, emphasising the most similar, most recent, and least-adjusted evidence. The weighted central indication is $484,500, within a supported range of $478,500 to $490,500 (spread 2.5%) that brackets the adjusted comparables.",
    "confidence": "Confidence is assessed MODERATE (0.64). 7 human-review flags fired and are documented below; none constitutes a failure — each is a prompt for reviewer narrative under AIC guidance. One comparable was drawn from an adjacent district (C-D), absorbed via weighting.",
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
