import React from 'react'

export const Remove = props => {
  const { id, width, height, fill }= props
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg'>
        <polygon id={id} fill={fill} fillRule="nonzero" points="19 13 5 13 5 11 19 11"></polygon>
    </svg>
  )
}

export default Remove
