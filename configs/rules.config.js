const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const rules = [
    {
        exclude: /node_modules/,
        test: /\.(scss)$/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    plugins: [
                        autoprefixer({
                            grid: "autoplace",
                        }),
                    ],
                },
            },
            'sass-loader',
        ],
    },
    {
        test: /\.(styl)$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '/public/path/to/',
                },
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
        ].filter(f => f),
    },
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: [
                    '@babel/preset-env',
                    '@babel/react'
                ],
                plugins: [
                    ["@babel/plugin-transform-classes", {
                        "loose": true
                    }],
                    [
                        "@babel/plugin-proposal-class-properties",
                        { "loose": true }
                    ],

                    
                    "jsx-control-statements",
                    "@babel/plugin-proposal-export-default-from",
                    // [
                    //   "@babel/plugin-proposal-decorators",
                    //   { "legacy": true }
                    // ],
                    

                ],
            }
        }
    }
];

module.exports = rules;
