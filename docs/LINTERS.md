# Butler Linters
This document goes over the linting functionality included in Butler and how it can be ignored or extended for project use.

## Stylelint
Butler runs stylelint as a PostCSS command that ensures that we are writing quality styles. 

Default style lint configuration can be found at `butler/config/linters/stylelint.config.json`. It is based on a few defaults that we should be matching in our CSS. 
 
To learn more about writing custom rules (or changing these defaults), I recommend reviewing the [Stylelint rule documentation](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/rules.md).

### Stylelint Selector Bem Pattern
Butler incorporates the [stylelint-selector-bem-pattern plugin](https://github.com/stylelint/stylelint), which will lint the selectors to check that they are inline with Palantir.net Class Naming guidelines. In order to lint selectors, they must use the following syntax (including comments).

````
/** @define MyComponent */

:root {
  --MyComponent-property: value;
}

.MyComponent {}

.MyComponent-other {}
````

You can read more documentation on how the selector linter works and how to customize it [here](https://github.com/postcss/postcss-bem-linter).