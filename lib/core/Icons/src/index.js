import React from 'react'

// import Text from '@vpilipenko/text'
// const Icon = require('@vpilipenko/icon')
import Icon from '@vpilipenko/icon'



import AlertIcon  from './Alert'
import ArrowLeftIcon  from './ArrowLeft'
import CheckIcon  from './Check'
import CrossIcon  from './Cross'
import DeleteIcon  from './Delete'
import HamburgerIcon  from './Hamburger'
import UploadIcon  from './Upload'

// export const Alert = props => <Text {...props}><AlertIcon/></Text>
export const ArrowLeft = props => <Icon {...props}><ArrowLeftIcon/></Icon>
export const Check = props => <Icon {...props}><CheckIcon/></Icon>
export const Cross = props => <Icon {...props}><CrossIcon/></Icon>
export const Delete = props => <Icon {...props}><DeleteIcon/></Icon>
export const Hamburger = props => <Icon {...props}><HamburgerIcon/></Icon>
export const Upload = props => <Icon {...props}><UploadIcon/></Icon>