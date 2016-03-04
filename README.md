# Butler
The beginnings of a Sculpin based style guide creation tool. 

## Dependencies
1. NodeJS 
1. [Sculpin](https://sculpin.io/getstarted/)

## Getting Started
1.  From inside the Butler root, run `npm install -g gulp`
    
    This will install Gulp globally. 
    
    _some commands may require being run as `sudo`_

1.  run `npm install`
		
    This will install all of the npm dependencies for Butler.

1.  Run `gulp` or `gulp develop` and begin developing normally

## What does this Butler do
*  `gulp develop`/`gulp` 
    
    This is the default task. This will watch your sass/sculpin files for changes and compile/build accordingly. It will also flag any sass linting errors before compiling. It will output CSS that has been been minified and optimized. 

*  `gulp test`

    This is the testing task it will run linters as their own tasks. To learn more about configuring and customizing the linters for Butler check the [linters documentation](/docs/LINTERS.md).

## Making Changes to Butler
Please feel free to change/extend/break this Gulpfile to fit the specific needs of the project.

For more information on contributing to this project check the [contributing documentation](/docs/CONTRIBUTING.md).

## Troubleshooting
For immediate concerns, if you have comments/questions/concerns about working with this please talk to Lauren.

To file bug or feature requests, please use the GitHub issue queue for this repository. You can see more about our Issue Guidelines in the [contributing documentation](/docs/CONTRIBUTING.md).
