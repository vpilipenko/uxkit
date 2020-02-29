import cm from './Card.module.styl'

import React from 'react'

import cx from 'classnames'


const Card = props => {
  const {
    size,
    className,
    style,
    children,
    ...other
  } = props

  return (
    <div
      className={cx(
        cm.root, {
          [cm[`size-${size}`]]: !!size,
        }, className
      )}
      style={style}
      {...other}
    >
      {children}
    </div>
  )
}

Card.defaultProps = {
  size: 'm',
}


export default Card
