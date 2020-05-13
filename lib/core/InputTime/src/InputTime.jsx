import cm from './InputTime.module.styl'

import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'

import PropTypes from 'prop-types'
import { Manager, Reference, Popper } from 'react-popper'

import Portal from './Portal'
import Column from './Column'

import InputMasked from '@vpilipenko/input-masked'
import '@vpilipenko/input-masked/dist/styles.css'
import Menu from '@vpilipenko/menu'
import '@vpilipenko/menu/dist/styles.css'
import MenuItem from '@vpilipenko/menu-item'
import '@vpilipenko/menu-item/dist/styles.css'

import { timeParser, findClosest } from './utils'


class InputTime extends Component {

  static propTypes = {
    value: PropTypes.instanceOf(Date),
    defaultValue: PropTypes.instanceOf(Date),
    size: PropTypes.oneOf(['s', 'm', 'l']),
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    clear: PropTypes.bool,
    showHour: PropTypes.bool,
    showMinute: PropTypes.bool,
    showSecond: PropTypes.bool,
    showAMPM: PropTypes.bool,
    AMPM: PropTypes.bool,
    popupClassName: PropTypes.string,
    popupStyle: PropTypes.object,
    popupMaxHeight: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    popupZIndex: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    isOpen: PropTypes.bool,
    id: PropTypes.string,
    onTimeChange: PropTypes.func,
    onInputChange: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    popupPlacement: PropTypes.string,
    inputProps: PropTypes.object,
  }

  static defaultProps = {
    value: null,
    defaultValue: null,
    size: 'm',
    placeholder: '',
    clear: false,
    showHour: true,
    showMinute: true,
    showSecond: true,
    showAMPM: true,
    AMPM: false,
    isOpen: false,
    id: '',
    popupClassName: '',
    popupStyle: {},
    popupMaxHeight: '320px',
    popupZIndex: 1,
    popupPlacement: 'bottom-start',
    inputProps: {},
  }


  constructor(props) {
    super(props)
    const { AMPM, isOpen } = props
    this.state = {
      ...this.getTimeFromDate(),
      isOpen: isOpen,
      hourOptions: this.getHourOptions(AMPM),
      minuteOptions:  this.getMinuteSecondOptions(),
      secondOptions:  this.getMinuteSecondOptions(),
      ampmOptions: [ 'am', 'pm'],
    }
  }

  componentDidUpdate(prevProps) {
    const {
      value,
      AMPM,
      isOpen,
      showHour,
      showMinute,
      showSecond,
    } = this.props

    if (JSON.stringify(prevProps.value) !== JSON.stringify(value)) {
      this.setState(this.getTimeFromDate())
    }
    if (prevProps.isOpen !== isOpen) {
      this.setState({ isOpen })
    }
    if (prevProps.AMPM !== AMPM) {
      this.setState({ ...this.getTimeFromDate(), hourOptions: this.getHourOptions(AMPM) })
    }
    if (prevProps.showHour !== showHour || prevProps.showMinute !== showMinute || prevProps.showSecond !== showSecond) {
      this.setState({ ...this.getTimeFromDate() })
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick)
  }


  getHourOptions = AMPM => {
    return new Array(AMPM ? 12 : 24).fill('')
    .map((x, i) => {
      const hour = AMPM ? i + 1 : i
      return pad(hour, 2)
    })
  }

  getMinuteSecondOptions = _ => {
    return Array(60).fill('').map((x, i) => pad(i, 2))
  }


  getTimeFromDate = _ => {
    const { value, AMPM, showAMPM, showHour, showMinute, showSecond } = this.props

    if (!value) {
      return {
        inputValue: '',
        inputMask: this.getDefaultMask(),
        hour: null,
        minute: null,
        second: null,
        ampm: null,
      }
    }

    const date = value
    
    let hour = pad(date.getHours(), 2)
    const minute = pad(date.getMinutes(), 2)
    const second = pad(date.getSeconds(), 2)
    const ampm = date.getHours() >= 12 ? 'pm' : 'am'

    if (AMPM) {
      hour = hour % 12
      hour = hour ? hour : 12 // the hour 0 should be 12
      hour = pad(hour, 2)
    }

    let inputValue = []
    
    if (showHour) { inputValue.push(hour) }
    if (showMinute) { inputValue.push(minute) }
    if (showSecond) { inputValue.push(second) }

    inputValue = inputValue.join(':')

    if (AMPM && showAMPM) {
      inputValue = `${inputValue} ${ampm}`
    }

    let inputMask = inputValue.replace(/\d/g, '9').replace(/[A-Za-z]/g, 'a')

    return { inputValue, inputMask, hour, minute, second, ampm }
  }

  getDefaultMask = _ => {
    const { showHour, showMinute, showSecond, showAMPM, AMPM } = this.props
    let mask = []

    if ( showHour ) { mask.push(99) }
    if ( showMinute ) { mask.push(99) }
    if ( showSecond ) { mask.push(99) }

    mask = mask.join(':')

    if ( AMPM && showAMPM ) { mask = `${mask} aa`}

    return mask
  }


  _toggleOptions = _ => this.setState(prev => ({ isOpen: !prev.isOpen }))
  _openOptions = _ => this.setState({ isOpen: true })
  _closeOptions = _ => this.setState({ isOpen: false })

  handleClick = e => {
    const { isOpen, disabled } = this.props

    const clickedEl = e.target
    const inputEl = this.inputNode
    const popupEl = this.popupNode

    if (!isOpen && !disabled) {
      // Input clicked
      if (inputEl.contains(clickedEl)) {
        inputEl.focus()
        this._toggleOptions()
        return
      }
      // Popup clicked
      if (popupEl && popupEl.contains(clickedEl)) {
        const timeItemEl = findClosest(e.target, '[data-timeitem]')
        this.handlePopupClick(timeItemEl)
        return
      }

      // Clicked outside of InputTime
      if (!inputEl.contains(clickedEl) || (popupEl && !popupEl.contains(popupEl))) {
        inputEl.blur()
        this._closeOptions()
        return
      }
    }
  }

  // handleClick = e => {
  //   const { onClick } = this.props
  //   onClick && onClick(e)
  //   this.handleOpen()
  // }


  handleInputRef = (node, popperReference) => {
    const inputEl = ReactDOM.findDOMNode(node)
    this.inputNode = inputEl
    popperReference(inputEl)
  }

  handlePopupRef = (node, popperRef) => {
    this.popupNode = node
    popperRef(node)
  }


  handleInputChange = e => {
    const { value } = e.target
    this.setState({inputValue: value})
    
    const { AMPM, showHour, showMinute, showSecond, showAMPM, value: oldValue, onTimeChange } = this.props
    const { inputMask, hourOptions, minuteOptions, secondOptions} = this.state

    const parse = timeParser(
      value,
      showHour,
      showMinute,
      showSecond,
      showAMPM,
      inputMask,
      hourOptions,
      minuteOptions,
      secondOptions,
      AMPM,
    )

    if (!parse) { return }

    const { hour, minute, second, ampm } = parse

    const date = oldValue ? oldValue : new Date()

    if (hour) { date.setHours(hour) }
    if (minute) { date.setMinutes(minute) }
    if (second) { date.setSeconds(second) }
    if (ampm) {
      if (ampm === 'am') {
        date.setHours(hour)
      }
      if (ampm === 'pm') {
        date.setHours(+hour + 12)
      }
    }

    this.setState(parse)
    onTimeChange && onTimeChange(date)
  }


  handlePopupClick = el => {
    const { value: oldValue, onTimeChange } = this.props
    const value = el.innerText
    const { type } = el.dataset

    const date = oldValue ? new Date(oldValue.getTime()) : new Date()

    if (type === 'hour') {
      date.setHours(value)
    }
    if (type === 'minute') {
      date.setMinutes(value)
    }
    if (type === 'second') {
      date.setSeconds(value)
    }
    if (type === 'ampm') {
      const curHours = date.getHours()
      // cur time is am
      if (curHours >= 0 && curHours < 12) {
        if (value === 'pm') {
          date.setHours(curHours - 12)
        }
      }
      // cur time is pm
      if (curHours >= 12) {
        if (value === 'am') {
          date.setHours(curHours + 12)
        }
      }
    }

    onTimeChange && onTimeChange(date)
  }


  renderInput = _ => {
    const {
      size,
      placeholder,
      disabled,
      inputProps
    } = this.props

    const {
      inputValue,
      inputMask,
    } = this.state

    return (
      <Reference>
        {({ ref }) => {
          return (
            <InputMasked
              value={inputValue}
              mask={inputMask}
              maskChar='_'
              size={size}
              placeholder={placeholder}
              ref={node => this.handleInputRef(node, ref)}
              onChange={this.handleInputChange}
              disabled={disabled}
              {...inputProps}
            />
          )}}
      </Reference>
    )
  }

  renderPopup = _ => {
    const { 
      popupZIndex,
      popupMaxHeight,
      showHour,
      showMinute,
      showSecond,
      showAMPM,
      AMPM,
      size,
      popupPlacement
    } = this.props

    const {
      isOpen,
      hour,
      minute,
      second,
      ampm,
      hourOptions,
      minuteOptions,
      secondOptions,
      ampmOptions,
    } = this.state

    if (!isOpen) { return null }

    return (
      <Portal>
        <Popper placement={popupPlacement}>
        {({ ref, style, placement, arrowProps }) => (
            <div
              ref={node => this.handlePopupRef(node, ref)}
              style={{
                ...style,
                zIndex: popupZIndex,
              }} 
              data-placement={placement}
            >
              <Menu
                size='m'
                className={cm.menu}
              >
                <If condition={showHour}>
                  <Column style={{ maxHeight: popupMaxHeight }} active={hour}>
                    <TimeItems
                      options={hourOptions}
                      type='hour'
                      active={hour}
                      size={size}
                    />
                  </Column>
                </If>
                <If condition={showMinute}>
                  <Column style={{ maxHeight: popupMaxHeight }} active={minute}>
                    <TimeItems
                      options={minuteOptions}
                      type='minute'
                      active={minute}
                      size={size}
                    />
                  </Column>
                </If>
                <If condition={showSecond}>
                  <Column style={{ maxHeight: popupMaxHeight }} active={second}>
                    <TimeItems
                      options={secondOptions}
                      type='second'
                      active={second}
                      size={size}
                    />
                  </Column>
                </If>
                <If condition={AMPM && showAMPM}>
                  <Column style={{ maxHeight: popupMaxHeight }} active={ampm}>
                    <TimeItems
                      options={ampmOptions}
                      type='ampm'
                      active={ampm}
                      size={size}
                    />
                  </Column>
                </If>
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
        {this.renderInput()}
        {this.renderPopup()}
      </Manager>
    )
  }
}

export default InputTime


const TimeItems = ({ options, type, active, size }) => {
  return (
    options.map(time => (
      <MenuItem
        size={size}
        data-timeitem
        data-type={type}
        active={time === active}
        key={time}
      >
        {time}
      </MenuItem>
    ))
  )
}

const pad = (str, max) => {
  str = str.toString()
  return str.length < max ? pad(`0${str}`, max) : str
}