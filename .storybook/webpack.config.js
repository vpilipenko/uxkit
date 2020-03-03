const path = require('path')

module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /(\.module\.styl$|\.css$)/,
    use: ['style-loader', {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        modules: true,
      }
    }, 'stylus-loader'],
    include: path.resolve(__dirname, '../'),
  })

  config.module.rules.push({
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader'
    },
  })

  config.resolve.modules = [
    path.resolve(__dirname, 'node_modules'),
    path.resolve(__dirname, 'lib/core')
  ]

  config.resolve.symlinks = true

  config.resolve.extensions.push('.js', '.jsx');

  return config
}

// module.exports = ({ config }) => {
//   config.module.rules = [
//     {
//         exclude: /node_modules/,
//         test: /\.(scss)$/,
//         use: [
//             'style-loader',
//             'css-loader',
//             {
//                 loader: 'postcss-loader',
//                 options: {
//                     plugins: [
//                         autoprefixer({
//                             grid: "autoplace",
//                         }),
//                     ],
//                 },
//             },
//             'sass-loader',
//         ],
//     },
//     {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//             loader: "babel-loader",
//             options: {
//                 presets: ['@babel/preset-env', '@babel/react']
//             }
//         }
//     }
//   ]

//   config.resolve.alias = {
//     '@vpilipenko/button': path.resolve(__dirname, '../lib/core/Button/src/index'),
//     '@vpilipenko/amount': path.resolve(__dirname, '../lib/core/Amount/src/index'),
//     '@vpilipenko/icons': path.resolve(__dirname, '../lib/core/Icons/src/index'),
//     '@vpilipenko/icon': path.resolve(__dirname, '../lib/core/Icon/src/index'),
//   }

//   return config;
// };