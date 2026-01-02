import uglify from "@gesslar/uglier"

export default [
  ...uglify({
    with:
      [
        "lints-js",

        "node",   // extra spaces and blank lines

        "react",    // because why not
      ]
    ,
    overrides:
    {
      "node":
      {
        files:
        ["backend/**/*.js"]
      }
      ,
      "react":
      {
        files: ["frontend/**/*.jsx"]
      }
    }
  })
]
