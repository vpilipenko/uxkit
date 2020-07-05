import cm from './Layout.module.styl'

import React, { Component } from 'react'

import PropTypes from 'prop-types'
import cx from 'classnames'

import { findClosest } from './utils'

import NavRenderer from './NavRenderer'
import CollapseBtn from './CollapseBtn'

import set from 'lodash.set'


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
    /** Dropdown item click handler */
    onDropDownClick: PropTypes.func,
    /** Logout button click handler */
    onLogoutClick: PropTypes.func,
    /** If layout collapsed controlled you may use this handler to track events */
    onProbablyCollapsed: PropTypes.func,

    header: PropTypes.any, // TODO
    footer: PropTypes.any, // TODO
  };

  static defaultProps = {
    nav: [],
    logoutText: 'Выход из системы',
    navItemComponent: 'div',
  }


  constructor(props) {
    super(props)
    const { nav, collapsed, defaultCollapsed, layoutHeight } = props
    this.state = {
      nav: nav,
      collapsed: collapsed ? collapsed : defaultCollapsed ? defaultCollapsed : false,
      layoutHeight: layoutHeight ? layoutHeight : window.innerHeight,
    }
    if (!layoutHeight) {
      this.initLayoutHeightChecker()
    }
  }

  componentDidUpdate(prevProps) {
    const { nav, collapsed } = this.props

    const prevCollapsed = prevProps.collapsed
    const curCollapsed = collapsed
    if (prevCollapsed !== curCollapsed) {
      this.setState({ collapsed })
      try {
        window.dispatchEvent(new Event('resize'))
      } catch(e) {}
    }

    const prevNav = JSON.stringify(prevProps.nav)
    const curNav = JSON.stringify(nav)
    if (prevNav !== curNav) {
      this.setState({ nav })
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
      onDropDownClick,
      onLogoutClick,
      onProbablyCollapsed,
    } = this.props

    const { collapsed } = this.state

    const el = findClosest(e.target, '[data-type]')
    if(!el || !el.dataset) {return}

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

    if (type === 'dropdown') {
      onDropDownClick && onDropDownClick(e)
      const { path, open } = el.dataset
      const newNav = [...this.state.nav]
      set(newNav, `${path}.isOpen`, !JSON.parse(open))
      this.setState({ nav: newNav })
    }

    if (type === 'logout_btn') {
      onLogoutClick && onLogoutClick(e)
    }
  }


  render() {
    const {
      logo,
      navItemComponent,
      // logoutText,
      onLogoutClick,
      children,
    } = this.props

    const {
      nav,
      collapsed,
      layoutHeight,
    } = this.state

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
                <NavRenderer nav={nav} navItemComponent={navItemComponent} />
              </If>
              {/* <If condition={onLogoutClick}>
                <NavItem
                  component='div'
                  data-type={'logout_btn'}
                  className={cm.nav_item_exit}
                  text={logoutText}
                />
              </If> */}
            </div>
          </If>
        </div>
        <div
          className={cm.content}
          data-type={'content'}
          onClick={this.handleClick}
        >
          {children}
          <CollapseBtn collapsed={collapsed} />
        </div>
      </div>
    )
  }
}


export default Layout