import React from 'react'

import Logo from './src/Logo'
import LogoReadme from './README.md'

import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'


storiesOf('Logo', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      content: LogoReadme,
      codeTheme: 'github',
    },
  })
  .add('Logo', () => {
    return (
      <Logo
        version={text('Version', '1.1.6')}
        onClick={action('onClick')}
      >
        {text('Logo text', 'ЛОГОТИП')}
      </Logo>
    )
  })