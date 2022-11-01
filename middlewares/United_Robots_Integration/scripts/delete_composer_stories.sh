#!/bin/bash


# The documents variable you must place the ids of the stories you want to delete.
# CAUTION, ids must exist as documents in Composer
# Example:
#   documents=("XQ35YBP4BJMCVFGCSC4BXHP2QY" "VKFGOLIF7JMMRHQO56SXLJS7II" "U4Y6NYSHDRO5FOR7QT4WRJNOO4")
documents=("")

for ID in "${documents[@]}"; do
  curl --location --request DELETE "https://api.sandbox.baltimorebanner.arcpublishing.com/draft/v1/story/${ID}" \
    --header 'Authorization: Bearer 62ES52NU3JJ0ST1LPTJ10AN63MB6N03ASEy6g8yTEt/7UmSfic7++3N2/LCjLzcg9Rnf1vjp' \
    --header 'Content-Type: application/json'
done
