import cm from './Radio.module.styl'

import React from 'react'

import PropTypes from 'prop-types'

import cx from 'classnames'


const Radio = props => {
  const {
    className,
    id,
    name,
    value,
    defaultChecked,
    checked,
    label,
    size,
    disabled,
    onChange,
  } = props

  return (
    <label
      htmlFor={id}
      className={cx({
        [cm.radio]: true,
        [cm[`size-${size}`]]: !!size,
        [cm.disabled]: disabled,
      }, className)}
    >
      <div className={cm.input_box}>
        <input
          className={cm.native_input}
          id={id}
          type='radio'
          name={name}
          value={value}
          defaultChecked={defaultChecked}
          checked={checked}
          onClick={onChange}
          onChange={f => f}
          disabled={disabled}
        />
        <div className={cm.fake_input}></div>
      </div>
      <If condition={label}>
        <div className={cm.label}>{label}</div>
      </If>
    </label>
  )
}

Radio.propTypes = {
  /** If true, the component is checked. */
  checked: PropTypes.bool,
  /** The value of the component. */
  value: PropTypes.any,
  /** Input element id */
  id: PropTypes.string,
  /** Input element name */
  name: PropTypes.string,
  /** Input component props */
  inputProps: PropTypes.object,
  /** Input component ref */
  inputRef: PropTypes.func,
  /** OnChange handler ({target: {name, value, checked}}) */
  onChange: PropTypes.func,
  /** If true, the radio will be disabled. */
  disabled: PropTypes.bool,
  /** Size of the component (['s', 'm', 'l']) */
  size: PropTypes.oneOf(['s', 'm', 'l']),
  /** Theme of the component (['light']) */
  theme: PropTypes.oneOf(['light']),
}

Radio.defaultProps = {
  size: 'm'
}

export default Radio