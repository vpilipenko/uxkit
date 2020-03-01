import React, { Fragment } from 'react'

import Amount from './src/Amount'
import AmountReadme from './README.md'

import { storiesOf } from '@storybook/react'
import {
  withKnobs,
  text,
  select,
  object,
} from '@storybook/addon-knobs'


storiesOf('Amount', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      content: AmountReadme,
      codeTheme: 'github',
    },
  })
  .add('Amount', () => {
    return (
      <Fragment>
        <Amount
          amount={text('Amount', '95.05')}
          currency={select('Currency', { rouble: 'rur', euro: 'eur', dollar: 'usd', false: false }, 'rur')}
          currencies={object('Currencies', { eur: 'EURO', usd: '$$$' })}
          size={select('Size', ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl', false], 'xxl')}
          weight={select('Weight', ['regular', 'medium', 'bold', false], 'regular')}
          theme={select('Theme', ['light', 'dark', false], 'light')}
        />
      </Fragment>
    )
  })