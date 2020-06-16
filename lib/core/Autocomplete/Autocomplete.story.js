import React from 'react'


import Autocomplete from './src/Autocomplete'
import AutocompleteReadme from './README.md'

import { storiesOf } from '@storybook/react'
import { State, Store } from '@sambego/storybook-state'
import { withKnobs, text, object } from '@storybook/addon-knobs'

import FormGroup from '../FormGroup/src'



const store = new Store({
  autocomplete_multi: [
    { hueybl: 'БМВ', huelue: '0' },
    { hueybl: 'Ауди', huelue: '1' }
  ],
  autocomplete_single: null,
})

storiesOf('Autocomplete', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      content: AutocompleteReadme,
      codeTheme: 'github',
    },
  })
  .add('Default', () => {
    const options = object('options', [
      { hueybl: 'БМВ', huelue: '0' },
      { hueybl: 'Ауди', huelue: '1' },
      { hueybl: 'Мерсейдес', huelue: '2' },
    ])
    const valueKey = text('valueKey', 'huelue')
    const labelKey = text('labelKey', 'hueybl')
    return (
      <div>
        
        <State store={store}>
          {state => {
            return (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ width: '100%' }}>
                    <FormGroup label='Multiple' fullWidth>
                      <div>
                        <Autocomplete
                          name='autocomplete_multi'
                          value={
                              state.autocomplete_multi
                            }
                          onChange={({ target }) => {
                            store.set({ [target.name]: target.value })
                          }}
                          options={options}
                          valueKey={valueKey}
                          labelKey={labelKey}
                          isMultiple
                          filter={(query, obj, index) => {
                            console.log('obj', obj)
                            const h = obj[labelKey].toLowerCase()
                            const n = query.toLowerCase()
                            return h.indexOf(n) > -1
                          }}
                        />
                      </div>
                    </FormGroup>
                    <FormGroup label='Single' fullWidth>
                      <Autocomplete
                        name='autocomplete_single'
                        value={
                            state.autocomplete_single
                          }
                        onChange={({ target }) => {
                          store.set({ [target.name]: target.value })
                        }}
                        options={options}
                        valueKey={valueKey}
                        labelKey={labelKey}
                        filter={(query, obj, index) => {
                          console.log('obj[labelKey]', obj[labelKey])
                          const h = obj[labelKey].toLowerCase()
                          const n = query ? query.toLowerCase() : -1
                          return h.indexOf(n) > -1
                        }}
                      />
                    </FormGroup>
                  </div>
                  <div>
                    <FormGroup label='State'>
                      <pre>{JSON.stringify(state, null, 2)}</pre>
                    </FormGroup>
                  </div>
              </div>
            )
          }}
        </State>
      </div>
    )
  })