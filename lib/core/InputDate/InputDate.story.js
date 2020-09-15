import React from 'react'

import InputDate from './src'
import InputDateReadme from './README.md'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { State, Store } from '@sambego/storybook-state'
import { action } from '@storybook/addon-actions'

const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear - 1, 10, 15);
const toMonth = new Date(currentYear + 1, 11);

const store = new Store({
  'date': new Date(),
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
          {state => (
            <div>
              <div><small>State = {JSON.stringify(state, null, 2)}</small></div><br/>
              <InputDate
                fromMonth={fromMonth}
                toMonth={toMonth}
                yearMonthSelect
                value={state.date}
                size='s'
                onDayChange={date => store.set({ date: date })}
                dayPickerProps={{
                    enableOutsideDaysClick: false,
                    showOutsideDays: false,
                    disabledDays: [{
                      before: fromMonth,
                      after: toMonth,
                    }]
                  }}
              />
            </div>
          )}
        </State>
      </div>
    )
  })