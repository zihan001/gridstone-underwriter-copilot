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
    "caseId": "KV-CMP-2026-0-03",
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
    "roll": "074·19·770·03",
    "addr": "61xx Maple Ridge Drive SE",
    "addrNote": "civic address partially masked for review packet",
    "community": "South district",
    "district": "South",
    "quadrant": "SE",
    "landUse": "R-C1 · Residential Contextual One Dwelling",
    "assessedValue": 695000,
    "assessmentRollYear": 2026,
    "assessmentValDate": "2025-07-01",
    "ppsfAssessed": 483,
    "propertyType": "Single-family detached",
    "gla": 1440,
    "lot": 5200,
    "beds": 3,
    "bathFull": 2,
    "bathHalf": 1,
    "basementSf": 600,
    "basementFinished": true,
    "walkout": false,
    "garageStalls": 2,
    "garageType": "attached",
    "yearBuilt": 1983,
    "effDate": "2026-06-01",
    "condition": "C3",
    "quality": "Q3",
    "age": 43,
    "attrs": [
      [
        "Property type",
        "Single-family detached"
      ],
      [
        "Above-grade GLA",
        "1,440 sf"
      ],
      [
        "Site / lot",
        "5,200 sf"
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
        "1983 (43 yr)"
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
      "id": "T-A",
      "label": "COMP-A",
      "synthetic": true,
      "mls": "C-2000",
      "community": "Lake Bonavista",
      "district": "South",
      "sameDistrict": true,
      "distanceKm": 0.6,
      "contractDate": "2026-04-18",
      "contractMonth": "2026-04",
      "ageDays": 44,
      "price": 723711,
      "gla": 1455,
      "lot": 5200,
      "beds": 3,
      "baths": "2F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1983,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,455 sf (+15)",
          "adj": -1275
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,200 sf (=)",
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
          "sub": "1983 (=)",
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
          "sub": "2026-04-18 → 2026-06-01",
          "adj": 3650
        }
      ],
      "tf": 0.005014,
      "bmContract": 718000,
      "timeAdj": 3650,
      "net": 2375,
      "gross": 4925,
      "adjusted": 726086,
      "netPct": 0.3282,
      "grossPct": 0.6805,
      "linePct": 0.5043,
      "ppsf": 497
    },
    {
      "id": "T-B",
      "label": "COMP-B",
      "synthetic": true,
      "mls": "C-2001",
      "community": "Lake Bonavista",
      "district": "South",
      "sameDistrict": true,
      "distanceKm": 0.9,
      "contractDate": "2026-03-20",
      "contractMonth": "2026-03",
      "ageDays": 73,
      "price": 707512,
      "gla": 1405,
      "lot": 5200,
      "beds": 3,
      "baths": "2F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1983,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,405 sf (−35)",
          "adj": 2975
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,200 sf (=)",
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
          "sub": "1983 (=)",
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
          "sub": "2026-03-20 → 2026-06-01",
          "adj": 6550
        }
      ],
      "tf": 0.009231,
      "bmContract": 715000,
      "timeAdj": 6550,
      "net": 9525,
      "gross": 9525,
      "adjusted": 717037,
      "netPct": 1.3463,
      "grossPct": 1.3463,
      "linePct": 0.9258,
      "ppsf": 504
    },
    {
      "id": "T-C",
      "label": "COMP-C",
      "synthetic": true,
      "mls": "C-2002",
      "community": "Lake Bonavista",
      "district": "South",
      "sameDistrict": true,
      "distanceKm": 1.2,
      "contractDate": "2026-02-25",
      "contractMonth": "2026-02",
      "ageDays": 96,
      "price": 702383,
      "gla": 1485,
      "lot": 5200,
      "beds": 3,
      "baths": "2F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1983,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,485 sf (+45)",
          "adj": -3825
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,200 sf (=)",
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
          "sub": "1983 (=)",
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
          "sub": "2026-02-25 → 2026-06-01",
          "adj": 9450
        }
      ],
      "tf": 0.013483,
      "bmContract": 712000,
      "timeAdj": 9450,
      "net": 5625,
      "gross": 13275,
      "adjusted": 708008,
      "netPct": 0.8008,
      "grossPct": 1.89,
      "linePct": 1.3454,
      "ppsf": 473
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
      "found": 0,
      "note": "0 net additions retained after re-screening; tier opened, no qualifying sale survived.",
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
    "retrieved": 3,
    "selected": 3,
    "rejected": 0,
    "finalTier": 2,
    "wideningDepth": 2,
    "totalPenalty": -0.1
  },
  "weights": {
    "T-A": 0.4072,
    "T-B": 0.3262,
    "T-C": 0.2667
  },
  "weightDrivers": {
    "T-A": {
      "similarity": "high",
      "recency": "44 d",
      "distance": "0.6 km",
      "burden": "0.7% gross"
    },
    "T-B": {
      "similarity": "high",
      "recency": "73 d",
      "distance": "0.9 km",
      "burden": "1.3% gross"
    },
    "T-C": {
      "similarity": "high",
      "recency": "96 d",
      "distance": "1.2 km",
      "burden": "1.9% gross"
    }
  },
  "range": {
    "low": 711000,
    "point": 718500,
    "high": 726000,
    "spreadPct": 2.09
  },
  "adjustedVals": [
    726086,
    717037,
    708008
  ],
  "confidence": {
    "base": 0.55,
    "score": 0.6006,
    "low": 0.5506,
    "high": 0.6506,
    "band": "MODERATE",
    "drivers": [
      {
        "key": "compCount",
        "label": "Comp count",
        "detail": "3 selected (below minimum 4)",
        "contrib": -0.1
      },
      {
        "key": "spread",
        "label": "Adjusted-value spread",
        "detail": "$18,078 range · 2.1% of point",
        "contrib": 0.1278
      },
      {
        "key": "recency",
        "label": "Recency",
        "detail": "median contract age 73 days",
        "contrib": 0.0476
      },
      {
        "key": "distance",
        "label": "Distance",
        "detail": "0.6–1.2 km · 0 adjacent-district",
        "contrib": 0.0465
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
      "status": "CLEAR",
      "severity": "review",
      "trigger": "any selected comp contract age > 120 days",
      "detail": "All selected comps contract within 120 days."
    },
    {
      "code": "THIN_COMP_SET",
      "status": "FIRED",
      "severity": "review",
      "trigger": "selected comp count < 4",
      "detail": "3 comps selected — below the minimum of 4."
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
      "detail": "Max net adjustment 1.3% — within the 15% tolerance."
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
      "detail": "Largest single line 1.3% of price — within the 10% tolerance."
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
      "detail": "Raw (pre-adjustment) price spread 3% within the 30% watch."
    }
  ],
  "aicNote": "AIC guidance: lender net/gross/line tolerances are screening aids, not appraisal rules. A breach is a flag for narrative support — it does not supersede good appraisal practice or invalidate an otherwise well-supported comparable.",
  "narrative": {
    "scope": "This appraisal develops a market value range for 61xx Maple Ridge Drive SE, south district, effective June 1, 2026. The subject property carries an assessed value of $695,000. Analysis employs the sales comparison approach using synthetic comparables derived from Open Calgary data, with the subject property grounded in the same verified dataset.",
    "selection": "The engine retrieved 3 comparables, all of which were selected with zero rejections. All selected comparables are located within the same south district as the subject. The final tier reached was 2, indicating relaxed search parameters were required to achieve minimum comparable count. Two flags were triggered: DEEP_WIDENING noting that tier-2 relaxation was necessary with resulting confidence penalty of -0.10, and THIN_COMP_SET identifying that 3 comparables fell below the preferred minimum of 4.",
    "adjustment": "Adjustment patterns show T-A with 0.7% gross and 0.3% net adjustments, T-B with 1.3% gross and net adjustments, and T-C with 1.9% gross and 0.8% net adjustments. The relatively modest adjustment levels across all comparables support their appropriateness for analysis. Net adjustment percentages ranging from 0.3% to 1.3% demonstrate reasonable similarity to the subject property characteristics.",
    "reconciliation": "The three adjusted sale prices of $726,086 (T-A), $717,037 (T-B), and $708,008 (T-C) were weighted at 40.72%, 32.62%, and 26.67% respectively to derive the indicated range. The weighted analysis produces a value range of $711,000 to $726,000 with a point estimate of $718,500. The range spread of 2.09% indicates reasonable consistency among the comparables.",
    "confidence": "The analysis generates a MODERATE confidence rating with a score of 0.6006. Primary confidence drivers include: comp count (-0.1), adjusted-value spread (+0.1278), recency (+0.0476), distance (+0.0465), adjustment burden (+0.0287), and widening depth (-0.1). The thin comparable set and deep widening requirement represent the primary confidence detractors, while the tight value spread and reasonable recency provide positive support.",
    "limiting": "Key limitations include the below-optimal comparable count of 3 versus the preferred minimum of 4, and the requirement for tier-2 search relaxation indicating limited market activity in the immediate area. The synthetic nature of comparables, while grounded in Open Calgary data, may not capture all nuanced market factors. The DEEP_WIDENING flag indicates some degradation in temporal consistency that users should consider when applying this range."
  },
  "agentTrace": {
    "intake": {
      "source": "llm",
      "reasoning": "## Subject Property Record\n\n**Property Identity & Location:**\n- Address: 61xx Maple Ridge Drive SE\n- Roll Number: 074-19-770-03\n- District: South\n- Coordinates: 50.955, -114.05\n- Land Use: R-C1\n- Assessed Value: $695,000 (2026 assessment)\n\n**Physical Characteristics:**\n- GLA: 1,440 sq ft (from listing)\n- Lot Size: 5,200 sq ft (from listing)\n- Bedrooms (above grade): 3 (from listing)\n- Full Baths: 2 (from listing)\n- Half Baths: 1 (from listing)\n- Year Built: 1983 (grounded from Open Calgary)\n- Basement Finished: 600 sq ft (from listing)\n- Basement Walkout: Not specified (no district typical available)\n- Garage Type: Attached (from listing)\n- Garage Stalls: 2 (from listing)\n\n**Intake Reasoning:**\nThe property identity was successfully grounded through Open Calgary, providing the roll number, district classification, and confirming the 1983 build year. Most physical characteristics were clearly stated in the listing including square footages, bedroom/bathroom counts, and garage details. The only field not specified in the listing was basement walkout status, but no district-typical fallback was available for this field in the South district. All other required fields were successfully extracted from either the listing text or grounded assessment data.",
      "calls": [
        {
          "name": "lookup_open_calgary",
          "args": "address_or_roll=61xx Maple Ridge Drive SE",
          "result": "{\"address\": \"61xx Maple Ridge Drive SE\", \"district\": \"south\", \"lat\": 50.955, \"lon\": -114.05, \"roll_number\": \"074-19-770-03\", \"assessed_value\": 695000, \"land_use\": \"R-C1\", \"assessment_roll_year\": 2026, \"year_built\": 1983}"
        },
        {
          "name": "parse_listing_field",
          "args": "field=gla_sqft",
          "result": "gla_sqft=1440 (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=lot_sqft",
          "result": "lot_sqft=5200 (from listing)"
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
