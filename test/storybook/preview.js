import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import {GridThemeProvider} from 'styled-bootstrap-grid';
import {isEmpty} from '@utils/equal';

// storybook & plugin
import {addParameters, addDecorator} from '@storybook/react';
import {withConsole} from '@storybook/addon-console';
import {withI18n} from 'storybook-addon-i18n';

// setting
import gridConfig from '@config/grid';
import {serverGenerateConfig} from '@config/utils/getConfig';
import {viewports, i18n} from './addonConfig';

// Setting Global Styles
import './styles/storybook.css';


// Set Config
const siteConfig = serverGenerateConfig(process.env.SITE_CODE);
if(!isEmpty(siteConfig)){

    // Get Site Global Config
    window.__global__ = siteConfig;


    // Option defaults.
    addParameters({
        viewport: viewports,
        i18n: i18n,
        inlineStories: false,
        backgrounds: [
            { name: 'Dark', value: '#333', default: true },
            { name: 'Bright ', value: '#fff' },
            { name: 'Facebook', value: '#3b5998' },
        ],
    });

    // Set intl configuration
    addDecorator(withI18n);

    addDecorator(story => (
        <MemoryRouter initialEntries={['/']}>
            <ThemeProvider theme={siteConfig.site.theme}>
                <GridThemeProvider gridTheme={gridConfig}>
                    {story()}
                </GridThemeProvider>
            </ThemeProvider>
        </MemoryRouter>
    ));

    addDecorator((storyFn, context) => withConsole()(storyFn)(context));

}else{
    throw Error('Site code could not find the site settings, please check .env SITE_CODE and src /config/site.js');
}
