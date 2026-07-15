/* 퀴즈 진행, 카테고리 허브, 진행률, 점수 계산, 화면 제어 */

var SESSION_CASE_COUNT = 5;
var PROGRESS_KEY = "emergencyDrugSimProgress_v1";

var activeScenarios = [];
var currentScenarioIndex = 0;
var currentStepIndex = 0;
var score = 0;
var answered = false;
var wrongSteps = [];
var currentMode = null; /* { type: 'category'|'comprehensive', categoryId: string } */
var completedCaseIdsThisSession = [];

/* ---------- icons (Lucide-style SVG) ---------- */
var QUIZ_ICONS = {
  heart:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  zap:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>',
  activity:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
  droplet:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>',
  flask:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>',
  trophy:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
  arrow:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
  lightbulb:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>'
};

/* ---------- Mini Clinical Guide (Clinical Pearl) ----------
 * Extensible: add objects to CLINICAL_PEARLS.
 * Future: pick random pearl / filter by drug id.
 * Schema:
 * {
 *   id, label, topic, drug,
 *   symptoms: { title, items[] },
 *   ecg: { title, caption, kind: 'tall-t' },
 *   priorityDrug: { title, name, strength, dose, route },
 *   remember: { title, text }
 * }
 */
var CLINICAL_PEARLS = [
  {
    id: "hyperkalemia-calcium",
    label: "Clinical Pearl",
    topic: "Hyperkalemia",
    drug: "Calcium gluconate",
    symptoms: {
      title: "환자가 이런 증상을 보이면",
      items: ["근력 저하", "감각 이상", "오심", "서맥"]
    },
    ecg: {
      title: "ECG 특징",
      caption: "Tall T wave",
      kind: "tall-t"
    },
    priorityDrug: {
      title: "우선 약물",
      name: "Calcium gluconate",
      strength: "10%",
      dose: "1g",
      route: "IV slow"
    },
    remember: {
      title: "반드시 기억할 것",
      text:
        "Calcium은 칼륨을 제거하는 약물이 아니라 심근세포막을 안정화하는 약물이다."
    }
  }
];

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getEcgIllustrationSvg(kind) {
  if (kind === "tall-t") {
    return (
      '<svg viewBox="0 0 240 56" aria-hidden="true">' +
      '<path d="M4 32 H40 L48 32 L56 24 L64 40 L72 32 H100 L108 32 L116 8 L124 48 L132 32 H170 L178 32 L186 20 L194 44 L202 32 H236" ' +
      'fill="none" stroke="#34d399" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<text x="116" y="14" fill="#94a3b8" font-size="8" font-family="Pretendard,sans-serif">Tall T</text>' +
      "</svg>"
    );
  }
  return (
    '<svg viewBox="0 0 240 56" aria-hidden="true">' +
    '<path d="M4 28 H236" fill="none" stroke="#64748b" stroke-width="1.5"/>' +
    "</svg>"
  );
}

function pickClinicalPearl() {
  var list = CLINICAL_PEARLS || [];
  if (!list.length) return null;
  /* Home shows one; swap index / Math.random later for rotation */
  return list[0];
}

function renderMiniClinicalGuide(pearl) {
  if (!pearl) return "";

  var symptoms = pearl.symptoms || { title: "", items: [] };
  var items = (symptoms.items || [])
    .map(function (item) {
      return "<li>" + escapeHtml(item) + "</li>";
    })
    .join("");

  var ecg = pearl.ecg || {};
  var drug = pearl.priorityDrug || {};
  var remember = pearl.remember || {};

  return (
    '<article class="mcg" data-pearl-id="' +
    escapeHtml(pearl.id || "") +
    '">' +
    '<header class="mcg-head">' +
    '<div class="mcg-brand">' +
    '<span class="mcg-brand-icon" aria-hidden="true">' +
    QUIZ_ICONS.lightbulb +
    "</span>" +
    escapeHtml(pearl.label || "Clinical Pearl") +
    "</div>" +
    '<div class="mcg-tags">' +
    (pearl.topic
      ? '<span class="mcg-tag">' + escapeHtml(pearl.topic) + "</span>"
      : "") +
    (pearl.drug
      ? '<span class="mcg-tag mcg-tag--drug">' +
        escapeHtml(pearl.drug) +
        "</span>"
      : "") +
    "</div>" +
    "</header>" +
    '<div class="mcg-body">' +
    '<section class="mcg-section">' +
    '<h3 class="mcg-section-label"><span>1</span>' +
    escapeHtml(symptoms.title || "증상") +
    "</h3>" +
    '<ul class="mcg-list">' +
    items +
    "</ul>" +
    "</section>" +
    '<section class="mcg-section">' +
    '<h3 class="mcg-section-label"><span>2</span>' +
    escapeHtml(ecg.title || "ECG") +
    "</h3>" +
    '<div class="mcg-ecg">' +
    '<div class="mcg-ecg-fig">' +
    getEcgIllustrationSvg(ecg.kind || "tall-t") +
    "</div>" +
    '<p class="mcg-ecg-caption">' +
    escapeHtml(ecg.caption || "") +
    "</p>" +
    "</div>" +
    "</section>" +
    '<section class="mcg-section">' +
    '<h3 class="mcg-section-label"><span>3</span>' +
    escapeHtml(drug.title || "우선 약물") +
    "</h3>" +
    '<dl class="mcg-drug">' +
    '<dt class="mcg-drug-name">' +
    escapeHtml(drug.name || "") +
    "</dt>" +
    "<dt>농도</dt><dd>" +
    escapeHtml(drug.strength || "") +
    "</dd>" +
    "<dt>용량</dt><dd>" +
    escapeHtml(drug.dose || "") +
    "</dd>" +
    "<dt>투여</dt><dd>" +
    escapeHtml(drug.route || "") +
    "</dd>" +
    "</dl>" +
    "</section>" +
    '<section class="mcg-section mcg-section--remember">' +
    '<h3 class="mcg-section-label"><span>4</span>' +
    escapeHtml(remember.title || "반드시 기억할 것") +
    "</h3>" +
    '<p class="mcg-remember">' +
    escapeHtml(remember.text || "") +
    "</p>" +
    "</section>" +
    "</div>" +
    "</article>"
  );
}

function renderClinicalPearls() {
  var mount = document.getElementById("clinicalPearlMount");
  if (!mount) return;
  var pearl = pickClinicalPearl();
  mount.innerHTML = pearl ? renderMiniClinicalGuide(pearl) : "";
}

function updateBottomNav() {
  /* Bottom navigation removed — kept as no-op for call sites */
}

function openCheatSection(sectionId) {
  var targetId = sectionId || "cheat-guide";
  showTab("drug");
  var delay = prefersReducedMotion() ? 0 : 120;
  window.setTimeout(function () {
    var el = document.getElementById(targetId);
    if (!el) el = document.getElementById("cheat-guide");
    if (!el) el = document.getElementById("drugCards");
    if (el && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start"
      });
    }
  }, delay);
}

/* ---------- progress ---------- */
function loadProgress() {
  try {
    var raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return {};
    var parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (e) {
    return {};
  }
}

function saveProgress(data) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
  } catch (e) {
    /* ignore quota / private mode */
  }
}

function getCompletedSet(categoryId) {
  var all = loadProgress();
  var list = all[categoryId] || [];
  var map = {};
  list.forEach(function (id) {
    map[id] = true;
  });
  return map;
}

function markCasesCompleted(categoryId, caseIds) {
  if (!categoryId || categoryId === "comprehensive") return;
  var all = loadProgress();
  var set = getCompletedSet(categoryId);
  caseIds.forEach(function (id) {
    set[id] = true;
  });
  all[categoryId] = Object.keys(set);
  saveProgress(all);
}

function getCategoryProgress(categoryId) {
  var cases = getCategoryCases(categoryId);
  var doneMap = getCompletedSet(categoryId);
  var done = 0;
  cases.forEach(function (c) {
    if (doneMap[c.id]) done++;
  });
  return { done: done, total: cases.length };
}

function starsHtml(done, total) {
  var html = "";
  for (var i = 0; i < total; i++) {
    html += i < done ? "★" : "☆";
  }
  return html;
}

/* ---------- shuffle / session ---------- */
function shuffleArray(array) {
  var arr = array.slice();
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

function getTotalSteps(list) {
  return list.reduce(function (n, s) {
    return n + (s.steps ? s.steps.length : 0);
  }, 0);
}

function getActiveScenario() {
  return activeScenarios[currentScenarioIndex];
}

function hideAllMainScreens() {
  [
    "startScreen",
    "quizHubScreen",
    "gameScreen",
    "finishScreen",
    "drugCards",
    "studyScreen",
    "ecartScreen"
  ].forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.classList.add("hidden");
    el.classList.remove("is-enter-forward", "is-enter-back");
  });
}

var currentAppTab = "home";
var MAIN_SCREEN_IDS = [
  "startScreen",
  "quizHubScreen",
  "gameScreen",
  "finishScreen",
  "drugCards",
  "studyScreen",
  "ecartScreen"
];

function getScreenIdForTab(tab) {
  if (tab === "home") return "startScreen";
  if (tab === "study") return "studyScreen";
  if (tab === "drug") return "drugCards";
  if (tab === "quiz") return "quizHubScreen";
  if (tab === "ecart") return "ecartScreen";
  return null;
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function clearScreenEnterClasses(el) {
  if (!el) return;
  el.classList.remove("is-enter-forward", "is-enter-back");
}

function playScreenEnter(el, direction) {
  if (!el) return;
  clearScreenEnterClasses(el);
  if (prefersReducedMotion()) return;

  var cls = direction === "back" ? "is-enter-back" : "is-enter-forward";
  // force reflow so re-triggering animation works
  void el.offsetWidth;
  el.classList.add(cls);

  var done = function () {
    clearScreenEnterClasses(el);
    el.removeEventListener("animationend", done);
  };
  el.addEventListener("animationend", done);
}

function revealScreen(screenId, direction) {
  hideAllMainScreens();
  var el = document.getElementById(screenId);
  if (!el) return;
  el.classList.remove("hidden");
  playScreenEnter(el, direction || "forward");
}

/* ---------- quiz hub ---------- */
function showQuizHub() {
  revealScreen("quizHubScreen", "forward");
  currentAppTab = "quiz";
  updateBottomNav("quiz");
  renderQuizCategories();
}

function renderQuizCategories() {
  var grid = document.getElementById("quizCategoryGrid");
  if (!grid) return;
  grid.innerHTML = "";

  CATEGORY_META.forEach(function (meta, index) {
    var progress = getCategoryProgress(meta.id);
    grid.appendChild(
      buildCategoryCard(meta, progress, function () {
        startCategorySimulation(meta.id);
      }, "cat-" + index)
    );
  });

  grid.appendChild(
    buildCategoryCard(
      COMPREHENSIVE_META,
      { done: null, total: COMPREHENSIVE_META.caseCount },
      function () {
        startComprehensiveEvaluation();
      },
      "comprehensive"
    )
  );
}

function buildCategoryCard(meta, progress, onClick, toneClass) {
  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "home-tile quiz-cat-tile quiz-cat-tile--" + (toneClass || "default");
  btn.onclick = onClick;

  var iconWrap = document.createElement("span");
  iconWrap.className = "tile-icon";
  iconWrap.setAttribute("aria-hidden", "true");
  iconWrap.innerHTML = QUIZ_ICONS[meta.icon] || QUIZ_ICONS.heart;

  var body = document.createElement("span");
  body.className = "tile-body";

  var title = document.createElement("span");
  title.className = "tile-title";
  title.textContent = meta.shortTitle || meta.title;

  var sub = document.createElement("span");
  sub.className = "tile-sub";
  if (progress.done == null) {
    sub.textContent =
      COMPREHENSIVE_META.caseCount +
      " CASE · " +
      (meta.description || "");
  } else {
    sub.innerHTML =
      '<span class="quiz-progress-line">' +
      progress.done +
      " / " +
      progress.total +
      " 완료</span>" +
      '<span class="quiz-stars" aria-hidden="true">' +
      starsHtml(progress.done, progress.total) +
      "</span>" +
      '<span class="quiz-desc">' +
      (meta.description || "") +
      "</span>";
  }

  body.appendChild(title);
  body.appendChild(sub);

  var arrow = document.createElement("span");
  arrow.className = "tile-arrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.innerHTML = QUIZ_ICONS.arrow;

  btn.appendChild(iconWrap);
  btn.appendChild(body);
  btn.appendChild(arrow);
  return btn;
}

/* ---------- start modes ---------- */
function startCategorySimulation(categoryId) {
  var cases = getCategoryCases(categoryId);
  if (!cases.length) return;

  currentMode = { type: "category", categoryId: categoryId };
  beginSimulationSession(cases.slice());
}

function startComprehensiveEvaluation() {
  var pool = getAllScenariosFlat();
  var take = Math.min(SESSION_CASE_COUNT, pool.length);
  currentMode = { type: "comprehensive", categoryId: "comprehensive" };
  beginSimulationSession(shuffleArray(pool).slice(0, take));
}

function beginSimulationSession(caseList) {
  revealScreen("gameScreen", "forward");
  currentAppTab = "quiz";
  updateBottomNav("quiz");

  activeScenarios = caseList;
  currentScenarioIndex = 0;
  currentStepIndex = 0;
  score = 0;
  answered = false;
  wrongSteps = [];
  completedCaseIdsThisSession = [];

  loadQuestion();
}

function retryCurrentMode() {
  if (!currentMode) {
    showQuizHub();
    return;
  }
  if (currentMode.type === "comprehensive") {
    startComprehensiveEvaluation();
  } else {
    startCategorySimulation(currentMode.categoryId);
  }
}

function goNextCategory() {
  if (!currentMode || currentMode.type !== "category") {
    showQuizHub();
    return;
  }
  var idx = -1;
  for (var i = 0; i < CATEGORY_META.length; i++) {
    if (CATEGORY_META[i].id === currentMode.categoryId) {
      idx = i;
      break;
    }
  }
  if (idx >= 0 && idx < CATEGORY_META.length - 1) {
    startCategorySimulation(CATEGORY_META[idx + 1].id);
  } else {
    showQuizHub();
  }
}

/* 기존 호환 */
function startSimulation() {
  showQuizHub();
}

function restartSimulation() {
  retryCurrentMode();
}

function startGame() {
  showQuizHub();
}

function restartGame() {
  retryCurrentMode();
}

/* ---------- question flow ---------- */
function formatFeedback(step, isCorrect) {
  var html = "";
  if (isCorrect) {
    html += "<strong>정답</strong><br>" + step.correct;
  } else {
    html +=
      "<strong>다시 확인</strong><br>" +
      step.wrong +
      "<br><br>정답: <strong>" +
      step.answer +
      "</strong>";
  }
  if (step.rationale) {
    html += "<br><br><strong>근거</strong><br>" + step.rationale;
  }
  if (step.learningPoint) {
    html += "<br><br><strong>학습 포인트</strong><br>" + step.learningPoint;
  }
  return html;
}

function loadQuestion() {
  answered = false;

  var scenario = getActiveScenario();
  if (!scenario) {
    finishGame();
    return;
  }

  var step = scenario.steps[currentStepIndex];

  document.getElementById("progressText").innerText =
    "CASE " +
    (currentScenarioIndex + 1) +
    " / " +
    activeScenarios.length +
    " · STEP " +
    (currentStepIndex + 1) +
    " / " +
    scenario.steps.length;

  document.getElementById("caseTitle").innerText =
    scenario.caseLabel || scenario.title || "";

  var rhythmEl = document.getElementById("caseRhythm");
  if (rhythmEl) {
    if (scenario.rhythm) {
      rhythmEl.textContent = "확인된 리듬: " + scenario.rhythm;
      rhythmEl.classList.remove("hidden");
    } else {
      rhythmEl.textContent = "";
      rhythmEl.classList.add("hidden");
    }
  }

  document.getElementById("caseText").innerText = scenario.text;
  document.getElementById("hr").innerText = scenario.hr;
  document.getElementById("bp").innerText = scenario.bp;
  document.getElementById("spo2").innerText = scenario.spo2;
  applyEcg(scenario);

  document.getElementById("questionText").innerText = step.question;

  var optionsBox = document.getElementById("optionsBox");
  optionsBox.classList.remove("is-answered");
  optionsBox.innerHTML = "";

  step.options.forEach(function (option) {
    var btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerText = option;
    btn.onclick = function () {
      checkAnswer(option, btn);
    };
    optionsBox.appendChild(btn);
  });

  var resultBox = document.getElementById("resultBox");
  resultBox.style.display = "none";
  resultBox.className = "result";

  var nextBtn = document.getElementById("nextBtn");
  nextBtn.classList.add("hidden");

  var isLastStep = currentStepIndex >= scenario.steps.length - 1;
  var isLastCase = currentScenarioIndex >= activeScenarios.length - 1;

  if (!isLastStep) {
    nextBtn.innerText = "다음 STEP";
  } else if (!isLastCase) {
    nextBtn.innerText = "다음 CASE";
  } else {
    nextBtn.innerText = "결과 보기";
  }
}

function checkAnswer(selected, clickedBtn) {
  if (answered) return;
  answered = true;

  var scenario = getActiveScenario();
  var stepItem = scenario.steps[currentStepIndex];
  var resultBox = document.getElementById("resultBox");
  var optionButtons = document.querySelectorAll("#optionsBox .option-btn");

  optionButtons.forEach(function (btn) {
    if (btn.innerText === stepItem.answer) {
      btn.classList.add("is-correct");
    } else if (btn === clickedBtn) {
      btn.classList.add("is-wrong");
    }
  });

  if (clickedBtn) clickedBtn.classList.add("is-selected");

  var isCorrect = selected === stepItem.answer;

  if (isCorrect) {
    score++;
    resultBox.className = "result correct";
  } else {
    resultBox.className = "result wrong";
    wrongSteps.push({
      caseTitle: scenario.title,
      caseLabel: scenario.caseLabel || scenario.title,
      step: currentStepIndex + 1,
      question: stepItem.question,
      answer: stepItem.answer
    });
  }

  resultBox.innerHTML = formatFeedback(stepItem, isCorrect);
  resultBox.style.display = "block";
  document.getElementById("optionsBox").classList.add("is-answered");
  document.getElementById("nextBtn").classList.remove("hidden");
}

function nextQuestion() {
  var scenario = getActiveScenario();

  if (currentStepIndex < scenario.steps.length - 1) {
    currentStepIndex++;
    loadQuestion();
    return;
  }

  /* CASE 완료 */
  if (scenario.id) {
    completedCaseIdsThisSession.push(scenario.id);
  }

  currentScenarioIndex++;
  currentStepIndex = 0;

  if (currentScenarioIndex < activeScenarios.length) {
    loadQuestion();
  } else {
    finishGame();
  }
}

function finishGame() {
  revealScreen("finishScreen", "forward");
  currentAppTab = "quiz";
  updateBottomNav("quiz");

  if (currentMode && currentMode.type === "category") {
    markCasesCompleted(currentMode.categoryId, completedCaseIdsThisSession);
  }

  var totalSteps = getTotalSteps(activeScenarios);
  var caseCount = activeScenarios.length;
  var rate = totalSteps > 0 ? Math.round((score / totalSteps) * 100) : 0;

  document.getElementById("finalScore").innerHTML =
    "정답률: " +
    rate +
    "% (" +
    score +
    " / " +
    totalSteps +
    " STEP)" +
    "<br>완료 CASE: " +
    caseCount;

  var wrongEl = document.getElementById("finalWrongSteps");
  if (wrongEl) {
    if (!wrongSteps.length) {
      wrongEl.innerHTML = "<strong>틀린 STEP</strong><br>없습니다.";
    } else {
      var lines = wrongSteps.map(function (w) {
        return (
          "· " +
          w.caseLabel +
          " / STEP " +
          w.step +
          " — 정답: " +
          w.answer
        );
      });
      wrongEl.innerHTML =
        "<strong>틀린 STEP (" +
        wrongSteps.length +
        ")</strong><br>" +
        lines.join("<br>");
    }
  }

  var message = "";
  if (totalSteps > 0 && score === totalSteps) {
    message = "완벽합니다. 해당 상황의 약물 선택 판단이 매우 좋습니다.";
  } else if (score >= Math.ceil(totalSteps * 0.66)) {
    message = "좋습니다. 틀린 STEP을 복습하면 더 자신 있게 대응할 수 있습니다.";
  } else {
    message = "기초 학습·상황별 참고를 확인한 뒤 같은 카테고리를 다시 풀어보세요.";
  }
  document.getElementById("finalMessage").innerText = message;

  var nextBtn = document.getElementById("finishNextBtn");
  if (nextBtn) {
    if (currentMode && currentMode.type === "category") {
      nextBtn.classList.remove("hidden");
      var idx = -1;
      for (var i = 0; i < CATEGORY_META.length; i++) {
        if (CATEGORY_META[i].id === currentMode.categoryId) {
          idx = i;
          break;
        }
      }
      nextBtn.textContent =
        idx >= 0 && idx < CATEGORY_META.length - 1
          ? "다음 카테고리"
          : "카테고리 목록";
    } else {
      nextBtn.classList.add("hidden");
    }
  }
}

/* ---------- tabs ---------- */
function showDrugCards() {
  showTab("drug");
}

function showTab(tab) {
  var pageNav = document.getElementById("pageNav");
  var nextScreenId = getScreenIdForTab(tab);
  var direction = tab === "home" ? "back" : "forward";

  if (tab === "home") {
    pageNav.classList.add("hidden");
  } else {
    pageNav.classList.remove("hidden");
  }

  if (tab === "quiz") {
    showQuizHub();
    return;
  }

  if (nextScreenId) {
    revealScreen(nextScreenId, direction);
  } else {
    hideAllMainScreens();
  }

  currentAppTab = tab;
  updateBottomNav(tab);

  if (tab === "ecart") {
    if (typeof initEcartScreen === "function") initEcartScreen();
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

function togglePediatric(button) {
  var body = button.nextElementSibling;
  if (!body || !body.classList.contains("pediatric-body")) return;

  var isOpen = !body.classList.contains("hidden");

  if (isOpen) {
    body.classList.add("hidden");
    button.setAttribute("aria-expanded", "false");
    button.textContent = "③ Pediatric 보기";
  } else {
    body.classList.remove("hidden");
    button.setAttribute("aria-expanded", "true");
    button.textContent = "③ Pediatric 접기";
  }
}

function initHomeConsole() {
  renderClinicalPearls();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHomeConsole);
} else {
  initHomeConsole();
}
