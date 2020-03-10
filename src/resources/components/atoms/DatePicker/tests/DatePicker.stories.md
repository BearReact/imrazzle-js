# DatePicker


ref: [带你开发一个日历控件](https://juejin.im/post/5a2f0e63f265da43294e01ec)

## How to use 
```javascript

const [selectedDate, setSelectedDate] = useState(null);

const FComponent = () => {
    const handleChange = value => {
        setSelectedDate(value);
    };
    
    return (
        <DatePicker
            value={selectedDate}
            onChange={handleChange}
        />
    )
}
```

## 客製化日期顯示

可藉由傳入的陣列客製化顯示月份以及一到日的名稱 customLocaleWeekDay、customLocaleMonth

```javascript
<DatePicker
    value={selectedDate}
    onChange={this.handleChange}
    customLocaleWeekDay={['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7']}
    customLocaleMonth={['1月', '二月', '3月', '四月', '5月', '六月', '7月', '八月', '9月', '十月', '11月', '十二月']}
/>
```

isSetTodayVisible 使用後可藉由點擊按鈕將日期設為當日
