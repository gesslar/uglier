---
title: tauri
slug: configs/tauri
sidebar:
  order: 7
---

> [See the source](/nerds/tauri/)

Sets up the environment for Tauri desktop applications. Includes browser globals plus Tauri-specific APIs.

## Globals included

Everything from the [web](/configs/web/) config, plus:

- `__TAURI__`
- `__TAURI_INTERNALS__`

## Default file patterns

```
["src/**/*.{js,mjs,cjs}"]
```

## Options

```js
uglify({
  with: ["tauri"],
  options: {
    tauri: {
      files: ["src/**/*.{js,jsx,ts,tsx}"],
    },
  },
})
```
