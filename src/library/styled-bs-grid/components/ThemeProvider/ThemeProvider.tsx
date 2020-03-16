import React from 'react';
import {ThemeProvider} from 'styled-components';
import merge from 'lodash/merge';
import {defaultTheme, themeName} from '../../config';
import type {themeProps} from './types';

export default (props: themeProps) => {
    const {gridTheme = {}, children}: any = props;

    const composeGridTheme = merge(defaultTheme, gridTheme);
    return <ThemeProvider theme={{[themeName]: composeGridTheme}}>{children}</ThemeProvider>;
};
