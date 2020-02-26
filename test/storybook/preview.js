import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import {GridThemeProvider} from 'styled-bootstrap-grid';
import {isEmpty} from '@utils/equal';

// storybook & plugin
import {configure, addParameters, addDecorator} from '@storybook/react';
import {themes} from '@storybook/theming';
import {withI18n} from 'storybook-addon-i18n';

// setting
import gridConfig from '@config/grid';
import {generateConfig} from '@config/utils/getConfig';
import {viewports, i18n} from './addonConfig';

// Setting Global Styles
import './styles/storybook.css';

// Option defaults.
addParameters({
    options: {
        theme: themes.dark,
    },
    viewport: viewports,
    i18n: i18n,
});

// Set intl configuration
addDecorator(withI18n);

// Set Config
const siteConfig = generateConfig();
if(!isEmpty(siteConfig)){

    // Get Site Global Config
    window.__global__ = siteConfig;

    addDecorator(story => (
        <MemoryRouter initialEntries={['/']}>
            <ThemeProvider theme={siteConfig.theme}>
                <GridThemeProvider gridTheme={gridConfig}>
                    {story()}
                </GridThemeProvider>
            </ThemeProvider>
        </MemoryRouter>
    ));

    configure([
        require.context('./examples', true, /\.stories\.(js|tsx?|mdx)$/),
        require.context('../../src/resources/components/atoms', true, /\.stories\.(js|tsx?|mdx)$/),
        require.context('../../src/resources/components/molecules', true, /\.stories\.(js|tsx?|mdx)$/),
        require.context('../../src/resources/components/organisms', true, /\.stories\.(js|tsx?|mdx)$/),
    ], module);

}else{
    throw Error('Site code could not find the site settings, please check .env SITE_CODE and src /config/site.js');
}
