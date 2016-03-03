// Require the dependencies so that we can use their functionality
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var gulp = require('gulp');
var exec = require('gulp-exec');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var semanticnaming = require('postcss-bem-linter');
var reporter = require('postcss-reporter');
var syntax_scss = require('postcss-scss');
var stylelint = require('stylelint');

// Define path variables
// @todo: these should all be changed to config variables
var scss = ['source/code/sass/*.scss', 'source/code/sass/**/*.scss'];
var css = 'source/code/css/';
var sculpin = '/';

// Autoprefixer options
// @todo: this might need to be set on a project basis (as a config variable)
var browserSupport = {
  // Support 2 most recent browser versions and anything with more than 5% support
  browsers: ['last 2 versions', '> 5%']
};

// Stylelint options
var stylelintConfig = {
  // point to the configuration file
  // @todo: this might need to be set on a project basis (as a config variable)
  configFile: 'config/linters/stylelint.config.json'
};

// Lint the Sass styles
gulp.task('style-lint', function() {
  return gulp.src(scss)
    .pipe(postcss([
      stylelint(stylelintConfig),
      reporter({ clearMessages: true })
    ], {syntax: syntax_scss}))
});

// Compile Sass
gulp.task('compile-sass', function() {
  // Set what postcss plugins need to be run
  var processors = [
    autoprefixer(browserSupport),
    cssnano
  ];
  // Run on all file paths defined in var scsss
  return gulp.src(scss)
    // Run Sass on those files
    .pipe(sass().on('error',sass.logError))
    // Run postcss plugin functions
    .pipe(postcss(processors))
    // Put the CSS in the destination dir
    .pipe(gulp.dest(css));
});


// Sculpin Development
gulp.task('sculpin-watch', function () {
  gulp.src(sculpin)
    // Run the command line commands to watch sculpin
    .pipe(exec('sculpin generate --watch --server'));
});

// Watch for Changes
gulp.task('watch', function() {
  return gulp
    // Watch the scss folder for change
    // and run `compile-sass` task when something happens
    .watch(scss, ['compile-sass'])
    // When there is a change
    // log a message in the console
    .on('change', function (event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

// Set Develop task
gulp.task('develop', ['compile-sass', 'sculpin-watch', 'watch']);



//  Set default task
gulp.task('default', ['develop']);
