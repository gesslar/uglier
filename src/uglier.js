/**
 * @file eslint-config-uglier - A composable ESLint configuration system
 *
 * @description
 * This module provides a flexible, composable approach to ESLint configuration
 * using named config blocks that can be mixed and matched for different
 * project types and environments.
 *
 * @example
 * // Basic usage with default configs
 * import uglify from "@gesslar/uglier"
 *
 * export default [
 *   ...uglify({
 *     with: ["lints-js", "lints-jsdoc"]
 *   })
 * ]
 *
 * @example
 * // Tauri project with custom file patterns
 * import uglify from "@gesslar/uglier"
 *
 * export default [
 *   ...uglify({
 *     with: ["lints-js", "lints-jsdoc", "tauri"],
 *     overrides: {
 *       "lints-js": { files: ["src/**\/*.js"] },
 *       "tauri": { files: ["src/**\/*.js"] }
 *     }
 *   })
 * ]
 *
 * @example
 * // Using without to exclude configs
 * import uglify from "@gesslar/uglier"
 *
 * export default [
 *   ...uglify({
 *     with: ["lints-js", "lints-jsdoc", "node"],
 *     without: ["lints-jsdoc"],  // Exclude JSDoc rules
 *   })
 * ]
 *
 * @example
 * // Override specific rules
 * import uglify from "@gesslar/uglier"
 *
 * export default [
 *   ...uglify({
 *     with: ["lints-js"],
 *     overrides: {
 *       "lints-js": {
 *         indent: 4,
 *         maxLen: 120,
 *         overrides: {
 *           "@stylistic/semi": ["error", "always"]
 *         }
 *       }
 *     }
 *   })
 * ]
 *
 * @available-configs
 * - lints-js: Core stylistic rules (indent, spacing, quotes, etc.)
 * - lints-jsdoc: JSDoc documentation requirements
 * - languageOptions: Base ECMAScript language configuration
 * - web: Browser globals (window, document, etc.)
 * - node: Node.js globals (process, require, fetch, Headers)
 * - tauri: Tauri app globals (browser + __TAURI__)
 * - vscode-extension: VSCode extension API (acquireVsCodeApi)
 * - cjs-override: CommonJS file handling (.cjs files)
 * - mjs-override: ES Module file handling (.mjs files)
 */

import jsdoc from "eslint-plugin-jsdoc"
import stylistic from "@stylistic/eslint-plugin"
import globals from "globals"

/**
 * Registry of named configuration blocks
 * Each config is a factory function that returns an ESLint config object
 * @type {Object.<string, Function>}
 */
const CONFIGS = {
  /**
   * Core stylistic linting rules
   * @param {object} options - Configuration options
   * @returns {object} Config object
   */
  "lints-js": (options = {}) => {
    const {
      files = ["**/*.{js,mjs,cjs}"],
      indent = 2,
      maxLen = 80,
      overrides = {},
    } = options

    return {
      name: "gesslar/uglier/lints-js",
      files: Array.isArray(files) ? files : [files],
      plugins: {
        "@stylistic": stylistic,
      },
      rules: {
        "@stylistic/arrow-parens": ["error", "as-needed"],
        "@stylistic/arrow-spacing": ["error", {before: true, after: true}],
        "@stylistic/brace-style": ["error", "1tbs", {allowSingleLine: false}],
        "@stylistic/nonblock-statement-body-position": ["error", "below"],
        "@stylistic/padding-line-between-statements": [
          "error",
          {blankLine: "always", prev: "if", next: "*"},
          {blankLine: "always", prev: "*", next: "return"},
          {blankLine: "always", prev: "while", next: "*"},
          {blankLine: "always", prev: "for", next: "*"},
          {blankLine: "always", prev: "switch", next: "*"},
          {blankLine: "always", prev: "do", next: "*"},
          {blankLine: "always", prev: "directive", next: "*"},
          {blankLine: "any", prev: "directive", next: "directive"},
        ],
        "@stylistic/eol-last": ["error", "always"],
        "@stylistic/indent": ["error", indent, {
          SwitchCase: 1
        }],
        "@stylistic/key-spacing": ["error", {beforeColon: false, afterColon: true}],
        "@stylistic/keyword-spacing": ["error", {
          before: false,
          after: true,
          overrides: {
            // Control statements
            return: {before: true, after: true},
            if: {after: false},
            else: {before: true, after: true},
            for: {after: false},
            while: {before: true, after: false},
            do: {after: true},
            switch: {after: false},
            case: {before: true, after: true},
            throw: {before: true, after: false},

            // Keywords
            as: {before: true, after: true},
            of: {before: true, after: true},
            from: {before: true, after: true},
            async: {before: true, after: true},
            await: {before: true, after: false},
            class: {before: true, after: true},
            const: {before: true, after: true},
            let: {before: true, after: true},
            var: {before: true, after: true},

            // Exception handling
            catch: {before: true, after: true},
            finally: {before: true, after: true},
          }
        }],
        "@stylistic/space-before-blocks": ["error", "always"],
        "@stylistic/max-len": ["warn", {
          code: maxLen,
          ignoreComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
          tabWidth: indent
        }],
        "@stylistic/no-tabs": "error",
        "@stylistic/no-trailing-spaces": ["error"],
        "@stylistic/object-curly-spacing": ["error", "never", {
          objectsInObjects: false,
          arraysInObjects: false
        }],
        "@stylistic/quotes": ["error", "double", {
          avoidEscape: true,
          allowTemplateLiterals: true,
        }],
        "@stylistic/semi": ["error", "never"],
        "@stylistic/space-before-function-paren": ["error", "never"],
        "@stylistic/yield-star-spacing": ["error", {before: true, after: false}],
        "constructor-super": "error",
        "no-unexpected-multiline": "error",
        "no-unused-vars": ["error", {
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_+",
          argsIgnorePattern: "^_+",
          destructuredArrayIgnorePattern: "^_+",
          varsIgnorePattern: "^_+"
        }],
        "no-useless-assignment": "error",
        "prefer-const": "error",
        "@stylistic/no-multiple-empty-lines": ["error", {max: 1}],
        "@stylistic/array-bracket-spacing": ["error", "never"],
        ...overrides,
      }
    }
  },

  /**
   * JSDoc linting rules
   * @param {object} options - Configuration options
   * @returns {object} Config object
   */
  "lints-jsdoc": (options = {}) => {
    const {
      files = ["**/*.{js,mjs,cjs}"],
      overrides = {},
    } = options

    return {
      name: "gesslar/uglier/lints-jsdoc",
      files: Array.isArray(files) ? files : [files],
      plugins: {
        jsdoc,
      },
      rules: {
        "jsdoc/require-description": "error",
        "jsdoc/tag-lines": ["error", "any", {"startLines": 1}],
        "jsdoc/require-jsdoc": ["error", {publicOnly: true}],
        "jsdoc/check-tag-names": "error",
        "jsdoc/check-types": "error",
        "jsdoc/require-param-type": "error",
        "jsdoc/require-returns-type": "error",
        ...overrides,
      }
    }
  },

  /**
   * Language options configuration
   * @param {object} options - Configuration options
   * @returns {object} Config object
   */
  "languageOptions": (options = {}) => {
    const {
      ecmaVersion = "latest",
      sourceType = "module",
      additionalGlobals = {},
    } = options

    return {
      name: "gesslar/uglier/languageOptions",
      languageOptions: {
        ecmaVersion,
        sourceType,
        globals: additionalGlobals,
      },
    }
  },

  /**
   * Browser/web globals configuration
   * @param {object} options - Configuration options
   * @returns {object} Config object
   */
  "web": (options = {}) => {
    const {
      files = ["src/**/*.{js,mjs,cjs}"],
      additionalGlobals = {},
    } = options

    return {
      name: "gesslar/uglier/web",
      files: Array.isArray(files) ? files : [files],
      languageOptions: {
        globals: {
          ...globals.browser,
          ...additionalGlobals,
        }
      }
    }
  },

  /**
   * VSCode extension globals
   * @param {object} options - Configuration options
   * @returns {object} Config object
   */
  "vscode-extension": (options = {}) => {
    const {
      files = ["src/**/*.{js,mjs,cjs}"],
      additionalGlobals = {},
    } = options

    return {
      name: "gesslar/uglier/vscode-extension",
      files: Array.isArray(files) ? files : [files],
      languageOptions: {
        globals: {
          acquireVsCodeApi: "readonly",
          ...additionalGlobals,
        }
      }
    }
  },

  /**
   * Node.js globals
   * @param {object} options - Configuration options
   * @returns {object} Config object
   */
  "node": (options = {}) => {
    const {
      files = ["**/*.{js,mjs,cjs}"],
      additionalGlobals = {},
    } = options

    return {
      name: "gesslar/uglier/node",
      files: Array.isArray(files) ? files : [files],
      languageOptions: {
        globals: {
          ...globals.node,
          fetch: "readonly",
          Headers: "readonly",
          ...additionalGlobals,
        }
      }
    }
  },

  /**
   * CommonJS file override
   * @param {object} options - Configuration options
   * @returns {object} Config object
   */
  "cjs-override": (options = {}) => {
    const {
      files = ["**/*.cjs"],
    } = options

    return {
      name: "gesslar/uglier/cjs-override",
      files: Array.isArray(files) ? files : [files],
      languageOptions: {
        sourceType: "script",
        ecmaVersion: 2021
      },
    }
  },

  /**
   * ES Module file override
   * @param {object} options - Configuration options
   * @returns {object} Config object
   */
  "mjs-override": (options = {}) => {
    const {
      files = ["**/*.mjs"],
    } = options

    return {
      name: "gesslar/uglier/mjs-override",
      files: Array.isArray(files) ? files : [files],
      languageOptions: {
        sourceType: "module",
        ecmaVersion: 2021
      }
    }
  },

  /**
   * Tauri application configuration (browser + Tauri APIs, no Node.js)
   * @param {object} options - Configuration options
   * @returns {object} Config object
   */
  "tauri": (options = {}) => {
    const {
      files = ["src/**/*.{js,mjs,cjs}"],
      additionalGlobals = {},
    } = options

    return {
      name: "gesslar/uglier/tauri",
      files: Array.isArray(files) ? files : [files],
      languageOptions: {
        globals: {
          ...globals.browser,
          __TAURI__: "readonly",
          __TAURI_METADATA__: "readonly",
          ...additionalGlobals,
        }
      }
    }
  },
}

/**
 * Compose ESLint configuration from named config blocks
 * @param {object} options - Composition options
 * @param {string[]} options.with - Config names to include
 * @param {string[]} options.without - Config names to exclude (higher precedence)
 * @param {object} options.overrides - Per-config options overrides
 * @returns {Array} ESLint flat config array
 */
export default function(options = {}) {
  const {
    with: includeConfigs = ["lints-js", "lints-jsdoc"],
    without: excludeConfigs = [],
    overrides = {},
  } = options

  const configs = []

  for(const configName of includeConfigs) {
    if(excludeConfigs.includes(configName)) {
      continue
    }

    if(!CONFIGS[configName]) {
      throw new Error(
        `Unknown config: "${configName}". Available: ${Object.keys(CONFIGS).join(", ")}`
      )
    }

    const configOptions = overrides[configName] || {}
    const config = CONFIGS[configName](configOptions)

    configs.push(config)
  }

  return configs
}

/**
 * Export all available config names for reference
 */
export const availableConfigs = Object.keys(CONFIGS)
