const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "Hybrid Text Metaphoring Language", correct: false },
    ],
  },
  {
    question: "Choose the correct HTML element for the largest heading:",
    answers: [
      { text: "<span>", correct: false },
      { text: "<head>", correct: false },
      { text: "<h1>", correct: true },
      { text: "<heading>", correct: false },
    ],
  },
  {
    question:
      "Choose the correct HTML element for the choosing source of image:",
    answers: [
      { text: "<img src>", correct: true },
      { text: "<src img>", correct: false },
      { text: "<img -> src>", correct: false },
      { text: "<source>", correct: false },
    ],
  },
  {
    question: "What is the correct HTML for adding a background color?",
    answers: [
      { text: "<body style= yellow>", correct: false },
      { text: "<body style= background-color:yellow>", correct: true },
      { text: "<body bg = yellow>", correct: false },
      { text: "<background>yellow</background>", correct: false },
    ],
  },
  {
    question: "Which character is used to indicate an end tag?",
    answers: [
      { text: "/", correct: true },
      { text: "*", correct: false },
      { text: "-", correct: false },
      { text: "<", correct: false },
    ],
  },
  {
    question: "ID and Classes can have same name.",
    answers: [
      { text: "False", correct: false },
      { text: "True", correct: true },
      // { text: "Answer 3", correct: false },
      // { text: "Answer 4", correct: false },
    ],
  },
  {
    question:
      "Inline elements are normally displayed without starting a new line.",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false },
      // { text: "Answer 3", correct: false },
      // { text: "Answer 4", correct: false },
    ],
  },
  {
    question: "Which HTML element defines the title of a document?",
    answers: [
      { text: "<meta>", correct: false },
      { text: "<head>", correct: false },
      { text: "<title>", correct: true },
      { text: "<h1>", correct: false },
    ],
  },
  {
    question: "In HTML, onblur and onfocus are:",
    answers: [
      { text: "Event attributes", correct: true },
      { text: "Style attributes", correct: false },
      { text: "HTML element", correct: false },
      { text: "Button values", correct: false },
    ],
  },
  {
    question:
      "In HTML, which attribute is used to specify that an input field must be filled out?",
    answers: [
      { text: "validate", correct: false },
      { text: "required", correct: true },
      { text: "formvalidate", correct: false },
      { text: "placeholder", correct: false },
    ],
  },
  {
    question:
      "Which HTML element is used to specify a header for a document or section?",
    answers: [
      { text: "<header>", correct: true },
      { text: "<top>", correct: false },
      { text: "<section>", correct: false },
      { text: "<head>", correct: false },
    ],
  },
];

const startButton = document.getElementById("start");
const nextButton = document.getElementById("next");
const finishButton = document.getElementById("finish");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer");
const scoreBoard = document.getElementById("scoreboard");
const bottomTextElement = document.getElementById("bottomtext");
const numBtm = document.getElementById("btm2");
let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);

nextButton.addEventListener("click", () => {
  applyAnswer();
  setNextQuestion();
});
function startGame() {
  scoreBoard.value = 0;
  startButton.classList.add("hide");
  document.getElementById("app").classList.remove("hide");
  nextButton.classList.remove("hide");
  bottomTextElement.classList.remove("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  currentQuestionIndex++;
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
  startTimer();
  showQuestionNum();
}

/*-------------------*/
// function showQuestion(question) {
//   questionElement.innerText = question.question;
//   question.answers.forEach((answer) => {
//     const button = document.createElement("button");
//     button.innerText = answer.text;
//     button.classList.add("button");
//     if (answer.correct) {
//       button.dataset.correct = answer.correct;
//     }
//     button.addEventListener("click", selectAnswer);
//     answerButtonsElement.appendChild(button);
//   });
// }

let questionNum = 0;
const showQuestionNum = function () {
  questionNum++;
  numBtm.innerText = questionNum;
};

let correctAnswers = 0;
let wrongAnswers = 0;
let emptyAnswers = 0;

function showQuestion(question) {
  questionElement.innerText = question.question;

  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("button");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectedButton);
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}
function selectedButton(e) {
  let selectedButton = e.target;
  const selected = selectedButton.classList.add("selected");
  setStatusClass(document.body, selected);
  const previouslySelected = document.querySelectorAll(".selected");
  if (previouslySelected.length > 0) {
    for (i = 0; i < previouslySelected.length; i++) {
      previouslySelected[i].classList.remove("selected");
    }
  }
  selectedButton.classList.add("selected");
}

function applyAnswer() {
  // scoreBoard = document.getElementById("scoreboard");
  // selectedAnswer = document.querySelectorAll(".selected");s
  correctAnswer = document.querySelectorAll(".button.selected.correct");
  orrectAnswer = document.querySelectorAll(".correct");
  if (correctAnswer.length == 1) {
    scoreBoard.value++;
  }
}

/*------------------------------*/

function resetState() {
  // nextButton.classList.remove("hide");
  clearStatusClass(document.body);
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}
function selectAnswer(e) {
  let selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);

  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    // nextButton.classList.remove("hide");
    finishButton.classList.add("hide");
  } else {
    // finish();
    nextButton.classList.add("hide");
    finishButton.classList.remove("hide");

    questionNum = 0;
  }
}
function finish() {
  applyAnswer();
  let score = scoreBoard.value;
  alert("Congratulations. Your score is " + score);
  location.replace("/results.html");
}
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
/*--------TIMER-----------*/

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};

let TIME_LIMIT = 60;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label"> ${formatTime(
    timeLeft
  )}</span><div id="timertext"><span id="seconds">SECONDS</span>
  <span id="remaining">REMAINING</span></div>
</div>
`;

// startTimer();

function onTimesUp() {
  clearInterval(timerInterval);

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.click();
  } else {
    finish();
  }
}
function animation() {
  setInterval(() => {
    setCircleDasharray();
    setRemainingPathColor(timeLeft);
  }, 10);
}

function startTimer() {
  restartTimer();
  animation();
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML =
      formatTime(timeLeft);
    // setCircleDasharray();
    // setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function restartTimer() {
  clearInterval(timerInterval);
  TIME_LIMIT = 60;
  timePassed = null;
  timeLeft = TIME_LIMIT;
  timerInterval = null;
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  // return `${minutes}:${seconds}`;
  return `${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}
