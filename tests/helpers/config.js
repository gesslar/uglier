/**
 * @file config.js - Shared test helpers for config validation
 */

import assert from "node:assert/strict"
import {mkdir, symlink, rm} from "node:fs/promises"
import {dirname, resolve} from "node:path"
import {fileURLToPath, pathToFileURL} from "url"
import {join} from "node:path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PROJECT_ROOT = resolve(__dirname, "../..")

/**
 * Set up node_modules symlink so generated configs can resolve
 * `import uglify from "@gesslar/uglier"` within the test directory
 *
 * @param {string} testDir - Absolute path to the test temp directory
 * @returns {Promise<void>}
 */
export async function setupPackageSymlink(testDir) {
  const nmDir = join(testDir, "node_modules", "@gesslar", "uglier")
  await mkdir(dirname(nmDir), {recursive: true})
  await rm(nmDir, {recursive: true, force: true})
  await symlink(PROJECT_ROOT, nmDir, "dir")
}

/**
 * Import a generated eslint.config.js and validate it produces a valid
 * ESLint flat config array. Uses a cache-busting query parameter so
 * Node does not return a stale cached module.
 *
 * @param {string} configPath - Absolute path to the generated eslint.config.js
 * @returns {Promise<Array>} The resolved config array
 */
export async function importGeneratedConfig(configPath) {
  const fileUrl = pathToFileURL(configPath)
  fileUrl.searchParams.set("t", Date.now().toString())
  const module = await import(fileUrl.href)
  const config = module.default

  assert.ok(Array.isArray(config), "Config default export should be an array")
  assert.ok(config.length > 0, "Config array should not be empty")

  for(const entry of config) {
    assert.equal(typeof entry, "object", "Each config entry should be an object")
    assert.ok(entry !== null, "Config entries should not be null")
  }

  return config
}
