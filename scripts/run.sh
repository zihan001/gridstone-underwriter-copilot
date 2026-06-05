#!/usr/bin/env bash
# Generate the memo for the sample subject and place it where the viewer reads it.
#   pipeline → MemoArtifact → serializer → out/data.js → viewer/data.js
# Then serve the render-only viewer. No backend; the memo IS the artifact.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "→ running pipeline + serializing memo..."
python -m kvcomp.pipeline                 # writes out/data.js (see serialize/memo_to_window.py)

echo "→ copying snapshot into viewer..."
cp out/data.js viewer/data.js

echo "→ serving viewer at http://localhost:8000 (Ctrl-C to stop)"
python -m http.server 8000 -d viewer
