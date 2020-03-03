const webpackBase = require('../../webpack.config');

module.exports = {
    module: {
        rules: [
            {
                // Preprocess our own .css files
                // This is the place to add your own loaders (e.g. sass/less etc.)
                // for a list of loaders, see https://webpack.js.org/loaders/#styling
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
            // {
            //     test: /\.scss$/,
            //     loaders: ['style-loader', 'css-loader', 'sass-loader'],
            //     include: path.resolve(__dirname, '../../'),
            // },
        ],
    },
    node: webpackBase.node,
    resolve: {
        alias: {
            ...webpackBase.resolve.alias,
        },
    },
};
