---
title: "lints-jsdoc"
slug: nerds/lints-jsdoc
sidebar:
  order: 2
---

> [Back to config docs](/configs/lints-jsdoc/)

Source extracted from `src/uglier.js`.

```js
/**/*.{js,mjs,cjs}"],
      ignores = [],
      indent = 2,
      maxLen = 80,
      overrides = {},
    } = options

    return {
      name: "gesslar/uglier/lints-js",
      files: Array.isArray(files) ? files : [files],
      ignores: Array.isArray(ignores) ? ignores : [ignores],
      plugins: {
        "@stylistic": stylistic,
      },
      rules: {
        "@stylistic/arrow-parens": ["error", "as-needed"],
        "@stylistic/arrow-spacing": ["error", {before: true, after: true}],
        "@stylistic/brace-style": ["error", "1tbs", {allowSingleLine: false}],
        "@stylistic/nonblock-statement-body-position": ["error", "below"],
        "@stylistic/padding-line-between-statements": [
          "error",
          {blankLine: "always", prev: "if", next: "*"},
          {blankLine: "always", prev: "*", next: "return"},
          {blankLine: "always", prev: "while", next: "*"},
          {blankLine: "always", prev: "for", next: "*"},
          {blankLine: "always", prev: "switch", next: "*"},
          {blankLine: "always", prev: "do", next: "*"},
          {blankLine: "always", prev: "directive", next: "*"},
          {blankLine: "any", prev: "directive", next: "directive"},
        ],
        "@stylistic/eol-last": ["error", "always"],
        "@stylistic/indent": ["error", indent, {
          SwitchCase: 1
        }],
        "@stylistic/key-spacing": ["error", {beforeColon: false, afterColon: true}],
        "@stylistic/keyword-spacing": ["error", {
          before: false,
          after: true,
          overrides: {
            // Control statements
            return: {before: true, after: true},
            if: {after: false},
            else: {before: true, after: true},
            for: {after: false},
            while: {before: true, after: false},
            do: {after: true},
            switch: {after: false},
            case: {before: true, after: true},
            throw: {before: true, after: false},

            // Keywords
            as: {before: true, after: true},
            of: {before: true, after: true},
            from: {before: true, after: true},
            async: {before: true, after: true},
            await: {before: true, after: false},
            with: {before: true, after: true},
            class: {before: true, after: true},
            const: {before: true, after: true},
            let: {before: true, after: true},
            var: {before: true, after: true},

            // Exception handling
            catch: {before: true, after: true},
            finally: {before: true, after: true},
          }
        }],
        "@stylistic/space-before-blocks": ["error", "always"],
        "@stylistic/max-len": ["warn", {
          code: maxLen,
          ignoreComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
          tabWidth: indent
        }],
        "@stylistic/no-tabs": "error",
        "@stylistic/no-trailing-spaces": ["error"],
        "@stylistic/object-curly-spacing": ["error", "never", {
          objectsInObjects: false,
          arraysInObjects: false
        }],
        "@stylistic/quotes": ["error", "double", {
          avoidEscape: true,
          allowTemplateLiterals: "always",
        }],
        "@stylistic/semi": ["error", "never"],
        "@stylistic/space-before-function-paren": ["error", "never"],
        "@stylistic/yield-star-spacing": ["error", {before: true, after: false}],
        "constructor-super": "error",
        "no-unexpected-multiline": "error",
        "no-unused-vars": ["error", {
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_+",
          argsIgnorePattern: "^_+",
          destructuredArrayIgnorePattern: "^_+",
          varsIgnorePattern: "^_+"
        }],
        "no-useless-assignment": "error",
        "prefer-const": "error",
        "@stylistic/no-multiple-empty-lines": ["error", {max: 1}],
        "@stylistic/array-bracket-spacing": ["error", "never"],
        "@stylistic/no-extra-semi": "error",
        ...overrides,
      }
    }
  },

  /**
   * JSDoc linting rules
   *
   * @param {LintsJsdocOptions} options - Configuration options
   * @returns {FlatConfig} ESLint flat config object
   */
  "lints-jsdoc": (options = {}) => {
    const {
      files = ["src/**/*.{js,mjs,cjs}"],
      ignores = [],
      overrides = {},
    } = options

    return {
      name: "gesslar/uglier/lints-jsdoc",
      files: Array.isArray(files) ? files : [files],
      ignores: Array.isArray(ignores) ? ignores : [ignores],
      plugins: {
        jsdoc,
      },
      rules: {
        "jsdoc/require-description": "error",
        "jsdoc/tag-lines": ["error", "any", {"startLines": 1}],
        "jsdoc/require-jsdoc": ["error", {publicOnly: true}],
        "jsdoc/check-tag-names": "error",
        "jsdoc/check-types": "error",
        "jsdoc/require-param-type": "error",
        "jsdoc/require-returns-type": "error",
        "jsdoc/valid-types": "error",
        "jsdoc/no-undefined-types": "error",
        "jsdoc/require-property": "error",
        ...overrides,
      },
      settings: {
        jsdoc: {
          mode: "typescript"
        }
      }
    }
  }
```
