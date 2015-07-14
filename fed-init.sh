#!/usr/bin/env bash

#Checks to be sure Bundler and NodeJS are installed before trying to use them.
dependency_fail=false
command -v bundler >/dev/null 2>&1 || { echo "Bundler is required but could not be found.  Aborting."; dependency_fail="true"; }
command -v npm >/dev/null 2>&1 || { echo "NodeJS is required but could not be found.  Aborting."; dependency_fail="true"; }

if [ $dependency_fail = "true" ]; then
  echo "Please install dependencies listed above and try again. View README for more information."
  exit
fi


# If the project has bundler support.
if [ -e Gemfile ]; then
  echo "Installing Bundler dependencies globally."
  sudo bundle install;
fi

# If the project has Gulp support.
if [ -e Gulpfile.js ]; then
  # Ensure Gulp is globally available. We can safely assume at this point that
  # NPM and node are installed, so we can just use NPM to install gulp if it
  # isn't already.
  command -v gulp >/dev/null 2>&1 || { echo "Installing Gulp globally to enable gulp command."; sudo npm install -g gulp; }

  echo "Installing Gulp related packages and dependencies locally."
  # --save-dev flag will cause the package.json file to be updated with the
  # versions of the modules which were installed.
  if grep -Fq "devDependencies" package.json
    then
      echo "Dev dependencies already declared in package.json. Installing from package.json."
      sudo npm install
    else
      echo "Dev dependencies have not been declared in package.json. Installing from fed-init.sh file."
      sudo npm install browser-sync compass-options gulp gulp-autoprefixer gulp-changed gulp-compass gulp-cssmin gulp-imagemin gulp-inject gulp-jscs gulp-jscs-stylish gulp-jshint gulp-rename gulp-scss-lint gulp-sitespeedio gulp-uglify jshint-checkstyle-file-reporter --save-dev
      echo "package.json file has been updated with the version which were installed.
It is *STRONGLY* recommended that you immediately commit and push the file so that all team members are using the same versions of NPM modules."
  fi
  sudo chmod 774 package.json
fi

# If node_modules exists delete all .info files
if [ -e node_modules/ ]; then
  sudo find node_modules/ -name '*.info' -type f -delete
fi

echo "Dependencies installed, please refer to README for available Butler commands."

# If config file doesn't exist, assume that this is a fresh initialization.
# If it exists, assume this is a reinstallation of requirements, and exit.
if [ ! -e gulp_config.js ]; then
  sh ./gulp_config.sh
fi
