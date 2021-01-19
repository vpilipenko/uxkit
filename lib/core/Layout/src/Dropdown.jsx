import cm from './Dropdown.module.styl'

import React, { useState, useEffect } from 'react'

import NavItem from './NavItem'
import { ArrowDown, ArrowTop } from '@apass/icons'

const Dropdown = ({
  title,
  index,
  path,
  children,
  isOpen,
  defaultOpen,
}) => {

  const [open, setOpen] = useState(!!defaultOpen)
  const [initialDefaultOpen, setInitialDefaultOpen] = useState(!!defaultOpen)

  useEffect(() => {
    if (!initialDefaultOpen) {
      setOpen(!!isOpen)
    }
    setInitialDefaultOpen(false)
  }, [isOpen])

  return (
    <div className={cm.dropdown}>
      <NavItem
        text={title}
        suffix={open ? <ArrowTop /> : <ArrowDown />} // eslint-disable-line
        data-type='dropdown'
        data-path={path}
        data-open={open}
      />
      <If condition={open}>
        <div className={cm.collapse_box}>
          {children}
        </div>
      </If>
    </div>
  )
}

export default Dropdown