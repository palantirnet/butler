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

// Fetch paths from config
var paths = require('./config/paths.js');

// Autoprefixer options
// @todo: this might need to be set on a project basis (as a config variable)
var browserSupport = {
  // Support 2 most recent browser versions and anything with more than 5% support
  browsers: ['last 2 versions', '> 5%']
};

// Stylelint options
var stylelintConfig = {
  // point to the configuration file
  configFile: paths.stylelint
};

// Just run linters
gulp.task('lint', function() {
  return gulp.src(paths.scss)
    .pipe(postcss([
      stylelint(stylelintConfig),
      reporter({ clearMessages: true })
    ], {syntax: syntax_scss}))
});

// Compile Sass
gulp.task('sass', function() {
  // Set what postcss plugins need to be run
  var processors = [
    autoprefixer(browserSupport),
    cssnano
  ];
  // Run on all file paths defined in var scsss
  return gulp.src(paths.scss)
    // Run Sass on those files
    .pipe(postcss([
      stylelint(stylelintConfig),
      reporter({ clearMessages: true })
    ], {syntax: syntax_scss}))
    .pipe(sass().on('error',sass.logError))
    // Run postcss plugin functions
    .pipe(postcss(processors))
    // Put the CSS in the destination dir
    .pipe(gulp.dest(paths.css));
});


// Sculpin Development
gulp.task('sculpin', function () {
  gulp.src(paths.sculpin)
    // Run the command line commands to watch sculpin
    .pipe(exec('sculpin generate --watch --server'));
});

// Watch for Changes
gulp.task('watch', function() {
  return gulp
    // Watch the scss folder for change
    // and run `compile-sass` task when something happens
    .watch(paths.scss, ['sass'])
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


//  Set default task
gulp.task('default', ['develop']);
