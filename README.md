# Butler
The beginnings of a Sculpin-based style guide creation tool. 

## Dependencies
1. NodeJS 
1. [Sculpin](https://sculpin.io/getstarted/)

## Add Butler to a project
1.   If the project does not already have npm dependencies run `npm init` to create a `package.json` file

1.   Add Butler as a dependency by running `npm install --save palantirnet/butler`

1.  Duplicate `STYLEGUIDE_TEMPLATE` rename and add it to the project's root directory

1.  Run `npm run butler` and begin developing normally

## What does this Butler do
*  `npm run butler` 
    
    This is the default task. This will watch your sass/sculpin files for changes and compile/build accordingly. It will also flag any sass linting errors before compiling. It will output CSS that has been been minified and optimized. 

*  `npm run linting`

    This is the testing task it will run linters as their own tasks. To learn more about configuring and customizing the linters for Butler check the [linters documentation](/docs/LINTERS.md).

*   `npm run deploy`

    This is a task to deploy the static styleguide to GitHub pages. It will deploy to `gh-pages` branch of the repo defined in the `config/paths.js`. Each commit for this process will default to the message: "Updated with Butler - [timestamp]". 

## Making Changes to Butler
Please feel free to change/extend/break this Gulpfile to fit the specific needs of the project.

For more information on contributing to this project check the [contributing documentation](/docs/CONTRIBUTING.md).

## Troubleshooting
For immediate concerns, if you have comments/questions/concerns about working with this please talk to Lauren.

To file bug or feature requests, please use the GitHub issue queue for this repository. You can see more about our Issue Guidelines in the [contributing documentation](/docs/CONTRIBUTING.md).
