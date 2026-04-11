# @gesslar/uglier

**Opinionated, composable ESLint flat config for people who like their code readable.**

A flexible ESLint configuration system built on
[flat config](https://eslint.org/docs/latest/use/configure/configuration-files)
that lets you mix and match stylistic rules, JSDoc enforcement, and environment
presets.

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
# Install dependencies and generate config in one command
npx @gesslar/uglier install
npx @gesslar/uglier init node

# Or for React projects
npx @gesslar/uglier install
npx @gesslar/uglier init react

# Forgot to add React later? No problem!
npx @gesslar/uglier add react
```

This automatically installs `@gesslar/uglier`, `eslint`, and all dependencies.

**Package Manager Support:** Automatically detects and uses your preferred
package manager (npm, pnpm, yarn, or Bun). Use `pnpx`, `yarn dlx`, or `bunx`
instead of `npx` - the installer will detect your choice and install packages
accordingly.

## Usage

### Generated Config

Running `init` creates an `eslint.config.js` with helpful comments:

```js
import uglify from "@gesslar/uglier"

export default [
  ...uglify({
    with: [
      "lints-js",      // default files: ["src/**/*.{js,mjs,cjs}"]
      "lints-jsdoc",   // default files: ["src/**/*.{js,mjs,cjs}"]
      "node",          // default files: ["src/**/*.{js,mjs,cjs}"]
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
    options: {
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
    options: {
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

Run `npx @gesslar/uglier --help` to see all available configs with
descriptions.

## Commands

```bash
# Install dependencies
npx @gesslar/uglier install

# Generate config for specific targets
npx @gesslar/uglier init node
npx @gesslar/uglier init web
npx @gesslar/uglier init react
npx @gesslar/uglier init node web  # Multiple targets

# Add config blocks to existing eslint.config.js
npx @gesslar/uglier add react
npx @gesslar/uglier add tauri vscode-extension  # Multiple targets

# Remove config blocks from existing eslint.config.js
npx @gesslar/uglier remove react
npx @gesslar/uglier remove web tauri  # Multiple targets
# Note: Also removes any options for removed targets

# Show available configs
npx @gesslar/uglier --help

# Works with any package manager
pnpx @gesslar/uglier install  # pnpm
yarn dlx @gesslar/uglier install  # yarn
bunx @gesslar/uglier install  # bun
```

## Manual Installation

If you prefer manual control:

```bash
# npm
npm i -D @gesslar/uglier eslint

# pnpm
pnpm i -D @gesslar/uglier eslint

# yarn
yarn add -D @gesslar/uglier eslint

# bun
bun add -d @gesslar/uglier eslint
```

Note: `@stylistic/eslint-plugin`, `eslint-plugin-jsdoc`, and `globals` are
bundled as dependencies.

## Development

```bash
# Run tests
npm test

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix
```

## Philosophy

This config enforces:

- **Readable spacing** - Blank lines between control structures
- **Consistent style** - Double quotes, no semicolons, 2-space indent
- **Flexible customization** - Override anything via the `options` key
- **Composability** - Mix configs for different file patterns in the same
  project

It's opinionated, but you can override any rule. The defaults just happen to be
correct. 😉

## Post Chips Ahoy

If you love code and want to support it, you should write code or hug a coder,
but maybe not physically, just emotionally, because they're busy, or instead of
telling the coder to go out and touch grass, maybe go out and touch the grass
for them and then come back and not tell them about it because first, charity
for charity's sake is its own reward and how dare you to try to cash in on your
good deeds when the entire point of doing the good deed is ... ok so, if you're
_not_ a coder, this is called recursion; but the better reason is, as stated,
they're busy. So, thanks. At the very least you can put it in Workday and claim
it, you good-deed profiteer.

## License

`@gesslar/uglier` is released under the [0BSD](LICENSE.txt).

This package includes or depends on third-party components under their own
licenses:

| Dependency | License |
| --- | --- |
| [@gesslar/colours](https://github.com/gesslar/colours) | 0BSD |
| [@gesslar/toolkit](https://github.com/gesslar/toolkit) | 0BSD |
| [@skarab/detect-package-manager](https://github.com/skarab42/detect-package-manager) | MIT |
| [@stylistic/eslint-plugin](https://github.com/eslint-stylistic/eslint-stylistic) | MIT |
| [eslint-plugin-astro](https://github.com/ota-meshi/eslint-plugin-astro) | MIT |
| [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc) | BSD-3-Clause |
| [globals](https://github.com/sindresorhus/globals) | MIT |
