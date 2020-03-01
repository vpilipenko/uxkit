const path = require('path')

module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.module\.styl$/,
    use: ['style-loader', {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        modules: true,
        // localIdentName: '[name]__[local]___[hash:base64:5]'
      }
    }, 'stylus-loader'],
    include: path.resolve(__dirname, '../'),
  });

  return config
}