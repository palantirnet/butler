#!/usr/bin/env bash

# If there is not a configuration file, force generation. Otherwise, ask.
if [ -e gulp_config.js ]; then
  #Check if the user wishes to generate a configuration file.
  echo "Would you like to generate a configuration file?
WARNING: THIS WILL ERASE YOUR CURRENT CONFIGURATION FILE. [y/N]"
  read configuration_request
  else
    configuration_request='yes'
fi

case $configuration_request in
  [yY][eE][sS]|[yY])
    cat > gulp_config.js << EOF
var config = {};

EOF

    echo "Will this project have a Drupal site? [y/N]"
    read drupal_site

    case $drupal_site in
      [yY][eE][sS]|[yY])
        echo "config.browsersync_mode = \"browser-sync-prototype-drupal\";" >> gulp_config.js
        echo 'Please provide the full address at which the site can be viewed. Eg: http://localhost/my_project'
        read drupal_site_path
        echo "config.drupal_site_path = \"$drupal_site_path\";" >> gulp_config.js
        echo "config.compile_mode = \"prototype-drupal-sass\";" >> gulp_config.js
        echo "config.speedtest_mode = \"prototype-drupal-sitespeed\";" >> gulp_config.js

        echo "DON'T KILL KITTENS: READ THIS FULLY. Would you like to install the link_css module to enable live reloading at this time and are you on a Drupal 7 site? Note that if you are running your Drupal site on a Virtual Box, you *MUST* be running this command from inside the virtual box. If you are not, the module will download but fail to install. If you are on a Drupal 8 site, C'thulu will devour you.[y/N]"
        read link_css_install
        case $link_css_install in
      [yY][eE][sS]|[yY])
          drush dl link_css
          drush en link_css -y
          drush cc all
          ;;
        esac

        echo 'Initialization complete. Exiting.'
        ;;
      *)
        echo "config.browsersync_mode = \"browser-sync-prototype-only\";" >> gulp_config.js
        echo "config.compile_mode = \"prototype-only-sass\";" >> gulp_config.js
        echo "config.speedtest_mode = \"prototype-only-sitespeed\";" >> gulp_config.js

        echo 'Initialization complete. Exiting.'

        ;;
    esac
    cat >> gulp_config.js << EOF

module.exports = config;
EOF
  ;;
  *)
    echo 'Exited without overwriting file.'
  ;;
esac



