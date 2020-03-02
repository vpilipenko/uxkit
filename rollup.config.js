import pkg from './package.json'

import path from 'path';

import babel from "rollup-plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import postcss from 'postcss'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'
import minify from 'rollup-plugin-babel-minify'
import stylusCssModules from './stylus-plugin'

import fs from 'fs';

export default {
  input: 'src/index.js',
  output: {
    file: `./dist/${pkg.main}`,
    format: 'cjs',
    exports: 'named',
    // compact: true,
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
      // namedExports: { 'react': ['Component', 'createElement', 'cloneElement'] },
    }),
    stylusCssModules({
      sourceMap: false,
      output: (css) => {
        return postcss([
          autoprefixer,
          cssnano({
            preset: 'default',
          }),
        ])
          .process(css, {
            from: undefined,
            map: false
          })
          .then((result) => {
            if (!fs.existsSync('./dist')) {
              fs.mkdirSync('./dist')
            }
            fs.writeFileSync('./dist/styles.css', result.css);
          });
      }
    }),
    minify(),
  ],
};