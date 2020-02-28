import pkg from './package.json'

import path from 'path';

import babel from "rollup-plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import postcss from 'rollup-plugin-postcss'
import minify from 'rollup-plugin-babel-minify'

import stylusCssModules from './stylus-plugin'

export default {
  input: 'src/index.js',
  output: {
    file: `./dist/${pkg.main}`,
    format: 'cjs',
    compact: true,
  },
  external: [
    'react',
    'react-proptypes',
  ],
  plugins: [
    babel({
      configFile: path.resolve(__dirname, 'babel.config.js'),
      exclude: /node_modules/,
      extensions: [".js", ".jsx"],
    }),
    commonjs({
      include: /node_modules/,
      namedExports: { 'react': ['Component', 'createElement', 'cloneElement'] },
    }),
    stylusCssModules({
      sourceMap: false,
      output: (css) => {
        return postcss([
          // postcss' plugins...
        ]).process(css, {
          map: true
        }).then((result) => {
          fs.writeFileSync('./dist/styles.css', result.css);
        });
      }
    }),
    resolve(),
    minify(),
  ],
};