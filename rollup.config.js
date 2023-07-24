const pkg = require("./package.json");
const resolve = require("@rollup/plugin-node-resolve");
const babel = require("@rollup/plugin-babel");
const commonjs = require("@rollup/plugin-commonjs");
const externalPeer = require("rollup-plugin-peer-deps-external");
const postcss = require("rollup-plugin-postcss");

module.exports = {
  input: "src/components/index.js",
  output: [
    {
      file: pkg.main,
      format: "esm",
      exports: "named",
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    babel({ babelHelpers: "bundled" }),
    resolve(),
    commonjs(),
    externalPeer(),
    postcss({
      extract: true,
    }),
  ],
};
