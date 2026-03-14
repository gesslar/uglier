---
sidebar_label: react
---

# react

> [See the source](/docs/nerds/react)

Sets up the environment for React projects. Includes browser globals plus React-specific globals.

## Globals included

Everything from the [web](/docs/configs/web) config, plus:

- `React`
- `ReactDOM`

## Default file patterns

```
["src/**/*.{js,mjs,cjs}"]
```

## Options

```js
uglify({
  with: ["react"],
  options: {
    react: {
      files: ["src/**/*.{js,jsx}"],
      additionalGlobals: {
        __REACT_DEVTOOLS_GLOBAL_HOOK__: "readonly",
      },
    },
  },
})
```
