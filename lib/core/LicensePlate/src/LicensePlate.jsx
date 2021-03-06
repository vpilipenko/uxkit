import cm from './LicensePlate.module.styl'

import React from 'react'

import PropTypes from 'prop-types'
import cx from 'classnames'

import toCyrillic from './utils'


const LicensePlate = ({
  value,
  type,
  isValid,
  id,
  size,
  classes,
  invalidText,
}) => {
  const parsedValue = parseValue(value)
  const parsedType = type || parseType(parsedValue)
  isValid && isValid(!!parsedType, parsedType, parsedValue)

  const { number, region } = getResult(parsedType, parsedValue)


  if (!number && !region) {
    let text = invalidText

    if (typeof(invalidText) === 'function') {
      text = invalidText({ value: parsedValue })
    }

    return (
      <div id={id} className={cx({
        [classes.invalid]: !!classes.invalid,
        [cm.license_plate]: true,
        [cm.invalid]: true,
      })}>
        {text}
      </div>
    )
  }


  return (
    <div id={id} className={cx({
      [classes.root]: !!classes.root,
      [cm.root]: true,
      [cm[`size-${size}`]]: !!size,
    })}>
      <If condition={number}>
        <span className={cx({
          [classes.number]: !!classes.number,
          [cm.number]: true,
        })}>
          {number}
        </span>
      </If>
      <If condition={region}>
        <span className={cx({
          [classes.region]: !!classes.region,
          [cm.region]: true,
        })}>
          {region}
        </span>
      </If>
    </div>
  )
}

LicensePlate.propTypes = {
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
  /** Additional classes */
  classes: PropTypes.object,
}
LicensePlate.defaultProps = {
  size: 'm',
  invalidText: 'Invalid value',
  classes: {
    root: '',
    number: '',
    region: '',
    invalid: '',
  },
}

export default LicensePlate

const getResultCache = {}
const getResult = (type, value) => {
  const key = `${type}__${value}`

  if (getResultCache[key]) { return getResultCache[key] }

  let result = {
    number: '',
    region: '',
  }

  if (!type || !value) {
    return result
  }

  switch (type) {
    case 'type1':
      result = resultType1(value)
      break
    case 'type1b':
      result = resultType1b(value)
      break
    case 'type2':
      result = resultType2(value)
      break
  }

  getResultCache[key] = result

  return result
}


const parseTypeCache = {}
// Тип 1 -> Регистрационные знаки легковых, грузовых автомобилей и автобусов
const type1 = /^[ABEKMHOPCTYXАВЕКМНОРСТУХ]{1}\d{3}[ABEKMHOPCTYXАВЕКМНОРСТУХ]{2}\d{2,3}$/g
// Тип 1Б -> Регистрационные знаки для легковых такси, транспортных средств, оборудованных для перевозок более восьми человек, осуществляющих перевозку на основании лицензии
const type1b = /^[ABEKMHOPCTYXАВЕКМНОРСТУХ]{2}\d{5}$/g
// Тип 2 -> Регистрационные знаки для автомобильных прицепов и полуприцепов.
const type2 = /^[ABEKMHOPCTYXАВЕКМНОРСТУХ]{2}\d{6}$/g

const parseType = string => {
  if (!string) { return '' }
  if (parseTypeCache[string]) { return parseTypeCache[string] }

  if (type1.test(string)) {
    parseTypeCache[string] = 'type1'
    return 'type1'
  }

  if (type1b.test(string)) {
    parseTypeCache[string] = 'type1b'
    return 'type1b'
  }

  if (type2.test(string)) {
    parseTypeCache[string] = 'type2'
    return 'type2'
  }

  return ''
}


const parseValueCache = {}
const parseValue = string => {
  if (!string) { return '' }
  if (parseValueCache[string]) { return parseValueCache[string]}

  let value = string.toUpperCase()
  value = value.replace(/\s/g, '')
  value = toCyrillic(value)

  parseValueCache[string] = value
  return value
}



const resultType1 = string => {
  const value = string.match(/^[ABEKMHOPCTYXАВЕКМНОРСТУХ]{1}|\d{3}|[ABEKMHOPCTYXАВЕКМНОРСТУХ]{2}|\d{2,3}/g) || []
  const serieStart = value[0]
  const number = value[1]
  const serieEnd = value[2]
  const region = value[3]

  return {
    number: `${serieStart} ${number} ${serieEnd}`,
    region,
  }
}

const resultType1b = string => {
  const value = string.match(/^[ABEKMHOPCTYXАВЕКМНОРСТУХ]{2}|\d{3}|\d+/g) || []
  const serie = value[0]
  const number = value[1]
  const region = value[2]

  return {
    number: `${serie} ${number}`,
    region,
  }
}

const resultType2 = string => {
  const value = string.match(/^[ABEKMHOPCTYXАВЕКМНОРСТУХ]{2}|\d{4}|\d+/g) || []
  const serie = value[0]
  const number = value[1]
  const region = value[2]

  return {
    number: `${serie} ${number}`,
    region,
  }
}