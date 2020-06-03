import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import PropTypes from 'prop-types'

const { Manager, Reference, Popper } = require('react-popper')

// const Menu = require('@vpilipenko/menu')
import Menu from '@vpilipenko/menu'
require('@vpilipenko/menu/dist/styles.css')

import MenuItem from '@vpilipenko/menu-item'
require('@vpilipenko/menu-item/dist/styles.css')

import { findClosest, getElIndex } from './utils'

import ValueButton from './ValueButton'
import Portal from './Portal'


class Select extends Component {

  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    options: PropTypes.array,
    isMultiple: PropTypes.bool,
    placeholder: PropTypes.string,
    size: PropTypes.oneOf(['s', 'm', 'l']),
    theme: PropTypes.oneOf(['light']),
    disabled: PropTypes.bool,
    isOpen: PropTypes.bool,
    defaultIsOpen: PropTypes.bool,
    fullWidth: PropTypes.bool,
    labelKey: PropTypes.string,
    valueKey: PropTypes.string,
    isLoading: PropTypes.bool,
    menuComponent: PropTypes.func,
    menuItemComponent: PropTypes.func,
    optionsMaxHeight: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    optionsZIndex: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }

  static defaultProps = {
    options: [],
    valueKey: 'value',
    labelKey: 'text',
    theme: 'light',
    size: 'm',
    optionsMaxHeight: '50vh',
  }


  constructor(props) {
    super(props)

    const {
      value,
      defaultValue,
      options,
      isMultiple,
      isOpen,
      defaultIsOpen,
    } = props

    this.state = {
      value: value ? value : defaultValue ? defaultValue : isMultiple ? [] : '',
      options: this._getOptions(options),
      isOpen: isOpen ? isOpen : defaultIsOpen ? defaultIsOpen : false,
      focusedIndex: undefined,
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick)
  }

  componentDidUpdate(prevProps) {
    const {
      isOpen,
      value,
      options,
      labelKey,
      valueKey,
    } = this.props

    if (prevProps.isOpen !== isOpen) {
      this.setState({ isOpen })
    }

    if (prevProps.value !== value) {
      this.setState({ value })
    }

    if (JSON.stringify(prevProps.options) !== JSON.stringify(options)) {
      this.setState({ options: this._getOptions(options) })
    }

    if (prevProps.valueKey !== valueKey) {
      this.setState({
        options: this._getOptions(options),
        valueKey,
      })
    }

    if (prevProps.labelKey !== labelKey) {
      this.setState({
        options: this._getOptions(options),
        labelKey,
      })
    }
  }


  handleClick = e => {
    e.preventDefault()
    const { isOpen, isMultiple, disabled } = this.props

    const clickedEl = e.target
    const valueButtonEl = this.valueButtonNode
    const optionsEl = this.optionsNode

    if (!isOpen && !disabled) {
      // ValueButton clicked
      if (valueButtonEl.contains(clickedEl)) {
        valueButtonEl.focus()
        this._toggleOptions()
        return
      }

      // Options clicked
      if (optionsEl && optionsEl.contains(clickedEl)) {
        this._setValueByIndex(getElIndex(findClosest(clickedEl, '[data-menuitem=true]')))
        if (!isMultiple) {
          this._closeOptions()
        }
        return
      }

      // Clicked outside of Select
      if (!valueButtonEl.contains(clickedEl) || (optionsEl && !optionsEl.contains(optionsEl))) {
        valueButtonEl.blur()
        this._closeOptions()
        return
      }
    }
  }


  handleKeyDown = e => {
    const code = e.keyCode

    if ([27, 37, 38, 39, 40].includes(code)) {
      e.preventDefault()
      e.stopPropagation()
    }

    const { isMultiple } = this.props
    const { options, focusedIndex, isOpen } = this.state

    if (!options.length) { return }

    // esc
    if (code === 27) {
      if (isOpen) {
        this._closeOptions()
      } else {
        this.valueButtonNode.blur()
      }
    }

    if (code === 9) {
      this._closeOptions()
    }

    // enter
    if (code === 13) {
      if (!isOpen) {
        this._openOptions()
      } else {
        this._setValueByIndex(focusedIndex)
        if (!isMultiple) {
          this._closeOptions()
        }
      }
    }

    // space
    if (code === 32) {
      this._openOptions()
    }

    // arrow up
    if (code === 38) {
      if (!isOpen) {
        this._openOptions()
      }
      if (focusedIndex === undefined || focusedIndex === 0) {
        return this._setFocusedIndex(options.length - 1)
      }
      return this._setFocusedIndex(focusedIndex - 1)
    }

    // arrow down
    if (code === 40) {
      if (!isOpen) {
        this._openOptions()
      }
      if (focusedIndex === undefined) {
        this._setFocusedIndex(0)
        return
      }
      if (focusedIndex === options.length - 1) {
        return this._setFocusedIndex(0)
      }
      return this._setFocusedIndex(focusedIndex + 1)
    }

    // arrow left
    if (code === 37) {
      if (!isOpen) {
        this._openOptions()
      }
      return this._setFocusedIndex(0)
    }
    // arrow right
    if (code === 39) {
      if (!isOpen) {
        this._openOptions()
      }
      return this._setFocusedIndex(options.length - 1)
    }
  }

  _setValueByIndex = i => {
    const { isMultiple, onChange, name } = this.props
    const { options, value: oldValue } = this.state

    const opt = options[i]

    if (!opt) { return }

    if (isMultiple) {
      if (oldValue.includes(opt.value)) {
        onChange && onChange({ target: { name, value: oldValue.filter(v => v !== opt.value) } })
      } else {
        onChange && onChange({ target: { name, value: [...oldValue, opt.value] } })
      }
    } else {
      onChange && onChange({ target: { name, value: opt.value } })
    }
  }

  _setFocusedIndex = index => {
    this.setState({ focusedIndex: index })
  }

  _toggleOptions = _ => this.setState(prev => ({ isOpen: !prev.isOpen }))
  _openOptions = _ => this.setState({ isOpen: true })
  _closeOptions = _ => this.setState({
    isOpen: false,
    focusedIndex: undefined,
  })


  _getOptions = (options) => {
    const { labelKey, valueKey } = this.props
    return options.map(opt => ({
      value: opt[valueKey] || '',
      text: opt[labelKey] || '',
    }))
  }


  handleValueButtonRef = (node, popperReference) => {
    const btnEl = ReactDOM.findDOMNode(node)
    this.valueButtonNode = btnEl
    popperReference(btnEl)
    // this.setState({ isValueButtonRefHandled: true })
  }

  handleOptionsRef = (node, popperRef) => {
    this.optionsNode = node
    popperRef(node)
  }


  handleValueButtonClick = e => {
    const { onClick } = this.props
    onClick && onClick(e)
  }

  handleOptionsClick = e => {
    const { onOptionsClick } = this.props
    onOptionsClick && onOptionsClick(e)
  }


  renderValueButton = (popperReference) => {
    const {
      placeholder,
      disabled,
      isLoading,
      size,
      theme,
      style,
      className,
      fullWidth
    } = this.props

    const {
      value,
      options,
      isOpen,
      focusedIndex
    } = this.state

    return (
      <Reference>
        {({ ref }) => {
          return (
            <ValueButton
              ref={node => this.handleValueButtonRef(node, ref)}
              value={value}
              options={options}
              isOpen={isOpen}
              placeholder={
                focusedIndex !== undefined
                  ? options.filter((o, i) => i === focusedIndex).pop().text
                  : placeholder
              }
              onClick={this.handleValueButtonClick}
              disabled={disabled}
              isLoading={isLoading}
              size={size}
              className={className}
              style={style}
              theme={theme}
              fullWidth={fullWidth}
              onKeyDown={this.handleKeyDown}
            />
          )
        }}
      </Reference>
    )
  }

  renderOptions = _ => {
    const { optionsMaxHeight, optionsZIndex, size } = this.props
    const {
      focusedIndex,
    } = this.state

    const { isOpen, value, options } = this.state

    if (!isOpen) { return null }

    return (
      <Portal>
        <Popper
          placement='bottom-start'
        >
          {({ ref, style, placement, arrowProps }) => (
            <div
              ref={node => this.handleOptionsRef(node, ref)}
              style={{ zIndex: optionsZIndex, ...style }} 
              data-placement={placement}
              onClick={this.handleOptionsClick}
            >
              <Menu
                size={size}
                maxHeight={optionsMaxHeight}
              >
                {options.map((opt, i) => (
                  <MenuItem
                    key={i}
                    data-menuitem
                    active={opt.value === value || (Array.isArray(value) && value.includes(opt.value))}
                    focused={i === focusedIndex}
                    size={size}
                  >
                    {opt.text}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )}
        </Popper>
      </Portal>
    )
  }


  render() {    
    return (
      <Manager>
        {this.renderValueButton()}
        {this.renderOptions()}
      </Manager>
    )
  }
}

export default Select
