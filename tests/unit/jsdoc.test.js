/**
 * @file jsdoc.test.js - Tests for JSDoc configuration
 */

import {describe, it} from "node:test"
import assert from "node:assert/strict"
import uglier from "../../src/uglier.js"

describe("JSDoc Configuration", () => {
  describe("lints-jsdoc config", () => {
    it("should include jsdoc plugin", () => {
      const configs = uglier({
        with: ["lints-jsdoc"]
      })

      const jsdocConfig = configs.find(c => c.name === "gesslar/uglier/lints-jsdoc")

      assert.ok(jsdocConfig, "Should have lints-jsdoc config")
      assert.ok(jsdocConfig.plugins, "Should have plugins object")
      assert.ok(jsdocConfig.plugins.jsdoc, "Should have jsdoc plugin")
    })

    it("should include jsdoc/valid-types rule", () => {
      const configs = uglier({
        with: ["lints-jsdoc"]
      })

      const jsdocConfig = configs.find(c => c.name === "gesslar/uglier/lints-jsdoc")

      assert.ok(jsdocConfig, "Should have lints-jsdoc config")
      assert.equal(jsdocConfig.rules["jsdoc/valid-types"], "error", "Should have jsdoc/valid-types rule set to error")
    })

    it("should include jsdoc/no-undefined-types rule", () => {
      const configs = uglier({
        with: ["lints-jsdoc"]
      })

      const jsdocConfig = configs.find(c => c.name === "gesslar/uglier/lints-jsdoc")

      assert.ok(jsdocConfig, "Should have lints-jsdoc config")
      assert.equal(jsdocConfig.rules["jsdoc/no-undefined-types"], "error", "Should have jsdoc/no-undefined-types rule set to error")
    })

    it("should include jsdoc/require-property rule", () => {
      const configs = uglier({
        with: ["lints-jsdoc"]
      })

      const jsdocConfig = configs.find(c => c.name === "gesslar/uglier/lints-jsdoc")

      assert.ok(jsdocConfig, "Should have lints-jsdoc config")
      assert.equal(jsdocConfig.rules["jsdoc/require-property"], "error", "Should have jsdoc/require-property rule set to error")
    })

    it("should include jsdoc settings with typescript mode", () => {
      const configs = uglier({
        with: ["lints-jsdoc"]
      })

      const jsdocConfig = configs.find(c => c.name === "gesslar/uglier/lints-jsdoc")

      assert.ok(jsdocConfig, "Should have lints-jsdoc config")
      assert.ok(jsdocConfig.settings, "Should have settings object")
      assert.ok(jsdocConfig.settings.jsdoc, "Should have jsdoc settings")
      assert.equal(jsdocConfig.settings.jsdoc.mode, "typescript", "Should have jsdoc.mode set to typescript")
    })

    it("should include all existing jsdoc rules", () => {
      const configs = uglier({
        with: ["lints-jsdoc"]
      })

      const jsdocConfig = configs.find(c => c.name === "gesslar/uglier/lints-jsdoc")

      assert.ok(jsdocConfig, "Should have lints-jsdoc config")
      assert.ok(jsdocConfig.rules["jsdoc/require-description"], "Should have jsdoc/require-description rule")
      assert.ok(jsdocConfig.rules["jsdoc/tag-lines"], "Should have jsdoc/tag-lines rule")
      assert.ok(jsdocConfig.rules["jsdoc/require-jsdoc"], "Should have jsdoc/require-jsdoc rule")
      assert.ok(jsdocConfig.rules["jsdoc/check-tag-names"], "Should have jsdoc/check-tag-names rule")
      assert.ok(jsdocConfig.rules["jsdoc/check-types"], "Should have jsdoc/check-types rule")
      assert.ok(jsdocConfig.rules["jsdoc/require-param-type"], "Should have jsdoc/require-param-type rule")
      assert.ok(jsdocConfig.rules["jsdoc/require-returns-type"], "Should have jsdoc/require-returns-type rule")
    })

    it("should be included by default when no configs specified", () => {
      const configs = uglier()

      const jsdocConfig = configs.find(c => c.name === "gesslar/uglier/lints-jsdoc")

      assert.ok(jsdocConfig, "Should include lints-jsdoc by default")
    })

    it("should be included by default with other configs when not explicitly specified", () => {
      // When with is not provided, defaults include lints-jsdoc
      const configs = uglier()

      const jsdocConfig = configs.find(c => c.name === "gesslar/uglier/lints-jsdoc")
      const jsConfig = configs.find(c => c.name === "gesslar/uglier/lints-js")

      assert.ok(jsdocConfig, "Should include lints-jsdoc by default")
      assert.ok(jsConfig, "Should include lints-js by default")
    })

    it("should allow rule overrides", () => {
      const configs = uglier({
        with: ["lints-jsdoc"],
        overrides: {
          "lints-jsdoc": {
            overrides: {
              "jsdoc/valid-types": "warn"
            }
          }
        }
      })

      const jsdocConfig = configs.find(c => c.name === "gesslar/uglier/lints-jsdoc")

      assert.ok(jsdocConfig, "Should have lints-jsdoc config")
      assert.equal(jsdocConfig.rules["jsdoc/valid-types"], "warn", "Should allow overriding jsdoc/valid-types rule")
    })

    it("should preserve settings when rules are overridden", () => {
      const configs = uglier({
        with: ["lints-jsdoc"],
        overrides: {
          "lints-jsdoc": {
            overrides: {
              "jsdoc/valid-types": "warn"
            }
          }
        }
      })

      const jsdocConfig = configs.find(c => c.name === "gesslar/uglier/lints-jsdoc")

      assert.ok(jsdocConfig, "Should have lints-jsdoc config")
      assert.ok(jsdocConfig.settings, "Should have settings object")
      assert.equal(jsdocConfig.settings.jsdoc.mode, "typescript", "Should preserve jsdoc settings when rules are overridden")
    })
  })
})
