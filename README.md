# Butler
The beginnings of a Sculpin-based style guide creation tool. 

## Dependencies
1. NodeJS 
   1. To intall NodeJS using Homebrew run `brew install node` 
1. [Sculpin](https://sculpin.io/getstarted/)
    1. `curl -O https://download.sculpin.io/sculpin.phar`
    2. `chmod +x sculpin.phar`
    3. `mv sculpin.phar sculpin` or if you are using vagrant run `sudo -H mv sculpin.phar /bin/sculpin` and skip step 4
    4. `mv sculpin ~/bin/` 

## Add Butler to a project
1.   If the project does not already have npm dependencies run `npm init` to create a `package.json` file

1.   Add Butler as a dependency by running `npm install --save palantirnet/butler`

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

1.  Navigate to `localhost:8000` or `[project].local:8000` in your browser to see the styleguide

1.  Add `node_modules` to your project's `.gitignore` file and commit your project's new `package.json`

## What does this Butler do
*  `npm run butler` 
    
    This is the default task. This will watch your sass/sculpin files for changes and compile/build accordingly. It will also flag any sass linting errors before compiling. It will output CSS that has been been minified and optimized. 

*  `npm run linting`

    This is the testing task it will run linters as their own tasks. To learn more about configuring and customizing the linters for Butler check the [linters documentation](/docs/LINTERS.md).

*   `npm run deploy`

    This is a task to deploy the static styleguide to GitHub pages. It will deploy to `gh-pages` branch of the repo defined in the `config/paths.js`. Each commit for this process will default to the message: "Updated with Butler - [timestamp]". *Note: When you are deploying, Butler will ask you for your github credentials multiple times. Enter your own github credentials as prompted.*

## Making Changes to Butler
Please feel free to change/extend/break this Gulpfile to fit the specific needs of the project.

For more information on contributing to this project check the [contributing documentation](/docs/CONTRIBUTING.md).

## Troubleshooting
For immediate concerns, if you have comments/questions/concerns about working with this please talk to Lauren.

To file bug or feature requests, please use the GitHub issue queue for this repository. You can see more about our Issue Guidelines in the [contributing documentation](/docs/CONTRIBUTING.md).
