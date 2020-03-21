import React from 'react'

import InputTime from './src'
import InputTimeReadme from './README.md'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { State, Store } from '@sambego/storybook-state'
import { action } from '@storybook/addon-actions'

const store = new Store({
  time: new Date()
})

// setInterval(() => {
//   store.set({ time: new Date() })
// }, 1000)

storiesOf('InputTime', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      content: InputTimeReadme,
      codeTheme: 'github',
    },
  })
  .add('Default', () => {
    return (
      <div>
        <State store={store}>
          {state => (
            <div>
              <div>{JSON.stringify(state)}</div>
              <InputTime
                value={state.time}
                AMPM={boolean('AMPM', false)}
                showHour={boolean('showHour', true)}
                showMinute={boolean('showMinute', true)}
                showSecond={boolean('showSecond', true)}
                onTimeChange={date => store.set({ time: date })}
                onInputChange={e => console.log(e)}
              />
              <InputTime
                value={state.time}
                AMPM={boolean('AMPM', false)}
                showHour={boolean('showHour', true)}
                showMinute={boolean('showMinute', true)}
                showSecond={boolean('showSecond', true)}
                onTimeChange={date => store.set({ time: date })}
                onInputChange={e => console.log(e)}
                disabled
              />
            </div>
          )}
        </State>
      </div>
    )
  })