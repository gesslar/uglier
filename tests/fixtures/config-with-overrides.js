import uglify from "@gesslar/uglier"

export default [
  ...uglify({
    with: [
      "lints-js", // default files: ["**/*.{js,mjs,cjs}"]
      "node", // default files: ["**/*.{js,mjs,cjs}"]
      "react", // default files: ["**/*.{js,jsx,mjs,cjs}"]
    ],
    overrides: {
      "react": {
        files: ["client/**/*.js"]
      },
      "node": {
        files: ["server/**/*.js"]
      }
    }
  })
]
