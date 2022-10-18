const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Question 1",
    answers: [
      { text: "Answer 1", correct: true },
      { text: "Answer 2", correct: false },
      { text: "Answer 3", correct: false },
      { text: "Answer 4", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Question 2",
    answers: [
      { text: "Answer 1", correct: true },
      { text: "Answer 2", correct: false },
      { text: "Answer 3", correct: false },
      { text: "Answer 4", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Question 3",
    answers: [
      { text: "Answer 1", correct: true },
      { text: "Answer 2", correct: false },
      { text: "Answer 3", correct: false },
      { text: "Answer 4", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Question 4",
    answers: [
      { text: "Answer 1", correct: true },
      { text: "Answer 2", correct: false },
      { text: "Answer 3", correct: false },
      { text: "Answer 4", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Question 5",
    answers: [
      { text: "Answer 1", correct: true },
      { text: "Answer 2", correct: false },
      { text: "Answer 3", correct: false },
      { text: "Answer 4", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Question 6",
    answers: [
      { text: "Answer 1", correct: true },
      { text: "Answer 2", correct: false },
      { text: "Answer 3", correct: false },
      { text: "Answer 4", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Question 7",
    answers: [
      { text: "Answer 1", correct: true },
      { text: "Answer 2", correct: false },
      { text: "Answer 3", correct: false },
      { text: "Answer 4", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Question 8",
    answers: [
      { text: "Answer 1", correct: true },
      { text: "Answer 2", correct: false },
      { text: "Answer 3", correct: false },
      { text: "Answer 4", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Question 9",
    answers: [
      { text: "Answer 1", correct: true },
      { text: "Answer 2", correct: false },
      { text: "Answer 3", correct: false },
      { text: "Answer 4", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Question 10",
    answers: [
      { text: "Answer 1", correct: true },
      { text: "Answer 2", correct: false },
      { text: "Answer 3", correct: false },
      { text: "Answer 4", correct: false },
    ],
  },
];

const startButton = document.getElementById("start");
const nextButton = document.getElementById("next");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer");
const scoreBoard = document.getElementById("scoreboard");
let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
  restartTimer();
  startTimer();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  startTimer();
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("button");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}
function resetState() {
  nextButton.classList.add("hide");
  clearStatusClass(document.body);
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}
function selectAnswer(e) {
  let selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  {
    if ((selectedButton = correct)) {
      scoreBoard.value++;
    }
  }
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
    let score = scoreBoard.value;
    alert("Congratulations. Your score is " + score);
    scoreBoard.value = 0;
  }
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

let TIME_LIMIT = 5;
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
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
    let score = scoreBoard.value;
    alert("Congratulations. Your score is " + score);
    scoreBoard.value = 0;
  }
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML =
      formatTime(timeLeft);
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function restartTimer() {
  TIME_LIMIT = 5;
  timePassed = 0;
  timeLeft = TIME_LIMIT;
  timerInterval = null;
  onTimesUp();
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
