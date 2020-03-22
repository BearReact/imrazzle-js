# Select

## How To Use
```javascript
const FakeOption = [
    {value: '', text: '請選擇'},
    {value: 1, text: '選項1'},
    {value: 2, text: '選項2'},
    {value: 3, text: '選項3'},
];

<Select title="Country" option={FakeOption}/>
```

## With Hook Form
```javascript
import {useForm} from 'react-hook-form';

const {register, handleSubmit} = useForm();

const onSubmit = (data: any) => {
    console.log(data);
};

const FakeOption = [
    {value: '', text: '請選擇'},
    {value: 1, text: '台灣'},
    {value: 2, text: '中國'},
    {value: 3, text: '美國'},
];

<form onSubmit={handleSubmit(onSubmit)}>
    <Select
        forwardRef={register({required: true})}
        name="select"
        title="Country"
        option={FakeOption}
    />

    <button className="mt-3" type="submit">送 出</button>
</form>
```
