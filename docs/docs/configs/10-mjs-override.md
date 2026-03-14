---
sidebar_label: mjs-override
---

# mjs-override

> [See the source](/docs/nerds/mjs-override)

Overrides the source type to `"module"` for `.mjs` files. Use this when your project is primarily CommonJS but has some ES module files.

## What it does

Sets `languageOptions.sourceType` to `"module"` for files matching the pattern.

## Default file patterns

```
["**/*.mjs"]
```

## Options

```js
uglify({
  with: ["mjs-override"],
  options: {
    "mjs-override": {
      files: ["**/*.mjs"],
    },
  },
})
```
