---
sidebar_label: Options
---

# Options

Every config block in uglier can be customized through the `options` object. This lets you keep the opinionated defaults where they make sense and override where they don't.

## Structure

```js
import uglify from "@gesslar/uglier"

export default [
  ...uglify({
    with: ["lints-js", "lints-jsdoc", "node"],
    options: {
      "lints-js": {
        indent: 4,
        maxLen: 120,
      },
      "lints-jsdoc": {
        ignores: ["tests/**"],
      },
      node: {
        files: ["src/**/*.js", "scripts/**/*.js"],
      },
    },
  })
]
```

The `options` object is keyed by config name. Each key accepts the options specific to that config block.

## Common options

Most config blocks accept these shared options:

### `files`

An array of glob patterns specifying which files the config applies to.

```js
files: ["src/**/*.js", "lib/**/*.js"]
```

### `ignores`

An array of glob patterns specifying which files to exclude.

```js
ignores: ["src/generated/**", "dist/**"]
```

## Config-specific options

### lints-js

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `indent` | `number` | `2` | Spaces per indent level |
| `maxLen` | `number` | `80` | Max line length |
| `overrides` | `object` | `{}` | ESLint rule overrides |

### lints-jsdoc

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `overrides` | `object` | `{}` | JSDoc rule overrides |

### languageOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `ecmaVersion` | `number \| string` | `"latest"` | ECMAScript version |
| `sourceType` | `string` | `"module"` | Module type |
| `additionalGlobals` | `object` | `{}` | Extra globals |

### Environment configs (node, web, react, tauri, vscode-extension)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `additionalGlobals` | `object` | `{}` | Extra globals |
