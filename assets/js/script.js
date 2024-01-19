// ---------------------------------
// functionality:

// main page has view highscores and start quizz button
// when start quizz clicked then dispaly question with possible answers
//     each answer has button
//     event timer start if start button clicked
//     event first question appears if start button clicked
//     event next question appears if answer button clicked after 1 sec
//     event text displays if correct
//     event text displays if wrong
//         event if wrong answer will take off time of timer
//     event if all questions answered or timer runs out displays score
//     event displays enter inital box
//         if enter initials button clicked
//             submit data (maybe make 4 char max)
//             event if enter initials clicked displays our score in leaderboard
//     if leaderboard clicked sorts  by highest first
//         go back button takes you to mainpage
//         clear high scores button deletes scored data and resets

// hints: check js linked to html

//queryselectors for all//
let scoreEl = document.querySelector(".scores");
let timerEl = document.querySelector(".timer");
let startScreenEl = document.querySelector("#start-screen");
let startButtonEl = document.querySelector("#start");
let questionsEl = document.querySelector("#questions");
let questionTitleEl = document.querySelector("#question-title");
let questionChoicesEl = document.querySelector("#choices");
let timerLeftEl = document.querySelector("#time");
let endScreenEl = document.querySelector("#end-screen");
let finalScoreEl = document.querySelector("#final-score");
let enterInitialsEl = document.querySelector("#initials");
let submitInitialsButtonEl = document.querySelector("#submit");
let feedbackEl = document.querySelector("#feedback");

//define initial variables that change through game
let timeLeft = 60; // defines time left
let answers = []; // defines answers array
let currentQuestionIndex = 0; // defines current question index
let wrongAnswerChoice1; // defines wrong answer choice for later definition
let wrongAnswerChoice2; // defines wrong answer choice for later definition
let wrongAnswerChoice3; // defines wrong answer choice for later definition
let wrongAnswerChoice4; // defines wrong answer choice for later definition
let correctAnswerChoice; // defines correct answer choice for later definition
let timerInterval; // defines timerinterval for later definition

//convenience variables
numberOfQuestions = questions.length; // defines number of questions

//get items from local storage //remeber to set also// remember to stringify// remeber to parse
let score = localStorage.getItem("score")
let initials = localStorage.getItem("initials")

//functions i think i'll need

//-----------game progression-----------//
function startGame() { //starts game
    startScreenEl.classList.add("hide"); // hides start screen
    questionsEl.classList.remove("hide"); // shows questions
    timerLeftEl.textContent = timeLeft; // displays time left
    startTimer(); // starts timer
    displayNextQuestion(); // displays next question
};

function displayNextQuestion(){
    //display question starting 0 adding 1 each time to display next question
    console.log(currentQuestionIndex); //checks question index
    if (currentQuestionIndex >= questions.length) { // if current question index is greater than questions length
        endGame(); // end game
    }
    let currentQuestion = questions[currentQuestionIndex]; // defines current question
    questionTitleEl.textContent = currentQuestion.title; // displays current question
    let questionChoicesDisplay1 = document.createElement("button"); // creates button
    let questionChoicesDisplay2 = document.createElement("button"); // creates button
    let questionChoicesDisplay3 = document.createElement("button"); // creates button
    let questionChoicesDisplay4 = document.createElement("button"); // creates button
    questionChoicesEl.innerHTML = ''; // clears question choices
    questionChoicesEl.append(questionChoicesDisplay1, questionChoicesDisplay2, questionChoicesDisplay3, questionChoicesDisplay4); // appends buttons
    questionChoicesDisplay1.textContent = currentQuestion.choices[0]; // displays buttons
    questionChoicesDisplay2.textContent = currentQuestion.choices[1]; // displays buttons
    questionChoicesDisplay3.textContent = currentQuestion.choices[2]; // displays buttons
    questionChoicesDisplay4.textContent = currentQuestion.choices[3]; // displays buttons
    let correctAnswer = currentQuestion.answer; // defines correct answer
    if (questionChoicesDisplay1.textContent === correctAnswer) {
        correctAnswerChoice = questionChoicesDisplay1; // defines correct answer choice
    } else if (questionChoicesDisplay2.textContent === correctAnswer) {
        correctAnswerChoice = questionChoicesDisplay2; // defines correct answer choice
    } else if (questionChoicesDisplay3.textContent === correctAnswer) {
        correctAnswerChoice = questionChoicesDisplay3; // defines correct answer choice
    } else {
        correctAnswerChoice = questionChoicesDisplay4; // defines correct answer choice
    }
    let wrongAnswerChoice1 = questionChoicesDisplay1; // defines wrong answer choice default
    let wrongAnswerChoice2 = questionChoicesDisplay2; // defines wrong answer choice default
    let wrongAnswerChoice3 = questionChoicesDisplay3; // defines wrong answer choice default
    let wrongAnswerChoice4 = questionChoicesDisplay4; // defines wrong answer choice default
    if (questionChoicesDisplay1.textContent === currentQuestion.answer) {
    wrongAnswerChoice1 = null; //then sets to null if wrong
    } else if (questionChoicesDisplay2.textContent === currentQuestion.answer) {
    wrongAnswerChoice2 = null; //then sets to null if wrong
    } else if (questionChoicesDisplay3.textContent === currentQuestion.answer) {
    wrongAnswerChoice3 = null; //then sets to null if wrong
    } else {
    wrongAnswerChoice4 = null; //then sets to null if wrong
    }
    if (wrongAnswerChoice1 !== null) { // if wrong answer choice is not null
    wrongAnswerChoice1.addEventListener("click", function(){ // add event listener 
        timerPenalty(); // call timer penalty
        currentQuestionIndex++; // add 1 to current question index
        displayNextQuestion(); // call display next question
        });
    }
if (wrongAnswerChoice2 !== null) { //see above
    wrongAnswerChoice2.addEventListener("click", function(){ //see above
        timerPenalty(); //see above
        currentQuestionIndex++; //see above
        displayNextQuestion(); //see above
        });
    }
if (wrongAnswerChoice3 !== null) { //see above
    wrongAnswerChoice3.addEventListener("click", function(){ //see above
        timerPenalty(); //see above
        currentQuestionIndex++; //see above
        displayNextQuestion(); //see above
        });
    }
if (wrongAnswerChoice4 !== null) { //see above
    wrongAnswerChoice4.addEventListener("click", function(){ //see above
        timerPenalty(); //see above
        currentQuestionIndex++; //see above
        displayNextQuestion(); //see above
        });
    }
    correctAnswerChoice.addEventListener("click", function(){ // add event listener
        addToScore(); // call add to score
        currentQuestionIndex++; // add 1 to current question index
        displayNextQuestion(); // call display next question
        });
    };
//---------------------------------------------------------------//

function endGame(){
    //if time is 0 or no questions left in array game over
    saveScore(); //calling save score
    endTimer(); //calling end timer
    displayScore(); //calling display score
    //takes you to highscores (hides and removes html elements)
};
//-----------timer progression-----------//
function startTimer(){ //starts timer
    timerLeftEl.textContent = timeLeft; //displays time left
    timerInterval = setInterval(function() { //sets timer
            timeLeft--; //decrements time left
            timerLeftEl.textContent = timeLeft; //displays time left updated
        if (timeLeft <= 0) { //if time left is 0
            clearInterval(timerInterval); //clears timer
            endTimer(); //calls end timer
        }
    }, 1000); // 1 second
};
    //starts at 60
    //takes away a second each second interval
    //updates text every second
    //stops at 0
function timerPenalty(){
    //takes away 5 seconds if wrong answer clicked
    timeLeft -= 5; //decrements time left
    if (timeLeft < 0) { //if time left is less than 0
        timeLeft = 0; //sets time left to 0
    }
    timerLeftEl.textContent = timeLeft; //displays time left
    if (timeLeft <= 0) { //if time left is less than 0
        clearInterval(timerInterval); //clears timer
        endTimer(); //calls end timer
    }
        }
function endTimer(){ //ends timer
    //make stime left 0
    //sets text
    timeLeft = 0; //sets time left to 0
    timerLeftEl.textContent = timeLeft; //displays time left
    if (timeLeft === 0) { //if time left is 0
        clearInterval(timerInterval); //clears timer
        return; //returns exits function
    }
};
//-----------score progression-----------//
function addToScore(){ //adds to score
    //if right answer clicked add 30 to score
    score += 30; //adds 30
    localStorage.setItem("score", score); //updates local storage
};
function saveScore(){ //saves score
    //updates local storge to current score
    scoreTotal = parseInt(localStorage.getItem("score")); //sets score total
    console.log(scoreTotal); //logs score total
    
};
function displayScore(){ //displays score
    questionsEl.classList.add("hide"); //hides questions
    endScreenEl.classList.remove("hide"); //shows end screen
    finalScoreEl.textContent = scoreTotal; //displays score
    //displays score on screen in text section
};
//-----------initials progression-----------//
let highscores = []; //create empty array
function saveInitials() { //save initials
highscores = JSON.parse(localStorage.getItem('highscores')) || []; //sets highscores with parse
let initials = enterInitialsEl.value; //sets initials to value
localStorage.setItem('initials', initials); //sets initials to lacal
let userScoreAndInitials = { //creates object
    initials: initials, //sets initials
    score: scoreTotal //sets score
};
if (!Array.isArray(highscores)) { //if array is not an array
    highscores = []; //create empty array
}
highscores.push(userScoreAndInitials); //pushes object to array
localStorage.setItem('highscores', JSON.stringify(highscores)); //sets highscores with new data included
let updatedHighscores = JSON.parse(localStorage.getItem('highscores')); //sets updated highscores with added pev
console.log(updatedHighscores); //logs updated highscores to check working
};
//add event listener for submit button to save initials and save score
//-----------game reset-----------//
function resetGame(){ //resets game
score = 0; //sets score to 0
localStorage.setItem("score", 0);
initials = ""; //sets initials to empty
currentQuestionIndex = 0; //sets current question index to 0
answers = []; //sets answers to empty
timeLeft = 60; //sets time left to 60
};
startButtonEl.addEventListener("click", function(event) {
resetGame();
startGame();
});
submitInitialsButtonEl.addEventListener("click", function(event) {
saveInitials();
});