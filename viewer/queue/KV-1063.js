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
    "caseId": "KV-CMP-2026-1-02",
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
    "southBenchmark": 985500,
    "cityBenchmark": 747800,
    "ppsf": 474,
    "series": "CREB · Detached · City Centre District · monthly benchmark"
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
    "roll": "031·04·221·02",
    "addr": "8xx Inglewood Drive SE",
    "addrNote": "civic address partially masked for review packet",
    "community": "City Centre district",
    "district": "City Centre",
    "quadrant": "SE",
    "landUse": "R-C1 · Residential Contextual One Dwelling",
    "assessedValue": 942000,
    "assessmentRollYear": 2026,
    "assessmentValDate": "2025-07-01",
    "ppsfAssessed": 841,
    "propertyType": "Single-family detached",
    "gla": 1120,
    "lot": 4400,
    "beds": 2,
    "bathFull": 1,
    "bathHalf": 0,
    "basementSf": 600,
    "basementFinished": true,
    "walkout": false,
    "garageStalls": 2,
    "garageType": "attached",
    "yearBuilt": 1971,
    "effDate": "2026-06-01",
    "condition": "C3",
    "quality": "Q3",
    "age": 55,
    "attrs": [
      [
        "Property type",
        "Single-family detached"
      ],
      [
        "Above-grade GLA",
        "1,120 sf"
      ],
      [
        "Site / lot",
        "4,400 sf"
      ],
      [
        "Bedrooms",
        "2"
      ],
      [
        "Bathrooms",
        "1 full / 0 half"
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
        "1971 (55 yr)"
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
      "district": "City Centre",
      "sameDistrict": true,
      "distanceKm": 0.6,
      "contractDate": "2026-04-18",
      "contractMonth": "2026-04",
      "ageDays": 44,
      "price": 978266,
      "gla": 1135,
      "lot": 4400,
      "beds": 2,
      "baths": "1F / 0H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1971,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,135 sf (+15)",
          "adj": -1275
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "4,400 sf (=)",
          "adj": 0
        },
        {
          "key": "bed",
          "label": "Bedrooms",
          "sub": "2 (=)",
          "adj": 0
        },
        {
          "key": "bath",
          "label": "Bathrooms",
          "sub": "1F / 0H (=)",
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
          "sub": "1971 (=)",
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
          "adj": 1100
        }
      ],
      "tf": 0.001113,
      "bmContract": 745400,
      "timeAdj": 1100,
      "net": -175,
      "gross": 2375,
      "adjusted": 978091,
      "netPct": -0.0179,
      "grossPct": 0.2428,
      "linePct": 0.1303,
      "ppsf": 862
    },
    {
      "id": "T-B",
      "label": "COMP-B",
      "synthetic": true,
      "mls": "C-2001",
      "community": "Lake Bonavista",
      "district": "City Centre",
      "sameDistrict": true,
      "distanceKm": 0.9,
      "contractDate": "2026-03-20",
      "contractMonth": "2026-03",
      "ageDays": 73,
      "price": 958749,
      "gla": 1085,
      "lot": 4400,
      "beds": 2,
      "baths": "1F / 0H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1971,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,085 sf (−35)",
          "adj": 2975
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "4,400 sf (=)",
          "adj": 0
        },
        {
          "key": "bed",
          "label": "Bedrooms",
          "sub": "2 (=)",
          "adj": 0
        },
        {
          "key": "bath",
          "label": "Bathrooms",
          "sub": "1F / 0H (=)",
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
          "sub": "1971 (=)",
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
          "adj": 6400
        }
      ],
      "tf": 0.00665,
      "bmContract": 741300,
      "timeAdj": 6400,
      "net": 9375,
      "gross": 9375,
      "adjusted": 968124,
      "netPct": 0.9778,
      "grossPct": 0.9778,
      "linePct": 0.6675,
      "ppsf": 884
    },
    {
      "id": "T-C",
      "label": "COMP-C",
      "synthetic": true,
      "mls": "C-2002",
      "community": "Lake Bonavista",
      "district": "City Centre",
      "sameDistrict": true,
      "distanceKm": 1.2,
      "contractDate": "2026-02-25",
      "contractMonth": "2026-02",
      "ageDays": 96,
      "price": 976461,
      "gla": 1165,
      "lot": 4400,
      "beds": 2,
      "baths": "1F / 0H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1971,
      "cond": "C3",
      "qual": "Q3",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,165 sf (+45)",
          "adj": -3825
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "4,400 sf (=)",
          "adj": 0
        },
        {
          "key": "bed",
          "label": "Bedrooms",
          "sub": "2 (=)",
          "adj": 0
        },
        {
          "key": "bath",
          "label": "Bathrooms",
          "sub": "1F / 0H (=)",
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
          "sub": "1971 (=)",
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
          "adj": 15850
        }
      ],
      "tf": 0.016247,
      "bmContract": 734300,
      "timeAdj": 15850,
      "net": 12025,
      "gross": 19675,
      "adjusted": 988486,
      "netPct": 1.2315,
      "grossPct": 2.0149,
      "linePct": 1.6232,
      "ppsf": 838
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
          "= City Centre (subject)"
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
          "City Centre + directly-adjacent"
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
          "City Centre + adjacent (unchanged)"
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
    "T-A": 0.4086,
    "T-B": 0.3263,
    "T-C": 0.2651
  },
  "weightDrivers": {
    "T-A": {
      "similarity": "high",
      "recency": "44 d",
      "distance": "0.6 km",
      "burden": "0.2% gross"
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
      "burden": "2.0% gross"
    }
  },
  "range": {
    "low": 969000,
    "point": 977500,
    "high": 986000,
    "spreadPct": 1.74
  },
  "adjustedVals": [
    978091,
    968124,
    988486
  ],
  "confidence": {
    "base": 0.55,
    "score": 0.6085,
    "low": 0.5585,
    "high": 0.6585,
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
        "detail": "$20,362 range · 1.7% of point",
        "contrib": 0.1365
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
        "detail": "worst comp at 2.0% gross",
        "contrib": 0.0279
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
      "detail": "Max net adjustment 1.2% — within the 15% tolerance."
    },
    {
      "code": "GROSS_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any selected comp gross adj > 25%",
      "detail": "Max gross adjustment 2.0% — within the 25% tolerance."
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
      "detail": "Raw (pre-adjustment) price spread 2% within the 30% watch."
    }
  ],
  "aicNote": "AIC guidance: lender net/gross/line tolerances are screening aids, not appraisal rules. A breach is a flag for narrative support — it does not supersede good appraisal practice or invalidate an otherwise well-supported comparable.",
  "narrative": {
    "scope": "This appraisal analyzes a residential property at 8xx Inglewood Drive SE within the city_centre district, with an effective date of June 1, 2026. The subject property carries an assessed value of $942,000. The analysis employs synthetic comparables derived from Open Calgary data to establish a defensible value range through sales comparison methodology.",
    "selection": "The comparable selection process retrieved 3 properties, all of which were selected for analysis with 0 rejections. All selected comparables (T-A, T-B, T-C) are located within the same city_centre district as the subject. The analysis required tier-2 relaxation to achieve the minimum comparable count, resulting in broader search parameters. This thin comparable set of 3 properties falls below the preferred minimum of 4 comparables, flagging potential limitations in market representation.",
    "adjustment": "Adjustment analysis reveals varying degrees of modification across the comparable set. Comparable T-A required minimal net adjustment at -0.0% despite 0.2% gross adjustments. Comparable T-B underwent moderate adjustments with 1.0% gross and 1.0% net modifications. Comparable T-C required the most substantial adjustments at 2.0% gross and 1.2% net. All time adjustments utilize city-wide fallback series due to absence of district-specific benchmarks, introducing approximation in temporal corrections. The overall adjustment burden remains within acceptable parameters.",
    "reconciliation": "The weighted analysis produces adjusted values of $978,091 (T-A, weight 0.4086), $968,124 (T-B, weight 0.3263), and $988,486 (T-C, weight 0.2651). These indicators support a value range of $969,000 to $986,000, with a point estimate of $977,500. The adjusted-value spread of 1.74% demonstrates reasonable convergence despite the limited comparable pool. The weighting methodology appropriately emphasizes T-A given its minimal adjustment requirements.",
    "confidence": "The confidence assessment yields a MODERATE rating with a score of 0.6085. Positive contributors include adjusted-value spread (+0.1365), recency (+0.0476), distance (+0.0465), and adjustment burden (+0.0279). Negative factors include insufficient comparable count (-0.1) and widening depth penalty (-0.1) due to tier-2 relaxation requirements. The moderate confidence level reflects the balance between reasonable comparable quality and quantity limitations inherent in the thin market representation.",
    "limiting": "This valuation is subject to several limiting conditions affecting reliability. The tier-2 widening required to achieve minimum comparable count degrades recency distribution and market representativeness. The thin comparable set of 3 properties constrains statistical robustness typically provided by larger samples. Time adjustments rely on city-wide approximations rather than district-specific benchmarks, introducing temporal correction uncertainty. Users should consider these limitations when applying the $969,000-$986,000 value range for underwriting decisions."
  },
  "agentTrace": {
    "intake": {
      "source": "llm",
      "reasoning": "## Subject Property Record\n\n**Identity & Assessment:**\n- Address: 8xx Inglewood Drive SE\n- Roll Number: 031-04-221-02\n- District: city_centre\n- Coordinates: 51.035, -114.02\n- Assessed Value: $942,000 (2026)\n- Land Use: R-C1\n- Year Built: 1971 (grounded from Open Calgary)\n\n**Physical Characteristics:**\n- GLA: 1,120 sq ft (from listing)\n- Lot Size: 4,400 sq ft (from listing)\n- Bedrooms Above Grade: 2 (from listing)\n- Full Bathrooms: 1 (from listing)\n- Half Bathrooms: 0 (from listing)\n- Basement Finished: 600 sq ft (from listing)\n- Basement Walkout: No district-typical value available\n- Garage Type: Attached (from listing)\n- Garage Stalls: 2 (from listing)\n\n**Intake Reasoning:** The property identity was successfully grounded through Open Calgary records, establishing the city_centre district and confirming the 1971 build year. The listing provided comprehensive physical details including square footages, bedroom/bathroom counts, basement finish, and garage specifications. Only the basement walkout status was absent from the listing, but no district-typical fallback value was available for this field in the city_centre district.",
      "calls": [
        {
          "name": "lookup_open_calgary",
          "args": "address_or_roll=8xx Inglewood Drive SE",
          "result": "{\"address\": \"8xx Inglewood Drive SE\", \"district\": \"city_centre\", \"lat\": 51.035, \"lon\": -114.02, \"roll_number\": \"031-04-221-02\", \"assessed_value\": 942000, \"land_use\": \"R-C1\", \"assessment_roll_year\": 2026, \"year_built\": 1971}"
        },
        {
          "name": "parse_listing_field",
          "args": "field=gla_sqft",
          "result": "gla_sqft=1120 (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=lot_sqft",
          "result": "lot_sqft=4400 (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=beds_ag",
          "result": "beds_ag=2 (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=full_baths",
          "result": "full_baths=1 (from listing)"
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
        },
        {
          "name": "district_typical",
          "args": "district=city_centre, field=basement_walkout",
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
