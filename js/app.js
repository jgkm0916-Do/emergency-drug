/* 퀴즈 진행, 탭 전환, 점수 계산, 화면 제어 */

var currentScenarioIndex = 0;
var currentStepIndex = 0;
var score = 0;
var answered = false;

function startGame() {
  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("finishScreen").classList.add("hidden");
  document.getElementById("drugCards").classList.add("hidden");
  document.getElementById("studyScreen").classList.add("hidden");
  document.getElementById("gameScreen").classList.remove("hidden");

  currentScenarioIndex = 0;
  currentStepIndex = 0;
  score = 0;

  loadQuestion();
}

function loadQuestion() {
  answered = false;

  var scenario = scenarios[currentScenarioIndex];
  var step = scenario.steps[currentStepIndex];

  document.getElementById("progressText").innerText =
    "CASE " + (currentScenarioIndex + 1) + " / " + scenarios.length + " · STEP " + (currentStepIndex + 1) + " / " + scenario.steps.length;

  document.getElementById("caseTitle").innerText = scenario.title;
  document.getElementById("caseText").innerText = scenario.text;
  document.getElementById("hr").innerText = scenario.hr;
  document.getElementById("bp").innerText = scenario.bp;
  document.getElementById("spo2").innerText = scenario.spo2;
  applyEcg(scenario);

  document.getElementById("questionText").innerText = step.question;

  var optionsBox = document.getElementById("optionsBox");
  optionsBox.innerHTML = "";

  step.options.forEach(function (option) {
    var btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerText = option;
    btn.onclick = function () {
      checkAnswer(option);
    };
    optionsBox.appendChild(btn);
  });

  var resultBox = document.getElementById("resultBox");
  resultBox.style.display = "none";
  resultBox.className = "result";

  var nextBtn = document.getElementById("nextBtn");
  nextBtn.classList.add("hidden");

  if (currentStepIndex < scenario.steps.length - 1) {
    nextBtn.innerText = "다음 STEP";
  } else {
    nextBtn.innerText = "다음 CASE";
  }
}

function checkAnswer(selected) {
  if (answered) return;
  answered = true;

  var scenario = scenarios[currentScenarioIndex];
  var step = scenario.steps[currentStepIndex];
  var resultBox = document.getElementById("resultBox");

  if (selected === step.answer) {
    score++;
    resultBox.className = "result correct";
    resultBox.innerHTML = "✅ <strong>정답!</strong><br>" + step.correct;
  } else {
    resultBox.className = "result wrong";
    resultBox.innerHTML = "🚨 <strong>다시 확인!</strong><br>" + step.wrong + "<br><br>정답: <strong>" + step.answer + "</strong>";
  }

  resultBox.style.display = "block";
  document.getElementById("nextBtn").classList.remove("hidden");
}

function nextQuestion() {
  var scenario = scenarios[currentScenarioIndex];

  if (currentStepIndex < scenario.steps.length - 1) {
    currentStepIndex++;
    loadQuestion();
    return;
  }

  currentScenarioIndex++;
  currentStepIndex = 0;

  if (currentScenarioIndex < scenarios.length) {
    loadQuestion();
  } else {
    finishGame();
  }
}

function finishGame() {
  document.getElementById("gameScreen").classList.add("hidden");
  document.getElementById("finishScreen").classList.remove("hidden");

  var totalSteps = scenarios.reduce(function (n, s) {
    return n + s.steps.length;
  }, 0);

  document.getElementById("finalScore").innerText =
    "최종 점수: " + score + " / " + totalSteps;

  var message = "";

  if (score === totalSteps) {
    message = "완벽합니다. 응급상황에서 약물 선택 판단이 매우 좋습니다.";
  } else if (score >= Math.ceil(totalSteps * 0.66)) {
    message = "좋습니다. 헷갈린 약물만 다시 확인하면 실제 상황에서 더 자신 있게 대응할 수 있습니다.";
  } else {
    message = "응급약물은 반복 학습이 중요합니다. 약물 카드를 확인한 뒤 다시 도전해보세요.";
  }

  document.getElementById("finalMessage").innerText = message;
}

function restartGame() {
  startGame();
}

function showDrugCards() {
  showTab("drug");
}

function showTab(tab) {

  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("gameScreen").classList.add("hidden");
  document.getElementById("finishScreen").classList.add("hidden");
  document.getElementById("drugCards").classList.add("hidden");
  document.getElementById("studyScreen").classList.add("hidden");

  var pageNav = document.getElementById("pageNav");

  if (tab === "home") {
    document.getElementById("startScreen").classList.remove("hidden");
    pageNav.classList.add("hidden");
  } else {
    pageNav.classList.remove("hidden");
  }

  if (tab === "quiz") {
    startGame();
  }

  if (tab === "drug") {
    document.getElementById("drugCards").classList.remove("hidden");
  }

  if (tab === "study") {
    document.getElementById("studyScreen").classList.remove("hidden");
  }

}

function toggleDrugDetail(button) {
  var detail = button.nextElementSibling;
  if (!detail || !detail.classList.contains("drug-detail")) return;

  var isOpen = !detail.classList.contains("hidden");

  if (isOpen) {
    detail.classList.add("hidden");
    button.setAttribute("aria-expanded", "false");
    button.textContent = "투여방법 및 상세정보 보기";
  } else {
    detail.classList.remove("hidden");
    button.setAttribute("aria-expanded", "true");
    button.textContent = "투여방법 및 상세정보 닫기";
  }
}
