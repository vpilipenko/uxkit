import cm from './FormGroup.module.styl'

import React, { Component } from 'react'

import PropTypes from 'prop-types'
import cx from 'classnames'

const Text = require('@vpilipenko/text')


class FormGroup extends Component {
  static propTypes = {
    /** Лейбл группы */
    label: PropTypes.node,
    /** Размер группы: s, m, l. Передается детям */
    size: PropTypes.oneOf(['s', 'm', 'l']),
    /** Тема группы: light. Передается детям*/
    theme: PropTypes.oneOf(['light']),
    /** Дополнительные стили */
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    /** Инлайновые стили */
    style: PropTypes.object,
  }

  static defaultProps = {
    size: 'm',
    theme: 'light',
  }

  renderChildren = children => {
    const { size, theme } = this.props

    if (typeof(children) === 'string') {
      return children
    }

    return React.Children.map(children, (child) => {
      if (child) {
        return (
          React.cloneElement(child, {
            size: child.props.size || size,
            theme: child.props.theme || theme,
          })
        )
      }
    })
  }


  render() {
    const {
      label,
      size,
      theme,
      inline,
      className,
      style,
      children,
      hint,
      ...other
    } = this.props

    return (
      <div
        className={cx(cm.form_group, {
          [cm[`size-${size.toLowerCase()}`]]: !!size,
          [cm[`theme-${theme.toLowerCase()}`]]: !!theme,
          [cm.inline]: inline,
        }, className)}
        style={style}
        {...other}
      >
        <If condition={label}>
          <div className={cm.label}>
            {label}
          </div>
        </If>

        <If condition={children || hint}>
          <div className={cm.content}>
            {this.renderChildren(children)}
            <If condition={hint}>
              <Text size='s' className={cm.hint}>{hint}</Text>
            </If>
          </div>
        </If>
      </div>
    )
  }
}

export default FormGroup
