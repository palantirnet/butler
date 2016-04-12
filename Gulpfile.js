// Require the dependencies so that we can use their functionality
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var gulp = require('gulp');
var exec = require('gulp-exec');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var reporter = require('postcss-reporter');
var syntax_scss = require('postcss-scss');
var stylelint = require('stylelint');
var deploy = require('gulp-gh-pages');

// Fetch config
var defaults = require('./config/butler.defaults.js');

// Add local config on top; this file should not define an empty defaults var.
try {
  var defaults = require('../../conf/butler.defaults.js');
}
catch (e) {}

// Just run linters
gulp.task('lint', function() {
  return gulp.src(defaults.scss)
    .pipe(postcss([
      stylelint(defaults.stylelint),
      reporter({ clearMessages: true })
    ], {syntax: syntax_scss}))
});

// Compile Sass
gulp.task('sass', function() {
  // Set what postcss plugins need to be run
  var processors = [
    autoprefixer(defaults.autoprefixer),
    cssnano
  ];
  // Run on all file defaults defined in var scsss
  return gulp.src(defaults.scss)
    // Run Sass on those files
    .pipe(postcss([
      stylelint(defaults.stylelint),
      reporter({ clearMessages: true })
    ], {syntax: syntax_scss}))
    .pipe(sass().on('error',sass.logError))
    // Run postcss plugin functions
    .pipe(postcss(processors))
    // Put the CSS in the destination dir
    .pipe(gulp.dest(defaults.css));
});


// Sculpin Development
gulp.task('sculpin', function () {
  gulp.src(defaults.sculpin)
    // Run the command line commands to watch sculpin
    .pipe(exec(defaults.sculpin_run + ' generate --watch --server --project-dir="' + defaults.sculpin + '"'));
});

// Watch for Changes
gulp.task('watch', function() {
  return gulp
  // Watch the scss folder for change
  // and run `compile-sass` task when something happens
    .watch(defaults.scss, ['sass'])
    // When there is a change
    // log a message in the console
    .on('change', function (event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

// Set Develop task
gulp.task('develop', ['sass', 'sculpin', 'watch']);

// Set a test task
gulp.task('test', ['lint']);

// Set a deploy task
gulp.task('deploy', function() {
  return gulp.src(defaults.output)
    .pipe(deploy(defaults.deploy));
});


//  Set default task
gulp.task('default', ['develop']);
