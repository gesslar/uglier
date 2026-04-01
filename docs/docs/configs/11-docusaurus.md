---
sidebar_label: docusaurus
---

# docusaurus

> [See the source](/docs/nerds/docusaurus)

Sets up the environment for Docusaurus documentation sites. Includes browser globals plus React globals for JSX components.

## Globals included

Everything from the [web](/docs/configs/web) config, plus:

- `React`
- `ReactDOM`

## Default file patterns

```
["src/**/*.{js,jsx,mjs,cjs}", "docs/**/*.{js,jsx,mjs,cjs}"]
```

## Options

```js
uglify({
  with: ["docusaurus"],
  options: {
    docusaurus: {
      files: ["src/**/*.{js,jsx}"],
      additionalGlobals: {
        __DOCUSAURUS__: "readonly",
      },
    },
  },
})
```
