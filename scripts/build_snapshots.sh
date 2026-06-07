#!/usr/bin/env bash
# Build the viewer snapshots:
#   viewer/data.south.js  viewer/data.east.js  viewer/data.west.js   (per-case hero memos)
#   viewer/queue.js  +  viewer/queue/<id>.js                         (triage queue + drill-downs)
#
# Each per-case file is produced by the SAME path as the hero (run(subject=...) -> write_data_js),
# so the core stays the single source of every number. The South snapshot is identical to
# viewer/data.js (the hero), which scripts/run.sh / `python -m kvcomp.pipeline` keep regenerating
# on their own — this script does not touch viewer/data.js. The queue runs every inbox deal
# through the same core, triages each, and writes one window.MEMO snapshot per deal.
set -euo pipefail
cd "$(dirname "$0")/.."

for case in south east west; do
  uv run python -m kvcomp.serialize --case "$case" --out "viewer/data.${case}.js"
done

uv run python -m kvcomp.serialize --queue --out "viewer/queue.js"

echo "✓ snapshots: viewer/data.{south,east,west}.js  viewer/queue.js  viewer/queue/<id>.js"
