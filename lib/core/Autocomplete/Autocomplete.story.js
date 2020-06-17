import React from 'react'


import Autocomplete from './src/Autocomplete'
import AutocompleteReadme from './README.md'

import { storiesOf } from '@storybook/react'
import { State, Store } from '@sambego/storybook-state'
import { withKnobs, text, object, boolean } from '@storybook/addon-knobs'

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
      { hueybl: 'БМВ', huelue: '0', country: 'EU' },
      { hueybl: 'Пакард', huelue: '9', country: 'US' },
      { hueybl: 'Дайхатсу', huelue: '5', country: 'JP' },
      { hueybl: 'Ауди', huelue: '1', country: 'EU' },
      { hueybl: 'Тойота', huelue: '3', country: 'JP' },
      { hueybl: 'Ниссан', huelue: '4', country: 'JP' },
      { hueybl: 'Понтиак', huelue: '8', country: 'US' },
      { hueybl: 'Шевролет', huelue: '6', country: 'US' },
      { hueybl: 'Мерсейдес', huelue: '2', country: 'EU' },
      { hueybl: 'Форд', huelue: '7', country: 'US' },
    ])
    const valueKey = text('valueKey', 'huelue')
    const labelKey = text('labelKey', 'hueybl')
    const usePortal = boolean('usePortal', true)
    const disabled = boolean('disabled', false)
    const groupBy = text('groupBy', 'country')
    
    return (
      <div>
        
        <State store={store}>
          {state => {
            return (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ width: '100%' }}>
                    <FormGroup label='Multiple'>
                      <div>
                        <Autocomplete
                          name='autocomplete_multi'
                          value={state.autocomplete_multi}
                          onChange={({ target }) => {
                            store.set({ [target.name]: target.value })
                          }}
                          options={options}
                          valueKey={valueKey}
                          labelKey={labelKey}
                          usePortal={usePortal}
                          isMultiple
                          sort={(a, b) => (
                            2 * (a.country > b.country ? 1 : a.country < b.country ? -1 : 0) + 
                            (a[labelKey] > b[labelKey] ? 1 : a[labelKey] < b[labelKey] ? -1 : 0)
                          )}
                          groupBy='country'
                          renderGroupSubheader={(subheader) => <div><small>{subheader}</small></div>}
                          // filter={(query, obj, index) => {
                          //   const h = obj[labelKey].toLowerCase()
                          //   const n = query.toLowerCase()
                          //   return h.indexOf(n) > -1
                          // }}
                          // renderOption={(option, index, options, isFocused, isChecked) => {
                          //   return (
                          //     <div>{JSON.stringify(option)}</div>
                          //   )
                          // }}
                          disabled={disabled}
                        />
                      </div>
                    </FormGroup>
                    <FormGroup label='Single'>
                      <Autocomplete
                        name='autocomplete_single'
                        value={state.autocomplete_single}
                        onChange={({ target }) => {
                          store.set({ [target.name]: target.value })
                        }}
                        options={options}
                        valueKey={valueKey}
                        labelKey={labelKey}
                        usePortal={usePortal}
                        disabled={disabled}
                        autoFocus
                        sort={(a, b) => (
                          2 * (a.country > b.country ? 1 : a.country < b.country ? -1 : 0) + 
                          (a[labelKey] > b[labelKey] ? 1 : a[labelKey] < b[labelKey] ? -1 : 0)
                        )}
                        groupBy='country'
                        fullWidth
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