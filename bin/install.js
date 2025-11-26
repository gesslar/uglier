#!/usr/bin/env node

/**
 * @file install.js - Auto-installer for @gesslar/uglier
 *
 * @description
 * This script can be run via `npx @gesslar/uglier` to automatically install
 * the package and all its dependencies to the current project.
 *
 * It will:
 * 1. Install @gesslar/uglier as a dev dependency
 * 2. Install eslint as a peer dependency (if not present)
 * 3. Install all required plugins as dev dependencies
 */

import {execSync} from "child_process"
import {dirname} from "path"
import {fileURLToPath} from "url"
import {FileObject, DirectoryObject} from "@gesslar/toolkit"
import c from "@gesslar/colours"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PACKAGE_NAME = "@gesslar/uglier"

// Dependencies that need to be installed
const REQUIRED_DEPS = [
  "@stylistic/eslint-plugin",
  "eslint-plugin-jsdoc",
  "globals"
]

const PEER_DEPS = [
  "eslint"
]

/**
 * Execute a command and return output
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
 * @returns {Promise<Array<{name: string, description: string}>|null>} Available configs
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

    // Extract config names and their JSDoc descriptions
    const configs = []
    // Match individual config blocks within CONFIGS object
    const configBlockRegex = /\/\*\*\s*\n\s*\*\s*([^\n@*]+?)\s*\n(?:\s*\*[^\n]*\n)*?\s*\*\/\s*\n\s*["']([^"']+)["']:\s*\([^)]*\)\s*=>/g
    let match

    while((match = configBlockRegex.exec(source)) !== null) {
      configs.push({
        name: match[2],
        description: match[1].trim()
      })
    }

    return configs
  } catch(error) {
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
  console.log(c`  {<B}npx @gesslar/uglier{B>}          Install package and dependencies`)
  console.log(c`  {<B}npx @gesslar/uglier --help{B>}   Show this help`)
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
  } catch(error) {
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

  // Check required dependencies
  for(const dep of REQUIRED_DEPS) {
    if(!(await isInstalled(dep))) {
      toInstall.push(dep)
    } else {
      console.log(c`{F070}✓{/} {<B}${dep}{B>} already installed`)
    }
  }

  // Install missing packages
  if(toInstall.length > 0) {
    console.log(c`\n{F027} Installing:{/} ${toInstall.map(p => c`{F172}${p}{/}`).join(", ")}\n`)

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

// Parse command line arguments and run
const args = process.argv.slice(2)

if(args.includes("--help") || args.includes("-h")) {
  await showHelp()
} else {
  await install()
}
