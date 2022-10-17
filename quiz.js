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

fetch("https://opentdb.com/api.php?amount=10&category=12&difficulty=easy")
  .then((response) => {
    console.log(response);
    return response.blob();
  })
  .then((blob) => {
    console.log(blob);
    let arrayBuffer;
    let fileReader = new FileReader();
    fileReader.onload = function (event) {
      arrayBuffer = event.target.result;
    };
    fileReader.readAsArrayBuffer(blob);
  });

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
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
