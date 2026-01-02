import uglify from "@gesslar/uglier"

export default [
  ...uglify({
    with: [
      "lints-js", // single quotes
      "lints-jsdoc", // double quotes
      "node", // mixed quotes
      "web",
      "react",
    ],
    overrides: {
      "node": {
        files: ["server/**/*.js"]
      },
      "react": {
        files: ["client/**/*.jsx"]
      }
    }
  })
]
