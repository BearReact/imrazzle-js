import * as React from 'react';
import styled from 'styled-components';
/**
 * Block Title
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const BlockTitle = (props) => {
    const { children, style, className } = props;
    return React.createElement(BlockTitleRoot, { style: style, className: className }, children);
};
BlockTitle.defaultProps = {
    style: undefined,
    className: undefined,
    children: null,
};
export default BlockTitle;
const BlockTitleRoot = styled.div `
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 900;
    
`;
//# sourceMappingURL=BlockTitle.js.map