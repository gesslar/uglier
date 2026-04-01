/**
 * Compose ESLint configuration from named config blocks
 *
 * @param {UglierOptions} [options] - Composition options
 * @returns {Array<FlatConfig>} ESLint flat config array
 */
export default function _default(options?: UglierOptions): Array<FlatConfig>;
/**
 * All available config block names
 *
 * @type {Array<ConfigName>}
 */
export const availableConfigs: Array<ConfigName>;
/**
 * Available config block names
 */
export type ConfigName = "lints-js" | "lints-jsdoc" | "languageOptions" | "web" | "node" | "react" | "docusaurus" | "starlight" | "tauri" | "vscode-extension" | "cjs-override" | "mjs-override";
/**
 * ESLint rule severity or configuration
 */
export type RuleEntry = ("off" | "warn" | "error" | 0 | 1 | 2 | [("off" | "warn" | "error" | 0 | 1 | 2), ...Array<string | number | boolean | object>]);
/**
 * ESLint rule overrides map
 */
export type RuleOverrides = {
    [ruleName: string]: RuleEntry;
};
/**
 * Options for the lints-js config block
 */
export type LintsJsOptions = {
    /**
     * - Glob patterns for files to lint
     */
    files?: string | Array<string>;
    /**
     * - Glob patterns for files to ignore
     */
    ignores?: string | Array<string>;
    /**
     * - Indentation width (default: 2)
     */
    indent?: number;
    /**
     * - Maximum line length (default: 80)
     */
    maxLen?: number;
    /**
     * - ESLint rule overrides
     */
    overrides?: RuleOverrides;
};
/**
 * Options for the lints-jsdoc config block
 */
export type LintsJsdocOptions = {
    /**
     * - Glob patterns for files to lint
     */
    files?: string | Array<string>;
    /**
     * - Glob patterns for files to ignore
     */
    ignores?: string | Array<string>;
    /**
     * - ESLint rule overrides
     */
    overrides?: RuleOverrides;
};
/**
 * Options for the languageOptions config block
 */
export type LanguageOptionsOptions = {
    /**
     * - ECMAScript version (default: "latest")
     */
    ecmaVersion?: string | number;
    /**
     * - Source type (default: "module")
     */
    sourceType?: "module" | "script" | "commonjs";
    /**
     * - Extra global variables
     */
    additionalGlobals?: {
        [name: string]: "readonly" | "writable" | "off";
    };
};
/**
 * Options for environment config blocks (web, node, react, tauri, vscode-extension)
 */
export type EnvironmentOptions = {
    /**
     * - Glob patterns for files to lint
     */
    files?: string | Array<string>;
    /**
     * - Glob patterns for files to ignore
     */
    ignores?: string | Array<string>;
    /**
     * - Extra global variables
     */
    additionalGlobals?: {
        [name: string]: "readonly" | "writable" | "off";
    };
};
/**
 * Options for module override config blocks (cjs-override, mjs-override)
 */
export type ModuleOverrideOptions = {
    /**
     * - Glob patterns for files to lint
     */
    files?: string | Array<string>;
    /**
     * - Glob patterns for files to ignore
     */
    ignores?: string | Array<string>;
};
/**
 * Per-config options map
 */
export type PerConfigOptions = {
    "lints-js"?: LintsJsOptions;
    "lints-jsdoc"?: LintsJsdocOptions;
    languageOptions?: LanguageOptionsOptions;
    web?: EnvironmentOptions;
    node?: EnvironmentOptions;
    react?: EnvironmentOptions;
    docusaurus?: EnvironmentOptions;
    starlight?: EnvironmentOptions;
    tauri?: EnvironmentOptions;
    "vscode-extension"?: EnvironmentOptions;
    "cjs-override"?: ModuleOverrideOptions;
    "mjs-override"?: ModuleOverrideOptions;
};
/**
 * Options for composing ESLint configurations
 */
export type UglierOptions = {
    /**
     * - Config names to include (default: ["lints-js", "lints-jsdoc"])
     */
    with?: Array<ConfigName>;
    /**
     * - Config names to exclude (higher precedence than `with`)
     */
    without?: Array<ConfigName>;
    /**
     * - Per-config options
     */
    options?: PerConfigOptions;
};
/**
 * An ESLint flat config object
 */
export type FlatConfig = {
    /**
     * - Config name for debugging
     */
    name?: string;
    /**
     * - Glob patterns for files this config applies to
     */
    files?: Array<string | string[]>;
    /**
     * - Glob patterns for files to ignore
     */
    ignores?: Array<string>;
    /**
     * - ESLint plugins
     */
    plugins?: {
        [pluginName: string]: object;
    };
    /**
     * - ESLint rules
     */
    rules?: {
        [ruleName: string]: RuleEntry;
    };
    /**
     * - Language options
     */
    languageOptions?: object;
    /**
     * - Shared settings
     */
    settings?: object;
};
