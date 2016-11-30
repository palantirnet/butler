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
var a11y = require('gulp-accessibility');
var rename = require('gulp-rename');

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

// Just run Sass linter
gulp.task('lint', function() {
  console.log('Running linters...');
  return gulp.src(defaults.scss)
    .pipe(postcss([
      stylelint(defaults.stylelint),
      reporter({ clearMessages: true })
    ], {syntax: syntax_scss}))
    .on('end', function(){ console.log('Linting complete'); })
});

// Run an accessibility audit
gulp.task('audit', function() {
  console.log('Auditing for accessibility...');
  // run accessibility testing on all html files
  return gulp.src(defaults.html_files)
    .pipe(a11y({
      force: true,
      accessibilityLevel: 'WCAG2AA',
      reportLevels: { notice: false, warning: true, error: true },
      ignore: [
        'WCAG2AA.Principle4.Guideline4_1.4_1_1.F77'
      ]
    }))
    .on('error', console.log)
    .on('end', function(){ console.log('Accessibility audit complete'); });
});

// Compile Sass
gulp.task('sass', function() {
  console.log('Running Sass and PostCSS...');
  // Set what postcss plugins need to be run
  // runs autoprefixer and compresses CSS after compiling
  var processors = [
    autoprefixer(defaults.autoprefixer),
    cssnano
  ];
  // Run on all file defaults defined in var scsss
  return gulp.src(defaults.scss)
    // Run Sass on those files
    .pipe(postcss([
      // lint before we compile
      stylelint(defaults.stylelint),
      reporter({ clearMessages: true })
    ], {syntax: syntax_scss}))
    // Include paths to sass modules
    .pipe(sass({
      includePaths: [
        'node_modules/singularitygs/stylesheets/',
        'node_modules/breakpoint-sass/stylesheets/'
      ]
    }).on('error',sass.logError))
    // Run postcss plugin functions
    .pipe(postcss(processors))
    // Put the CSS in the destination dir
    .pipe(gulp.dest(defaults.css));
});


// Sculpin Development
gulp.task('sculpin', function () {
  console.log('Building sculpin...');
  gulp.src(defaults.template_files)
    // Run the command line commands to watch sculpin
    .pipe(exec(defaults.sculpin_run + ' generate --watch --server --project-dir="' + defaults.sculpin_dir + '"'));
});

// Build Sculpin Production Artifact
gulp.task('sculpin-prod', function () {
  console.log('Building production artifact...');
  gulp.src(defaults.template_files)
    // Run the command line commands to build sculpin production artifact
    .pipe(exec(defaults.sculpin_run + ' generate --env=prod --project-dir="' + defaults.sculpin_dir + '"'))
    .on('end', function(){ console.log('Your production artifact has been built'); });
});

// Spress Development
gulp.task('spress', function () {
  console.log('Building spress...');
  return gulp.src('../../')
    .pipe(exec('fuser 4000/tcp --kill || true'))
    .pipe(exec('../../vendor/bin/spress site:build --source=../../ --watch --server'));
});

// Spress Development
gulp.task('spress-prod', function () {
  console.log('Building production artifact...');
  return gulp.src('../../')
    .pipe(exec('../../vendor/bin/spress site:build --source=../../ --env=prod'));
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
gulp.task('test', ['lint', 'audit']);

// Set a deploy task
gulp.task('deploy', ['sculpin-prod'], function() {
  console.log('Beginning deploy to gh-pages for' + defaults.repo);
  return gulp.src(defaults.output_prod)
    .pipe(deploy(defaults.deploy))
    .on('end', function(){ console.log('Your styleguide has been deployed to' + defaults.repo); });
});


//  Set default task
gulp.task('default', ['develop']);
