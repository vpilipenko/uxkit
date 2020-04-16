import pkg from './package.json'

import path from 'path';

import babel from "rollup-plugin-babel"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import postcss from 'rollup-plugin-postcss'
// import minify from 'rollup-plugin-babel-minify'
import externals from 'rollup-plugin-node-externals'


export default {
  input: 'src/index.js',
  output: {
    file: `./dist/${pkg.main}`,
    format: 'umd',
    exports: 'named',
    name: pkg.main,
  },
  external: [
    'react',
    'react-dom',
    'prop-types',
    'classnames',
    'react-day-picker',
  ],
  plugins: [
    externals({
      // Make node built-ins external. Optional. Default: true
      builtins: true,
      // Make pkg.dependencies external. Optional. Default: false
      deps: true,
      // Make pkg.peerDependencies external. Optional. Default: true
      peerDeps: true,
    }),
    resolve({
      extensions: ['.jsx', '.js', '.json'],
    }),
    babel({
      configFile: path.resolve(__dirname, 'babel.config.js'),
      exclude: [/node_modules/, path.resolve(__dirname, './lib/core/Select/node_modules')],
      extensions: [".js", ".jsx"],
    }),
    commonjs({
      include: [ 
        /node_modules/, 
        path.resolve(__dirname, './lib/core/'),
      ],
      preserveSymlinks: true,
    }),
    postcss({
      modules: true,
      extract: './dist/styles.css',
      extensions: ['.css', '.styl'],
      // minimize: true,
    }),
    // minify(),
  ],
};