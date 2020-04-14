import React from 'react'

import RadioGroup from './src/RadioGroup'
import RadioReadme from './README.md'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, object } from '@storybook/addon-knobs'
import { State, Store } from '@sambego/storybook-state'

const store = new Store({
  "radio-large-inline":"bmw",
  "radio-medium-inline":"bmw",
  "radio-small-inline":"bmw"
})


storiesOf('Radio', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      content: RadioReadme,
      codeTheme: 'github',
    },
  })
  .add('RadioGroup', () => {
    const sizes = ['large', 'medium', 'small']
    const options = object('label', [
      { text: 'БМВ', val: 'bmw' },
      { text: 'Ауди', val: 'audi' },
      { text: 'Мерсейдес', val: 'mercedes' },
    ])
    
    const valueKey = text('valueKey', 'val')
    const labelKey = text('labelKey', 'text')

    return (
      <div>
        <State store={store}>
          {state => (
            <div>
              <div>
                <small>state = {JSON.stringify(state)}</small>
              </div>
              {[true, false].map(inline => (
                <div key={inline ? 'inline' : 'column'}>
                  <h2>{inline ? 'Inline' : 'Column'}</h2>
                  <div style={{
                    display: 'flex',
                    flexDirection: inline ? 'column' : 'row',
                  }}>
                    {sizes.map(size => (
                      <div key={size} style={{
                        marginBottom: inline ? '2rem' : 0,
                        marginRight: inline ? 0 : '2rem',
                      }}>
                        <small>{size.slice(0,1).toUpperCase()+size.slice(1)}</small>
                        {[false, true].map(disabled => {
                          const key = `radio-${size}-${inline ? 'inline' : 'column'}${disabled ? '-disabled' : ''}`
                          return (
                          <RadioGroup
                            size={size.slice(0,1)}
                            name={key}
                            key={key}
                            value={state[key]}
                            options={options}
                            onChange={({ target }) => {
                              store.set({ [target.name]: target.value })
                            }}
                            valueKey={valueKey}
                            labelKey={labelKey}
                            disabled={disabled}
                            inline={inline}
                          />
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </State>
      </div>
    )
  })