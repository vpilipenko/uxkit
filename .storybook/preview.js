import { addDecorator, addParameters } from '@storybook/react'
import { addReadme } from 'storybook-readme'

addDecorator(addReadme)

addParameters({
  options: {
    panelPosition: 'right',
  },
  theme: {
    brandTitle: 'uxKit',
  },
  readme: {
    codeTheme: 'hopscotch',
  }
})