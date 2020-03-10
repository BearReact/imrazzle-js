// @flow
import * as React from 'react';
import styled from 'styled-components';

type Props = {
    style?: React.CSSProperties,
    className?: string,
    children?: React.Node,
};

/**
 * Block Title
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const BlockTitle = (props: Props) => {
    const {children, style, className} = props;
    return <BlockTitleRoot style={style} className={className}>{children}</BlockTitleRoot>;

};

BlockTitle.defaultProps = {
    style: undefined,
    className: undefined,
    children: null,
};

export default BlockTitle;

const BlockTitleRoot = styled.div`
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 900;
    
`;
