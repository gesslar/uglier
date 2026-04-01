---
sidebar_label: starlight
---

# starlight

> [See the source](/docs/nerds/starlight)

Sets up the environment for Starlight documentation sites. Includes browser globals plus the Astro global.

## Globals included

Everything from the [web](/docs/configs/web) config, plus:

- `Astro`

## Default file patterns

```
["src/**/*.{js,mjs,cjs}", "docs/**/*.{js,mjs,cjs}"]
```

## Options

```js
uglify({
  with: ["starlight"],
  options: {
    starlight: {
      files: ["src/**/*.{js,mjs}"],
      additionalGlobals: {
        myGlobal: "readonly",
      },
    },
  },
})
```
