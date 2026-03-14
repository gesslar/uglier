---
sidebar_label: "cjs-override"
---

# cjs-override

> [Back to config docs](/docs/configs/cjs-override)

Source extracted from `src/uglier.js`.

```js
/**/*.{js,jsx,mjs,cjs}"],
      ignores = [],
      additionalGlobals = {},
    } = options

    return {
      name: "gesslar/uglier/react",
      files: Array.isArray(files) ? files : [files],
      ignores: Array.isArray(ignores) ? ignores : [ignores],
      languageOptions: {
        globals: {
          ...globals.browser,
          React: "readonly",
          ReactDOM: "readonly",
          ...additionalGlobals,
        }
      }
    }
  },

  /**
   * CommonJS file override
   *
   * @param {ModuleOverrideOptions} options - Configuration options
   * @returns {FlatConfig} ESLint flat config object
   */
  "cjs-override": (options = {}) => {
    const {
      files = ["**/*.cjs"],
      ignores = [],
    } = options

    return {
      name: "gesslar/uglier/cjs-override",
      files: Array.isArray(files) ? files : [files],
      ignores: Array.isArray(ignores) ? ignores : [ignores],
      languageOptions: {
        sourceType: "script",
        ecmaVersion: 2021
      },
    }
  }
```
