#!/bin/bash

EOF

echo "Please provide the repository link for this project. Eg: https://github.com/palantirnet/butler.git"
read project_repo
echo "defaults.repo = \"$project_repo\";" >> butler.defaults.js

module.exports = butler.defaults.js;
EOF

esac
