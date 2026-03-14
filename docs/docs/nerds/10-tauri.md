---
sidebar_label: "tauri"
---

# tauri

> [Back to config docs](/docs/configs/tauri)

Source extracted from `src/uglier.js`.

```js
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
