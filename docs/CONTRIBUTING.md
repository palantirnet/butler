# Contributing

Any and all are encouraged to contribute! There are three primary ways to do so: creating issues, submitting pull requests (PRs), and reviewing issues and PRs.

## Review Process

As a major part of the Palantir Tool Chain, this repository should be continually updated. When it is extended for projects or professional development, those changes if pertinent to overall Palantir workflow should be ported back this repository.

1. Modifications to the default tool chain should be reviewed during Sprint Retrospectives.
1. If those modifications are found valuable to the Palantir tool chain as a whole, they should be brought up as a topic at bi-weekly DEFEND meetings.
1. Such meetings will be used as an open forum for debate and/or voting on the issue.
1. Should the issue be approved by DEFEND, one would create an PR against this repository (following the above stated standards) to incorporate the work into the base toolchain.
1. PRs are eligible to be merged once when there is consensus and approval from a Senior Designer and Senior Front End Developer in the case of changes to HTML/CSS/JS, and in the case of changes to Butler, it requires approval from Lauren and Ryan.

Issue, PR and Commit Guidelines below generally followed those outlined in the [documentation repo](https://github.com/palantirnet/development_documentation/blob/master/CONTRIBUTING.md)

## Issue Guidelines

* The title should be a simple declarative sentence; examples,
    * Good: Symfony code style documentation is missing.
    * Bad: Add Symfony code style documentation. [bad because it is imperative]
    * Bad: What is the Symfony code style documentation? [bad because it is interrogative]
    * Bad: Symfony and Drupal code style documentation are missing. [bad because it is compound]
* The issue should be atomic: the issue should address an indivisible and irreducible topic.
    * Good: Symfony code style documentation is missing.
    * Bad: Code style documentation is missing. [bad because it could be divided into Drupal and Symfony documentation]
    * Bad: Symfony best practice documentation is missing. [bad if only code style documentation was missing because it could be reduced to just Symfony code style documentation]
* The issue description should:
    * give context: explain why you are writing the issue
    * state the problem or idea: the context should lead into what needs changed or added to the standards
    * identify the next step: e.g. request feedback, assign the issue to someone, or further investigation required (this is required! this is how the community knows how to respond)
* Open an issue when you have a clear idea of a problem that needs addressed both bug fixes and feature requests (e.g. As a FED/Designer at Palantir.net, I would like Butler to be a part of the standing prototype repository), but do not have a clear idea of the solution.
* If an issue was created that is a duplicate, close the issue that has the least activity and make sure they reference one another.

## Pull Request Guidelines

* The title should be a simple imperative sentence; examples,
    * Good: Add Symfony code style documentation.
    * Bad: Adding Symfony code style documentation. [bad because it is declarative]
    * Bad: Is this good Symfony code style documentation? [bad because it is interrogative]
    * Bad: Add Symfony and Drupal code style documentation. [bad because it is compound]
* The PR should be atomic: the PR should address an indivisible and irreducible topic. The more atomic PRs are the more easily they can be reviewed and merged.
    * Do not address multiple issues in one PR.
* The PR description should:
    * give context: explain why you are creating the PR, e.g. reference the GitHub issue number it addresses
    * state the solution: the context should lead into what you did to resolve the issue
    * identify any follow up changes that will be needed and how that is going to be addressed, i.e. what does this PR not address?
* If you create a branch you own it; no one else should modify it without your permission.

## Git Commit Guidelines

Commits should be atomic: the commit should be an indivisible and irreducible change. The commit message can be best described with an example, which we will model after Tim Pope's [blog post](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html):

    Capitalized, short (50 chars or less) summary.

    More detailed explanatory text, if necessary. Wrap it to 72
    characters. Think of the first line as a subject of an email and
    the rest as the body. The blank line separating the summary from
    the body is critical (unless you omit the body entirely); tools
    like rebase can get confused if you run the two together.