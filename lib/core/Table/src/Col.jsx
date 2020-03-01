import cm from './Table.module.styl'

import React from 'react'


const Col = prps => {
  const {
    row,
    index,
    col,
    colIndex,
    colProps,
    width,
    ...other
  } = prps

  let { key } = col
  if (typeof(col.key) === 'function') {
    key = col.key({ row })
  }

  let props = colProps || {}
  if (typeof(colProps) === 'function') {
    props = colProps({ row, col, index, colIndex })
  }
  props = { ...props, ...other }

  let value = row[key]
  if (typeof(col.renderValue) === 'function') {
    value = col.renderValue({ row, col, index, colIndex })
  }

  return (
    <div
      data-column={col.key}
      data-cell
      data-rowindex={index}
      data-colindex={colIndex}
      className={cm.col}
      style={{
        width,
      }}
      {...props}
    >
      {value}
    </div>
  )
}

export default Col