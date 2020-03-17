module.exports = {
  stories: ['../lib/**/*.story.(js|mdx)'],
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-docs',
    'storybook-readme'
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    config.module.rules = config.module.rules.reduce((acc, rule) => {
      if (rule.test.toString().includes('.css')) {
        acc.push({
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        })
      } else {
        acc.push(rule)
      }
      return acc
    }, [])


    config.module.rules.push({
      test: /\.(styl)$/,
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