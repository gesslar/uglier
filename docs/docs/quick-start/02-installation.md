---
sidebar_label: Installation
---

# Installation

The fastest way to get started is with the uglier CLI. It installs the package and all required peer dependencies automatically.

## Using the CLI

```bash
npx @gesslar/uglier install
```

This will:

1. Detect your package manager (npm, pnpm, yarn, or bun)
2. Install `@gesslar/uglier` and its peer dependencies (`eslint`, `@stylistic/eslint-plugin`, `eslint-plugin-jsdoc`, `globals`)
3. Leave you ready to generate a config

## Manual installation

If you prefer to install manually:

```bash
npm install -D @gesslar/uglier eslint @stylistic/eslint-plugin eslint-plugin-jsdoc globals
```

Replace `npm` with your package manager of choice.
