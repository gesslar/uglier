---
sidebar_label: API
---

# API Reference

## `uglify(options?)`

The default export. Takes an options object and returns an array of ESLint flat config objects.

### Signature

```ts
export default function uglify(options?: UglierOptions): Array<FlatConfig>
```

### Parameters

#### `options.with`

- **Type:** `Array<ConfigName>`
- **Optional**

An array of config block names to include. If provided, only these blocks are used.

#### `options.without`

- **Type:** `Array<ConfigName>`
- **Optional**

An array of config block names to exclude. All other available configs are included.

#### `options.options`

- **Type:** `Record<ConfigName, ConfigOptions>`
- **Optional**

Per-config customization. Each key is a config name and the value is the options object for that config.

### Return value

An array of ESLint flat config objects that can be spread into your `eslint.config.js` export.

### Example

```js
import uglify from "@gesslar/uglier"

export default [
  ...uglify({
    with: ["lints-js", "node"],
    options: {
      "lints-js": {indent: 4},
    },
  })
]
```

---

## `availableConfigs`

A named export containing the list of all available config block names.

### Signature

```ts
export const availableConfigs: Array<ConfigName>
```

### Value

```js
[
  "lints-js",
  "lints-jsdoc",
  "languageOptions",
  "node",
  "web",
  "react",
  "tauri",
  "vscode-extension",
  "cjs-override",
  "mjs-override",
]
```
