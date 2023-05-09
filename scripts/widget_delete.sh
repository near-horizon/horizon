#!/bin/bash
set -e

ACCOUNT=$1
WIDGET_NAME=$2
export NEAR_ENV=mainnet

near call social.near set "{\"data\":{\"$ACCOUNT\":{\"widget\":{\"$WIDGET_NAME\":{"":null}}}}}" --accountId $ACCOUNT
near call social.near set "{\"data\":{\"$ACCOUNT\":{\"widget\":{\"$WIDGET_NAME\":null}}}}" --accountId $ACCOUNT

unset NEAR_ENV
