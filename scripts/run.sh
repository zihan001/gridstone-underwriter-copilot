#!/usr/bin/env bash
# Generate the memo for the sample subject and place it where the viewer reads it.
#   pipeline → MemoArtifact → serializer → out/data.js → viewer/data.js
# Then serve the render-only viewer. No backend; the memo IS the artifact.
set -euo pipefail
cd "$(dirname "$0")/.."

# Load local secrets (ANTHROPIC_API_KEY, KVCOMP_LLM_MODEL) so the narrative seam
# uses the real LLM instead of silently falling back to the template.
if [ -f .env ]; then set -a; . ./.env; set +a; fi

echo "→ running pipeline + serializing memo..."
uv run python -m kvcomp.pipeline          # writes out/data.js (see serialize/memo_to_window.py)

echo "→ copying snapshot into viewer..."
cp out/data.js viewer/data.js

PORT="${PORT:-8000}"
echo "→ serving viewer at http://localhost:${PORT} (Ctrl-C to stop)"
uv run python -m http.server "${PORT}" -d viewer
