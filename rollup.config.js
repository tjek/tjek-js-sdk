import coffeescript from "rollup-plugin-coffee-script";
import commonjs from "rollup-plugin-commonjs";

export default [
  {
    input: "./lib/coffeescript/node.coffee",
    output: {
      file: "dist/sgn-sdk.cjs.js",
      format: "cjs"
    },
    plugins: [
      coffeescript(),
      commonjs({
        extensions: [".js", ".coffee"]
      })
    ]
  }
];
