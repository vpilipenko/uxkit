import React from 'react'

const Download = props => {
  const { id, width, height, fill } = props
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg'>
      <g id={id} stroke='none' strokeWidth='1' fill={fill} fillRule='evenodd'>
        <path d="M19.875,18.8185252 C20.4963203,18.8185252 21,19.306865 21,19.9092626 C21,20.5116602 20.4963203,21 19.875,21 L4.125,21 C3.50367966,21 3,20.5116602 3,19.9092626 C3,19.306865 3.50367966,18.8185252 4.125,18.8185252 L19.875,18.8185252 Z M11.2045048,16.3175809 L8.02252436,13.2325096 C7.58318452,12.8065502 7.58318452,12.1159335 8.02252436,11.689974 C8.4618642,11.2640146 9.17417482,11.2640146 9.61351466,11.689974 L10.8754805,12.913273 L10.875,5.09073739 C10.875,4.48833982 11.3786797,4 12,4 C12.6213203,4 13.125,4.48833982 13.125,5.09073739 L13.1254805,12.913273 L14.3864854,11.689974 C14.8258252,11.2640146 15.5381358,11.2640146 15.9774756,11.689974 C16.4168155,12.1159335 16.4168155,12.8065502 15.9774756,13.2325096 L12.7954951,16.3175809 C12.3561553,16.7435403 11.6438447,16.7435403 11.2045048,16.3175809 Z"></path>
      </g>
    </svg>
  )
}

export default Download