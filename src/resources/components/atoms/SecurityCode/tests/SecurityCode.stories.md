# SecurityCode

安全認證碼輸入框

```javascript
<SecurityCode length={4}/>
```

安全認證碼輸入框 + React-Hook-Form  
註冊表格的部分多了驗證條件`register`

```javascript
const {register, handleSubmit} = useForm({
    mode: 'onChange',
});

const onSubmit = formData => {
    // mySubmitFunc(formData);
};

<form onSubmit={handleSubmit(onSubmit)}>
    <SecurityCode
        forwardRef={register({
            required: 'required error',
            minLength : {
                value: 4,
                message: 'length is not 4',
            },
            maxLength : {
                value: 4,
                message: 'length is not 4',
            },
            pattern: {
                value: /[A-Za-z0-9]/,
                message: 'pattern error',
            },
        })}
        name="securityCode"
        length={codeLength}
    />
</form>
```
