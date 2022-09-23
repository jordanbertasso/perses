#!/bin/bash

if ! [[ -w  $HOME ]]
then
  export npm_config_cache=$(mktemp -d)
fi

cd ui/
npm install
npm run build
