import React from 'react'

import PropTypes from 'prop-types'

const Icon = props => {
  const { id, size, width, height, fill, className, children, ...other } = props
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      {...other}
    >
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
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  /** Width in 'px' */
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  /** Height in 'px'*/
  height: PropTypes.oneOfType([
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
