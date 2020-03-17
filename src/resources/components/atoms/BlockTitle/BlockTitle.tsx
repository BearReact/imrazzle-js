import * as React from 'react';
import * as CSS from 'csstype';
import styled from 'styled-components';

type Props = {
    style?: CSS.Properties;
    className?: string;
    children?: React.ReactNode;
};

/**
 * Block Title
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const BlockTitle = (props: Props) => {
    const {children, style, className}: any = props;
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
