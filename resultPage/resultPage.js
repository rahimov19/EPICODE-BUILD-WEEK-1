let score = 0;
let maxScore = 10;
let currentScore = localStorage.getItem("scoreBoard");
let correctAnswers = currentScore;
let wrongAnswers = maxScore - correctAnswers;

let percentageOfCorrect = (correctAnswers / maxScore) * 100;
let percentageOfWrong = (wrongAnswers / maxScore) * 100;

window.onload = function () {
  changePercentageOfCorrect();
  changePercentageOfWrong();
  changeNumberOfCorrect();
  changeNumberOfWrong();
  changeResultText();
  changeProgressBar();
};

const changeResultText = function () {
  let resultTextH1 = document.querySelector(".progress-bar-h1");
  let resultTextH2 = document.querySelector(".progress-bar-h2");
  let resultTextP = document.querySelector(".progress-bar-p");
  if (percentageOfCorrect < 65) {
    resultTextH1.innerHTML = "Unfortunetely,";
    resultTextH2.innerHTML = "You are failed the exam";
    resultTextH2.style.color = "#c2128d";
    resultTextP.innerHTML = "Please check your answers and try again later.";
  }
};

const changePercentageOfCorrect = function () {
  let correctPercentageElement = document.querySelector(".correct-percentage");
  correctPercentageElement.innerHTML = percentageOfCorrect + "%";
};

const changePercentageOfWrong = function () {
  let wrongPercentageElement = document.querySelector(".wrong-percentage");
  wrongPercentageElement.innerHTML = percentageOfWrong + "%";
};

const changeNumberOfCorrect = function () {
  let correctNumberElement = document.getElementById("correctNumber");
  correctNumberElement.innerText = correctAnswers;
};

const changeNumberOfWrong = function () {
  let wrongNumberElement = document.getElementById("wrongNumber");
  wrongNumberElement.innerText = wrongAnswers;
};

const changeProgressBar = function () {
  let circleElement = document.getElementById("top-circle");
  newRatio = 691 + (691 * percentageOfCorrect) / 100;
  circleElement.style.strokeDashoffset = newRatio;
};
