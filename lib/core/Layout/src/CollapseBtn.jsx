import cm from './Layout.module.styl'

import React from 'react'

import cx from 'classnames'

const CollapseBtn = props => {
  const { collapsed } = props

  return (
    <div
      className={cx(cm.collapse_btn, {
        [cm.collapse_btn_active]: !collapsed,
      })}
      data-type='collapse_btn'
    >
      <div className={cm.btn}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export default CollapseBtn