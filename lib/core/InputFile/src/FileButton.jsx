// import cm from './InputFile.module.styl'

import React, { Component } from 'react'

import Button from '@vpilipenko/button'
import '@vpilipenko/button/dist/styles.css'

import { Upload } from '@vpilipenko/icons'


class FileButton extends Component {

  renderHintOrError = _ => {
    const { hint, error } = this.props

    if (!!hint && !error) {
      return (
        <div className={cm.hint}>
          {hint}
        </div>
      )
    }

    if (!!error) {
      return (
        <div className={cm.error}>
          {error}
        </div>
      )
    }

    return null
  }


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
        {this.renderHintOrError()}
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
