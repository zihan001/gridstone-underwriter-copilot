#!/usr/bin/env bash
# Build the three demo-case snapshots the viewer's case switcher loads.
#   viewer/data.south.js  viewer/data.east.js  viewer/data.west.js
#
# Each is produced by the SAME path as the hero (run(subject=...) -> write_data_js),
# so the core stays the single source of every number. The South snapshot is identical
# to viewer/data.js (the hero), which scripts/run.sh / `python -m kvcomp.pipeline`
# keep regenerating on their own — this script does not touch viewer/data.js.
set -euo pipefail
cd "$(dirname "$0")/.."

for case in south east west; do
  uv run python -m kvcomp.serialize --case "$case" --out "viewer/data.${case}.js"
done

echo "✓ snapshots: viewer/data.south.js  viewer/data.east.js  viewer/data.west.js"
