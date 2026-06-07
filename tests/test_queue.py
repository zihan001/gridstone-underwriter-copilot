"""
§2 — the triage queue runner + serialization (data/inbox.py, serialize/queue.py).

Asserts the queue is built from the SAME core as the hero (run() per deal), spreads across all
three buckets (the product only demos if deals land green/yellow/red), is sorted scariest-first,
carries exactly the documented window.QUEUE shape, and writes a real per-deal window.MEMO
snapshot for every row to drill into.
"""

from __future__ import annotations

import pytest

from kvcomp.data.inbox import inbox
from kvcomp.serialize.queue import build_queue, write_queue

_QUEUE_KEYS = {"id", "address", "district", "rangeLow", "rangePoint", "rangeHigh",
               "confidenceBand", "verdict", "reason", "reviewFlagCount", "score"}
_ORDER = {"red": 0, "yellow": 1, "green": 2}


@pytest.fixture(autouse=True)
def _no_api_key(monkeypatch):
    monkeypatch.delenv("ANTHROPIC_API_KEY", raising=False)


@pytest.fixture(scope="module")
def entries():
    rows, _ = build_queue()
    return rows


def test_inbox_has_a_dozen_deals_each_with_a_blurb():
    deals = inbox()
    assert len(deals) >= 12
    for d in deals:
        assert d.blurb and isinstance(d.blurb, str)
        assert d.candidates                      # a real candidate universe per deal
        assert d.subject.address in d.blurb       # the blurb describes the deal


def test_queue_spreads_across_all_three_buckets(entries):
    verdicts = [e["verdict"] for e in entries]
    assert verdicts.count("red") >= 2            # brief: at least two red
    assert verdicts.count("green") >= 2          # brief: several green
    assert "yellow" in verdicts
    assert set(verdicts) == {"red", "yellow", "green"}


def test_queue_entries_have_the_documented_shape(entries):
    for e in entries:
        assert set(e) == _QUEUE_KEYS
        assert e["verdict"] in _ORDER
        assert e["reason"]
        assert e["rangeLow"] <= e["rangePoint"] <= e["rangeHigh"]
        assert isinstance(e["reviewFlagCount"], int)


def test_queue_is_sorted_scariest_first(entries):
    # RED → YELLOW → GREEN; within a bucket reviewFlagCount desc then score asc.
    keys = [(_ORDER[e["verdict"]], -e["reviewFlagCount"], e["score"]) for e in entries]
    assert keys == sorted(keys)


def test_write_queue_emits_window_queue_and_per_deal_snapshots(tmp_path):
    out = tmp_path / "queue.js"
    write_queue(out)
    text = out.read_text()
    assert text.lstrip().startswith("/*") and "window.QUEUE =" in text

    deal_dir = out.parent / "queue"
    ids = [d.id for d in inbox()]
    for deal_id in ids:
        snap = deal_dir / f"{deal_id}.js"
        assert snap.exists(), f"missing per-deal snapshot for {deal_id}"
        assert "window.MEMO" in snap.read_text()   # each row drills into a real memo
