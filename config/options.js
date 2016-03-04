// Define Butler options

var options = {};

// Autoprefixer options
// Support 2 most recent browser versions and anything with more than 5% support
options.autoprefixer = { browsers: ['last 2 versions', '> 5%'] };

// Stylelint options
// point to the configuration file
options.stylelint = { configFile: paths.stylelint };

// Deploy message
options.message = { 'Updated with Butler - [timestamp]' };

// Deploy options
// point to the correct repo & include deploy message
options.deploy = {
  remoteUrl: paths.repo,
  message: options.message
};

module.exports = options;