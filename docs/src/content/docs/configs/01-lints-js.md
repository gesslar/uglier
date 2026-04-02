---
title: lints-js
slug: configs/lints-js
sidebar:
  order: 1
---

> [See the source](/nerds/lints-js/)

The core stylistic config block. This is where the magic happens — all formatting rules in one composable unit.

## What it enforces

| Rule | Default |
|------|---------|
| Semicolons | None (ASI) |
| Quotes | Double |
| Indent | 2 spaces |
| Arrow parens | As needed |
| Brace style | 1TBS |
| Keyword spacing | No space after `if`, `for`, `while`, etc. |
| Object spacing | No internal spaces: `{a: 1}` |
| Blank lines | Required after control statements |
| Max line length | 80 characters |
| Trailing commas | None |
| Console | Warn |

## Default file patterns

```
["src/**/*.{js,mjs,cjs}"]
```

## Options

```js
uglify({
  with: ["lints-js"],
  options: {
    "lints-js": {
      files: ["src/**/*.js", "lib/**/*.js"],
      ignores: ["src/generated/**"],
      indent: 4,
      maxLen: 120,
      overrides: {
        "no-console": "off",
      },
    },
  },
})
```

### `files`

Array of glob patterns for files this config applies to.

### `ignores`

Array of glob patterns for files to exclude.

### `indent`

Number of spaces for indentation. Default: `2`.

### `maxLen`

Maximum line length. Default: `80`.

### `overrides`

An object of ESLint rule overrides. These are merged on top of the default rules, so you can tweak individual rules without losing the rest.
