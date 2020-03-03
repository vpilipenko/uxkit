import React from 'react'

import IconButton from './src/IconButton'
import IconButtonReadme from './README.md'

import { Hamburger } from '@vpilipenko/icons'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
// import { action } from '@storybook/addon-actions'

const sizes = ['s', 'm', 'l']

storiesOf('IconButton', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      content: IconButtonReadme,
      codeTheme: 'github',
    },
  })
  .add('IconButton', () => {
    return (
      <div>
        {sizes.map((size) => {
          return (
            <div key={size} style={{ display: 'inline-block', marginRight: '.5rem', marginBottom: '.5rem' }}>
              <div style={{ marginBottom: '.5rem' }}>
                <IconButton size={size}>
                  <Hamburger />
                </IconButton>
              </div>
              <div style={{ marginBottom: '.5rem' }}>
                <IconButton size={size} disabled>
                  <Hamburger />
                </IconButton>
              </div>
            </div>
          )
        })}
      </div>
    )
  })