import cm from './Heading.module.styl'

import React, { Component } from 'react'

import cx from 'classnames'


class Heading extends Component {

  static defaultProps = {
    type: 'h1',
  }

  render() {
    const {
      type,
      text,
      children,
      className,
      style,
    } = this.props

    const Component = type ? type : 'h1'

    return (
      <Component
        className={cx(cm.heading, [cm[type]], className)}
        style={style}
      >
        {children || text}
      </Component>
    )
  }
}

export default Heading
