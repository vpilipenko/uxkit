import React from 'react'

import Tabs from './src/Tabs'
import TabsReadme from './README.md'

import { storiesOf } from '@storybook/react'
import { withKnobs, select, number, object } from '@storybook/addon-knobs'
import { State, Store } from '@sambego/storybook-state'

import Pane from './Pane'


const store = new Store({
})

storiesOf('Tabs', module)

  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      content: TabsReadme,
      codeTheme: 'github',
    },
  })
  .add('Tabs', () => {

    const handleChange = e => {
      const { name, value } = e.target
      store.set({ [name]: value })
    }

    const sizes = ['s', 'm', 'l']

    return (
      <div>
        <Tabs
          value={number('Value', 0)}
          size={select('Size', { s: 's', m: 'm', l: 'l' }, 'l')}
          theme={select('Theme', { light: 'light' }, 'light')}
          style={object('Style', {})}
        >
          <Pane label='Маршрут'>
            Сведения о маршруте
          </Pane>
          <Pane label='Водитель'>
            Информация о водителе
          </Pane>
        </Tabs>
        <br />
        <br />
        <br />
        <h3>Компонент табов</h3>
        <p>Компонент навигации в виде табов. Нужно использовать совместно с компонентом Pane.
          <br/>Для корректной работы нужно подключать к любому хранилищу по схеме name, value.</p>
        <br />
        <State store={store}>
          {state => {
            return (
              sizes.map((size, index) => {
                const name = `tabs_${size}_${index}`
                return (
                  <Tabs
                    name={name}
                    value={state[name]}
                    onChange={handleChange}
                    size={size}
                    key={size}
                    style={{ marginBottom: '2rem' }}
                  >
                    <Pane label='Администрирование'>
                    Контент для администратора
                    </Pane>
                    <Pane label='Диспечеризация'>
                    Контент для диспечера
                    </Pane>
                  </Tabs>
                )
              })
            )
          }}
        </State>
      </div>
    )
  })