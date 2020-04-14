import React from 'react'

import MenuItem from './src'
// import InputTimeReadme from './README.md'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { State, Store } from '@sambego/storybook-state'


storiesOf('Menu', module)
  .addDecorator(withKnobs)
  // .addParameters({
  //   readme: {
  //     content: InputTimeReadme,
  //     codeTheme: 'github',
  //   },
  // })
  .add('MenuItem', () => {
    return (
      <div>
        <MenuItem size='m' active>123</MenuItem>
      </div>
    )
  })