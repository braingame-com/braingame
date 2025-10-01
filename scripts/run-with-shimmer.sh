#!/usr/bin/env bash
set -euo pipefail

TEXT="$1"
shift

OUTPUT_FILE=$(mktemp)
SPINNER_PID=""
cleanup() {
  if [[ -n "$SPINNER_PID" ]]; then
    kill "$SPINNER_PID" >/dev/null 2>&1 || true
    wait "$SPINNER_PID" 2>/dev/null || true
    SPINNER_PID=""
  fi
}

if [[ -t 1 ]]; then
  node scripts/shimmer.js "$TEXT" &
  SPINNER_PID=$!
  trap cleanup EXIT INT TERM
fi

FORCE_COLOR=1 "$@" &>"$OUTPUT_FILE" && STATUS=0 || STATUS=$?

cleanup
trap - EXIT INT TERM
cat "$OUTPUT_FILE"
rm -f "$OUTPUT_FILE"
exit $STATUS
