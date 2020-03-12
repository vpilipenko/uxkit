import React from 'react'

import InputDate from './src'
import InputDateReadme from './README.md'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { State, Store } from '@sambego/storybook-state'
import { action } from '@storybook/addon-actions'

const store = new Store({
  fileList: [],
})

storiesOf('InputDate', module)
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
          <InputDate />
        </State>
      </div>
    )
  })