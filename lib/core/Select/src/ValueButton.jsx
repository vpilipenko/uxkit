import cm from './ValueButton.module.styl'

import React, { Component } from 'react'

import cx from 'classnames'
import { ArrowTop } from '@vpilipenko/icons'


class ValueButton extends Component {
  render() {
    const {
      value,
      options,
      placeholder,
      isOpen,
      disabled,
      onClick,
      size,
      theme,
      className,
      // isLoading,
      fullWidth,
      onFocus,
      onBlur,
      onKeyDown,
    } = this.props

    let text = placeholder

    if (value && typeof value === 'string') {
      text = options
        .filter(o => o.value === value)
        .map(o => o.text)
        .pop()
    }

    if (Array.isArray(value) && value.length) {
      text = options
        .filter(o => value.includes(o.value))
        .map(o => o.text)
        .join(', ')
    }

    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className={cx({
          [cm.value_button]: true,
          [cm.placeholder]: !!placeholder && !value.length,
          [cm.is_open]: isOpen,
          [cm.disabled]: disabled,
          [cm[`size-${size}`]]: !!size,
          [cm[`theme-${theme}`]]: !!theme,
          [cm.fullWidth]: fullWidth,
        }, className)}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        tabIndex={1}
      >
        <div className={cm.value_box}>{text}</div>
        <div className={cm.suffix}>
          <ArrowTop />
        </div>
      </button>
    )
  }
}

export default ValueButton
