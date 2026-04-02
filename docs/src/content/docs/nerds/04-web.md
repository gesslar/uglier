---
title: "web"
slug: nerds/web
sidebar:
  order: 4
---

> [Back to config docs](/configs/web/)

Source extracted from `src/uglier.js`.

```js
/**
   * Browser/web globals configuration
   *
   * @param {EnvironmentOptions} options - Configuration options
   * @returns {FlatConfig} ESLint flat config object
   */
  "web": (options = {}) => {
    const {
      files = ["src/**/*.{js,mjs,cjs}"],
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
  }
```
