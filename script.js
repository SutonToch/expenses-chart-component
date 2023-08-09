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
  }];
const expensesDays = document.querySelectorAll(".expenses-day")
const expensesColumns = document.querySelectorAll(".expenses-column")
const dayOfTheWeeks = document.querySelectorAll(".day-of-the-week")

initialize()

function initialize() {
  localStorage.setItem("data", JSON.stringify(data)) //this way I can later dynamically alter data
  render()
}

function render() {
  const data = JSON.parse(localStorage.getItem("data"))
  const highestAmount = getHighestAmount(data)
  let columnHeight = 0
  for(let i=0; i<7; i++) {
    dayOfTheWeeks[i].textContent = data[i].day
    expensesDays[i].textContent = "$" + data[i].amount

    columnHeight = (Number(data[i].amount)/highestAmount)*100
    expensesColumns[i].style.height = columnHeight + "px"

    if(Number(data[i].amount) == highestAmount) {
      expensesColumns[i].classList.add("expenses-column-highest-expense")
    }

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