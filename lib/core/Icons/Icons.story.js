import React from 'react'

import * as allIcons from './src'
import IconsReadme from './README.md'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'


storiesOf('Icons', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      content: IconsReadme,
      codeTheme: 'github',
    },
  })
  .add('Default', () => {
    return (
      <div>
        {Object.keys(allIcons).map(key => {
          const Icon = allIcons[key]
          return (
            <div style={{
              display: 'inline-flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '5rem',
              height: '5rem',
              padding: '.5rem'
            }}>
              <Icon size='40'/>
              <small>{key}</small>
            </div>
          )
        })}
      </div>
    )
  })