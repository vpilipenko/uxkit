const LOCALIZE_CHARS_CACHE = {}

const CYR = 'АВЕКМНОРСТУХ'
const LAT = 'ABEKMHOPCTYX'

const toCyrillic = (
  value,
) => {

  if (LOCALIZE_CHARS_CACHE[value]) {
    return LOCALIZE_CHARS_CACHE[value]
  }

  let result = ''

  for (let i = 0; i < value.length; i++) { // eslint-disable-line
    const char = value[i]
    const index = LAT.indexOf(char)

    if (index !== -1) {
      result = result + CYR[index]
    } else {
      result = result + char
    }
  }

  LOCALIZE_CHARS_CACHE[value] = result

  return result
}

export default toCyrillic