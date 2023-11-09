#!/bin/bash
set -e

CONTRACT_ID=$1
SIGNER_ID=$2
PROJECT_ID=$3
ACCOUNT_ID=$4

NEAR_ENV=mainnet near call $CONTRACT_ID remove_claim "{\"account_id\":\"$ACCOUNT_ID\",\"project_id\":\"$PROJECT_ID\"}" --accountId $SIGNER_ID
