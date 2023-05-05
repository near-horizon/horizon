#!/bin/bash
set -e

OLD_ACCOUNT=$1
NEW_ACCOUNT=$2

fd -e jsx -e json -x sed -i "s/$OLD_ACCOUNT/$NEW_ACCOUNT/g" {}

cd widgets/

npm run deploy

cd ..

fd -e jsx -e json -x sed -i "s/$NEW_ACCOUNT/$OLD_ACCOUNT/g" {}

