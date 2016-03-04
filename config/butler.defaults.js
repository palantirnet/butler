// Define Butler default configuration

var defaults = {};

// location of the .scss files
defaults.scss = ['STYLEGUIDE_TEMPLATE/source/code/sass/*.scss', 'STYLEGUIDE_TEMPLATE/source/code/sass/**/*.scss'];
// location of the compiled CSS
defaults.css = 'STYLEGUIDE_TEMPLATE/source/code/css/';
// location of the sculpin project root
defaults.sculpin = 'STYLEGUIDE_TEMPLATE//';
// location of the compiled output
defaults.output = 'STYLEGUIDE_TEMPLATE/output_dev';
// location of the remote repository
defaults.repo = 'https://github.com/palantirnet/butler.git';

// Autoprefixer defaults
// Support 2 most recent browser versions and anything with more than 5% support
defaults.autoprefixer = { browsers: ['last 2 versions', '> 5%'] };

// Stylelint defaults
// point to the configuration file
defaults.stylelint = { configFile: 'config/linters/stylelint.config.json' };

// Deploy message
// defaults.message = { 'Updated with Butler - [timestamp]' };

// Deploy defaults
// point to the correct repo & include deploy message
defaults.deploy = {
  remoteUrl: defaults.repo
};

module.exports = defaults;