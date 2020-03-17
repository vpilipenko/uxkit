import pkg from './package.json'

import path from 'path';

import babel from "rollup-plugin-babel"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import postcss from 'rollup-plugin-postcss'
import minify from 'rollup-plugin-babel-minify'

const externals = [
  /\@vpilipenko/,
  /react/,
  /react\-dom/,
  /prop\-types/,
  /classnames/,
  /react\-popper/,
  /react\-day\-picker/,
  /moment/,
  /react\-input\-mask/,
]


export default {
  input: 'src/index.js',
  output: {
    file: `./dist/${pkg.main}`,
    format: 'cjs',
    exports: 'named',
  },
  external: id => {
    return externals.some(ext => {
      return ext.test(id)
    })
  },
  plugins: [
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
        path.resolve(__dirname, './node_modules/'),
        path.resolve(__dirname, './lib/core/'),
      ],
      sourceMap: false
    }),
    postcss({
      extract: './dist/styles.css',
      extensions: ['.css', '.styl'],
      minimize: true,
    }),
    minify(),
  ],
};