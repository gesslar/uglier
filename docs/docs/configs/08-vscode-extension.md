---
sidebar_label: vscode-extension
---

# vscode-extension

> [See the source](/docs/nerds/vscode-extension)

Sets up the environment for VS Code extension development.

## Globals included

- `acquireVsCodeApi`

## Default file patterns

```
["src/**/*.{js,mjs,cjs}"]
```

## Options

```js
uglify({
  with: ["vscode-extension"],
  options: {
    "vscode-extension": {
      files: ["src/**/*.js"],
    },
  },
})
```
