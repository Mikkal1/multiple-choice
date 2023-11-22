// create an array of 5 objects for a coding quiz that has a question, choices, and answer
let questions = [
    {
        question: "Which of the following is not a reserved word in JavaScript?",
        choices: ["interface", "throws", "program", "short"],
        answer: "program"
    },
    {
        question: "What is the correct attribute for referring to an external script called 'xxx.js'?",
        choices: ["href", "name", "src", "file"],
        answer: "src"
    },
    {
        question: "What is the correct syntax for adding comments in JavaScript?",
        choices: ["<!--This is a comment-->", "//This is a comment", "This is a comment", "**This is a comment**"],
        answer: "//This is a comment"
    },
    {
        question: "Which of the following is not a valid JavaScript variable name?",
        choices: ["2names", "_first_and_last_names", "FirstAndLast", "None of the above"],
        answer: "2names"
    },
    {
        question: "Which of the following is the correct command to display 'Hello World' in an alert box using JavaScript?",
        choices: ["alertbox", "msg", "msgbox", "alert"],
        answer: "alert"
    }
];

// create an array of objects for the high scores
let highScores = [];

let timer = 0;
let currentScore = 0;
let currentQuestion = 0;
let intervalVal = 0;

const start = document.querySelector("#start");
const time = document.querySelector("#time");
const viewHighScores = document.querySelector("#view-high-scores");
const instructions = document.querySelector("#instruction");
const quiz = document.querySelector("#quiz");
const highscores = document.querySelector("#highscores");
const highscoreList = document.querySelector("#highscore-list");
const results = document.querySelector("#results");
const question = document.querySelector("#question");
const choice1 = document.querySelector("#choice1");
const choice2 = document.querySelector("#choice2");
const choice3 = document.querySelector("#choice3");
const choice4 = document.querySelector("#choice4");
const feedback = document.querySelector("#feedback");
const finalScore = document.querySelector("#final-score");
const clear = document.querySelector("#clear");
const goBack = document.querySelector("#go-back");
const submit = document.querySelector("#submit");
const initials = document.querySelector("#initials");
const myform = document.querySelector("#form");
const sections = [instructions, quiz, highscores, results, highscores];

function display(section) {
    // hide all sections
    for (let i = 0; i < sections.length; i++) {
        sections[i].style.display = 'none';
    }
    // display section
    section.style.display = 'block';
}

function init() {
    // hide all sections except #instructions
    display(instructions);
    // display timer
    time.textContent = timer;
}

function startQuiz() {
    // hide #instructions and show #quiz
    display(quiz);
    // start timer
    timer = 60;
    intervalVal = setInterval(updateTimer, 1000);
    // display first question
    displayQuestion();
}
// when start button is clicked, start quiz
start.addEventListener("click", startQuiz);

function displayQuestion() {
    // display question
    question.textContent = questions[currentQuestion].question;
    // display choices
    choice1.textContent = "1. " + questions[currentQuestion].choices[0];
    choice2.textContent = "2. " + questions[currentQuestion].choices[1];
    choice3.textContent = "3. " + questions[currentQuestion].choices[2];
    choice4.textContent = "4. " + questions[currentQuestion].choices[3];
    feedback.textContent = "";
}

function updateTimer() {
    timer--;
    // display timer
    time.textContent = timer;

    if (timer <= 0)
        showResults();
}


function showHighScores() {
    // hide #instructions and show #highscores
    display(highscores);
    // display high scores
    highscoreList.textContent = "";
    for (let i = 0; i < highScores.length; i++) {
        let li = document.createElement("li");
        li.textContent = highScores[i].initials + " - " + highScores[i].score;
        highscoreList.appendChild(li);
    }
}
// call showHighScores when view high scores link is clicked
viewHighScores.addEventListener("click", showHighScores);

function clearHighScores() {
    // clear high scores
    highscoreList.textContent = "";
    highScores = [];
}
clear.addEventListener("click", clearHighScores);

function goBackToInstructions() {
    // hide all sections except #instructions
    display(instructions);
    currentQuestion = 0;
    currentScore = 0;
    // reset timer
    timer = 0;
    // display timer
    time.textContent = timer;
}
goBack.addEventListener("click", goBackToInstructions);

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) 
        displayQuestion();
    else
        showResults();
}

// check answer
function checkAnswer(answer) {
    // check if answer is correct
    if (answer == questions[currentQuestion].answer) {
        // display correct feedback
        feedback.textContent = "Correct!";
        // add 10 points to score
        currentScore += 1;
    } else {
        // display incorrect feedback
        feedback.textContent = "Incorrect!";
        // subtract 10 seconds from timer
        timer -= 10;
        // display timer
        time.textContent = timer;
    }
    // display next question after 1 second
    setTimeout(nextQuestion, 1000);
}

// when choice is clicked, check answer
choice1.addEventListener("click", function () {
    checkAnswer(choice1.textContent.substring(3));
});
choice2.addEventListener("click", function () {
    checkAnswer(choice2.textContent.substring(3));
});
choice3.addEventListener("click", function () {
    checkAnswer(choice3.textContent.substring(3));
});
choice4.addEventListener("click", function () {
    checkAnswer(choice4.textContent.substring(3));
});


function showResults() {
    clearInterval(intervalVal);
    display(results);
    // display score
    finalScore.textContent = currentScore;
}

function saveHighScore() {
    // get initials
    let initialsEntry = initials.value;
    // create object for high score
    let highScore = {
        initials: initialsEntry,
        score: currentScore
    };
    // add high score to array
    highScores.push(highScore);
    // sort high scores in descending order
    highScores.sort(function (a, b) {
        return b.score - a.score;
    });
    // display high scores
    showHighScores();
}

// when submit button is clicked, save high score
//submit.addEventListener("click", saveHighScore);

function submitForm(e) {
    e.preventDefault();
    saveHighScore();
    myform.reset();
}
myform.addEventListener("submit", submitForm);

init();