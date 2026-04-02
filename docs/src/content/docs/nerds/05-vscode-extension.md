---
title: "vscode-extension"
slug: nerds/vscode-extension
sidebar:
  order: 5
---

> [Back to config docs](/configs/vscode-extension/)

Source extracted from `src/uglier.js`.

```js
/**/*.{js,mjs,cjs}"],
      ignores = [],
      additionalGlobals = {},
    } = options

    return {
      name: "gesslar/uglier/web",
      files: Array.isArray(files) ? files : [files],
      ignores: Array.isArray(ignores) ? ignores : [ignores],
      languageOptions: {
        globals: {
          ...globals.browser,
          ...additionalGlobals,
        }
      }
    }
  },

  /**
   * VSCode extension globals
   *
   * @param {EnvironmentOptions} options - Configuration options
   * @returns {FlatConfig} ESLint flat config object
   */
  "vscode-extension": (options = {}) => {
    const {
      files = ["src/**/*.{js,mjs,cjs}"],
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
  }
```
