module.exports = {
    stories: [
        './examples/*.stories.js',
        '../../src/resources/components/**/*.stories.js',
    ],
    addons: [
        '@storybook/addon-links/register',
        '@storybook/addon-actions/register',
        '@storybook/addon-viewport/register',
        '@storybook/addon-notes/register',
        'storybook-addon-i18n/register',
        '@storybook/addon-backgrounds/register',
    ],
};
