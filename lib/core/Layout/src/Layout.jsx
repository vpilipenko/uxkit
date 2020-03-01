import cm from './Layout.module.styl'

import React, { Component } from 'react'

import PropTypes from 'prop-types'
import cx from 'classnames'

import { findClosest } from './utils'


class Layout extends Component {

  static propTypes = {
    /** Logo container */
    logo: PropTypes.node,
    /** Array of nav items like {to: '/main', text: 'Main page'} */
    nav: PropTypes.array,
    /** Custom NavItem component. If string then Layout will use only tag name, if function then you can use the arguments (text, active, navItemClass, navItemActiveClass and props from nav array item) */
    navItemComponent: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]),
    /** Controlled collapsed value */
    collapsed: PropTypes.bool,
    /** Default collapsed value */
    defaultCollapsed: PropTypes.bool,
    /** Layout height */
    layoutHeight: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /** Logout button text */
    logoutText: PropTypes.any,
    /** Put your routes here */
    children: PropTypes.node,
    /** Toggle button click handler */
    onToggleClick: PropTypes.func,
    /** Menu click handler */
    onMenuClick: PropTypes.func,
    /** Content area click handler */
    onContentClick: PropTypes.func,
    /** Nav item click handler */
    onNavItemClick: PropTypes.func,
    /** Logout button click handler */
    onLogoutClick: PropTypes.func,
    /** If layout collapsed controlled you may use this handler to track events */
    onProbablyCollapsed: PropTypes.func,
  };

  static defaultProps = {
    nav: [],
    logoutText: 'Выход из системы',
    navItemComponent: 'div',
  }


  constructor(props) {
    super(props)
    const { collapsed, defaultCollapsed, layoutHeight } = props
    this.state = {
      collapsed: collapsed ? collapsed : defaultCollapsed ? defaultCollapsed : false,
      layoutHeight: layoutHeight ? layoutHeight : window.innerHeight,
    }
    if (!layoutHeight) {
      this.initLayoutHeightChecker()
    }
  }

  componentDidUpdate(prevProps) {
    const { collapsed } = this.props
    if (prevProps.collapsed !== collapsed) {
      this.setState({ collapsed })
    }
  }

  initLayoutHeightChecker = _ => {
    window.addEventListener('resize', _ => this.setState({ layoutHeight: window.innerHeight }))
  }


  _toggleCollapsed = _ => {
    this.setState(prevState => ({ collapsed: !prevState.collapsed }))
  }


  handleClick = e => {
    const {
      collapsed: controlledCollapsed,
      onToggleClick,
      onMenuClick,
      onContentClick,
      onNavItemClick,
      onLogoutClick,
      onProbablyCollapsed,
    } = this.props

    const { collapsed } = this.state


    const el = findClosest(e.target, '[data-type]')
    const { type } = el.dataset

    if (type === 'collapse_btn') {
      onToggleClick && onToggleClick(e)
      if (!controlledCollapsed) {
        return this._toggleCollapsed()
      }
      return onProbablyCollapsed && onProbablyCollapsed(e, 'collapse_btn clicked')
    }

    if (type === 'menu') {
      onMenuClick && onMenuClick()
      if (collapsed) {
        if (!controlledCollapsed) {
          return this._toggleCollapsed()
        }
        return onProbablyCollapsed && onProbablyCollapsed(e, 'menu clicked')
      }
    }

    if (type === 'content' && window.innerWidth < 760) {
      onContentClick && onContentClick(e)
      if (!collapsed) {
        if (!controlledCollapsed) {
          return this._toggleCollapsed()
        }
        return onProbablyCollapsed && onProbablyCollapsed(e, 'content clicked')
      }
    }

    if (type === 'nav_item') {
      onNavItemClick && onNavItemClick(e)
      if (window.innerWidth <= 760) {
        if (!controlledCollapsed) {
          return this._toggleCollapsed()
        }
        return onProbablyCollapsed && onProbablyCollapsed(e, 'nav_item clicked')
      }
    }

    if (type === 'logout_btn') {
      onLogoutClick && onLogoutClick(e)
    }
  }


  render() {
    const {
      logo,
      nav,
      navItemComponent,
      logoutText,
      onLogoutClick,
      children,
    } = this.props

    const { collapsed, layoutHeight } = this.state

    return (
      <div
        className={cx(cm.layout, {
          [cm.collapsed]: collapsed,
        })}
        style={{
          height: layoutHeight,
        }}
      >
        <div
          className={cm.menu}
          data-type={'menu'}
          onClick={this.handleClick}
        >
          <If condition={logo}>
            <div className={cm.logo}>{logo}</div>
          </If>
          <If condition={nav || onLogoutClick}>
            <div className={cm.nav}>
              <If condition={nav}>
                {nav.map((item, index) => {
                  return (
                    <NavItem
                      component={navItemComponent}
                      data-type={'nav_item'}
                      key={`${item.to}_${index}`}
                      {...item}
                    />
                  )
                })}
              </If>
              <If condition={onLogoutClick}>
                <NavItem
                  component='div'
                  data-type={'logout_btn'}
                  className={cm.exit}
                  text={logoutText}
                />
              </If>
            </div>
          </If>
        </div>
        <div
          className={cm.content}
          data-type={'content'}
          onClick={this.handleClick}
        >
          {children}
          <div
            className={cx(cm.collapse_btn, {
              [cm.active]: !collapsed,
            })}
            data-type='collapse_btn'
          >
            <div className={cm.btn}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const NavItem = props => {
  const {
    text,
    active,
    component,
    className,
    ...other
  } = props

  const Component = component

  if (typeof(component) === 'function') {
    return component({
      text,
      active,
      itemClass: cm.nav_item,
      itemActiveClass: cm.active,
      ...other,
    })
  }

  return (
    <Component
      className={
        cx(cm.nav_item, {
          [cm.active]: active,
        }, className)
      }
      {...other}
    >
      {text}
    </Component>
  )
}

export default Layout
