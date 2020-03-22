import * as React from 'react';
import * as CSS from 'csstype';
import cx from 'classnames';
import styled, {css, keyframes} from 'styled-components';
import {media} from '@styled-bs-grid';
import px2vw from '@config/utils/getPx2vw';

type Props = {
    style?: CSS.Properties;
    className?: string;
    type?: 'fontClass' | 'svg';
    isInline?: boolean;
    onClick?: Function;
    size?: number;
    color?: string;
    code: string;
    isRotateAnimation?: boolean;
    rotate?: number;
};

/**
 * Icon
 * 依賴阿里巴巴Iconfont服務
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const Icon = ({
    style,
    isInline = false,
    className,
    type = 'fontClass',
    onClick,
    size = 22,
    color = '#bdbdbd',
    code,
    isRotateAnimation = false,
    rotate,
}: Props) => (
    <BasicIcon
        isInline={isInline}
        isRotateAnimation={isRotateAnimation}
        onClick={onClick}

        style={style}
        className={cx(className, `iconfont icon-${code}`)}
        type={type}
        size={size}
        rotate={rotate}
        color={color}
    >
        {type === 'svg' && <use xlinkHref={`#icon-${code}`}/>}
    </BasicIcon>
);

export default Icon;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const BasicIcon: any = styled.i.attrs((props: Props) => ({
    as: props.type === 'svg' ? 'svg' : undefined,
}))`
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    
        color: ${(props: any) => (props.color ? props.color : '#bdbdbd')};
        font-size: ${(props: any) => px2vw(props.size)};
        font-weight: 100;
        line-height: normal;

        max-width: ${(props: any) => px2vw(props.size)};
        max-height: ${(props: any) => px2vw(props.size)};
    
        vertical-align: middle;
        fill: currentColor;
        margin: 0;
        
        ${(props: any) => props.rotate && css`
            transform: rotate(${props.rotate}deg);
        `}
        
        ${(props: any) => props.isRotateAnimation && css`
            animation: ${rotate} 1s linear infinite;
        `}
        
        &:before {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        ${media.lg`
            font-size: ${(props: any) => props.size}px;
            max-width: ${(props: any) => props.size}px;
            max-height: ${(props: any) => props.size}px;
        `}
`;
