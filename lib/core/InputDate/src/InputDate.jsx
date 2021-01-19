import React, { Component, useState } from 'react'
import ReactDOM from 'react-dom'

import PropTypes from 'prop-types'

import { usePopper } from 'react-popper'


import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'moment/locale/ru'
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment'
import './style.css'

import InputMasked from '@apass/input-masked'
import '@apass/input-masked/dist/styles.css'

import Select from '@apass/select'
import '@apass/select/dist/styles.css'

import IconButton from '@apass/icon-button'
import '@apass/icon-button/dist/styles.css'

import { ArrowLeft, ArrowRight } from '@apass/icons'

import Portal from './Portal'


class InputDate extends Component {

  static propTypes = {
    fromMonth: PropTypes.object,
    toMonth: PropTypes.object,
    dayPickerProps: PropTypes.object,
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props)
    const { fromMonth, dayPickerProps } = props
    const month = dayPickerProps && dayPickerProps.month

    this.state = {
      month: month ? month : fromMonth,
    }
  }


  handleYearMonthChange = month => {
    this.setState({ month })
  }

  handleInputRef = node => {
    node = ReactDOM.findDOMNode(node)
    this.setState({ inputEl: node })
  }

  
  render() {
    const {
      dayPickerProps,
      yearMonthSelect,
      fromMonth,
      toMonth,
      size,
      error,
      placeholder,
      fullWidth,
      style,
      inputProps,
      disabled,
      ...other
    } = this.props
    const {
      inputEl,
    } = this.state

    let captionElement
    if (yearMonthSelect) {
      if (!fromMonth || !toMonth) {
        console.error('To use yearMonthSelect you should provide fromMonth and toMonth props as js Date')
      } else {
        captionElement = ({ date, localeUtils }) => (
          <YearMonthSelect
            date={date}
            localeUtils={localeUtils}
            locale='ru'
            fromMonth={fromMonth}
            toMonth={toMonth}
            onChange={this.handleYearMonthChange}
          />
        )
      }
    }

    return (
      <DayPickerInput
        overlayComponent={p => <CustomOverlay referenceElement={inputEl} {...p}/>}
        formatDate={formatDate}
        parseDate={parseDate}
        placeholder={placeholder || 'ДД.ММ.ГГГГ'}
        inputProps={{
          mask: '99.99.9999',
          maskChar: null,
          size: size,
          fullWidth,
          error,
          disabled,
          ...inputProps,
        }}
        style={{ ...style, width: fullWidth ? '100%' : undefined }}
        ref={this.handleInputRef}
        dayPickerProps={{
          localeUtils: MomentLocaleUtils,
          locale: 'ru',
          month: this.state.month,
          fromMonth: fromMonth,
          toMonth: toMonth,
          captionElement,
          navbarElement: <Navbar />,
          ...dayPickerProps
        }}
        component={InputMasked}
        {...other}
      />
    )
  }
}

const YearMonthSelect = props => {
  const { date, localeUtils, locale, fromMonth, toMonth, onChange } = props
  const months = localeUtils.getMonths(locale)

  const years = new Array(toMonth.getFullYear() - fromMonth.getFullYear() + 1)
  .fill('')
  .map((x, index) => fromMonth.getFullYear() + index)

  const handleChange = function handleChange(e) {
    const { name, value } = e.target
    if (name === 'month') {
      onChange(new Date(date.getFullYear(), value));
    } else {
      onChange(new Date(value, date.getMonth()))
    }
  }

  return (
    <form
      className='DayPicker-Caption'
    >
      <Select
        name='month'
        value={`${date.getMonth()}`}
        options={months.map((m, i) => ({value: `${i}`, text: m[0].toUpperCase() + m.slice(1)}))}
        onChange={handleChange}
        size='s'
        style={{minWidth: 'auto', width: '6.875rem', marginRight: '.25rem'}}
        optionsZIndex={2}
      />
      <Select
        name='year'
        value={`${date.getFullYear()}`}
        options={years.map((year, i) => ({value: `${year}`, text: year}))}
        onChange={handleChange}
        size='s'
        style={{minWidth: 'auto', width: '4.875rem'}}
        optionsZIndex={2}
      />
    </form>
  )
}

const Navbar = props => {
  const {
    onPreviousClick,
    onNextClick,
    className,
  } = props

  return (
    <div
      className={className}
    >
      <IconButton
        type='button'
        size='s'
        style={{
          position: 'absolute',
          top: '1.0625rem',
          right: '2.625rem'
        }}
        onClick={_ => onPreviousClick()}
      >
        <ArrowLeft fill='#bab9ba' />
      </IconButton>
      <IconButton
        type='button'
        size='s'
        style={{
          position: 'absolute',
          top: '1.0625rem',
          right: '.5rem'
        }}
        onClick={_ => onNextClick()}
      >
        <ArrowRight fill='#bab9ba' />
      </IconButton>
    </div>
  )
}

const CustomOverlay = props => {
  const [popperElement, setPopperElement] = useState(null);

  const { referenceElement, children, classNames, onBlur, onFocus } = props

  const { styles: popperStyles, attributes: popperAttributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
  })

  return (
    <Portal>
      <div
        ref={setPopperElement}
        style={{zIndex: 1, ...popperStyles.popper}}
        className={classNames.overlayWrapper}
        {...popperAttributes.popper}
        onBlur={onBlur}
        onFocus={onFocus}
      >
        {children}
      </div>
    </Portal>
  )
}

export default InputDate