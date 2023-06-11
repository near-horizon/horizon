#!/bin/bash
set -eou pipefail

cd "$(dirname "$0")"
cd ..

ACCOUNT=$1
WIDGET_NAME=$2
WIDGET_DIR=$(dirname "$WIDGET_NAME")

if [ "$WIDGET_DIR" == "." ]; then
	WIDGET_DIR=""
fi

mkdir -p .tmp/src/"$WIDGET_DIR"
cp "widgets/src/$WIDGET_NAME" .tmp/src/"$WIDGET_DIR"

cd .tmp

bos components deploy $ACCOUNT sign-as $ACCOUNT network-config mainnet sign-with-access-key-file ~/.near-credentials/mainnet/$ACCOUNT.json send

cd ..
rm -rf .tmp

unset NEAR_ENV
