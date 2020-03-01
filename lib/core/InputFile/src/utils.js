export const humanizeFileSize = bytes => {
  if (bytes < 1024) {
    return `${bytes}\u2009байт`
  }
  if (bytes >= 1024 && bytes < 1048576) {
    return `${(bytes / 1024).toFixed()}\u2009КБ`
  }
  if (bytes >= 1048576) {
    return `${(bytes / 1048576).toFixed()}\u2009МБ`
  }
}

export const findClosest = (el, s) => {
  // eslint-disable-next-line
  do {
    if (el.matches(s)) {return el}
    el = el.parentElement || el.parentNode
  } while (el !== null && el.nodeType === 1)
  return null
}
