// Define Butler default configuration

var defaults = {};

// .scss files
defaults.scss = ['../../styleguide/source/code/sass/*.scss', '../../styleguide/source/code/sass/**/*.scss'];
// location of the compiled CSS
defaults.css = '../../styleguide/source/code/css/';
// location of the sculpin project root
defaults.sculpin_dir = '../../styleguide/';
// location of the template files
defaults.template_files = ['../../styleguide/source/*.html', '../../styleguide/source/**/*.html'];
// location of the compiled output
defaults.output_dev = '../../styleguide/output_dev';
// location of the compiled html files
defaults.html_files = ['../../styleguide/output_dev/*.html', '../../styleguide/output_dev/**/*.html'];
// production files to be deployed
defaults.output_prod = '../../styleguide/output_prod/**/*';
// location of testing reports
defaults.reports = '../../styleguide/reports';

// location of sculpin.phar
defaults.sculpin_run = '../../vendor/bin/sculpin';

// Autoprefixer defaults
// Support 2 most recent browser versions and anything with more than 5% support
defaults.autoprefixer = { browsers: ['last 2 versions', '> 5%'] };

// Stylelint defaults
// point to the configuration file
defaults.stylelint = { configFile: 'config/linters/stylelint.config.json' };

// Deploy defaults
// point to the correct repo & include deploy message
defaults.deploy = {
  remoteUrl: defaults.repo,
  message: 'Updated with Butler - [timestamp]'
};

module.exports = defaults;
