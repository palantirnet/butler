#!/bin/bash

if [ ! -e ../../conf/butler.defaults.js ]; then
  if [ ! -e ../../conf ]; then
    mkdir ../../conf
  fi;

  echo "// Project-specific Butler configuration." > ../../conf/butler.defaults.js
  echo "var overrides = {};" >> ../../conf/butler.defaults.js
  echo "" >> ../../conf/butler.defaults.js

  echo ""
  echo "Please provide the repository link for this project. Eg: https://github.com/palantirnet/butler.git"
  read project_repo
  echo "overrides.repo = \"$project_repo\";" >> ../../conf/butler.defaults.js

  echo ""
  echo "Are you using spress? (y/n)"
  read using_spress

  if [[ "$using_spress" == "y" ]]; then
    cp -r STYLEGUIDE_TEMPLATE_SPRESS/* ../../
    cp STYLEGUIDE_TEMPLATE_SPRESS/.gitignore ../../
    composer install --working-dir=../../

    echo "overrides.develop_tasks = ['sass', 'spress', 'watch'];" >> ../../conf/butler.defaults.js
    echo "overrides.scss = ['../../src/sass/*.scss', '../../src/sass/**/*.scss'];" >> ../../conf/butler.defaults.js
    echo "overrides.css = '../../src/content/assets/css/';" >> ../../conf/butler.defaults.js
    echo "overrides.template_files = ['../../src/*.html', '../../src/**/*.html'];" >> ../../conf/butler.defaults.js
    echo "overrides.output_dev = '../../build';" >> ../../conf/butler.defaults.js
    echo "overrides.html_files = ['../../build/*.html', '../../build/**/*.html'];" >> ../../conf/butler.defaults.js
    echo "overrides.output_prod = '../../build/**/*';" >> ../../conf/butler.defaults.js
  fi;

  echo "" >> ../../conf/butler.defaults.js
  echo "module.exports = overrides;" >> ../../conf/butler.defaults.js
fi;

echo ""
echo "Thanks for using Butler!"
