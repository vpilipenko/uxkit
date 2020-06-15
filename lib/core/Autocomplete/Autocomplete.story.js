import React from 'react'


import Autocomplete from './src/Autocomplete'
import AutocompleteReadme from './README.md'

import { storiesOf } from '@storybook/react'
import { State, Store } from '@sambego/storybook-state'
import { withKnobs, text, object } from '@storybook/addon-knobs'


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
      { label: 'БМВ', value: '0' },
      { label: 'Ауди', value: '1' },
      { label: 'Мерсейдес', value: '2' },
    ])

    const valueKey = text('valueKey', 'value')
    const labelKey = text('labelKey', 'label')

    return (
      <div>
        <Autocomplete
          options={options}
          valueKey={valueKey}
          labelKey={labelKey}
          filter={(query, obj, index) => obj[labelKey].toLowerCase().indexOf(query) > -1}
        />
      </div>
    )
  })