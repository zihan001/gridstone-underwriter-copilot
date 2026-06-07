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
    "caseId": "KV-CMP-2026-7-05",
    "snapshot": "2026-06-01T00:00:00-06:00",
    "effectiveDate": "2026-06-01",
    "approach": "Sales Comparison Approach",
    "analyst": "model:underwrite-copilot v1.0.0",
    "purpose": "Defend a value RANGE for collateral review — never a point decision."
  },
  "narrativeSource": "template",
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
    "southBenchmark": 563900,
    "cityBenchmark": 747800,
    "ppsf": 474,
    "series": "CREB · Detached · North East District · monthly benchmark"
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
    "roll": "047·24·117·05",
    "addr": "51xx Rundlehorn Drive NE",
    "addrNote": "civic address partially masked for review packet",
    "community": "North East district",
    "district": "North East",
    "quadrant": "NE",
    "landUse": "R-C1 · Residential Contextual One Dwelling",
    "assessedValue": 548000,
    "assessmentRollYear": 2026,
    "assessmentValDate": "2025-07-01",
    "ppsfAssessed": 449,
    "propertyType": "Single-family detached",
    "gla": 1220,
    "lot": 4700,
    "beds": 3,
    "bathFull": 1,
    "bathHalf": 1,
    "basementSf": 600,
    "basementFinished": true,
    "walkout": false,
    "garageStalls": 2,
    "garageType": "attached",
    "yearBuilt": 1978,
    "effDate": "2026-06-01",
    "condition": "C3",
    "quality": "Q3",
    "age": 48,
    "attrs": [
      [
        "Property type",
        "Single-family detached"
      ],
      [
        "Above-grade GLA",
        "1,220 sf"
      ],
      [
        "Site / lot",
        "4,700 sf"
      ],
      [
        "Bedrooms",
        "3"
      ],
      [
        "Bathrooms",
        "1 full / 1 half"
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
        "1978 (48 yr)"
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
      "id": "G-A",
      "label": "COMP-A",
      "synthetic": true,
      "mls": "C-2000",
      "community": "Lake Bonavista",
      "district": "North East",
      "sameDistrict": true,
      "distanceKm": 0.6,
      "contractDate": "2026-04-27",
      "contractMonth": "2026-04",
      "ageDays": 35,
      "price": 667005,
      "gla": 1290,
      "lot": 4700,
      "beds": 3,
      "baths": "2F / 1H",
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
          "sub": "1,290 sf (+70)",
          "adj": -5950
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "4,700 sf (=)",
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
          "sub": "2F / 1H (+1 full)",
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
          "sub": "2012 (+34 yr)",
          "adj": -23800
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
          "adj": 750
        }
      ],
      "tf": 0.001113,
      "bmContract": 745400,
      "timeAdj": 750,
      "net": -110000,
      "gross": 111500,
      "adjusted": 557005,
      "netPct": -16.4916,
      "grossPct": 16.7165,
      "linePct": 4.4977,
      "ppsf": 517
    },
    {
      "id": "G-B",
      "label": "COMP-B",
      "synthetic": true,
      "mls": "C-2001",
      "community": "Lake Bonavista",
      "district": "North East",
      "sameDistrict": true,
      "distanceKm": 0.9,
      "contractDate": "2026-04-14",
      "contractMonth": "2026-04",
      "ageDays": 48,
      "price": 613823,
      "gla": 1250,
      "lot": 4700,
      "beds": 3,
      "baths": "1F / 1H",
      "basement": "600 sf fin",
      "garage": "2 · att.",
      "built": 2006,
      "cond": "C1",
      "qual": "Q2",
      "tier": 0,
      "watch": [],
      "lines": [
        {
          "key": "gla",
          "label": "Above-grade GLA",
          "sub": "1,250 sf (+30)",
          "adj": -2550
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "4,700 sf (=)",
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
          "sub": "1F / 1H (=)",
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
          "sub": "2006 (+28 yr)",
          "adj": -19600
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
          "adj": 700
        }
      ],
      "tf": 0.001113,
      "bmContract": 745400,
      "timeAdj": 700,
      "net": -60450,
      "gross": 61850,
      "adjusted": 553373,
      "netPct": -9.8481,
      "grossPct": 10.0762,
      "linePct": 3.9099,
      "ppsf": 491
    },
    {
      "id": "G-C",
      "label": "COMP-C",
      "synthetic": true,
      "mls": "C-2002",
      "community": "Lake Bonavista",
      "district": "North East",
      "sameDistrict": true,
      "distanceKm": 1.2,
      "contractDate": "2026-03-31",
      "contractMonth": "2026-03",
      "ageDays": 62,
      "price": 575299,
      "gla": 1225,
      "lot": 4700,
      "beds": 3,
      "baths": "1F / 1H",
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
          "sub": "1,225 sf (+5)",
          "adj": -425
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "4,700 sf (=)",
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
          "sub": "1F / 1H (=)",
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
          "sub": "1998 (+20 yr)",
          "adj": -14000
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
          "adj": 3850
        }
      ],
      "tf": 0.00665,
      "bmContract": 741300,
      "timeAdj": 3850,
      "net": -22575,
      "gross": 30275,
      "adjusted": 552724,
      "netPct": -3.924,
      "grossPct": 5.2625,
      "linePct": 2.4335,
      "ppsf": 470
    },
    {
      "id": "G-D",
      "label": "COMP-D",
      "synthetic": true,
      "mls": "C-2003",
      "community": "Lake Bonavista",
      "district": "North East",
      "sameDistrict": true,
      "distanceKm": 1.5,
      "contractDate": "2026-03-18",
      "contractMonth": "2026-03",
      "ageDays": 75,
      "price": 518792,
      "gla": 1210,
      "lot": 4700,
      "beds": 3,
      "baths": "1F / 1H",
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
          "sub": "1,210 sf (−10)",
          "adj": 850
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "4,700 sf (=)",
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
          "sub": "1F / 1H (=)",
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
          "sub": "1978 (=)",
          "adj": 0
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
          "adj": 3450
        }
      ],
      "tf": 0.00665,
      "bmContract": 741300,
      "timeAdj": 3450,
      "net": 31300,
      "gross": 31300,
      "adjusted": 550092,
      "netPct": 6.0332,
      "grossPct": 6.0332,
      "linePct": 2.8913,
      "ppsf": 429
    },
    {
      "id": "G-E",
      "label": "COMP-E",
      "synthetic": true,
      "mls": "C-2004",
      "community": "Lake Bonavista",
      "district": "North East",
      "sameDistrict": true,
      "distanceKm": 1.8,
      "contractDate": "2026-03-05",
      "contractMonth": "2026-03",
      "ageDays": 88,
      "price": 477596,
      "gla": 1195,
      "lot": 4700,
      "beds": 3,
      "baths": "1F / 1H",
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
          "sub": "1,195 sf (−25)",
          "adj": 2125
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "4,700 sf (=)",
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
          "sub": "1F / 1H (=)",
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
          "sub": "1966 (−12 yr)",
          "adj": 8400
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
          "adj": 3200
        }
      ],
      "tf": 0.00665,
      "bmContract": 741300,
      "timeAdj": 3200,
      "net": 67725,
      "gross": 67725,
      "adjusted": 545321,
      "netPct": 14.1804,
      "grossPct": 14.1804,
      "linePct": 6.2815,
      "ppsf": 400
    },
    {
      "id": "G-F",
      "label": "COMP-F",
      "synthetic": true,
      "mls": "C-2005",
      "community": "Lake Bonavista",
      "district": "North East",
      "sameDistrict": true,
      "distanceKm": 2.1,
      "contractDate": "2026-02-21",
      "contractMonth": "2026-02",
      "ageDays": 100,
      "price": 480594,
      "gla": 1240,
      "lot": 4700,
      "beds": 3,
      "baths": "1F / 1H",
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
          "sub": "1,240 sf (+20)",
          "adj": -1700
        },
        {
          "key": "lot",
          "label": "Site / lot",
          "sub": "4,700 sf (=)",
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
          "sub": "1F / 1H (=)",
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
          "sub": "1962 (−16 yr)",
          "adj": 11200
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
          "adj": 7800
        }
      ],
      "tf": 0.016247,
      "bmContract": 734300,
      "timeAdj": 7800,
      "net": 71300,
      "gross": 74700,
      "adjusted": 551894,
      "netPct": 14.8358,
      "grossPct": 15.5433,
      "linePct": 6.2423,
      "ppsf": 388
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
      "district": "North East",
      "contractDate": "2025-04-22",
      "price": 600898,
      "gla": 1460,
      "ppsf": 412,
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
      "district": "North East",
      "contractDate": "2026-03-29",
      "price": 827319,
      "gla": 2420,
      "ppsf": 342,
      "detail": "Cumulative gross adjustment 35.7% exceeds the 25% hard cap. Too dissimilar to bracket the subject — not comparable.",
      "metricLabel": "gross adjustment",
      "metricValue": "35.7%",
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
      "price": 552670,
      "gla": 1220,
      "ppsf": 453,
      "detail": "West is not adjacent to the subject district under the tier-1 topology map (no shared boundary). Excluded before adjustment to avoid a cross-market location bridge.",
      "metricLabel": "district",
      "metricValue": "West (non-adj.)",
      "cap": "North East ± adjacent"
    },
    {
      "id": "C-H",
      "label": "COMP-H",
      "synthetic": true,
      "mls": "C-2195",
      "code": "OUTLIER_PRICE",
      "community": "Lake Bonavista",
      "district": "North East",
      "contractDate": "2026-03-12",
      "price": 305178,
      "gla": 1470,
      "ppsf": 208,
      "detail": "PPSF $208 sits 5.1 MAD low of the candidate median ($441). Probable non-arm's-length / distressed transfer — excluded as a price outlier rather than market evidence.",
      "metricLabel": "PPSF deviation",
      "metricValue": "5.1 MAD low",
      "cap": "≤ 2.0 MAD"
    },
    {
      "id": "C-I",
      "label": "COMP-I",
      "synthetic": true,
      "mls": "C-7741",
      "code": "DUPLICATE",
      "community": "Lake Bonavista",
      "district": "North East",
      "contractDate": "2025-04-22",
      "price": 600898,
      "gla": 1460,
      "ppsf": 412,
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
          "= North East (subject)"
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
    "G-A": 0.1304,
    "G-B": 0.2007,
    "G-C": 0.2003,
    "G-D": 0.2006,
    "G-E": 0.1461,
    "G-F": 0.1219
  },
  "weightDrivers": {
    "G-A": {
      "similarity": "low",
      "recency": "35 d",
      "distance": "0.6 km",
      "burden": "16.7% gross"
    },
    "G-B": {
      "similarity": "moderate",
      "recency": "48 d",
      "distance": "0.9 km",
      "burden": "10.1% gross"
    },
    "G-C": {
      "similarity": "moderate",
      "recency": "62 d",
      "distance": "1.2 km",
      "burden": "5.3% gross"
    },
    "G-D": {
      "similarity": "high",
      "recency": "75 d",
      "distance": "1.5 km",
      "burden": "6.0% gross"
    },
    "G-E": {
      "similarity": "moderate",
      "recency": "88 d",
      "distance": "1.8 km",
      "burden": "14.2% gross"
    },
    "G-F": {
      "similarity": "moderate",
      "recency": "100 d",
      "distance": "2.1 km",
      "burden": "15.5% gross"
    }
  },
  "range": {
    "low": 547000,
    "point": 551500,
    "high": 556000,
    "spreadPct": 1.63
  },
  "adjustedVals": [
    557005,
    553373,
    552724,
    550092,
    545321,
    551894
  ],
  "confidence": {
    "base": 0.55,
    "score": 0.8585,
    "low": 0.8085,
    "high": 0.9085,
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
        "detail": "$11,684 range · 1.6% of point",
        "contrib": 0.1392
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
        "detail": "worst comp at 16.7% gross",
        "contrib": -0.0603
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
      "detail": "COMP-A 16.7%, COMP-E 14.2%, COMP-F 15.5% exceed the 12% review band (hard cap 25%); retained at reduced weight."
    },
    {
      "code": "EXCESSIVE_NET_ADJ",
      "status": "FIRED",
      "severity": "review",
      "trigger": "any selected comp net adj > 8% review band",
      "detail": "COMP-A -16.5%, COMP-B -9.8%, COMP-E +14.2%, COMP-F +14.8% exceed the 8% net review band; narrative support advised."
    },
    {
      "code": "NET_ADJ_BREACH",
      "status": "FIRED",
      "severity": "tolerance",
      "trigger": "any selected comp net adj > 15%",
      "detail": "COMP-A -16.5% breach the 15% hard tolerance — explain in commentary (AIC: not a fail)."
    },
    {
      "code": "GROSS_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any selected comp gross adj > 25%",
      "detail": "Max gross adjustment 16.7% — within the 25% tolerance."
    },
    {
      "code": "LINE_ADJ_BREACH",
      "status": "CLEAR",
      "severity": "tolerance",
      "trigger": "any single line adj > 10%",
      "detail": "Largest single line 6.3% of price — within the 10% tolerance."
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
      "detail": "COMP-A, COMP-B, COMP-C, COMP-D, COMP-E, COMP-F use the city-wide fallback series (no encoded district benchmark); time adjustment is approximate."
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
    "selection": "6 comparable sales were retained from 11 retrieved candidates. Selection began in the tight tier-0 band (subject district, within six months) and widened to tier 0 only as needed to reach the minimum count. 5 candidates were rejected under documented reason codes (duplicate, gross adj too high, outlier price, too stale, wrong district after widening) — the rejections are the tell a black-box AVM cannot give.",
    "adjustment": "Each comparable was adjusted to the subject on a transparent grid using a fixed rate card, with time adjustments derived from each comparable's contract month against the CREB district benchmark and applied toward the effective date. G-A, G-E, G-F carried an above-review-band gross adjustment and were retained at reduced weight.",
    "reconciliation": "Adjusted values were reconciled by weight rather than simple average, emphasising the most similar, most recent, and least-adjusted evidence. The weighted central indication is $551,500, within a supported range of $547,000 to $556,000 (spread 1.6%) that brackets the adjusted comparables.",
    "confidence": "Confidence is assessed HIGH (0.86). 5 human-review flags fired and are documented below; none constitutes a failure — each is a prompt for reviewer narrative under AIC guidance.",
    "limiting": "All comparable data shown is SYNTHETIC and illustrative, priced from an explicit contributory model (the matched pair). Subject characteristics are grounded in Open Calgary assessment data (source: open_calgary_assessment); physical attributes are intake/district-typical where the free dataset does not publish them. Every non-CREB dollar magnitude is a US/North-American proxy to be locally calibrated. This artifact is render-only and contains no live computation."
  },
  "agentTrace": {
    "intake": {
      "source": "deterministic",
      "reasoning": "Intake grounded 9 identity/assessment field(s) from Open Calgary (address, assessed_value, assessment_roll_year, district, land_use, lat, lon, roll_number, year_built); read 8 attribute(s) from the listing (basement_finished_sqft, beds_ag, full_baths, garage_stalls, garage_type, gla_sqft, half_baths, lot_sqft); and fell back to CREB district-typical values for 0 field(s) (none) the listing did not state. No physical value was estimated; absent fields are labelled district_typical.",
      "calls": [
        {
          "name": "lookup_open_calgary",
          "args": "address_or_roll=51xx Rundlehorn Drive NE",
          "result": "{\"address\": \"51xx Rundlehorn Drive NE\", \"district\": \"north_east\", \"lat\": 51.082, \"lon\": -113.956, \"roll_number\": \"047-24-117-05\", \"assessed_value\": 548000, \"land_use\": \"R-C1\", \"assessment_roll_year\": 2026, \"year_built\": 1978}"
        },
        {
          "name": "parse_listing_field",
          "args": "field=gla_sqft",
          "result": "gla_sqft=1220 (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=lot_sqft",
          "result": "lot_sqft=4700 (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=beds_ag",
          "result": "beds_ag=3 (from listing)"
        },
        {
          "name": "parse_listing_field",
          "args": "field=full_baths",
          "result": "full_baths=1 (from listing)"
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
