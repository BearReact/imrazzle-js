
import React, {useRef} from 'react';
import * as CSS from 'csstype';
import styled, {css} from 'styled-components';
import {media} from '@styled-bs-grid';
import px2vw from '@config/utils/getPx2vw';

type Props = {
    style?: CSS.Properties;
    className?: string;
    name?: string;
    title?: string;
    remark?: string;
    type?: string;
    length?: any;
    forwardRef?: Function;
    onChange?: Function;
};

/**
 * SecurityCode
 * 安全認證碼輸入框
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const SecurityCode = (props: Props) => {

    const {
        className, style, length, name, onChange, forwardRef, title, remark, type,
    }: any = props;

    const serialRef: any = useRef([]);
    const inputRef: any = useRef();

    const maxLastPosition = length - 1;

    /**
    * 同步資料 (Parent & Real Input)
    */
    const handleSyncValue = () => {
        const inputValue = serialRef.current.map((element: any) => element.value).join('');
        onChange(inputValue);
        inputRef.current.value = inputValue;
    };

    /**
     * 移標自動移動到最後一個未填寫的位置
     */
    const handleFocusNext = () => {
        const currentPosition = inputRef.current.value.length - 1;
        const nextPosition = currentPosition >= maxLastPosition ? maxLastPosition : currentPosition + 1;
        serialRef.current[nextPosition].focus();
    };

    /**
     * 敲入內容前進
     * @param currentIndex 目前位置
     */
    const handleMoveToNextInput = (currentIndex: number) => {
        const nextPosition = currentIndex + 1;
        if (nextPosition <= maxLastPosition) {
            serialRef.current[nextPosition].focus();
            serialRef.current[nextPosition].value = '';
        }
    };

    /**
     * 刪除內容倒退
     * @param e
     * @param currentIndex
     */
    const handleBackInput = (e: any, currentIndex: number) => {
        if (e.keyCode === 8) {
            e.preventDefault();

            if (currentIndex > 0) {
                // 若為最後一碼, 並且有值, 則把最後一碼值清空
                if (currentIndex === maxLastPosition && serialRef.current[currentIndex].value !== '') {
                    serialRef.current[currentIndex].value = '';
                } else {
                    const prePosition = currentIndex - 1;
                    serialRef.current[prePosition].focus();
                    serialRef.current[prePosition].value = '';
                }
            }
        }
    };

    /**
     * 產生驗證碼欄位
     */
    const generateSerialInput = () => {
        const serialInputList = [];
        for (let i = 0; i < length; i += 1) {
            serialInputList[i] = (
                <SerialInput
                    key={`serialInput_${i}`}
                    ref={e => {
                        serialRef.current[i] = e;
                    }}
                    maxLength={1}
                    onClick={handleFocusNext}
                    onKeyUp={handleSyncValue}
                    onChange={() => handleMoveToNextInput(i)}
                    onKeyDown={e => handleBackInput(e, i)}
                    placeholder=" "
                    type="text"
                />
            );
        }
        return serialInputList;
    };

    return (
        <RootConatiner>
            <InputContainer type={type}>
                <SecurityCodeRoot
                    className={className}
                    style={style}
                >
                    {generateSerialInput()}

                    {/* 外框 */}
                    <Border>
                        <Title>{title}</Title>
                    </Border>
                </SecurityCodeRoot>
            </InputContainer>
            {remark && <Remark>{remark}</Remark>}

            <input
                ref={e => {
                    forwardRef(e);
                    inputRef.current = e;
                }}
                name={name}
                type="hidden"
            />
        </RootConatiner>
    );
};

SecurityCode.defaultProps = {
    style: undefined,
    className: undefined,
    name: undefined,
    title: undefined,
    remark: undefined,
    type: undefined,
    length: 4,
    forwardRef: () => {},
    onChange: () => {},
};

export default SecurityCode;

const Remark = styled.span`
    font-size: ${px2vw(12)};
    padding-top: ${px2vw(4)};
    color: #b8b8b8;
    line-height: 1;
    transform: scale(.833);
    transform-origin: left;
    display: block;

    ${media.lg`
        font-size: 12px;
        padding-top: 4px;
        transform: none;
    `}
`;

const Title = styled.legend`
    font-size: ${px2vw(14)};
    color: #8d8d8d;
    width: auto;
    padding: 0 5px;
    margin: 0 0 0 15px;

    ${media.lg`
        font-size: 14px;
    `}
`;

const Border = styled.fieldset`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
    border: solid 1px #8d8d8d;
    pointer-events: none;
    display: none;
`;

const SerialInput = styled.input`
    color: ${(props: any) => props.theme.primaryColor};
    width: ${px2vw(30)};
    font-size: ${px2vw(20)};
    margin: 0 ${px2vw(10)};

    background-color: transparent;
    border: none;
    border-radius: 0;
    border-bottom: solid 2px #c3c3c3;
    text-align: center;

    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: transparent;
      opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: transparent;
    }

    ::-ms-input-placeholder { /* Microsoft Edge */
      color: transparent;
    }

    &:focus {
        &~${Border} {
            border-color: ${(props: any) => props.theme.primaryColor};

            ${Title} {
                color: ${(props: any) => props.theme.primaryColor};
            }
        }
    }

    &:not(:placeholder-shown) {
        &~${Border} {
            ${Title} {
                color: ${(props: any) => props.theme.primaryColor};
            }
        }
    }

    ${media.lg`
        font-size: 20px;
        width: 40px;
        margin: 0 10px;
    `}
`;

const SecurityCodeRoot = styled.div`
    margin: 0 -${px2vw(10)};

    ${media.lg`
        margin: 0 -10px;
    `}
`;

const InputContainer: any = styled.div`
    height: auto;
    position: relative;
    display: flex;
    align-items: center;

    ${(props: any) => props.type && css`
        height: ${px2vw(85)};
        padding: 0 ${px2vw(11)};

        ${SecurityCodeRoot} {
            margin: 0 -${px2vw(4)};
        }

        ${SerialInput} {
            margin: 0 ${px2vw(4)};
        }

        ${Border} {
            display: block;
        }

        ${media.lg`
            width: 456px;
            height: 104px;
            padding: 0 10px;
            margin: 0 -2px;

            ${SecurityCodeRoot} {
                margin: 0 -2px;
            }

            ${SerialInput} {
                margin: 0 2px;
            }
        `}
    `}
`;

const RootConatiner = styled.div`
`;
