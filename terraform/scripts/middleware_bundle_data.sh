#!/bin/bash
set -euxo pipefail

# Extract "bucketName" "bucketPrefix" "bundleFilename" "environment" and "middlewareRootPath" arguments from the input into
eval "$(jq -r '@sh "BUCKET_NAME=\(.bucketName) BUCKET_PREFIX=\(.bucketPrefix) BUNDLE_FILENAME=\(.bundleFilename) ENVIRONMENT=\(.environment) MIDDLEWARE_ROOT_RELATIVE_PATH=\(.middlewareRootPath)"')"
if [[ -n "${CIRCLE_SHA1:0:7}" ]]; then
  COMMIT_HASH="${CIRCLE_SHA1:0:7}"
elif [[ -n "$(git log -n 1 --oneline | cut -d ' ' -f1)" ]]; then
  COMMIT_HASH="$(git log -n 1 --oneline | cut -d ' ' -f1)"
else
  COMMIT_HASH="no_commit"
fi
CURRENT_DIRECTORY="$PWD"
CURRENT_BUNDLE_FILENAME="${BUNDLE_FILENAME}"
FILES_CHANGED="$(git diff-tree --no-commit-id --name-only -r "${COMMIT_HASH}")"
PREVIOUS_BUNDLE_FILENAME=$(aws s3 ls tbb-middleware-deployment-bucket --recursive | grep "${BUCKET_PREFIX}/${ENVIRONMENT}/" | sort | tail -n 1 | awk '{print $4}' | rev | cut -d/ -f1 | rev)

cd "${MIDDLEWARE_ROOT_RELATIVE_PATH}"

MIDDLEWARE_ROOT_ABSOLUTE_PATH="$PWD"
MIDDLEWARE_PARENT_ROOT_ABSOLUTE_PATH="$(dirname "$MIDDLEWARE_ROOT_ABSOLUTE_PATH")"
MIDDLEWARE_GIT_ROOT_PATH="$(basename "$MIDDLEWARE_PARENT_ROOT_ABSOLUTE_PATH")/$(basename "$MIDDLEWARE_ROOT_ABSOLUTE_PATH")"

if echo "${FILES_CHANGED}" | grep -q "${MIDDLEWARE_GIT_ROOT_PATH}"; then
  FILENAME=${CURRENT_BUNDLE_FILENAME}
else
  FILENAME="$(echo "${PREVIOUS_BUNDLE_FILENAME}" | sed  "s/\-${ENVIRONMENT}\.zip//g")"
  aws s3 cp s3://"${BUCKET_NAME}"/"${BUCKET_PREFIX}"/"${ENVIRONMENT}"/"${PREVIOUS_BUNDLE_FILENAME}" ./bundle.zip > /sandbox/null 2>&1
fi

cd "$CURRENT_DIRECTORY"

# Safely produce a JSON object containing the fileName result value.
jq -n \
  --arg fileName "$FILENAME" \
  '{"fileName":$fileName}'
