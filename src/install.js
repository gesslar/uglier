#!/usr/bin/env node

/**
 * @file install.js - Auto-installer and config generator for @gesslar/uglier
 *
 * @description
 * This script can be run via `npx @gesslar/uglier` to automatically install
 * the package and its peer dependencies to the current project.
 *
 * Commands:
 * - npx @gesslar/uglier install           - Install package and dependencies
 * - npx @gesslar/uglier init <targets>    - Generate eslint.config.js with targets
 * - npx @gesslar/uglier add <targets>     - Add config blocks to existing eslint.config.js
 * - npx @gesslar/uglier remove <targets>  - Remove config blocks from existing eslint.config.js
 * - npx @gesslar/uglier --help            - Show help
 *
 * Installation does:
 * 1. Install @gesslar/uglier as a dev dependency
 * 2. Install eslint as a peer dependency (if not present)
 *
 * Note: All other dependencies (@stylistic/eslint-plugin, eslint-plugin-jsdoc, globals)
 * are bundled with the package and don't need to be installed separately.
 */

import c from "@gesslar/colours"
import {
  install,
  generateConfig,
  addToConfig,
  removeFromConfig,
  showHelp
} from "../bin/cli.js"

// Parse command line arguments and run
const args = process.argv.slice(2)

if(args.includes("--help") || args.includes("-h")) {
  await showHelp()
} else if(args[0] === "install") {
  await install()
} else if(args[0] === "init") {
  const targets = args.slice(1)

  await generateConfig(targets)
} else if(args[0] === "add") {
  const targets = args.slice(1)

  await addToConfig(targets)
} else if(args[0] === "remove") {
  const targets = args.slice(1)

  await removeFromConfig(targets)
} else {
  // No command or unknown command - show help
  console.log(c`{F214}Error:{/} Unknown command or no command specified`)
  console.log()
  await showHelp()
}
