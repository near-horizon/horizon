#!/bin/bash
set -e

OLD_ACCOUNT=$1
NEW_ACCOUNT=$2
OLD_API_URL=$3
NEW_API_URL=$4

fd -e jsx -e json -x sed -i "s/$OLD_ACCOUNT/$NEW_ACCOUNT/g" {}
fd -e jsx -e json -x sed -i "s,$OLD_API_URL,$NEW_API_URL,g" {}

cd widgets/

npm run deploy

cd ..

fd -e jsx -e json -x sed -i "s/$NEW_ACCOUNT/$OLD_ACCOUNT/g" {}
fd -e jsx -e json -x sed -i "s,$NEW_API_URL,$OLD_API_URL,g" {}
