# Butler is currently under construction

# Butler - Sculpin Style Guide
The beginnings of a Sculpin based style guide creation tool. Now with Gulp and Bundler integration. 

## Dependencies
1. NodeJS 0.12+ and NPM - https://nodejs.org/download/
1. Bundler - https://github.com/bundler/bundler

## Getting Started
1. From inside the project root, run `sh fed-init.sh`
1. Step through the prompts with any desired answers. This will create a gulp_config.js.
1. Run `gulp` or `gulp develop` and begin developing normally

## What is Gulp?
"Gulp is a build system that can improve how you develop websites by automating common tasks, such as compiling preprocessed CSS, minifying JavaScript and reloading the browser." - <a href="http://www.smashingmagazine.com/2014/06/11/building-with-gulp/">Smashing Magazine</a>

## What does this Gulpfile do
There are three main tasks in this gulp file:

1. `gulp develop`/`gulp` This is the default task. This will watch your sass/sculpin files for changes, compile/build accordingly and automatically refresh your browser. (This also works locally when working on your Drupal theme as well.)
1. `gulp test` will lint your js and sass. Sass linting configuration changes can be made by editing the `.scss-lint.yml`. JS is a default lint and also checking for <a href="https://github.com/palantirnet/development_documentation/blob/master/docs/javascript_code_style.md">jQuery style</a>.
1. `gulp optimize` optimizes and minifies, specifically optimizes your images and minifies JS and CSS and exports files to the appropriate place in the `_site` directory.

*You can also choose to run any sub task independently. Need to just minify a change to JS? `gulp js-min`

## Instructions for enabling live reload on your Drupal 7 Site
1. Check whether or not the prototype is contained within your Drupal site somewhere. The exact location doesn't matter, as long as running a drush command like drush cc all from the root of the prototype would work. If the prototype is NOT in the prototype, answer "no" when prompted for whether or not you would like to install live_reload now.
    * If you answer "no", you must either manually install link_css, or use another method to ensure that css sheets are being loaded via \<link\> rather than @import. Live reload does not work with @imported sheets.
1. Run gulp_config.sh from a command prompt in the environment your site is running from. If your site is running on a virtual box, run the script from inside the box.
1. Follow the prompts in the gulp_config.sh script as normal, provide the information needed.
1. Ensure that your theme is directly loading the stylesheet from _site/assets/css. This probably means adding the stylesheet to the .info file. (Sym links may or may not work.)
1. Run gulp or gulp develop as normal, two browser windows should open this time. One will be your Drupal site, one will be your prototype.
1. Enjoy!

## Instructions for enabling live reload on your Drupal 8 Site
1. Download and install d8_link module from https://github.com/rwagner00/d8_link.
1. Run gulp_config.sh from a command prompt in the environment your site is running from. If your site is running on a virtual box, run the script from inside the box.
1. Follow the prompts in the gulp_config.sh script as normal, provide the information needed.
    * Be sure to answer NO to whether or not you want to install link_css. This is ONLY helpful for D7.
1. Ensure that your theme is directly loading the stylesheet from _site/assets/css. This probably means adding the stylesheet to your theme's libraries.yml file. (Sym links may or may not work.)
1. Run gulp or gulp develop as normal, two browser windows should open this time. One will be your Drupal site, one will be your prototype.
1. Enjoy!

## Making Changes to Gulpfile.js
Please feel free to change/extend/break this Gulpfile to fit the specific needs of the project.

## Troubleshooting
For now, if you have comments/questions/concerns about working with this please talk to Lauren or Ryan.
