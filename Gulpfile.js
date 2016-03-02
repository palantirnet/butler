// Require the dependencies so that we can use their functionality
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var exec = require('gulp-exec');

// Define variables we'll use later on
// @todo: these should all be changed to config variables
var scss = ['source/code/sass/*.scss', 'source/code/sass/**/*.scss'];
var css = 'source/code/css/';
var sculpin = '/';

// Sass options
// @todo: this probably needs a prod option as well
var sassDev = {
  errLogtoConsole: true,
  outputStyle: 'expanded'
};

// Autoprefixer options
// @todo: this might need to be set on a project basis
var browserSupport = {
  browsers: ['last 2 versions', '> 5%']
};

// Compile Sass
gulp.task('compile-sass', function() {
  return gulp
    // Find all `.scss` from the `source/code/sass`
    .src(scss)
    // Run Sass on those files
    .pipe(sass(sassDev).on('error',sass.logError))
    // Update the stylesheets to add vendor prefixes
    .pipe(autoprefixer(browserSupport))
    // Put the CSS in the destination dir
    .pipe(gulp.dest(css));
});


// Sculpin Development
gulp.task('sculpin-watch', function () {
  gulp.src(sculpin)
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
