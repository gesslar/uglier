---
sidebar_label: cjs-override
---

# cjs-override

> [See the source](/docs/nerds/cjs-override)

Overrides the source type to `"commonjs"` for `.cjs` files. Use this when your project is primarily ESM but has some CommonJS files.

## What it does

Sets `languageOptions.sourceType` to `"commonjs"` for files matching the pattern.

## Default file patterns

```
["**/*.cjs"]
```

## Options

```js
uglify({
  with: ["cjs-override"],
  options: {
    "cjs-override": {
      files: ["**/*.cjs", "legacy/**/*.js"],
    },
  },
})
```
