
import React, {useRef} from 'react';
import styled, {css} from 'styled-components';
import {media} from '@styled-bs-grid';
import px2vw from '@config/utils/getPx2vw';
import Icon from '@components/atoms/Icon';

type Props = {
    forwardRef?: Function;
    type?: 'text' | 'number' | 'password' | 'tel';
    inputType?: 'normal' | 'material';
    name?: string;
    placeholder?: string;
    defaultValue?: string;
    readonly?: boolean;
    errorMessage?: string;
    remarkMessage?: string;
    beforeIconCode?: string;
    beforeIconOnClick?: Function;
    afterIconCode?: string;
    afterIconOnClick?: Function;
};

/**
 * Input Component
 * form type in text...
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const Input = (props: Props) => {

    const {
        forwardRef,
        type,
        name,
        inputType,
        placeholder,
        defaultValue,
        readonly,
        errorMessage,
        remarkMessage,
        beforeIconCode,
        beforeIconOnClick,
        afterIconCode,
        afterIconOnClick,
    }: any = props;

    const textBoxRef: any = useRef();

    const handleClearInput = () => {
        textBoxRef.current.value = '';
    };

    const isVisibleBeforeIcon = beforeIconCode && inputType === 'normal';
    const isVisibleCleanButton = !readonly && !afterIconCode; // 當可寫(非唯獨) 並且 沒有設定 AfterIcon 時

    return (
        <InputContainer>
            <InputRoot>
                {/* Input */}
                <TextBox
                    ref={(e: any) => {
                        forwardRef(e);
                        textBoxRef.current = e;
                    }}
                    name={name}
                    type={type}
                    inputType={inputType}
                    isError={errorMessage}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    readonly={readonly}
                />

                {/* 外框 */}
                <Border>
                    {
                        inputType !== 'normal' && (
                            <>
                                <Title>{placeholder}</Title>
                                <MovePlaceholder>{placeholder}</MovePlaceholder>
                            </>
                        )
                    }
                </Border>

                {/* 前面的Icon (一般主題樣式) */}
                {isVisibleBeforeIcon && (
                    <BeforeIcon
                        code={beforeIconCode}
                        onClick={beforeIconOnClick}
                        color="#8d8d8d"
                        size={20}
                    />
                )}

                {/* 後面的Icon */}
                {afterIconCode && (
                    <CustomIcon
                        code={afterIconCode}
                        onClick={afterIconOnClick}
                        color="#8d8d8d"
                        size={20}
                    />
                )}

                {/* 清除按鈕 */}
                {isVisibleCleanButton && (
                    <CloseIcon
                        code="times-circle"
                        onClick={() => handleClearInput()}
                        color="#8d8d8d"
                        size={20}
                    />
                )}
            </InputRoot>

            {/* 錯誤訊息提示 */}
            {errorMessage && (
                <Remark isError={errorMessage}>
                    <Icon code="exclamation-circle" right={5} color="#ff4b4b" size={12}/>
                    {errorMessage}
                </Remark>
            )}

            {/* 填寫備註 */}
            {remarkMessage && (
                <Remark>{remarkMessage}</Remark>
            )}

        </InputContainer>
    );
};

Input.defaultProps = {
    forwardRef: () => {},
    name: undefined,
    type: 'text',
    inputType: 'material',
    placeholder: '',
    defaultValue: undefined,
    readonly: false,
    errorMessage: undefined,
    remarkMessage: undefined,
    beforeIconCode: '',
    beforeIconOnClick: undefined,
    afterIconCode: '',
    afterIconOnClick: undefined,
};

export default Input;

const Remark: any = styled.div`
    font-size: ${px2vw(12)};
    padding-top: ${px2vw(5)};
    color: ${(props: any) => (props.isError ? '#ff4b4b' : '#c4c4c4')};
    display: flex;
    align-items: center;
    
    ${media.lg`
        font-size: 12px;
        padding-top: 5px;
    `}
`;

const MovePlaceholder = styled.div`
    font-size: ${px2vw(16)};
    padding: 0 0 0 20px;
    color: #c4c4c4;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: all .3s ease;
    
    ${media.lg`
        font-size: 16px;
    `}
`;

const Title = styled.legend`
    font-size: ${px2vw(14)};
    width: auto;
    max-width: 0.01px;
    height: 0;
    padding: 0;
    margin: 0 0 0 15px;
    visibility: hidden;
    transition: max-width 50ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
    
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
`;

const CustomIcon = styled(Icon)`
    padding: ${px2vw(20)};
    max-height: ${px2vw(50)};
    color: #c3c3c3;
    order: 2;
    
    &:hover {
        color: ${(props: any) => props.theme.primaryColor};
    }
    
    >i {
        color: inherit;
    }
    
    ${media.lg`
        padding: 20px;
        max-height: 50px;
    `}
`;

const CloseIcon = styled(CustomIcon)`
    visibility: hidden;
`;

const BeforeIcon: any = styled(CustomIcon)`
    order: 0;
`;

const TextBox: any = styled.input`
    font-size: ${px2vw(16)};
    height: ${px2vw(60)};
    max-height: ${px2vw(60)};
    padding: 0;
    color: #282731;
    width: 100%;
    border: none;
    background-color: transparent;
    order: 1;
    
    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: #c4c4c4;
      opacity: 1; /* Firefox */
    }
    
    :-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: #c4c4c4;
    }
    
    ::-ms-input-placeholder { /* Microsoft Edge */
      color: #c4c4c4;
    }
    
    ${media.lg`
        font-size: 16px;
        height: 60px;
        max-height: 60px;
    `}
    
    ${(props: any) => props.inputType !== 'normal' && css`
        padding-left: 20px;
        
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
        
        &:focus, &:not(:placeholder-shown) {
            &~${Border} {
                ${Title} {
                    padding: 0 5px;
                    max-width: 1000px;
                    transition: max-width 100ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
                }
                
                ${MovePlaceholder} {
                    font-size: ${px2vw(14)};
                    color: ${props.readonly ? '#c4c4c4' : props.theme.primaryColor};
                    top: 0;
                }
            }
        } 
        
        &:focus~${Border} {
            border-color: ${props.theme.primaryColor};
        }
       
        //input有值的情況需搭配placeholder
        &:not(:placeholder-shown) {
            &~${CloseIcon} {
                visibility: visible;
            }
        }
        
        ${media.lg`
            &:focus~${Border} ${MovePlaceholder}, 
            &:not(:placeholder-shown)&~${Border} ${MovePlaceholder} {
                font-size: 14px;
            }
        `}
    `}
    
    ${(props: any) => props.readonly && css`
        &~${Border} {
            border-color: #c4c4c4;
            pointer-events: auto;
        }
    `}
    
    ${(props: any) => props.isError && css`
        &~${Border} {
            border-color: #ff4b4b !important;
            
            ${MovePlaceholder} {
                color: #ff4b4b !important;
            }
        }
    `}
`;

const InputRoot = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const InputContainer = styled.div`
`;
