---
sidebar_label: Examples
---

# Examples

Real-world configuration examples for common project setups.

## Node.js backend

```js
import uglify from "@gesslar/uglier"

export default [
  ...uglify({
    with: ["lints-js", "lints-jsdoc", "node", "cjs-override"],
  })
]
```

## React frontend

```js
import uglify from "@gesslar/uglier"

export default [
  ...uglify({
    with: ["lints-js", "react"],
    options: {
      "lints-js": {
        files: ["src/**/*.{js,jsx}"],
      },
      react: {
        files: ["src/**/*.{js,jsx}"],
      },
    },
  })
]
```

## Tauri desktop app

```js
import uglify from "@gesslar/uglier"

export default [
  ...uglify({
    with: ["lints-js", "tauri"],
    options: {
      "lints-js": {
        files: ["src/**/*.{js,jsx,ts,tsx}"],
      },
    },
  })
]
```

## VS Code extension

```js
import uglify from "@gesslar/uglier"

export default [
  ...uglify({
    with: ["lints-js", "lints-jsdoc", "node", "vscode-extension"],
  })
]
```

## Monorepo with mixed module types

```js
import uglify from "@gesslar/uglier"

export default [
  ...uglify({
    with: [
      "lints-js",
      "lints-jsdoc",
      "node",
      "cjs-override",
      "mjs-override",
    ],
    options: {
      "lints-js": {
        files: ["packages/*/src/**/*.js"],
        indent: 4,
        maxLen: 120,
      },
      node: {
        files: ["packages/*/src/**/*.js"],
      },
    },
  })
]
```

## Relaxed config for a hobby project

```js
import uglify from "@gesslar/uglier"

export default [
  ...uglify({
    with: ["lints-js", "node"],
    options: {
      "lints-js": {
        maxLen: 200,
        overrides: {
          "no-console": "off",
          "no-unused-vars": "warn",
        },
      },
    },
  })
]
```
