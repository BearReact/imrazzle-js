const path = require('path');

module.exports = {
    node: {
        fs: 'empty',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            // CUSTOM PACKAGES:
            '@static': path.resolve(__dirname, 'public/static'),
            '@assets': path.resolve(__dirname, 'src/resources/assets'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@layouts': path.resolve(__dirname, 'src/layouts'),
            '@components': path.resolve(__dirname, 'src/resources/components'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@config': path.resolve(__dirname, 'src/config'),
            '@middleware': path.resolve(__dirname, 'src/middleware'),
            '@test': path.resolve(__dirname, 'test'),
            // library
            // '@library': path.resolve(__dirname, 'src/library'),
            '@store': path.resolve(__dirname, 'src/library/redux/store'),
            '@router': path.resolve(__dirname, 'src/library/react-router'),
            '@styled-bs-grid': path.resolve(__dirname, 'src/library/styled-bs-grid'),
            '@i18n': path.resolve(__dirname, 'src/library/intl'),
        },
    },
};
