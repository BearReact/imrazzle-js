import React from 'react';
import {ThemeProvider} from 'styled-components';
import {GridThemeProvider} from '@library/styled-bs-grid';
import ScrollTopProvider from '@library/react-router/ScrollTopProvider';
import gridConfig from '@config/grid';
import {getConfig} from '@config/utils/getConfig';

import RootRouter from './pages/RootRouter';

const App = () => {
    return (
        <ThemeProvider theme={getConfig('site.theme')}>
            <GridThemeProvider gridTheme={gridConfig}>
                <ScrollTopProvider>
                    <RootRouter/>
                </ScrollTopProvider>
            </GridThemeProvider>
        </ThemeProvider>
    );
};

export default App;
