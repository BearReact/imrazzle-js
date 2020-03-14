import React from 'react';
import { ThemeProvider } from 'styled-components';
import merge from 'lodash/merge';
import { defaultTheme, themeName } from '../../config';
export default (props) => {
    const { gridTheme = {}, children } = props;
    const composeGridTheme = merge(defaultTheme, gridTheme);
    return React.createElement(ThemeProvider, { theme: { [themeName]: composeGridTheme } }, children);
};
//# sourceMappingURL=ThemeProvider.js.map