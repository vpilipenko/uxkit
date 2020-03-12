import React, { Component } from 'react'

import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'moment/locale/ru'
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment'

import 'react-day-picker/lib/style.css'

// import InputMasked from '../InputMasked'


class InputDate extends Component {
  render() {
    return (
      <div>
        <DayPickerInput
          {...this.props}
          formatDate={formatDate}
          parseDate={parseDate}
          placeholder='ДД.ММ.ГГГГ'
          inputProps={{
            mask: '99.99.9999',
            maskChar: null,
          }}
          dayPickerProps={{
            localeUtils: MomentLocaleUtils,
            locale: 'ru'
          }}
          // component={InputMasked}
        />
      </div>
    )
  }
}

export default InputDate