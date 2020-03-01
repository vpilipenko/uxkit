import React, { Component, Fragment } from 'react'

import PropTypes from 'prop-types'


class Pane extends Component {

  static propsTypes = {
    label: PropTypes.string.isRequired,
  }

  render() {
    const { children } = this.props

    return (
      <Fragment>
        {children}
      </Fragment>
    )
  }
}

export default Pane
