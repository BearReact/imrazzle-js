# TimeInput

## How to use 
```javascript
<TimeInput label="Payment Time"/>
```

## With Hook Form
```javascript
import {useForm} from 'react-hook-form';

const {register, handleSubmit} = useForm({
    mode: 'onChange',
});

const onSubmit = formData => {
    // 取回的input值
    // eslint-disable-next-line no-console
    console.log('formData.timePicker', formData.timePicker);
};

<form onSubmit={handleSubmit(onSubmit)}>
    <TimeInput
        forwardRef={register}
        name="timePicker"
        label="Payment Time"
    />

    <input className="mt-3" type="submit" value="送出"/>
</form>
```
