#!/bin/bash
set -e

OLD_ACCOUNT=$1
NEW_ACCOUNT=$2
OLD_API_URL=$3
NEW_API_URL=$4

if [[ "$OSTYPE" == "darwin"* ]]; then
  fd -e jsx -e json -x sed -i '' -e "s/$OLD_ACCOUNT/$NEW_ACCOUNT/g" {}
  fd -e jsx -e json -x sed -i '' -e "s,$OLD_API_URL,$NEW_API_URL,g" {}
else
  fd -e jsx -e json -x sed -i "s/$OLD_ACCOUNT/$NEW_ACCOUNT/g" {}
  fd -e jsx -e json -x sed -i "s,$OLD_API_URL,$NEW_API_URL,g" {}
fi

cd widgets/

npm run deploy

cd ..

if [[ "$OSTYPE" == "darwin"* ]]; then
  fd -e jsx -e json -x sed -i '' -e "s/$NEW_ACCOUNT/$OLD_ACCOUNT/g" {}
  fd -e jsx -e json -x sed -i '' -e "s,$NEW_API_URL,$OLD_API_URL,g" {}
else
  fd -e jsx -e json -x sed -i "s/$NEW_ACCOUNT/$OLD_ACCOUNT/g" {}
  fd -e jsx -e json -x sed -i "s,$NEW_API_URL,$OLD_API_URL,g" {}
fi
