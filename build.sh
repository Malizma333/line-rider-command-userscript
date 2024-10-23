#!/bin/bash

REPOSITORY="https://github.com/Malizma333/line-rider-command-editor-userscript/raw/master"
DIRPATH=$(dirname $(realpath $0))
DIRECTORY="file://C:${DIRPATH:2}"

USER_SCRIPT_FILE="line-rider-command-editor.user.js"
touch "$USER_SCRIPT_FILE"
> "$USER_SCRIPT_FILE"

BUILD_FILE="command-editor.min.js"
touch "$BUILD_FILE"
> "$BUILD_FILE"

DEVELOP=false

case $1 in
  -d)
    DEVELOP=true
  ;;
esac

if ! command -v tsc &> /dev/null
then
  echo "typescript not found, installing..."
  npm install typescript -g
fi

if ! command -v uglifyjs &> /dev/null
then
  echo "uglifyjs not found, installing..."
  npm install uglify-js -g
fi

tsc -p tsconfig.json --out "$BUILD_FILE"
MINI=$(uglifyjs -c -m -- "$BUILD_FILE")
echo "$MINI" > "$BUILD_FILE"

if $DEVELOP; then
  LOCATION="$DIRECTORY"
else
  LOCATION="$REPOSITORY"
fi

echo "window.CMD_EDITOR_DEBUG=$DEVELOP
// ==UserScript==
// @name         Command Editor
// @author       Malizma
// @description  Adds UI to API commands in linerider.com
// @namespace    https://www.linerider.com/
// @version      2.0.0
// @icon         https://www.linerider.com/favicon.ico
// @match        https://www.linerider.com/*
// @match        https://*.official-linerider.com/*
// @match        http://localhost:*/*
// @match        https://*.surge.sh/*
// @grant        none
// @require      $LOCATION/command-editor.min.js
// ==/UserScript==" >> "$USER_SCRIPT_FILE"