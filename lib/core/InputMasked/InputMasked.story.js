import React from 'react'

import InputMasked from './src/InputMasked'
import InputDateReadme from './README.md'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { State, Store } from '@sambego/storybook-state'
import { action } from '@storybook/addon-actions'

const store = new Store({
})

storiesOf('InputMasked', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      content: InputDateReadme,
      codeTheme: 'github',
    },
  })
  .add('Default', () => {
    return (
      <div>
        <State store={store}>
          <InputMasked />
          <InputMasked disabled style={{ marginLeft: '32px' }}/>
        </State>
      </div>
    )
  })