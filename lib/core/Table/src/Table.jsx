import cm from './Table.module.styl'

import React, { Component } from 'react'

import cx from 'classnames'

import Header from './Header'
import Row from './Row'


class Table extends Component {

  static defaultProps = {
    stickyHeader: true,
    rowIdKey: 'id',
    onClick: f => f,
    onRowClick: f => f,
    onCellClick: f => f,
    cols: [],
    rows: [],
  }

  handleTableClick = e => {
    let { target } = e
    const { currentTarget } = e

    let row
    let cell

    // eslint-disable-next-line
    while (target && target !== currentTarget) {
      if (target.dataset && target.dataset.row) {
        row = target
        break
      }
      if (target.dataset && target.dataset.cell) {
        cell = target
      }
      target = target.parentNode
    }

    const {
      rows,
      cols,
      onClick,
      onRowClick,
      onCellClick,
    } = this.props

    onClick(e)

    if (row) {
      const { index } = row.dataset
      onRowClick(e, {
        row: { ...rows[index], index },
        target: row,
      })
    }

    if (cell) {
      const { rowindex, colindex } = cell.dataset
      onCellClick(e, {
        row: { ...rows[rowindex], index: rowindex },
        col: { ...cols[colindex], index: colindex },
        value: rows[rowindex][cols[colindex].key],
        target: cell,
      })
    }

  }

  render() {
    const {
      cols,
      rows,
      rowIdKey,

      rowComponent,
      rowProps,

      colComponent,
      colProps,

      stickyHeader,
      hoverable,
      striped,

      // eslint-disable-next-line
      onClick, onRowClick, onCellClick,

      ...other
    } = this.props


    return (
      <div
        className={cx({
          [cm.table]: true,
          [cm.hoverable]: hoverable,
          [cm.striped]: striped,
        })}
        onClick={this.handleTableClick}
        {...other}
      >
        <Header
          cols={cols}
          stickyHeader={stickyHeader}
        />
        {rows.map((row, index, arr) => {
          return (
            <Row
              row={row}
              cols={cols}
              rowIdKey={rowIdKey}
              index={index}
              rowComponent={rowComponent}
              rowProps={rowProps}
              colComponent={colComponent}
              colProps={colProps}
              key={`row_${index}`}
            />
          )
        })}
      </div>
    )
  }

}

export default Table
