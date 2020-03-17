# TimePicker

## How to use 
```javascript
<TimePicker/>
```

## With Hook Form
```javascript
const {register, handleSubmit} = useForm({
    mode: 'onChange',
});

const onSubmit = formData => {
    console.log(formData.timePicker);
};

<form onSubmit={handleSubmit(onSubmit)}>
    <TimePicker
        forwardRef={register}
        name="timePicker"
    />
</form>
```
