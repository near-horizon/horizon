#!/bin/bash
set -e

ACCOUNT_ID=$1
CONTRACT_ID=$2
SIGNER_ID=$3

NEAR_ENV=mainnet near call $CONTRACT_ID add_vendor "{\"account_id\":\"$ACCOUNT_ID\",\"permissions\":{\"${ACCOUNT_ID}\":[\"Admin\"]}}" --accountId $SIGNER_ID
