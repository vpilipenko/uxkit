import cm from './Tab.module.styl'

import React, { Component } from 'react'

import cx from 'classnames'


class Tab extends Component {
  render() {
    const {
      name,
      value,
      active,
      size,
      theme,
      children,
      ...other
    } = this.props

    return (
      <button
        type='button'
        name={name}
        value={value}
        className={cx(cm.tab, {
          [cm.active]: !!active,
          [cm[`size-${size}`]]: !!size,
          [cm[`theme-${theme}`]]: !!theme,
        })}
        {...other}
      >
        {children}
      </button>
    )
  }
}

export default Tab
