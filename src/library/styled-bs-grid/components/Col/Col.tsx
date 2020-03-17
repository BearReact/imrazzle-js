import React from 'react';
import styled, {css} from 'styled-components';
import getCss from './css';
import getDataName from './getDataName';
import media from '../../media';
import {isEmpty} from '../../utils';
import {themeName} from '../../config';
import type {ColProps} from './types';
import type {themeProps} from '../ThemeProvider/types';

type Props = ColProps & {
    theme: themeProps;
};

// eslint-disable-next-line array-callback-return
const generateMedia = (props: any) => Object.keys(props.theme[themeName].gridBreakpoints).map(sizeName => {
    if (!isEmpty(props[sizeName])) {
        return media[sizeName]`${getCss.col(props[sizeName], props.theme[themeName].gridColumns)}`;
    }
});

/**
 * Col Component
 * breakpoints sort: sm => xl
 *
 * qa: min-height=1px
 * https://css-tricks.com/make-sure-columns-dont-collapse-horizontally/
 *
 */
const Col: any = styled.div.attrs((props: Props) => ({
    'data-grid': 'col',
    'data-debug': getDataName(props),
}))`
  position: relative;
  width: 100%;
  min-height: 1px;
  
  ${(props: any) => css`
     padding-right: ${props.theme[themeName].gridGutterWidth}px;
     padding-left: ${props.theme[themeName].gridGutterWidth}px;
     
     ${props.col && getCss.col(props.col, props.theme[themeName].gridColumns)};
     
     ${generateMedia(props)};
 `}
`;

export default (props: ColProps) => <Col {...props}/>;
