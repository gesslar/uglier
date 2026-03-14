---
sidebar_label: node
---

# node

> [See the source](/docs/nerds/node)

Adds Node.js global variables to your ESLint environment.

## Globals included

- `process`
- `Buffer`
- `__dirname` / `__filename`
- `fetch`, `Headers`, `Request`, `Response`
- `URL`, `URLSearchParams`
- `setTimeout`, `setInterval`, `setImmediate`
- `console`
- And more from the `globals` package

## Default file patterns

```
["src/**/*.{js,mjs,cjs}"]
```

## Options

```js
uglify({
  with: ["node"],
  options: {
    node: {
      files: ["src/**/*.js", "scripts/**/*.js"],
      ignores: ["src/client/**"],
      additionalGlobals: {
        MY_GLOBAL: "readonly",
      },
    },
  },
})
```

### `files`

Array of glob patterns for files this config applies to.

### `ignores`

Array of glob patterns for files to exclude.

### `additionalGlobals`

Extra global variables to add on top of the Node.js defaults.
