const merge = require('lodash/merge');
const webpackBase = require('../../webpack.config');

module.exports = merge(webpackBase, {
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules(?!\/@storybook\/addon-info)/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
});
