import cm from './Layout.module.styl'

import React, { Component } from 'react'

import PropTypes from 'prop-types'
import cx from 'classnames'

import { findClosest } from './utils'

import NavRenderer from './NavRenderer'
import CollapseBtn from './CollapseBtn'
import NavItem from './NavItem'

import set from 'lodash/set';
import cloneDeep from 'lodash/clone'
import isBoolean from 'lodash/isBoolean'

const STORAGE_COLLAPSE_KEY = 'ux-layout-collapsed'

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
    /** Fire window.resize event by change collapse  */
    useWindowResize: PropTypes.bool,
    /** save collapse state in window.localStorage  */
    useLocalStorage: PropTypes.bool,
    /** Header container */
    header: PropTypes.node,
    /** Footer container */
    footer: PropTypes.node,
  };

  static defaultProps = {
    nav: [],
    logoutText: 'Выход из системы',
    navItemComponent: 'div',
    useWindowResize: true,
    useLocalStorage: true
  }

  constructor(props) {
    super(props)
    const { nav, collapsed, defaultCollapsed, layoutHeight } = props
    const storageCollapsed = this._getStorageCollapsed();
    const isCollapsed = isBoolean(collapsed)
        ? collapsed
        : props.useLocalStorage && isBoolean(storageCollapsed)
          ? storageCollapsed
          : isBoolean(defaultCollapsed)
            ? defaultCollapsed
            : false;

    this.state = {
      nav: nav,
      collapsed: isCollapsed,
      layoutHeight: layoutHeight ? layoutHeight : window.innerHeight,
    }
    if (!layoutHeight) {
      this.initLayoutHeightChecker()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { nav, collapsed } = this.props

    if (prevProps.collapsed !== collapsed) {
      this.setState({ collapsed })
    }

    if (prevState.collapsed !== this.state.collapsed) {
      if (this.props.useLocalStorage) {
        localStorage.setItem(STORAGE_COLLAPSE_KEY, this.state.collapsed);
      }

      if (this.props.useWindowResize) {
        try {
          window.dispatchEvent(new Event('resize'))
        } catch(e) {}
      }
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

  _getStorageCollapsed = () => {
    let storageCollapsed = localStorage.getItem(STORAGE_COLLAPSE_KEY);

    if (storageCollapsed) {
      try {
        storageCollapsed = JSON.parse(storageCollapsed);
      } catch (e) {}
    }

    return storageCollapsed;
  }

  handleClick = e => {
    const {
      collapsed: cc,
      onToggleClick,
      onMenuClick,
      onContentClick,
      onNavItemClick,
      onDropDownClick,
      onLogoutClick,
      onProbablyCollapsed,
    } = this.props

    const { collapsed } = this.state

    const controlledCollapsed = cc !== undefined

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

      const newNav = cloneDeep(this.state.nav)
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
      logoutText,
      onLogoutClick,
      children,
      header,
      footer
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
          <header className={cm.header}>
            <If condition={logo}>
              <div className={cm.logo}>{logo}</div>
            </If>
            { header }
          </header>

          <If condition={nav || onLogoutClick}>
            <div className={cm.nav}>
              <If condition={nav}>
                <NavRenderer nav={nav} navItemComponent={navItemComponent} />
              </If>

              <footer className={cm.footer}>
                <If condition={onLogoutClick}>
                  <NavItem
                    component='div'
                    data-type={'logout_btn'}
                    className={cm.nav_item_exit}
                    text={logoutText}
                  />
                </If>
                { footer }
              </footer>

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
export { NavItem }
