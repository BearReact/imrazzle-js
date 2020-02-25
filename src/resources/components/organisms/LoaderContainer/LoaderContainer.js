// @flow

import * as React from 'react';
import styled,{css} from 'styled-components';
import {media} from "styled-bootstrap-grid";
import { HalfCircleSpinner } from 'react-epic-spinners'
import px2vw from '@config/utils/getPx2vw';
import getConfig from "@config/utils/getConfig";

type Props = {
    style?: React.CSSProperties,
    className?: string,
    children?: React.Node,
    isLoading?: boolean,
    size?: number,
    backgroundColor?: string,
    isFullMaskBody?: boolean,
    rollingAlign?: 'full' | 'area',
    isHasPanel?: boolean,
    rolling?: React.Node,
    visibleMode?: string,
};


const LoaderContainer = (props: Props) => {
    const {
        className, style, children, isLoading, size, backgroundColor, isFullMaskBody, isHasPanel, rollingAlign, rolling, visibleMode,
    } = props;
    const isShowMask = (rollingAlign === 'full' || rollingAlign === 'area');
    return (
        <LoaderSelection className={className} style={style} isFullSize={rollingAlign === 'full'}>
            {(visibleMode === 'render' && isLoading) && (
                <Mask isLoading={isLoading} isFullSize={rollingAlign === 'full'} isHasPanel={isHasPanel}>
                    <MaskBody isFullMaskBody={isFullMaskBody}>
                        <HalfCircleSpinner size={size} color={getConfig('theme.primaryColor')}/>
                    </MaskBody>
                </Mask>
            )}

            {(isShowMask && visibleMode === 'opacity') && (
                <Mask isLoading={isLoading} isFullSize={rollingAlign === 'full'} isHasPanel={isHasPanel}>
                    <MaskBody isFullMaskBody={isFullMaskBody}>
                        <HalfCircleSpinner size={size} color={getConfig('theme.primaryColor')}/>
                    </MaskBody>
                </Mask>
            )}

            {children}
        </LoaderSelection>
    );
};

LoaderContainer.defaultProps = {
    style: undefined,
    className: undefined,
    children: null,
    isLoading: false,
    size: 50,
    backgroundColor: 'rgba(0,0,0,.1)',
    isFullMaskBody: false,
    isHasPanel: false,
    rollingAlign: 'full',
    rolling: undefined,
    visibleMode: 'opacity',
};


export default LoaderContainer;

const MaskBody = styled.div`
    display: inherit;
    width: inherit;
    height: inherit;
    justify-content: center;
    align-items: inherit;
    
    ${props => props.isFullMaskBody && css`
        max-width: none;
    `}
`;

const Mask = styled.div`
    background-color: ${props => props.theme.loaderMaskColor};
    width: 100%;
    height: 100%;
    opacity: 0;
    display: flex;
    pointer-events: none;
    z-index: 40;
    position: ${props => (props.isFullSize ? 'fixed' : 'absolute')};
    top: 0;
    left: 0;
    justify-content: center;
    align-items: ${props => (props.isFullSize ? 'center' : 'flex-start')};
    padding: ${props => (props.isFullSize ? 0 : px2vw(50))};
    transition: opacity .4s;
    
    ${props => props.isLoading && css`
        opacity: 1;
        pointer-events: unset;
    `}
    
     ${media.lg`
       padding: ${props => (props.isFullSize ? 0 : '50px')};
       justify-content: ${props => (props.isFullSize ? 'flex-start' : 'center')};
       
       ${props => props.isHasPanel && css`
            padding-left: 270px;
       `};
    `};
`;

const LoaderSelection = styled.div`
    position: relative;
    
    ${props=> props.isFullSize && css`
        z-index: auto !important;
    `};
    
`;
