# Frontend Mentor - Age calculator app solution

This is a solution to the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

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

### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it. 

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- JavaScript

### What I learned

I added a `setAttribute` to the year field so that users couldn't pick a future year. I then added an `addEventListener` to listen for a change in the year input field. If the entered year was equal to this present year then it will set the attribute's on the month and day so that they can't go beyond today's date.

```js
// const yearInput = document.getElementById('year')
// const monthInput = document.getElementById('month')
// const dayInput = document.getElementById('day')
// const dateNow = Date.now()
// const thisYear = new Date(dateNow).getFullYear()
// const thisMonth = new Date(dateNow).getMonth()
// const todayDate = new Date(dateNow).getDate()
// // stops future dates being input
// yearInput.setAttribute('max', thisYear)

// yearInput.addEventListener('change', () => {
//   if (Number(yearInput.value) === thisYear) {
//     monthInput.setAttribute('max', thisMonth + 1)
//     dayInput.setAttribute('max', todayDate)
//   } else {
//     monthInput.setAttribute('max', 12)
//     dayInput.setAttribute('max', 31)
//   }
// })
```
#### Leap Day Function
The idea with this function is that it will look for the nearest Leap Year and then can return how many extra Leap Days have occurred in the time between today's date and the given date by the user. It's complex as I needed to account for the fact that if the user's date is in January of a Leap Year, then this will cross a Leap Day and this needs to be added in. I also needed to account for if the present date is in a Leap Year and if that too has crossed a Leap Day. If so this also needs to be included. 

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

### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [30 seconds of code](https://www.30secondsofcode.org/js/s/days-in-month/) - This helped me to work out how many days are in a month. Using the array index numbers it will return the amount of days in the previous month. 

```js
const daysInMonth = (year, month) => new Date(year, month, 0).getDate()
```


## Author

- Website - [Adam Rafferty](https://www.adamraffertywebdesign.com/)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
