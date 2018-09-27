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
var ghpages = require('gh-pages');
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

// Set a deploy task for sculpin
gulp.task('sculpin-deploy', ['sculpin-prod'], function() {
  console.log('Beginning deploy to gh-pages for' + defaults.repo);
  return gulp.src(defaults.output_prod)
    .pipe(deploy(defaults.deploy))
    .on('end', function(){ console.log('Your styleguide has been deployed to' + defaults.repo); });
});

// Spress Development
gulp.task('spress-watch', function() {
  var watcher = gulp.watch([defaults.spress_home + 'src/content/*', defaults.spress_home + 'src/**/*.html*', defaults.spress_home + 'src/**/*.js', defaults.spress_home + 'media/*'], ['spress-build', 'copy-imgs']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', updating spress...');
  });
});

gulp.task('spress-serve', ['sass', 'copy-imgs-serve'], function () {
  return gulp.src(defaults.spress_home)
    .pipe(exec('fuser 4000/tcp --kill || true'))
    .pipe(exec(defaults.spress_bin + ' site:build --env='+defaults.environment+' --server --source=' + defaults.spress_home));
});


// Default build tasks/
gulp.task('spress-build', function () {
  return gulp.src(defaults.spress_home)
    .pipe(exec(defaults.spress_bin + ' site:build --env='+defaults.environment+' --source=' + defaults.spress_home));
});

gulp.task('spress-build-after-sass', ['sass'], function () {
  return gulp.src(defaults.spress_home)
    .pipe(exec(defaults.spress_bin + ' site:build --env='+defaults.environment+' --source=' + defaults.spress_home));
});


//Build Spress Github Artifact
gulp.task('spress-gh-pages', ['sass'],function () {
  console.log('Building production artifact...');
  console.log('WARNING: this will overwrite the existing build');
  return gulp.src(defaults.spress_home)
    .pipe(exec(defaults.spress_bin + ' site:build --env=github --source=' + defaults.spress_home));
});

//Build Spress Github Prod Artifact
gulp.task('spress-prod', ['sass'],function () {
  console.log('Building production artifact...');
  console.log('WARNING: this will overwrite the existing build');
  return gulp.src(defaults.spress_home)
    .pipe(exec(defaults.spress_bin + ' site:build --env=prod --source=' + defaults.spress_home));
});

// Set a deploy task for spress - gh-pages
gulp.task('spress-deploy-gh-pages', ['sass', 'spress-gh-pages', 'copy-imgs-gh-pages'], function() {
  console.log('Beginning deploy to gh-pages for ' + defaults.repo);
  return ghpages.publish(defaults.output_dev, {
            repo: defaults.repo,
            message: 'Auto-generated commit'
          }, (err) => {
          if (err === undefined) {
            console.log('Successfully deployed to gh-pages branch!');
          } else {
            console.log(err);
          }
        });
});

// Set a deploy task for spress - production branch
gulp.task('spress-deploy-prod', ['sass', 'spress-prod', 'copy-imgs-prod'], function() {
  console.log('Beginning deploy to production branch for ' + defaults.repo);
  return ghpages.publish(defaults.output_dev, {
            repo: defaults.repo,
            message: 'Auto-generated commit',
            branch: 'production'
          }, (err) => {
          if (err === undefined) {
            console.log('Successfully deployed to production branch!');
          } else {
            console.log(err);
          }
        });
});

// Watch for Changes
gulp.task('watch', function() {
  return gulp
  // Watch the scss folder for change
  // and run `compile-sass` task when something happens
    .watch(defaults.scss, ['sass', 'spress-build-after-sass', 'copy-imgs-after-sass'])
    // When there is a change
    // log a message in the console
    .on('change', function (event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

// Copy the media directory to the build.

gulp.task('copy-imgs', ['spress-build'], function () {
    return gulp.src(['../../media/**/*'], { "base" : "." })
      .pipe(gulp.dest('../../build/**/*'));
});

gulp.task('copy-imgs-after-sass', ['spress-build-after-sass'], function () {
    return gulp.src(['../../media/**/*'], { "base" : "." })
      .pipe(gulp.dest('../../build/**/*'));
});

gulp.task('copy-imgs-serve', function () {
    // Add delay so that imgs copy after serve starts.
    setTimeout(function() {
      return gulp.src(['../../media/**/*'], { "base" : "." })
    .pipe(gulp.dest('../../build/**/*'));
  }, 3000);
});

gulp.task('copy-imgs-gh-pages', ['spress-gh-pages'], function () {
    return gulp.src(['../../media/**/*'], { "base" : "." })
      .pipe(gulp.dest('../../build/**/*'));
});

gulp.task('copy-imgs-prod', ['spress-prod'], function () {
    return gulp.src(['../../media/**/*'], { "base" : "." })
      .pipe(gulp.dest('../../build/**/*'));
});

// Set Develop task
gulp.task('develop', defaults.develop_tasks);

// Set a test task
gulp.task('test', ['lint', 'audit']);


//  Set default task
gulp.task('default', ['develop']);

//  Set CirclCi task
gulp.task('circle', defaults.circle_tasks);
