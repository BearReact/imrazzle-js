
/**
 * DatePickerInput
 */
import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import {media} from '@styled-bs-grid';
import px2vw from '@config/utils/getPx2vw';
import DatePicker from '@components/atoms/DatePicker';
import Icon from '@components/atoms/Icon';

type Props = {
    label?: string;
    isSetTodayVisible?: boolean;
};

const DateInput = (props: Props) => {
    const {label, isSetTodayVisible}: any = props;

    const [selectedDate, setSelectedDate] = useState(null);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

    const handleChange = (value: any) => {
        setSelectedDate(value);
    };

    const handleDatePickerVisible = (value: any) => {
        setIsDatePickerVisible(value);
    };

    const handleClearDate = () => {
        setSelectedDate(null);
    };

    return (
        <InputContainer
            selectedDate={selectedDate}
        >
            <FakeInput onClick={() => handleDatePickerVisible(true)}>
                <Label>{selectedDate || label}</Label>

                <CalendarIcon code="calendar-alt" color="#c3c3c3"/>

                <ClearIcon code="times-circle" color="#c3c3c3" onClick={() => handleClearDate()}/>
            </FakeInput>

            <DatePickerContainer isVisible={isDatePickerVisible}>
                <DatePicker
                    value={selectedDate}
                    onChange={handleChange}
                    onClose={() => handleDatePickerVisible(false)}
                    isSetTodayVisible={isSetTodayVisible}
                />
            </DatePickerContainer>

            <CloseArea isVisible={isDatePickerVisible} onClick={() => handleDatePickerVisible(false)}/>
        </InputContainer>
    );
};

DateInput.defaultProps = {
    label: '',
    isSetTodayVisible: false,
};

export default DateInput;

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
    left: 0;
    right: 0;
    top: calc(100% + 1px);
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

