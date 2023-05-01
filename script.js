
// ---Dates inputs---
const inputDay = document.querySelector('#input-day')
const inputMonth = document.querySelector('#input-month')
const inputYear = document.querySelector('#input-year')

//---Submit button---
const btn = document.querySelector('#arrow-btn')

// ---Shows the results for each date---
const yearResult = document.querySelector('#years-result')
const monthResult = document.querySelector('#month-result')
const daysResult = document.querySelector('#days-result')

//---Shows a message of error if the date is invalid---
const checkInputDay = document.querySelector('#check-input-day')
const checkInputMonth = document.querySelector('#check-input-month')
const checkInputYear = document.querySelector('#check-input-year')

btn.addEventListener('click', showResults)



////////////////////////////////////////////////////////////////////////////
// Checks the date that the user pass in the three inputs.

const checkDayOfBirth = (dayOfBirth) => {
    const year = Number(inputYear.value)
    const month = Number(inputMonth.value)

    if (Number(dayOfBirth) <= 0 || dayOfBirth === '' || Number(dayOfBirth) < 1 || Number(dayOfBirth) > 31) {
        addClasses()
        checkInputDay.innerHTML = 'This field is required'
    }

    const dayOfMonth = new Date(year, month, 0).getDate()
    if (Number(dayOfBirth) > dayOfMonth) {
        addClasses()
        checkInputDay.innerHTML = 'Must be a valid date '
    }

}

const checkMonthOfBirth = (monthOfBirth) => {
    if (Number(monthOfBirth) <= 0 || monthOfBirth === '' || Number(monthOfBirth) > 12) {
        addClasses()
        checkInputMonth.innerHTML = 'This field is required'
    }
    if (Number(monthOfBirth) > 12) {
        addClasses()
        checkInputMonth.innerHTML = 'Must be a valid month'
    }

}

const checkYearOfBirth = (yearOfBirth) => {
    const currentDate = new Date(Date.now())

    if (Number(yearOfBirth) <= 0 || yearOfBirth === '') {
        addClasses()
        checkInputYear.innerHTML = 'This field is required'
    }

    if (Number(yearOfBirth) > currentDate.getFullYear()) {
        addClasses()
        checkInputYear.innerHTML = 'Must be in the past'
    }

}

////////////////////////////////////////////////////////////////////////////


function showResults() {
    checkDayOfBirth(inputDay.value)
    checkMonthOfBirth(inputMonth.value)
    checkYearOfBirth(inputYear.value)
    calculateAgeOfUser()
    clearInputsError()
}


// ---Calculates the age of the user---
const calculateAgeOfUser = () => {

    // We store the data entered by the user in the variables day, month, year.
    let day = Number(inputDay.value)
    let month = Number(inputMonth.value)
    let year = Number(inputYear.value)

    //We create four variables to store the current date, day,month and year.
    const currentDate = new Date(Date.now())
    const currentDay = currentDate.getDate()
    const currentMonth = currentDate.getMonth() + 1
    const currentYear = currentDate.getFullYear() - 1

    let totalDays = currentDay - day
    let totalMonths = currentMonth - month
    let totalYears = currentYear - year

    //checking if the number of the result is negative.
    if (totalDays < 0) {
        month--
        totalDays = 30 + totalDays
    }

    if (totalMonths < 0) {
        year--
        totalMonths = 12 + totalMonths
    }

    //Checking that the inputs are not empty in order to not display the current date.
    if (inputDay.value === '' && inputMonth.value === '' && inputYear.value === '') {
        return
    }
    else {
        yearResult.innerHTML = totalYears
        monthResult.innerHTML = totalMonths
        daysResult.innerHTML = totalDays
    }
}



const addClasses = () => {
    inputDay.previousElementSibling.classList.add('active')
    inputMonth.previousElementSibling.classList.add('active')
    inputYear.previousElementSibling.classList.add('active')

    inputDay.classList.add('red-border')
    inputMonth.classList.add('red-border')
    inputYear.classList.add('red-border')
}



const clearInputsError = () => {
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
        input.addEventListener('keydown', () => {
            input.previousElementSibling.classList.remove('active')
            input.classList.remove('red-border')
            checkInputDay.innerHTML = ''
            checkInputMonth.innerHTML = ''
            checkInputYear.innerHTML = ''
        })
    })
}