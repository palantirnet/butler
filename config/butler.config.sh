#!/bin/bash

echo "// Project-specific Butler configuration." > ../../conf/butler.defaults.js
echo "" >> ../../conf/butler.defaults.js

echo "Please provide the repository link for this project. Eg: https://github.com/palantirnet/butler.git"
read project_repo
echo "defaults.repo = \"$project_repo\";" >> ../../conf/butler.defaults.js

echo "Thanks for using Butler!"
