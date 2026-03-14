---
sidebar_label: "react"
---

# react

> [Back to config docs](/docs/configs/react)

Source extracted from `src/uglier.js`.

```js
/**/*.{js,mjs,cjs}"],
      ignores = [],
      additionalGlobals = {},
    } = options

    return {
      name: "gesslar/uglier/node",
      files: Array.isArray(files) ? files : [files],
      ignores: Array.isArray(ignores) ? ignores : [ignores],
      languageOptions: {
        globals: {
          ...globals.node,
          fetch: "readonly",
          Headers: "readonly",
          ...additionalGlobals,
        }
      }
    }
  },

  /**
   * React application globals
   *
   * @param {EnvironmentOptions} options - Configuration options
   * @returns {FlatConfig} ESLint flat config object
   */
  "react": (options = {}) => {
    const {
      files = ["src/**/*.{js,jsx,mjs,cjs}"],
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
  }
```
