export function transformDate(rawDate) {
  const months = {
    '01': 'січ',
    '02': 'лют',
    '03': 'бер',
    '04': 'квіт',
    '05': 'трав',
    '06': 'чер',
    '07': 'лип',
    '08': 'сер',
    '09': 'вер',
    '10': 'жов',
    '11': 'лис',
    '12': 'груд'
  }
  const rawDateValues = rawDate.split('-')
  return `${rawDateValues[2]} ${months[rawDateValues[1]]}`
}

export function createWaiterMarkUp() {
  return `
    <div>
      Fetching data...
    </div>
  `
}

export function fetchErrorMarkUp() {
  return `
    <div>
      Fetch failed. Check your internet connection or try again later, please.
    </div>
  `
}

export function shortenDescription(string, length) {
  
  if (string.length <= length) {
    return string
  }

  return string.slice(0, length) + '...'
}
