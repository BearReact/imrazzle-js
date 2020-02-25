const path = require('path');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            // CUSTOM PACKAGES:
            '@static': path.resolve(__dirname, 'static'),
            '@lang': path.resolve(__dirname, 'src/resources/lang'),
            '@assets': path.resolve(__dirname, 'src/resources/assets'),
            '@themes': path.resolve(__dirname, 'src/resources/themes'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@components': path.resolve(__dirname, 'src/resources/components'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@library': path.resolve(__dirname, 'src/library'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@config': path.resolve(__dirname, 'src/config'),
            '@middleware': path.resolve(__dirname, 'src/middleware'),
        },
    },
};