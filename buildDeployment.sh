#!/bin/bash

rm -rf dist/

rm -rf docs/
mkdir docs

ng build --prod

mv dist/* docs/*
