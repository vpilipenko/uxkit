const pkg = require('./package.json');

const rules = require('./configs/rules.config');
const { aliases } = require('./configs/aliases.config');
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
    entry: './src/index.js',
    output: {
        filename: pkg.main,
        library: '',

        libraryTarget: 'commonjs'
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: rules
    },
    externals:{
        "react": "React",
        "react-dom": "ReactDOM"
      },
    resolve: {
        alias: aliases,
        extensions: ['.js', '.jsx' ],
        modules: ['node_modules'],
    },
    plugins: [
        process.env.NODE_ENV === 'production' && new MiniCssExtractPlugin({
            filename: '[name]_[contenthash].css',
        }),
    ].filter(f => f),
};