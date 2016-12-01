# Butler

A tool to automate front-end development tasks and streamline prototyping.

## Dependencies

* **NodeJS**
  1. If you are running Butler on your local machine, you can install using Homebrew: `brew install node`
  1. If you are running Butler on a Vagrant, our default VM comes with node installed.
* **Sculpin**
  1. Butler expects Sculpin to be included in your project using `composer`. Make sure you've run `composer install` in your project before running Butler.
  1. If you would like to use globally-installed Sculpin instead: first, follow [Sculpin's installation guide](https://sculpin.io/getstarted/); then configure Butler to use it by setting `defaults.sculpin_run = 'sculpin';` in your project's `conf/butler.defaults.js` file.

## Add Butler to a project, with sculpin

1. If the project does not already have npm dependencies, run `npm init` to create a `package.json` file
1. Add Butler as a dependency: `npm install --save-exact palantirnet/butler`

  When Butler is first installed, it will ask for the location of your project's GitHub repository. Please provide the HTTPS link for the project repository, e.g. `https://github.com/palantirnet/[project].git`; Butler will use this information to deploy the styleguide.

  Butler will store this information in a project-specific configuration file at `conf/butler.defaults.js`.

1. Copy the `STYLEGUIDE_TEMPLATE` to your project's root directory and rename it `styleguide`. This name is required.
1. Add the following code to your project's `package.json`:

  ````
    "scripts": {
      "butler": "node_modules/butler/node_modules/.bin/gulp --gulpfile node_modules/butler/Gulpfile.js",
      "develop": "node_modules/butler/node_modules/.bin/gulp --gulpfile node_modules/butler/Gulpfile.js develop",
      "tests": "node_modules/butler/node_modules/.bin/gulp --gulpfile node_modules/butler/Gulpfile.js test",
      "deploy": "node_modules/butler/node_modules/.bin/gulp --gulpfile node_modules/butler/Gulpfile.js deploy"
    },
  ````
1. Add the `node_modules` directory to your project's .gitignore
1. Commit Butler's changes to your project:
  * `.gitignore`
  * `conf/butler.defaults.js`
  * `package.json`
  * `styleguide/`
1. When you're ready to start working on code, run `npm run butler`
1. The styleguide can be found on port 8000:
  * `http://[project].local:8000` if you're running Butler on a Vagrant
  * [http://localhost:8000](http://localhost:8000) if you're developing locally

## Add Butler to a project, with spress

1. Log in to your vagrant environment and navigate to your project. You should always run `npm` commands from within your Vagrant.

  ```
vagrant up
vagrant ssh
cd /var/www/myproject.local
```
1. Create a `styleguide` directory in your project:

  ```
mkdir styleguide
```
1. **You'll install the styleguide dependencies and run Butler from the `styleguide` directory.** Go there now:

  ```
cd styleguide
```
1. Tell `npm` to create your `package.json` file:

  ```
npm init
```
1. Add Butler as a dependency:

  ```
npm install --save-exact palantirnet/butler#spress-task
```
  * Butler will prompt you for the git repository URL; respondez-vous
  * Butler will ask you whether you're using Spress; say `y`
1. Add Butler's scripts to your `package.json` file:

  ```json
    "scripts": {
      "butler": "node_modules/butler/node_modules/.bin/gulp --gulpfile node_modules/butler/Gulpfile.js",
      "develop": "node_modules/butler/node_modules/.bin/gulp --gulpfile node_modules/butler/Gulpfile.js develop",
      "tests": "node_modules/butler/node_modules/.bin/gulp --gulpfile node_modules/butler/Gulpfile.js test",
      "deploy": "node_modules/butler/node_modules/.bin/gulp --gulpfile node_modules/butler/Gulpfile.js deploy"
    },
```
1. Now make sure your Butler runs:

  ```
npm run butler
```
1. The styleguide can be found on port 4000:
  * [http://myproject.local:4000](http://myproject.local:4000)
  * Or, if you're running Butler locally: [http://localhost:4000](http://localhost:4000)
1. Add your fresh styleguide code to your project: `git add .`

## What does this Butler do?

* `npm run butler`

  This is the default task. This will watch your sass/sculpin files for changes and compile/build accordingly. It will also flag any sass linting errors before compiling. It will output CSS that has been been minified and optimized.

* `npm run butler -- sass`

  Just compile the sass. You can also use this syntax to run any task from the Gulpfile.

* `npm run tests`

  This is the testing task it will run linters as their own tasks. To learn more about configuring and customizing the linters for Butler check the [linters documentation](/docs/LINTERS.md).

  This task also checks for WCAG 2.0AA compliance using the [gulp-accessibility](https://github.com/yargalot/gulp-accessibility) plugin.

* `npm run deploy`

  This is a task to deploy the static styleguide to GitHub pages.

  Butler will build a Sculpin production artifact to `styleguide/output_prod` and deploy the production artifact to `gh-pages` branch of the repo defined in the `conf/butler.defaults.js`. Each commit for this process will default to the message: "Updated with Butler - [timestamp]".

  You may want to create a `sculpin_site_prod.yml` to define the site URL once deployed. You can find out more information about environment aware configuration for Sculpin [here](https://sculpin.io/documentation/configuration/).

  *Note: When you are deploying, Butler will ask you for your GitHub credentials at least once, possibly multiple times. Enter your own GitHub credentials as prompted.*

## Troubleshooting

For immediate concerns, if you have comments/questions/concerns about working with this please talk to Lauren.

To file bug or feature requests, please use the GitHub issue queue for this repository. You can see more about our Issue Guidelines in the [contributing documentation](/docs/CONTRIBUTING.md).
