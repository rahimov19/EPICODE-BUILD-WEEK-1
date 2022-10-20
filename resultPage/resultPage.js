let score = 0;
let maxScore = 10;
let currentScore = 8;
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
  changeProgresBar();
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

const changeProgresBar = function () {
  let circleElement = document.getElementById("top-circle");
  newRatio = 691 + (691 * percentageOfCorrect) / 100;
  circleElement.style.strokeDashoffset = newRatio;
};
changeProgresBar();
