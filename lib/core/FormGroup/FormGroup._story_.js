import React from 'react'

import FormGroup from './src/FormGroup'
import FormGroupReadme from './README.md'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, select, object } from '@storybook/addon-knobs'

import Input from '@vpilipenko/input'


storiesOf('FormGroup', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      content: FormGroupReadme,
      codeTheme: 'github',
    },
  })
  .add('FormGroup', () => {
    const sizes = ['l', 'm', 's']

    return (
      <div>
        <FormGroup
          label={text('Label', 'Модель автобуса')}
          size={select('Size', { s: 's', m: 'm', l: 'l' }, 'l')}
          theme={select('Theme', { light: 'light' }, 'light')}
          style={object('Style', {})}
        >
          <Input
            size={select('Size', { s: 's', m: 'm', l: 'l' }, 'l')}
            theme={select('Theme', { light: 'light' }, 'light')}
            defaultValue='Мерседес-Бенц Спринтер'
          />
        </FormGroup>
        <br/>
        <br/>
        <br/>
        <h3>Компонент группа элемента ввода</h3>
        <p>Основной «строительный» инструмент для создания интерфейсов. Используется практически везде.</p>
        {sizes.map(size => {
          return (
            <FormGroup
              size={size}
              key={size}
            >
              <Input size={size} placeholder='Любой компонент' hint={size} />
            </FormGroup>
          )
        })}
      </div>
    )
  })