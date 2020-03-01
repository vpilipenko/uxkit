import React from 'react'

import Icon from '../../Icon/src'

export const Cross = props => {
  const { id, width, height, fill } = props
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg'>
      <path
        id={id}
        // eslint-disable-next-line
        d='M11.1,11.1 L11.1,3 L12.9,3 L12.9,11.1 L21,11.1 L21,12.9 L12.9,12.9 L12.9,21 L11.1,21 L11.1,12.9 L3,12.9 L3,11.1 L11.1,11.1 Z'
        fill={fill}
        // eslint-disable-next-line
        transform='translate(12.000000, 12.000000) rotate(45.000000) translate(-12.000000, -12.000000)'
      ></path>
    </svg>
  )
}

export default props => <Icon {...props}><Cross /></Icon>
