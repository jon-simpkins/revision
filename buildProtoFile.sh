#!/bin/bash

pbjs -t static-module -o src/protos.js src/protos.proto
pbts -o src/protos.d.ts src/protos.js
