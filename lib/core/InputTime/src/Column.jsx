import React, { useEffect } from 'react'

const Column = ({ active, children, ...other }) => {

  let columnRef = null

  useEffect(() => {
    const colEl = columnRef
    Array.from(colEl.children).map(el => {
      if (el.innerText === active) {        
        const elTop = el.offsetTop
        colEl.scroll({
          left: 0,
          top: elTop,
          behavior: 'smooth',
        })
      }
    })
  })

  return (
    <div {...other} ref={node => columnRef = node}>
      {children}
    </div>
  )
}

export default Column