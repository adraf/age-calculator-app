# Frontend Mentor - Age calculator app solution

This is a solution to the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q).

## Table of contents

- [Deployment Links](#deployment-Links)
- [Timeframe](#timeframe)
- [Technologies Used](#technologies-used)
- [Brief](#brief)
- [Challenges](#challenges)
- [Wins](#wins)
- [Useful Resources](#useful-resources)
- [Author](#author)


## Deployment Links

- [Live Site URL](https://adraf.github.io/age-calculator-app/)
- [Solution URL](https://your-solution-url.com)


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


## Challenges



## Wins

### Leap Day Function
The idea with this function is that it will look for the nearest Leap Year and then can return how many extra Leap Days have occurred in the time between today's date and the given date by the user. It's complex as I needed to account for the fact that if the user's date is in January of a Leap Year, then this will cross a Leap Day and this needs to be added in. I also needed to account for if the present date is in a Leap Year and if that too has crossed a Leap Day. If so this also needs to be included. I ended up not needing to use this piece of code.

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



## Useful Resources

- [30 seconds of code](https://www.30secondsofcode.org/js/s/days-in-month/) - This helped me to work out how many days are in a month. Using the array index numbers it will return the amount of days in the previous month. 

```js
const daysInMonth = (year, month) => new Date(year, month, 0).getDate()
```


## Author

- Website - [Adam Rafferty](https://www.adamraffertywebdesign.com/)
- Frontend Mentor - [@adraf](https://www.frontendmentor.io/profile/adraf)
