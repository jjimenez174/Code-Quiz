//Define Questions 
var questions = [
{
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
        {text: "<javascript>", correct: false},
        {text: "<js>", correct: false},
        {text: "<script>", correct: true},
        {text: "if<scripting>", correct: false},
    ]
},
{
    question: "What is the correct JavaScript syntax to write 'Hello World'?",
    answers: [
        {text: "response.write('Hello World')", correct: false},
        {text: "'Hello World'", correct: false},
        {text: "document.write('Hello World')", correct: true},
        {text: "('Hello World')", correct: false},
    ]
},
{
    question: "How do you write a conditional statement for executing some statements only if 'i' is equal to 5?",
    answers: [
        {text: "if i==5 then", correct: false},
        {text: "if (i==5)", correct: true},
        {text: "if i=5 then", correct: false},
        {text: "if i=5", correct: false},
    ]
},
{
    question: "How can you add a comment in a JavaScript?",
    answers: [
        {text: "//This is a comment", correct: true},
        {text: "'This is a comment", correct: false},
        {text: "<!--This is comment-->", correct: false},
        {text: "This is a comment", correct: false},
    ]
},
{
    question: "In JavaScript, the following loop will execute ____ times. for (x=1; x<11, x++)",
    answers: [
        {text: "9", correct: false},
        {text: "10", correct: true},
        {text: "11", correct: false},
        {text: "connot tell from this portion of the script", correct: false},
    ]
},
{
    question: "In JavaScript, which of the following is a logical operator?",
    answers: [
        {text: "&&", correct: true},
        {text: "|", correct: false},
        {text: "%", correct: false},
        {text: "/", correct: false},
    ]
},
{
    question: "A named element in a JavaScript program that is used to store and retrieve data is a ____",
    answers: [
        {text: "method", correct: false},
        {text: "assignment operator", correct: false},
        {text: "variable", correct: true},
        {text: "string", correct: false},
    ]
},
{
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
        {text: "body{color:black}", correct: true},
        {text: "{body;color:black}", correct: false},
        {text: "body:color=black", correct: false},
        {text: "{body:color=(black}", correct: false},
    ]
},
]

//Define variable by section
var scores = JSON.parse(localStorage.getItem("scores")) || [];
var secondLeft = 75;
var timerID;

var scoreCheck = document.getElementById("score-check");
var timerEl = document.getElementById("timer");

var startEl = document.getElementById("start");
var startBtn = document.getElementById("start-button");

var questionQuiz = document.getElementById("question-quiz");
var questionEl = document.getElementById("question");
var multipleChoice = document.getElementById("multiple-choice");

var checkAnswer = document.getElementById("check-answer");
var nextBtn = document.getElementById("next-button");


var submitBtn = document.getElementById("submit-button");

var clearBtn = document.getElementById("clear-button");
var backBtn = document.getElementById("back-button");

var scoreResult = document.getElementById("score-result");
var userScore = document.getElementById("user-score");
var initialsField = document.getElementById("initials-field");

var randomQuestions, currentQuestionIndex;



// Countdown Timer
function quizTimer() {
    secondLeft--;
    timerEl.textContent = "Time: " + secondLeft;
    if (secondLeft <= 0) {
        saveScore();
    }
}

// Start & Next Button
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
     currentQuestionIndex++
     nextQuestion()
});

// Start Quiz
function startQuiz() {
    timerID = setInterval(quizTimer, 1000);
     startEl.classList.add("hide");
    randomQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionQuiz.classList.remove("hide");

    //startEl.style.display = "none";

// Timer starts when start button is clicked
    quizTimer();
    nextQuestion();
};

//Next Question
function nextQuestion() {
    resetCondition();
    showQuestion(randomQuestions[currentQuestionIndex]);
};

//Display Questions
function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        multipleChoice.appendChild(button)
    })
};

//Reset Condition
function resetCondition() {
//clearStatusClass(document.body)
    nextBtn.classList.add("hide")
    checkAnswer.classList.add("hide")
   while (multipleChoice.firstChild) {
       multipleChoice.removeChild
           (multipleChoice.firstChild)
 }
};

//Select Answer 
function selectAnswer(e) {
    var choiceBtn = e.target;
    var correct = choiceBtn.dataset.correct;
    checkAnswer.classList.remove("hide")
//Text appear if the answer is correct or not
    if (correct) {
    checkAnswer.innerHTML = "CORRECT";
    } else {
    checkAnswer.innerHTML = "INCORRECT";
        if (secondLeft <= 10) {
            secondLeft = 0;
        } else {
//If the aswer is wrong, deduct time by 10
            secondLeft -= 10;
        }
    }

    Array.from(multipleChoice.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    });

    setTimeout(function(){
        checkAnswer.setAttribute('class', 'hide');
    if (randomQuestions.length > currentQuestionIndex + 1) {
        nextBtn.classList.remove("hide")
        currentQuestionIndex++
        checkAnswer.classList.remove("hide")
        nextQuestion();
    } else {
        startBtn.classList.remove("hide")
        saveScore();
    }
}, 500);
};

//Show correct answer 
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
};

// Remove all the classes
function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
};
   
// Save Score
function saveScore() {
    clearInterval(timerID);
    timerEl.textContent = "Time: " + secondLeft;
    setTimeout(function () {
//localStorage.setItem("scores", JSON.stringify(scores));
    questionQuiz.classList.add("hide");
    document.getElementById("score-result").classList.remove("hide");
    document.getElementById("user-score").textContent = secondLeft;
    }, 800)
};

var loadScores = function () {
    if (!saveScore) {
        return false;
    }
    saveScore = JSON.parse(saveScore);
    var initials = document.querySelector("#initials-field").value;
    var newScore = {
        score: secondLeft,
        initials: initials
    }
    saveScore.push(newScore);
    console.log(saveScore)

    saveScore.forEach(score => {
        initialsField.innerText = score.initials
        userScore.innerText = score.score
    })
};

//Show highscores
function showHighScores(initials) {
    document.getElementById("highscores").classList.remove("hide")
    document.getElementById("score-result").classList.add("hide");
    startEl.classList.add("hide");
    questionQuiz.classList.add("hide");
    if (typeof initials == "string") {
        var score = {
            initials, secondLeft
        }
        scores.push(score)
    }
    var highScoreEl = document.getElementById("highscore");
    highScoreEl.innerHTML = "";
    //console.log(scores)
    for (i = 0; i < scores.length; i++) {
        var div1 = document.createElement("div");
        div1.setAttribute("class", "name-div");
        div1.innerText = scores[i].initials;
        var div2 = document.createElement("div");
        div2.setAttribute("class", "score-div");
        div2.innerText = scores[i].secondLeft;

        highScoreEl.appendChild(div1);
        highScoreEl.appendChild(div2);
    }

    localStorage.setItem("scores", JSON.stringify(scores));

};

//View Highscores
scoreCheck.addEventListener("click", showHighScores);

submitBtn.addEventListener("click", function (event) {
    event.preventDefault()
    var initials = document.querySelector("#initials-field").value;
    showHighScores(initials);
});

//Back to main page
backBtn.addEventListener("click", function () {
    window.location.reload();
});

//Clear Leaderboard 
clearBtn.addEventListener("click", function () {
    localStorage.clear();
    document.getElementById("highscore").innerHTML = "";
});