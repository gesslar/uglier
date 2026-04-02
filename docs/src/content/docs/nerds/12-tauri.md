---
title: "tauri"
slug: nerds/tauri
sidebar:
  order: 12
---

> [Back to config docs](/configs/tauri/)

Source extracted from `src/uglier.js`.

```js
/**/*.{js,mjs,cjs}", "docs/**/*.{js,mjs,cjs}"],
      ignores = [],
      additionalGlobals = {},
    } = options

    return [
      ...astro.configs["flat/recommended"],
      {
        name: "gesslar/uglier/starlight",
        files: Array.isArray(files) ? files : [files],
        ignores: Array.isArray(ignores) ? ignores : [ignores],
        languageOptions: {
          globals: {
            ...globals.browser,
            ...additionalGlobals,
          }
        }
      },
    ]
  },

  /**
   * Tauri application configuration (browser + Tauri APIs, no Node.js)
   *
   * @param {EnvironmentOptions} options - Configuration options
   * @returns {FlatConfig} ESLint flat config object
   */
  "tauri": (options = {}) => {
    const {
      files = ["src/**/*.{js,mjs,cjs}"],
      ignores = [],
      additionalGlobals = {},
    } = options

    return {
      name: "gesslar/uglier/tauri",
      files: Array.isArray(files) ? files : [files],
      ignores: Array.isArray(ignores) ? ignores : [ignores],
      languageOptions: {
        globals: {
          ...globals.browser,
          __TAURI__: "readonly",
          __TAURI_METADATA__: "readonly",
          ...additionalGlobals,
        }
      }
    }
  }
```
