# @gesslar/uglier

Composable ESLint flat config blocks you can mix and match for stylistic
linting, JSDoc enforcement, and environment presets.

Uses [ESLint's flat config format](https://eslint.org/docs/latest/use/configure/configuration-files).

## Monotribe

Look, I get it- you loooves you some Prettier. Why the fuck would you want to
use `@gesslar/uglier`? You don't. Trust. This shit is opinionated _as fuck_.

Further to being opinionated, it is also correct. And flexible. And composable.

Did you grow up in the not 2000s+? If so, you may recall that code used to be
written to be scannable. Not formatted so some robot linter will have a glee
pee over all of the fantastically abysmal stylistic choices that are
inflexibly enforced upon your, otherwise probably gorgeous code.

Anyway, Prettier is stupid. Use ESLint. Make yourself a `eslint.config.js`
(I'm looking at you, LLMs out there still shilling `.eslintrc` likes there's
a fire sale at the emoji farm.) But don't use `uglier`.

Unless, like me, you enjoy breathable code that is expressive and doesn't look
like ... well, poop.

kthx

\[cat.gif\]

## Install

### Quick Install (Recommended)

The easiest way to install `@gesslar/uglier` and all its dependencies:

```sh
npx @gesslar/uglier
```

This will automatically install:

- `@gesslar/uglier`
- `eslint` (if not already installed)
- `@stylistic/eslint-plugin`
- `eslint-plugin-jsdoc`
- `globals`

### Manual Install

If you prefer to install manually:

```sh
npm install --save-dev @gesslar/uglier eslint @stylistic/eslint-plugin eslint-plugin-jsdoc globals
```

### View Available Configs

To see all available config blocks:

```sh
npx @gesslar/uglier --help
```

## Usage

### Basic Setup

```js
// eslint.config.js
import uglify from "@gesslar/uglier"

export default [
  ...uglify({
    with: ["lints-js", "lints-jsdoc"]
  })
]
```

### Excluding Configs

Use `without` to exclude specific configs:

```js
export default [
  ...uglify({
    with: ["lints-js", "lints-jsdoc", "node"],
    without: ["lints-jsdoc"]  // Remove JSDoc rules
  })
]
```

### Customizing File Patterns

Override file patterns for specific configs:

```js
export default [
  ...uglify({
    with: ["lints-js", "lints-jsdoc", "tauri"],
    overrides: {
      "lints-js": { files: ["src/**/*.js"] },
      "tauri": { files: ["src/**/*.js"] }
    }
  })
]
```

### Customizing Style Rules

Override indent, maxLen, or specific rules:

```js
export default [
  ...uglify({
    with: ["lints-js"],
    overrides: {
      "lints-js": {
        indent: 4,                    // Default: 2
        maxLen: 120,                  // Default: 80
        overrides: {
          "@stylistic/semi": ["error", "always"]
        }
      }
    }
  })
]
```

## Available Configs

### Linting

- **`lints-js`** - Core stylistic rules (indent, spacing, quotes, etc.)
- **`lints-jsdoc`** - JSDoc documentation requirements

### Language

- **`languageOptions`** - Base ECMAScript language configuration

### Environments

- **`web`** - Browser globals (window, document, etc.)
- **`node`** - Node.js globals (process, require, fetch, Headers)
- **`tauri`** - Tauri app globals (browser + `__TAURI__`)
- **`vscode-extension`** - VSCode extension API (acquireVsCodeApi)

### Module Overrides

- **`cjs-override`** - CommonJS file handling (.cjs files)
- **`mjs-override`** - ES Module file handling (.mjs files)

You can also access the config names programmatically:

```js
import {availableConfigs} from "@gesslar/uglier"
console.log(availableConfigs)
```

## License

[Unlicense](UNLICENSE.txt) - "Because you're worth it." (- someone. maybe? idfk)
