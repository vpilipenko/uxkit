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
    console.log('month', month)
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
          captionElement: ({ date, localeUtils }) => (
            <YearMonthForm
              date={date}
              localeUtils={localeUtils}
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

function YearMonthForm({ date, localeUtils, onChange }) {
  const months = localeUtils.getMonths();

  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <form className="DayPicker-Caption">
      <Select
        name='month'
        // value={date.getMonth()}
        // options={months.map((month, i) => ({value: i, text: month}))}
        // onChange={handleChange}
        size='s'
        optionsZIndex={2}
      />
      {/* <select name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => (
          <option key={month} value={i}>
            {month}
          </option>
        ))} */}
      {/* </select> */}
      <select name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </form>
  );
}

export default InputDate