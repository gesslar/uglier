---
sidebar_label: "node"
---

# node

> [Back to config docs](/docs/configs/node)

Source extracted from `src/uglier.js`.

```js
/**/*.{js,mjs,cjs}"],
      ignores = [],
      additionalGlobals = {},
    } = options

    return {
      name: "gesslar/uglier/vscode-extension",
      files: Array.isArray(files) ? files : [files],
      ignores: Array.isArray(ignores) ? ignores : [ignores],
      languageOptions: {
        globals: {
          acquireVsCodeApi: "readonly",
          ...additionalGlobals,
        }
      }
    }
  },

  /**
   * Node.js globals
   *
   * @param {EnvironmentOptions} options - Configuration options
   * @returns {FlatConfig} ESLint flat config object
   */
  "node": (options = {}) => {
    const {
      files = ["src/**/*.{js,mjs,cjs}"],
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
  }
```
