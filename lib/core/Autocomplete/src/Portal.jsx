import { createPortal } from 'react-dom'

const Portal = props => {
  const { children, target = document.body } = props
  return createPortal(children, target);
}

export default Portal