#!/bin/bash

pbjs -t static-module -o src/protos.js src/protos.proto
pbts -o src/protos.d.ts src/protos.js

# Prepend with the necessary import
echo "import Long = require('long');"|cat - src/protos.d.ts > tmp_protos_file
mv tmp_protos_file src/protos.d.ts
