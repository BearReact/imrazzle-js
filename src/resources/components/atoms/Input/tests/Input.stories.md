# Input

## 樣式
input元件分為 material(預設) 與 normal 兩種風格樣式, 依照 `inputType` 屬性進行設定
        
*Material*
        
```javascript
<Input
    placeholder="Real Name"
/>
```
        
*Normal*

```javascript
<Input
    type="text"
    inputType="normal"
    placeholder="Enter the message here…"
/>
```
        
## 圖標
可藉由 props 帶入 code 呈現圖標圖示 `beforeIcon` 和 `afterIcon`

`beforeIcon` 只支援 normal 樣式使用

        
```javascript
<Input
   type="text"
   beforeIconCode="camera"
   beforeIconOnClick={() => alert('beforeIcon clicked')}
   afterIconCode="paper-plane"
   afterIconOnClick={() => alert('afterIcon clicked')}
/>
```

## Readonly
使用 `readonly` 後，Input 將無法點擊、更改值，可搭配 `defaultValue`

## Error
屬性 `errorMessage` 有值時，則會呈現其錯誤之樣式

## Use React-Hook-Form

```javascript
const {register, handleSubmit, errors} = useForm({
   mode: 'onChange',
});

// input
<Input
   ref={register({minLength: 6, maxLength: 12})}
   name="test1"
   type="text"
   placeholder="name"
   afterIconCode="check"
   errorMessage={errors.test1 && 'The email field is blank'}
/>
```
