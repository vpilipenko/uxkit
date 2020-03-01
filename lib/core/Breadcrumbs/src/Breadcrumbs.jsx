import cm from './Breadcrumbs.module.styl'

import React, { Component } from 'react'

import { Link } from 'react-router-dom'


class Breadcrumbs extends Component {

  static defaultProps = {
    breadcrumbs: [],
  }

  render() {
    const { breadcrumbs } = this.props

    return (
      <div className={cm.breadcrumbs}>
        {breadcrumbs.map((crumb, index) => {
          return (
            <span className={cm.crumb} key={`${crumb.to}_${index}`}>
              <Link to={crumb.to}>
                {crumb.name}
              </Link>
            </span>
          )
        })}
      </div>
    )
  }
}

export default Breadcrumbs
