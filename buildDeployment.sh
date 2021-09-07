#!/bin/bash

./buildProtoFile.sh

if [[ `git status --porcelain` ]]; then
  echo "Other git changes detected, please isolate deployments to single commits."
  exit 1;
fi

npm run deploy
