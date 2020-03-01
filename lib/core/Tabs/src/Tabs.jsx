import cm from './Tabs.module.styl'

import React, { Component } from 'react'

import PropTypes from 'prop-types'
import cx from 'classnames'

import Tab from './Tab'


class Tabs extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    size: 'm',
    theme: 'light',
  }


  constructor(props) {
    super(props)
    const {
      value,
      defaultValue,
    } = props

    this.state = {
      currentPaneIndex: value ? value : defaultValue ? defaultValue : '0',
    }

  }

  componentDidUpdate(prevProps) {
    const { value } = this.props
    if (prevProps.value !== value) {
      this.setState({ currentPaneIndex: value })
    }
  }


  handleChange = e => {
    const { name, onChange } = this.props
    const { value } = e.target

    onChange({ target: { name, value } })
  }


  renderTabs = tabs => {
    return (
      <div className={cm.tabs}>
        {tabs.map((tab, index) => {
          const { currentPaneIndex } = this.state
          const { label } = tab.props
          const { size, theme } = this.props
          const isActive = currentPaneIndex == index

          return (
            <Tab
              name={`tab_${index}`}
              value={index}
              onClick={this.handleChange}
              onKeyPress={this.handleChange}
              active={isActive}
              size={size}
              theme={theme}
              key={index}
            >
              {label}
            </Tab>
          )
        })}
      </div>
    )
  }

  renderPanes = panes => {
    const { currentPaneIndex } = this.state

    return (
      <div className={cm.panes}>
        {panes.map((pane, index) => {
          if (currentPaneIndex == index) {
            return pane
          }
        })}
      </div>
    )
  }


  render() {
    const {
      children,
      className,
      style,
      size,
    } = this.props

    if (!children) {
      return null
    }

    const childrenArr = []

    if (children.length) {
      children.map(child => {
        if (child !== null) {
          childrenArr.push(child)
        }
      })
    } else {
      childrenArr.push(children)
    }


    return (
      <div
        className={cx(cm.tabs_wrapper, {
          [cm[`size-${size}`]]: !!size,
        }, className)}
        style={style}
      >
        {this.renderTabs(childrenArr)}
        {this.renderPanes(childrenArr)}
      </div>
    )
  }
}

export default Tabs
