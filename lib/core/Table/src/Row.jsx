import cm from './Table.module.styl'

import React, { Component } from 'react'

import cx from 'classnames'

import Col from './Col'


class Row extends Component {
  render() {
    const {
      row,
      cols,
      rowIdKey,
      index,
      rowProps,
      colProps,
    } = this.props

    let props = rowProps || {}

    if (typeof(rowProps) === 'function') {
      props = rowProps(row, index)
    }

    if (props.className) {
      props.className = cx(cm.row, props.className)
    }


    return (
      <div
        cols={cols}
        className={cm.row}
        data-id={row[rowIdKey]}
        data-index={index}
        data-row
        {...props}
      >
        {cols.map((col, colIndex) => {
          return (
            <Col
              row={row}
              index={index}
              col={col}
              colIndex={colIndex}
              colProps={colProps}
              key={`col_${index}_${colIndex}`}
            />
          )
        })}
      </div>
    )
  }
}

export default Row
