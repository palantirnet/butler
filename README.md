# Butler
A tool to automate front-end development tasks and streamline prototyping.  

## Dependencies
1. NodeJS 
   1. To intall NodeJS using Homebrew run `brew install node` 
1. [Sculpin](https://sculpin.io/getstarted/)
    
     By default Butler expects your project to include Sculpin as a Composer dependency. 
     You can change this by updating the `defaults.sculpin_run` setting. If you're using a global Sculpin install the `defaults.sculpin_run` variable should be set to `sculpin`.

## Add Butler to a project
1.   If the project does not already have npm dependencies run `npm init` to create a `package.json` file

1.   Add Butler as a dependency by running `npm install --save palantirnet/butler`
     
     When Butler is installing it will ask for the GitHub repository for your project. Please provide the HTTPS link for the project repository.
     
     Example: `https://github.com/palantirnet/[project].git`
     
     Butler will use this information to know where to deploy the styleguide to.
     
     During this step Butler will create a `butler.defaults.js` file in your project's `conf` directory. This will set the project defaults for Butler.

1.  Duplicate `STYLEGUIDE_TEMPLATE`, rename it `styleguide`, and add it to the project's root directory

1.  Add the following code to your project's `package.json`

````
"scripts": {
	"butler": "gulp --gulpfile node_modules/butler/gulpfile.js develop",
	"linting": "gulp --gulpfile node_modules/butler/gulpfile.js test",
	"deploy": "gulp --gulpfile node_modules/butler/gulpfile.js deploy"
},
````

1.  Run `npm run butler` and begin developing normally

1.  Navigate to `http://localhost:8000/` or `http://[project].local:8000/` in your browser to see the styleguide

1.  Add `node_modules` to your project's `.gitignore` file and commit your project's new `package.json` and `conf/butler.defaults.js`

## What does this Butler do
*  `npm run butler` 
    
    This is the default task. This will watch your sass/sculpin files for changes and compile/build accordingly. It will also flag any sass linting errors before compiling. It will output CSS that has been been minified and optimized. 

*  `npm run linting`

    This is the testing task it will run linters as their own tasks. To learn more about configuring and customizing the linters for Butler check the [linters documentation](/docs/LINTERS.md).

*   `npm run deploy`

    This is a task to deploy the static styleguide to GitHub pages. 
    
    Butler will build a Sculpin production artifact to `styleguide/output_prod` and deploy the production artifact to `gh-pages` branch of the repo defined in the `conf/butler.defaults.js`. Each commit for this process will default to the message: "Updated with Butler - [timestamp]".
    
    You may want to create a `sculpin_site_prod.yml` to define the site URL once deployed. You can find out more information about environment aware configuration for Sculpin [here](https://sculpin.io/documentation/configuration/). 
    
    *Note: When you are deploying, Butler will ask you for your GitHub credentials at least once, possibly multiple times. Enter your own GitHub credentials as prompted.*

## Making Changes to Butler
Please feel free to change/extend/break this Gulpfile to fit the specific needs of the project.

For more information on contributing to this project check the [contributing documentation](/docs/CONTRIBUTING.md).

## Troubleshooting
For immediate concerns, if you have comments/questions/concerns about working with this please talk to Lauren.

To file bug or feature requests, please use the GitHub issue queue for this repository. You can see more about our Issue Guidelines in the [contributing documentation](/docs/CONTRIBUTING.md).
