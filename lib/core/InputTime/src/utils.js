export const timeParser = (value, showHour, showMinute, showSecond, showAMPM, inputMask, hourOptions, minuteOptions, secondOptions, AMPM) => {
  let regexp = inputMask

  if (showHour) {
    regexp = regexp.replace(/99/, `(${hourOptions.join('|')})`)
  }

  if (showMinute) {
    regexp = regexp.replace(/99/, `(${minuteOptions.join('|')})`)
  }

  if (showSecond) {
    regexp = regexp.replace(/99/, `(${secondOptions.join('|')})`)
  }

  if (showAMPM) {
    regexp = regexp.replace(/aa/, '(am|pm)')
  }

  const isMatch = value.match(new RegExp(regexp))

  if (!isMatch) {
    return null
  }


  let string = `${value}`
  let hour = null
  let minute = null
  let second = null
  let ampm = null

  if (showHour) {
    hour = string.match(/\d{2}/).pop()
    string = string.replace(/\d{2}/, '')
  }

  if (showMinute) {
    minute = string.match(/\d{2}/).pop()
    string = string.replace(/\d{2}/, '')
  }

  if (showSecond) {
    second = string.match(/\d{2}/).pop()
    string = string.replace(/\d{2}/, '')
  }

  if (AMPM && showAMPM) {
    ampm = string.match(/\w{2}/).pop()
    string = string.replace(/aa/, '')
  }

  return { hour, minute, second, ampm }
}


export const findClosest = (el, s) => {
  do {
    if (el.matches(s)) {return el}
    el = el.parentElement || el.parentNode
  } while (el !== null && el.nodeType === 1)
  return null
}