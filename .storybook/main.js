const path = require('path')

module.exports = {
  stories: ['../lib/**/*.story.(js|mdx)'],
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-docs'
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    config.module.rules.push({
      test: /\.(css|styl)$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            url: true,
            modules: {
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }
        },
        {
          loader: 'stylus-loader?resolve url'
        },
      ],
    })

    config.module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    })

    

    // Return the altered config
    return config;
  },
}