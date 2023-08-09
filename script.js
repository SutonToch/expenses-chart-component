//import assertions currently do not work in firefox
const data = [
  {
    "day": "mon",
    "amount": 17.45
  },
  {
    "day": "tue",
    "amount": 34.91
  },
  {
    "day": "wed",
    "amount": 52.36
  },
  {
    "day": "thu",
    "amount": 31.07
  },
  {
    "day": "fri",
    "amount": 23.39
  },
  {
    "day": "sat",
    "amount": 43.28
  },
  {
    "day": "sun",
    "amount": 25.48
  }]
const expensesDays = document.querySelectorAll(".expenses-day")
const expensesColumns = document.querySelectorAll(".expenses-column")
const dayOfTheWeeks = document.querySelectorAll(".day-of-the-week")
const today = adjustedToday(new Date(Date()).getDay())

render()

function render() {
  const highestAmount = getHighestAmount(data)
  let columnHeight = 0

  for(let i=0; i<7; i++) {
    //fill chart with provided data
    dayOfTheWeeks[i].textContent = data[i].day
    expensesDays[i].textContent = "$" + data[i].amount

    columnHeight = (Number(data[i].amount)/highestAmount)*100
    expensesColumns[i].style.height = columnHeight + "px"

    //make today's column cyan
    if(i == today) {
      expensesColumns[i].classList.add("expenses-column-highest-expense")
    }

    //event listeners to show/hide brown box above columns
    expensesColumns[i].addEventListener("mouseover", (event) => {
      event.target.closest(".chart-column").children[0].classList.add("expenses-day-wrapper-show")
    })
    expensesColumns[i].addEventListener("mouseout", (event) => {
      event.target.closest(".chart-column").children[0].classList.remove("expenses-day-wrapper-show")
    })
  }
}

function getHighestAmount(data) {
  let highestAmount = 0

  for(let i=0; i<data.length; i++) {
    if(Number(data[i].amount) > highestAmount) {
      highestAmount = Number(data[i].amount)
    }
  }
  return highestAmount
}

function adjustedToday(dayOfTheWeek) {
  if(dayOfTheWeek == 0) {
    return 6
  } else {
    return dayOfTheWeek-1
  }
}