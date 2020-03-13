// @flow
// eslint-disable-next-line import/no-unresolved
import {css} from 'styled-components';
import get from 'lodash/get';
import {themeName, defaultTheme} from '../config';
import type {mediaType} from './types';

const defaultBreakpoints: mediaType = {
    xxl: 1540,
    xl: 1200,
    lg: 992,
    md: 768,
    sm: 576,
    xs: 575,
};

const getBreakpoints = props => ({
    ...defaultTheme.gridBreakpoints,
    ...get(props.theme[themeName],'gridBreakpoints', {}),
});

const media = Object.keys(defaultBreakpoints).reduce(
    (accumulator, label) => {
        const minMedia = (strings: any, ...interpolations: any) => css`
      @media (min-width: ${props => getBreakpoints(props)[label]}px) {
        ${css(strings, ...interpolations)}
      }
    `;

        const maxMedia = (strings: any, ...interpolations: any) => css`
      @media (max-width: ${props => getBreakpoints(props)[label]}px) {
        ${css(strings, ...interpolations)}
      }
    `;

        accumulator[label] = label === 'xs' ? maxMedia : minMedia;
        accumulator.max[label] = maxMedia;
        accumulator.min[label] = minMedia;

        return accumulator;
    },
    {min: {}, max: {}},
);

export default media;
