#!/bin/bash
set -e

./buildProtoFile.sh

npm run lint

if [[ `git status --porcelain` ]]; then
  echo "Other git changes detected, please isolate deployments to single commits."
  exit 1;
fi

npm run test -- --watchAll=false

npm run deploy
