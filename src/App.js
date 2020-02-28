import React from 'react';
import {ThemeProvider} from 'styled-components';
import {GridThemeProvider} from 'styled-bootstrap-grid';
import ScrollToTop from '@library/react-router/ScrollToTop';
import gridConfig from '@config/grid';
import {getConfig} from '@config/utils/getConfig';

import RootRouter from './pages/RootRouter';

const App = () => {
    return (
        <ThemeProvider theme={getConfig('site.theme')}>
            <GridThemeProvider gridTheme={gridConfig}>
                <ScrollToTop>
                    <RootRouter/>
                </ScrollToTop>
            </GridThemeProvider>
        </ThemeProvider>
    );
};

export default App;
