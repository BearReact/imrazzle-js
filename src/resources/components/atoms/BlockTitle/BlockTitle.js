// @flow
import * as React from 'react';
import styled from 'styled-components';

type Props = {
    style?: React.CSSProperties,
    className?: string,
    children?: React.Node,
};
type State = {};

class BlockTitle extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        children: null,
    };

    render() {
        const {children, style, className} = this.props;

        return <BlockTitleRoot style={style} className={className}>{children}</BlockTitleRoot>;
    }
}

export default BlockTitle;

const BlockTitleRoot = styled.div`

    position: relative;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 900;
    
`;
