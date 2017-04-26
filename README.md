# Butler

A tool to automate front-end development tasks and streamline prototyping.

## Dependencies

* **NodeJS**
  1. If you are running Butler on your local machine, you can install using Homebrew: `brew install node`
  1. If you are running Butler on a Vagrant, our default VM comes with node installed.
* **Sculpin**
  1. Butler expects Sculpin to be included in your project using `composer`. Make sure you've run `composer install` in your project before running Butler.
  1. If you would like to use globally-installed Sculpin instead: first, follow [Sculpin's installation guide](https://sculpin.io/getstarted/); then configure Butler to use it by setting `defaults.sculpin_run = 'sculpin';` in your project's `conf/butler.defaults.js` file.
  
## Add Butler to a project, with Spress

1. Log in to your vagrant environment and navigate to your project. You should always run `npm` commands from within your Vagrant:

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
npm install --save --save-exact palantirnet/butler
```
  * Butler will prompt you for the git repository URL; respondez-vous
  * Butler will ask you whether you're using Spress; say `y`
1. Add Butler's scripts to your `package.json` file:

  ````
    "scripts": {
      "butler": "node_modules/butler/node_modules/.bin/gulp --gulpfile node_modules/butler/Gulpfile.js",
      "develop": "node_modules/butler/node_modules/.bin/gulp --gulpfile node_modules/butler/Gulpfile.js develop",
      "tests": "node_modules/butler/node_modules/.bin/gulp --gulpfile node_modules/butler/Gulpfile.js test",
      "deploy": "node_modules/butler/node_modules/.bin/gulp --gulpfile node_modules/butler/Gulpfile.js spress-deploy"
    },
`````
1. Now make sure your Butler runs:

  ```
npm run butler
```
1. Verify that the styleguide is running; it can be found on port 4000:
  * [http://myproject.local:4000](http://myproject.local:4000)
  * Or, if you're running Butler locally: [http://localhost:4000](http://localhost:4000)
1. Finally, add the styleguide to your project:

  ```
git add .
git commit -m "Initialize the styleguide."
```

1. Add the GitHub Pages URL for deployment
    Update the `config_github.yml` to define the GitHub Pages site URL so that you can deploy to GitHub Pages.

```
# Site configuration

url: 'https://palantirnet.github.io/[myproject]'
```
 
1. Deploy to GitHub Pages
    After running deploy, you should see the `gh-pages` branch has been updated. And you should be able to access the Living Styleguide at `https://palantirnet.github.io/[myproject]`

````
npm run deploy
````


## Add Butler to a project, with sculpin

1. If the project does not already have npm dependencies, run `npm init` to create a `package.json` file
1. Add Butler as a dependency: `npm install --save --save-exact palantirnet/butler`

  When Butler is first installed, it will ask for the location of your project's GitHub repository. Please provide the HTTPS link for the project repository, e.g. `https://github.com/palantirnet/[project].git`; Butler will use this information to deploy the styleguide.

  Butler will store this information in a project-specific configuration file at `conf/butler.defaults.js`.

1. Copy the `STYLEGUIDE_TEMPLATE` to your project's root directory and rename it `styleguide`. This name is required.
1. Add the following code to your project's `package.json`:

  ````
    "scripts": {
      "butler": "node_modules/butler/node_modules/.bin/gulp --gulpfile node_modules/butler/Gulpfile.js",
      "develop": "node_modules/butler/node_modules/.bin/gulp --gulpfile node_modules/butler/Gulpfile.js develop",
      "tests": "node_modules/butler/node_modules/.bin/gulp --gulpfile node_modules/butler/Gulpfile.js test",
      "deploy": "node_modules/butler/node_modules/.bin/gulp --gulpfile node_modules/butler/Gulpfile.js sculpin-deploy"
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

  Butler will build a Sculpin production artifact to and deploy the production artifact to `gh-pages` branch of the repo defined in the `conf/butler.defaults.js`. 

  For Spress, you will need to update the `config_github.yml` to define the GitHub Pages site URL so that you can deploy to GitHub Pages.

```
# Site configuration

url: 'https://palantirnet.github.io/[myproject]'
``` 

  For Sculpin, create a `sculpin_site_prod.yml`.

  You can find out more information about environment aware configuration for Sculpin [here](https://sculpin.io/documentation/configuration/) and the configuration for Spress [here](http://spress.yosymfony.com/docs/configuration/).

  *Note: When you are deploying, Butler will ask you for your GitHub credentials at least once, possibly multiple times. Enter your own GitHub credentials as prompted.*

## Writing Javascript
If you need to write some Javascript, follow the [instructions at `/docs/JS.md`](https://github.com/palantirnet/butler/blob/drupal-attach-behaviors/docs/JS.md) to properly set up your scripts. This will allow for Javascript to be shared between the styleguide and Drupal.

## Troubleshooting

For immediate concerns, if you have comments/questions/concerns about working with this please talk to Lauren.

To file bug or feature requests, please use the GitHub issue queue for this repository. You can see more about our Issue Guidelines in the [contributing documentation](/docs/CONTRIBUTING.md).
