---
sidebar_label: Managing Configs
---

# Managing configs

The CLI makes it easy to add or remove config blocks from an existing `eslint.config.js`.

## Add configs

```bash
npx @gesslar/uglier add cjs-override mjs-override
```

This parses your existing config file and adds the new blocks to the `with` array.

## Remove configs

```bash
npx @gesslar/uglier remove lints-jsdoc
```

This removes the specified block from your config.

## See available configs

```bash
npx @gesslar/uglier --help
```

This displays all available config blocks with descriptions:

| Config | Description |
|--------|-------------|
| `lints-js` | Core JavaScript style rules |
| `lints-jsdoc` | JSDoc documentation enforcement |
| `languageOptions` | ECMAScript version and source type |
| `node` | Node.js globals |
| `web` | Browser globals |
| `react` | React environment |
| `tauri` | Tauri app environment |
| `vscode-extension` | VS Code extension API |
| `cjs-override` | CommonJS file handling (*.cjs) |
| `mjs-override` | ES Module file handling (*.mjs) |
