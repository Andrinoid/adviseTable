const pkg = require('./package.json');
const resolve = require('@rollup/plugin-node-resolve');
const babel = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');

module.exports = {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'esm',
      exports: 'named',
      sourcemap: true,
      strict: false
    }
  ],
  plugins: [babel({ babelHelpers: 'bundled' }), resolve(), commonjs()],
  external: ['react', 'react-dom']
}