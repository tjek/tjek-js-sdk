import coffeescript from "rollup-plugin-coffee-script";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import uglify from "rollup-plugin-uglify";
import path from "path";
import { minify } from "uglify-es";
import babel from "rollup-plugin-babel";
import string from "rollup-plugin-string";
import replace from "rollup-plugin-replace";
import json from "rollup-plugin-json";

var input = path.join(__dirname, "lib", "coffeescript", "browser.coffee");

var outputs = {
  // Exclusive bundles(external `require`s untouched), for node, webpack etc.
  jsCJS: path.join(__dirname, "dist", "sgn-sdk.cjs.js"), // CommonJS
  jsES: path.join(__dirname, "dist", "sgn-sdk.es.js"), // ES Module
  // Inclusive bundles(external `require`s resolved), for browsers etc.
  jsBrowser: path.join(__dirname, "dist", "sgn-sdk.js"),
  jsBrowserMin: path.join(__dirname, "dist", "sgn-sdk.min.js")
};

let configs = [
  {
    input,
    output: {
      file: outputs.jsCJS,
      format: "cjs"
    },
    plugins: [
      json(),
      replace({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
      }),
      string({
        include: "lib/graphql/*"
      }),
      coffeescript(),
      commonjs({
        extensions: [".js", ".coffee"]
      }),
      babel({
        exclude: ["node_modules/**", "*.graphql"]
      })
    ]
  },
  {
    input,
    output: {
      file: outputs.jsES,
      format: "es"
    },
    plugins: [
      json(),
      replace({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
      }),
      string({
        include: "lib/graphql/*"
      }),
      coffeescript(),
      commonjs({
        extensions: [".js", ".coffee"]
      }),
      babel({
        exclude: ["node_modules/**", "*.graphql"]
      })
    ]
  },
  {
    input,
    output: {
      file: outputs.jsBrowser,
      format: "umd",
      name: "SGN"
    },
    external: ["url", "child_process", "fs", "http", "https"],
    watch: {
      include: "lib/**"
    },
    plugins: [
      json(),
      replace({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
      }),
      string({
        include: "lib/graphql/*"
      }),
      coffeescript(),
      resolve({
        jsnext: true,
        main: true,
        browser: true,
        preferBuiltins: true
      }),
      commonjs({
        extensions: [".js", ".coffee"]
      }),
      babel({
        exclude: ["node_modules/**", "*.graphql"]
      })
    ]
  },
  {
    input,
    output: {
      file: outputs.jsBrowserMin,
      format: "umd",
      name: "SGN"
    },
    plugins: [
      json(),
      replace({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
      }),
      string({
        include: "lib/graphql/*"
      }),
      coffeescript(),
      resolve({
        jsnext: true,
        main: true,
        browser: true,
        preferBuiltins: true
      }),
      commonjs({
        extensions: [".js", ".coffee"]
      }),
      babel({
        exclude: ["node_modules/**", "*.graphql"]
      }),
      uglify({}, minify)
    ]
  }
];
// Only output unminified browser bundle in development mode
if (process.env.NODE_ENV === "development") {
  configs = [configs[2]];
}

export default configs;
