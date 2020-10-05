import cm from './LicensePlate.module.styl'

import React, { Component } from 'react'

import PropTypes from 'prop-types'
import cx from 'classnames'

import toCyrillic from './utils'


class LicensePlate extends Component {

  static propTypes = {
    /** Component ID in DOM */
    id: PropTypes.string,
    /** Serie, number, region */
    value: PropTypes.string.isRequired,
    /** Plate type */
    type: PropTypes.oneOf(['type1', 'type1b', 'type2']),
    /** Size of component */
    size: PropTypes.oneOf(['s', 'm', 'l']),
    /** isValid */
    isValid: PropTypes.func,
    /** Invalid text */
    invalidText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
  }

  static defaultProps = {
    size: 'm',
  }

  constructor(props, context) {
    super(props, context)
    const { value, type, isValid } = this.props
    const v = this.getValue(value)
    const t = type || this.getType(v)

    isValid && isValid(!!t, t, v)

    this.state = {
      value: v,
      type: t,
    }
  }


  componentDidUpdate(prevProps, prevState) {
    const { value, type, isValid } = this.props

    if (prevProps.value !== value || prevProps.type !== type) {
      const v = this.getValue(value)
      const t = type || this.getType(v)

      isValid && isValid(!!t, t, v)

      this.setState({
        value: v,
        type: t,
      })
    }
  }


  getValue = value => {
    if (!value) { return '' }
    value = value.toUpperCase()
    value = value.replace(/\s/g, '')
    value = toCyrillic(value)
    return value
  }


  getType = value => {
    if (!value) {
      return ''
    }

    // Тип 1 -> Регистрационные знаки легковых, грузовых автомобилей и автобусов
    const type1 = /^[ABEKMHOPCTYXАВЕКМНОРСТУХ]{1}\d{3}[ABEKMHOPCTYXАВЕКМНОРСТУХ]{2}\d{2,3}$/g
    // Тип 1Б -> Регистрационные знаки для легковых такси, транспортных средств, оборудованных для перевозок более восьми человек, осуществляющих перевозку на основании лицензии
    const type1b = /^[ABEKMHOPCTYXАВЕКМНОРСТУХ]{2}\d{5}$/g
    // Тип 2 -> Регистрационные знаки для автомобильных прицепов и полуприцепов.
    const type2 = /^[ABEKMHOPCTYXАВЕКМНОРСТУХ]{2}\d{6}$/g

    if (type1.test(value)) {
      return 'type1'
    }

    if (type1b.test(value)) {
      return 'type1b'
    }

    if (type2.test(value)) {
      return 'type2'
    }

    return ''
  }

  renderType1 = ({ value, id, size }) => {
    value = value.match(/^[ABEKMHOPCTYXАВЕКМНОРСТУХ]{1}|\d{3}|[ABEKMHOPCTYXАВЕКМНОРСТУХ]{2}|\d{2,3}/g) || []
    const serieStart = value[0]
    const number = value[1]
    const serieEnd = value[2]
    const region = value[3]

    return (
      <div id={id} className={cx(cm.license_plate, {
        [cm[`size-${size}`]]: !!size,
      })}>
        <span className={cm.main}>
          {`${serieStart} ${number} ${serieEnd}`}
        </span>
        <span className={cm.region}>
          {region}
        </span>
      </div>
    )
  }

  renderType1b = ({ value, id, size }) => {
    value = value.match(/^[ABEKMHOPCTYXАВЕКМНОРСТУХ]{2}|\d{3}|\d+/g) || []
    const serie = value[0]
    const number = value[1]
    const region = value[2]

    return (
      <div id={id} className={cx(cm.license_plate, cm.yellow, {
        [cm[`size-${size}`]]: !!size,
      })}>
        <span className={cm.main}>
          {`${serie} ${number}`}
        </span>
        <span className={cm.region}>
          {region}
        </span>
      </div>
    )
  }

  renderType2 = ({ value, id, size }) => {
    value = value.match(/^[ABEKMHOPCTYXАВЕКМНОРСТУХ]{2}|\d{4}|\d+/g) || []
    const serie = value[0]
    const number = value[1]
    const region = value[2]

    return (
      <div id={id} className={cx(cm.license_plate, {
        [cm[`size-${size}`]]: !!size,
      })}>
        <span className={cm.main}>
          {`${serie} ${number}`}
        </span>
        <span className={cm.region}>
          {region}
        </span>
      </div>
    )
  }

  renderInvalid = ({ value, id, size }) => {
    const { invalidText } = this.props

    let text = invalidText
    if (typeof(invalidText) === 'function') {
      text = invalidText({ value })
    }

    return (
      <div id={id} className={cx(cm.license_plate, {
        [cm[`size-${size}`]]: !!size,
      })}>
        <span className={cm.main}>
          {text || value}
        </span>
      </div>
    )
  }

  getPlate = ({ type, value }) => {
    const { id, size } = this.props

    switch (type) {
      case 'type1':
        return (
          this.renderType1({ value, id, size })
        )

      case 'type1b':
        return (
          this.renderType1b({ value, id, size })
        )

      case 'type2':
        return (
          this.renderType2({ value, id, size })
        )

      default:
        return (
          this.renderInvalid({ value, id, size })
        )
    }
  }


  render() {
    const { value, type } = this.state

    return (
      this.getPlate({ value, type })
    )
  }
}

export default LicensePlate