import cm from './RadioGroup.module.styl'

import React, { Component } from 'react'

import PropTypes from 'prop-types'
import cx from 'classnames'

import Radio from '@apass/radio'
import '@apass/radio/dist/styles.css'


class RadioGroup extends Component {

  static propTypes = {
    value: PropTypes.string,
    options: PropTypes.array,
    name: PropTypes.string,
    labelKey: PropTypes.string,
    valueKey: PropTypes.string,
  }

  static defaultProps = {
    size: 'm',
    options: [],
  }


  renderOptions = _ => {
    const {
      value,
      options,
      valueKey,
      labelKey,
      name,
      size,
      disabled,
      onChange,
      inputProps
    } = this.props

    return options.map((option, index) => (
      <Radio
        id={option.id}
        name={name}
        value={option[valueKey]}
        checked={option[valueKey] === value}
        label={option[labelKey]}
        size={size}
        onChange={onChange}
        className={cm.radio}
        disabled={disabled}
        inputProps={inputProps}
        key={index}
      />
    ))
  }

  render() {
    const {
      // eslint-disable-next-line
      value, options, valueKey, labelKey, name, disabled, onChange, inputProps,
      className,
      size,
      inline,
      style,
      ...other
    } = this.props

    return (
      <div
        className={cx({
          [cm.radio_group]: true,
          [cm[`size-${size}`]]: !!size,
          [cm.inline]: inline,
        }, className)}
        style={style}
        {...other}
      >
        {this.renderOptions()}
      </div>
    )
  }
}

export default RadioGroup
