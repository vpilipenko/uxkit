# Radio 🏎🏎🏎

Radio buttons component

```js
  import RadioGroup from '@apass/radio-group'
```
<!-- STORY -->
<br/>

### Usage example
```js
const options = [
  { label: 'БМВ', value: '0'},
  { label: 'Ауди', value: '1'},
  { label: 'Мерседес', value: '2'},
]

// Выбор одного элемента списка
<RadioGroup
  value={''}
  options={options}
  labelKey='label'
  onChange={}
/>
```
<br/>
<!-- PROPS -->