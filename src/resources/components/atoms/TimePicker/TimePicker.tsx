// @flow
import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import get from 'lodash/get';

import {isEmpty} from '@utils/equal';
import {paddingLeft} from '@utils/format';

type Props = {
    value?: string;
    name?: string;
    onChange?: Function;
    onClickOk?: Function;
    forwardRef?: Function;
};

/**
 * 產生 時、分、秒陣列
 */
const getTimeData = () => {
    const hourList = [];
    const minuteList = [];
    const secondList = [];

    let number = 0;
    for (let i = 0; i < 24; i += 1) {
        number = paddingLeft(i, 2).toString();
        hourList.push(number);
    }

    for (let i = 0; i < 60; i += 1) {
        number = paddingLeft(i, 2).toString();
        minuteList.push(number);
    }

    for (let i = 0; i < 60; i += 1) {
        number = paddingLeft(i, 2).toString();
        secondList.push(number);
    }

    return {hourList, minuteList, secondList};
};

/**
 * 時間選擇器
 * @param props
 * @constructor
 */
const TimePicker = (props: Props) => {
    const {
        forwardRef, name, value, onChange, onClickOk,
    }: any = props;

    const hourBoxRef: any = useRef();
    const minuteBoxRef: any = useRef();
    const secondBoxRef: any = useRef();
    const inputRef: any = useRef(value);

    // 取得今天日期
    const today = dayjs();

    const time = !isEmpty(value) ? value.split(':') : '';
    const {hourList, minuteList, secondList} = getTimeData();

    const [hour, setHour] = useState(value ? get(time, '0', today.format('HH')) : '00');
    const [minute, setMinute] = useState(value ? get(time, '1', today.format('mm')) : '00');
    const [second, setSecond] = useState(value ? get(time, '2', today.format('ss')) : '00');

    useEffect(() => {
        if (isEmpty(value)) {
            // 當傳給input的value為空時(clean value)，將input的value設為空
            inputRef.current.value = '';
            setHour('00');
            setMinute('00');
            setSecond('00');

            // 移動，時、分、秒到頂部
            hourBoxRef.current.scrollTo({top: 0});
            minuteBoxRef.current.scrollTo({top: 0});
            secondBoxRef.current.scrollTo({top: 0});
        }
    }, [value]);

    useEffect(() => {
        if (value) {
            setHour(hour);
            setMinute(minute);
            setSecond(second);
        }

        const hourIndex = hourList.indexOf(hour);
        const minuteIndex = minuteList.indexOf(minute);
        const secondIndex = secondList.indexOf(second);

        // 移動到現在的，時、分、秒
        hourBoxRef.current.scrollTo({behavior: 'smooth', top: hourIndex * 32});
        minuteBoxRef.current.scrollTo({behavior: 'smooth', top: minuteIndex * 32});
        secondBoxRef.current.scrollTo({behavior: 'smooth', top: secondIndex * 32});
    }, [hour, minute, second]);

    /**
     * 產生 時 的下拉選單
     */
    const renderFakeHourOption = () => hourList.map(i => (
        <FakeOption
            key={`hour-${i}`}
            onClick={() => setHour(i)}
            isActive={hour === i}
        >
            {i}
        </FakeOption>
    ));

    /**
     * 產生 分 的下拉選單
     */
    const renderFakeMinuteOption = () => minuteList.map(i => (
        <FakeOption
            key={`minute-${i}`}
            onClick={() => setMinute(i)}
            isActive={minute === i}
        >
            {i}
        </FakeOption>
    ));

    /**
     * 產生 秒 的下拉選單
     */
    const renderFakeSecondOption = () => secondList.map(i => (
        <FakeOption
            key={`second-${i}`}
            onClick={() => setSecond(i)}
            isActive={second === i}
        >
            {i}
        </FakeOption>
    ));

    /**
     * 選定 時間
     */
    const handleClickOk = () => {
        const updateTimeValue = `${hour}:${minute}:${second}`;

        onChange(updateTimeValue);
        inputRef.current.value = updateTimeValue;

        onClickOk();
    };

    /**
     * 選定 現在時間
     */
    const handleNowTime = () => {
        const reToday = dayjs();
        const nowTime = reToday.format('HH:mm:ss');

        // 設定時間
        onChange(nowTime);
        inputRef.current.value = nowTime;

        // 設定 時、分、秒
        setHour(reToday.format('HH'));
        setMinute(reToday.format('mm'));
        setSecond(reToday.format('ss'));

        onClickOk();
    };

    return (
        <DatePickerRoot>
            <PickContainer>
                {/* 假時 */}
                <FakeSelectContainer>
                    <SelectBox ref={hourBoxRef}>
                        {renderFakeHourOption()}
                    </SelectBox>
                </FakeSelectContainer>

                {/* 假分 */}
                <FakeSelectContainer>
                    <SelectBox ref={minuteBoxRef}>
                        {renderFakeMinuteOption()}
                    </SelectBox>
                </FakeSelectContainer>

                {/* 假秒 */}
                <FakeSelectContainer>
                    <SelectBox ref={secondBoxRef}>
                        {renderFakeSecondOption()}
                    </SelectBox>
                </FakeSelectContainer>
            </PickContainer>

            <ButtonContainer>
                <NowButton onClick={() => handleNowTime()}>此刻</NowButton>
                <ConfirmButton onClick={() => handleClickOk()}>确 定</ConfirmButton>
            </ButtonContainer>

            <input
                ref={e => {
                    forwardRef(e);
                    inputRef.current = e;
                }}
                name={name}
                type="hidden"
            />
        </DatePickerRoot>
    );
};

TimePicker.defaultProps = {
    forwardRef: () => {},
    onChange: () => {},
    onClickOk: () => {},
    name: undefined,
    value: undefined,
};

export default TimePicker;

const NowButton = styled.button`
    color: ${props => props.theme.primaryColor};
    background-color: transparent;
    border: none;
    font-size: inherit;
`;

const ConfirmButton = styled.button`
    background-color: ${props => props.theme.primaryColor};
    color: #fff;
    border: none;
    font-size: inherit;
    border-radius: 2px;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #f0f0f0;
    padding: 4px 12px;
    font-size: 14px;
`;

const FakeOption: any = styled.span`
    cursor: pointer;
    color: rgba(0, 0, 0, 0.65);
    width: 56px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${(props: any) => props.isActive && '#e6f7ff'};

    &:hover {
        background-color: #f5f5f5;
    }
`;

const SelectBox = styled.div`
    height: 192px;
    overflow-x: hidden;
    overflow-y: scroll;
    position: relative;
    border-left: 1px solid #f0f0f0;

    scrollbar-width: thin;
    scrollbar-color: transparent transparent;

    &::-webkit-scrollbar {
        width: 0px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: transparent;
    }
`;

const FakeSelectContainer = styled.div`
    overflow: hidden;
`;

const PickContainer = styled.div`
    display: flex;
    line-height: 1;
`;

const DatePickerRoot = styled.div`
    background-color: #fff;
    width: 168px;
    margin: 5px;
    box-shadow:
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
`;
