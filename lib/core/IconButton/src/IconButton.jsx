import cm from './IconButton.module.styl'

import React, { Component } from 'react'

import PropTypes from 'prop-types'
import cx from 'classnames'


class IconButton extends Component {
  static propTypes = {
    type: PropTypes.string,
    size: PropTypes.oneOf(['s', 'm', 'l']),
    hoverable: PropTypes.bool,
    focusable: PropTypes.bool,
    children: PropTypes.node,
  }

  static defaultProps = {
    size: 'm',
    hoverable: true,
    focusable: true,
  }

  render() {
    const {
      type,
      size,
      hoverable,
      focusable,
      className,
      children,
      ...other
    } = this.props

    return (
      <button
        type={type}
        className={cx({
          [cm.icon_button]: true,
          [cm[`size-${size}`]]: !!size,
          [cm.hoverable]: hoverable,
          [cm.focusable]: focusable,
        }, className)}
        {...other}
      >
        {children}
      </button>
    )
  }
}

export default IconButton
