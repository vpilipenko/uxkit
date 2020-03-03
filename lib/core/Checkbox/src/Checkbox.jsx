import cm from './Checkbox.module.styl'

import React, { Component } from 'react'

import PropTypes from 'prop-types'
import cx from 'classnames'

import { Check } from '@vpilipenko/icons/dist/index'

class Checkbox extends Component {

  static propTypes = {
    /** Подпись чекбокса */
    label: PropTypes.node,
    /** Атрибут name для поля ввода */
    name: PropTypes.string,
    /** Атрибут сhecked для поля ввода */
    checked: PropTypes.bool,
    /** Размер чекбокса: s, m, l */
    size: PropTypes.oneOf(['s', 'm', 'l']),
    /** Тема чекбокса: light */
    theme: PropTypes.oneOf(['light']),
    /** Заблокировать чекбокс */
    disabled: PropTypes.bool,
    /** Дополнительные стили */
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    /** Инлайновые стили */
    style: PropTypes.object,
    /** Последовательность перехода между контролами при нажатии на Tab */
    tabIndex: PropTypes.number,
    /** Чекбокс занимает всю ширину родителя */
    fullWidth: PropTypes.bool,
  }

  static defaultProps = {
    size: 'm',
    theme: 'light',
    tabIndex: 1,
  }


  render() {
    const {
      label,
      id,
      name,
      checked,
      size,
      theme,
      disabled,
      className,
      style,
      fullWidth,
      error,
      tabIndex,
      ...other
    } = this.props

    
    return (
      <label
        htmlFor={id}
        className={cx(cm.checkbox, {
          [cm[`size-${size.toLowerCase()}`]]: !!size,
          [cm[`theme-${theme.toLowerCase()}`]]: !!theme,
          [cm.checked]: checked,
          [cm.error]: !!error,
          [cm.disabled]: disabled,
          [cm.fullWidth]: fullWidth,
        }, className)}
        style={style}
        tabIndex={tabIndex}
      >

        <div className={cm.fake_box}>
          <If condition={checked}>
            <Check className={cm.icon} />
          </If>
        </div>

        <If condition={label}>
          <div className={cm.label}>
            {label}
          </div>
        </If>

        <input
          type='checkbox'
          id={id}
          name={name}
          checked={checked}
          tabIndex={-1}
          disabled={disabled}
          {...other}
        />
      </label>
    )
  }
}

export default Checkbox
