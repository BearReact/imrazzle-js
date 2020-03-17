import React, {useRef, useState} from 'react';
import styled, {css} from 'styled-components';
import {media} from '@styled-bs-grid';
import {isMobile} from '@utils/browser';
import px2vw from '@config/utils/getPx2vw';
import DatePicker from '@components/atoms/DatePicker';
import Icon from '@components/atoms/Icon';

type Props = {
    label?: string;
    name?: string;
    value?: string;
    isSetTodayVisible?: boolean;
    forwardRef?: Function;
};

/**
 * DatePicker Input
 * @param props
 * @constructor
 */
const DateInput = (props: Props) => {
    const {
        label, isSetTodayVisible, value, name, forwardRef,
    }: any = props;

    const mobileInputRef: any = useRef();
    const [selectedDate, setSelectedDate] = useState(value);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

    const handleOnChange = (dateValue: number) => {
        setSelectedDate(dateValue);
    };

    const handleClearDate = (e: any) => {
        e.stopPropagation();
        setSelectedDate(null);
    };

    const handleDatePickerVisible = (isVisible = false) => {
        setIsDatePickerVisible(isVisible);
    };

    const renderDatePicker = () => {
        if (isMobile()) {
            return (
                <MobileInput
                    ref={e => {
                        forwardRef(e);
                        mobileInputRef.current = e;
                    }}
                    name={name}
                    type="date"
                    step={1}
                    onChange={() => handleOnChange(mobileInputRef.current.value)}
                />
            );
        }
        return (
            <DatePickerContainer isVisible={isDatePickerVisible}>
                <DatePicker
                    forwardRef={forwardRef}
                    name={name}
                    value={selectedDate}
                    onChange={handleOnChange}
                    onClose={() => handleDatePickerVisible(false)}
                    isSetTodayVisible={isSetTodayVisible}
                />
            </DatePickerContainer>
        );
    };

    return (
        <InputContainer
            selectedDate={selectedDate}
        >
            <FakeInput onClick={() => handleDatePickerVisible(true)}>
                <Label>{selectedDate || label}</Label>

                <CalendarIcon code="calendar-alt" color="#c3c3c3"/>

                <ClearIcon code="times-circle" color="#c3c3c3" onClick={handleClearDate}/>
            </FakeInput>

            {renderDatePicker()}

            <CloseArea isVisible={isDatePickerVisible} onClick={() => handleDatePickerVisible(false)}/>
        </InputContainer>
    );
};

DateInput.defaultProps = {
    label: '',
    name: undefined,
    value: undefined,
    isSetTodayVisible: false,
    forwardRef: () => {},
};

export default DateInput;

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
    width: ${px2vw(42)};
    height: 100%;
    transition: opacity .3s ease;

    ${media.lg`
        width: 48px;
    `}
`;

const CalendarIcon = styled(CustomIcon)``;

const ClearIcon = styled(CustomIcon)`
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
`;

const Label = styled.span`
    font-size: ${px2vw(14)};

    ${media.lg`
        font-size: 16px;
    `}
`;

const DatePickerContainer: any = styled.div`
    position: absolute;
    left: 50%;
    top: calc(100% + 1px);
    transform: translateX(-50%);
    visibility: ${(props: any) => (props.isVisible ? 'visible' : 'hidden')};
    opacity: ${(props: any) => (props.isVisible ? 1 : 0)};
    z-index: ${(props: any) => (props.isVisible ? 1 : -1)};
    transition: opacity .5s ease;
`;

const FakeInput = styled.div`
    color: #8d8d8d;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const InputContainer: any = styled.div`
    width: ${px2vw(280)};
    height: ${px2vw(44)};
    padding-left: ${px2vw(10)};
    cursor: pointer;
    margin: 0 auto;
    position: relative;
    border: solid 1px #8d8d8d;

    ${media.lg`
        width: 460px;
        height: 50px;
        padding-left: 20px;
    `}

    ${(props: any) => props.selectedDate && css`
        border: solid 1px ${props.theme.primaryColor};

        &:hover {
            ${ClearIcon} {
                opacity: 1;
            }

            ${CalendarIcon} {
                opacity: 0;
            }
        }
    `}
`;

