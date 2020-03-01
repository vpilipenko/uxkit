import { addDecorator, addParameters, configure } from '@storybook/react';
import { addReadme, configureReadme } from 'storybook-readme';

addDecorator(addReadme);

addParameters({
  options: {
    name: 'uxKit',
    panelPosition: 'right',
  },
  readme: {
    codeTheme: 'hopscotch',
  }
})

configureReadme({});

const requred = require
  .context('../lib', true, /.story\.jsx?$/)

configure(() => {
  requred.keys().forEach(requred)
}, module)