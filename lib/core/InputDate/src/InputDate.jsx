import React, { Component } from 'react'

import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'moment/locale/ru'
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/lib/src/addons/MomentLocaleUtils'

import './style.css'

import InputMasked from '@vpilipenko/input-masked'
import '@vpilipenko/input-masked/dist/styles.css'
import Select from '@vpilipenko/select'
import '@vpilipenko/select/dist/styles.css'


const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear, 0);
const toMonth = new Date(currentYear + 10, 11);

class InputDate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      month: fromMonth,
    }
  }

  handleYearMonthChange = month => {
    this.setState({ month })
  }

  render() {
    return (
      <DayPickerInput
        formatDate={formatDate}
        parseDate={parseDate}
        placeholder='ДД.ММ.ГГГГ'
        inputProps={{
          mask: '99.99.9999',
          maskChar: null,
        }}
        dayPickerProps={{
          localeUtils: MomentLocaleUtils,
          locale: 'ru',
          month: this.state.month,
          fromMonth: fromMonth,
          toMonth: toMonth,
          captionElement: ({ date }) => (
            <YearMonthForm
              date={date}
              localeUtils={MomentLocaleUtils}
              locale='ru'
              onChange={this.handleYearMonthChange}
            />
          )
        }}
        component={InputMasked}
        {...this.props}
      />
    )
  }
}

function YearMonthForm({ date, onChange }) {
  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ]

  const years = []
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i)
  }

  const handleChange = function handleChange(e) {
    const { name, value } = e.target
    if (name === 'month') {
      onChange(new Date(date.getFullYear(), value));
    } else {
      onChange(new Date(value, date.getMonth()))
    }
  }

  return (
    <form className="DayPicker-Caption">
      <Select
        name='month'
        value={`${date.getMonth()}`}
        options={months.map((month, i) => ({value: `${i}`, text: month}))}
        onChange={handleChange}
        size='s'
        optionsZIndex={2}
      />
      <Select
        name='year'
        value={`${date.getFullYear()}`}
        options={years.map((year, i) => ({value: `${year}`, text: year}))}
        onChange={handleChange}
        size='s'
        style={{maxWidth: '4rem'}}
        optionsZIndex={2}
      />
    </form>
  );
}

export default InputDate