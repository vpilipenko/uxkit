import cm from './Breadcrumbs.module.styl'

import React, { Component } from 'react'


class Breadcrumbs extends Component {

  static defaultProps = {
    breadcrumbs: [],
  }

  render() {
    const { breadcrumbs, linkComponent } = this.props
    
    return (
      <div className={cm.breadcrumbs}>
        {breadcrumbs.map((crumb, index) => {
          let Component = <a href={crumb.to}>{crumb.name}</a>

          if (typeof(linkComponent) === 'function') {
            Component = linkComponent({ crumb, index })
          }

          return (
            <span className={cm.crumb} key={`${crumb.to}_${index}`}>
              {Component}
            </span>
          )
        })}
      </div>
    )
  }
}

export default Breadcrumbs
