import React from 'react'

import Breadcrumbs from './src/Breadcrumbs'
import BreadcrumbsReadme from './README.md'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'


storiesOf('Breadcrumbs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      content: BreadcrumbsReadme,
      codeTheme: 'github',
    },
  })
  .add('Default', () => {
    return (
      <div>
        <Breadcrumbs
          breadcrumbs={[
            {name: 'Main', to: '/main-page'},
            {name: 'Inner', to: '/inner-page'},
          ]}
        />
      </div>
    )
  })