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
 *     options: {
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
 *     options: {
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
 * available-configs
 *
 * - lints-js: Core stylistic rules (indent, spacing, quotes, etc.)
 * - lints-jsdoc: JSDoc documentation requirements
 * - languageOptions: Base ECMAScript language configuration
 * - web: Browser globals (window, document, etc.)
 * - node: Node.js globals (process, require, fetch, Headers)
 * - react: React globals (browser + React, ReactDOM)
 * - tauri: Tauri app globals (browser + __TAURI__)
 * - vscode-extension: VSCode extension API (acquireVsCodeApi)
 * - cjs-override: CommonJS file handling (.cjs files)
 * - mjs-override: ES Module file handling (.mjs files)
 */

/**
 * Available config block names
 *
 * @typedef {"lints-js" | "lints-jsdoc" | "languageOptions" | "web" | "node" | "react" | "docusaurus" | "starlight" | "tauri" | "vscode-extension" | "cjs-override" | "mjs-override"} ConfigName
 */

/**
 * ESLint rule severity or configuration
 *
 * @typedef {("off" | "warn" | "error" | 0 | 1 | 2 | [("off" | "warn" | "error" | 0 | 1 | 2), ...Array<string | number | boolean | object>])} RuleEntry
 */

/**
 * ESLint rule overrides map
 *
 * @typedef {{[ruleName: string]: RuleEntry}} RuleOverrides
 */

/**
 * Options for the lints-js config block
 *
 * @typedef {object} LintsJsOptions
 * @property {string | Array<string>} [files] - Glob patterns for files to lint
 * @property {string | Array<string>} [ignores] - Glob patterns for files to ignore
 * @property {number} [indent] - Indentation width (default: 2)
 * @property {number} [maxLen] - Maximum line length (default: 80)
 * @property {RuleOverrides} [overrides] - ESLint rule overrides
 */

/**
 * Options for the lints-jsdoc config block
 *
 * @typedef {object} LintsJsdocOptions
 * @property {string | Array<string>} [files] - Glob patterns for files to lint
 * @property {string | Array<string>} [ignores] - Glob patterns for files to ignore
 * @property {RuleOverrides} [overrides] - ESLint rule overrides
 */

/**
 * Options for the languageOptions config block
 *
 * @typedef {object} LanguageOptionsOptions
 * @property {string | number} [ecmaVersion] - ECMAScript version (default: "latest")
 * @property {"module" | "script" | "commonjs"} [sourceType] - Source type (default: "module")
 * @property {{[name: string]: "readonly" | "writable" | "off"}} [additionalGlobals] - Extra global variables
 */

/**
 * Options for environment config blocks (web, node, react, tauri, vscode-extension)
 *
 * @typedef {object} EnvironmentOptions
 * @property {string | Array<string>} [files] - Glob patterns for files to lint
 * @property {string | Array<string>} [ignores] - Glob patterns for files to ignore
 * @property {{[name: string]: "readonly" | "writable" | "off"}} [additionalGlobals] - Extra global variables
 */

/**
 * Options for module override config blocks (cjs-override, mjs-override)
 *
 * @typedef {object} ModuleOverrideOptions
 * @property {string | Array<string>} [files] - Glob patterns for files to lint
 * @property {string | Array<string>} [ignores] - Glob patterns for files to ignore
 */

/**
 * Per-config options map
 *
 * @typedef {{"lints-js"?: LintsJsOptions, "lints-jsdoc"?: LintsJsdocOptions, languageOptions?: LanguageOptionsOptions, web?: EnvironmentOptions, node?: EnvironmentOptions, react?: EnvironmentOptions, docusaurus?: EnvironmentOptions, starlight?: EnvironmentOptions, tauri?: EnvironmentOptions, "vscode-extension"?: EnvironmentOptions, "cjs-override"?: ModuleOverrideOptions, "mjs-override"?: ModuleOverrideOptions}} PerConfigOptions
 */

/**
 * Options for composing ESLint configurations
 *
 * @typedef {object} UglierOptions
 * @property {Array<ConfigName>} [with] - Config names to include (default: ["lints-js", "lints-jsdoc"])
 * @property {Array<ConfigName>} [without] - Config names to exclude (higher precedence than `with`)
 * @property {PerConfigOptions} [options] - Per-config options
 */

/**
 * An ESLint flat config object
 *
 * @typedef {object} FlatConfig
 * @property {string} [name] - Config name for debugging
 * @property {Array<string | string[]>} [files] - Glob patterns for files this config applies to
 * @property {Array<string>} [ignores] - Glob patterns for files to ignore
 * @property {{[pluginName: string]: object}} [plugins] - ESLint plugins
 * @property {{[ruleName: string]: RuleEntry}} [rules] - ESLint rules
 * @property {object} [languageOptions] - Language options
 * @property {object} [settings] - Shared settings
 */

import jsdoc from "eslint-plugin-jsdoc"
import astro from "eslint-plugin-astro"
import stylistic from "@stylistic/eslint-plugin"
import globals from "globals"

/**
 * Registry of named configuration blocks.
 * Each config is a factory function that returns an ESLint flat config object.
 *
 * @type {{[K in ConfigName]: (options?: object) => FlatConfig | Array<FlatConfig>}}
 */
const CONFIGS = {
  /**
   * Core stylistic linting rules
   *
   * @param {LintsJsOptions} options - Configuration options
   * @returns {FlatConfig} ESLint flat config object
   */
  "lints-js": (options = {}) => {
    const {
      files = ["src/**/*.{js,mjs,cjs}"],
      ignores = [],
      indent = 2,
      maxLen = 80,
      overrides = {},
    } = options

    return {
      name: "gesslar/uglier/lints-js",
      files: Array.isArray(files) ? files : [files],
      ignores: Array.isArray(ignores) ? ignores : [ignores],
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
            with: {before: true, after: true},
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
          allowTemplateLiterals: "always",
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
        "@stylistic/no-extra-semi": "error",
        ...overrides,
      }
    }
  },

  /**
   * JSDoc linting rules
   *
   * @param {LintsJsdocOptions} options - Configuration options
   * @returns {FlatConfig} ESLint flat config object
   */
  "lints-jsdoc": (options = {}) => {
    const {
      files = ["src/**/*.{js,mjs,cjs}"],
      ignores = [],
      overrides = {},
    } = options

    return {
      name: "gesslar/uglier/lints-jsdoc",
      files: Array.isArray(files) ? files : [files],
      ignores: Array.isArray(ignores) ? ignores : [ignores],
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
        "jsdoc/valid-types": "error",
        "jsdoc/no-undefined-types": "error",
        "jsdoc/require-property": "error",
        ...overrides,
      },
      settings: {
        jsdoc: {
          mode: "typescript"
        }
      }
    }
  },

  /**
   * Language options configuration
   *
   * @param {LanguageOptionsOptions} options - Configuration options
   * @returns {FlatConfig} ESLint flat config object
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
   *
   * @param {EnvironmentOptions} options - Configuration options
   * @returns {FlatConfig} ESLint flat config object
   */
  "web": (options = {}) => {
    const {
      files = ["src/**/*.{js,mjs,cjs}"],
      ignores = [],
      additionalGlobals = {},
    } = options

    return {
      name: "gesslar/uglier/web",
      files: Array.isArray(files) ? files : [files],
      ignores: Array.isArray(ignores) ? ignores : [ignores],
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
   *
   * @param {EnvironmentOptions} options - Configuration options
   * @returns {FlatConfig} ESLint flat config object
   */
  "vscode-extension": (options = {}) => {
    const {
      files = ["src/**/*.{js,mjs,cjs}"],
      ignores = [],
      additionalGlobals = {},
    } = options

    return {
      name: "gesslar/uglier/vscode-extension",
      files: Array.isArray(files) ? files : [files],
      ignores: Array.isArray(ignores) ? ignores : [ignores],
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
   *
   * @param {EnvironmentOptions} options - Configuration options
   * @returns {FlatConfig} ESLint flat config object
   */
  "node": (options = {}) => {
    const {
      files = ["src/**/*.{js,mjs,cjs}"],
      ignores = [],
      additionalGlobals = {},
    } = options

    return {
      name: "gesslar/uglier/node",
      files: Array.isArray(files) ? files : [files],
      ignores: Array.isArray(ignores) ? ignores : [ignores],
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
   * React application globals
   *
   * @param {EnvironmentOptions} options - Configuration options
   * @returns {FlatConfig} ESLint flat config object
   */
  "react": (options = {}) => {
    const {
      files = ["src/**/*.{js,jsx,mjs,cjs}"],
      ignores = [],
      additionalGlobals = {},
    } = options

    return {
      name: "gesslar/uglier/react",
      files: Array.isArray(files) ? files : [files],
      ignores: Array.isArray(ignores) ? ignores : [ignores],
      languageOptions: {
        globals: {
          ...globals.browser,
          React: "readonly",
          ReactDOM: "readonly",
          ...additionalGlobals,
        }
      }
    }
  },

  /**
   * CommonJS file override
   *
   * @param {ModuleOverrideOptions} options - Configuration options
   * @returns {FlatConfig} ESLint flat config object
   */
  "cjs-override": (options = {}) => {
    const {
      files = ["**/*.cjs"],
      ignores = [],
    } = options

    return {
      name: "gesslar/uglier/cjs-override",
      files: Array.isArray(files) ? files : [files],
      ignores: Array.isArray(ignores) ? ignores : [ignores],
      languageOptions: {
        sourceType: "script",
        ecmaVersion: 2021
      },
    }
  },

  /**
   * ES Module file override
   *
   * @param {ModuleOverrideOptions} options - Configuration options
   * @returns {FlatConfig} ESLint flat config object
   */
  "mjs-override": (options = {}) => {
    const {
      files = ["**/*.mjs"],
      ignores = [],
    } = options

    return {
      name: "gesslar/uglier/mjs-override",
      files: Array.isArray(files) ? files : [files],
      ignores: Array.isArray(ignores) ? ignores : [ignores],
      languageOptions: {
        sourceType: "module",
        ecmaVersion: 2021
      }
    }
  },

  /**
   * Docusaurus documentation site globals (browser + React + Docusaurus)
   *
   * @param {EnvironmentOptions} options - Configuration options
   * @returns {FlatConfig} ESLint flat config object
   */
  "docusaurus": (options = {}) => {
    const {
      files = ["src/**/*.{js,jsx,mjs,cjs}", "docs/**/*.{js,jsx,mjs,cjs}"],
      ignores = [],
      additionalGlobals = {},
    } = options

    return {
      name: "gesslar/uglier/docusaurus",
      files: Array.isArray(files) ? files : [files],
      ignores: Array.isArray(ignores) ? ignores : [ignores],
      languageOptions: {
        globals: {
          ...globals.browser,
          React: "readonly",
          ReactDOM: "readonly",
          ...additionalGlobals,
        }
      }
    }
  },

  /**
   * Starlight documentation site (browser + Astro + eslint-plugin-astro)
   *
   * @param {EnvironmentOptions} options - Configuration options
   * @returns {Array<FlatConfig>} ESLint flat config array
   */
  "starlight": (options = {}) => {
    const {
      files = ["src/**/*.{js,mjs,cjs}", "docs/**/*.{js,mjs,cjs}"],
      ignores = [],
      additionalGlobals = {},
    } = options

    return [
      ...astro.configs["flat/recommended"],
      {
        name: "gesslar/uglier/starlight",
        files: Array.isArray(files) ? files : [files],
        ignores: Array.isArray(ignores) ? ignores : [ignores],
        languageOptions: {
          globals: {
            ...globals.browser,
            ...additionalGlobals,
          }
        }
      },
    ]
  },

  /**
   * Tauri application configuration (browser + Tauri APIs, no Node.js)
   *
   * @param {EnvironmentOptions} options - Configuration options
   * @returns {FlatConfig} ESLint flat config object
   */
  "tauri": (options = {}) => {
    const {
      files = ["src/**/*.{js,mjs,cjs}"],
      ignores = [],
      additionalGlobals = {},
    } = options

    return {
      name: "gesslar/uglier/tauri",
      files: Array.isArray(files) ? files : [files],
      ignores: Array.isArray(ignores) ? ignores : [ignores],
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
 *
 * @param {UglierOptions} [options] - Composition options
 * @returns {Array<FlatConfig>} ESLint flat config array
 */
export default function(options = {}) {
  const {
    with: includeConfigs = ["lints-js", "lints-jsdoc"],
    without: excludeConfigs = [],
    options: perConfigOptions = {},
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

    const configOptions = perConfigOptions[configName] || {}
    const config = CONFIGS[configName](configOptions)

    if(Array.isArray(config))
      configs.push(...config)
    else
      configs.push(config)
  }

  return configs
}

/**
 * All available config block names
 *
 * @type {Array<ConfigName>}
 */
export const availableConfigs =
  /** @type {Array<ConfigName>} */ (Object.keys(CONFIGS))
