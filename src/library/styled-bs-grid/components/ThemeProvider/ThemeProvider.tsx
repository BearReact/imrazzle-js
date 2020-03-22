import React from 'react';
import {ThemeProvider} from 'styled-components';
import {defaultTheme, themeName} from '../../config';
import {themeProps} from './types';

const GridThemeProvider = (props: themeProps) => {
    const {gridTheme = {}, children}: any = props;

    const composeGridTheme = Object.assign({}, defaultTheme, gridTheme);
    return <ThemeProvider theme={{[themeName]: composeGridTheme}}>{children}</ThemeProvider>;
};

export default GridThemeProvider;
