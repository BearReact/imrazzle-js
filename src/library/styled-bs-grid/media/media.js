// @flow
import {css} from 'styled-components';
import get from 'lodash/get';
import {themeName, defaultTheme} from '../config';

const getBreakpoints = props => ({
    ...defaultTheme.gridBreakpoints,
    ...get(props.theme[themeName],'gridBreakpoints', {}),
});

const media = Object.keys(defaultTheme.gridBreakpoints).reduce(
    (accumulator, label) => {
        const minMedia = (strings: any, ...interpolations: any) => css`
      @media (min-width: ${props => getBreakpoints(props)[label]}px) {
        ${css(strings, ...interpolations)}
      }
    `;
        accumulator[label] = minMedia;
        return accumulator;
    },
    {},
);

export default media;
