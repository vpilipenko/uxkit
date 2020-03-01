import React from 'react'

const Hamburger = props => {
  const { id, width, height, fill } = props
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg'>
      <g id={id} stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
        <rect id='Rectangle-6' fill={fill} x='6' y='7' width='12' height='2' rx='1'></rect>
        <rect id='Rectangle-6-Copy' fill={fill} x='6' y='11' width='12' height='2' rx='1'></rect>
        <rect id='Rectangle-6-Copy-2' fill={fill} x='6' y='15' width='12' height='2' rx='1'></rect>
      </g>
    </svg>
  )
}

export default Hamburger
