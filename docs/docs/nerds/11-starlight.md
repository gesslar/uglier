---
sidebar_label: "starlight"
---

# starlight

> [Back to config docs](/docs/configs/starlight)

Source extracted from `src/uglier.js`.

```js
/**/*.{js,jsx,mjs,cjs}", "docs/**/*.{js,jsx,mjs,cjs}"],
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
  },

  /**
   * Starlight documentation site (browser + Astro + eslint-plugin-astro)
   *
   * @param {EnvironmentOptions} options - Configuration options
   * @returns {Array<FlatConfig>} ESLint flat config array
   */
  "starlight": (options = {}) => {
    const {
      files = ["src/**/*.{js,mjs,cjs}", "docs/**/*.{js,mjs,cjs}"],
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
  }
```
