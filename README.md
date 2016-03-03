# Butler
The beginnings of a Sculpin based style guide creation tool. 

## Dependencies
1. NodeJS 

## Getting Started
1.  From inside the project root, run `npm install`
		
    This will install all of the npm dependencies for Butler.

1.  Run `gulp` or `gulp develop` and begin developing normally

## What does this Butler do
There are three main tasks in this gulp file:

1.  `gulp develop`/`gulp` 
    
    This is the default task. This will watch your sass/sculpin files for changes and compile/build accordingly. It will also flag any sass linting errors before compiling. It will output CSS that has been been minified and optimized. 

1.  `gulp test`

    This is the testing task it will run linters as their own tasks. To learn more about configuring and customizing the linters for Butler check the [LINTERS.md](/docs/LINTERS.md).

## Making Changes to Butler
Please feel free to change/extend/break this Gulpfile to fit the specific needs of the project. If you would like to add additional functionality please do so to the butler package and create a PR. 

If you are adding additional functionality you will have to also update the `npm-shrinkwrap.json` by running `update <package_name>`. You _must_ specify the exact package that needs to be updated and then re-run `npm shrinkwrap --dev` to update the `npm-shrinkwrap.json`.

_To check which files have become outdated run `npm outdated`_

For more information on contributing to this project check the [CONTRIBUTING.md](/docs/CONTRIBUTING.md).

## Troubleshooting
For now, if you have comments/questions/concerns about working with this please talk to Lauren.
