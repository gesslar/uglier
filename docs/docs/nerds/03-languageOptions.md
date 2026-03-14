---
sidebar_label: "languageOptions"
---

# languageOptions

> [Back to config docs](/docs/configs/language-options)

Source extracted from `src/uglier.js`.

```js
/**/*.{js,mjs,cjs}"],
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
  },

  /**
   * Language options configuration
   *
   * @param {LanguageOptionsOptions} options - Configuration options
   * @returns {FlatConfig} ESLint flat config object
   */
  "languageOptions": (options = {}) => {
    const {
      ecmaVersion = "latest",
      sourceType = "module",
      additionalGlobals = {},
    } = options

    return {
      name: "gesslar/uglier/languageOptions",
      languageOptions: {
        ecmaVersion,
        sourceType,
        globals: additionalGlobals,
      },
    }
  }
```
