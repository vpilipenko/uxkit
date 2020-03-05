import cm from './Menu.module.styl'

import React from 'react'

import cx from 'classnames'

const Menu = ({className, children, maxHeight, style, ...other}) => {
  return (
    <div
      className={cx({
        [cm.menu]: true,
      }, className)}
      style={{
        maxHeight: maxHeight,
        ...style,
      }}
      {...other}
    >
      {children}
    </div>
  )
}

export default Menu
