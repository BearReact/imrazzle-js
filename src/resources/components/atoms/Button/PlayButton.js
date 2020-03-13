// @flow
import * as React from 'react';
import styled from 'styled-components';
import {media} from '@library/styled-bs-grid';
import {getConfig} from '@config/utils/getConfig';
import px2vw from '@config/utils/getPx2vw';

import Icon from '@components/atoms/Icon';

type Props = {
    style?: React.CSSProperties,
    className?: string,
    children?: React.Node,
    theme?: 'default' | 'square',
    type?: 'button' | 'submit',
};

const themeConfig = {
    default: {
        iconColor: getConfig('site.theme.primaryColor'),
        padding: '0',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        hoverBorderColor: '#000',
        hoverColor: '#fff',
        textStroke: 'unset',
        hoverTextStroke: '1px #000000',
        width: '60px',
        height: '60px',
        shape: '50%',
        background: '#fff',
        hoverBackground: 'radial-gradient(circle at 50% 50%, #ffc400, #ffa400 42%, #ff8800 106%)',
        fontSize: '20px',
    },
    square: {
        iconColor: '#fff',
        padding: '0',
        borderColor: '#000',
        hoverBorderColor: '#000',
        textStroke: '1px #000000',
        width: '100%',
        height: '40px',
        shape: '4px',
        background: 'radial-gradient(circle at 50% 50%, #ffc400, #ffa400 42%, #ff8800 106%)',
        fontSize: '15px',
    },
};

/**
 * PlayButton
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const PlayButton = (props: Props) => {
    const {className, children, theme, ...buttonProps} = props;

    const themeProps = theme ? themeConfig[theme] : {};

    return (
        <PlayButtonRoot className={className} {...buttonProps} config={{...themeProps}}>
            {children}
            <CustomIcon code="play" size="20"/>
        </PlayButtonRoot>
    );
};

PlayButton.defaultProps = {
    style: undefined,
    theme: 'default',
    type: 'button',
    children: '',
    className: '',
};

export default PlayButton;

const CustomIcon = styled(Icon)`
    padding: 0 ${px2vw(5)};

    // 視覺置中
    transform: translateX(${px2vw(2)});

    ${media.lg`
        padding: 0 5px;
        transform: translateX(2px);
    `}
`;

const PlayButtonRoot = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: ${props => props.config.padding || `${px2vw(2)} ${px2vw(10)}`};

    transition:
        background-color .3s ease-out,
        color .3s ease-out,
        border-color .3s ease-out,
        box-shadow .3s ease-out,
        -webkit-text-stroke .3s ease-out,
        transform .3s ease-out;

    color: #fff;
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.35);
    -webkit-text-stroke: ${props => props.config.textStroke};
    font-size: ${px2vw(16)};
    font-weight: bold;
    box-shadow: ${props => props.config.shape === '50%' ? '' : 'inset 0 -6px rgba(0, 0, 0, 0.3)'};

    border-color: ${props => props.config.borderColor};
    background: ${props => props.config.background};
    border-radius: ${props => props.config.shape};
    width: ${props => props.config.width};
    height: ${props => props.config.height};
    overflow: hidden;


    &:before {
        content: '';
        position: absolute;
        top: 0;
        width: 100%;
        height: 50%;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: ${props => props.config.shape === '50%' ? `${props.config.width} ${props => props.config.height} 0 0` : ''};
        transition: background-color .3s ease-out;
    }

    ${CustomIcon} {
        i {
            transition: color .3s ease-out, border .3s ease-out;
            color: ${props => props.config.iconColor};

          &:before {
                font-size: ${props => props.config.fontSize};
            }
        }
    }

    &:hover {
        border-color: ${props => props.config.hoverBorderColor};
        ${CustomIcon} {
            i {
                color: ${props => props.config.hoverColor || props.config.iconColor};
            }
        }
        box-shadow: ${props => props.config.shape === '50%' ? '0 0 20px 0 rgba(0, 0, 0, 0.2), inset 0 -6px rgba(0, 0, 0, 0.39)' : '0 0 20px 0 rgba(0, 0, 0, 0.2), inset 0 -6px rgba(0, 0, 0, 0.3)'};
        transform: translateY(-5px);
        background: ${props => props.config.hoverBackground || props.config.background};
        -webkit-text-stroke: ${props => props.config.hoverTextStroke};

        &:before {
            background-color: rgba(255, 255, 255, 0.2);
        }
    }

    ${media.lg`
        font-size: 16px;
        padding: 0 10px;
    `}
`;
