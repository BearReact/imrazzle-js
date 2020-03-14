import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GridThemeProvider } from '@styled-bs-grid';
import { ScrollTopProvider } from '@router';
import gridConfig from '@config/grid';
import { getConfig } from '@config/utils/getConfig';
import RootRouter from './pages/RootRouter';
const App = () => {
    return (React.createElement(ThemeProvider, { theme: getConfig('site.theme') },
        React.createElement(GridThemeProvider, { gridTheme: gridConfig },
            React.createElement(ScrollTopProvider, null,
                React.createElement(RootRouter, null)))));
};
export default App;
//# sourceMappingURL=App.js.map