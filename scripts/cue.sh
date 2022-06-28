#!/bin/bash

## /!\ This file must be used at the root of the perses project

set -e

if ! command -v cue &> /dev?null; then
  echo "the binary cue could not be found"
  exit 1
fi

function test() {
  cd schemas/charts
  for d in *; do
    if [ -d "${d}" ]; then
      echo "testing charts ${d}"
      cue vet "${d}/${d}.json" "${d}/${d}.cue"
    fi
  done
}

function fmt() {
  find ./.dagger ./internal ./pkg ./schemas -name "*.cue" -exec cue fmt {} \;
}

function checkfmt {
  fmt
  git diff --exit-code -- ./.dagger ./internal ./pkg ./schemas
}

if [[ "$1" == "--fmt" ]]; then
  fmt
fi

if [[ "$1" == "--checkformat" ]]; then
  checkfmt
fi

if [[ $1 == "--test" ]]; then
  test
fi
