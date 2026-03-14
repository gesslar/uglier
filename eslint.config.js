/** @type {import("@gesslar/uglier").UglierOptions} */

import uglify from "@gesslar/uglier"

export default [
  {ignores: ["docs/**"]},
  ...uglify({
    with: [
      "lints-js",
      "lints-jsdoc",
      "node",
    ],
  })
]
