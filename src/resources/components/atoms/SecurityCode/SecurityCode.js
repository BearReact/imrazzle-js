// @flow

import React, {useRef, useEffect} from 'react';
import styled from 'styled-components';
import {media} from 'styled-bootstrap-grid';
import px2vw from '@config/utils/getPx2vw';

/**
 * length 長度,
 */
type Props = {
    style?: React.CSSProperties,
    className?: string,
    length?: {
        type: 'name',
    },
    onChange?: Function,
};

/**
 * SecurityCode
 * 安全認證碼輸入框
 * @param props
 * @returns {*}
 * @constructor
 */
const SecurityCode = (props: Props) => {
    const {className, style, length} = props;

    const serialRef = useRef([]);

    useEffect(() => {
        serialRef.current = serialRef.current.slice(0, length);
    }, [length]);

    /**
    * 異動事件(提供父元件取值)
    */
    const handleChange = () => {
        const {onChange, length} = props;

        if(onChange){
            let valueArray = [];
            for(let i = 0; i < length; i += 1) {
                valueArray.push(serialRef.current[i].value);
            }

            onChange(valueArray.join(''));
        }
    };

    /**
     * 移標自動移動到最後一個未填寫的位置
     */
    const handleFocusLast = () => {
        const {length} = props;
        let last = -1;
        serialRef.current.map((o, index) => {
            if(o.value !== ''){
                last = index;
            }
            return true;
        });

        const focusIndex = last+1 === length ? last : last + 1;
        serialRef.current[focusIndex].focus();
    };

    /**
     * 敲入內容前進
     * @param index
     */
    const handleNextInput = index => {
        const {length} = props;
        if(index+1 < length){
            serialRef.current[index+1].focus();
            serialRef.current[index+1].value = '';
        }
    };

    /**
     * 刪除內容倒退
     * @param e
     * @param index
     */
    const handleBackInput = (e, index) => {
        const {length} = props;
        if(e.keyCode === 8){
            e.preventDefault();
            if(index > 0) {
                if (index + 1 === length && serialRef.current[index].value !== '') {
                    serialRef.current[index].value = '';
                } else {
                    serialRef.current[index - 1].focus();
                    serialRef.current[index - 1].value = '';
                }
            }
        }
    };

    let input = [];
    for(let i = 0; i < length; i += 1){
        const component = (
            <Col key={`SerialInput_${i}`}>
                <SerialInput
                    ref={el => serialRef.current[i] = el}
                    maxLength={1}
                    onClick={handleFocusLast}
                    onKeyUp={handleChange}
                    onChange={()=>handleNextInput(i)}
                    onKeyDown={e => handleBackInput(e, i)}
                    placeholder=" "
                />
            </Col>
        );

        input.push(component);
    }

    return (
        <SecurityCodeRoot className={className} style={style} length={length}>
            {input}
        </SecurityCodeRoot>
    );
};

SecurityCode.defaultProps = {
    style: undefined,
    className: undefined,
    length: 4,
    onChange: undefined,
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
