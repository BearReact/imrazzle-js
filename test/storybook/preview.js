/* eslint-disable */
import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import {configure, addParameters, addDecorator} from '@storybook/react';
import {withI18n} from "storybook-addon-i18n";
import {themes} from '@storybook/theming';
import {viewports, i18n} from './addonConfig';

// Option defaults.
addParameters({
    options: {
        theme: themes.dark
    },
    viewport: viewports,
    i18n: i18n
});

// Set intl configuration
addDecorator(withI18n);

addParameters({
    notes: 'Global Notes',
});

addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>
        <ThemeProvider theme={{
            background: '#000'
        }}>{story()}</ThemeProvider>
    </MemoryRouter>
));


configure([
    require.context('./examples', true, /\.stories\.(js|tsx?|mdx)$/),
    require.context('../../src/resources/components/atoms', true, /\.stories\.(js|tsx?|mdx)$/),
    require.context('../../src/resources/components/molecules', true, /\.stories\.(js|tsx?|mdx)$/),
    require.context('../../src/resources/components/organisms', true, /\.stories\.(js|tsx?|mdx)$/),
], module);
