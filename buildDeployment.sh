#!/bin/bash

./buildProtoFile.sh

if [[ `git status --porcelain` ]]; then
  echo "Other git changes detected, please isolate deployments to single commits."
  exit 1;
fi

rm -rf dist/

rm -rf docs/
mkdir docs

ng build --prod --base-href --deploy-url /revision/

mv dist/revision/* docs

RELEASE_MSG=`date "+%Y-%m-%d (%s)"`

git add .
git commit -am ":rocket: $RELEASE_MSG"

echo "Deployment built and committed to local branch, push to remote to deploy to GitHub pages!"
