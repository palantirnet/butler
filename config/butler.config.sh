#!/usr/bin/env bash

# If there is not a configuration file, force generation. Otherwise, ask.
if [ -e butler.defaults.js ]; then
  #Check if the user wishes to generate a configuration file.
  echo "Would you tell me a little about your project?"
  read configuration_request
  else
    configuration_request='yes'
fi

case $configuration_request in
  [yY][eE][sS]|[yY])
    cat > butler.defaults.js << EOF
var config = {};

EOF

    echo "Please provide the repository link for this project. Eg: https://github.com/palantirnet/butler.git"
    read project_repo
    echo "defaults.repo = \"$project_repo";" >> butler.defaults.js

    cat >> butler.defaults.js << EOF

module.exports = config;
EOF
  ;;
  *)
    echo 'Thanks for using Butler, you're not ready to start developing.'
  ;;
esac


