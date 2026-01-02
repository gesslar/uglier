/**
 * @file package-manager.test.js - Tests for package manager detection
 */

import {describe, it, before, after, beforeEach, afterEach} from "node:test"
import assert from "node:assert/strict"
import {mkdir, rm, cp} from "node:fs/promises"
import {join} from "node:path"
import {fileURLToPath} from "url"
import {dirname} from "path"
import {generateConfig} from "../../bin/cli.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const TEST_DIR = join(__dirname, "../temp-pkg-mgr")
const FIXTURES_DIR = join(__dirname, "../fixtures/pkg-managers")

describe("Package Manager Detection", () => {
  before(async() => {
    await mkdir(TEST_DIR, {recursive: true})
  })

  after(async() => {
    await rm(TEST_DIR, {recursive: true, force: true})
  })

  describe("npm project", () => {
    let originalCwd

    beforeEach(async() => {
      originalCwd = process.cwd()
      process.chdir(TEST_DIR)

      // Copy npm fixtures
      await cp(
        join(FIXTURES_DIR, "npm", "package.json"),
        join(TEST_DIR, "package.json")
      )
      await cp(
        join(FIXTURES_DIR, "npm", "package-lock.json"),
        join(TEST_DIR, "package-lock.json")
      )
    })

    afterEach(async() => {
      process.chdir(originalCwd)

      try {
        await rm(join(TEST_DIR, "eslint.config.js"))
        await rm(join(TEST_DIR, "package.json"))
        await rm(join(TEST_DIR, "package-lock.json"))
      } catch {
        // Ignore
      }
    })

    it("should show 'npx eslint .' command for npm projects", async() => {
      // Capture console output
      const logs = []
      const originalLog = console.log
      console.log = (...args) => logs.push(args.join(" "))

      await generateConfig(["node"])

      console.log = originalLog

      const output = logs.join("\n")
      assert.match(output, /npx eslint \./)
      assert.doesNotMatch(output, /pnpm eslint \./)
      assert.doesNotMatch(output, /yarn eslint \./)
      assert.doesNotMatch(output, /bunx eslint \./)
    })
  })

  describe("pnpm project", () => {
    let originalCwd

    beforeEach(async() => {
      originalCwd = process.cwd()
      process.chdir(TEST_DIR)

      // Copy pnpm fixtures
      await cp(
        join(FIXTURES_DIR, "pnpm", "package.json"),
        join(TEST_DIR, "package.json")
      )
      await cp(
        join(FIXTURES_DIR, "pnpm", "pnpm-lock.yaml"),
        join(TEST_DIR, "pnpm-lock.yaml")
      )
    })

    afterEach(async() => {
      process.chdir(originalCwd)

      try {
        await rm(join(TEST_DIR, "eslint.config.js"))
        await rm(join(TEST_DIR, "package.json"))
        await rm(join(TEST_DIR, "pnpm-lock.yaml"))
      } catch {
        // Ignore
      }
    })

    it("should show 'pnpm eslint .' command for pnpm projects", async() => {
      const logs = []
      const originalLog = console.log
      console.log = (...args) => logs.push(args.join(" "))

      await generateConfig(["node"])

      console.log = originalLog

      const output = logs.join("\n")
      assert.match(output, /pnpm eslint \./)
      assert.doesNotMatch(output, /npx eslint \./)
    })
  })

  describe("yarn project", () => {
    let originalCwd

    beforeEach(async() => {
      originalCwd = process.cwd()
      process.chdir(TEST_DIR)

      // Copy yarn fixtures
      await cp(
        join(FIXTURES_DIR, "yarn", "package.json"),
        join(TEST_DIR, "package.json")
      )
      await cp(
        join(FIXTURES_DIR, "yarn", "yarn.lock"),
        join(TEST_DIR, "yarn.lock")
      )
    })

    afterEach(async() => {
      process.chdir(originalCwd)

      try {
        await rm(join(TEST_DIR, "eslint.config.js"))
        await rm(join(TEST_DIR, "package.json"))
        await rm(join(TEST_DIR, "yarn.lock"))
      } catch {
        // Ignore
      }
    })

    it("should show 'yarn eslint .' command for yarn projects", async() => {
      const logs = []
      const originalLog = console.log
      console.log = (...args) => logs.push(args.join(" "))

      await generateConfig(["node"])

      console.log = originalLog

      const output = logs.join("\n")
      assert.match(output, /yarn eslint \./)
      assert.doesNotMatch(output, /npx eslint \./)
    })
  })

  describe("bun project", () => {
    let originalCwd

    beforeEach(async() => {
      originalCwd = process.cwd()
      process.chdir(TEST_DIR)

      // Copy bun fixtures
      await cp(
        join(FIXTURES_DIR, "bun", "package.json"),
        join(TEST_DIR, "package.json")
      )
      await cp(
        join(FIXTURES_DIR, "bun", "bun.lockb"),
        join(TEST_DIR, "bun.lockb")
      )
    })

    afterEach(async() => {
      process.chdir(originalCwd)

      try {
        await rm(join(TEST_DIR, "eslint.config.js"))
        await rm(join(TEST_DIR, "package.json"))
        await rm(join(TEST_DIR, "bun.lockb"))
      } catch {
        // Ignore
      }
    })

    it("should show 'bunx eslint .' command for bun projects", async() => {
      const logs = []
      const originalLog = console.log
      console.log = (...args) => logs.push(args.join(" "))

      await generateConfig(["node"])

      console.log = originalLog

      const output = logs.join("\n")
      assert.match(output, /bunx eslint \./)
      assert.doesNotMatch(output, /npx eslint \./)
    })
  })

  describe("fallback when no lock file", () => {
    let originalCwd

    beforeEach(async() => {
      originalCwd = process.cwd()
      process.chdir(TEST_DIR)

      // Only package.json, no lock file
      await cp(
        join(FIXTURES_DIR, "npm", "package.json"),
        join(TEST_DIR, "package.json")
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

    it("should use detected package manager even without local lock file", async() => {
      // Note: The detection library walks up the directory tree,
      // so it will find the parent project's lock file (pnpm in this case).
      // This is correct behavior - it uses the nearest package manager.
      const logs = []
      const originalLog = console.log
      console.log = (...args) => logs.push(args.join(" "))

      await generateConfig(["node"])

      console.log = originalLog

      const output = logs.join("\n")
      // Should find a valid eslint command (any of the supported package managers)
      const hasValidCommand = /(?:npx|pnpm|yarn|bunx) eslint \./.test(output)
      assert.ok(hasValidCommand, "Should show a valid package manager eslint command")
    })
  })
})
