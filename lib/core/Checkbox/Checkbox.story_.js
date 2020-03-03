import React from 'react'

import Checkbox from './src/Checkbox'
import CheckboxReadme from './README.md'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, select, object } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'


storiesOf('Checkbox', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      content: CheckboxReadme,
      codeTheme: 'github',
    },
  })
  .add('Checkbox', () => {
    const sizes = ['l', 'm', 's']

    return (
      <div>
        <Checkbox
          label={text('Label', 'Заправить автобус')}
          name={text('Name', 'storyCheckbox')}
          checked={boolean('Checked', true)}
          size={select('Size', { s: 's', m: 'm', l: 'l' }, 'l')}
          theme={select('Theme', { light: 'light' }, 'light')}
          error={boolean('Error', false)}
          onChange={action('onChange')}
          disabled={boolean('Disabled', false)}
          fullWidth={boolean('Full width', false)}
          style={object('Style', {})}
        />
        <br />
        <br />
        <br />
        <h3>Компонент чекбокс</h3>
        <p>Основной инструмент для создания списков</p>
        {sizes.map(size => {
          const labels = {
            s: 'Маленький чекбоксик',
            m: 'Средний чекбокс',
            l: 'Большой чекбоксище',
          }
          return (
            <Checkbox
              label={labels[size]}
              checked
              size={size}
              key={size}
              fullWidth
              style={{ marginBottom: '.75rem' }}
            />
          )
        })}
      </div>
    )
  })