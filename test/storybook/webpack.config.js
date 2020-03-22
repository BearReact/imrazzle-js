const merge = require('lodash/merge');
const webpackBase = require('../../webpack.config');

module.exports = merge(webpackBase, {
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                },
            },
            {
                test: /\.css$/,
                exclude: /node_modules(?!\/@storybook\/addon-info)/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
});
