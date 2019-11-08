#!/bin/bash

rm -rf dist/

rm -rf docs/
mkdir docs

ng build --prod --base-href "revision"

mv dist/* docs
