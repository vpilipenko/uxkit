import React from 'react'

const ArrowTop = props => {
  const { id, width, height, fill } = props
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg'>
      <polygon
        id={id}
        fill={fill}
        // eslint-disable-next-line
        transform="translate(11.363961, 11.889087) rotate(180.000000) translate(-11.363961, -11.889087)"
        // eslint-disable-next-line
        points="11.363961 12.9497475 16.3137085 8 17.7279221 9.41421356 11.363961 15.7781746 5 9.41421356 6.41421356 8"
      ></polygon>
    </svg>
  )
}

export default ArrowTop