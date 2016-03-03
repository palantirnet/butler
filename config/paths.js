// Define Butler path variables
// NOTE: these paths are relative to the gulpfile

var paths = {};

paths.scss = ['source/code/sass/*.scss', 'source/code/sass/**/*.scss'];
paths.css = 'source/code/css/';
paths.sculpin = '/';

paths.stylelint = 'config/linters/stylelint.config.json';

module.exports = paths;