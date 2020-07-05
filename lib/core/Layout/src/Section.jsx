import cm from './Layout.module.styl'

import React from 'react'

import cx from 'classnames'


const Section = props => {
  const { title, hasSeparator, children } = props
  return (
    <div className={cx({
      [cm.section]: true,
      [cm.has_separator]: hasSeparator,
    })}>
      <If condition={title}>
        <div className={cm.title}>{title}</div>
      </If>
      {children}
    </div>
  )
}

export default Section