import React from 'react'

import InputFile from './src/InputFile'
import InputFileReadme from './README.md'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { State, Store } from '@sambego/storybook-state'
import { action } from '@storybook/addon-actions'

const store = new Store({
  fileList: [],
})

storiesOf('InputFile', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      content: InputFileReadme,
      codeTheme: 'github',
    },
  })
  .add('InputFile', () => {
    return (
      <div>
        <State store={store}>
          <InputFile
            name='testFileUpload'
            multiple
            multipleFiles
            maxFileSize={Math.pow(1024, 2)}
            maxFilesSize={Math.pow(1024, 2) * 2}
            accept='image/.jpg,.png,.gif,.pdf'
            hint='До 10 МБ, .jpg, .png или .pdf'
            onChange={action('onChange')}
            disabled={true}
            inline
          />
        </State>
      </div>
    )
  })