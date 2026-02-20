/**
 * @file cli.js - Core CLI functions for @gesslar/uglier
 */

import {execSync} from "child_process"
import {
  DirectoryObject,
  Sass
} from "@gesslar/toolkit"
import c from "@gesslar/colours"
import {detectAgent} from "@skarab/detect-package-manager"

const PROJECT_ROOT = DirectoryObject.fromCwd()
const SRC_DIR = PROJECT_ROOT.getDirectory("src")
const PACKAGE_NAME = "@gesslar/uglier"

// Only peer dependencies need to be installed separately
// (all other dependencies come bundled with the package)
const PEER_DEPS = [
  "eslint"
]

/**
 * Parse targets from config file's with array
 *
 * @param {string} content - File content
 * @returns {string[]} Array of target names
 */
function parseTargetsFromConfig(content) {
  // Match the entire with array, being careful not to stop at nested brackets
  const withMatch = content.match(/with:\s*\[([\s\S]*?)\n\s*\]/m)

  if(!withMatch) {
    return []
  }

  // Extract all quoted strings that appear at the start of lines (config names)
  const targets = []
  const lines = withMatch[1].split("\n")

  for(const line of lines) {
    // Match either single or double quoted strings at start of line
    const match = line.match(/^\s*(['"])([^'"]+)\1/)

    if(match) {
      targets.push(match[2])
    }
  }

  return targets
}

/**
 * Get install command for detected package manager
 *
 * @returns {Promise<{manager: string, installCmd: string}>} Package manager info
 */
export async function getPackageManagerInfo() {
  const agent = await detectAgent()
  const manager = agent?.name || "npm"

  const commands = {
    npm: "npm i -D --legacy-peer-deps",
    pnpm: "pnpm add -D --no-strict-peer-dependencies",
    yarn: "yarn add -D",
    bun: "bun add -d"
  }

  return {
    manager,
    installCmd: commands[manager] || commands.npm
  }
}

/**
 * Get the appropriate eslint run command for the detected package manager
 *
 * @returns {Promise<string>} ESLint command (e.g., "pnpm eslint .")
 */
async function getEslintCommand() {
  const {manager} = await getPackageManagerInfo()

  const commands = {
    npm: "npx eslint .",
    pnpm: "pnpm eslint .",
    yarn: "yarn eslint .",
    bun: "bunx eslint ."
  }

  return commands[manager] || commands.npm
}

/**
 * Execute a command and return output
 *
 * @param {string} cmd - Command to execute
 * @returns {string} Command output
 * @throws {Sass} Enhanced error with command context
 */
export function exec(cmd) {
  try {
    return execSync(cmd, {encoding: "utf8", stdio: "pipe"})
  } catch(error) {
    const err = new Sass(`Failed to execute command: ${cmd}`, {cause: error})
    err.addTrace("Command execution failed")
    console.error(err.report())
    process.exit(1)
  }
}

/**
 * Get available configs from the source file
 *
 * @returns {Promise<Array<{name: string, description: string, files: string}>|null>} Available configs
 */
export async function getAvailableConfigs() {
  try {
    // Try to read from installed package or local source
    const cwd = DirectoryObject.fromCwd()
    const installedDir = cwd.getDirectory(`node_modules/${PACKAGE_NAME}/src`)
    const localSource = SRC_DIR.getFile("uglier.js")
    const installedSource = installedDir.getFile("uglier.js")

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
 * Check if a package is already installed
 *
 * @param {string} packageName - Name of package to check
 * @returns {Promise<boolean>} True if installed
 */
export async function isInstalled(packageName) {
  try {
    const cwd = DirectoryObject.fromCwd()
    const packageJsonFile = cwd.getFile("package.json")

    if(!(await packageJsonFile.exists)) {
      console.warn(c`No {<B}package.json{B>} found. Please initialize your project first.`)
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
export async function install() {
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

    const {manager, installCmd} = await getPackageManagerInfo()
    const fullCmd = `${installCmd} ${toInstall.join(" ")}`

    console.log(c`{F244}Using package manager: ${manager}{/}`)
    console.log(c`{F244}Running: ${fullCmd}{/}`)
    exec(fullCmd)

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
 * @returns {Promise<boolean>} True if successful
 */
export async function generateConfig(targets = []) {
  const cwd = DirectoryObject.fromCwd()
  const configFile = cwd.getFile("eslint.config.js")

  if(await configFile.exists) {
    console.log(c`{F214}Error:{/} {<B}eslint.config.js{B>} already exists`)
    console.log(c`Use {<B}npx @gesslar/uglier add <targets>{B>} to add config blocks to it`)

    return false
  }

  // Get available configs dynamically
  const configs = await getAvailableConfigs()
  const environmentTargets = configs
    ? configs.filter(c => !c.name.startsWith("lints-") && c.name !== "languageOptions" && !c.name.endsWith("-override"))
      .map(c => c.name)
    : ["node", "web", "react", "tauri", "vscode-extension"]

  // If no targets specified, show error with available options
  if(targets.length === 0) {
    console.log(c`{F214}Error:{/} No targets specified`)
    console.log()
    console.log(c`Available targets: ${environmentTargets.map(t => c`{F172}${t}{/}`).join(", ")}`)
    console.log()
    console.log(c`{F244}Example: npx @gesslar/uglier init ${environmentTargets[0] || "node"}{/}`)

    return false
  }

  // Validate targets
  const validTargets = environmentTargets
  const invalidTargets = targets.filter(t => !validTargets.includes(t))

  if(invalidTargets.length > 0) {
    console.log(c`{F214}Error:{/} Invalid targets: {F172}${invalidTargets.join(", ")}{/}`)
    console.log(c`Valid targets: {F070}${validTargets.join(", ")}{/}`)

    return false
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

  const eslintCmd = await getEslintCommand()

  console.log()
  console.log(c`{F244}Run {<B}${eslintCmd}{B>} to lint your project{/}`)

  return true
}

/**
 * Add config blocks to existing eslint.config.js
 *
 * @param {string[]} targets - Target environments to add (node, web, react, etc.)
 * @returns {Promise<boolean>} True if successful
 */
export async function addToConfig(targets = []) {
  const cwd = DirectoryObject.fromCwd()
  const configFile = cwd.getFile("eslint.config.js")

  if(!(await configFile.exists)) {
    console.log(c`{F214}Error:{/} {<B}eslint.config.js{B>} not found`)
    console.log(c`Use {<B}npx @gesslar/uglier init <targets>{B>} to create one first`)

    return false
  }

  // Get available configs dynamically
  const configs = await getAvailableConfigs()
  const environmentTargets = configs
    ? configs.filter(c => !c.name.startsWith("lints-") && c.name !== "languageOptions" && !c.name.endsWith("-override"))
      .map(c => c.name)
    : ["node", "web", "react", "tauri", "vscode-extension"]

  // If no targets specified, show error with available options
  if(targets.length === 0) {
    console.log(c`{F214}Error:{/} No targets specified`)
    console.log()
    console.log(c`Available targets: ${environmentTargets.map(t => c`{F172}${t}{/}`).join(", ")}`)
    console.log()
    console.log(c`{F244}Example: npx @gesslar/uglier add react{/}`)

    return false
  }

  // Validate targets
  const validTargets = environmentTargets
  const invalidTargets = targets.filter(t => !validTargets.includes(t))

  if(invalidTargets.length > 0) {
    console.log(c`{F214}Error:{/} Invalid targets: {F172}${invalidTargets.join(", ")}{/}`)
    console.log(c`Valid targets: {F070}${validTargets.join(", ")}{/}`)

    return false
  }

  // Read existing config
  const existingContent = await configFile.read()

  // Parse the with array from the existing config
  const withMatch = existingContent.match(/with:\s*\[([\s\S]*?)\n\s*\]/m)
  const existingTargets = parseTargetsFromConfig(existingContent)

  if(existingTargets.length === 0 || !withMatch) {
    console.log(c`{F214}Error:{/} Could not parse existing config`)
    console.log(c`The config file may have a non-standard format`)

    return false
  }

  // Find which targets are new
  const newTargets = targets.filter(t => !existingTargets.includes(t))

  if(newTargets.length === 0) {
    console.log(c`{F214}Warning:{/} All specified targets already exist in config`)
    console.log()
    console.log(c`Current targets: ${existingTargets.map(t => c`{F070}${t}{/}`).join(", ")}`)

    return false
  }

  // Get file patterns for new targets
  const allConfigs = await getAvailableConfigs()
  const filePatterns = {}

  if(allConfigs) {
    for(const config of allConfigs) {
      filePatterns[config.name] = config.files
    }
  }

  // Build new lines to add
  const newLines = newTargets.map(target => {
    const pattern = filePatterns[target] || "[]"

    return `      "${target}", // default files: ${pattern}`
  })

  // Find the position to insert (before the closing bracket)
  const withArrayContent = withMatch[1]
  const lastCommaPos = withArrayContent.lastIndexOf(",")

  // Build the replacement with new targets added
  let newWithContent

  if(lastCommaPos === -1) {
    // No existing targets or only one without trailing comma
    newWithContent = withArrayContent.trim() + ",\n" + newLines.join("\n")
  } else {
    newWithContent = withArrayContent + "\n" + newLines.join("\n")
  }

  const newContent = existingContent.replace(
    /with:\s*\[([\s\S]*?)\n\s*\]/m,
    `with: [\n${newWithContent}\n    ]`
  )

  await configFile.write(newContent)

  console.log(c`{F070}✓{/} Added config blocks to {<B}eslint.config.js{B>}`)
  console.log()
  console.log(c`{F039}Added targets:{/}`)

  for(const target of newTargets) {
    console.log(c`  {F070}•{/} ${target}`)
  }

  const eslintCmd = await getEslintCommand()

  console.log()
  console.log(c`{F244}Run {<B}${eslintCmd}{B>} to lint your project{/}`)

  return true
}

/**
 * Remove config blocks from existing eslint.config.js
 *
 * @param {string[]} targets - Target environments to remove (node, web, react, etc.)
 * @returns {Promise<{success: boolean, removedTargets: string[], removedOverrides: string[]}>} Result info
 */
export async function removeFromConfig(targets = []) {
  const cwd = DirectoryObject.fromCwd()
  const configFile = cwd.getFile("eslint.config.js")

  if(!(await configFile.exists)) {
    console.log(c`{F214}Error:{/} {<B}eslint.config.js{B>} not found`)
    console.log(c`Use {<B}npx @gesslar/uglier init <targets>{B>} to create one first`)

    return {success: false, removedTargets: [], removedOverrides: []}
  }

  // Get available configs dynamically
  const configs = await getAvailableConfigs()
  const environmentTargets = configs
    ? configs.filter(c => !c.name.startsWith("lints-") && c.name !== "languageOptions" && !c.name.endsWith("-override"))
      .map(c => c.name)
    : ["node", "web", "react", "tauri", "vscode-extension"]

  // If no targets specified, show error with available options
  if(targets.length === 0) {
    console.log(c`{F214}Error:{/} No targets specified`)
    console.log()
    console.log(c`Available targets: ${environmentTargets.map(t => c`{F172}${t}{/}`).join(", ")}`)
    console.log()
    console.log(c`{F244}Example: npx @gesslar/uglier remove react{/}`)

    return {success: false, removedTargets: [], removedOverrides: []}
  }

  // Read existing config
  const existingContent = await configFile.read()

  // Parse the with array from the existing config
  const existingTargets = parseTargetsFromConfig(existingContent)

  if(existingTargets.length === 0) {
    console.log(c`{F214}Error:{/} Could not parse existing config`)
    console.log(c`The config file may have a non-standard format`)

    return {success: false, removedTargets: [], removedOverrides: []}
  }

  // Find which targets exist and can be removed
  const targetsToRemove = targets.filter(t => existingTargets.includes(t))
  const notFoundTargets = targets.filter(t => !existingTargets.includes(t))

  if(notFoundTargets.length > 0) {
    console.log(c`{F214}Warning:{/} These targets are not in the config: {F172}${notFoundTargets.join(", ")}{/}`)
  }

  if(targetsToRemove.length === 0) {
    console.log(c`{F214}Error:{/} None of the specified targets exist in config`)
    console.log()
    console.log(c`Current targets: ${existingTargets.map(t => c`{F070}${t}{/}`).join(", ")}`)

    return {success: false, removedTargets: [], removedOverrides: []}
  }

  // Build new with array content without the removed targets
  const remainingTargets = existingTargets.filter(
    t => !targetsToRemove.includes(t)
  )

  if(remainingTargets.length === 0) {
    console.log(c`{F214}Error:{/} Cannot remove all targets from config`)
    console.log(c`At least one target must remain`)

    return {success: false, removedTargets: [], removedOverrides: []}
  }

  // Get file patterns for remaining targets
  const allConfigs = await getAvailableConfigs()
  const filePatterns = {}

  if(allConfigs) {
    for(const config of allConfigs) {
      filePatterns[config.name] = config.files
    }
  }

  // Build new lines for remaining targets
  const newLines = remainingTargets.map(target => {
    const pattern = filePatterns[target] || "[]"

    return `      "${target}", // default files: ${pattern}`
  })

  let newContent = existingContent.replace(
    /with:\s*\[([\s\S]*?)\n\s*\]/m,
    `with: [\n${newLines.join("\n")}\n    ]`
  )

  // Check for and remove overrides for removed targets
  const removedOverrides = []
  const overridesMatch = newContent.match(/overrides:\s*\{/m)

  if(overridesMatch) {
    for(const target of targetsToRemove) {
      // Find the start of this target's override entry
      const targetPattern = new RegExp(`[\\s,]*(?:\\/\\/[^\\n]*\\n\\s*)?["']${target}["']:\\s*\\{`)
      const targetMatch = targetPattern.exec(newContent)

      if(targetMatch) {
        // Count braces to find the full extent of the block
        const blockStart = targetMatch.index
        let braceDepth = 0
        let blockEnd = -1

        for(let i = blockStart; i < newContent.length; i++) {
          if(newContent[i] === "{") {
            braceDepth++
          } else if(newContent[i] === "}") {
            braceDepth--

            if(braceDepth === 0) {
              blockEnd = i + 1

              // Skip trailing comma if present
              if(newContent[blockEnd] === ",") {
                blockEnd++
              }

              break
            }
          }
        }

        if(blockEnd !== -1) {
          removedOverrides.push(target)
          newContent = newContent.slice(0, blockStart)
            + newContent.slice(blockEnd)
        }
      }
    }

    // Ensure commas between remaining override entries
    newContent = newContent.replace(
      /\}(\s*["'][\w-]+["']:\s*\{)/g, "},$1"
    )

    // Clean up empty overrides object or trailing commas
    newContent = newContent.replace(
      /overrides:\s*\{\s*,?\s*\}/m, ""
    )
    newContent = newContent.replace(/,(\s*)\}/g, "$1}")
  }

  await configFile.write(newContent)

  console.log(c`{F070}✓{/} Removed config blocks from {<B}eslint.config.js{B>}`)
  console.log()
  console.log(c`{F039}Removed targets:{/}`)

  for(const target of targetsToRemove) {
    console.log(c`  {F070}•{/} ${target}`)
  }

  if(removedOverrides.length > 0) {
    console.log()
    console.log(c`{F039}Also removed overrides for:{/}`)

    for(const target of removedOverrides) {
      console.log(c`  {F070}•{/} ${target}`)
    }
  }

  const eslintCmd = await getEslintCommand()

  console.log()
  console.log(c`{F244}Run {<B}${eslintCmd}{B>} to lint your project{/}`)

  return {success: true, removedTargets: targetsToRemove, removedOverrides}
}

/**
 * Show help information
 */
export async function showHelp() {
  console.log(c`{F027}@gesslar/uglier{/} - Composable ESLint flat config`)

  console.log()
  console.log("Usage:")
  console.log()
  console.log(c`  {<B}npx @gesslar/uglier install{B>}           Install package and dependencies`)
  console.log(c`  {<B}npx @gesslar/uglier init <targets>{B>}    Generate eslint.config.js with targets`)
  console.log(c`  {<B}npx @gesslar/uglier add <targets>{B>}     Add config blocks to existing eslint.config.js`)
  console.log(c`  {<B}npx @gesslar/uglier remove <targets>{B>}  Remove config blocks from existing eslint.config.js`)
  console.log(c`  {<B}npx @gesslar/uglier --help{B>}            Show this help`)
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
