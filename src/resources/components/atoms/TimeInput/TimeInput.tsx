import React, {useState, useRef} from 'react';
import styled, {css} from 'styled-components';
import {media} from '@styled-bs-grid';
import {isMobile} from '@utils/browser';
import px2vw from '@config/utils/getPx2vw';
import Icon from '@components/atoms/Icon';
import TimePicker from '@components/atoms/TimePicker';

type Props = {
    label?: string;
    value?: string | null;
    name?: string;
    forwardRef?: Function;
};

/**
 * Time Input 時間選擇輸入控制項
 *
 * @param props
 * @constructor
 */
const TimeInput = ({
    value,
    name,
    label = '',
    forwardRef = (e: any) => {},
}: Props) => {

    const mobileInputRef = useRef();
    const [selectedTime, setSelectedTime]: any = useState(value);
    const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);

    const handleTimePickerVisible = (visible: any) => {
        setIsTimePickerVisible(visible);
    };

    const handleOnChange = (currentValue: any) => {
        setSelectedTime(currentValue);
    };

    const handleClearTime = (e: any) => {
        e.stopPropagation();
        setSelectedTime(null);
    };

    return (
        <InputContainer selectedTime={selectedTime}>
            <FakeInput onClick={() => handleTimePickerVisible(true)}>
                <Label>
                    {selectedTime || label}
                </Label>

                <AfterIcon code="clock" color="#c3c3c3"/>

                <ClearIcon code="times-circle" color="#c3c3c3" onClick={(e: any) => handleClearTime(e)}/>
            </FakeInput>

            {
                isMobile() ? (
                    <MobileInput
                        ref={(e: any) => {
                            forwardRef(e);
                            mobileInputRef.current = e;
                        }}
                        name={name}
                        type="time"
                        step={1}
                        onChange={e => handleOnChange(e.target.value)}
                    />
                ) : (
                    <>
                        <TimePickerContainer isVisible={isTimePickerVisible}>
                            <TimePicker
                                forwardRef={forwardRef}
                                name={name}
                                value={selectedTime}
                                onChange={handleOnChange}
                                onClickOk={() => handleTimePickerVisible(false)}
                            />
                        </TimePickerContainer>

                        <CloseArea isVisible={isTimePickerVisible} onClick={() => handleTimePickerVisible(false)}/>
                    </>
                )
            }
        </InputContainer>
    );
};

export default TimeInput;

const MobileInput = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    position: absolute;
    left: 0;
    top: 0;
    background-color: transparent;
    opacity: 0;
`;

const CloseArea: any = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: ${(props: any) => (props.isVisible ? 0 : -1)};
`;

const CustomIcon = styled(Icon)`
    transition: opacity .3s ease;
    margin-right: 10px;
`;

const AfterIcon = styled(CustomIcon)``;

const ClearIcon = styled(CustomIcon)`
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    opacity: 0;
    margin: auto;
`;

const Label = styled.span`
    font-size: ${px2vw(14)};

    ${media.lg`
        font-size: 16px;
    `}
`;

const FakeInput = styled.div`
    color: #8d8d8d;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const TimePickerContainer: any = styled.div`
    position: absolute;
    left: 50%;
    top: calc(100% + 1px);
    visibility: ${(props: any) => (props.isVisible ? 'visible' : 'hidden')};
    opacity: ${(props: any) => (props.isVisible ? 1 : 0)};
    z-index: ${(props: any) => (props.isVisible ? 1 : -1)};
    transform: translateX(-50%);
    transition: opacity .5s ease;
`;

const InputContainer: any = styled.div`
    width: ${px2vw(280)};
    height: ${px2vw(44)};
    padding-left: ${px2vw(10)};
    cursor: pointer;
    position: relative;
    border: solid 1px #8d8d8d;

    &:hover {
        border: solid 1px ${props => props.theme.primaryColor};
    }

    ${media.lg`
        width: 460px;
        height: 50px;
        padding-left: 20px;
    `}

    ${(props: any) => props.selectedTime && css`
        border: solid 1px ${(i: any) => i.theme.primaryColor};

        &:hover {
            ${ClearIcon} {
                opacity: 1;
            }

            ${AfterIcon} {
                opacity: 0;
            }
        }
    `}
`;
