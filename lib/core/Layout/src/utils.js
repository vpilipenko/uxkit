/* eslint-disable */

export const findClosest = (el, s) => {
  do {
    if (el.matches(s)) {return el}
    el = el.parentElement || el.parentNode
  } while (el !== null && el.nodeType === 1)
  return null
}