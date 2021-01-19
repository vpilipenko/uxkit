import React, { Component } from 'react'

import Input from '@apass/input'
import '@apass/input/dist/styles.css'
import InputMask from 'react-input-mask'


class InputMasked extends Component {
  render() {
    const { disabled, ...other } = this.props
    return (
      <InputMask disabled={disabled} {...other}>
        {(inputProps) => <Input {...inputProps} disabled={disabled} />}
      </InputMask>
    )
  }
}

export default InputMasked