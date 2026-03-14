---
sidebar_label: CLI
---

# CLI Reference

The uglier CLI helps you install, initialize, and manage your ESLint configuration.

## Commands

### `install`

```bash
npx @gesslar/uglier install
```

Installs `@gesslar/uglier` and all required peer dependencies. Detects your package manager automatically (npm, pnpm, yarn, bun).

### `init <targets...>`

```bash
npx @gesslar/uglier init node
npx @gesslar/uglier init react cjs-override
```

Generates an `eslint.config.js` file with the specified config blocks. Each target maps to a config block name.

If `eslint.config.js` already exists, the command will warn you.

### `add <targets...>`

```bash
npx @gesslar/uglier add cjs-override mjs-override
```

Adds config blocks to an existing `eslint.config.js`. Parses the current file and appends the new blocks to the `with` array.

### `remove <targets...>`

```bash
npx @gesslar/uglier remove lints-jsdoc
```

Removes config blocks from an existing `eslint.config.js`.

### `--help`

```bash
npx @gesslar/uglier --help
```

Displays usage information and lists all available config blocks with descriptions.

## Package manager detection

The CLI automatically detects which package manager your project uses by checking for lock files:

| Lock file | Package manager |
|-----------|----------------|
| `pnpm-lock.yaml` | pnpm |
| `yarn.lock` | yarn |
| `bun.lockb` | bun |
| `package-lock.json` | npm |
