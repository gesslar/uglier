---
sidebar_label: Types
---

# Type Definitions

uglier ships with TypeScript definitions generated from JSDoc. These provide full autocomplete and type checking in your editor.

## Core types

### `UglierOptions`

```ts
type UglierOptions = {
  with?: Array<ConfigName>
  without?: Array<ConfigName>
  options?: {
    "lints-js"?: LintsJsOptions
    "lints-jsdoc"?: LintsJsdocOptions
    languageOptions?: LanguageOptionsOptions
    node?: EnvironmentOptions
    web?: EnvironmentOptions
    react?: EnvironmentOptions
    tauri?: EnvironmentOptions
    "vscode-extension"?: EnvironmentOptions
    "cjs-override"?: ModuleOverrideOptions
    "mjs-override"?: ModuleOverrideOptions
  }
}
```

### `ConfigName`

```ts
type ConfigName =
  | "lints-js"
  | "lints-jsdoc"
  | "languageOptions"
  | "node"
  | "web"
  | "react"
  | "tauri"
  | "vscode-extension"
  | "cjs-override"
  | "mjs-override"
```

### `LintsJsOptions`

```ts
type LintsJsOptions = {
  files?: Array<string>
  ignores?: Array<string>
  indent?: number
  maxLen?: number
  overrides?: Record<string, any>
}
```

### `LintsJsdocOptions`

```ts
type LintsJsdocOptions = {
  files?: Array<string>
  ignores?: Array<string>
  overrides?: Record<string, any>
}
```

### `EnvironmentOptions`

```ts
type EnvironmentOptions = {
  files?: Array<string>
  ignores?: Array<string>
  additionalGlobals?: Record<string, "readonly" | "writable">
}
```

### `LanguageOptionsOptions`

```ts
type LanguageOptionsOptions = {
  ecmaVersion?: number | string
  sourceType?: "module" | "commonjs"
  additionalGlobals?: Record<string, "readonly" | "writable">
}
```

### `ModuleOverrideOptions`

```ts
type ModuleOverrideOptions = {
  files?: Array<string>
  ignores?: Array<string>
}
```

## Using types in your config

The TypeScript definitions are automatically resolved when you import from `@gesslar/uglier`:

```js
/** @type {import("@gesslar/uglier").UglierOptions} */
const options = {
  with: ["lints-js", "node"],
}
```
