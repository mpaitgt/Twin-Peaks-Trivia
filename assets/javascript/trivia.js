// cached DOM
let container = document.getElementById('site-container');
let startBtn = document.getElementById('start-btn');
let contentBox = document.getElementById('content');
let questionBox = document.getElementById('question-box');
let questionText = document.getElementById('question');
let answerSelect = document.getElementsByClassName('option');
let submitBtn = document.getElementById('submit-btn');
let aSpan = document.getElementById('a');
let bSpan = document.getElementById('b');
let cSpan = document.getElementById('c');
let dSpan = document.getElementById('d');
var secondsSpan = document.getElementById('seconds');

// global variables
var randomIndex;
var randomQuestion;
var userGuess;
var counter = 10;
var userScore = 0;
var questionsIn = 0;
var seconds = 15;
var timer;
var submitButtonCheck = false;
var myQuestions = [                 // question object
    {
        question: 'Who is Dale Cooper?',    //q1
        answers: {
            a: 'An owl',
            b: 'A waiter at the RR Diner',
            c: 'An FBI agent',
            d: 'No one'
        },
        correctAnswer: 'c'
    },
    {
        question: 'Who killed Laura Palmer?',       //q2
        answers: {
            a: 'Bobby',
            b: 'Leeland Palmer',
            c: 'Dale Cooper himself',
            d: 'Laura Palmer is alive'
        },
        correctAnswer: 'b'
    },
    {
        question: 'Where are we?',      //q3
        answers: {
            a: 'Twin Peaks',
            b: 'Scranton',
            c: 'The island',
            d: 'Pawnee'
        },
        correctAnswer: 'a'
    },
    {
        question: 'What year is it?',       //q4
        answers: {
            a: '2017',
            b: '1991',
            c: '2019',
            d: '1807'
        },
        correctAnswer: 'c'
    },
    {
        question: 'Who owned the Great Northern Hotel?',        //q5
        answers: {
            a: 'James',
            b: 'Dale Cooper', 
            c: 'Shelley',
            d: 'Benjamin Horne'
        },
        correctAnswer: 'd'
    },
    {
        question: 'What was Nadine known for wearing?',     //q6
        answers: {
            a: 'An eye patch',
            b: 'Clogs',
            c: 'A turtleneck',
            d: 'A Nirvana hat'
        },
        correctAnswer: 'a'
    },
    {
        question: 'Where is the red room?',     //q7
        answers: {
            a: 'The Great Northern Hotel',
            b: 'The White Lodge',
            c: 'The Black Lodge',
            d: 'RR Diner'
        },
        correctAnswer: 'c'
    },
    {
        question: 'What does the log lady hold?',       //q8
        answers: {
            a: 'A baby',
            b: 'A log',
            c: 'A bag of flour',
            d: 'Her adult son'
        },
        correctAnswer: 'b'
    },
    {
        question: 'Where is One-Eyed Jack\'s located?',     //q9
        answers: {
            a: 'Across the border in Canada',
            b: 'Laura Palmer\'s basement',
            c: 'Downtown Twin Peaks',
            d: 'In Oregon'
        },
        correctAnswer: 'a',
    },
    {
        question: 'What is The Man From Another Place missing?',        //q10
        answers: {
            a: 'An eye',
            b: 'A leg',
            c: 'A finger',
            d: 'An arm'
        },
        correctAnswer: 'd'
    }
];

window.onload = function() {

    startBtn.addEventListener('click', function() {     // event listener for the start button to begin the game
        console.log(counter);
        container.classList.add('cycle');
        randomQuestionGenerator();
        startBtn.style.display = 'none';
        questionBox.style.display = 'block';
        totalQuestions();
        timer = setInterval(count, 1000);
    });

    Array.from(answerSelect).forEach(function(element) {    // event listener for the available options and to store the user's guess
        element.addEventListener('click', function() {  
            submitBtn.style.display = 'block';
            submitBtn.innerHTML = element.innerText + '<p id="confirm">Final Answer?</p>';
            userGuess = element.attributes[0].value;
        }); 
    });

    submitBtn.addEventListener('click', function() {    // user submits their answer
        
        if (submitButtonCheck === false) {
            submitFunction(userGuess);
            myQuestions.splice(randomIndex, 1);
            submitButtonCheck = true;
            clearInterval(timer);
            secondsSpan.style.display = 'none';
            console.log(counter);

        } else if (submitButtonCheck === true) {
            timer = setInterval(count, 1000);
            nextQuestionFunction();
            submitButtonCheck = false;
            secondsSpan.style.display = 'block';
        }
    });

}


function randomQuestionGenerator() {        // randomly generates a question with the possible answers
    randomIndex = Math.floor(Math.random() * myQuestions.length);
    randomQuestion = myQuestions[randomIndex];

    questionText.innerHTML = randomQuestion.question;
    aSpan.textContent = randomQuestion.answers.a;
    bSpan.textContent = randomQuestion.answers.b;
    cSpan.textContent = randomQuestion.answers.c;
    dSpan.textContent = randomQuestion.answers.d; 
};
   
function submitFunction(guess) {     // function used when the button is submitting 
    var resultElem = document.createElement('h1');
    var correctText = document.createTextNode('correct');
    var wrongText = document.createTextNode('wrong');

    questionBox.style.display = 'none';
    submitBtn.innerText = 'Next question?';
    resultElem.id = 'results';
    contentBox.appendChild(resultElem);
    counter--;

    if (guess === randomQuestion.correctAnswer) {   // if answer is correct
        resultElem.appendChild(correctText);
        userScore++;
    } else {   
        resultElem.appendChild(wrongText);
    }

    if (counter === 0) {                            // if answer is incorrect
        submitBtn.innerText = 'See results...';
    }
}

function nextQuestionFunction() {   // function used when the button is moving onto the next question
    if (counter > 0) {
        seconds = 16;
        randomQuestionGenerator();
        totalQuestions();
        questionBox.style.display = 'block';
        submitBtn.style.display = 'none';
        var removeResults = document.getElementById('results');
        removeResults.parentNode.removeChild(removeResults);
       
    } else if (counter === 0) {
        document.getElementById('results').style.display = 'none';
        scoreKeeping(userScore);
        clearInterval(timer);
    }
}

function count() {        // 15 second timer for the each question
    seconds--;
    secondsSpan.innerText = seconds;
    
    if (seconds === 0 && counter === 1) {
        questionBox.style.display = 'none';
        submitBtn.style.display = 'none';
        secondsSpan.style.display = 'none';
        scoreKeeping(userScore);

    } else if (seconds === 0) {
        seconds = 16;
        counter--;
        myQuestions.splice(randomIndex, 1);
        nextQuestionFunction();
    }
}

function scoreKeeping(x) {      // updates the score of the game
    var grade = x / 10;
    var percentage = (grade.toFixed(2) * 100) + '%';
    var finalElem = document.createElement('h1');
    finalElem.id = 'results';
    var finalText = document.createTextNode('you scored ' + percentage);
    finalElem.appendChild(finalText);
    contentBox.appendChild(finalElem);
    submitBtn.style.display = 'none';
    clearInterval(timer);
}

function totalQuestions() {     // updates the question number at the bottom of page
    questionsIn++;
    document.getElementById('questions-in').innerHTML = questionsIn;
}

  
function resetGame() {
        // global variables
    randomIndex;
    randomQuestion;
    userGuess;
    counter = 10;
    userScore = 0;
    questionsIn = 0;
    seconds = 15;
    timer;
    submitButtonCheck = false;
    myQuestions = [                 // question object
        {
            question: 'Who is Dale Cooper?',    //q1
            answers: {
                a: 'An owl',
                b: 'A waiter at the RR Diner',
                c: 'An FBI agent',
                d: 'No one'
            },
            correctAnswer: 'c'
        },
        {
            question: 'Who killed Laura Palmer?',       //q2
            answers: {
                a: 'Bobby',
                b: 'Leeland Palmer',
                c: 'Dale Cooper himself',
                d: 'Laura Palmer is alive'
            },
            correctAnswer: 'b'
        },
        {
            question: 'Where are we?',      //q3
            answers: {
                a: 'Twin Peaks',
                b: 'Scranton',
                c: 'The island',
                d: 'Pawnee'
            },
            correctAnswer: 'a'
        },
        {
            question: 'What year is it?',       //q4
            answers: {
                a: '2017',
                b: '1991',
                c: '2019',
                d: '1807'
            },
            correctAnswer: 'c'
        },
        {
            question: 'Who owned the Great Northern Hotel?',        //q5
            answers: {
                a: 'James',
                b: 'Dale Cooper', 
                c: 'Shelley',
                d: 'Benjamin Horne'
            },
            correctAnswer: 'd'
        },
        {
            question: 'What was Nadine known for wearing?',     //q6
            answers: {
                a: 'An eye patch',
                b: 'Clogs',
                c: 'A turtleneck',
                d: 'A Nirvana hat'
            },
            correctAnswer: 'a'
        },
        {
            question: 'Where is the red room?',     //q7
            answers: {
                a: 'The Great Northern Hotel',
                b: 'The White Lodge',
                c: 'The Black Lodge',
                d: 'RR Diner'
            },
            correctAnswer: 'c'
        },
        {
            question: 'What does the log lady hold?',       //q8
            answers: {
                a: 'A baby',
                b: 'A log',
                c: 'A bag of flour',
                d: 'Her adult son'
            },
            correctAnswer: 'b'
        },
        {
            question: 'Where is One-Eyed Jack\'s located?',     //q9
            answers: {
                a: 'Across the border in Canada',
                b: 'Laura Palmer\'s basement',
                c: 'Downtown Twin Peaks',
                d: 'In Oregon'
            },
            correctAnswer: 'a',
        },
        {
            question: 'What is The Man From Another Place missing?',        //q10
            answers: {
                a: 'An eye',
                b: 'A leg',
                c: 'A finger',
                d: 'An arm'
            },
            correctAnswer: 'd'
        }
];
}