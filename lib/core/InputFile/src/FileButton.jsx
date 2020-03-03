import cm from './InputFile.module.styl'

import React, { Component } from 'react'

import Button from '@vpilipenko/button'
import { Upload } from '@vpilipenko/icons'


class FileButton extends Component {

  handleInputRef = node => {
    const { inputRef } = this.props
    inputRef && inputRef(node)
  }

  render() {
    const {
      name,
      buttonComponent,
      accept,
      capture,
      multiple,
      hint,
      error,
      onClick,
      onChange,
    } = this.props

    let Component = (
      <Button
        text='Загрузить'
        prefix={<Upload />}
        onClick={onClick}
      />
    )

    if (typeof buttonComponent === 'function') {
      Component = buttonComponent({ onClick: this.handleButtonClick })
    }

    return (
      <div className={cm.file_button}>
        <div className={cm.button}>
          {Component}
        </div>
        <If condition={!!hint && !error}>
          <div className={cm.hint}>
            {hint}
          </div>
        </If>
        <If condition={!!error}>
          <div className={cm.error}>
            {error}
          </div>
        </If>
        <input
          name={name}
          className={cm.input}
          ref={this.handleInputRef}
          type='file'
          accept={accept}
          capture={capture}
          multiple={multiple}
          onChange={onChange}
        />
      </div>
    )
  }
}

export default FileButton
