import pkg from './package.json'

import path from 'path';

import babel from "rollup-plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import postcss from 'rollup-plugin-postcss'
import minify from 'rollup-plugin-babel-minify'


export default {
  input: 'src/index.js',
  output: {
    file: `./dist/${pkg.main}`,
    format: 'cjs',
    exports: 'named',
  },
  external: [
    'react',
    'react-dom',
    'prop-types',
  ],
  plugins: [
    babel({
      configFile: path.resolve(__dirname, 'babel.config.js'),
      exclude: /node_modules/,
      extensions: [".js", ".jsx"],
    }),
    resolve({
      extensions: ['.jsx', '.js', '.json'],
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
      minimize: true,
    }),
    minify(),
  ],
};