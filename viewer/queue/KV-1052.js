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
    "caseId": "KV-CMP-2026-1-08",
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
    "roll": "074·30·441·08",
    "addr": "98xx Elbow Drive SW",
    "addrNote": "civic address partially masked for review packet",
    "community": "South district",
    "district": "South",
    "quadrant": "SW",
    "landUse": "R-C1 · Residential Contextual One Dwelling",
    "assessedValue": 731000,
    "assessmentRollYear": 2026,
    "assessmentValDate": "2025-07-01",
    "ppsfAssessed": 497,
    "propertyType": "Single-family detached",
    "gla": 1470,
    "lot": 5300,
    "beds": 3,
    "bathFull": 2,
    "bathHalf": 1,
    "basementSf": 600,
    "basementFinished": true,
    "walkout": false,
    "garageStalls": 2,
    "garageType": "attached",
    "yearBuilt": 1985,
    "effDate": "2026-06-01",
    "condition": "C3",
    "quality": "Q3",
    "age": 41,
    "attrs": [
      [
        "Property type",
        "Single-family detached"
      ],
      [
        "Above-grade GLA",
        "1,470 sf"
      ],
      [
        "Site / lot",
        "5,300 sf"
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
        "1985 (41 yr)"
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
      "id": "U-A",
      "label": "COMP-A",
      "synthetic": true,
      "mls": "C-2000",
      "community": "Lake Bonavista",
      "district": "South",
      "sameDistrict": true,
      "distanceKm": 0.6,
      "contractDate": "2026-05-02",
      "contractMonth": "2026-05",
      "ageDays": 30,
      "price": 818926,
      "gla": 1970,
      "lot": 5300,
      "beds": 3,
      "baths": "2F / 1H",
      "basement": "1050 sf fin",
      "garage": "2 · att.",
      "built": 1985,
      "cond": "C2",
      "qual": "Q1",
      "tier": 0,
      "watch": [
        "EXCESSIVE_GROSS_ADJ"
      ],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,970 sf (+500)",
          "adj": -42500
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,300 sf (=)",
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
          "sub": "1,050 sf fin (+450)",
          "adj": -15750
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
          "sub": "1985 (=)",
          "adj": 0
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
          "sub": "Q1 (+2 step)",
          "adj": -30000
        },
        {
          "key": "time",
          "label": "Time / market cond.",
          "sub": "2026-05-02 → 2026-06-01",
          "adj": 1250
        }
      ],
      "tf": 0.001527,
      "bmContract": 720500,
      "timeAdj": 1250,
      "net": -99000,
      "gross": 101500,
      "adjusted": 719926,
      "netPct": -12.089,
      "grossPct": 12.3943,
      "linePct": 5.1897,
      "ppsf": 416
    },
    {
      "id": "U-B",
      "label": "COMP-B",
      "synthetic": true,
      "mls": "C-2001",
      "community": "Lake Bonavista",
      "district": "South",
      "sameDistrict": true,
      "distanceKm": 0.9,
      "contractDate": "2026-04-10",
      "contractMonth": "2026-04",
      "ageDays": 52,
      "price": 820355,
      "gla": 1930,
      "lot": 5300,
      "beds": 3,
      "baths": "2F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1985,
      "cond": "C1",
      "qual": "Q2",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,930 sf (+460)",
          "adj": -39100
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,300 sf (=)",
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
          "sub": "1985 (=)",
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
          "sub": "Q2 (+1 step)",
          "adj": -15000
        },
        {
          "key": "time",
          "label": "Time / market cond.",
          "sub": "2026-04-10 → 2026-06-01",
          "adj": 4100
        }
      ],
      "tf": 0.005014,
      "bmContract": 718000,
      "timeAdj": 4100,
      "net": -74000,
      "gross": 82200,
      "adjusted": 746355,
      "netPct": -9.0205,
      "grossPct": 10.0201,
      "linePct": 4.7662,
      "ppsf": 425
    },
    {
      "id": "U-C",
      "label": "COMP-C",
      "synthetic": true,
      "mls": "C-2002",
      "community": "Lake Bonavista",
      "district": "South",
      "sameDistrict": true,
      "distanceKm": 1.2,
      "contractDate": "2026-03-16",
      "contractMonth": "2026-03",
      "ageDays": 77,
      "price": 772048,
      "gla": 2010,
      "lot": 5300,
      "beds": 3,
      "baths": "3F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1985,
      "cond": "C3",
      "qual": "Q1",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "2,010 sf (+540)",
          "adj": -45900
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,300 sf (=)",
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
          "sub": "1985 (=)",
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
          "sub": "Q1 (+2 step)",
          "adj": -30000
        },
        {
          "key": "time",
          "label": "Time / market cond.",
          "sub": "2026-03-16 → 2026-06-01",
          "adj": 7150
        }
      ],
      "tf": 0.009231,
      "bmContract": 715000,
      "timeAdj": 7150,
      "net": -74750,
      "gross": 89050,
      "adjusted": 697298,
      "netPct": -9.682,
      "grossPct": 11.5343,
      "linePct": 5.9452,
      "ppsf": 384
    },
    {
      "id": "U-D",
      "label": "COMP-D",
      "synthetic": true,
      "mls": "C-2003",
      "community": "Lake Bonavista",
      "district": "South",
      "sameDistrict": true,
      "distanceKm": 1.5,
      "contractDate": "2026-02-22",
      "contractMonth": "2026-02",
      "ageDays": 99,
      "price": 775277,
      "gla": 1950,
      "lot": 5300,
      "beds": 3,
      "baths": "2F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 1985,
      "cond": "C2",
      "qual": "Q2",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,950 sf (+480)",
          "adj": -40800
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "5,300 sf (=)",
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
          "sub": "1985 (=)",
          "adj": 0
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
          "sub": "2026-02-22 → 2026-06-01",
          "adj": 10450
        }
      ],
      "tf": 0.013483,
      "bmContract": 712000,
      "timeAdj": 10450,
      "net": -57350,
      "gross": 78250,
      "adjusted": 717927,
      "netPct": -7.3974,
      "grossPct": 10.0932,
      "linePct": 5.2626,
      "ppsf": 398
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
      "found": 4,
      "note": null,
      "penalty": 0.0
    }
  ],
  "searchSummary": {
    "retrieved": 4,
    "selected": 4,
    "rejected": 0,
    "finalTier": 0,
    "wideningDepth": 0,
    "totalPenalty": 0.0
  },
  "weights": {
    "U-A": 0.2817,
    "U-B": 0.302,
    "U-C": 0.2146,
    "U-D": 0.2017
  },
  "weightDrivers": {
    "U-A": {
      "similarity": "moderate",
      "recency": "30 d",
      "distance": "0.6 km",
      "burden": "12.4% gross"
    },
    "U-B": {
      "similarity": "moderate",
      "recency": "52 d",
      "distance": "0.9 km",
      "burden": "10.0% gross"
    },
    "U-C": {
      "similarity": "moderate",
      "recency": "77 d",
      "distance": "1.2 km",
      "burden": "11.5% gross"
    },
    "U-D": {
      "similarity": "moderate",
      "recency": "99 d",
      "distance": "1.5 km",
      "burden": "10.1% gross"
    }
  },
  "range": {
    "low": 705000,
    "point": 722500,
    "high": 740000,
    "spreadPct": 4.84
  },
  "adjustedVals": [
    719926,
    746355,
    697298,
    717927
  ],
  "confidence": {
    "base": 0.55,
    "score": 0.7504,
    "low": 0.7004,
    "high": 0.8004,
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
        "detail": "$49,057 range · 4.8% of point",
        "contrib": 0.059
      },
      {
        "key": "recency",
        "label": "Recency",
        "detail": "median contract age 64 days",
        "contrib": 0.0516
      },
      {
        "key": "distance",
        "label": "Distance",
        "detail": "0.6–1.5 km · 0 adjacent-district",
        "contrib": 0.0442
      },
      {
        "key": "burden",
        "label": "Adjustment burden",
        "detail": "worst comp at 12.4% gross",
        "contrib": -0.0344
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
      "detail": "4 comps selected — at or above the minimum of 4."
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
      "detail": "COMP-A 12.4% exceed the 12% review band (hard cap 25%); retained at reduced weight."
    },
    {
      "code": "EXCESSIVE_NET_ADJ",
      "status": "FIRED",
      "severity": "review",
      "trigger": "any selected comp net adj > 8% review band",
      "detail": "COMP-A -12.1%, COMP-B -9.0%, COMP-C -9.7% exceed the 8% net review band; narrative support advised."
    },
    {
      "code": "NET_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any selected comp net adj > 15%",
      "detail": "Max net adjustment 12.1% — within the 15% tolerance."
    },
    {
      "code": "GROSS_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any selected comp gross adj > 25%",
      "detail": "Max gross adjustment 12.4% — within the 25% tolerance."
    },
    {
      "code": "LINE_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any single line adj > 10%",
      "detail": "Largest single line 5.9% of price — within the 10% tolerance."
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
      "detail": "Raw (pre-adjustment) price spread 6% within the 30% watch."
    }
  ],
  "aicNote": "AIC guidance: lender net/gross/line tolerances are screening aids, not appraisal rules. A breach is a flag for narrative support — it does not supersede good appraisal practice or invalidate an otherwise well-supported comparable.",
  "narrative": {
    "scope": "This memo documents a sales-comparison analysis supporting a defensible value RANGE for the subject property as of the effective date, prepared for collateral-underwriting review. It builds and documents the case for a range; it does not render a point value or a lending decision.",
    "selection": "4 comparable sales were retained from 4 retrieved candidates. Selection began in the tight tier-0 band (subject district, within six months) and widened to tier 0 only as needed to reach the minimum count. 0 candidates were rejected under documented reason codes () — the rejections are the tell a black-box AVM cannot give.",
    "adjustment": "Each comparable was adjusted to the subject on a transparent grid using a fixed rate card, with time adjustments derived from each comparable's contract month against the CREB district benchmark and applied toward the effective date. U-A carried an above-review-band gross adjustment and was retained at reduced weight.",
    "reconciliation": "Adjusted values were reconciled by weight rather than simple average, emphasising the most similar, most recent, and least-adjusted evidence. The weighted central indication is $722,500, within a supported range of $705,000 to $740,000 (spread 4.8%) that brackets the adjusted comparables.",
    "confidence": "Confidence is assessed MODERATE (0.75). 2 human-review flags fired and are documented below; none constitutes a failure — each is a prompt for reviewer narrative under AIC guidance.",
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
