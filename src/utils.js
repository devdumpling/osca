// Current Lottery
const currentLotteryId = 'spring2021'

// User qualification test
const userQualifies = user => {
  if (user.email) {
    const domain = user.email.split('@')[1]
    return domain === 'gmail.com'
  } else {
    return false
  }
}

export {
  currentLotteryId,
  userQualifies,
  hash
}

// 53-bit hash used for unique entryId for a given email and lotteryId (e.g. Spring 2020)
// https://stackoverflow.com/a/52171480
function hash (str, seed = 0) {
  str = typeof str === 'string' ? str : JSON.stringify(str)
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i)
    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909)
  h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909)
  return 4294967296 * (2097151 & h2) + (h1>>>0)
}