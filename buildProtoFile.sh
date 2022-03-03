#!/bin/bash

pbjs -t static-module -o src/protos_v2.js src/protos_v2.proto
pbts -o src/protos_v2.d.ts src/protos_v2.js

