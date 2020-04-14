import React from 'react'

const ArrowRight = props => {
  const { id, width, height, fill } = props
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg'>
      <polygon
        id={id}
        fill={fill}
        // eslint-disable-next-line
        points="13.4246212 11.8890873 8.47487373 6.93933983 9.8890873 5.52512627 16.2530483 11.8890873 9.8890873 18.2530483 8.47487373 16.8388348"
      ></polygon>
    </svg>
  )
}

export default ArrowRight