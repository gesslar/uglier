---
title: languageOptions
slug: configs/language-options
sidebar:
  order: 3
---

> [See the source](/nerds/languageOptions/)

Configures the ECMAScript version and module source type for your project.

## Defaults

| Option | Default |
|--------|---------|
| `ecmaVersion` | `"latest"` |
| `sourceType` | `"module"` |

## Options

```js
uglify({
  with: ["languageOptions"],
  options: {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      additionalGlobals: {
        myGlobal: "readonly",
      },
    },
  },
})
```

### `ecmaVersion`

The ECMAScript version to parse. Default: `"latest"`.

### `sourceType`

Either `"module"` (ESM) or `"commonjs"`. Default: `"module"`.

### `additionalGlobals`

An object of additional global variables to define. Keys are variable names, values are `"readonly"` or `"writable"`.

:::note
You typically don't need this block explicitly — the environment configs (`node`, `web`, etc.) set language options automatically. Use this when you need fine-grained control over the ECMAScript version or source type.
:::
