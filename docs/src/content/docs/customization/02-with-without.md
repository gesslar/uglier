---
title: With & Without
slug: customization/with-without
sidebar:
  order: 2
---

The `with` and `without` options control which config blocks are included.

## `with`

Explicitly list the config blocks you want:

```js
uglify({
  with: ["lints-js", "node", "cjs-override"]
})
```

Only the listed blocks will be included.

## `without`

Start with all configs and exclude specific ones:

```js
uglify({
  without: ["lints-jsdoc", "languageOptions"]
})
```

This includes every available config *except* the ones listed.

## Combining with options

```js
uglify({
  with: ["lints-js", "lints-jsdoc", "node"],
  options: {
    "lints-js": {
      indent: 4,
      overrides: {
        "no-console": "off",
      },
    },
  },
})
```

## Available configs

You can check which configs are available programmatically:

```js
import {availableConfigs} from "@gesslar/uglier"

console.log(availableConfigs)
// ["lints-js", "lints-jsdoc", "languageOptions", "node", "web", "react", "tauri", "vscode-extension", "cjs-override", "mjs-override"]
```
