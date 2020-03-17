const path = require("path");
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
            {
                test: /\.(ts|tsx)$/,
                loader: require.resolve("awesome-typescript-loader"),
            },

            // {
            //     test: /\.(ts|tsx)$/,
            //     use: [
            //         {
            //             loader: require.resolve('ts-loader'),
            //         },
            //         // Optional
            //         {
            //             loader: require.resolve('react-docgen-typescript-loader'),
            //             options: {
            //                 // Provide the path to your tsconfig.json so that your stories can
            //                 // display types from outside each individual story.
            //                 tsconfigPath: path.resolve(__dirname, "../../tsconfig.json"),
            //             },
            //         },
            //     ],
            // }
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx'],
    }
});
