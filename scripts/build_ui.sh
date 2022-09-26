#!/bin/bash

export npm_config_cache=$(mktemp -d)

echo "${npm_config_cache}"
whoami

cd ui/
npm install
npm run build
