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
    "caseId": "KV-CMP-2026-8-05",
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
    "roll": "074·25·208·05",
    "addr": "22xx Acadia Drive SE",
    "addrNote": "civic address partially masked for review packet",
    "community": "South district",
    "district": "South",
    "quadrant": "SE",
    "landUse": "R-C1 · Residential Contextual One Dwelling",
    "assessedValue": 668000,
    "assessmentRollYear": 2026,
    "assessmentValDate": "2025-07-01",
    "ppsfAssessed": 474,
    "propertyType": "Single-family detached",
    "gla": 1410,
    "lot": 5100,
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
        "1,410 sf"
      ],
      [
        "Site / lot",
        "5,100 sf"
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
      "id": "J-A",
      "label": "COMP-A",
      "synthetic": true,
      "mls": "C-2000",
      "community": "Lake Bonavista",
      "district": "South",
      "sameDistrict": true,
      "distanceKm": 0.6,
      "contractDate": "2026-04-22",
      "contractMonth": "2026-04",
      "ageDays": 40,
      "price": 693077,
      "gla": 1320,
      "lot": 5100,
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
          "sub": "1,320 sf (−90)",
          "adj": 7650
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,100 sf (=)",
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
          "sub": "2026-04-22 → 2026-06-01",
          "adj": 3500
        }
      ],
      "tf": 0.005014,
      "bmContract": 718000,
      "timeAdj": 3500,
      "net": 11150,
      "gross": 11150,
      "adjusted": 704227,
      "netPct": 1.6088,
      "grossPct": 1.6088,
      "linePct": 1.1038,
      "ppsf": 525
    },
    {
      "id": "J-B",
      "label": "COMP-B",
      "synthetic": true,
      "mls": "C-2001",
      "community": "Lake Bonavista",
      "district": "South",
      "sameDistrict": true,
      "distanceKm": 0.9,
      "contractDate": "2026-03-23",
      "contractMonth": "2026-03",
      "ageDays": 70,
      "price": 712549,
      "gla": 1490,
      "lot": 5100,
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
          "sub": "1,490 sf (+80)",
          "adj": -6800
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,100 sf (=)",
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
          "sub": "2026-03-23 → 2026-06-01",
          "adj": 6600
        }
      ],
      "tf": 0.009231,
      "bmContract": 715000,
      "timeAdj": 6600,
      "net": -200,
      "gross": 13400,
      "adjusted": 712349,
      "netPct": -0.0281,
      "grossPct": 1.8806,
      "linePct": 0.9543,
      "ppsf": 478
    },
    {
      "id": "J-C",
      "label": "COMP-C",
      "synthetic": true,
      "mls": "C-2002",
      "community": "Lake Bonavista",
      "district": "South East",
      "sameDistrict": false,
      "distanceKm": 3.2,
      "contractDate": "2026-04-02",
      "contractMonth": "2026-04",
      "ageDays": 60,
      "price": 714713,
      "gla": 1430,
      "lot": 5100,
      "beds": 3,
      "baths": "2F / 0H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1982,
      "cond": "C3",
      "qual": "Q3",
      "tier": 1,
      "watch": [
        "ADJACENT_DISTRICT_COMP"
      ],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,430 sf (+20)",
          "adj": -1700
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,100 sf (=)",
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
          "sub": "2026-04-02 → 2026-06-01",
          "adj": 800
        }
      ],
      "tf": 0.001113,
      "bmContract": 745400,
      "timeAdj": 800,
      "net": -900,
      "gross": 2500,
      "adjusted": 713813,
      "netPct": -0.1259,
      "grossPct": 0.3498,
      "linePct": 0.2379,
      "ppsf": 500
    },
    {
      "id": "J-D",
      "label": "COMP-D",
      "synthetic": true,
      "mls": "C-2003",
      "community": "Lake Bonavista",
      "district": "South East",
      "sameDistrict": false,
      "distanceKm": 3.8,
      "contractDate": "2026-03-01",
      "contractMonth": "2026-03",
      "ageDays": 92,
      "price": 705885,
      "gla": 1370,
      "lot": 5100,
      "beds": 3,
      "baths": "2F / 0H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1982,
      "cond": "C3",
      "qual": "Q3",
      "tier": 1,
      "watch": [
        "ADJACENT_DISTRICT_COMP"
      ],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,370 sf (−40)",
          "adj": 3400
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,100 sf (=)",
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
          "sub": "2026-03-01 → 2026-06-01",
          "adj": 4700
        }
      ],
      "tf": 0.00665,
      "bmContract": 741300,
      "timeAdj": 4700,
      "net": 8100,
      "gross": 8100,
      "adjusted": 713985,
      "netPct": 1.1475,
      "grossPct": 1.1475,
      "linePct": 0.6658,
      "ppsf": 515
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
      "found": 2,
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
      "rationale": "Tier-0 count (2) below the minimum of 4 for a stable weighted reconciliation; widened to directly-adjacent districts only.",
      "found": 2,
      "note": null,
      "penalty": -0.06
    }
  ],
  "searchSummary": {
    "retrieved": 4,
    "selected": 4,
    "rejected": 0,
    "finalTier": 1,
    "wideningDepth": 1,
    "totalPenalty": -0.06
  },
  "weights": {
    "J-A": 0.3606,
    "J-B": 0.2924,
    "J-C": 0.2042,
    "J-D": 0.1428
  },
  "weightDrivers": {
    "J-A": {
      "similarity": "high",
      "recency": "40 d",
      "distance": "0.6 km",
      "burden": "1.6% gross"
    },
    "J-B": {
      "similarity": "high",
      "recency": "70 d",
      "distance": "0.9 km",
      "burden": "1.9% gross"
    },
    "J-C": {
      "similarity": "high",
      "recency": "60 d",
      "distance": "3.2 km",
      "burden": "0.3% gross"
    },
    "J-D": {
      "similarity": "high",
      "recency": "92 d",
      "distance": "3.8 km",
      "burden": "1.1% gross"
    }
  },
  "range": {
    "low": 704500,
    "point": 710000,
    "high": 715500,
    "spreadPct": 1.55
  },
  "adjustedVals": [
    704227,
    712349,
    713813,
    713985
  ],
  "confidence": {
    "base": 0.55,
    "score": 0.8191,
    "low": 0.7691,
    "high": 0.8691,
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
        "detail": "$9,758 range · 1.6% of point",
        "contrib": 0.1412
      },
      {
        "key": "recency",
        "label": "Recency",
        "detail": "median contract age 65 days",
        "contrib": 0.0511
      },
      {
        "key": "distance",
        "label": "Distance",
        "detail": "0.6–3.8 km · 2 adjacent-district",
        "contrib": 0.0281
      },
      {
        "key": "burden",
        "label": "Adjustment burden",
        "detail": "worst comp at 1.9% gross",
        "contrib": 0.0287
      },
      {
        "key": "widening",
        "label": "Widening depth",
        "detail": "tier-1 reached (depth 1)",
        "contrib": -0.06
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
      "status": "FIRED",
      "severity": "info",
      "trigger": "any selected comp outside the subject district",
      "detail": "COMP-C, COMP-D drawn from an adjacent district; location risk absorbed via distance-weighting, documented for reviewer."
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
      "detail": "Max gross adjustment 1.9% — within the 25% tolerance."
    },
    {
      "code": "LINE_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any single line adj > 10%",
      "detail": "Largest single line 1.1% of price — within the 10% tolerance."
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
      "detail": "COMP-C, COMP-D use the city-wide fallback series (no encoded district benchmark); time adjustment is approximate."
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
    "scope": "This appraisal establishes a market value range for 22xx Acadia Drive SE as of June 1, 2026, using sales comparison methodology. The subject property is located in Calgary's south district with an assessed value of $668,000. Analysis utilizes synthetic comparables calibrated to Open Calgary market data, with the subject property grounded in the same dataset.",
    "selection": "The comparable selection engine retrieved 4 transactions and selected all 4 for analysis, with no rejections recorded. The final comparable set includes 2 tier-0 properties (J-A, J-B) from the same south district and 2 tier-1 properties (J-C, J-D) from adjacent districts. Selection methodology prioritized geographic proximity and market similarity while maintaining adequate sample size for reliable range estimation.",
    "adjustment": "Adjustment analysis shows minimal market resistance across the comparable set. Gross adjustment percentages range from 0.3% to 1.9%, with net adjustments spanning -0.1% to 1.6%. The low adjustment burden (contributing 0.0287 to confidence score) indicates strong comparability between subject and selected transactions. Time, location, and physical adjustments were applied systematically, with COMP-C and COMP-D utilizing city-wide fallback time series due to limited district-specific benchmarks.",
    "reconciliation": "The adjusted comparable values range from $704,227 to $713,985, supporting a final value range of $704,500 to $715,500 with a 1.55% spread. Weight allocation reflects proximity and reliability: J-A (36.06%), J-B (29.24%), J-C (20.42%), and J-D (14.28%). The tight value clustering and minimal spread demonstrate strong market consensus, with the point estimate of $710,000 representing the weighted midpoint of adjusted comparable indications.",
    "confidence": "Analysis confidence registers HIGH with a score of 0.8191. Positive contributors include adequate comparable count (+0.08), tight adjusted-value spread (+0.1412), reasonable recency (+0.0511), acceptable distance (+0.0281), and low adjustment burden (+0.0287). The widening depth factor (-0.06) reflects the inclusion of tier-1 comparables from adjacent districts, which provides market breadth while maintaining analytical rigor.",
    "limiting": "Two analytical flags require disclosure: (1) ADJACENT_DISTRICT_COMP flag indicates COMP-C and COMP-D originate from adjacent districts, with location risk mitigated through distance-weighting protocols; (2) UNSUPPORTED_TIME_ADJ flag notes that COMP-C and COMP-D employ city-wide time adjustment series rather than district-specific benchmarks, introducing temporal adjustment approximation. These conditions are documented for reviewer consideration but do not compromise the overall analytical framework or final value range reliability."
  },
  "agentTrace": {
    "intake": {
      "source": "deterministic",
      "reasoning": "Intake grounded 9 identity/assessment field(s) from Open Calgary (address, assessed_value, assessment_roll_year, district, land_use, lat, lon, roll_number, year_built); read 8 attribute(s) from the listing (basement_finished_sqft, beds_ag, full_baths, garage_stalls, garage_type, gla_sqft, half_baths, lot_sqft); and fell back to CREB district-typical values for 0 field(s) (none) the listing did not state. No physical value was estimated; absent fields are labelled district_typical.",
      "calls": [
        {
          "name": "lookup_open_calgary",
          "args": "address_or_roll=22xx Acadia Drive SE",
          "result": "{\"address\": \"22xx Acadia Drive SE\", \"district\": \"south\", \"lat\": 50.965, \"lon\": -114.056, \"roll_number\": \"074-25-208-05\", \"assessed_value\": 668000, \"land_use\": \"R-C1\", \"assessment_roll_year\": 2026, \"year_built\": 1982}"
        },
        {
          "name": "parse_listing_field",
          "args": "field=gla_sqft",
          "result": "gla_sqft=1410 (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=lot_sqft",
          "result": "lot_sqft=5100 (from listing)"
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
