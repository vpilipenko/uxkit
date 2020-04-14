import React from 'react'

export const Compare = props => {
  const { id, width, height, fill } = props
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg'>
        <path d="M10,3 L5,3 C3.9,3 3,3.9 3,5 L3,19 C3,20.1 3.9,21 5,21 L10,21 L10,23 L12,23 L12,1 L10,1 L10,3 Z M10,18 L5,18 L10,12 L10,18 Z M19,3 L14,3 L14,5 L19,5 L19,18 L14,12 L14,21 L19,21 C20.1,21 21,20.1 21,19 L21,5 C21,3.9 20.1,3 19,3 Z" id={id} fill={fill} fill-rule="nonzero"></path>
    </svg>
  )
}

export default Compare
