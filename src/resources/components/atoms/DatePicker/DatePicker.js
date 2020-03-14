import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import dayjs from 'dayjs';
import { FormattedMessage as I18N, injectIntl } from 'react-intl';
import { isEmpty } from '@utils/equal';
import Icon from '@components/atoms/Icon';
const config = {
    weekDay: [1, 2, 3, 4, 5, 6, 7],
    month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
};
const getLocaleWeekDay = () => {
    return config.weekDay.map((w) => {
        return React.createElement(I18N, { key: `calendarWeekDay-${w}`, id: `calendar.weekDay.${w}`, defaultMessage: w });
    });
};
const getLocaleMonth = () => {
    return config.month.map((m) => {
        return (React.createElement(I18N, { id: `calendar.month.${m}`, defaultMessage: m, key: `calendarLocaleMonth-${m}`, children: formatedMessage => React.createElement("option", { value: m - 1, key: `month-${m}` }, formatedMessage) }));
    });
};
/**
 * 取得 value的 Dayjs 物件
 * @param sourceDate
 * @returns {dayjs.Dayjs}
 */
const getConvertDayjs = (sourceDate) => {
    return dayjs(sourceDate);
};
/**
 * DatePicker
 * 日期選擇器
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const DatePicker = (props) => {
    const { intl: { formatMessage: i18n }, value, format, onChange, name, forwardRef, isSetTodayVisible, } = props;
    const today = dayjs();
    const [inputValue, setInputValue] = useState('');
    const [panelYearMonth, setPanelYearMonth] = useState(value ? dayjs(value) : today);
    const localeWeekDay = getLocaleWeekDay();
    const localeMonth = getLocaleMonth();
    /**
     * 處理選擇日期
     * @param year
     * @param month
     */
    const handleChangePanel = (year = null, month = null) => {
        let newPanelDate = panelYearMonth;
        if (year) {
            newPanelDate = newPanelDate.set('year', year);
        }
        if (!isEmpty(month)) {
            newPanelDate = newPanelDate.set('month', month);
        }
        setPanelYearMonth(newPanelDate);
    };
    const handleConformYear = () => {
        const currentYear = panelYearMonth.get('year');
        const localeText = i18n({ id: 'calendar.pleaseInputYear', defaultMessage: '请输入西元年' });
        // @ts-ignore
        const newYear = parseInt(prompt(localeText, panelYearMonth.get('year')));
        if (newYear !== currentYear) {
            handleChangePanel(newYear, null);
        }
    };
    /**
     * 處理選擇日期
     * @param year
     * @param month
     * @param day
     */
    const handleSelectedDate = (year = null, month = null, day = null) => {
        let newDate = panelYearMonth;
        if (year) {
            newDate = newDate.set('year', year);
        }
        if (!isEmpty(month)) {
            newDate = newDate.set('month', month);
        }
        if (day) {
            newDate = newDate.set('date', day);
        }
        const currentDate = getConvertDayjs(value);
        if (newDate.isSame(currentDate, 'date')) {
            onChange(null);
        }
        else {
            const formatDate = newDate.format(format);
            onChange(formatDate);
            setInputValue(formatDate);
        }
    };
    /**
     * 設定為今天日期
     */
    const handleSelectedToday = () => {
        const formatDate = today.format(format);
        setPanelYearMonth(today);
        onChange(formatDate);
        setInputValue(formatDate);
    };
    /**
     * 產生年月
     * @returns {*}
     */
    const renderYearMonth = () => {
        const panelPreYearMonth = panelYearMonth.subtract(1, 'month');
        const panelNextYearMonth = panelYearMonth.add(1, 'month');
        // 產生年月標題
        return (React.createElement(YearMonthRow, null,
            React.createElement(ChangeControl, null,
                React.createElement(MonthButton, { onClick: () => handleChangePanel(panelPreYearMonth.get('year'), panelPreYearMonth.get('month')) },
                    React.createElement(Icon, { code: "arrow-left", color: "rgba(0, 0, 0, 0.25)", size: 12 })),
                React.createElement(YearMonth, null,
                    React.createElement(Year, { onClick: handleConformYear },
                        panelYearMonth.get('year'),
                        React.createElement(I18N, { id: "calendar.unit.year", defaultMessage: "\u5E74" })),
                    React.createElement(MonthGroup, null,
                        React.createElement(Month, null, localeMonth[panelYearMonth.get('month')]
                            &&
                                React.createElement(I18N, { id: localeMonth[panelYearMonth.get('month')].props.id, defaultMessage: localeMonth[panelYearMonth.get('month')].props.defaultMessage })),
                        React.createElement(MonthSelect, { onChange: e => handleChangePanel(null, panelYearMonth.set('month', e.target.value).get('month')), value: panelYearMonth.get('month') }, localeMonth))),
                React.createElement(MonthButton, { onClick: () => handleChangePanel(panelNextYearMonth.get('year'), panelNextYearMonth.get('month')) },
                    React.createElement(Icon, { code: "arrow-right", color: "rgba(0, 0, 0, 0.25)", size: 12 })))));
    };
    /**
     * 產生週標題
     * @returns {*}
     */
    const renderWeek = () => {
        // 產生週標題
        return (React.createElement(WeekRow, null, localeWeekDay.map((week, index) => {
            // eslint-disable-next-line react/no-array-index-key
            return React.createElement(Week, { key: `week-${index}` }, week);
        })));
    };
    /**
     * 產生上個月的剩餘日期表
     * @returns {Array}
     */
    const renderPreMonthDay = () => {
        const currentDate = getConvertDayjs(value);
        // 取得指定年月的第一天是星期幾 (0, 1-6)
        const currentMonFirstWeek = panelYearMonth.set('date', 1).day();
        // 取 Panel年月 剩餘月份的可放空間 (星期六 ex: 6-1=5格, 星期日則為7天)
        const preMonthFirstContainer = currentMonFirstWeek === 0 ? 6 : currentMonFirstWeek - 1;
        // 取 Panel年月 上個月的最後一天是幾號
        const preMonth = panelYearMonth.subtract(1, 'month');
        const preMonthLastDay = parseInt(preMonth.endOf('month').get('date'));
        // 取 Panel年月 結束日從幾號開始
        const preMonthFirstDay = preMonthLastDay - preMonthFirstContainer;
        // 產生 Panel年月 上個月的剩餘日期表
        const preMonFirstDayList = new Array(preMonthLastDay);
        for (let d = 0; d < preMonthFirstContainer; d++) {
            const day = preMonthFirstDay + d + 1;
            preMonFirstDayList[d] = (React.createElement(PreDay, { key: `preMonthDay-${d}`, isSelected: currentDate.isSame(preMonth.set('date', day), 'date'), onClick: () => handleSelectedDate(preMonth.year(), preMonth.month(), day) },
                React.createElement("span", null, day)));
        }
        return preMonFirstDayList;
    };
    /**
     * 產生下個月的剩餘日期表
     * @returns {Array}
     */
    const renderNextMonthDay = () => {
        const currentDate = getConvertDayjs(value);
        // 取得指定年月的第一天是星期幾 (0, 1-6)
        const currentMonFirstWeek = panelYearMonth.set('date', 1).day();
        // 取 Panel年月 上個月份的已放空間 (星期六 ex: 6-1=5格, 星期日則為7天)
        const preMonthFirstContainer = currentMonFirstWeek === 0 ? 6 : currentMonFirstWeek - 1;
        // 取 Panel年月 這個月的最後一天是幾號
        const panelMonthLastDay = panelYearMonth.endOf('month').get('date');
        const nextMonth = panelYearMonth.add(1, 'month');
        // 取得指定年月下個月剩餘月份可放空間
        const nextMonthEndContainer = (7 * 6) % (preMonthFirstContainer + panelMonthLastDay);
        // 產生上個月的剩餘日期表
        const nextMonEndDayList = new Array(nextMonthEndContainer);
        for (let d = 0; d < nextMonthEndContainer; d++) {
            const day = d + 1;
            nextMonEndDayList[d] = (React.createElement(PreDay, { key: `nextMonthDay-${d}`, isSelected: currentDate.isSame(nextMonth.set('date', day)), onClick: () => handleSelectedDate(nextMonth.year(), nextMonth.month(), day) },
                React.createElement("span", null, day)));
        }
        return nextMonEndDayList;
    };
    /**
     * 產生當月日期表
     * @returns {*}
     */
    const renderCurrentMonthDay = () => {
        const currentDate = getConvertDayjs(value);
        // 取 Panel年月 的最後一天
        const currentMonthLastDay = panelYearMonth.endOf('month').get('date');
        // 產生 Panel年月 當月日期表
        const currentDayList = new Array(currentMonthLastDay);
        for (let d = 0; d < currentMonthLastDay; d++) {
            const dayNumber = d + 1;
            const eachDate = panelYearMonth.set('date', dayNumber);
            currentDayList[d] = (React.createElement(Day, { key: `currentDay-${d}`, isToday: today.isSame(eachDate, 'date'), isSelected: currentDate.isSame(eachDate, 'date'), onClick: () => handleSelectedDate(panelYearMonth.year(), panelYearMonth.month(), dayNumber) },
                React.createElement("span", null, dayNumber)));
        }
        return (React.createElement(DayRow, null,
            renderWeek(),
            renderPreMonthDay(),
            currentDayList,
            renderNextMonthDay()));
    };
    const renderTodayButton = () => {
        return (React.createElement(LabelCheckCardCreate, null,
            React.createElement(TodayButton, { size: "small", onClick: handleSelectedToday },
                React.createElement("span", null,
                    React.createElement(I18N, { id: "calendar.setToday", defaultMessage: "\u8BBE\u5B9A\u4E3A\u4ECA\u5929" })))));
    };
    return (React.createElement(DatePickerRoot, null,
        renderYearMonth(),
        renderCurrentMonthDay(),
        isSetTodayVisible && renderTodayButton(),
        React.createElement("input", { ref: e => forwardRef && forwardRef(e), name: name, type: "hidden", value: inputValue })));
};
DatePicker.defaultProps = {
    value: undefined,
    format: 'YYYY-MM-DD',
    name: undefined,
    forwardRef: () => { },
    isSetTodayVisible: false,
};
// @ts-ignore
export default injectIntl(DatePicker);
const TodayButton = styled.button `
    color: ${(props) => props.theme.primaryColor};
    background-color: transparent;
    flex: 1 1 auto;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    font-size: 14px;
    line-height: 38px;
`;
const LabelCheckCardCreate = styled.div `
    display: flex;
    align-items: center;
    border-top: solid 1px #f0f0f0;
    cursor: pointer;
`;
const Week = styled.div `
    flex: 0 0 36px;
    color: rgba(0, 0, 0, 0.65);
    width: 36px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    font-size: 13px;
`;
const WeekRow = styled.div `
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;
const Day = styled(Week) `
    position: relative;
    span{
        z-index: 1;
    }

    :before{
        content: '';
        border-radius: 99px;
        position: absolute;
        width: 80%;
        height: 80%;
        z-index: 0;
    }

    :hover{
        color: #ababab;
        cursor: pointer;
    }

    ${(props) => props.isToday && css `
        color: ${(props) => props.theme.primaryColor};
    `};


    ${(props) => props.isSelected && css `
        color: #fff;

        :before{
            background-color: ${(props) => props.theme.primaryColor};
        }

        :hover{
            color: #fff;
        }
    `};
`;
const PreDay = styled(Day) `
    color: rgba(0, 0, 0, 0.25);
    span{
        z-index: 1;
    }

    ${(props) => props.isSelected && css `
        color: #fff;

        :before{
            background-color: ${(props) => props.theme.primaryColor};
        }

        :hover{
            color: #fff;
        }
    `}
`;
const DayRow = styled.div `
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 8px 12px;
`;
const MonthButton = styled.button `
    padding: 0;
    border: none;
    background-color: transparent;
    width: 30px;

    :hover{
        .iconfont{
            color: rgba(0, 0, 0, 0.65);
        }
    }

    .iconfont {
        transition: color .3s;
    }
`;
const ChangeControl = styled.div `
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 0 12px;
`;
const MonthSelect = styled.select `
    position: absolute;
    opacity: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
`;
const Month = styled.span `
    color: inherit;
    font-size: 14px;
    flex: 0 0 auto;
`;
const MonthGroup = styled.div `
    position: relative;
`;
const Year = styled.span `
    color: inherit;
    font-size: 14px;
    flex: 0 0 auto;
    cursor: pointer;
    margin-right: 5px;
`;
const YearMonth = styled.div `
    color: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
`;
const YearMonthRow = styled.div `
    display: flex;
    flex-direction: row;
    justify-content: center;
    border-bottom: solid 1px #f0f0f0;
    line-height: 38px;
`;
const DatePickerRoot = styled.div `
    background-color: #fff;
    width: calc(36px * 7 + 24px);
    margin: 0 auto;
    box-shadow:
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
`;
//# sourceMappingURL=DatePicker.js.map