/**
 * @file cli.test.js - Tests for CLI functions
 */

import {describe, it, before, after, beforeEach, afterEach} from "node:test"
import assert from "node:assert/strict"
import {readFile, writeFile, mkdir, rm, cp} from "node:fs/promises"
import {join} from "node:path"
import {fileURLToPath} from "url"
import {dirname} from "path"
import {
  generateConfig,
  addToConfig,
  removeFromConfig
} from "../../bin/cli.js"
import {setupPackageSymlink, importGeneratedConfig} from "../helpers/config.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const TEST_DIR = join(__dirname, "../temp")
const FIXTURES_DIR = join(__dirname, "../fixtures")

describe("CLI Functions", () => {
  before(async() => {
    await mkdir(TEST_DIR, {recursive: true})
    await setupPackageSymlink(TEST_DIR)
  })

  after(async() => {
    // Clean up temp directory
    await rm(TEST_DIR, {recursive: true, force: true})
  })

  describe("generateConfig", () => {
    let originalCwd

    beforeEach(async() => {
      originalCwd = process.cwd()
      process.chdir(TEST_DIR)

      // Copy package.json to temp dir
      await cp(
        join(FIXTURES_DIR, "package.json"),
        join(TEST_DIR, "package.json")
      )
    })

    afterEach(async() => {
      process.chdir(originalCwd)

      // Clean up any generated config
      try {
        await rm(join(TEST_DIR, "eslint.config.js"))
      } catch {
        // Ignore if file doesn't exist
      }

      try {
        await rm(join(TEST_DIR, "package.json"))
      } catch {
        // Ignore if file doesn't exist
      }
    })

    it("should create a config file with specified targets", async() => {
      const result = await generateConfig(["node"])

      assert.equal(result, true)

      const configPath = join(TEST_DIR, "eslint.config.js")
      const content = await readFile(configPath, "utf-8")

      assert.match(content, /import uglify from "@gesslar\/uglier"/)
      assert.match(content, /"lints-js"/)
      assert.match(content, /"lints-jsdoc"/)
      assert.match(content, /"node"/)

      const config = await importGeneratedConfig(configPath)
      const names = config.map(c => c.name)
      assert.ok(names.some(n => n?.includes("lints-js")))
      assert.ok(names.some(n => n?.includes("node")))
    })

    it("should fail if no targets specified", async() => {
      const result = await generateConfig([])

      assert.equal(result, false)
    })

    it("should fail if config already exists", async() => {
      await writeFile(
        join(TEST_DIR, "eslint.config.js"),
        "// existing config"
      )

      const result = await generateConfig(["node"])

      assert.equal(result, false)
    })

    it("should handle multiple targets", async() => {
      const result = await generateConfig(["node", "web"])

      assert.equal(result, true)

      const configPath = join(TEST_DIR, "eslint.config.js")
      const content = await readFile(configPath, "utf-8")

      assert.match(content, /"node"/)
      assert.match(content, /"web"/)

      const config = await importGeneratedConfig(configPath)
      const names = config.map(c => c.name)
      assert.ok(names.some(n => n?.includes("node")))
      assert.ok(names.some(n => n?.includes("web")))
    })
  })

  describe("addToConfig", () => {
    let originalCwd

    beforeEach(async() => {
      originalCwd = process.cwd()
      process.chdir(TEST_DIR)

      // Copy package.json to temp dir
      await cp(
        join(FIXTURES_DIR, "package.json"),
        join(TEST_DIR, "package.json")
      )

      // Create a base config
      await cp(
        join(FIXTURES_DIR, "sample-config.js"),
        join(TEST_DIR, "eslint.config.js")
      )
    })

    afterEach(async() => {
      process.chdir(originalCwd)

      try {
        await rm(join(TEST_DIR, "eslint.config.js"))
      } catch {
        // Ignore
      }

      try {
        await rm(join(TEST_DIR, "package.json"))
      } catch {
        // Ignore
      }
    })

    it("should add new targets to existing config", async() => {
      const result = await addToConfig(["react"])

      assert.equal(result, true)

      const configPath = join(TEST_DIR, "eslint.config.js")
      const content = await readFile(configPath, "utf-8")

      assert.match(content, /"react"/)
      assert.match(content, /"node"/) // Original still there

      const config = await importGeneratedConfig(configPath)
      const names = config.map(c => c.name)
      assert.ok(names.some(n => n?.includes("react")))
      assert.ok(names.some(n => n?.includes("node")))
    })

    it("should fail if no config exists", async() => {
      await rm(join(TEST_DIR, "eslint.config.js"))

      const result = await addToConfig(["react"])

      assert.equal(result, false)
    })

    it("should fail if no targets specified", async() => {
      const result = await addToConfig([])

      assert.equal(result, false)
    })

    it("should not add duplicate targets", async() => {
      const result = await addToConfig(["node"])

      assert.equal(result, false)
    })

    it("should add multiple targets at once", async() => {
      const result = await addToConfig(["react", "web"])

      assert.equal(result, true)

      const configPath = join(TEST_DIR, "eslint.config.js")
      const content = await readFile(configPath, "utf-8")

      assert.match(content, /"react"/)
      assert.match(content, /"web"/)

      const config = await importGeneratedConfig(configPath)
      const names = config.map(c => c.name)
      assert.ok(names.some(n => n?.includes("react")))
      assert.ok(names.some(n => n?.includes("web")))
    })
  })

  describe("removeFromConfig", () => {
    let originalCwd

    beforeEach(async() => {
      originalCwd = process.cwd()
      process.chdir(TEST_DIR)

      // Copy package.json to temp dir
      await cp(
        join(FIXTURES_DIR, "package.json"),
        join(TEST_DIR, "package.json")
      )
    })

    afterEach(async() => {
      process.chdir(originalCwd)

      try {
        await rm(join(TEST_DIR, "eslint.config.js"))
      } catch {
        // Ignore
      }

      try {
        await rm(join(TEST_DIR, "package.json"))
      } catch {
        // Ignore
      }
    })

    it("should remove targets from config", async() => {
      // Create config with multiple targets
      await generateConfig(["node", "react", "web"])

      const result = await removeFromConfig(["react"])

      assert.equal(result.success, true)
      assert.deepEqual(result.removedTargets, ["react"])

      const configPath = join(TEST_DIR, "eslint.config.js")
      const content = await readFile(configPath, "utf-8")

      assert.doesNotMatch(content, /"react"/)
      assert.match(content, /"node"/) // Still there
      assert.match(content, /"web"/) // Still there

      const config = await importGeneratedConfig(configPath)
      const names = config.map(c => c.name)
      assert.ok(names.some(n => n?.includes("node")))
      assert.ok(names.some(n => n?.includes("web")))
      assert.ok(!names.some(n => n?.includes("react")))
    })

    it("should fail if no config exists", async() => {
      const result = await removeFromConfig(["react"])

      assert.equal(result.success, false)
    })

    it("should fail if no targets specified", async() => {
      await generateConfig(["node"])

      const result = await removeFromConfig([])

      assert.equal(result.success, false)
    })

    it("should fail if trying to remove all targets", async() => {
      await generateConfig(["node"])

      const result = await removeFromConfig(["lints-js", "lints-jsdoc", "node"])

      assert.equal(result.success, false)
    })

    it("should remove overrides for removed targets", async() => {
      // Copy config with overrides
      await cp(
        join(FIXTURES_DIR, "config-with-overrides.js"),
        join(TEST_DIR, "eslint.config.js")
      )

      const result = await removeFromConfig(["react"])

      assert.equal(result.success, true)
      assert.equal(result.removedOverrides.includes("react"), true)

      const configPath = join(TEST_DIR, "eslint.config.js")
      const content = await readFile(configPath, "utf-8")

      // React should be gone from overrides
      assert.doesNotMatch(content, /"react":\s*\{/)
      // Node override should still be there
      assert.match(content, /"node":\s*\{/)

      await importGeneratedConfig(configPath)
    })

    it("should handle removing multiple targets", async() => {
      await generateConfig(["node", "react", "web"])

      const result = await removeFromConfig(["react", "web"])

      assert.equal(result.success, true)
      assert.deepEqual(result.removedTargets.sort(), ["react", "web"])

      const configPath = join(TEST_DIR, "eslint.config.js")
      const content = await readFile(configPath, "utf-8")

      assert.doesNotMatch(content, /"react"/)
      assert.doesNotMatch(content, /"web"/)
      assert.match(content, /"node"/)

      const config = await importGeneratedConfig(configPath)
      const names = config.map(c => c.name)
      assert.ok(names.some(n => n?.includes("node")))
      assert.ok(!names.some(n => n?.includes("react")))
      assert.ok(!names.some(n => n?.includes("web")))
    })

    it("should warn about non-existent targets but still remove valid ones", async() => {
      await generateConfig(["node", "react"])

      const result = await removeFromConfig(["react", "nonexistent"])

      assert.equal(result.success, true)
      assert.deepEqual(result.removedTargets, ["react"])
    })
  })
})
