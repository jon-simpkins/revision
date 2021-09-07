#!/bin/bash

npm run test -- --coverage --watchAll=false

open coverage/lcov-report/index.html
