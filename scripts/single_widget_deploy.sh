#!/bin/bash

cd "$(dirname "$0")"
cd ..

ACCOUNT=$1
WIDGET_NAME=$2
WIDGET_DIR=$(dirname "$WIDGET_NAME")
API=$3
OLD_ACCOUNT=$4
OLD_API=$5

if [ "$WIDGET_DIR" == "." ]; then
	WIDGET_DIR=""
fi

mkdir -p .tmp/src/"$WIDGET_DIR"
cp "widgets/src/$WIDGET_NAME" .tmp/src/"$WIDGET_DIR"

cd .tmp

if [ -n "$OLD_ACCOUNT" ]; then
  fd -e jsx -e json -x sed -i "s/$OLD_ACCOUNT/$ACCOUNT/g" {}
fi

if [ -n "$OLD_API" ]; then
	fd -e jsx -e json -x sed -i "s/$OLD_API/$API/g" {}
fi

bos components deploy $ACCOUNT sign-as $ACCOUNT network-config mainnet sign-with-access-key-file ~/.near-credentials/mainnet/$ACCOUNT.json send

cd ..
rm -rf .tmp

unset NEAR_ENV
