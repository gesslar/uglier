---
title: Rule Overrides
slug: customization/overrides
sidebar:
  order: 3
---

The `overrides` option lets you modify individual ESLint rules within a config block without losing the rest of the defaults.

## How it works

Overrides are merged on top of uglier's default rules using a shallow merge. You can change severity, disable rules, or adjust rule options.

## Examples

### Disable a rule

```js
uglify({
  with: ["lints-js"],
  options: {
    "lints-js": {
      overrides: {
        "no-console": "off",
      },
    },
  },
})
```

### Change severity

```js
uglify({
  with: ["lints-js"],
  options: {
    "lints-js": {
      overrides: {
        "@stylistic/max-len": ["warn", {code: 120}],
      },
    },
  },
})
```

### Override JSDoc rules

```js
uglify({
  with: ["lints-jsdoc"],
  options: {
    "lints-jsdoc": {
      overrides: {
        "jsdoc/require-description": "warn",
        "jsdoc/require-param-type": "off",
      },
    },
  },
})
```

## What you can override

Any ESLint rule that the config block sets. Check the individual [config block docs](/configs/lints-js/) for the full list of default rules.
