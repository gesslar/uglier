# @gesslar/uglier

**Opinionated, composable ESLint flat config for people who like their code readable.**

A flexible ESLint configuration system built on [flat config](https://eslint.org/docs/latest/use/configure/configuration-files) that lets you mix and match stylistic rules, JSDoc enforcement, and environment presets.

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

## Quick Start

```bash
# Install and set up in one command
npx @gesslar/uglier init node

# Or for React projects
npx @gesslar/uglier init react

# Or just install without config generation
npx @gesslar/uglier
```

This automatically installs `@gesslar/uglier`, `eslint`, and all dependencies.

## Usage

### Generated Config

Running `init` creates an `eslint.config.js` with helpful comments:

```js
import uglify from "@gesslar/uglier"

export default [
  ...uglify({
    with: [
      "lints-js",      // default files: ["**/*.{js,mjs,cjs}"]
      "lints-jsdoc",   // default files: ["**/*.{js,mjs,cjs}"]
      "node",          // default files: ["**/*.{js,mjs,cjs}"]
    ]
  })
]
```

### Common Scenarios

#### Node.js Project

```js
export default [
  ...uglify({
    with: ["lints-js", "node"]
  })
]
```

#### React Project

```js
export default [
  ...uglify({
    with: ["lints-js", "react"]
  })
]
```

#### Monorepo (Node + Web)

```js
export default [
  ...uglify({
    with: ["lints-js", "node", "web"],
    overrides: {
      "node": { files: ["server/**/*.js"] },
      "web": { files: ["client/**/*.js"] }
    }
  })
]
```

#### Custom Style Preferences

```js
export default [
  ...uglify({
    with: ["lints-js"],
    overrides: {
      "lints-js": {
        indent: 4,           // default: 2
        maxLen: 120,         // default: 80
        overrides: {
          "@stylistic/semi": ["error", "always"]
        }
      }
    }
  })
]
```

#### Exclude JSDoc Requirements

```js
export default [
  ...uglify({
    with: ["lints-js", "lints-jsdoc", "node"],
    without: ["lints-jsdoc"]
  })
]
```

## Available Configs

### Linting Rules

- **`lints-js`** - Stylistic rules (indent, spacing, quotes, braces, etc.)
- **`lints-jsdoc`** - JSDoc documentation requirements

### Environment Targets

- **`node`** - Node.js globals (process, Buffer, etc.)
- **`web`** - Browser globals (window, document, etc.)
- **`react`** - React environment (browser + React/ReactDOM)
- **`tauri`** - Tauri apps (browser + `__TAURI__` APIs)
- **`vscode-extension`** - VSCode extension API

### Utilities

- **`languageOptions`** - ECMAScript language settings
- **`cjs-override`** - CommonJS file handling (`.cjs`)
- **`mjs-override`** - ES Module file handling (`.mjs`)

Run `npx @gesslar/uglier --help` to see all available configs with descriptions.

## Commands

```bash
# Install dependencies only
npx @gesslar/uglier

# Generate config for specific targets
npx @gesslar/uglier init node
npx @gesslar/uglier init web
npx @gesslar/uglier init react
npx @gesslar/uglier init node web  # Multiple targets

# Show available configs
npx @gesslar/uglier --help
```

## Manual Installation

If you prefer manual control:

```bash
npm install -D @gesslar/uglier eslint
```

Note: `@stylistic/eslint-plugin`, `eslint-plugin-jsdoc`, and `globals` are bundled as dependencies.

## Philosophy

This config enforces:

- **Readable spacing** - Blank lines between control structures
- **Consistent style** - Double quotes, no semicolons, 2-space indent
- **Flexible customization** - Override anything via the `overrides` option
- **Composability** - Mix configs for different file patterns in the same project

It's opinionated, but you can override any rule. The defaults just happen to be correct. 😉

## License

[Unlicense](https://unlicense.org/) - Public domain. Do whatever you want.
