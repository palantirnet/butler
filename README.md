# Butler Style Guide Starter
The beginnings of a Jekyll based style guide creation tool. Now using Butler. 

## Dependencies
1. NodeJS 0.12+ and NPM - https://nodejs.org/download/
1. Bundler - https://github.com/bundler/bundler

## Getting Started
1. From inside the project root, run `sh fed-init.sh`
1. Step through the prompts with any desired answers. This will create a gulp_config.js.
1. Run `gulp` or `gulp develop` and begin developing normally

## What is Butler?
Butler is a custom Gulp.js configuration that caters to how Palantir builds their prototypes and Drupal sites. It is a robust build system that automates common tasks such as compiling Sass, minifying Javascript, linting, and reloading the browser.

## Available Scripts
1. Script: fed-init.sh
  * On the initialization of a new project, will install the most recent versions of all Gulp dependencies and specified versions of Ruby Gems.
  * If you do not have a gulp-config file already, it will provide a short series of questions to help you generate a configuration file (no JS needed! just a few questions) for Gulp to get you up and running.
We recommend committing the gulp-config files to make them available to all team members, so if there's already a config file, the script won't prompt you to generate a new one.
  * If you're on a Drupal 7 site, it will ask you whether or not you would like it to automatically download and install a relevant Drupal module which enables live reloading. No further action needed!
  * If you're on a Drupal 8 site, it will provide instructions to download a non-published module for the same reasons. A quick clone and install is the only steps you need to take.
1. Script: gulp-config.sh
  * If you would like to regenerate your config file to accomodate new changes to the project, or don't want to install Gulp dependencies (but why wouldn't you?), you can manually run gulp-config.sh in order to regenerate your configuration file at any time. This will provide you a few questions to correctly configure Butler.


## Available Commands
1. `gulp develop`/`gulp`/`gulp default`
  * Deploys a prototype server and even opens a browser tab to your prototype for convenience.
  * Builds and watches for changes to the prototype to rebuild when necssary.
  * Reloads pages after rebuilds are done.
  * Sets your prototype to use un-minified CSS (check command 'optimize' for more information)
  * Compiles SASS and watches for changes. 
  * Injects compiled CSS automagically into the site without a page refresh. This means you see changes as soon as they're ready, rather than having to tab, reload, and wait.
  * Provides page notifications about rebuilds, compilation, and injection so you always know what's going on. They're very similar to the Mac system notifications, but live inside your page and provide helpful information. This system is extensible to provide essentially any information at any time you can dream up.
1. `gulp test` 
  * Runs SASS linting and provides information about any linting issues that exist in your files.
  * Has a full configuration file that allows us to specify Palantir wide defaults and then easily adjust these on a per-project basis while maintaining team cohesion. It's all in version control.
  * Runs JS Hinting and examines your code. JS is a default lint and also checking for <a href="https://github.com/palantirnet/development_documentation/blob/master/docs/javascript_code_style.md">jQuery style</a>.
  * Also has a configuration file, which is currently set to JQuery defaults.
  * It will also run a performance test using <a href="http://www.sitespeed.io/">Sitespeed.io</a>. Sass linting configuration changes can be made by editing the `.scss-lint.yml`. 
1. `gulp optimize` 
  * Runs minifiers on your CSS and JS and then sets the prototype to use the minified files.
  * This lets you test your minified files for any issues and bugs that result from minification.
  * Optimizes images for web content, and saves them to a new directory.

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
Please feel free to change/extend/break this Gulpfile to fit the specific needs of the project. Issues to the Butler base should be added to the <a href="https://github.com/palantirnet/butler/issues">GitHub Issue Queue</a> and assigned to Lauren or Ryan. If you feel that the changes should be ported back to the base Butler install please bring it up to the DEFEND meeting for review.

## Troubleshooting
For now, if you have comments/questions/concerns about working with this please talk to Lauren or Ryan.
