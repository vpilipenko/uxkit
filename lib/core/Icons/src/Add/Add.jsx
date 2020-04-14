import React from 'react'

export const Add = props => {
  const { id, width, height, fill }= props
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg'>
      <g id={id} fill={fill}>
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </g>
    </svg>
  )
}

export default Add
