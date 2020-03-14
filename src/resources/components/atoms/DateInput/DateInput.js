/**
 * DatePickerInput
 */
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { media } from '@styled-bs-grid';
import px2vw from '@config/utils/getPx2vw';
import DatePicker from '@components/atoms/DatePicker';
import Icon from '@components/atoms/Icon';
const DateInput = (props) => {
    const { label, isSetTodayVisible } = props;
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const handleChange = (value) => {
        setSelectedDate(value);
    };
    const handleDatePickerVisible = (value) => {
        setIsDatePickerVisible(value);
    };
    const handleClearDate = () => {
        setSelectedDate(null);
    };
    return (React.createElement(InputContainer, { selectedDate: selectedDate },
        React.createElement(FakeInput, { onClick: () => handleDatePickerVisible(true) },
            React.createElement(Label, null, selectedDate ? selectedDate : label),
            React.createElement(CalendarIcon, { code: "calendar-alt", color: "#c3c3c3" }),
            React.createElement(ClearIcon, { code: "times-circle", color: "#c3c3c3", onClick: () => handleClearDate() })),
        React.createElement(DatePickerContainer, { isVisible: isDatePickerVisible },
            React.createElement(DatePicker, { value: selectedDate, onChange: handleChange, onClose: () => handleDatePickerVisible(false), isSetTodayVisible: isSetTodayVisible })),
        React.createElement(CloseArea, { isVisible: isDatePickerVisible, onClick: () => handleDatePickerVisible(false) })));
};
DateInput.defaultProps = {
    label: '',
    isSetTodayVisible: false,
};
export default DateInput;
const CloseArea = styled.div `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: ${(props) => props.isVisible ? 0 : -1};
`;
const CustomIcon = styled(Icon) `
    width: ${px2vw(42)};
    height: 100%;
    transition: opacity .3s ease;

    ${media.lg `
        width: 48px;
    `}
`;
const CalendarIcon = styled(CustomIcon) ``;
const ClearIcon = styled(CustomIcon) `
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
`;
const Label = styled.span `
    font-size: ${px2vw(14)};

    ${media.lg `
        font-size: 16px;
    `}
`;
const DatePickerContainer = styled.div `
    position: absolute;
    left: 0;
    right: 0;
    top: calc(100% + 1px);
    visibility: ${(props) => props.isVisible ? 'visible' : 'hidden'};
    opacity: ${(props) => props.isVisible ? 1 : 0};
    z-index: ${(props) => props.isVisible ? 1 : -1};
    transition: opacity .5s ease;
`;
const FakeInput = styled.div `
    color: #8d8d8d;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const InputContainer = styled.div `
    width: ${px2vw(280)};
    height: ${px2vw(44)};
    padding-left: ${px2vw(10)};
    cursor: pointer;
    margin: 0 auto;
    position: relative;
    border: solid 1px #8d8d8d;

    ${media.lg `
        width: 460px;
        height: 50px;
        padding-left: 20px;
    `}

    ${(props) => props.selectedDate && css `
        border: solid 1px ${(props) => props.theme.primaryColor};

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
//# sourceMappingURL=DateInput.js.map