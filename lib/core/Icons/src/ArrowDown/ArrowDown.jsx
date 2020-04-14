import React from 'react'

const ArrowDown = props => {
  const { id, width, height, fill } = props
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg'>
      <polygon
        id={id}
        fill={fill}
        // eslint-disable-next-line
        points='12.363961 12.9497475 17.3137085 8 18.7279221 9.41421356 12.363961 15.7781746 6 9.41421356 7.41421356 8'
      ></polygon>
    </svg>
  )
}

export default ArrowDown