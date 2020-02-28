const rules = require('../configs/rules.config');
const { aliases } = require('../configs/aliases.config');

const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = (baseConfig, env, defaultConfig) => {
    defaultConfig.module.rules = rules;
    defaultConfig.resolve.alias = aliases;
    defaultConfig.plugins = [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash].css',
        }),
    ];

    return defaultConfig;
};
