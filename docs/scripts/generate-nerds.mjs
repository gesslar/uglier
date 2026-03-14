#!/usr/bin/env node

/**
 * Extracts each config factory from uglier.js and generates
 * markdown pages for the "Nerds" documentation section.
 */

import {readFileSync, writeFileSync, mkdirSync} from "node:fs"
import {dirname, resolve} from "node:path"
import {fileURLToPath} from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const srcPath = resolve(__dirname, "../../src/uglier.js")
const outDir = resolve(__dirname, "../docs/nerds")

const source = readFileSync(srcPath, "utf-8")

// Extract the CONFIGS block
const configsStart = source.indexOf("const CONFIGS = {")
const exportStart = source.indexOf("\nexport default function")
const configsBlock = source.slice(configsStart, exportStart)

// Also grab the export function and availableConfigs
const exportsBlock = source.slice(exportStart).trim()

// Parse individual config factories from the CONFIGS block
const configs = []
const configRegex = /(?<jsdoc>\/\*\*[\s\S]*?\*\/)\s*"(?<name>[^"]+)":\s*\((?<params>[^)]*)\)\s*=>\s*\{/g

let match
while((match = configRegex.exec(configsBlock)) !== null) {
  const name = match.groups.name
  const startIdx = match.index

  // Find the end of this factory - look for the next config or end of CONFIGS
  // Each factory ends with `  },` (2-space indent, closing brace, comma) or `  }` at end
  let depth = 0
  let factoryBodyStart = configsBlock.indexOf("{", match.index + match[0].length - 1)
  let i = factoryBodyStart

  for(; i < configsBlock.length; i++) {
    if(configsBlock[i] === "{") depth++
    if(configsBlock[i] === "}") {
      depth--
      if(depth === 0) break
    }
  }

  const fullBlock = configsBlock.slice(startIdx, i + 1).trim()
  configs.push({name, code: fullBlock})
}

// Map config names to their configs doc slugs
const configSlugMap = {
  "languageOptions": "language-options",
}

// Generate markdown files
mkdirSync(outDir, {recursive: true})

let order = 1
for(const {name, code} of configs) {
  const padded = String(order).padStart(2, "0")
  const filename = `${padded}-${name}.md`
  const configSlug = configSlugMap[name] || name

  const md = `---
sidebar_label: "${name}"
---

# ${name}

> [Back to config docs](/docs/configs/${configSlug})

Source extracted from \`src/uglier.js\`.

\`\`\`js
${code}
\`\`\`
`

  writeFileSync(resolve(outDir, filename), md)
  console.log(`  wrote ${filename}`)
  order++
}

// Write the exports page
const exportsMd = `---
sidebar_label: "exports"
---

# exports

The main export function and \`availableConfigs\`, extracted from \`src/uglier.js\`.

\`\`\`js
${exportsBlock}
\`\`\`
`

writeFileSync(resolve(outDir, `${String(order).padStart(2, "0")}-exports.md`), exportsMd)
console.log(`  wrote ${String(order).padStart(2, "0")}-exports.md`)

console.log(`\nGenerated ${configs.length + 1} nerd pages in docs/nerds/`)
