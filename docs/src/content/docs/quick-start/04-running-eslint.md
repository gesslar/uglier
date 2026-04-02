---
title: Running ESLint
slug: quick-start/running-eslint
sidebar:
  order: 4
---

With your config in place, run ESLint as you normally would.

## Lint your code

```bash
npx eslint src/
```

## Auto-fix

```bash
npx eslint src/ --fix
```

## Add scripts to package.json

For convenience, add these to your `package.json`:

```json
{
  "scripts": {
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix"
  }
}
```

Then run:

```bash
npm run lint
npm run lint:fix
```

## What gets enforced

Out of the box, uglier enforces:

- No semicolons (ASI)
- Double quotes
- 2-space indentation
- No spaces after control keywords (`if(x)` not `if (x)`)
- Arrow parens only when needed (`x =>` not `(x) =>`)
- 1TBS brace style
- Mandatory blank lines after control statements
- No internal object spacing (`{a: 1}` not `{ a: 1 }`)
- 80 character max line length
- JSDoc documentation requirements (when using `lints-jsdoc`)

All of these can be customized — see [Customization](/customization/options/).
