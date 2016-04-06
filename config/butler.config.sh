#!/bin/bash

echo "Please provide the repository link for this project. Eg: https://github.com/palantirnet/butler.git"
read project_repo
echo "defaults.repo = \"$project_repo\";" >> butler.defaults.js

echo "Thanks for using Butler!"