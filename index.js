const submit = document.querySelector('button')
const inputDay = document.querySelector('.inputDay')
const inputMonth = document.querySelector('.inputMonth')
const inputYear = document.querySelector('.inputYear')
const errors= document.querySelectorAll('.error')

const years = document.querySelector('.years')
const months = document.querySelector('.months')
const days = document.querySelector('.days')

submit.addEventListener('click', () => {
  const currentDate = new Date()

  const Feb = currentDate.getFullYear() % 400 === 0 ? 29 : currentDate.getFullYear() % 100 === 0 ? 28 : currentDate.getFullYear() % 4 === 0 ? 29 : 28
  const monthsYears = [ 31, Feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  let error = true

  const errorInputDay = () => {
    error = true
    if(inputDay.value.length === 0) errors[0].innerHTML = 'The field is required'
    else if(Number(inputDay.value) <= 0 || Number(inputDay.value) > monthsYears[Number(inputMonth.value) - 1] || Number(inputDay.value) > 31 || !Number(inputDay.value))  errors[0].innerHTML = 'Must be a valid Day'
    else {
      error = false
      errors[0].innerHTML = ''
    }
  }

  const errorInputMonth = () => {
    error = true
    if(inputMonth.value.length === 0) errors[1].innerHTML = 'The field is required'
    else if(Number(inputMonth.value) > 12 || Number(inputMonth.value) <= 0 || !Number(inputMonth.value))  errors[1].innerHTML = 'Must be a valid Month'
    else {
      error = false
      errors[1].innerHTML = ''
    }
  }

  const errorInputYear = () => {
    error = true
    if(inputYear.value.length === 0) errors[2].innerHTML = 'The field is required'
    else if(Number(inputYear.value) > currentDate.getFullYear() || Number(inputYear.value) <= 0 || !Number(inputYear.value))  errors[2].innerHTML = 'Must be a valid Year'
    else {
      error = false
      errors[2].innerHTML = ''
    }
  }

  errorInputDay()
  errorInputMonth()
  errorInputYear()

  if(error) return 
  
  const dateOfBirth = new Date(inputYear.value, inputMonth.value - 1, inputDay.value)
  let accYear = 0
  let accMonth = 0
  
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
    } else if(monthsText() != 0 && currentDate.getDate() < Number(inputDay.value)) {
      accMonth = -1
      return (monthsYears[currentDate.getMonth() - 1] - Number(inputDay.value)) + currentDate.getDate()
    } else if(monthsText() == 0 && currentDate.getDate() == Number(inputDay.value)) {
      accYear = 1
      return 0
    } else {
      accYear = 1
      return currentDate.getDate() - Number(inputDay.value)
    }
  }

  days.innerHTML = daysText()
  months.innerHTML = monthsText() + accMonth
  years.innerHTML = yearsText() + accYear
})