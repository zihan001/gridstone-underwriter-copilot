"""
serialize/queue.py — the triage QUEUE snapshot (window.QUEUE) + per-deal memo snapshots.

This is an ADDITIVE layer in front of the existing per-case path: it runs every inbox deal
through the SAME run()/pipeline core (no new math), calls triage() on each finished memo, and
emits two things the queue viewer reads:

  * window.QUEUE  — one row per deal (id, address, range, band, verdict, reason, sort keys),
                    sorted RED → YELLOW → GREEN, then reviewFlagCount desc, then score asc, so
                    the scariest deals float to the top.
  * viewer/queue/<id>.js — each deal's FULL window.MEMO, produced by the EXISTING
                    memo_to_window serializer unchanged, so a queue row drills into a real memo.

No number originates here. Every figure a row shows (the range, the band) is computed by the
core; triage only reads and classifies what the core already produced.

CLI: `python -m kvcomp.serialize --queue --out viewer/queue.js`
"""

from __future__ import annotations

import json
from pathlib import Path

from kvcomp.data.inbox import inbox
from kvcomp.domain.triage import triage
from kvcomp.pipeline import run
from kvcomp.schemas.config import AdjustmentConfig
from kvcomp.serialize.memo_to_window import _DISTRICT_TITLE, render_data_js

# RED first, then YELLOW, then GREEN.
_VERDICT_ORDER = {"red": 0, "yellow": 1, "green": 2}

_DEFAULT_OUT = Path(__file__).resolve().parents[3] / "viewer" / "queue.js"


def build_queue(cfg: AdjustmentConfig | None = None):
    """Run every inbox deal through the core, triage each, and return (entries, results).

    `entries` is the sorted window.QUEUE list; `results` maps deal id -> PipelineResult so the
    caller can serialize each deal's full memo with the existing serializer."""
    cfg = cfg or AdjustmentConfig()
    entries: list[dict] = []
    results: dict[str, object] = {}
    for deal in inbox(cfg):
        res = run(deal.subject, cfg, candidates=deal.candidates, use_llm=False)
        verdict = triage(res.memo)
        vr = res.memo.value_range
        entries.append({
            "id": deal.id,
            "address": deal.subject.address,
            "district": _DISTRICT_TITLE[deal.subject.district],
            "rangeLow": vr.low, "rangePoint": vr.point, "rangeHigh": vr.high,
            "confidenceBand": res.memo.confidence.band,
            "verdict": verdict.verdict.value,
            "reason": verdict.reason,
            "reviewFlagCount": verdict.review_flag_count,
            "score": verdict.score,
        })
        results[deal.id] = res

    # Scariest floats up: bucket, then more review flags, then lower confidence score.
    entries.sort(key=lambda e: (_VERDICT_ORDER[e["verdict"]], -e["reviewFlagCount"], e["score"]))
    return entries, results


def write_queue(out_path: Path | None = None, cfg: AdjustmentConfig | None = None) -> Path:
    """Write window.QUEUE to `out_path` and each deal's full window.MEMO to <out_dir>/queue/."""
    out = out_path or _DEFAULT_OUT
    out.parent.mkdir(parents=True, exist_ok=True)
    entries, results = build_queue(cfg)

    out.write_text(
        "/* GENERATED — triage queue snapshot. Regenerate with "
        "`python -m kvcomp.serialize --queue`. */\n"
        "window.QUEUE = " + json.dumps(entries, ensure_ascii=False, indent=2) + ";\n"
    )

    deal_dir = out.parent / "queue"
    deal_dir.mkdir(parents=True, exist_ok=True)
    for deal_id, res in results.items():
        # The EXISTING serializer, unchanged — each deal becomes a real window.MEMO snapshot.
        (deal_dir / f"{deal_id}.js").write_text(render_data_js(res))

    return out


def main(argv: list[str] | None = None) -> None:
    import argparse

    parser = argparse.ArgumentParser(
        prog="python -m kvcomp.serialize --queue",
        description="Serialize the triage queue (window.QUEUE) + per-deal memo snapshots.")
    parser.add_argument("--queue", action="store_true", help="(routing flag; required by the dispatcher)")
    parser.add_argument("--out", default=None, help="output path for queue.js (default: viewer/queue.js).")
    args = parser.parse_args(argv)

    out = Path(args.out) if args.out else _DEFAULT_OUT
    path = write_queue(out)
    entries, _ = build_queue()
    from collections import Counter
    spread = Counter(e["verdict"] for e in entries)
    print(f"wrote {path} — {len(entries)} deals "
          f"({spread.get('green', 0)} green · {spread.get('yellow', 0)} yellow · {spread.get('red', 0)} red)")
    print(f"wrote per-deal snapshots to {path.parent / 'queue'}/")
