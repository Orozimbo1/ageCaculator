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
  const dataDeNascimento = new Date(inputYear.value, inputMonth.value - 1, inputDay.value)

  const yearsText = Math.floor(currentDate.getFullYear() - dataDeNascimento.getFullYear())
  const monthsText = Math.floor(currentDate.getMonth() - dataDeNascimento.getMonth())
  const daysText = currentDate.getDate() - inputDay.value

  years.innerHTML = yearsText
  months.innerHTML = monthsText < 0 ? monthsText + 12 : monthsText
  days.innerHTML = Math.abs(daysText)
})