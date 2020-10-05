import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import LicensePlateReadme from './README.md'

import LicensePlate from './src/LicensePlate'


storiesOf('License plate', module)
  .addParameters({
    readme: {
      content: LicensePlateReadme,
      codeTheme: 'github',
    },
  })
  .addDecorator(withKnobs)
  .add('Type 1', () => {
    return (
      <LicensePlate
        value={text('Value', 'A095PA05')}
        type={text('Type')}
        size={text('Size', 'm')}
        invalidText={text('invalidText', '')}
      />
    )
  })
  .add('Type 1b', () => {
    return (
      <LicensePlate
        value={text('Value', 'MO71977')}
        type={text('Type')}
        size={text('Size', 'm')}
        invalidText={text('invalidText', '')}
      />
    )
  })
  .add('Type 2', () => {
    return (
      <LicensePlate
        value={text('Value', 'KT494577')}
        type={text('Type')}
        size={text('Size', 'm')}
        invalidText={text('invalidText', '')}
      />
    )
  })