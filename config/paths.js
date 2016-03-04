// Define Butler path variables
// NOTE: these paths are relative to the gulpfile

var paths = {};

// location of the .scss files
paths.scss = ['STYLEGUIDE_TEMPLATE/source/code/sass/*.scss', 'STYLEGUIDE_TEMPLATE/source/code/sass/**/*.scss'];
// location of the compiled CSS
paths.css = 'STYLEGUIDE_TEMPLATE/source/code/css/';
// location of the sculpin project root
paths.sculpin = 'STYLEGUIDE_TEMPLATE//';
// location of the compiled output
paths.output = 'STYLEGUIDE_TEMPLATE/output_dev';
// location of the remote repository
paths.repo = 'https://github.com/palantirnet/butler.git';
// location of the stylelint config
paths.stylelint = 'config/linters/stylelint.config.json';

module.exports = paths;