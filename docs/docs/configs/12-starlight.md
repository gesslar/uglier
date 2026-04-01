---
sidebar_label: starlight
---

# starlight

> [See the source](/docs/nerds/starlight)

Sets up the environment for Starlight documentation sites. Includes browser globals and the full `eslint-plugin-astro` recommended configuration for `.astro` file linting.

## What's included

- Browser globals
- `eslint-plugin-astro` flat/recommended configs (parser, processor, and rules for `.astro` files)
- `Astro` and `Fragment` globals (provided by the astro plugin)

## Default file patterns

```
["src/**/*.{js,mjs,cjs}", "docs/**/*.{js,mjs,cjs}"]
```

The astro plugin configs additionally target `*.astro`, `**/*.astro/*.js`, and `**/*.astro/*.ts` files.

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
