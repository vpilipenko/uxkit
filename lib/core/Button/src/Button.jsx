import cm from './Button.module.styl'

import React, { Component } from 'react'

import PropTypes from 'prop-types'
import cx from 'classnames'


export class Button extends Component {

  static defaultProps = {
    size: 'm',
    theme: 'light',
    view: 'secondary',
    type: 'button',
    tabIndex: 1,
    onBlur: f => f,
    onClick: f => f,
    onFocus: f => f,
    onKeyDown: f => f,
    onKeyUp: f => f,
    onMouseDown: f => f,
    onMouseEnter: f => f,
    onMouseLeave: f => f,
    onMouseOut: f => f,
    onMouseUp: f => f,
  }

  static propTypes = {
    /** Дочерние элементы кнопки */
    children: PropTypes.node,
    /** Текст кнопки. Иммет меньший приоритет чем children */
    text: PropTypes.node,
    /** Размер кнопки: s, m, l */
    size: PropTypes.oneOf(['s', 'm', 'l']),
    /** Тип кнопки: main, secondary, pseudo */
    view: PropTypes.oneOf(['main', 'secondary', 'danger', 'pseudo']),
    /** Тема кнопки: light */
    theme: PropTypes.oneOf(['light']),
    /** Круглая кнопка */
    rounded: PropTypes.bool,
    /** Инлайновые стили */
    style: PropTypes.object,
    /** Заблокировать кнопку */
    disabled: PropTypes.bool,
    /** Кнопка занимает всю ширину родителя */
    fullWidth: PropTypes.bool,
    /** Ширина кнопки. Например: "32%". Приоритет ниже fullWidth */
    width: PropTypes.string,
    /** Контейнер слева от текста кнопки */
    prefix: PropTypes.node,
    /** Контейнер справа от текста кнопки */
    suffix: PropTypes.node,
    /** Контейнер для иконки */
    icon: PropTypes.node,
    /** Последовательность перехода между контролами при нажатии на Tab */
    tabIndex: PropTypes.number,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseOut: PropTypes.func,
    onMouseUp: PropTypes.func,
  }

  render() {
    const {
      name,
      children,
      text,
      type,
      size,
      view,
      theme,
      rounded,
      style,
      disabled,
      width,
      fullWidth,
      className,
      prefix,
      suffix,
      icon,
      tabIndex,
      onBlur,
      onClick,
      onFocus,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
      onMouseOut,
      onMouseUp,
      ...other
    } = this.props

    return (
      <button
        className={cx({
          [cm.root]: true,
          [cm[`size-${size.toLowerCase()}`]]: !!size,
          [cm[`theme-${theme.toLowerCase()}`]]: !!theme,
          [cm[`view-${view.toLowerCase()}`]]: !!view,
          [cm.rounded]: rounded,
          [cm.disabled]: disabled,
          [cm.fullWidth]: fullWidth,
        }, className)}
        style={{
          width: !fullWidth ? width : '',
          ...style,
        }}
        name={name}
        type={type}
        disabled={disabled}
        tabIndex={tabIndex}
        onBlur={onBlur}
        onClick={onClick}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseOut={onMouseOut}
        onMouseUp={onMouseUp}
        {...other}
      >
        <If condition={prefix || icon}>
          <div className={cm.prefix}>
            {prefix}
            <If condition={icon}>
              <div className={cm.icon}>
                {icon}
              </div>
            </If>
          </div>
        </If>
        <div className={cm.button_content}>
          {children || text}
        </div>
        <If condition={suffix}>
          <div className={cm.suffix}>
            {suffix}
          </div>
        </If>
      </button>
    )
  }
}

export default Button