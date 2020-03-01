import cm from './Logo.module.styl'

import React from 'react'

import cx from 'classnames'


const Logo = props => {
  const {
    version,
    className,
    children,
    ...other
  } = props

  return (
    <div
      className={cx(cm.logo, className)}
      {...other}
    >
      <div className={cm.text}>
        {children}
      </div>
      <If condition={version}>
        <div className={cm.version}>
          {`Версия ${version}`}
        </div>
      </If>
    </div>
  )
}

export default Logo
