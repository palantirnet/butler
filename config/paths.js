// Define Butler path variables
// NOTE: these paths are relative to the gulpfile

var paths = {};

// location of the .scss files
paths.scss = ['source/code/sass/*.scss', 'source/code/sass/**/*.scss'];
// location of the compiled CSS
paths.css = 'source/code/css/';
// location of the sculpin project root
paths.sculpin = '/';
// location of the compiled output
paths.output = 'output_dev';
// location of the remote repository
paths.repo = 'https://github.com/palantirnet/butler.git';
// location of the stylelint config
paths.stylelint = 'config/linters/stylelint.config.json';

module.exports = paths;