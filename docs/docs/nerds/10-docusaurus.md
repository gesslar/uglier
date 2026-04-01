---
sidebar_label: "docusaurus"
---

# docusaurus

> [Back to config docs](/docs/configs/docusaurus)

Source extracted from `src/uglier.js`.

```js
/**
   * Docusaurus documentation site globals (browser + React + Docusaurus)
   *
   * @param {EnvironmentOptions} options - Configuration options
   * @returns {FlatConfig} ESLint flat config object
   */
  "docusaurus": (options = {}) => {
    const {
      files = ["src/**/*.{js,jsx,mjs,cjs}", "docs/**/*.{js,jsx,mjs,cjs}"],
      ignores = [],
      additionalGlobals = {},
    } = options

    return {
      name: "gesslar/uglier/docusaurus",
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
