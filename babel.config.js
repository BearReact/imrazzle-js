module.exports = {
    presets: [
        'razzle/babel',
        '@babel/typescript',
    ],
    plugins: [
        'babel-plugin-styled-components',
        '@babel/plugin-proposal-class-properties',
    ],
    env: {
        production: {
            plugins: [
                ['babel-plugin-styled-components', {"displayName": false, fileName: false}]
            ],
        },
    },
};
