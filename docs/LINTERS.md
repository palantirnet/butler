# Butler Linters
This document goes over the linting functionality included in Butler and how it can be ignored or extended for project use.

## Stylelint
Butler runs stylelint as a PostCSS command that ensures that we are writing quality styles. 

Default style lint configuration can be found at `butler/config/linters/stylelint.config.json`. It is based on a few defaults that we should be matching in our CSS. 
 
To learn more about writing custom rules (or changing these defaults), I recommend reviewing the [Stylelint rule documentation](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/rules.md).