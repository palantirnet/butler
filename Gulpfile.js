// Require the dependencies so that we can use their functionality
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var gulp = require('gulp');
var exec = require('gulp-exec');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var reporter = require('postcss-reporter');
var syntax_less = require('postcss-less');
var stylelint = require('stylelint');
var deploy = require('gulp-gh-pages');

// Fetch config
var defaults = require('./config/butler.defaults.js');

// Add local config on top; this file should not define an empty defaults var.
try {
  var overrides = require('../../conf/butler.defaults.js');
  defaults = extend(defaults, overrides);
}
catch (e) {}

// Helper function to merge to js objects.
function extend(obj, src) {
  Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
  return obj;
}

// Just run linters
gulp.task('lint', function() {
  console.log('Running linters...');
  return gulp.src(defaults.less)
    .pipe(postcss([
      stylelint(defaults.stylelint),
      reporter({ clearMessages: true })
    ], {syntax: syntax_less}))
    .on('end', function(){ console.log('Linting complete'); })
});

// Compile Sass
gulp.task('less', function() {
  console.log('Running Less and PostCSS...');
  // Set what postcss plugins need to be run
  var processors = [
    autoprefixer(defaults.autoprefixer),
    cssnano
  ];
  // Run on all file defaults defined in var less
  return gulp.src(defaults.less)
    // Run Sass on those files
    .pipe(postcss([
      stylelint(defaults.stylelint),
      reporter({ clearMessages: true })
    ], {syntax: syntax_less}))
    .pipe(less().on('error',less.logError))
    // Run postcss plugin functions
    .pipe(postcss(processors))
    // Put the CSS in the destination dir
    .pipe(gulp.dest(defaults.css));
});


// Sculpin Development
gulp.task('sculpin', function () {
  console.log('Building sculpin...');
  gulp.src(defaults.sculpin)
    // Kill process running on :8000. Run the command line commands to watch sculpin
    .pipe(exec('lsof -ti TCP:8000 | xargs  kill'))
    .pipe(exec(defaults.sculpin_run + ' generate --watch --server --project-dir="' + defaults.sculpin + '"'));
});

// Build Sculpin Production Artifact
gulp.task('sculpin-prod', function () {
  console.log('Building production artifact...');
  gulp.src(defaults.sculpin)
    // Run the command line commands to build sculpin production artifact
    .pipe(exec('sculpin generate --env=prod --project-dir="' + defaults.sculpin + '"'))
    .on('end', function(){ console.log('Your production artifact has been built'); });
});

// Watch for Changes
gulp.task('watch', function() {
  return gulp
  // Watch the less folder for change
  // and run `compile-sass` task when something happens
    .watch(defaults.less, ['sass'])
    // When there is a change
    // log a message in the console
    .on('change', function (event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

// Set Develop task
gulp.task('develop', ['less', 'sculpin', 'watch']);

// Set a test task
gulp.task('test', ['lint']);

// Set a deploy task
gulp.task('deploy', ['sculpin-prod'], function() {
  console.log('Beginning deploy to gh-pages for' + defaults.repo);
  return gulp.src(defaults.output_prod)
    .pipe(deploy(defaults.deploy))
    .on('end', function(){ console.log('Your styleguide has been deployed to' + defaults.repo); });
});


//  Set default task
gulp.task('default', ['develop']);
