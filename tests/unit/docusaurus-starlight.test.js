/**
 * @file docusaurus-starlight.test.js - Tests for Docusaurus and Starlight configurations
 */

import {describe, it} from "node:test"
import assert from "node:assert/strict"
import uglier from "../../src/uglier.js"

describe("Docusaurus Configuration", () => {
  describe("docusaurus config", () => {
    it("should include browser globals", () => {
      const configs = uglier({
        with: ["docusaurus"]
      })

      const config = configs.find(c => c.name === "gesslar/uglier/docusaurus")

      assert.ok(config, "Should have docusaurus config")
      assert.notEqual(config.languageOptions.globals.window, undefined, "Should have window global")
      assert.notEqual(config.languageOptions.globals.document, undefined, "Should have document global")
    })

    it("should include React and ReactDOM globals", () => {
      const configs = uglier({
        with: ["docusaurus"]
      })

      const config = configs.find(c => c.name === "gesslar/uglier/docusaurus")

      assert.ok(config, "Should have docusaurus config")
      assert.equal(config.languageOptions.globals.React, "readonly", "Should have React global")
      assert.equal(config.languageOptions.globals.ReactDOM, "readonly", "Should have ReactDOM global")
    })

    it("should have default file patterns including docs and jsx", () => {
      const configs = uglier({
        with: ["docusaurus"]
      })

      const config = configs.find(c => c.name === "gesslar/uglier/docusaurus")

      assert.ok(config, "Should have docusaurus config")
      assert.deepEqual(config.files, [
        "src/**/*.{js,jsx,mjs,cjs}",
        "docs/**/*.{js,jsx,mjs,cjs}",
      ])
    })

    it("should allow custom file patterns", () => {
      const configs = uglier({
        with: ["docusaurus"],
        options: {
          docusaurus: {
            files: ["custom/**/*.js"],
          },
        },
      })

      const config = configs.find(c => c.name === "gesslar/uglier/docusaurus")

      assert.ok(config, "Should have docusaurus config")
      assert.deepEqual(config.files, ["custom/**/*.js"])
    })

    it("should allow additional globals", () => {
      const configs = uglier({
        with: ["docusaurus"],
        options: {
          docusaurus: {
            additionalGlobals: {
              __DOCUSAURUS__: "readonly",
            },
          },
        },
      })

      const config = configs.find(c => c.name === "gesslar/uglier/docusaurus")

      assert.ok(config, "Should have docusaurus config")
      assert.equal(config.languageOptions.globals.__DOCUSAURUS__, "readonly")
    })

    it("should allow ignores", () => {
      const configs = uglier({
        with: ["docusaurus"],
        options: {
          docusaurus: {
            ignores: ["build/**"],
          },
        },
      })

      const config = configs.find(c => c.name === "gesslar/uglier/docusaurus")

      assert.ok(config, "Should have docusaurus config")
      assert.deepEqual(config.ignores, ["build/**"])
    })
  })
})

describe("Starlight Configuration", () => {
  describe("starlight config", () => {
    it("should include browser globals", () => {
      const configs = uglier({
        with: ["starlight"]
      })

      const config = configs.find(c => c.name === "gesslar/uglier/starlight")

      assert.ok(config, "Should have starlight config")
      assert.notEqual(config.languageOptions.globals.window, undefined, "Should have window global")
      assert.notEqual(config.languageOptions.globals.document, undefined, "Should have document global")
    })

    it("should include Astro global", () => {
      const configs = uglier({
        with: ["starlight"]
      })

      const config = configs.find(c => c.name === "gesslar/uglier/starlight")

      assert.ok(config, "Should have starlight config")
      assert.equal(config.languageOptions.globals.Astro, "readonly", "Should have Astro global")
    })

    it("should not include React globals", () => {
      const configs = uglier({
        with: ["starlight"]
      })

      const config = configs.find(c => c.name === "gesslar/uglier/starlight")

      assert.ok(config, "Should have starlight config")
      assert.equal(config.languageOptions.globals.React, undefined, "Should not have React global")
      assert.equal(config.languageOptions.globals.ReactDOM, undefined, "Should not have ReactDOM global")
    })

    it("should have default file patterns including docs", () => {
      const configs = uglier({
        with: ["starlight"]
      })

      const config = configs.find(c => c.name === "gesslar/uglier/starlight")

      assert.ok(config, "Should have starlight config")
      assert.deepEqual(config.files, [
        "src/**/*.{js,mjs,cjs}",
        "docs/**/*.{js,mjs,cjs}",
      ])
    })

    it("should allow custom file patterns", () => {
      const configs = uglier({
        with: ["starlight"],
        options: {
          starlight: {
            files: ["custom/**/*.mjs"],
          },
        },
      })

      const config = configs.find(c => c.name === "gesslar/uglier/starlight")

      assert.ok(config, "Should have starlight config")
      assert.deepEqual(config.files, ["custom/**/*.mjs"])
    })

    it("should allow additional globals", () => {
      const configs = uglier({
        with: ["starlight"],
        options: {
          starlight: {
            additionalGlobals: {
              myGlobal: "readonly",
            },
          },
        },
      })

      const config = configs.find(c => c.name === "gesslar/uglier/starlight")

      assert.ok(config, "Should have starlight config")
      assert.equal(config.languageOptions.globals.myGlobal, "readonly")
    })

    it("should allow ignores", () => {
      const configs = uglier({
        with: ["starlight"],
        options: {
          starlight: {
            ignores: ["dist/**"],
          },
        },
      })

      const config = configs.find(c => c.name === "gesslar/uglier/starlight")

      assert.ok(config, "Should have starlight config")
      assert.deepEqual(config.ignores, ["dist/**"])
    })
  })
})
