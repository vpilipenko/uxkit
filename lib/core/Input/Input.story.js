import React from 'react'

import Input from './src/Input'
import InputReadme from './README.md'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, select, object } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import { Alert } from '@vpilipenko/icons'



storiesOf('Input', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      content: InputReadme,
      codeTheme: 'github',
    },
  })
  .add('Input', () => {
    const sizes = ['l', 'm', 's']

    return (
      <div>
        <Input
          name='storyInput'
          value={text('Value', '')}
          defaultValue={text('Default value', '')}
          size={select('Size', { s: 's', m: 'm', l: 'l' }, 'l')}
          theme={select('Theme', { light: 'light' }, 'light')}
          placeholder={text('Placeholder', 'Плейсхолдер')}
          prefix={text('Prefix', '')}
          suffix={text('Suffix', '')}
          onChange={action('onChange')}
          onBlur={action('onBlur')}
          onFocus={action('onFocus')}
          hint={text('Hint', 'Инпут для кнобсов')}
          error={text('Error', '')}
          clear={boolean('Clear', true)}
          clearValue={text('ClearValue', '')}
          disabled={boolean('Disabled', false)}
          style={object('Style', {})}
        />
        <br />
        <br />
        <br />
        <h3>Компонент ввода</h3>
        <p>Основной интерфейсный компонент ввода текста</p>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          {sizes.map(size => (
            <div key={size} style={{ display: 'inline-block', marginRight: '.5rem', marginBottom: '.5rem' }}>
              <div style={{ marginBottom: '.5rem' }}>
                <Input
                  placeholder='Введите имя'
                  size={size}
                />
              </div>
              <div style={{ marginBottom: '.5rem' }}>
                <Input
                  placeholder='Введите имя'
                  size={size}
                  disabled
                />
              </div>
              <div><small>{size}</small></div>
            </div>
          ))}
        </div>
        <h3>Компонент ввода с крестиком</h3>
        <p>Когда в поле ввода есть значение, появлется крестик при нажатии на который удаляется значение.</p>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          {sizes.map(size => (
            <div key={size} style={{ display: 'inline-block', marginRight: '.5rem', marginBottom: '.5rem' }}>
              <div style={{ marginBottom: '.5rem' }}>
                <Input
                  value='Константинопольский Константин'
                  size={size}
                  clear
                />
              </div>
              <div style={{ marginBottom: '.5rem' }}>
                <Input
                  value='Константинопольский Константин'
                  size={size}
                  clear
                  disabled
                />
              </div>
              <div><small>{size}</small></div>
            </div>
          ))}
        </div>
        <h3>Во всю ширину</h3>
        <p>Поле занимает 100% от ширины родителя</p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {sizes.map(size => (
            <div key={size} style={{ marginBottom: '.5rem' }}>
              <Input
                placeholder='Плейсхолдер'
                size={size}
                fullWidth
              />
            </div>
          ))}
        </div>
        <h3>С ошибками</h3>
        <p>Ошибка может подсвечивать бордер и выводить текст ошибки под полем</p>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          {sizes.map(size => (
            <div key={size} style={{ display: 'inline-block', marginRight: '.5rem', marginBottom: '.5rem' }}>
              <div style={{ marginBottom: '.5rem' }}>
                <Input
                  value='Мирцэйдес'
                  size={size}
                  clear
                  error='Такого не существует'
                />
              </div>
            </div>
          ))}
        </div>
        <h3>Компонент ввода с иконкой</h3>
        <p>Иконка или любой другой копонент может быть размещена как вначале инпута, так и в конце.</p>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          {sizes.map(size => (
            <div key={size} style={{ display: 'inline-block', marginRight: '.5rem', marginBottom: '.5rem' }}>
              <div style={{ marginBottom: '.5rem' }}>
                <Input
                  placeholder='Иконка'
                  size={size}
                  prefix={
                    <div><Alert size='24' fill='red' /></div>
                  }
                  suffix={
                    <div><Alert size='24' fill='red' /></div>
                  }
                />
              </div>
              <div style={{ marginBottom: '.5rem' }}>
                <Input
                  placeholder='Иконка'
                  size={size}
                  disabled
                  prefix={
                    <Alert size='24' fill='red' />
                  }
                  suffix={
                    <Alert size='24' fill='red' />
                  }
                />
              </div>
              <div><small>{size}</small></div>
            </div>
          ))}
        </div>
      </div>
    )
  })