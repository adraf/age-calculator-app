const dateForm = document.querySelector('.date-form')
const yearResult = document.getElementById('year-result')
const monthResult = document.getElementById('month-result')
const dayResult = document.getElementById('day-result')
const yearText = document.getElementById('year-text')
const monthText = document.getElementById('month-text')
const dayText = document.getElementById('day-text')
const yearInput = document.getElementById('year')
const monthInput = document.getElementById('month')
const dayInput = document.getElementById('day')
const dateNow = Date.now()
const thisYear = new Date(dateNow).getFullYear()
const thisMonth = new Date(dateNow).getMonth()
const todayDate = new Date(dateNow).getDate()

// stops future dates being input
yearInput.setAttribute('max', thisYear)

function checkThisYear() {
  yearInput.addEventListener('change', () => {
    const yearNum = Number(yearInput.value)
    if (yearNum === thisYear) {
      monthInput.setAttribute('max', thisMonth + 1)
    } else {
      monthInput.setAttribute('max', 12)
      checkDaysInMonth()
    }
  })
}
checkThisYear()

// Need to account for which dates exist - leap years, certain months have 30 or 31
// - APR, JUN, SEP, NOV - 30 days
// - Rest 31 days
// - FEB 28 days, or Leap Year 29 days

function checkDaysInMonth() {
  monthInput.addEventListener('change', () => {
    const yearNum = Number(yearInput.value)
    const monthNum = Number(monthInput.value)
    if ((yearNum === thisYear) && (monthNum === thisMonth + 1) ) {
      dayInput.setAttribute('max', todayDate)
    } else if (monthNum === 4 | monthNum === 6 | monthNum === 9 | monthNum === 11) {
      dayInput.setAttribute('max', 30)
    } else {
      dayInput.setAttribute('max', 31)
    }
  })
}
checkDaysInMonth()

//  If a year is a leap yr and month === 2 then set days to 29, else month === 2, set days to 28
// %4 yes -> %100 no = leap year || %4 yes -> %100 yes -> %400 yes = leap year 
function leapYear() {
  dateForm.addEventListener('change', () => {
    const yearNum = Number(yearInput.value)
    const monthNum = Number(monthInput.value)
    if (monthNum === 2 && ((yearNum % 4 === 0 && yearNum % 100 !== 0) || (yearNum % 4 === 0 && yearNum % 100 === 0 && yearNum % 400 === 0))) {
      dayInput.setAttribute('max', 29)
    } else if (monthNum === 2 && ((yearNum % 4 !== 0) || (yearNum % 4 === 0 && yearNum % 100 === 0 && yearNum % 400 !== 0))) {
      dayInput.setAttribute('max', 28)
    }
  })
}
leapYear()

const daysInMonth = (year, month) => new Date(year, month, 0).getDate()

dateForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const inputYear = yearInput.value
  const inputDay = dayInput.value
  const inputMonth = monthInput.value
  // ! if field is empty 
  // !- add styling red border
  // !- add red html text below (hide/unhide)
  getResults(inputDay, inputMonth, inputYear)
})

function getResults(inputDay, inputMonth, inputYear) {
  const dd = inputDay.length < 2 ? `0${inputDay}` : `${inputDay}`
  const mm = inputMonth.length < 2 ? `0${inputMonth}` : `${inputMonth}`
  const date = `${inputYear}-${mm}-${dd}T00:00:01`
  const birthDate = new Date(date).getTime()
  const diff = dateNow - birthDate
  const daysPassed = Math.floor(diff / (1000 * 60 * 60 * 24))
  // year
  const yearRes = Math.floor(daysPassed / 365)
  const leapYr = Math.floor(yearRes / 4)
  const leftOver = (daysPassed - (yearRes * 365)) - leapYr
  // months
  // months are an array so Jan starts at 0
  const birthMonth = new Date(date).getMonth()
  const monthRes = thisMonth - birthMonth < 0 ? 12 - (thisMonth - birthMonth) * -1 : thisMonth - birthMonth
  // days
  const prevMonthLength = daysInMonth(thisYear, thisMonth)
  const dayRes = inputDay < todayDate ? todayDate - inputDay : (prevMonthLength - inputDay) + todayDate
  // corrects wording for amounts
  yearRes === 1 ? yearText.innerText = 'year' : yearText.innerText = 'years'
  monthRes === 1 ? monthText.innerText = 'month' : monthText.innerText = 'months'
  dayRes === 1 ? dayText.innerText = 'day' : dayText.innerText = 'days'

  if (daysPassed >= 365 || inputYear < thisYear) {
    // * Year
    thisYear === Number(inputYear) ? yearResult.innerText = 0 : yearResult.innerText = yearRes
    if (leftOver > 0) {
      // * Month
      thisMonth + 1 !== Number(inputMonth) ? monthResult.innerText = monthRes : monthResult.innerText = 0
      // * Day
      todayDate === Number(inputDay) ? dayResult.innerText = 0 : dayResult.innerText = dayRes
    } else {
      monthResult.innerText = 0
      dayResult.innerText = 0
    }
  } else if (daysPassed < 365 || inputYear === thisYear) {
    // * Year
    yearResult.innerText = 0
    // * Month
    thisMonth + 1 !== Number(inputMonth) ? monthResult.innerText = monthRes : monthResult.innerText = 0
    // * Day
    todayDate === Number(inputDay) ? dayResult.innerText = 0 : dayResult.innerText = dayRes
  }
}