#!/bin/bash
set -e

ACCOUNT_ID=$1
export NEAR_ENV=mainnet

KEYS=$(near view-state $ACCOUNT_ID --finality final | sed -e "s/'/\"/g" | sed -e "s/key/\"key\"/g" | sed -e "s/value/\"value\"/g" | jq '[.[] | .key]')
KEYS_LENGTH=$(echo $KEYS | jq 'length');

KEY_LIMIT=100

near deploy $ACCOUNT_ID ./state_cleanup.wasm

for ((index = 0; index < $KEYS_LENGTH; index = index + $KEY_LIMIT))
do
  export SLICE=$(echo $KEYS | jq ".[$index:$((index + KEY_LIMIT))]" | tr -d '\n' | tr -d '[:blank:]')
  near call $ACCOUNT_ID clean "{\"keys\":$SLICE}" --accountId $ACCOUNT_ID
  unset SLICE
done

near deploy $ACCOUNT_ID ./res/horizon.wasm -f

unset NEAR_ENV

