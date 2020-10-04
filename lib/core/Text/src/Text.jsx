import cm from './Text.module.styl'

import React from 'react'

import PropTypes from 'prop-types'
import cx from 'classnames'


const Text = props => {
    const {
      text,
      size,
      weight,
      theme,
      color,
      className,
      style,
      fullWidth = false,
      children,
      ...other
    } = props

    return (
      <span
        className={cx(cm.text, {
          [cm[`size_${size.toLowerCase()}`]]: !!size,
          [cm[`weight_${weight.toLowerCase()}`]]: !!weight,
          [cm[`theme_${theme.toLowerCase()}`]]: !!theme,
          [cm[`color_${color && color.toLowerCase()}`]]: !!color,
          [cm.full_width]: fullWidth,
        }, className)}
        style={style}
        {...other}
      >
        {children || text}
      </span>
    )
}

Text.propTypes = {
  /** Текст */
  text: PropTypes.node,
  /** Размер текста: s, m, l. Передается детям */
  size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl']),
  /** Жирность текста: regular, medium, bold */
  weight: PropTypes.oneOf(['regular', 'medium', 'bold']),
  /** Тема: light */
  theme: PropTypes.oneOf(['light']),
  /** Цвет: red, grey */
  color: PropTypes.oneOf(['red', 'grey', 'green']),
  /** Дополнительные стили */
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /** Инлайновые стили */
  style: PropTypes.object,
}

Text.defaultProps = {
  size: 'm',
  weight: 'regular',
  theme: 'light',
}

export default Text
