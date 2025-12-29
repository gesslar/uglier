#!/usr/bin/env node

/**
 * @file install.js - Auto-installer and config generator for @gesslar/uglier
 *
 * @description
 * This script can be run via `npx @gesslar/uglier` to automatically install
 * the package and its peer dependencies to the current project.
 *
 * Commands:
 * - npx @gesslar/uglier           - Install package and dependencies
 * - npx @gesslar/uglier init      - Generate eslint.config.js with prompts
 * - npx @gesslar/uglier init node - Generate eslint.config.js for Node.js
 * - npx @gesslar/uglier --help    - Show help
 *
 * Installation does:
 * 1. Install @gesslar/uglier as a dev dependency
 * 2. Install eslint as a peer dependency (if not present)
 *
 * Note: All other dependencies (@stylistic/eslint-plugin, eslint-plugin-jsdoc, globals)
 * are bundled with the package and don't need to be installed separately.
 */

import {execSync} from "child_process"
import {dirname} from "path"
import {fileURLToPath} from "url"
import {FileObject, DirectoryObject} from "@gesslar/toolkit"
import c from "@gesslar/colours"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PACKAGE_NAME = "@gesslar/uglier"

// Only peer dependencies need to be installed separately
// (all other dependencies come bundled with the package)
const PEER_DEPS = [
  "eslint"
]

/**
 * Execute a command and return output
 *
 * @param {string} cmd - Command to execute
 * @returns {string} Command output
 */
function exec(cmd) {
  try {
    return execSync(cmd, {encoding: "utf8", stdio: "pipe"})
  } catch(error) {
    console.error(`Error executing: ${cmd}`)
    console.error(error.message)
    process.exit(1)
  }
}

/**
 * Get available configs from the source file
 *
 * @returns {Promise<Array<{name: string, description: string, files: string}>|null>} Available configs
 */
async function getAvailableConfigs() {
  try {
    // Try to read from installed package or local source
    const localDir = new DirectoryObject(`${__dirname}/../src`)
    const installedDir = new DirectoryObject(`${process.cwd()}/node_modules/${PACKAGE_NAME}/src`)

    const localSource = new FileObject("uglier.js", localDir)
    const installedSource = new FileObject("uglier.js", installedDir)

    let uglierFile = null

    if(await localSource.exists) {
      uglierFile = localSource
    } else if(await installedSource.exists) {
      uglierFile = installedSource
    }

    if(!uglierFile) {
      return null
    }

    const source = await uglierFile.read()

    // Extract config names, descriptions, and default files
    const configs = []
    // Match individual config blocks within CONFIGS object
    const configBlockRegex = /\/\*\*\s*\n\s*\*\s*([^\n@*]+?)\s*\n(?:\s*\*[^\n]*\n)*?\s*\*\/\s*\n\s*["']([^"']+)["']:\s*\([^)]*\)\s*=>\s*\{[^}]*?files\s*=\s*(\[[^\]]+\])/g
    let match

    while((match = configBlockRegex.exec(source)) !== null) {
      configs.push({
        name: match[2],
        description: match[1].trim(),
        files: match[3]
      })
    }

    return configs
  } catch {
    return null
  }
}

/**
 * Show help information
 */
async function showHelp() {
  console.log(c`{F027}@gesslar/uglier{/} - Composable ESLint flat config`)

  console.log()
  console.log("Usage:")
  console.log()
  console.log(c`  {<B}npx @gesslar/uglier{B>}                Install package and dependencies`)
  console.log(c`  {<B}npx @gesslar/uglier init{B>}           Generate eslint.config.js interactively`)
  console.log(c`  {<B}npx @gesslar/uglier init <targets>{B>} Generate eslint.config.js with targets`)
  console.log(c`  {<B}npx @gesslar/uglier --help{B>}         Show this help`)
  console.log()

  const configs = await getAvailableConfigs()

  if(configs && configs.length > 0) {
    console.log(c`Available config blocks:`)
    console.log()

    for(const {name, description} of configs) {
      console.log(c`  {<B}${name.padEnd(20)}{B>} ${description}`)
    }
  } else {
    console.log("Install the package to see available config blocks.\n")
  }

  console.log()
  console.log(`Documentation at https://github.com/gesslar/uglier.`)
}

/**
 * Check if a package is already installed
 *
 * @param {string} packageName - Name of package to check
 * @returns {Promise<boolean>} True if installed
 */
async function isInstalled(packageName) {
  try {
    const packageJsonFile = new FileObject("package.json", process.cwd())

    if(!(await packageJsonFile.exists)) {
      console.warn(c`No {<B}package.json{B>} found. Please run {<B}'npm init'{B>} first.`)
      process.exit(1)
    }

    const packageJson = await packageJsonFile.loadData("json")
    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
      ...packageJson.peerDependencies
    }

    return packageName in allDeps
  } catch {
    return false
  }
}

/**
 * Main installation routine
 */
async function install() {
  console.log(c`Installing {<B}${PACKAGE_NAME}{B>}...`)
  console.log()

  const toInstall = []

  // Check if main package is already installed
  if(!(await isInstalled(PACKAGE_NAME))) {
    toInstall.push(PACKAGE_NAME)
  } else {
    console.log(c`{F070}✓{/} {<B}${PACKAGE_NAME}{B>} already installed`)
  }

  // Check peer dependencies
  for(const dep of PEER_DEPS) {
    if(!(await isInstalled(dep))) {
      toInstall.push(dep)
    } else {
      console.log(c`{F070}✓{/} {<B}${dep}{B>} already installed`)
    }
  }

  // Install missing packages
  if(toInstall.length > 0) {
    console.log(c`\n{F027} Installing:{/} ${toInstall.map(p => c`{F172}${p}{/}`).join(", ")}`)

    const installCmd = `npm install -D ${toInstall.join(" ")}`

    console.log(c`{F244}Running: ${installCmd}{/}`)
    exec(installCmd)

    console.log()
    console.log(c`{F070}✓{/} Installation successful.`)
  }

  console.log()
  console.log(c`{F039}For detailed setup and configuration options, visit:{/}`)
  console.log(c`https://github.com/gesslar/uglier#readme`)
}

/**
 * Generate eslint.config.js file
 *
 * @param {string[]} targets - Target environments (node, web, react, etc.)
 */
async function generateConfig(targets = []) {
  const configFile = new FileObject("eslint.config.js", process.cwd())

  if(await configFile.exists) {
    console.log(c`{F214}Warning:{/} {<B}eslint.config.js{B>} already exists`)
    console.log(c`Delete it first or edit it manually`)

    return
  }

  // Get available configs dynamically
  const configs = await getAvailableConfigs()
  const environmentTargets = configs
    ? configs.filter(c => !c.name.startsWith("lints-") && c.name !== "languageOptions" && !c.name.endsWith("-override"))
      .map(c => c.name)
    : ["node", "web", "react", "tauri", "vscode-extension"]

  // If no targets specified, make it interactive
  if(targets.length === 0) {
    console.log(c`{F027}Choose your target environments:{/}`)
    console.log()
    console.log(c`Available targets: ${environmentTargets.map(t => c`{F172}${t}{/}`).join(", ")}`)
    console.log()
    console.log(c`{F244}Example: npx @gesslar/uglier init ${environmentTargets[0] || "node"}{/}`)

    return
  }

  // Validate targets
  const validTargets = environmentTargets
  const invalidTargets = targets.filter(t => !validTargets.includes(t))

  if(invalidTargets.length > 0) {
    console.log(c`{F214}Error:{/} Invalid targets: {F172}${invalidTargets.join(", ")}{/}`)
    console.log(c`Valid targets: {F070}${validTargets.join(", ")}{/}`)

    return
  }

  // Build the config with comments
  const withArray = ["lints-js", "lints-jsdoc", ...targets]

  // Get file patterns dynamically from source
  const allConfigs = await getAvailableConfigs()
  const filePatterns = {}

  if(allConfigs) {
    for(const config of allConfigs) {
      filePatterns[config.name] = config.files
    }
  }

  // Build the with array with comments
  const withLines = withArray.map(target => {
    const pattern = filePatterns[target] || "[]"

    return `      "${target}", // default files: ${pattern}`
  }).join("\n")

  const configContent = `import uglify from "@gesslar/uglier"

export default [
  ...uglify({
    with: [
${withLines}
    ]
  })
]
`

  await configFile.write(configContent)

  console.log(c`{F070}✓{/} Created {<B}eslint.config.js{B>}`)
  console.log()
  console.log(c`{F039}Configuration includes:{/}`)

  for(const target of withArray) {
    console.log(c`  {F070}•{/} ${target}`)
  }

  console.log()
  console.log(c`{F244}Run {<B}npx eslint .{B>} to lint your project{/}`)
}

// Parse command line arguments and run
const args = process.argv.slice(2)

if(args.includes("--help") || args.includes("-h")) {
  await showHelp()
} else if(args[0] === "init") {
  const targets = args.slice(1)

  await install()
  await generateConfig(targets)
} else {
  await install()
}
