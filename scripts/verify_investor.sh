#!/bin/bash
set -e

ACCOUNT_ID=$1
CONTRACT_ID=$2
SIGNER_ID=$3

NEAR_ENV=mainnet near call $CONTRACT_ID verify_investor "{\"account_id\":\"$ACCOUNT_ID\"}" --accountId $SIGNER_ID
