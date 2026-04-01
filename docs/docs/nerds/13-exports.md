---
sidebar_label: "exports"
---

# exports

The main export function and `availableConfigs`, extracted from `src/uglier.js`.

```js
export default function(options = {}) {
  const {
    with: includeConfigs = ["lints-js", "lints-jsdoc"],
    without: excludeConfigs = [],
    options: perConfigOptions = {},
  } = options

  const configs = []

  for(const configName of includeConfigs) {
    if(excludeConfigs.includes(configName)) {
      continue
    }

    if(!CONFIGS[configName]) {
      throw new Error(
        `Unknown config: "${configName}". Available: ${Object.keys(CONFIGS).join(", ")}`
      )
    }

    const configOptions = perConfigOptions[configName] || {}
    const config = CONFIGS[configName](configOptions)

    if(Array.isArray(config))
      configs.push(...config)
    else
      configs.push(config)
  }

  return configs
}

/**
 * All available config block names
 *
 * @type {Array<ConfigName>}
 */
export const availableConfigs =
  /** @type {Array<ConfigName>} */ (Object.keys(CONFIGS))
```
