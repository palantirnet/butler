var gulp = require('gulp');
var paths = require('compass-options').dirs();
var compass = require('gulp-compass');
var prefix = require('gulp-autoprefixer');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');
var cp = require('child_process');
var scsslint = require('gulp-scss-lint');
var cssmin = require('gulp-cssmin');
var sitespeed = require('gulp-sitespeedio');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var inject = require('gulp-inject');
var noop = function () {};
var stylish = require('gulp-jscs-stylish');
var checkstyleFileReporter = require('jshint-checkstyle-file-reporter');

var bs_drupal = browserSync.create("proxy1");
var bs_prototype = browserSync.create("proxy2");

var config = require('./gulp_config');

// Inject Files into HTML
gulp.task('inject-default', function () {
  var target = gulp.src(['source/code/_views/default.html','source/code/_views/styleguide.html']);
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['source/code/css/*.css', 'source/code/js/*.js'], {read: false});
  // Inject but trim the path to be relative to HTML
  return target.pipe(inject(sources, {ignorePath: 'source', addRootSlash: true }))
    .pipe(gulp.dest('source/code/_views'));
});

// Inject Minifed Files into HTML
gulp.task('inject-min', function () {
  var target = gulp.src(['source/code/_views/*.html']);
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['source/code/min/*.css', 'source/code/min/*.js'], {read: false});
  // Inject but trim the path to be relative to HTML
  return target.pipe(inject(sources, {ignorePath: 'source', addRootSlash: true }))
    .pipe(gulp.dest('source/code/_views'));
});

// Lint Sass
gulp.task('sass-lint', function(){
  return gulp.src(['source/code/sass/*.scss', 'source/code/sass/**/*.scss'])
    .pipe(scsslint({
      'bundleExec': true,
      'config': '.scss-lint.yml',
      'reporterOutputFormat': 'Checkstyle',
      'filePipeOutput': 'scssReport.xml'
    }))
    .pipe(gulp.dest('test-results'));
});

// JS Test
// define report filename
process.env.JSHINT_CHECKSTYLE_FILE = 'test-results/jshint.xml';
gulp.task('js-test', function(){
  return gulp.src(['source/code/js/*.js'])
    .pipe(jshint())
    .pipe(jscs())
    .on('error', noop)
    .pipe(stylish.combineWithHintResults())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter(checkstyleFileReporter));
});

// Compile Sass
gulp.task('prototype-only-sass', function() {
  browserSync.notify('<span style="color: grey">Running:</span> Sass compiling');
  return gulp.src('source/code/sass/' + '/**/*.scss')
    .pipe(compass({
      config_file: 'config.rb',
      css: 'source/code/css/',
      sass: 'source/code/sass/',
      time: true,
      bundle_exec: true
    }))
    .pipe(prefix("last 2 versions", "> 1%"))
    .pipe(gulp.dest('source/code/css/'))
    .pipe(gulp.dest('output_dev/code/css/'))
    .pipe(browserSync.reload({stream:true}));
});

// Compile Sass
gulp.task('prototype-drupal-sass', function () {
  browserSync.notify('<span style="color: grey">Running:</span> Sass compiling');
  return gulp.src('source/code/sass/' + '/**/*.scss')
    .pipe(compass({
      config_file: 'config.rb',
      css: 'source/code/css/',
      sass: 'source/code/sass/',
      time: true,
      bundle_exec: true
    }))
    .pipe(prefix("last 2 versions", "> 1%"))
    .pipe(gulp.dest('source/code/css/'))
    .pipe(bs_drupal.reload({stream: true}))
    .pipe(bs_prototype.reload({stream: true}));
});

// Minify CSS
gulp.task('css', function() {
  return gulp.src('source/code/css/*.css')
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('source/code/min'));
});

// Minify JS
gulp.task('js-min', function() {
  return gulp.src('source/code/js/*.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('source/code/min'));
});

// Optimize Images
gulp.task('images', function() {
  return gulp.src('source/code/imgs/' + '/**/*')
    .pipe(changed('source/code/imgs/'))
    .pipe(gulp.dest('source/code/min'));
});

// Sculpin Development
gulp.task('sculpin-build', function (done) {
  browserSync.notify('<span style="color: grey">Running:</span> $ sculpin build');
  return cp.spawn('sculpin', ['generate'], {stdio: 'inherit'})
    .on('close', done);
});

// Rebuild Sculpin
gulp.task('sculpin-rebuild', ['sculpin-build'], function () {
  browserSync.reload();
});

// Browser Sync for Auto Reloading if there is a prototype only.
gulp.task('browser-sync-prototype-only', [config.compile_mode, 'sculpin-build'], function() {
  browserSync({
    server: {
      baseDir: 'output_dev'
    }
  });
});

// Browser Sync for Auto Reloading if there is a drupal site.
gulp.task('browser-sync-prototype-drupal', [config.compile_mode, 'sculpin-build'], function () {
  bs_drupal.init({
    proxy: config.drupal_site_path,
    port: 3010,
    ui: {
      port: 3011
    }
  });

  bs_prototype.init({
    server: {
      baseDir: './'
    },
    port: 3012,
    ui: {
      port: 3013
    }
  })

});

// Prototype Only Sitespeed.io Task
gulp.task('prototype-only-sitespeed', sitespeed({
  url: 'http://localhost:3000/',
  deepth: 1,
  html: true,
  resultBaseDir: 'test-results',
  no: 6
}));

// Prototype and Drupal Sitespeed.io Task
gulp.task('prototype-drupal-sitespeed', sitespeed({
  urls: ['http://localhost:3012/', config.drupal_site_path],
  deepth: 1,
  html: true,
  resultBaseDir: 'test-results',
  no: 6
}));

// Watch for Changes
gulp.task('watch', function() {
  gulp.watch('source/code/sass' + '/**/*.scss', [config.compile_mode]);
  gulp.watch('source/code/imgs' + '/**/*', function() {
    runSequence(['images'], ['sculpin-rebuild'])
  });
  gulp.watch(['source/code/_views/*.html', 'source/styleguide/*.html'], ['sculpin-rebuild']);
});

// Set Test task
gulp.task('test', [config.speedtest_mode, 'sass-lint', 'js-test']);

// Set Develop task
gulp.task('develop', ['inject-default', config.browsersync_mode, 'watch']);

// Set Optimize task
gulp.task('optimize', ['images', 'css', 'js-min'], function() {
  // Don't run inject until files have been minified
  gulp.start('inject-min');
});

//  Set default task
gulp.task('default', ['develop']);
