# Butler
The beginnings of a Sculpin based style guide creation tool. 

## Dependencies
1. NodeJS 
1. 	NPM

## Getting Started
1.  From inside the project root, run `npm install`
		
    This will install all of the npm dependencies for Butler.

1.  Run `gulp` or `gulp develop` and begin developing normally

## What is Gulp?
"Gulp is a build system that can improve how you develop websites by automating common tasks, such as compiling preprocessed CSS, minifying JavaScript and reloading the browser." - <a href="http://www.smashingmagazine.com/2014/06/11/building-with-gulp/">Smashing Magazine</a>

## What does this Butler do
There are three main tasks in this gulp file:

1. `gulp develop`/`gulp` This is the default task. This will watch your sass/sculpin files for changes and compile/build accordingly.

## Making Changes to Butler
Please feel free to change/extend/break this Gulpfile to fit the specific needs of the project. If you would like to add additional functionality please do so to the butler package and create a PR. 

If you are adding additional functionality you will have to also update the `npm-shrinkwrap.json` by running `update <package_name>`. You _must_ specify the exact package that needs to be updated and then re-run `npm shrinkwrap --dev` to update the `npm-shrinkwrap.json`.

_To check which files have become outdated run `npm outdated`_

## Troubleshooting
For now, if you have comments/questions/concerns about working with this please talk to Lauren.
