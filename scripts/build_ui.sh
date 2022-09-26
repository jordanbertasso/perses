#!/bin/bash

export npm_config_cache=$(mktemp -d)

echo "${npm_config_cache}"
whoami

chown -R 1001:121 "${npm_config_cache}"

cd ui/
npm install
npm run build
