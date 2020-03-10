// @flow

import React, {useRef} from 'react';
import styled from 'styled-components';
import {media} from 'styled-bs-grid';
import px2vw from '@config/utils/getPx2vw';

/**
 * length 長度,
 */
type Props = {
    style?: React.CSSProperties,
    className?: string,
    name?: string,
    length?: number,
    forwardRef?: Function,
    onChange?: Function,
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

    const {className, style, length, name, onChange, forwardRef} = props;

    const serialRef = useRef([]);
    const inputRef = useRef();

    const maxLastPosition = length - 1;

    /**
    * 同步資料 (Parent & Real Input)
    */
    const handleSyncValue = () => {
        const inputValue = serialRef.current.map(element => element.value).join('');
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
    const handleMoveToNextInput = currentIndex => {
        const nextPosition = currentIndex + 1;
        if(nextPosition <= maxLastPosition){
            serialRef.current[nextPosition].focus();
            serialRef.current[nextPosition].value = '';
        }
    };

    /**
     * 刪除內容倒退
     * @param e
     * @param currentIndex
     */
    const handleBackInput = (e, currentIndex) => {
        if(e.keyCode === 8){
            e.preventDefault();

            if(currentIndex > 0) {
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
        for(let i = 0; i < length; i += 1){
            serialInputList[i] = (
                <Col key={`serialInput_${i}`}>
                    <SerialInput
                        ref={e => {
                            serialRef.current[i] = e;
                        }}
                        maxLength={1}
                        onClick={handleFocusNext}
                        onKeyUp={handleSyncValue}
                        onChange={()=>handleMoveToNextInput(i)}
                        onKeyDown={e => handleBackInput(e, i)}
                        placeholder=" "
                        type="text"
                    />
                </Col>
            );
        }
        return serialInputList;
    };

    return (
        <SecurityCodeRoot className={className} style={style} length={length}>
            {generateSerialInput()}

            <input
                ref={e => {
                    forwardRef(e);
                    inputRef.current = e;
                }}
                name={name}
                type="hidden"
            />
        </SecurityCodeRoot>
    );
};

SecurityCode.defaultProps = {
    style: undefined,
    className: undefined,
    name: undefined,
    length: 4,
    forwardRef: () => {},
    onChange: () => {},
};

export default SecurityCode;

const SerialInput = styled.input`
    color: ${props => props.theme.primaryColor};
    width: ${px2vw(30)};
    font-size: ${px2vw(20)};

    background-color: transparent;
    border: none;
    border-radius: 0;
    border-bottom: solid 2px #fff;
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


    &:not(:placeholder-shown) {
        border-bottom-color: ${props => props.theme.primaryColor};
    }

    ${media.lg`
        font-size: 20px;
        width: 30px;
    `}
`;

const Col = styled.div`
    padding: 0 ${px2vw(10)};

    ${media.lg`
        padding: 0 10px;
    `}
`;

const SecurityCodeRoot = styled.div`
    width: calc(${props => props.length} * ${px2vw(50)});
    max-width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 0 -10px;

    ${media.lg`
        width: calc(${props => props.length} * 50px);
    `}
`;
