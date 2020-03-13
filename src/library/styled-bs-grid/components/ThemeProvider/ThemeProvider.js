// @flow

import React from 'react';
import {ThemeProvider} from 'styled-components';
import merge from 'lodash/merge';
import {defaultTheme, themeName} from '../../config';

export default (props: gridTheme) => {
    const {gridTheme = {}} = props;

    const composeGridTheme = merge(defaultTheme, gridTheme);
    return <ThemeProvider theme={{[themeName]: composeGridTheme}} {...props}/>;
};
