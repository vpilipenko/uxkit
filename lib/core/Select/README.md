# Select 🏎🏎🏎

Component of an Select text field.

```js
  import Select from '@apass/select'
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
<Select
  value={''}
  placeholder='Выберите марку автомобиля'
  options={options}
  labelKey='label'
  onChange={}
/>

// Выбор нескольних элементов списка
<Select
  value={[]}
  options={options}
/>
```
<br/>
<!-- PROPS -->