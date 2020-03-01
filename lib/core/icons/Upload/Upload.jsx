import React from 'react'

import Icon from '../../Icon'


const Upload = props => {
  const { id, width, height, fill } = props
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg'>
      <g id={id} stroke='none' strokeWidth='1' fill={fill} fillRule='evenodd'>
        <path d='M19,18 C19.5522847,18 20,18.4477153 20,19 C20,19.5522847 19.5522847,20 19,20 L5,20 C4.44771525,20 4,19.5522847 4,19 C4,18.4477153 4.44771525,18 5,18 L19,18 Z M12.7071068,4.70710678 L15.5355339,7.53553391 C15.9260582,7.9260582 15.9260582,8.55922318 15.5355339,8.94974747 C15.1450096,9.34027176 14.5118446,9.34027176 14.1213203,8.94974747 L12.9995729,7.82821356 L13,15 C13,15.5522847 12.5522847,16 12,16 C11.4477153,16 11,15.5522847 11,15 L10.9995729,7.82821356 L9.87867966,8.94974747 C9.48815536,9.34027176 8.85499039,9.34027176 8.46446609,8.94974747 C8.0739418,8.55922318 8.0739418,7.9260582 8.46446609,7.53553391 L11.2928932,4.70710678 C11.6834175,4.31658249 12.3165825,4.31658249 12.7071068,4.70710678 Z'></path>
      </g>
    </svg>
  )
}

export default props => <Icon {...props}><Upload /></Icon>
