
import * as React from 'react';
import * as CSS from 'csstype';
import styled, {css, keyframes} from 'styled-components';
import {media} from '@styled-bs-grid';
import px2vw from '@config/utils/getPx2vw';

type Props = {
    shapeType?: string;
    shapeSize?: number;
    shapeColor?: string;
    shapeBorder?: number;
    style?: CSS.Properties;
    className?: string;
    type?: 'fontClass' | 'svg';
    isInline?: boolean;
    onClick?: Function;
    size?: number;
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    color?: string;
    code: string;
    isRotate?: boolean;
};

const shapeSetting = {
    default: '5px',
    circle: '23px',
    vertical: '1px',
};

/**
 * Icon
 * 依賴阿里巴巴Iconfont服務
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const Icon = (props: Props) => {
    const {
        shapeType,
        shapeSize,
        shapeColor,
        shapeBorder,
        style,
        isInline,
        className,
        type,
        onClick,
        size,
        top,
        bottom,
        left,
        right,
        color,
        code,
        isRotate,
    }: any = props;
    return (
        <IconGroup
            shapeType={shapeType}
            shapeSize={shapeSize}
            shapeColor={shapeColor}
            shapeBorder={shapeBorder}
            style={style}
            isInline={isInline}
            isRotate={isRotate}
            className={className}
            onClick={onClick}
        >
            {type === 'svg' ? (
                <IconSvg
                    className="icon"
                    aria-hidden="true"
                    size={size}
                    top={top}
                    bottom={bottom}
                    left={left}
                    right={right}
                    color={color}
                >
                    <use xlinkHref={`#icon-${code}`}/>
                </IconSvg>
            ) : (
                <IconImage
                    className={`iconfont icon-${code}`}
                    size={size}
                    top={top}
                    bottom={bottom}
                    left={left}
                    right={right}
                    color={color}
                />
            )}

        </IconGroup>
    );
};

Icon.defaultProps = {
    className: '',
    type: 'fontClass',
    style: undefined,
    shapeType: '',
    shapeSize: 34,
    shapeColor: '#fff',
    shapeBorder: 'none',
    color: '',
    isInline: false,
    size: 22,
    top: null,
    bottom: null,
    left: null,
    right: null,
    isRotate: false,
    onClick: () => {},
};

export default Icon;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const IconImage: any = styled.i`
    display: inline-flex;
    color: ${(props: any) => (props.color ? props.color : '#bdbdbd')};
    font-size: ${(props: any) => px2vw(props.size)};
    font-weight: 100;
    height: auto;
    line-height: normal;

    margin-bottom: ${(props: any) => (props.bottom ? `${props.bottom}px` : 'unset')};
    margin-top: ${(props: any) => (props.top ? `${props.top}px` : 'unset')};
    margin-right: ${(props: any) => (props.right ? `${props.right}px` : 'unset')};
    margin-left: ${(props: any) => (props.left ? `${props.left}px` : 'unset')};
    
    ${media.lg`
        font-size: ${(props: any) => props.size}px;
    `}
        
`;

const IconGroup: any = styled.div`
    position: relative;
    display: ${(props: any) => (props.isInline ? 'inline-flex' : 'flex')};
    align-items: center;
    justify-content: center;
    vertical-align: middle;

    ${(props: any) => props.shapeType && css`
        border-radius: ${shapeSetting[props.shapeType]};
        width: ${px2vw(props.shapeSize)};
        height: ${px2vw(props.shapeSize)};
        background-color: ${props.shapeColor};
        border: ${props.shapeBorder};
        
        ${media.lg`
            width: ${props.shapeSize}px;
            height: ${props.shapeSize}px;
        `}
    `}
    
    ${(props: any) => props.isRotate && css`
        animation: ${rotate} 1s linear infinite;
    `}
`;

const IconSvg: any = styled.svg`
    &.icon{
        display: inline-flex;
        color: ${(props: any) => (props.color ? props.color : '#bdbdbd')};
        font-size: ${(props: any) => px2vw(props.size)};
        font-weight: 100;
        line-height: normal;
        
        width: ${(props: any) => px2vw(props.size)};
        height: ${(props: any) => px2vw(props.size)};
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
       

        margin-bottom: ${(props: any) => (props.bottom ? `${props.bottom}px` : 'unset')};
        margin-top: ${(props: any) => (props.top ? `${props.top}px` : 'unset')};
        margin-right: ${(props: any) => (props.right ? `${props.right}px` : 'unset')};
        margin-left: ${(props: any) => (props.left ? `${props.left}px` : 'unset')};
        
        ${media.lg`
            font-size: ${(props: any) => props.size}px;
            width: ${(props: any) => props.size}px;
            height: ${(props: any) => props.size}px;
        `}
       
    }
`;
