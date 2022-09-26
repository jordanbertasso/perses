#!/bin/bash

echo "${HOME}"

if ! [[ -w  $HOME ]]
then
  echo "export npm cache config"
  export npm_config_cache=$(mktemp -d)
fi

echo "${npm_config_cache}"

cd ui/
npm install
npm run build
