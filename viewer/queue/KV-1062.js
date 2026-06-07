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
    "caseId": "KV-CMP-2026-0-07",
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
    "roll": "063·22·980·07",
    "addr": "29xx Edgemont Boulevard NW",
    "addrNote": "civic address partially masked for review packet",
    "community": "North West district",
    "district": "North West",
    "quadrant": "NW",
    "landUse": "R-C1 · Residential Contextual One Dwelling",
    "assessedValue": 712000,
    "assessmentRollYear": 2026,
    "assessmentValDate": "2025-07-01",
    "ppsfAssessed": 468,
    "propertyType": "Single-family detached",
    "gla": 1520,
    "lot": 5400,
    "beds": 3,
    "bathFull": 2,
    "bathHalf": 1,
    "basementSf": 600,
    "basementFinished": true,
    "walkout": false,
    "garageStalls": 2,
    "garageType": "attached",
    "yearBuilt": 1992,
    "effDate": "2026-06-01",
    "condition": "C3",
    "quality": "Q3",
    "age": 34,
    "attrs": [
      [
        "Property type",
        "Single-family detached"
      ],
      [
        "Above-grade GLA",
        "1,520 sf"
      ],
      [
        "Site / lot",
        "5,400 sf"
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
        "1992 (34 yr)"
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
      "district": "North West",
      "sameDistrict": true,
      "distanceKm": 0.6,
      "contractDate": "2026-04-18",
      "contractMonth": "2026-04",
      "ageDays": 44,
      "price": 801885,
      "gla": 1535,
      "lot": 5400,
      "beds": 3,
      "baths": "2F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1992,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,535 sf (+15)",
          "adj": -1275
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,400 sf (=)",
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
          "sub": "1992 (=)",
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
          "adj": 900
        }
      ],
      "tf": 0.001113,
      "bmContract": 745400,
      "timeAdj": 900,
      "net": -375,
      "gross": 2175,
      "adjusted": 801510,
      "netPct": -0.0468,
      "grossPct": 0.2712,
      "linePct": 0.159,
      "ppsf": 522
    },
    {
      "id": "T-B",
      "label": "COMP-B",
      "synthetic": true,
      "mls": "C-2001",
      "community": "Lake Bonavista",
      "district": "North West",
      "sameDistrict": true,
      "distanceKm": 0.9,
      "contractDate": "2026-03-20",
      "contractMonth": "2026-03",
      "ageDays": 73,
      "price": 791314,
      "gla": 1485,
      "lot": 5400,
      "beds": 3,
      "baths": "2F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1992,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,485 sf (−35)",
          "adj": 2975
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,400 sf (=)",
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
          "sub": "1992 (=)",
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
          "adj": 5250
        }
      ],
      "tf": 0.00665,
      "bmContract": 741300,
      "timeAdj": 5250,
      "net": 8225,
      "gross": 8225,
      "adjusted": 799539,
      "netPct": 1.0394,
      "grossPct": 1.0394,
      "linePct": 0.6635,
      "ppsf": 533
    },
    {
      "id": "T-C",
      "label": "COMP-C",
      "synthetic": true,
      "mls": "C-2002",
      "community": "Lake Bonavista",
      "district": "North West",
      "sameDistrict": true,
      "distanceKm": 1.2,
      "contractDate": "2026-02-25",
      "contractMonth": "2026-02",
      "ageDays": 96,
      "price": 774692,
      "gla": 1565,
      "lot": 5400,
      "beds": 3,
      "baths": "2F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1992,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,565 sf (+45)",
          "adj": -3825
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,400 sf (=)",
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
          "sub": "1992 (=)",
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
          "adj": 12600
        }
      ],
      "tf": 0.016247,
      "bmContract": 734300,
      "timeAdj": 12600,
      "net": 8775,
      "gross": 16425,
      "adjusted": 783467,
      "netPct": 1.1327,
      "grossPct": 2.1202,
      "linePct": 1.6265,
      "ppsf": 495
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
          "North West + directly-adjacent"
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
          "North West + adjacent (unchanged)"
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
    "T-A": 0.4079,
    "T-B": 0.3266,
    "T-C": 0.2656
  },
  "weightDrivers": {
    "T-A": {
      "similarity": "high",
      "recency": "44 d",
      "distance": "0.6 km",
      "burden": "0.3% gross"
    },
    "T-B": {
      "similarity": "high",
      "recency": "73 d",
      "distance": "0.9 km",
      "burden": "1.0% gross"
    },
    "T-C": {
      "similarity": "high",
      "recency": "96 d",
      "distance": "1.2 km",
      "burden": "2.1% gross"
    }
  },
  "range": {
    "low": 788000,
    "point": 796000,
    "high": 804000,
    "spreadPct": 2.01
  },
  "adjustedVals": [
    801510,
    799539,
    783467
  ],
  "confidence": {
    "base": 0.55,
    "score": 0.6012,
    "low": 0.5512,
    "high": 0.6512,
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
        "detail": "$18,043 range · 2.0% of point",
        "contrib": 0.1298
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
        "detail": "worst comp at 2.1% gross",
        "contrib": 0.0273
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
      "detail": "Max net adjustment 1.1% — within the 15% tolerance."
    },
    {
      "code": "GROSS_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any selected comp gross adj > 25%",
      "detail": "Max gross adjustment 2.1% — within the 25% tolerance."
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
      "detail": "COMP-A, COMP-B, COMP-C use the city-wide fallback series (no encoded district benchmark); time adjustment is approximate."
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
    "scope": "This appraisal analyzes 29xx Edgemont Boulevard NW in the north_west district as of June 1, 2026, with an assessed value of $712,000. The sales comparison approach utilizes synthetic comparables processed through a deterministic engine, with the subject property grounded in Open Calgary data. The analysis develops a market value range through systematic comparable selection and adjustment protocols.",
    "selection": "The engine retrieved 3 comparables and selected all 3 for analysis, with no rejections recorded. All selected comparables (T-A, T-B, T-C) are located within the same north_west district as the subject. However, the comp set required tier-2 relaxation to meet minimum count thresholds, resulting in a degraded recency distribution. The final comparable count of 3 falls below the preferred minimum of 4, triggering the THIN_COMP_SET flag for commentary.",
    "adjustment": "Adjustment analysis reveals varying levels of modification across the comparable set. T-A shows gross adjustments of 0.3% with net adjustments of 0.0%, indicating offsetting modifications. T-B exhibits both gross and net adjustments of 1.0%, while T-C demonstrates the highest adjustment burden with gross adjustments of 2.1% and net adjustments of 1.1%. All comparables utilize city-wide fallback time adjustment series due to absence of encoded district benchmarks, resulting in approximate rather than precise temporal adjustments as flagged by UNSUPPORTED_TIME_ADJ.",
    "reconciliation": "The adjusted comparable values range from $783,467 (T-C) to $801,510 (T-A), producing a tight 2.01% spread. Weighted analysis assigns the highest weight of 0.4079 to T-A, followed by T-B at 0.3266 and T-C at 0.2656. The reconciliation establishes a value range of $788,000 to $804,000 with a point estimate of $796,000, representing a balanced consideration of all three tier-0 comparables within the same district classification.",
    "confidence": "The analysis generates a MODERATE confidence score of 0.6012. Positive contributors include adjusted-value spread (+0.1298), recency (+0.0476), distance (+0.0465), and adjustment burden (+0.0273). Negative factors include comp count (-0.1) and widening depth (-0.1), both reflecting the limited comparable inventory requiring tier-2 relaxation. The moderate confidence level appropriately reflects the technical limitations while acknowledging the tight value clustering and same-district positioning.",
    "limiting": "This appraisal is subject to standard limiting conditions regarding synthetic comparable methodology and Open Calgary data dependencies. The DEEP_WIDENING and THIN_COMP_SET flags indicate constrained comparable availability, potentially affecting range precision. Time adjustments rely on city-wide rather than district-specific benchmarks, introducing approximation in temporal modifications. The 2.01% value spread and moderate confidence score reflect appropriate market positioning given these technical constraints and data limitations."
  },
  "agentTrace": {
    "intake": {
      "source": "deterministic",
      "reasoning": "Intake grounded 9 identity/assessment field(s) from Open Calgary (address, assessed_value, assessment_roll_year, district, land_use, lat, lon, roll_number, year_built); read 8 attribute(s) from the listing (basement_finished_sqft, beds_ag, full_baths, garage_stalls, garage_type, gla_sqft, half_baths, lot_sqft); and fell back to CREB district-typical values for 0 field(s) (none) the listing did not state. No physical value was estimated; absent fields are labelled district_typical.",
      "calls": [
        {
          "name": "lookup_open_calgary",
          "args": "address_or_roll=29xx Edgemont Boulevard NW",
          "result": "{\"address\": \"29xx Edgemont Boulevard NW\", \"district\": \"north_west\", \"lat\": 51.11, \"lon\": -114.13, \"roll_number\": \"063-22-980-07\", \"assessed_value\": 712000, \"land_use\": \"R-C1\", \"assessment_roll_year\": 2026, \"year_built\": 1992}"
        },
        {
          "name": "parse_listing_field",
          "args": "field=gla_sqft",
          "result": "gla_sqft=1520 (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=lot_sqft",
          "result": "lot_sqft=5400 (from listing)"
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
