module.exports = {
  stories: ['../lib/**/*.story.js'],
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-notes/register',
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    config.module.rules.push({
      test: /\.(css|styl)$/,
      use: [
        process.env.NODE_ENV === 'DEVELOPMENT' && {
          loader: 'style-loader'
        },
        process.env.NODE_ENV === 'PRODUCTION' && MiniCssExtractPlugin.loader,
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
      ].filter(f => f)
    });

    

    // Return the altered config
    return config;
  },
}