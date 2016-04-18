#!/bin/bash

if [ ! -e ../../conf/butler.defaults.js ]; then
  echo "// Project-specific Butler configuration." > ../../conf/butler.defaults.js
  echo "var overrides = {};" >> ../../conf/butler.defaults.js
  echo "" >> ../../conf/butler.defaults.js

  echo "Please provide the repository link for this project. Eg: https://github.com/palantirnet/butler.git"
  read project_repo
  echo "overrides.repo = \"$project_repo\";" >> ../../conf/butler.defaults.js
fi;

echo "Thanks for using Butler!"
