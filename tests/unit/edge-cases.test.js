/**
 * @file edge-cases.test.js - Tests for edge cases and messy configs
 */

import {describe, it, before, after, beforeEach, afterEach} from "node:test"
import assert from "node:assert/strict"
import {readFile, mkdir, rm, cp} from "node:fs/promises"
import {join} from "node:path"
import {fileURLToPath} from "url"
import {dirname} from "path"
import {
  addToConfig,
  removeFromConfig
} from "../../bin/cli.js"
import {setupPackageSymlink, importGeneratedConfig} from "../helpers/config.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const TEST_DIR = join(__dirname, "../temp-edge")
const FIXTURES_DIR = join(__dirname, "../fixtures")

describe("Edge Cases", () => {
  before(async() => {
    await mkdir(TEST_DIR, {recursive: true})
    await setupPackageSymlink(TEST_DIR)
  })

  after(async() => {
    await rm(TEST_DIR, {recursive: true, force: true})
  })

  describe("Messy Config with Comments and Extra Properties", () => {
    let originalCwd

    beforeEach(async() => {
      originalCwd = process.cwd()
      process.chdir(TEST_DIR)

      await cp(
        join(FIXTURES_DIR, "package.json"),
        join(TEST_DIR, "package.json")
      )

      await cp(
        join(FIXTURES_DIR, "messy-config.js"),
        join(TEST_DIR, "eslint.config.js")
      )
    })

    afterEach(async() => {
      process.chdir(originalCwd)

      try {
        await rm(join(TEST_DIR, "eslint.config.js"))
        await rm(join(TEST_DIR, "package.json"))
      } catch {
        // Ignore
      }
    })

    it("should parse messy config correctly", async() => {
      const result = await addToConfig(["tauri"])

      assert.equal(result, true)

      const configPath = join(TEST_DIR, "eslint.config.js")
      const content = await readFile(configPath, "utf-8")

      assert.match(content, /"tauri"/)
      assert.match(content, /"react"/) // Original still there
      assert.match(content, /"node"/) // Original still there

      await importGeneratedConfig(configPath)
    })

    it("should not add duplicates to messy config", async() => {
      const result = await addToConfig(["react"])

      assert.equal(result, false)
    })

    it("should remove from messy config and clean overrides", async() => {
      const result = await removeFromConfig(["react"])

      assert.equal(result.success, true)
      assert.equal(result.removedTargets.includes("react"), true)
      assert.equal(result.removedOverrides.includes("react"), true)

      const configPath = join(TEST_DIR, "eslint.config.js")
      const content = await readFile(configPath, "utf-8")

      assert.doesNotMatch(content, /"react"/)
      // Node and web should still be there
      assert.match(content, /"node"/)
      assert.match(content, /"web"/)
      // Node override should still exist
      assert.match(content, /"node":\s*\{/)
      // React override should be gone
      assert.doesNotMatch(content, /"react":\s*\{/)

      await importGeneratedConfig(configPath)
    })

    it("should handle removing multiple targets with overrides", async() => {
      const result = await removeFromConfig(["node", "react"])

      assert.equal(result.success, true)
      assert.deepEqual(result.removedTargets.sort(), ["node", "react"])
      assert.deepEqual(result.removedOverrides.sort(), ["node", "react"])

      const configPath = join(TEST_DIR, "eslint.config.js")
      const content = await readFile(configPath, "utf-8")

      assert.doesNotMatch(content, /"node":\s*\{/)
      assert.doesNotMatch(content, /"react":\s*\{/)
      // Web override should still be there
      assert.match(content, /"web":\s*\{/)

      await importGeneratedConfig(configPath)
    })
  })

  describe("Single Line Config", () => {
    let originalCwd

    beforeEach(async() => {
      originalCwd = process.cwd()
      process.chdir(TEST_DIR)

      await cp(
        join(FIXTURES_DIR, "package.json"),
        join(TEST_DIR, "package.json")
      )

      await cp(
        join(FIXTURES_DIR, "single-line-config.js"),
        join(TEST_DIR, "eslint.config.js")
      )
    })

    afterEach(async() => {
      process.chdir(originalCwd)

      try {
        await rm(join(TEST_DIR, "eslint.config.js"))
        await rm(join(TEST_DIR, "package.json"))
      } catch {
        // Ignore
      }
    })

    it("should fail to parse single-line config", async() => {
      // Our regex requires newlines, which is fine - we generate configs with newlines
      const result = await addToConfig(["react"])

      assert.equal(result, false)
    })
  })

  describe("Weird Spacing Config", () => {
    let originalCwd

    beforeEach(async() => {
      originalCwd = process.cwd()
      process.chdir(TEST_DIR)

      await cp(
        join(FIXTURES_DIR, "package.json"),
        join(TEST_DIR, "package.json")
      )

      await cp(
        join(FIXTURES_DIR, "weird-spacing-config.js"),
        join(TEST_DIR, "eslint.config.js")
      )
    })

    afterEach(async() => {
      process.chdir(originalCwd)

      try {
        await rm(join(TEST_DIR, "eslint.config.js"))
        await rm(join(TEST_DIR, "package.json"))
      } catch {
        // Ignore
      }
    })

    it("should parse config with weird spacing", async() => {
      const result = await addToConfig(["tauri"])

      assert.equal(result, true)

      const configPath = join(TEST_DIR, "eslint.config.js")
      const content = await readFile(configPath, "utf-8")

      assert.match(content, /"tauri"/)
      assert.match(content, /"node"/)
      assert.match(content, /"react"/)

      await importGeneratedConfig(configPath)
    })

    it("should detect duplicates in weird spacing", async() => {
      const result = await addToConfig(["node"])

      assert.equal(result, false)
    })

    it("should remove from weird spacing config", async() => {
      const result = await removeFromConfig(["react"])

      assert.equal(result.success, true)
      assert.equal(result.removedOverrides.includes("react"), true)

      const configPath = join(TEST_DIR, "eslint.config.js")
      const content = await readFile(configPath, "utf-8")

      assert.doesNotMatch(content, /^\s*"react"/m)

      await importGeneratedConfig(configPath)
    })
  })

  describe("String Variations (Single vs Double Quotes)", () => {
    let originalCwd

    beforeEach(async() => {
      originalCwd = process.cwd()
      process.chdir(TEST_DIR)

      await cp(
        join(FIXTURES_DIR, "package.json"),
        join(TEST_DIR, "package.json")
      )

      await cp(
        join(FIXTURES_DIR, "string-variations-config.js"),
        join(TEST_DIR, "eslint.config.js")
      )
    })

    afterEach(async() => {
      process.chdir(originalCwd)

      try {
        await rm(join(TEST_DIR, "eslint.config.js"))
        await rm(join(TEST_DIR, "package.json"))
      } catch {
        // Ignore
      }
    })

    it("should parse config with mixed quotes", async() => {
      const result = await addToConfig(["tauri"])

      assert.equal(result, true)

      const configPath = join(TEST_DIR, "eslint.config.js")
      const content = await readFile(configPath, "utf-8")

      assert.match(content, /"tauri"/)

      await importGeneratedConfig(configPath)
    })

    it("should detect duplicates regardless of quote style", async() => {
      const result = await addToConfig(["node"])

      assert.equal(result, false)
    })

    it("should remove targets with mixed quotes", async() => {
      const result = await removeFromConfig(["react"])

      assert.equal(result.success, true)

      const configPath = join(TEST_DIR, "eslint.config.js")
      const content = await readFile(configPath, "utf-8")

      // Should not match either 'react' or "react"
      assert.doesNotMatch(content, /^\s*['"]react['"]/m)

      await importGeneratedConfig(configPath)
    })

    it("should clean overrides with mixed quotes", async() => {
      const result = await removeFromConfig(["node"])

      assert.equal(result.success, true)
      assert.equal(result.removedOverrides.includes("node"), true)

      const configPath = join(TEST_DIR, "eslint.config.js")
      const content = await readFile(configPath, "utf-8")

      // Node override should be gone (both quote styles)
      assert.doesNotMatch(content, /['"]node['"]:\s*\{/)

      await importGeneratedConfig(configPath)
    })
  })
})
