import React, { Component } from 'react'

import Input from '@vpilipenko/input'
import '@vpilipenko/input/dist/styles.css'
import InputMask from 'react-input-mask'


class InputMasked extends Component {
  render() {
    return (
      <InputMask {...this.props}>
        {(inputProps) => <Input {...inputProps} />}
      </InputMask>
    )
  }
}

export default InputMasked