---
title: lints-jsdoc
slug: configs/lints-jsdoc
sidebar:
  order: 2
---

> [See the source](/nerds/lints-jsdoc/)

Enforces JSDoc documentation standards across your codebase using `eslint-plugin-jsdoc`.

## What it enforces

- All public functions must have descriptions
- `@param` tags with types and descriptions
- `@returns` tags with types
- Valid tag names and types
- TypeScript-compatible JSDoc mode

## Default file patterns

```
["src/**/*.{js,mjs,cjs}"]
```

## Options

```js
uglify({
  with: ["lints-jsdoc"],
  options: {
    "lints-jsdoc": {
      files: ["src/**/*.js"],
      ignores: ["src/tests/**"],
      overrides: {
        "jsdoc/require-description": "warn",
      },
    },
  },
})
```

### `files`

Array of glob patterns for files this config applies to.

### `ignores`

Array of glob patterns for files to exclude.

### `overrides`

An object of JSDoc rule overrides merged on top of the defaults.
