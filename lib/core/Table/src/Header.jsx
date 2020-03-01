import cm from './Table.module.styl'

import React from 'react'

import cx from 'classnames'


const Header = props => {
  const {
    cols,
    stickyHeader,
    headerComponent,
    headerProps,
  } = props

  const HeaderComponent = headerComponent ? headerComponent(props) : 'div'

  return (
    <HeaderComponent
      className={cx({
        [cm.header]: true,
        [cm.sticky]: stickyHeader,
      })}
      {...headerProps}
    >
      <div className={cm.row}>
        {cols.map((col, index, arr) => {
          let value = col.title
          if (typeof(col.renderTitle) === 'function') {
            value = col.renderTitle({ col, index })
          }
          return (
            <div
              className={cm.col}
              style={{
                width: col.width,
              }}
              key={index}
            >
              {value}
            </div>
          )
        })}
      </div>
    </HeaderComponent>
  )
}

export default Header