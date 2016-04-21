// Define Butler default configuration

var defaults = {};

// .scss files
defaults.scss = ['../../styleguide/source/code/sass/*.scss', '../../styleguide/source/code/sass/**/*.scss'];
// location of the compiled CSS
defaults.css = '../../styleguide/source/code/css/';
// location of the sculpin project root
defaults.sculpin = '../../styleguide/';
// location of the compiled output
defaults.output_dev = '../../styleguide/output_dev';
// production files to be deployed
defaults.output_prod = '../../styleguide/output_prod/**/*';

// location of sculpin.phar
defaults.sculpin_run = '../../vendor/bin/sculpin';

// Autoprefixer defaults
// Support 2 most recent browser versions and anything with more than 5% support
defaults.autoprefixer = { browsers: ['last 2 versions', '> 5%'] };

// Stylelint defaults
// point to the configuration file
defaults.stylelint = { configFile: 'config/linters/scss-lint.yaml' };

// Deploy message
// defaults.message = { 'Updated with Butler - [timestamp]' };

// Deploy defaults
// point to the correct repo & include deploy message
defaults.deploy = {
  remoteUrl: defaults.repo
};

module.exports = defaults;
