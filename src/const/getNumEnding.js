// iNumber - Integer Число на основе которого нужно сформировать окончание
// aEndings - Array Массив слов или окончаний для чисел (1, 4, 5), например ['яблоко', 'яблока', 'яблок']

export const getNumEnding = (iNumber, aEndings) => {
  let sEnding, i
  iNumber = iNumber % 100
  if (iNumber >= 11 && iNumber <= 19) {
    // eslint-disable-next-line
    sEnding = aEndings[2]
  } else {
    i = iNumber % 10
    switch (i) {
    // eslint-disable-next-line
    case (1): sEnding = aEndings[0]; break
      case (2):
      case (3):
        // eslint-disable-next-line
    case (4): sEnding = aEndings[1]; break
        // eslint-disable-next-line
    default: sEnding = aEndings[2]
    }
  }
  return sEnding
}

export default getNumEnding