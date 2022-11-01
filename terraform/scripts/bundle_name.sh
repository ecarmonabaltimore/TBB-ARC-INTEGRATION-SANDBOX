#!/bin/bash
set -euxo pipefail

if [[ -n "${CIRCLE_SHA1:0:7}" ]]; then
  COMMIT_HASH="${CIRCLE_SHA1:0:7}"
elif [[ -n "$(git log -n 1 --oneline | cut -d ' ' -f1)" ]]; then
  COMMIT_HASH="$(git log -n 1 --oneline | cut -d ' ' -f1)"
else
  COMMIT_HASH="no_commit"
fi
TIMESTAMP=$(date +"%Y-%m-%dT%H:%M:%S"Z)
BASE_BUNDLE_NAME="${TIMESTAMP}-${COMMIT_HASH}"

# Safely produce a JSON object containing the result value.
jq -n \
  --arg hash "$COMMIT_HASH" \
  --arg timestamp "$TIMESTAMP" \
  --arg bundleName "$BASE_BUNDLE_NAME" \
  '{"hash":$hash,"timestamp":$timestamp,"bundleName":$bundleName}'
