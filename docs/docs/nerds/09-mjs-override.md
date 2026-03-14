---
sidebar_label: "mjs-override"
---

# mjs-override

> [Back to config docs](/docs/configs/mjs-override)

Source extracted from `src/uglier.js`.

```js
/**
   * ES Module file override
   *
   * @param {ModuleOverrideOptions} options - Configuration options
   * @returns {FlatConfig} ESLint flat config object
   */
  "mjs-override": (options = {}) => {
    const {
      files = ["**/*.mjs"],
      ignores = [],
    } = options

    return {
      name: "gesslar/uglier/mjs-override",
      files: Array.isArray(files) ? files : [files],
      ignores: Array.isArray(ignores) ? ignores : [ignores],
      languageOptions: {
        sourceType: "module",
        ecmaVersion: 2021
      }
    }
  }
```
