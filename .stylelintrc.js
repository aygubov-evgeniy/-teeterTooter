module.exports = {
  extends: [
    "stylelint-config-recommended-scss",
    "stylelint-config-prettier",
    "stylelint-config-rational-order"
  ],
  "customSyntax": "postcss-html",
  rules: {
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep']
      },
    ],
    'no-descending-specificity': [
      true,
      {
        ignore: ["selectors-within-list"]
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['for', 'each', 'mixin', 'include', 'if', 'else', 'use'],
      }
    ],
    'no-duplicate-selectors': true,
    'scss/no-dollar-variables': true,
    'no-missing-end-of-source-newline': true,
    'indentation': [2, {
      baseIndentLevel: 0
    }],
    'string-quotes': 'single',
    'declaration-block-trailing-semicolon': 'always',
  },
}
