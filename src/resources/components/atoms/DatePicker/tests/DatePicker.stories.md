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

isSetTodayVisible 使用後可藉由點擊按鈕將日期設為當日
