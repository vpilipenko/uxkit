# Input 🐖🐖🐖

Component of an input text field.

```js
  import Input from 'AP/Input'
```
<!-- STORY -->
<br/>

### Usage example
```js
<Input
  name='storyInput'
  size='m'
  placeholder='Плейсхолдер'
  prefix={
    <Icon size='24' fill='red'>
      <Alert />
    </Icon>
  }
  suffix={
    <Icon size='24' fill='red'>
      <Alert />
    </Icon>
  }
  hint='Подсказка'
  error='Ошибка'
  clear={true}
  clearValue=''
/>
```
<br/>
<!-- PROPS -->