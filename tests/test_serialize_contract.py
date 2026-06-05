"""
Serializer contract (MEMO_CONTRACT "Contract test"): the boundary that keeps the core and
the locked viewer from drifting. Every key present at the right nesting, types right,
weights sum to 1, adjustedVals == selected adjusted, every flag/reason code resolves,
confidence drivers reconcile to score - base.
"""

from __future__ import annotations

import json

import pytest

from kvcomp.pipeline import run
from kvcomp.schemas.results import FlagCode, ReasonCode
from kvcomp.serialize.memo_to_window import build_window, render_data_js

TOP_LEVEL = ["meta", "benchmark", "bm", "marketContext", "rates", "thresholds", "subject",
             "selected", "rejected", "reasonCodes", "widening", "searchSummary", "weights",
             "weightDrivers", "range", "adjustedVals", "confidence", "flags", "aicNote", "narrative"]

SELECTED_KEYS = {"id", "label", "synthetic", "mls", "community", "district", "sameDistrict",
                 "distanceKm", "contractDate", "contractMonth", "ageDays", "price", "gla", "lot",
                 "beds", "baths", "basement", "garage", "built", "cond", "qual", "tier", "watch",
                 "lines", "tf", "bmContract", "timeAdj", "net", "gross", "adjusted",
                 "netPct", "grossPct", "linePct", "ppsf"}

CANONICAL_LINE_ORDER = ["gla", "lot", "bed", "bath", "bsmt", "gar", "age", "cond", "qual", "time"]


@pytest.fixture(scope="module")
def window():
    return build_window(run())


def test_all_top_level_keys_present(window):
    for k in TOP_LEVEL:
        assert k in window, f"missing top-level MEMO key: {k}"


def test_weights_sum_to_one(window):
    assert abs(sum(window["weights"].values()) - 1.0) < 1e-6


def test_adjusted_vals_match_selected(window):
    assert window["adjustedVals"] == [c["adjusted"] for c in window["selected"]]


def test_selected_shape_and_line_order(window):
    for c in window["selected"]:
        assert SELECTED_KEYS.issubset(c.keys())
        assert [ln["key"] for ln in c["lines"]] == CANONICAL_LINE_ORDER
        assert isinstance(c["price"], int) and isinstance(c["adjusted"], int)


def test_every_flag_code_resolves(window):
    valid = {c.value for c in FlagCode}
    for f in window["flags"]:
        assert f["code"] in valid
        assert f["status"] in {"FIRED", "CLEAR"}
        assert f["severity"] in {"review", "info", "tolerance"}


def test_every_rejected_code_in_reason_codes(window):
    valid = {c.value for c in ReasonCode}
    for r in window["rejected"]:
        assert r["code"] in valid
        assert r["code"] in window["reasonCodes"]


def test_confidence_drivers_reconcile(window):
    cb = window["confidence"]
    contribs = sum(d["contrib"] for d in cb["drivers"])
    assert abs(contribs - (cb["score"] - cb["base"])) <= 1e-6


def test_rate_card_matches_grid_constants(window):
    from kvcomp.schemas.config import AdjustmentConfig
    assert window["rates"] == AdjustmentConfig().rate_card()


def test_thresholds_are_percent_integers(window):
    t = window["thresholds"]
    assert t["net"] == 15 and t["gross"] == 25 and t["line"] == 10
    assert t["netReview"] == 8 and t["grossReview"] == 12 and t["lineReview"] == 5


def test_rendered_data_js_is_wellformed(window):
    js = render_data_js(run())
    assert "window.MEMO" in js and "__MEMO_DATA__" not in js
    # The spliced DATA object must be valid JSON.
    start = js.index("const DATA =") + len("const DATA =")
    end = js.index(";\n", start)
    json.loads(js[start:end].strip())
