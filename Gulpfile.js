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
  var target = gulp.src(['_layouts/default.html', '_layouts/template.html']);
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['assets/css/*.css', 'assets/js/*.js'], {read: false});
  return target.pipe(inject(sources))
    .pipe(gulp.dest('_layouts'));
});

// Inject Minifed Files into HTML
gulp.task('inject-min', function () {
  var target = gulp.src(['_layouts/default.html', '_layouts/template.html']);
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['assets/min/*.css', 'assets/min/*.js'], {read: false});
  return target.pipe(inject(sources))
    .pipe(gulp.dest('_layouts'));
});

// Lint Sass
gulp.task('sass-lint', function(){
  return gulp.src(['assets/sass/*.scss', 'assets/sass/**/*.scss'])
    .pipe(scsslint({
      'bundleExec': true,
      'config': '.scss-lint.yml',
      'reporterOutputFormat': 'Checkstyle',
      'filePipeOutput': 'scssReport.xml'
    }))
    .pipe(gulp.dest('test-results'))
});

// JS Test

// define report filename
process.env.JSHINT_CHECKSTYLE_FILE = 'test-results/jshint.xml';

gulp.task('js-test', function(){
  return gulp.src(['assets/js/*.js'])
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
  return gulp.src('assets/sass/' + '/**/*.scss')
    .pipe(compass({
      config_file: 'config.rb',
      css: 'assets/css/',
      sass: 'assets/sass/',
      time: true,
      bundle_exec: true
    }))
    .pipe(prefix("last 2 versions", "> 1%"))
    .pipe(gulp.dest('assets/css/'))
    .pipe(gulp.dest('_site/assets/css/'))
    .pipe(browserSync.reload({stream:true}));
});

// Compile Sass
gulp.task('prototype-drupal-sass', function () {
  browserSync.notify('<span style="color: grey">Running:</span> Sass compiling');
  return gulp.src('assets/sass/' + '/**/*.scss')
    .pipe(compass({
      config_file: 'config.rb',
      css: 'assets/css/',
      sass: 'assets/sass/',
      time: true,
      bundle_exec: true
    }))
    .pipe(prefix("last 2 versions", "> 1%"))
    .pipe(gulp.dest('assets/css/'))
    .pipe(gulp.dest('_site/assets/css/'))
    .pipe(bs_drupal.reload({stream: true}))
    .pipe(bs_prototype.reload({stream: true}));
});

// Minify CSS
gulp.task('css', function() {
  return gulp.src('assets/css/*.css')
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('assets/min'));
});

// Minify JS
gulp.task('js-min', function() {
  return gulp.src('assets/js/*.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('assets/min'));
});

// Optimize Images
gulp.task('images', function() {
  return gulp.src('assets/imgs/' + '/**/*')
    .pipe(changed('assets/imgs/'))
    .pipe(gulp.dest('assets/min'));
});

// Jekyll Development
gulp.task('jekyll-build', function (done) {
  browserSync.notify('<span style="color: grey">Running:</span> $ jekyll build');
  return cp.spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
    .on('close', done);
});

// Rebuild Jekyll
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});

// Browser Sync for Auto Reloading if there is a prototype only.
gulp.task('browser-sync-prototype-only', [config.compile_mode, 'jekyll-build'], function() {
  browserSync({
    server: {
      baseDir: '_site'
    }
  });
});

// Browser Sync for Auto Reloading if there is a drupal site.
gulp.task('browser-sync-prototype-drupal', [config.compile_mode, 'jekyll-build'], function () {
  bs_drupal.init({
    proxy: config.drupal_site_path,
    port: 3010,
    ui: {
      port: 3011
    }
  });

  bs_prototype.init({
    server: {
      baseDir: '_site'
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
  gulp.watch('assets/sass' + '/**/*.scss', [config.compile_mode]);
  gulp.watch('assets/imgs' + '/**/*', function() {
    runSequence(['images'], ['jekyll-rebuild'])
  });
  gulp.watch(['*.html', '_includes/*.html', '_layouts/*.html', '_posts/*.html'], ['jekyll-rebuild']);
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
