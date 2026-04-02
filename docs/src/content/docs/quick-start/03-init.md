---
title: Initialize Config
slug: quick-start/init
sidebar:
  order: 3
---

Once installed, generate your `eslint.config.js` with the `init` command.

## For a Node.js project

```bash
npx @gesslar/uglier init node
```

This creates:

```js
import uglify from "@gesslar/uglier"

export default [
  ...uglify({
    with: [
      "lints-js",
      "lints-jsdoc",
      "node",
    ]
  })
]
```

## For a React project

```bash
npx @gesslar/uglier init react
```

## For a Tauri app

```bash
npx @gesslar/uglier init tauri
```

## Multiple targets

You can combine multiple targets:

```bash
npx @gesslar/uglier init node cjs-override mjs-override
```

The CLI maps each target to the appropriate config blocks and generates a single, clean config file.
