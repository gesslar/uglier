import uglify from "@gesslar/uglier"

// Some comment about why this config exists
// Because reasons

export default [
  // Pre-uglify comment
  ...uglify({
    // Inline comment before with
    with: [
      "lints-js", // JavaScript linting rules with ["**/*.js"] files
      "lints-jsdoc", // JSDoc validation
      "node", // Node.js environment globals
      "web", // Browser globals like window, document
      "react", // React + JSX support
    ], // Trailing comment after with array
    // Comment between properties
    overrides: {
      // Override for Node
      "node": {
        files: ["server/**/*.js", "api/**/*.js"],
        indent: 4
      },
      // Override for React with nested objects
      "react": {
        files: ["client/**/*.{js,jsx}"],
        overrides: {
          "@stylistic/jsx-quotes": ["error", "prefer-double"]
        }
      },
      "web": {
        files: ["public/**/*.js"]
      }
    }
  }),
  // Some custom ESLint config after
  {
    files: ["scripts/**/*.js"],
    rules: {
      "no-console": "off"
    }
  }
]
