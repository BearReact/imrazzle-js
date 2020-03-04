module.exports = {
    stories: [
        './examples/*.stories.(js|mdx)',
        '../../src/resources/components/**/*.stories.(js|mdx)',
    ],
    addons: [
        '@storybook/addon-links/register',
        '@storybook/addon-actions/register',
        '@storybook/addon-viewport/register',
        '@storybook/addon-notes/register-panel',
        '@storybook/addon-docs',
        'storybook-addon-i18n/register',
    ],
};
