---
sidebar_label: web
---

# web

> [See the source](/docs/nerds/web)

Adds browser global variables to your ESLint environment.

## Globals included

- `window`, `document`, `navigator`
- `localStorage`, `sessionStorage`
- `fetch`, `Headers`, `Request`, `Response`
- `HTMLElement`, `Event`, `CustomEvent`
- `setTimeout`, `setInterval`
- `console`
- And more from the `globals` package

## Default file patterns

```
["src/**/*.{js,mjs,cjs}"]
```

## Options

```js
uglify({
  with: ["web"],
  options: {
    web: {
      files: ["src/client/**/*.js"],
      additionalGlobals: {
        gtag: "readonly",
      },
    },
  },
})
```
