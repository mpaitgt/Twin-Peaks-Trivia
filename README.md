# Twin-Peaks-Trivia

## Description
This is a Twin Peaks-themed trivia game. Twin Peaks was a popular show in the 1990's created by David Lynch and Mark Frost. It was brought back by Showtime in 2017 for one extended season.


## Link to the live game
![Twin Peaks Trivia](https://mpaitgt.github.io/Twin-Peaks-Trivia/)
![](trivia2.gif)


## Technologies Used
- HTML / CSS
- @keyframes CSS animation
- Vanilla JavaScript
- Google Fonts

## Code Walkthrough
- I created an array of objects to hold the question, answer selection, and correct answer properties.

- There are three different event listeners for this game:
    1. The __Start__ listener randomly generates a question, removes/reveals content to/from the page, and begins the timer interval
    2. The __Answer Options__ listener reveals the submit button to the user
    3. The __Submit / Next Question__ listener toggles between two functions using a boolean value. One submits the answer, stops the timer, and removes the previous question from the array, and the other reveals the next question by randomly generating it from the array and displaying on the page.

- The count function is used to set 15 seconds intervals for each question. When the timer is up, the function moves onto the next question and the answer is essentially stored as incorrect.