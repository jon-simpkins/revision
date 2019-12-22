#!/bin/bash

ng test --codeCoverage=true --watch=false

open ./coverage/revision/index.html