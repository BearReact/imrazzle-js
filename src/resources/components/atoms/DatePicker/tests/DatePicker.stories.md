# DatePicker

## 基本樣式
附上`class component`與`Hook`使用方法

```javascript
//React Hook
const [selectedDate, setSelectedDate] = useState(null);

const handleChange = value => {
    setSelectedDate(value);
};

return (
    <DatePicker
        value={selectedDate}
        onChange={handleChange}
    />
)
```

```javascript
//React Class Component
state = {
    selectedDate: null,
};

render(){
    const {selectedDate} = this.state;

    return (
        <DatePicker
            value={selectedDate}
            onChange={this.handleChange}
        />
    );
}
```

## isSetTodayVisible
非必填props，布林值，使用後可藉由點擊按鈕將日期設為當日

```javascript
<DatePicker
    value={selectedDate}
    onChange={this.handleChange}
    isSetTodayVisible
/>
```

## customLocaleWeekDay、customLocaleMonth
非必填props，陣列，可藉由傳入的陣列客製化顯示月份以及一到日的名稱

```javascript
<DatePicker
    value={selectedDate}
    onChange={this.handleChange}
    customLocaleWeekDay={['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7']}
    customLocaleMonth={['1月', '二月', '3月', '四月', '5月', '六月', '7月', '八月', '9月', '十月', '11月', '十二月']}
/>
```
