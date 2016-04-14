#!/bin/bash

config = "../../conf/butler.defaults.js"
json = "../../package.json"
scripts = '"scripts": {"butler": "gulp --gulpfile node_modules/butler/gulpfile.js develop","linting": "gulp --gulpfile node_modules/butler/gulpfile.js test",	"deploy": "gulp --gulpfile node_modules/butler/gulpfile.js deploy"},'
match = '"main": "index.js",'

echo "// Project-specific Butler configuration." > $config
echo "" >> $config

if [ -r $json ]
then
	sed -i "s/$match/$match\n$scripts/" $json
fi

if [ -r $config ]
then
	echo "Thanks for using Butler! You're ready to start developing!"
else
	echo "Please provide the repository link for this project. Eg: https://github.com/palantirnet/butler.git"
	read project_repo
	echo "defaults.repo = \"$project_repo\";" >> $config

	echo "Save your project wide settings by committing your new package.json and conf/butler.defaults.js. Thanks for using Butler!"
fi
