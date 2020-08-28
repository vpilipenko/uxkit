import cm from './Layout.module.styl'

import React from 'react'

import cx from 'classnames'

const NavItem = props => {
  const {
    text,
    active,
    component,
    className,
    suffix,
    prefix,
    ...other
  } = props

  const Component = component ? component : 'div'

  if (typeof(component) === 'function') {
    return component({
      text,
      active,
      itemClass: cm.nav_item,
      itemActiveClass: cm.nav_item_active,
      suffix,
      prefix,
      ...other,
    })
  }


  return (
    <Component
      className={
        cx({
          [cm.nav_item]: true,
          [cm.nav_item_active]: active,
        }, className)
      }
      {...other}
    >
      <If condition={prefix}>
        <div className={cm.nav_item_prefix}>
          {prefix}
        </div>
      </If>
      {text}
      <If condition={suffix}>
        <div className={cm.nav_item_suffix}>
          {suffix}
        </div>
      </If>
    </Component>
  )
}

export default NavItem