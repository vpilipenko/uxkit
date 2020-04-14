import cm from './Amount.module.styl'

import React, { Component } from 'react'

import PropTypes from 'prop-types'
import cx from 'classnames'
import numeral from 'numeral'
import 'numeral/locales/ru'
import 'numeral/locales/de'

const CURRENCIES = {
  rur: '₽',
  eur: '€',
  usd: '$',
}


const cachei = {}
const cachef = {}

class Amount extends Component {

  static propTypes = {
    /** Amount value */
    amount: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /** Currency one of ['rur', 'eur', 'usd', false] */
    currency: PropTypes.oneOf(['rur', 'eur', 'usd', false]),
    /** Overwrite currency signs */
    currencies: PropTypes.array,
    /** Size of component one of ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl', false] */
    size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl', false]),
    /** Font weight of component one of ['regular', 'medium', 'bold', false] */
    weight: PropTypes.oneOf(['regular', 'medium', 'bold', false]),
    /** Theme of component one of ['light', 'dark', false] */
    theme: PropTypes.oneOf(['light', 'dark', false]),
  }

  static defaultProps = {
    amount: 0,
    currency: 'rur',
    theme: 'light',
    size: 'm',
  }


  constructor(props) {
    super(props)
    const { amount } = props
    this.state = {
      integer: (cachei[amount] || (cachei[amount] = this.parseInteger(amount))),
      fractial: (cachef[amount] || (cachef[amount] = this.parseFractial(amount))),
    }
  }

  componentDidUpdate(prevProps) {
    const { amount } = this.props
    if (prevProps.amount !== amount) {
      this.setState({
        integer: (cachei[amount] || (cachei[amount] = this.parseInteger(amount))),
        fractial: (cachef[amount] || (cachef[amount] = this.parseFractial(amount))),
      })
    }
  }


  parseInteger = a => {
    const parse = numeral(parseFloat(a)).format('0,0.00')
    return parse.slice(0, parse.length - 3)
  }

  parseFractial = a => {
    const parse = numeral(parseFloat(a)).format('.00')
    return parse.replace('-', '')
  }


  renderInteger = _ => {
    const { integer } = this.state

    return (
      <span className={cm.integer}>
        {integer}
      </span>
    )
  }

  renderFractial = _ => {
    const { fractial } = this.state

    return (
      <span className={cm.fractial}>
        {fractial}
      </span>
    )
  }

  renderCurrency = _ => {
    const { currency, currencies } = this.props

    if (!currency) {
      return null
    }

    const value = currencies ? currencies[currency] || CURRENCIES[currency] : CURRENCIES[currency]

    return (
      <span className={cm.currency}>
        &thinsp;{value}
      </span>
    )
  }


  render() {
    const {
      currency,
      size,
      weight,
      theme,
      className,
      // eslint-disable-next-line
      amount, currencies,
      ...other
    } = this.props

    if (currency && currency.toLowerCase() === 'rur') {
      numeral.locale('ru')
    }

    if (currency && currency.toLowerCase() === 'eur') {
      numeral.locale('de')
    }

    if (currency && currency.toLowerCase() === 'usd') {
      numeral.locale('en')
    }


    return (
      <span
        className={cx({
          [cm.amount]: true,
          [cm[`size-${size}`]]: !!size,
          [cm[`weight-${weight}`]]: !!weight,
          [cm[`theme-${theme}`]]: !!theme,
        }, className)}
        {...other}
      >
        {this.renderInteger()}
        {this.renderFractial()}
        {this.renderCurrency()}
      </span>
    )
  }
}

export default Amount