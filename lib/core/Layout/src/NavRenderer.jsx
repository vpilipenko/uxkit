import React, { Fragment } from 'react'

import NavItem from './NavItem'
import Section from './Section'
import Dropdown from './Dropdown'


const NavRenderer = props => {
  const { nav, navItemComponent, path } = props

  return (
    <Fragment>
      {nav.map((item, index) => {
        const p = path ? `${path}.children[${index}]` : `[${index}]`

        if (item.type === 'section') {
          return (
            <Fragment key={index}>
              <Section title={item.title} hasSeparator={item.hasSeparator}>
                <NavRenderer
                  nav={item.children}
                  navItemComponent={navItemComponent}
                  path={p}
                />
              </Section>
            </Fragment>
          )
        }

        if (item.type === 'dropdown') {
          return (
            <Fragment key={index}>
              <Dropdown {...item} path={p} index={index}>
                <NavRenderer
                  nav={item.children}
                  navItemComponent={navItemComponent}
                  path={p}
                />
              </Dropdown>
            </Fragment>
          )
        }

        return (
          <Fragment key={index}>
            <NavItem
              component={navItemComponent}
              data-type={'nav_item'}
              key={`${item.to}_${index}`}
              path={p}
              {...item}
            />
          </Fragment>
        )
      })}
    </Fragment>
  )
}

export default NavRenderer