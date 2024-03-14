# Age Calculator App

This is a solution to the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q).

## Table of contents

- [Deployment Links](#deployment-Links)
- [Screenshots](#screenshots)
  - [Desktop View](#desktop-view)
  - [Mobile View](#mobile-view)
- [Timeframe](#timeframe)
- [Technologies Used](#technologies-used)
- [Brief](#brief)
- [Build Process](#build-process)
  - [Challenges](#challenges)
  - [Wins](#wins)
  - [Future Improvements](#future-improvements)
- [Useful Resources](#useful-resources)
- [Author](#author)


## Deployment Links

- [Live Site URL](https://adraf.github.io/age-calculator-app/)
- [Solution URL](https://your-solution-url.com)


## Screenshots

### Desktop View

![desktop view](assets/images/dekstop.png)

### Mobile View

![mobile view](assets/images/mobile.png)


## Timeframe

Solo Project - 4 days


## Technologies Used

HTML, CSS, JavaScript


## Brief

Users should be able to:

- View an age in years, months, and days after submitting a valid date through the form
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: See the age numbers animate to their final number when the form is submitted


## Build Process

I had begun by fleshing out the HTML so I had the input form, boxes and button to submit details and some basic styling to get things into a rough place.

I then moved onto JavaScript to start getting the values from the input boxes and be able to use them for some basic output. I wanted to start by getting the dates and reacquainting myself with the different outputs and rules using: `new Date()`, `.getTime()` and `Date.now()`. I started by finding out the amount of days between the user input date and today's date.

```js
function getResults(inputDay, inputMonth, inputYear) {
  const dd = inputDay.length < 2 ? `0${inputDay}` : `${inputDay}`
  const mm = inputMonth.length < 2 ? `0${inputMonth}` : `${inputMonth}`
  const date = `${inputYear}-${mm}-${dd}T00:00:01`
  const userInputDate = new Date(date).getTime()
  const diff = dateNow - userInputDate
  const daysPassed = Math.floor(diff / (1000 * 60 * 60 * 24))
  ...
}
```

From here I was able to start setting up some rules for the users when inputting dates in the input boxes. If there were errors the attribute of 'max' would be added to the input boxes which would give a system generated pop up to the user. If the user adhered to the rules then the result would be displayed on the user interface, but I could already see the extra rules that needed to be implemented from some results.

```js
const yearInput = document.getElementById('year')
const monthInput = document.getElementById('month')
const dayInput = document.getElementById('day')
const dateNow = Date.now()
const thisYear = new Date(dateNow).getFullYear()
const thisMonth = new Date(dateNow).getMonth() + 1
const todayDate = new Date(dateNow).getDate()

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
// - Rest have 31 days
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
```

With the majority of rules in place I then set about making my own error messages which would change the label and border box colours of the input boxes, and add an error message to alert the user to which rule had been broken. This meant refactoring the code but still using the rules I had created, and these were added to one large if...else statement. If a rule was broken then a class would be added to the input box elements to change the styling properties to red and also to add text to a hidden div for the error messages. It would also disable the submit button until the errors had been corrected.

```js
function checkDaysInMonth() {
  dateForm.addEventListener('change', (e) => {
    const yearNum = Number(yearInput.value)
    const monthNum = Number(monthInput.value)
    const dayNum = Number(dayInput.value)
    if (yearNum !== 0 && yearInput.value.length !== 4) {
      // Valid year entry
      inputBoxes[2].classList.add('error-box')
      inputLabels[2].classList.add('error-color')
      requiredMsg[2].classList.add('error-color')
      requiredMsg[2].classList.remove('hideMsg')
      requiredMsg[2].innerText = 'Must be a valid year'
      submitButton.disabled = true
      ...
    }})}
```

I also added in some tweaks as I had found bugs with user testing. For example as can be seen above I added in that the year would need to be 4 digits if the user had ignored the placeholder on the input box. There was also a bug where months would display with 1 more than they should if the date was less than a month away.

```js
const birthMonth = new Date(date).getMonth() + 1
  // Accounts for dates later in the month than present date, won't need to add extra month on results
  function lessThanMonth() {
    if (Number(inputDay) > todayDate) {
      return thisMonth - birthMonth < 0 ? (12 - (thisMonth - birthMonth) * -1) - 1 : (thisMonth - birthMonth) - 1
    } else {
      return thisMonth - birthMonth < 0 ? 12 - (thisMonth - birthMonth) * -1 : thisMonth - birthMonth
    }
  }
  const monthRes = lessThanMonth()
```

With everything working and having met the criteria of the brief for functionality I then carried on with the rest of the CSS styling to get the site pixel perfect, for both desktop and for mobile view too. 


## Challenges

One of my challenges was when I began adding in my own error messages to alert the user to issues, as the system generated 'max' attribute in the HTML was overriding what I was trying to achieve and also some rules in different parts of the code were affecting the outcomes as well. This is where I then made big changes and refactored the code into one large if...else statement to make sure there were no clashes and everything ran in order. The 'max' attributes were all removed from the HTML and I also added in the disabling of the submit button until all the rules had been met, and any necessary changes had been made by the user.


## Wins

### Leap Years & Leap Days

#### Leap Year
The leap year rule that stayed in the code, and makes up the if...else check, looks to see:  
1. Is the month February?  
2. Is the month a leap year?  
3. If not, is it a normal year?  
4. General catch all rule that Feb just can't be above 29, if users are entering details out of order and haven't input a date yet.  
5. If all rules are met then remove the error styling and enable the submit button.  

As mentioned in [Useful Resources](#useful-resources) below, I found a diagram to talk through how to see if a year is a leap year or not.  

  Is the year divisible by 4? Yes  
  ->  
  Is the year divisible by 100? No = Leap Year  

  Or  

  Is the year divisible by 4? Yes  
  ->  
  Is the year divisible by 100? Yes  
  ->  
  Is the year divisible by 400? Yes = Leap Year  

```js
else if (monthNum === 2) {
      // If a year is a leap yr and month === 2 then set days to 29, else month === 2, set days to 28
      // %4 yes -> %100 no = leap year || %4 yes -> %100 yes -> %400 yes = leap year 
      // Leap Year
      if (yearNum !== 0 && ((yearNum % 4 === 0 && yearNum % 100 !== 0) || (yearNum % 4 === 0 && yearNum % 100 === 0 && yearNum % 400 === 0)) && dayNum > 29) {
        inputBoxes[0].classList.add('error-box')
        inputLabels[0].classList.add('error-color')
        requiredMsg[0].classList.remove('hideMsg')
        requiredMsg[0].classList.add('error-color')
        requiredMsg[0].innerText = 'Must be a valid date'
        submitButton.disabled = true
      // Normal Year
      } else if (yearNum !== 0 && ((yearNum % 4 !== 0) || (yearNum % 4 === 0 && yearNum % 100 === 0 && yearNum % 400 !== 0)) && dayNum > 28) {
        inputBoxes[0].classList.add('error-box')
        inputLabels[0].classList.add('error-color')
        requiredMsg[0].classList.remove('hideMsg')
        requiredMsg[0].classList.add('error-color')
        requiredMsg[0].innerText = 'Must be a valid date'
        submitButton.disabled = true
      // Generic Feb rule
      } else if (dayNum > 29) {
        inputBoxes[0].classList.add('error-box')
        inputLabels[0].classList.add('error-color')
        requiredMsg[0].classList.remove('hideMsg')
        requiredMsg[0].classList.add('error-color')
        requiredMsg[0].innerText = 'Must be a valid date'
        submitButton.disabled = true
      } else {
        for (e of inputBoxes) {
          e.classList.remove('error-box')
        } 
        for (e of inputLabels) {
          e.classList.remove('error-color')
        }
        for (e of requiredMsg) {
          e.classList.add('hideMsg')
          e.classList.remove('error-color')
          e.innerText = ''
        }
        submitButton.disabled = false
      }
      ...
}
```

#### Leap Days
I had created another function for a different method I was trying. 

The idea with this function is that it would look for the nearest Leap Year and then can return how many extra Leap Days have occurred in the time between today's date and the given date by the user. It's complex as I needed to account for the fact that if the user's date is in January of a Leap Year, then this will cross a Leap Day and this needs to be added in. I also needed to account for if the present date is in a Leap Year and if that too has crossed a Leap Day. If so this also needs to be included.  

**I ended up not needing to use this piece of code.**

```js
const thisYear = new Date(dateNow).getFullYear()
const thisMonth = new Date(dateNow).getMonth() + 1
const todayDate = new Date(dateNow).getDate()

function getLeapDays(thisYear) {
    const pastYr = thisYear - 1
    const pastYrTwo = thisYear - 2
    // present year
    if ((thisYear % 4 === 0 && thisYear % 100 !== 0) || (thisYear % 4 === 0 && thisYear % 100 === 0 && thisYear % 400 === 0)) {
      if (thisMonth > 2 && (Number(inputMonth) === 1 || Number(inputMonth) === 2 && inputDay <= 29)) {
        return Math.floor((thisYear - Number(inputYear)) / 4) + 2
      } else if ((thisMonth > 2 && Number(inputMonth) > 2) || ((thisMonth === 1 || thisMonth === 2 && todayDate < 29) && (Number(inputMonth) === 1 || Number(inputMonth) === 2 && inputDay <= 29))) {
        return Math.floor((thisYear - Number(inputYear)) / 4) + 1
      } else if ((thisMonth === 1 || thisMonth === 2 && todayDate < 29) && Number(inputMonth) > 2) {
        return Math.floor((thisYear - Number(inputYear)) / 4)
      }
    // last year
    } else if ((pastYr % 4 === 0 && pastYr % 100 !== 0) || (pastYr % 4 === 0 && pastYr % 100 === 0 && pastYr % 400 === 0)) {
      if (Number(inputMonth) === 1 || Number(inputMonth) === 2 && inputDay <= 29) {
        return Math.floor(((thisYear - 1) - Number(inputYear)) / 4) + 1
      } else {
        return Math.floor(((thisYear - 1) - Number(inputYear)) / 4)
      }
    // two years ago
    } else if ((pastYrTwo % 4 === 0 && pastYrTwo % 100 !== 0) || (pastYrTwo % 4 === 0 && pastYrTwo % 100 === 0 && pastYrTwo % 400 === 0)) {
      if (Number(inputMonth) === 1 || Number(inputMonth) === 2 && inputDay <= 29) {
        return Math.floor(((thisYear - 2) - Number(inputYear)) / 4) + 1
      } else {
        return Math.floor(((thisYear - 2) - Number(inputYear)) / 4)
      }
    // will be a Leap Year if not found already
    } else {
      if (Number(inputMonth) === 1 || Number(inputMonth) === 2 && inputDay <= 29) {
        return Math.floor(((thisYear - 3) - Number(inputYear)) / 4) + 1
      } else {
        return Math.floor(((thisYear - 3) - Number(inputYear)) / 4)
      }
    }
  }
  getLeapDays(thisYear)
```


## Future Improvements

As I spent time on the code to work out if a year was indeed a leap year or not, I could incorporate a second tab to tell the user if a chosen year is a leap year, or how many leap years occurred between 2 dates and how many extra days that produced. 


## Useful Resources

- [30 seconds of code](https://www.30secondsofcode.org/js/s/days-in-month/) - This helped me to work out how many days are in a month. Using the array index numbers it will return the amount of days in the previous month. 

```js
const daysInMonth = (year, month) => new Date(year, month, 0).getDate()
```

- [w3resource](https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-6.php#:~:text=%2F%2F%20Define%20a%20function%20named,(leapyear(2016))%3B%20console.) - The diagram on this page helped me get the theory as to how to work out if a year was a leap year or not. 


## Author

- Website - [Adam Rafferty](https://www.adamraffertywebdesign.com/)
- Frontend Mentor - [@adraf](https://www.frontendmentor.io/profile/adraf)