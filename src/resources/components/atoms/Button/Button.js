import * as React from 'react';
import styled from 'styled-components';
import get from 'lodash/get';
import { media } from '@styled-bs-grid';
import { getConfig } from '@config/utils/getConfig';
import px2vw from '@config/utils/getPx2vw';
const themeConfig = {
    default: {
        bgColor: 'transparent',
        fontColor: '#fff',
        padding: '0',
        minHeight: 'unset',
        borderColor: 'transparent',
        hoverBgColor: 'transparent',
        hoverBorderColor: '#fff',
        hoverFontColor: '#fff',
    },
    pureBorder: {
        bgColor: 'transparent',
        fontColor: getConfig('site.theme.primaryColor'),
        padding: '0',
        minHeight: 'unset',
        borderColor: getConfig('site.theme.primaryColor'),
        hoverBgColor: '#fff',
        hoverBorderColor: 'transparent',
        hoverFontColor: getConfig('site.theme.primaryColor'),
    },
    primaryBorder: {
        bgColor: 'transparent',
        fontColor: getConfig('site.theme.primaryColor'),
        padding: '0',
        minHeight: 'unset',
        borderColor: getConfig('site.theme.primaryColor'),
        hoverBgColor: getConfig('site.theme.primaryColor'),
        hoverBorderColor: 'transparent',
        hoverFontColor: '#fff',
    },
    hoverBorder: {
        bgColor: 'transparent',
        fontColor: '#fff',
        padding: '0',
        minHeight: 'unset',
        borderColor: 'transparent',
        hoverBgColor: 'transparent',
        hoverBorderColor: '#fff',
        hoverFontColor: '#fff',
    },
    hoverBgColor: {
        bgColor: 'transparent',
        fontColor: '#fff',
        padding: '0',
        minHeight: 'unset',
        borderColor: 'transparent',
        hoverBgColor: '#0f1f2e',
        hoverBorderColor: 'transparent',
        hoverFontColor: '#fff',
    },
    primary: {
        bgColor: getConfig('site.theme.primaryColor'),
        borderColor: 'transparent',
        fontColor: '#fff',
        hoverBgColor: '#fff',
        hoverBorderColor: 'transparent',
        hoverFontColor: getConfig('site.theme.primaryColor'),
    },
    white: {
        bgColor: '#fff',
        fontColor: '#8d8d8d',
        borderColor: 'transparent',
        hoverBgColor: getConfig('site.theme.primaryColor'),
        hoverBorderColor: 'transparent',
        hoverFontColor: '#fff',
        hoverBoxShadow: '0 10px 20px 0 rgba(0, 163, 224, 0.4)',
    },
    darkBlue: {
        bgColor: '#ededed',
        borderColor: 'transparent',
        fontColor: '#004e6b',
        hoverBgColor: '#0d3c6f',
        hoverFontColor: '#fff',
    },
    darkBlueBorder: {
        bgColor: 'transparent',
        borderColor: '#004e6b',
        fontColor: '#004e6b',
        hoverBgColor: '#fff',
        hoverFontColor: '#004e6b',
    },
    gray: {
        bgColor: 'rgba(0, 0, 0, 0.2)',
        borderColor: 'transparent',
        fontColor: '#fff',
        hoverBgColor: getConfig('site.theme.primaryColor'),
        hoverFontColor: '#fff',
        hoverBoxShadow: '0 10px 20px 0 rgba(0, 163, 224, 0.4)',
    },
    danger: {
        bgColor: '#ff4b4b',
        borderColor: '#ff4b4b',
        fontColor: '#fff',
    },
};
const sizeConfig = {
    default: {
        fontSize: 13,
        fontWeight: 900,
        minHeight: '40px',
    },
    small: {
        fontSize: 12,
        fontWeight: 900,
        minHeight: '36px',
    },
    normal: {
        fontSize: 15,
        fontWeight: 900,
        minHeight: '44px',
    },
    large: {
        fontSize: 20,
        fontWeight: 900,
        minHeight: '50px',
    },
};
const shapeConfig = {
    default: {
        shape: '4px',
    },
    raised: {
        shape: 0,
    },
    circle: {
        shape: '18px',
    },
};
/**
 * Button 一般按鈕
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const Button = (props) => {
    const { className, style, children, theme, size, shape, type, block } = props;
    const activeTheme = get(themeConfig, theme, {});
    const activeSizeConfig = get(sizeConfig, size, {});
    const activeShapeConfig = get(shapeConfig, shape, {});
    return (React.createElement(ButtonRoot, { className: className, type: type, style: style, baseTheme: Object.assign(Object.assign(Object.assign({}, activeTheme), activeSizeConfig), activeShapeConfig), block: block }, children));
};
Button.defaultProps = {
    style: undefined,
    theme: 'default',
    size: 'default',
    shape: 'default',
    block: false,
    type: 'button',
    children: '',
    className: '',
};
export default Button;
const ButtonRoot = styled.button `
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: ${(props) => props.baseTheme.padding || `${px2vw(2)} ${px2vw(10)}`};

    width: ${(props) => (props.baseTheme.block ? '100%' : 'auto')};
    max-width: 100%;

    background-color: ${(props) => props.baseTheme.bgColor};
    color: ${(props) => props.baseTheme.fontColor};
    border-color: ${(props) => props.baseTheme.borderColor};
    border-radius: ${(props) => props.baseTheme.shape};
    font-size: ${(props) => px2vw(props.baseTheme.fontSize)};
    font-weight: ${(props) => props.baseTheme.fontWeight};
    min-height: ${(props) => px2vw(props.baseTheme.minHeight)};
    transition: background-color .3s ease-out, color .3s ease-out, border-color .3s ease-out, box-shadow .3s ease-out;


    &:disabled,
    &[disabled]{
      border: 1px solid #9b9b9b;
      background-color: #9b9b9b;
      color: #fff;
    };

    &:not([disabled]):hover {
        background-color: ${(props) => props.baseTheme.hoverBgColor};
        border-color: ${(props) => props.baseTheme.hoverBorderColor};
        color: ${(props) => props.baseTheme.hoverFontColor};
        box-shadow: ${(props) => props.baseTheme.hoverBoxShadow || '0 0 20px 0 rgba(0, 0, 0, 0.2)'};
    }

    ${media.lg `
        font-size: ${(props) => props.baseTheme.fontSize}px;
        min-height: ${(props) => props.baseTheme.minHeight};
        padding: 0 10px;

        // fix ie11
        &:after{
            content:'';
            min-height:inherit;
            font-size:0;
        }
    `}
`;
//# sourceMappingURL=Button.js.map