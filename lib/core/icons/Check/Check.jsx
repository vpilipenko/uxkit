import React from 'react'

import Icon from '../../Icon/src'

const Check = props => {
  const { id, width, height, fill } = props
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg'>
      <polyline
        id={id}
        fill={fill}
        // eslint-disable-next-line
        points='5 13.6565301 9.53625356 19.2274373 19.0600004 7.01554016 19.0600004 4 9.54508548 16.2915874 5 10.7560079 5 13.6565301'
      ></polyline>
    </svg>
  )
}

export default props => <Icon {...props}><Check /></Icon>