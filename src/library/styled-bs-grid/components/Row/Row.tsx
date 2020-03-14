import React from 'react';
import styled, {css} from 'styled-components';
import getDataName from './getDataName';
import {themeName} from '../../config';
import type {RowProps} from './types';

/**
 * Get Row Margin
 * @param props
 * @returns {*}
 */
const getRowMargin = (props: any) => {
    return props.noGutters ? 0: `-${props.theme[themeName].gridGutterWidth}px`;
};

/**
 * Row Component
 */
const Row: any = styled.div.attrs((props: any)  => ({
    'data-grid': 'row',
    'data-debug': getDataName(props),
}))`
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  
  ${(props: any) => css`
     margin-right: ${getRowMargin(props)};
     margin-left: ${getRowMargin(props)};
     
     ${props.noGutters && css`
        >[data-grid=col]{
            padding-right: 0;
            padding-left: 0;
        }
     `}
 `}
`;

export default (props: RowProps) => <Row {...props}/>;

