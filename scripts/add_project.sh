
#!/bin/bash
set -e

CONTRACT_ID=$1
SIGNER_ID=$2
ACCOUNT_ID=$3

NEAR_ENV=mainnet near call $CONTRACT_ID add_project "{\"account_id\":\"$ACCOUNT_ID\"}" --accountId $SIGNER_ID
