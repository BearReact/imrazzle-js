import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import get from 'lodash/get';
import px2vw from '@config/utils/getPx2vw';
import {media} from '@styled-bs-grid';
import Icon from '@components/atoms/Icon';

type Props = {
    title?: string;
    name?: string;
    option: Array<{
        value: number|string;
        text: string;
    }>;
    forwardRef?: Function;
};

const Select = ({
    title,
    name,
    option,
    forwardRef = (e: any) => {},
}: Props) => {
    const [label, setLabel]: any = useState();

    const handleOnChange = (e: any) => {
        const value = e.target.value;
        if (value !== '') {
            const optionSelected = get(option.find(row => String(row.value) === String(value)), 'text', '');
            setLabel(optionSelected);
        } else {
            setLabel(null);
        }

    };

    return (
        <InputContainer>
            <Label>{label}</Label>
            <SelectDropdown
                ref={(e: any) => forwardRef(e)}
                name={name}
                onChange={e => handleOnChange(e)}
            >
                {
                    option.map(row => (
                        <Option key={`option_${row.value}`} value={row.value}>{row.text}</Option>
                    ))
                }
            </SelectDropdown>

            <IconContainer>
                <Icon code="chevron-right" size={16} color="#c3c3c3" rotate={90}/>
            </IconContainer>

            {/* 外框 */}
            <Border isSelected={label}>
                <Title>{title}</Title>
                <MovePlaceholder>{title}</MovePlaceholder>
            </Border>
        </InputContainer>
    );
};

export default Select;

const IconContainer = styled.div`
    position: absolute;
    right: ${px2vw(15)};
    top: 50%;
    transform: translateY(-50%);

    ${media.lg`
        right: 20px;
    `}
`;

const Label = styled.span`
    font-size: ${px2vw(12)};
    line-height: 1;
    margin: 0;

    ${media.lg`
        font-size: 12px;
    `}
`;

const MovePlaceholder = styled.div`
    font-size: ${px2vw(16)};
    padding: 0 0 0 ${px2vw(10)};
    color: #c4c4c4;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: all .3s ease;

    ${media.lg`
        font-size: 16px;
        padding: 0 0 0 20px;
    `}
`;

const Title = styled.legend`
    font-size: ${px2vw(14)};
    line-height: 1;
    color: #8d8d8d;
    width: auto;
    max-width: 0.01px;
    height: 0;
    visibility: hidden;
    transition: max-width 50ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;

    ${media.lg`
        font-size: 14px;
    `}
`;

const Border: any = styled.fieldset`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
    border: solid 1px #8d8d8d;
    pointer-events: none;

    ${(props: any) => props.isSelected && css`
        ${Title} {
            padding: 0 ${px2vw(5)};
            margin: 0 0 0 ${px2vw(5)};
            max-width: none;
        }

        ${MovePlaceholder} {
            font-size: ${px2vw(14)};
            color: ${props.theme.primaryColor};
            top: 0;
        }

        ${media.lg`
            ${Title} {
                padding: 0 5px;
                margin: 0 0 0 15px;
            }
            ${MovePlaceholder} {
                font-size: 14px;
            }
        `}
    `}
`;

const Option = styled.option``;

const SelectDropdown = styled.select`
    height: ${px2vw(44)};
    width: 100%;
    border: none;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;

    ${media.lg`
        height: 51px;
    `}
`;

const InputContainer = styled.div`
    height: ${px2vw(51)};
    padding-left: ${px2vw(10)};
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;

    ${media.lg`
        height: 57px;
        padding-left: 20px;
    `}
`;
