const submit = document.querySelector('button')
const inputDay = document.querySelector('.inputDay')
const inputMonth = document.querySelector('.inputMonth')
const inputYear = document.querySelector('.inputYear')
const errors = document.querySelectorAll('.error')

const years = document.querySelector('.years')
const months = document.querySelector('.months')
const days = document.querySelector('.days')

submit.addEventListener('click', () => {
  const currentDate = new Date()
  const dateOfBirth = new Date(inputYear.value, inputMonth.value - 1, inputDay.value)

  let accYear = 0
  let accMonth = 0

  const Feb = currentDate.getFullYear() % 400 === 0 ? 29 : currentDate.getFullYear() % 100 === 0 ? 28 : currentDate.getFullYear() % 4 === 0 ? 29 : 28
  const monthsYears = [ 31, Feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  const yearsText = () => {
    return currentDate.getMonth() + 1 > Number(inputMonth.value) ? currentDate.getFullYear() - Number(inputYear.value) : 
    (currentDate.getFullYear() - Number(inputYear.value)) - 1
  }
  const monthsText = () => {
    return currentDate.getMonth() - dateOfBirth.getMonth() < 0 ? (currentDate.getMonth() - dateOfBirth.getMonth()) + 12 : currentDate.getMonth() - dateOfBirth.getMonth()
  }
  const daysText = () => {
    if(monthsText() == 0 && currentDate.getDate() < Number(inputDay.value)) {
      accMonth = 11
      return (monthsYears[currentDate.getMonth() - 1] - Number(inputDay.value)) + currentDate.getDate()
    } else if(monthsText() == 0 && currentDate.getDate() == Number(inputDay.value)) {
      accYear = 1
      return 0
    } else {
      accYear = 1
      return currentDate.getDate() - Number(inputDay.value)
    }
  }
  // const daysText = currentDate.getDate() - inputDay.value

  days.innerHTML = daysText()
  months.innerHTML = monthsText() + accMonth
  years.innerHTML = yearsText() + accYear
  // if(monthsText === 0 || currentDate.getDate() < Number(inputDay.value)) {
  //   let day = Math.abs((monthsYears[currentDate.getMonth()] - currentDate.getDate()) + Number(inputDay.value))
  //   days.innerHTML = day
  // } else {
  //   days.innerHTML = Math.abs(daysText)
  // }
})