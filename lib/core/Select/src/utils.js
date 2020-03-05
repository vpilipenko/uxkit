/* eslint-disable */

export const findClosest = (el, s) => {
  do {
    if (el.matches(s)) {return el}
    el = el.parentElement || el.parentNode
  } while (el !== null && el.nodeType === 1)
  return null
}

export const getElIndex = node => {
  let i = 0;
  while (node = node.previousElementSibling) {
      i++;
  }
  return i;
}