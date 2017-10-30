import coffeescript from "rollup-plugin-coffee-script";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import uglify from "rollup-plugin-uglify";
import filesize from "rollup-plugin-filesize";
import path from "path";
import nib from "nib";
import stylus from "stylus";
import cssnano from "cssnano";
import fs from "fs";
import { minify } from "uglify-es";

var inputs = {
  // Long term we want to get rid of the separate entry points and
  // instead have one entry point that behaves properly according to environment.
  node: path.join(__dirname, "lib", "coffeescript", "node.coffee"),
  browser: path.join(__dirname, "lib", "coffeescript", "browser.coffee"),
  stylus: path.join(__dirname, "lib", "stylus", "sgn.styl")
};

var outputs = {
  // Exclusive bundles(external `require`s untouched), for node, webpack etc.
  jsCJS: path.join(__dirname, "dist", "sgn-sdk.cjs.js"), // CommonJS
  jsES: path.join(__dirname, "dist", "sgn-sdk.es.js"), // ES Module
  // Inclusive bundles(external `require`s resolved), for browsers etc.
  jsBrowser: path.join(__dirname, "dist", "sgn-sdk.js"),
  jsBrowserMin: path.join(__dirname, "dist", "sgn-sdk.min.js"),
  css: path.join(__dirname, "dist", "sgn-sdk.css"),
  cssMin: path.join(__dirname, "dist", "sgn-sdk.min.css")
};

const stylusate = cb =>
  stylus(fs.readFileSync(inputs.stylus, "utf8").toString())
    .set("include css", true)
    .include(path.join(__dirname, "lib", "stylus"))
    .include(nib.path)
    .render(function(err, css) {
      if (!err) {
        cb(css);
      } else {
        console.log(err);
      }
    });

export default [
  {
    input: inputs.node,
    output: {
      file: outputs.jsCJS,
      format: "cjs"
    },
    plugins: [
      coffeescript(),
      commonjs({
        extensions: [".js", ".coffee"]
      })
    ]
  },
  {
    input: inputs.node,
    output: {
      file: outputs.jsES,
      format: "es"
    },
    plugins: [
      coffeescript(),
      commonjs({
        extensions: [".js", ".coffee"]
      })
    ]
  },
  {
    input: inputs.browser,
    output: {
      file: outputs.jsBrowser,
      format: "umd",
      name: "SGN"
    },
    plugins: [
      coffeescript(),
      resolve({
        jsnext: true,
        main: true,
        browser: true,
        preferBuiltins: false
      }),
      commonjs({
        extensions: [".js", ".coffee"]
      }),
      filesize(),
      {
        onwrite: () => stylusate(css => fs.writeFileSync(outputs.css, css))
      }
    ]
  },
  {
    input: inputs.browser,
    output: {
      file: outputs.jsBrowserMin,
      format: "umd",
      name: "SGN"
    },
    plugins: [
      coffeescript(),
      resolve({
        jsnext: true,
        main: true,
        browser: true,
        preferBuiltins: false
      }),
      commonjs({
        extensions: [".js", ".coffee"]
      }),
      uglify({}, minify),
      filesize(),
      {
        onwrite: () =>
          stylusate(async css => {
            const smolcss = await cssnano.process(css);
            fs.writeFileSync(outputs.cssMin, smolcss);
          })
      }
    ]
  }
];
