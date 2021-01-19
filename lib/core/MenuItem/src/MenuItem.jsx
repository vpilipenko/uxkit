import cm from './MenuItem.module.styl'

import React from 'react'

import cx from 'classnames'

import { Check } from '@vpilipenko/icons'


const MenuItem = ({
  active,
  hovered,
  focused,
  className,
  children,
  size,
  ...other
}) => {
  return (
    <div
      className={cx({
        [cm.menu_item]: true,
        [cm.focused]: !!focused,
        [cm[`size-${size}`]]: !!size,
      }, className)}
      {...other}
    >
      <If condition={active}>
        <Check className={cm.check} />
      </If>
      {children}
    </div>
  )
}

export default MenuItem