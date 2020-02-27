// import cm from './Icon.module.styl'
// import './test.css'

import React from 'react'

import PropTypes, { oneOfType } from 'prop-types'
import cx from 'classnames'

const Icon = props => {
  const { id, size, width, height, fill, className, children, ...other } = props
  return (
    <div {...other}>
      {React.cloneElement(children, {
        id,
        width: width || size,
        height: height || size,
        fill,
      })}
    </div>
  )
}

Icon.propTypes = {
  /** Component ID in DOM */
  id: PropTypes.string,
  /** Total value for width and height in 'px' */
  size: oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  /** Width in 'px' */
  width: oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  /** Height in 'px'*/
  height: oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  /** Fill in Hexadecimal, RGB, RGBA, HSL, HSLA or Predefined/Cross-browser color name */
  fill: PropTypes.string,
  /** Additional classes */
  className: PropTypes.string,
  /** Child components should be basic icon components, such as CrossIcon */
  children: PropTypes.node,
}

Icon.defaultProps = {
  size: '24',
  fill: '#282728',
}

export default Icon
