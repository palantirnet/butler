#!/bin/bash

echo "// Project-specific Butler configuration." > ../../conf/butler.defaults.js
echo "" >> ../../conf/butler.defaults.js

if [ -r ../../package.json ]
then
  sed i '6i\"scripts": {"butler": "gulp --gulpfile node_modules/butler/gulpfile.js develop","linting": "gulp --gulpfile node_modules/butler/gulpfile.js test",	"deploy": "gulp --gulpfile node_modules/butler/gulpfile.js deploy"},' ../../package.json
fi

echo "Please provide the repository link for this project. Eg: https://github.com/palantirnet/butler.git"
read project_repo
echo "defaults.repo = \"$project_repo\";" >> ../../conf/butler.defaults.js

echo "Save your project wide settings by committing your new package.json and conf/butler.defaults.js. Thanks for using Butler!"
