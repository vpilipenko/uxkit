import cm from './Input.module.styl'

import React, { Component } from 'react'

import cx from 'classnames'
import PropTypes from 'prop-types'

import { Cross } from '@vpilipenko/icons'


export class Input extends Component {

  static defaultProps = {
    theme: 'light',
    size: 'm',
    autoComplete: 'password',
    tabIndex: 1,
  }

  static propTypes = {
    /** Input field value */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /** Input field default value */
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /** Component theme. Only light now */
    theme: PropTypes.oneOf([
      'light',
    ]),
    /** Size of component. One of: 's', 'm', 'l'. */
    size: PropTypes.oneOf([
      's',
      'm',
      'l',
    ]),
    /** Native autocomplete attribute. Default is 'password' to turn off chrome suggestions. */
    autoComplete: PropTypes.string,
    /** Последовательность перехода между контролами при нажатии на Tab */
    tabIndex: PropTypes.number,
    /** Input field name */
    name: PropTypes.string,
    /** Input field id */
    id: PropTypes.string,
    /** Error display. If it's string, the error text will display below the field. If bool shows only red border. */
    error: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
    /** Hint text will display below the field */
    hint: PropTypes.string,
    /** авапып */
    component: PropTypes.node,
    /** Node container in the right of input */
    suffix: PropTypes.node,
    /** Node container in the left of input */
    prefix: PropTypes.node,
    /** Cross icon to delete field value */
    clear: PropTypes.bool,
    /** Classes container */
    className: PropTypes.string,
    /** Input field placeholder */
    placeholder: PropTypes.string,
    /** Кнопка занимает всю ширину родителя */
    fullWidth: PropTypes.bool,
    /** Ширина кнопки. Например: "32%". Приоритет ниже fullWidth */
    width: PropTypes.string,
    /** Минимальная ширина поля */
    minWidth: PropTypes.string,
    /** Максимальная ширина поля */
    maxWidth: PropTypes.string,
    /** Props directly to the input field */
    inputProps: PropTypes.object,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onPaste: PropTypes.func,
    onTouchCancel: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onTouchMove: PropTypes.func,
    onTouchStart: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      focused: false,
      hovered: false,
    }
  }


  handleClear = e => {
    const {
      name,
      onChange,
      clearValue,
      onClear,
    } = this.props

    onChange({ target: { name, value: clearValue ? clearValue : '' } })
    onClear && onClear({ target: { name, value: clearValue ? clearValue : '' } })
    this.inputRef.focus()
  }

  handleRootRef = node => {
    const { rootRef } = this.props
    rootRef && rootRef(node)
  }

  handleInputRef = node => {
    const { ref } = this.props
    this.inputRef = node
    ref && ref(node)
  }


  handleFocus = e => {
    const { onFocus } = this.props
    this.setState({ focused: true })
    onFocus && onFocus(e)
  }

  handleBlur = e => {
    const { onBlur } = this.props
    this.setState({ focused: false })
    onBlur && onBlur(e)
  }


  handleMouseEnter = e => {
    const { onMouseEnter } = this.props
    this.setState({ hovered: true })
    onMouseEnter && onMouseEnter(e)
  }

  handleMouseLeave = e => {
    const { onMouseLeave } = this.props
    this.setState({ hovered: false })
    onMouseLeave && onMouseLeave(e)
  }

  render() {
    const {
      name,
      value,
      defaultValue,
      id,
      theme,
      size,
      error,
      hint,
      component,
      prefix,
      suffix,
      clear,
      type,
      // eslint-disable-next-line
      clearValue, rootRef, ref,
      className,
      autoComplete,
      placeholder,
      tabIndex,
      disabled,
      style,
      width,
      minWidth,
      maxWidth,
      fullWidth,
      onChange,
      onClick,
      onKeyDown,
      onKeyUp,
      onPaste,
      onTouchCancel,
      onTouchEnd,
      onTouchMove,
      onTouchStart,
      multiline,
      ...other
    } = this.props

    const {
      hovered,
      focused,
    } = this.state

    const InputComponent = component ?
      component
      : multiline
        ? 'textarea'
        : 'input'

    return (
      <div
        className={cx({
          [cm.root]: true,
          [cm[`theme-${theme}`]]: !!theme,
          [cm[`size-${size}`]]: !!size,
          [cm.error]: !!error,
          [cm.focused]: focused,
          [cm.hovered]: hovered,
          [cm.disabled]: disabled,
          [cm.fullWidth]: fullWidth,
        }, className)}
        style={{
          width: !fullWidth ? width : '',
          minWidth,
          maxWidth,
          ...style,
        }}
        ref={this.handleRootRef}
      >

        <div className={cx(cm.input_box, {
          [cm.with_prefix]: prefix,
          [cm.with_suffix]: suffix || clear,
        })}>

          <If condition={!multiline && prefix}>
            <span className={cm.prefix}>
              {prefix}
            </span>
          </If>

          <InputComponent
            value={value ? value : defaultValue ? defaultValue : value}
            placeholder={placeholder}
            id={id}
            name={name}
            type={type}
            autoComplete={autoComplete}
            ref={this.handleInputRef}
            disabled={disabled}
            onChange={onChange}
            onClick={onClick}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onPaste={onPaste}
            onTouchCancel={onTouchCancel}
            onTouchEnd={onTouchEnd}
            onTouchMove={onTouchMove}
            onTouchStart={onTouchStart}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            tabIndex={tabIndex}
            {...other}
          />

          <If condition={!multiline && (suffix || clear)}>
            <span className={cm.suffix}>
              <If condition={clear}>
                <div className={cm.clear_wrapper}>
                  <If condition={value}>
                    <button
                      type='button'
                      className={cm.clear_button}
                      onClick={this.handleClear}
                      disabled={disabled}
                    >
                      <Cross className={cm.cross_icon} />
                    </button>
                  </If>
                </div>
              </If>
              {suffix}
            </span>
          </If>

        </div>

        <If condition={(typeof(error) === 'string' && error.length > 0) || hint}>
          <div className={cm.sub}>
            {error ? error : hint}
          </div>
        </If>

      </div>
    )
  }
}

export default Input