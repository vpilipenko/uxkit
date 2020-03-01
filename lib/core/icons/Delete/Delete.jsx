import React from 'react'

import Icon from '../../Icon/src'


const Delete = props => {
  const { id, width, height, fill } = props

  return (
    <svg width={width} height={height} viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg'>
      <g id={id} stroke='none' strokeWidth='1' fill={fill} fillRule='evenodd'>
        <path d='M18,7 L17.0663395,20.071247 C17.0289605,20.5945525 16.5935195,21 16.0688808,21 L7.9311192,21 C7.40648054,21 6.97103946,20.5945525 6.9336605,20.071247 L6,7 L18,7 Z M14,3 C14.5128358,3 14.9355072,3.38604019 14.9932723,3.88337887 L15,4 L19,4 C19.5522847,4 20,4.44771525 20,5 C20,5.55228475 19.5522847,6 19,6 L5,6 C4.44771525,6 4,5.55228475 4,5 C4,4.44771525 4.44771525,4 5,4 L9,4 C9,3.44771525 9.44771525,3 10,3 L14,3 Z M10.6407545,11.281509 C10.2654092,10.9061637 9.65685425,10.9061637 9.28150896,11.281509 C8.93503639,11.6279815 8.90838466,12.1731653 9.20155376,12.5502088 L9.28150896,12.6407545 L10.641,14 L9.28150896,15.3592455 L9.20155376,15.4497912 C8.93281541,15.7954144 8.93281541,16.2823221 9.20155376,16.6279454 L9.28150896,16.718491 L9.37205463,16.7984462 C9.71767786,17.0671846 10.2045856,17.0671846 10.5502088,16.7984462 L10.6407545,16.718491 L12,15.359 L13.3592455,16.718491 C13.7345908,17.0938363 14.3431458,17.0938363 14.718491,16.718491 C15.0649636,16.3720185 15.0916153,15.8268347 14.7984462,15.4497912 L14.718491,15.3592455 L13.359,14 L14.718491,12.6407545 L14.7984462,12.5502088 C15.0671846,12.2045856 15.0671846,11.7176779 14.7984462,11.3720546 L14.718491,11.281509 L14.6279454,11.2015538 C14.2823221,10.9328154 13.7954144,10.9328154 13.4497912,11.2015538 L13.3592455,11.281509 L12,12.641 L10.6407545,11.281509 Z'></path>
      </g>
    </svg>
  )
}

export default props => <Icon {...props}><Delete /></Icon>
