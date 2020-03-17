const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    node: {
        fs: 'empty',
    },
    resolve: {
        plugins: [new TsconfigPathsPlugin({/* options: see below */})],
        extensions: ['.js','.jsx', '.ts', '.tsx'],
    },
};
