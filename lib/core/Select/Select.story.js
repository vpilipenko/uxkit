import React from 'react'

import Select from './src/Select'
import SelectReadme from './README.md'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, object } from '@storybook/addon-knobs'
import { State, Store } from '@sambego/storybook-state'

const store = new Store({
})


storiesOf('Select', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      content: SelectReadme,
      codeTheme: 'github',
    },
  })
  .add('Select', () => {
    const sizes = ['l', 'm', 's']
    const options = object('label', [
      { label: 'БМВ', value: '0' },
      { label: 'Ауди', value: '1' },
      { label: 'Мерсейдес', value: '2' },
    ])

    const valueKey = text('valueKey', 'value')
    const labelKey = text('labelKey', 'label')

    return (
      <div>
        <State store={store}>
          {state => {
            return (
              <div>
                <h3>Zero config</h3>
                <Select />
                <h3>isMultiple</h3>
                <div>
                  {sizes.map(size => (
                    <div key={size} style={{ display: 'inline-block', marginRight: '.5rem', marginBottom: '.5rem' }}>
                      <div style={{ marginBottom: '.5rem' }}>
                        <Select
                          error={text('error', 'Error')}
                          name='select_multi'
                          value={state.select_multi}
                          options={options}
                          onChange={({ target }) => {
                            store.set({ [target.name]: target.value })
                          }}
                          isMultiple
                          valueKey={valueKey}
                          labelKey={labelKey}
                          placeholder='Выберите'
                          size={size}
                        />
                      </div>
                      <div style={{ marginBottom: '.5rem' }}>
                        <Select
                          name='select_multi'
                          value={state.select_multi}
                          options={options}
                          onChange={({ target }) => {
                            store.set({ [target.name]: target.value })
                          }}
                          isMultiple
                          valueKey={valueKey}
                          labelKey={labelKey}
                          placeholder='Выберите'
                          size={size}
                          disabled
                        />
                      </div>
                      <div><small>{size}</small></div>
                    </div>

                  ))}
                </div>
                <h3>single</h3>
                <Select
                  name='select_single'
                  value={state.select_single}
                  options={options}
                  onChange={({ target }) => {
                    store.set({ [target.name]: target.value })
                  }}
                  valueKey={valueKey}
                  labelKey={labelKey}
                  placeholder='Выберите'
                  fullWidth
                />
                <h3>disabled</h3>
                <Select
                  name='select_single'
                  value={state.select_single}
                  defaultValue='2'
                  options={options}
                  onChange={({ target }) => {
                    store.set({ [target.name]: target.value })
                  }}
                  valueKey={valueKey}
                  labelKey={labelKey}
                  placeholder='Выберите'
                  disabled
                />
              </div>
            )
          }}
        </State>
      </div>
    )
  })