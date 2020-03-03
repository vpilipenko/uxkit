import React from 'react'

import Text from './src/Text'
import TextReadme from './README.md'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, select, object } from '@storybook/addon-knobs'


storiesOf('Text', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      content: TextReadme,
      codeTheme: 'github',
    },
  })
  .add('Text', () => {
    const sizes = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl']

    return (
      <div>
        <Text
          size={select('Size', { xs: 'xs', s: 's', m: 'm', l: 'l', xl: 'xl', xxl: 'xxl', xxxl: 'xxxl', xxxxl: 'xxxxl' }, 'l')}
          weight={select('Weight', { regular: 'regular', medium: 'medium', bold: 'bold' }, 'regular')}
          theme={select('Theme', { light: 'light' }, 'light')}
          style={object('Style', {})}
        >
          {text('Text', 'Я помню чудное мгновенье: Передо мной явилась ты, Как мимолетное виденье, Как гений чистой красоты.')}
        </Text>
        <br/>
        <br/>
        <br/>
        <h3>Основной компонент для текстов</h3>
        {sizes.map(size => {
          return (
            <div key={size}>
              <Text
                size={size}
              >
                {size} текст
              </Text>
            </div>
          )
        })}
      </div>
    )
  })