module.exports = {
    presets: [
        '@babel/react',
        ['@babel/preset-env', {'modules': false}],
    ],
    plugins: [
        [
            'babel-plugin-styled-components', {'ssr': false},
        ],
        '@babel/plugin-proposal-class-properties',
    ],
};
