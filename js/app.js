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

/* ---------- Today's Nursing Tip (Home) ----------
 * Data: NURSING_TIPS in js/nursingTips.js
 * Schema: { id, studyId, title, code, before[], during[], after[], mistake, memory, related[] }
 */
var _lastNursingTipId = null;
var studyOrigin = null;
var _studyOriginFromOpen = false;
var ecartScrollPosition = null;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pickNursingTip() {
  var list = typeof NURSING_TIPS !== "undefined" ? NURSING_TIPS : [];
  if (!list.length) return null;
  if (list.length === 1) return list[0];

  var pool = list.filter(function (tip) {
    return tip.id !== _lastNursingTipId;
  });
  if (!pool.length) pool = list;

  var tip = pool[Math.floor(Math.random() * pool.length)];
  _lastNursingTipId = tip.id;
  return tip;
}

function tipCheckListHtml(items) {
  return (items || [])
    .map(function (item) {
      return (
        '<li class="tnt-item">' +
        '<span class="tnt-check" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>' +
        "</span>" +
        "<span>" +
        escapeHtml(item) +
        "</span>" +
        "</li>"
      );
    })
    .join("");
}

function tipRelatedHtml(related) {
  return (related || [])
    .map(function (chip) {
      var action = chip.action || "study";
      var id = chip.id || "";
      return (
        '<button type="button" class="tnt-chip" onclick="openNursingTipLink(\'' +
        escapeHtml(action) +
        "', '" +
        escapeHtml(id) +
        "')\">" +
        escapeHtml(chip.label || "") +
        "</button>"
      );
    })
    .join("");
}

function renderNursingTipCard(tip) {
  if (!tip) return "";

  return (
    '<article class="tnt" data-tip-id="' +
    escapeHtml(tip.id || "") +
    '">' +
    '<header class="tnt-head">' +
    '<div class="tnt-brand">' +
    '<span class="tnt-brand-icon" aria-hidden="true">' +
    '<svg viewBox="0 0 24 24"><path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L14 5"/><path d="m9 11 4 4"/><path d="m5 19-3 3"/><path d="m14 4 6 6"/></svg>' +
    "</span>" +
    "<div>" +
    '<p class="tnt-eyebrow">Today\'s Nursing Tip</p>' +
    '<h3 class="tnt-title">' +
    escapeHtml(tip.title || "") +
    "</h3>" +
    (tip.code
      ? '<p class="tnt-code">' + escapeHtml(tip.code) + "</p>"
      : "") +
    "</div>" +
    "</div>" +
    "</header>" +
    '<div class="tnt-body">' +
    '<section class="tnt-section">' +
    '<h4 class="tnt-label">① 투약 전 확인</h4>' +
    '<ul class="tnt-list">' +
    tipCheckListHtml(tip.before) +
    "</ul>" +
    "</section>" +
    '<section class="tnt-section">' +
    '<h4 class="tnt-label">② 투약 중 핵심</h4>' +
    '<ul class="tnt-list">' +
    tipCheckListHtml(tip.during) +
    "</ul>" +
    "</section>" +
    '<section class="tnt-section">' +
    '<h4 class="tnt-label">③ 투약 후 확인</h4>' +
    '<ul class="tnt-list">' +
    tipCheckListHtml(tip.after) +
    "</ul>" +
    "</section>" +
    '<section class="tnt-section tnt-section--warn">' +
    '<h4 class="tnt-label">' +
    '<span class="tnt-warn-icon" aria-hidden="true">' +
    '<svg viewBox="0 0 24 24"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>' +
    "</span>" +
    "④ 신규가 자주 하는 실수</h4>" +
    '<p class="tnt-mistake">' +
    escapeHtml(tip.mistake || "") +
    "</p>" +
    "</section>" +
    '<section class="tnt-section tnt-section--memory">' +
    '<h4 class="tnt-label">' +
    '<span class="tnt-memory-icon" aria-hidden="true">' +
    QUIZ_ICONS.lightbulb +
    "</span>" +
    "⑤ 꼭 기억!</h4>" +
    '<p class="tnt-memory">' +
    escapeHtml(tip.memory || "") +
    "</p>" +
    "</section>" +
    '<footer class="tnt-related">' +
    '<p class="tnt-related-label">⑥ 관련 학습</p>' +
    '<div class="tnt-chips">' +
    tipRelatedHtml(tip.related) +
    "</div>" +
    "</footer>" +
    "</div>" +
    "</article>"
  );
}

function renderClinicalPearls() {
  var mount = document.getElementById("clinicalPearlMount");
  if (!mount) return;
  var tip = pickNursingTip();
  mount.innerHTML = tip ? renderNursingTipCard(tip) : "";
}

function syncStudyBackButton() {
  var btn = document.getElementById("studyBackToEcart");
  if (!btn) return;
  if (studyOrigin === "ecart" && currentAppTab === "study") {
    btn.classList.remove("hidden");
  } else {
    btn.classList.add("hidden");
  }
}

function returnToEcartFromStudy() {
  studyOrigin = null;
  _studyOriginFromOpen = false;
  syncStudyBackButton();

  var savedScroll = ecartScrollPosition;
  showTab("ecart");

  if (savedScroll == null) return;

  window.requestAnimationFrame(function () {
    window.requestAnimationFrame(function () {
      window.scrollTo(0, savedScroll);
      ecartScrollPosition = null;
    });
  });
}

function openStudyDrug(studyId, origin) {
  studyOrigin = origin || null;
  _studyOriginFromOpen = true;

  if (origin === "ecart") {
    ecartScrollPosition = window.scrollY || window.pageYOffset || 0;
  } else {
    ecartScrollPosition = null;
  }

  showTab("study");
  var delay = prefersReducedMotion() ? 0 : 120;
  window.setTimeout(function () {
    var el = document.querySelector(
      '.drug-card[data-study-id="' + studyId + '"]'
    );
    if (el && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start"
      });
    }
  }, delay);
}

function openNursingTipLink(action, id) {
  if (action === "cheat") {
    openCheatSection(id);
    return;
  }
  if (action === "study") {
    openStudyDrug(id);
  }
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
  var linkify =
    typeof linkifyGlossaryTerms === "function"
      ? linkifyGlossaryTerms
      : function (t) {
          return t;
        };
  var html = "";
  if (isCorrect) {
    html += "<strong>정답</strong><br>" + linkify(step.correct);
  } else {
    html +=
      "<strong>다시 확인</strong><br>" +
      linkify(step.wrong) +
      "<br><br>정답: <strong>" +
      linkify(step.answer) +
      "</strong>";
  }
  if (step.rationale) {
    html += "<br><br><strong>근거</strong><br>" + linkify(step.rationale);
  }
  if (step.learningPoint) {
    html +=
      "<br><br><strong>학습 포인트</strong><br>" + linkify(step.learningPoint);
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

  var diffEl = document.getElementById("caseDifficulty");
  if (diffEl) {
    var diffMeta =
      typeof getDifficultyMeta === "function"
        ? getDifficultyMeta(scenario.difficulty)
        : null;
    if (diffMeta) {
      diffEl.className = "sim-badge sim-badge--" + diffMeta.tone;
      diffEl.textContent = diffMeta.icon + " " + diffMeta.label;
    } else {
      diffEl.className = "sim-badge hidden";
      diffEl.textContent = "";
    }
  }

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

  var shuffledOptions = shuffleArray(step.options);
  shuffledOptions.forEach(function (option) {
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
  if (typeof hideGlossaryPopover === "function") hideGlossaryPopover();

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
    if (currentMode && currentMode.type === "category") {
      markCasesCompleted(currentMode.categoryId, [scenario.id]);
    }
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

  if (tab === "study") {
    if (!_studyOriginFromOpen) {
      studyOrigin = null;
    }
    _studyOriginFromOpen = false;
  }
  syncStudyBackButton();

  if (tab === "ecart") {
    if (typeof initEcartScreen === "function") initEcartScreen();
  }
}

function toggleDrugDetail(button) {
  var card = button.closest(".drug-card");
  if (!card) return;
  var detail = card.querySelector(".drug-detail");
  if (!detail) return;

  var isOpen = !detail.classList.contains("hidden");
  if (isOpen) {
    detail.classList.add("hidden");
    button.setAttribute("aria-expanded", "false");
    if (button.classList.contains("pocket-detail-btn")) {
      button.textContent = "자세히 보기";
    } else {
      button.textContent = "투여방법 및 상세정보 보기";
    }
  } else {
    detail.classList.remove("hidden");
    button.setAttribute("aria-expanded", "true");
    if (button.classList.contains("pocket-detail-btn")) {
      button.textContent = "상세 닫기";
    } else {
      button.textContent = "투여방법 및 상세정보 닫기";
    }
  }
}

function togglePediatric(button) {
  /* Pocket Guide: Pediatric는 accordion으로 통합 */
  var item = button.closest(".pocket-acc-item");
  if (item) {
    togglePocketAccordion(button);
    return;
  }
  var body = button.nextElementSibling;
  if (!body || !body.classList.contains("pediatric-body")) return;
  var isOpen = !body.classList.contains("hidden");
  if (isOpen) {
    body.classList.add("hidden");
    button.setAttribute("aria-expanded", "false");
  } else {
    body.classList.remove("hidden");
    button.setAttribute("aria-expanded", "true");
  }
}

function togglePocketAccordion(button) {
  var item = button.closest(".pocket-acc-item");
  if (!item) return;
  var panel = item.querySelector(".pocket-acc-panel");
  if (!panel) return;
  var open = item.classList.contains("is-open");
  if (open) {
    item.classList.remove("is-open");
    panel.hidden = true;
    button.setAttribute("aria-expanded", "false");
  } else {
    item.classList.add("is-open");
    panel.hidden = false;
    button.setAttribute("aria-expanded", "true");
  }
}

function initHomeConsole() {
  renderClinicalPearls();
  renderPocketGuide();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHomeConsole);
} else {
  initHomeConsole();
}

/* ---------- Pocket Guide (Drug Library) ---------- */
function listBullets(items, className) {
  return (
    '<ul class="' +
    (className || "pocket-list") +
    '">' +
    (items || [])
      .map(function (item) {
        return "<li>" + escapeHtml(item) + "</li>";
      })
      .join("") +
    "</ul>"
  );
}

function checklistHtml(items) {
  return (
    '<ul class="pocket-check-list">' +
    (items || [])
      .map(function (item) {
        return (
          '<li><span class="pocket-check" aria-hidden="true">✓</span>' +
          escapeHtml(item) +
          "</li>"
        );
      })
      .join("") +
    "</ul>"
  );
}

function cautionHtml(items) {
  return (
    '<ul class="pocket-caution-list">' +
    (items || [])
      .map(function (item) {
        return (
          '<li><span class="pocket-warn" aria-hidden="true">⚠</span>' +
          escapeHtml(item) +
          "</li>"
        );
      })
      .join("") +
    "</ul>"
  );
}

function mixRowsHtml(lines) {
  return (lines || [])
    .map(function (row) {
      return (
        '<div class="pocket-mix-row">' +
        '<span class="pocket-mix-key">' +
        escapeHtml(row.label) +
        "</span>" +
        '<span class="pocket-mix-val">' +
        escapeHtml(row.value) +
        "</span>" +
        "</div>"
      );
    })
    .join("");
}

function mixCardHtml(mix) {
  if (!mix) return "<p class=\"pocket-empty\">혼합 정보 없음</p>";
  var html = "";
  if (mix.bag && mix.drug) {
    html +=
      '<div class="pocket-mix-formula">' +
      '<p class="pocket-mix-label">💉 혼합</p>' +
      '<p class="pocket-mix-line">' +
      escapeHtml(mix.bag) +
      "</p>" +
      '<p class="pocket-mix-plus">+</p>' +
      '<p class="pocket-mix-line">' +
      escapeHtml(mix.drug) +
      "</p>" +
      "</div>";
  }

  if (mix.form) {
    html +=
      '<p class="pocket-mix-form"><span>제형</span> ' +
      escapeHtml(mix.form) +
      "</p>";
  }

  if (mix.groups && mix.groups.length) {
    mix.groups.forEach(function (group) {
      html +=
        '<div class="pocket-mix-group' +
        (group.tone ? " pocket-mix-group--" + escapeHtml(group.tone) : "") +
        '">' +
        '<p class="pocket-mix-group-title">' +
        escapeHtml(group.title || "") +
        "</p>" +
        (group.subtitle
          ? '<p class="pocket-mix-group-sub">' +
            escapeHtml(group.subtitle) +
            "</p>"
          : "") +
        '<div class="pocket-mix-grid">' +
        mixRowsHtml(group.lines) +
        "</div>" +
        "</div>";
    });
  } else {
    html +=
      '<div class="pocket-mix-grid">' + mixRowsHtml(mix.lines) + "</div>";
  }

  if (mix.compare) {
    var cmp = mix.compare;
    html += '<div class="pocket-compare">';
    html +=
      '<p class="pocket-compare-title">' +
      escapeHtml(cmp.title || "비교") +
      "</p>";
    html += '<div class="pocket-compare-table">';
    html += '<div class="pocket-compare-row pocket-compare-row--head">';
    (cmp.headers || []).forEach(function (h) {
      html +=
        '<span class="pocket-compare-cell">' + escapeHtml(h) + "</span>";
    });
    html += "</div>";
    (cmp.rows || []).forEach(function (row) {
      html += '<div class="pocket-compare-row">';
      (row || []).forEach(function (cell) {
        html +=
          '<span class="pocket-compare-cell">' +
          escapeHtml(cell) +
          "</span>";
      });
      html += "</div>";
    });
    html += "</div>";
    if (cmp.points && cmp.points.length) {
      html += '<ul class="pocket-compare-points">';
      cmp.points.forEach(function (p) {
        html +=
          "<li><span aria-hidden=\"true\">💡</span> " +
          escapeHtml(p) +
          "</li>";
      });
      html += "</ul>";
    }
    if (cmp.warning) {
      html +=
        '<p class="pocket-compare-warn"><span aria-hidden="true">⚠️</span> ' +
        escapeHtml(cmp.warning) +
        "</p>";
    }
    html += "</div>";
  }

  if (mix.note) {
    html +=
      '<p class="pocket-mix-note">' + escapeHtml(mix.note) + "</p>";
  }
  if (mix.hospital === false) {
    html +=
      '<p class="pocket-mix-badge">일반 권장 기준 · 병원 프로토콜 우선</p>';
  } else if (mix.hospital) {
    html +=
      '<p class="pocket-mix-badge pocket-mix-badge--hospital">병원 기준</p>';
  }
  return html;
}

function hospitalPracticeHtml(studyId) {
  var tip =
    typeof HOSPITAL_TIPS !== "undefined" && HOSPITAL_TIPS
      ? HOSPITAL_TIPS[studyId]
      : null;
  if (!tip) {
    return '<p class="pocket-empty">병원 실무 TIP 준비 중 · 프로토콜 확인</p>';
  }

  var html =
    '<div class="hospital-practice">' +
    '<p class="hospital-practice-title">🏥 우리 병원에서는 이렇게 합니다</p>' +
    '<div class="hospital-practice-card hospital-practice-card--star">' +
    '<p class="hospital-practice-label">⭐ 먼저 기억!</p>' +
    '<p class="hospital-practice-text">' +
    escapeHtml(tip.rememberFirst || "") +
    "</p>" +
    "</div>";

  if (tip.wrong) {
    html +=
      '<div class="hospital-practice-compare">' +
      '<div class="hospital-practice-card hospital-practice-card--wrong">' +
      '<p class="hospital-practice-label">❌ 신규가 자주 하는 실수</p>' +
      '<p class="hospital-practice-text">' +
      escapeHtml(tip.wrong) +
      "</p>" +
      "</div>" +
      '<p class="hospital-practice-arrow" aria-hidden="true">↓</p>' +
      '<div class="hospital-practice-card hospital-practice-card--right">' +
      '<p class="hospital-practice-label">⭕ 올바른 계산</p>' +
      '<p class="hospital-practice-text">' +
      escapeHtml(tip.right || "") +
      "</p>" +
      "</div>" +
      "</div>";
  } else if (tip.right) {
    html +=
      '<div class="hospital-practice-card hospital-practice-card--right">' +
      '<p class="hospital-practice-label">⭕ 우리 병원 rate</p>' +
      '<p class="hospital-practice-text">' +
      escapeHtml(tip.right) +
      "</p>" +
      "</div>";
  }

  html +=
    '<div class="hospital-practice-card hospital-practice-card--tip">' +
    '<p class="hospital-practice-label">💡 교육간호사 TIP</p>' +
    '<p class="hospital-practice-educator">' +
    escapeHtml(tip.educatorTip || "") +
    "</p>" +
    "</div>" +
    "</div>";

  return html;
}

function accordionItem(title, bodyHtml, accId) {
  return (
    '<div class="pocket-acc-item" data-acc="' +
    escapeHtml(accId) +
    '">' +
    '<button type="button" class="pocket-acc-btn" aria-expanded="false" onclick="togglePocketAccordion(this)">' +
    '<span class="pocket-acc-chevron" aria-hidden="true">▼</span>' +
    "<span>" +
    escapeHtml(title) +
    "</span>" +
    "</button>" +
    '<div class="pocket-acc-panel" hidden>' +
    bodyHtml +
    "</div>" +
    "</div>"
  );
}

function renderPocketDrugCard(drug) {
  var imgs = (drug.images || [])
    .map(function (img) {
      return (
        '<img src="' +
        escapeHtml(img.src) +
        '" class="drug-img pocket-img" alt="' +
        escapeHtml(img.alt || drug.title) +
        '">'
      );
    })
    .join("");

  var admin = drug.admin || {};
  var adminHtml =
    '<dl class="pocket-admin">' +
    "<div><dt>경로</dt><dd>" +
    escapeHtml(admin.route || "—") +
    "</dd></div>" +
    "<div><dt>속도</dt><dd>" +
    escapeHtml(admin.rate || "—") +
    "</dd></div>" +
    "<div><dt>Pump</dt><dd>" +
    escapeHtml(admin.pump || "—") +
    "</dd></div>" +
    "<div><dt>Monitoring</dt><dd>" +
    escapeHtml(admin.monitoring || "—") +
    "</dd></div>" +
    "</dl>";

  var pedBadge =
    drug.pediatricSource === "hospital" ? "병원" : "일반 근거";
  var pedHtml =
    listBullets(drug.pediatric, "pocket-list") +
    '<p class="pocket-mix-badge">' +
    escapeHtml(pedBadge) +
    "</p>";

  return (
    '<article class="drug-card pocket-card" data-study-id="' +
    escapeHtml(drug.id) +
    '">' +
    '<div class="pocket-quick">' +
    '<div class="pocket-img-wrap' +
    ((drug.images || []).length > 1 ? " pocket-img-wrap--multi" : "") +
    '">' +
    imgs +
    "</div>" +
    "<h3>" +
    escapeHtml(drug.title) +
    "</h3>" +
    '<p class="drug-code">병원코드: ' +
    escapeHtml(drug.code) +
    "</p>" +
    '<section class="pocket-block">' +
    '<h4 class="pocket-block-title">📌 언제 사용하는 약인가?</h4>' +
    listBullets(drug.when, "pocket-list") +
    "</section>" +
    '<section class="pocket-block">' +
    '<h4 class="pocket-block-title">🎯 목적</h4>' +
    listBullets(drug.purpose, "pocket-list") +
    "</section>" +
    '<section class="pocket-block">' +
    '<h4 class="pocket-block-title">👀 투약 전 확인</h4>' +
    checklistHtml(drug.checklist) +
    "</section>" +
    '<button type="button" class="detail-toggle-btn pocket-detail-btn" onclick="toggleDrugDetail(this)" aria-expanded="false">자세히 보기</button>' +
    "</div>" +
    '<div class="drug-detail pocket-detail hidden">' +
    '<div class="pocket-accordion">' +
    accordionItem("투여방법", adminHtml, "admin") +
    accordionItem("희석 및 혼합", mixCardHtml(drug.mix), "mix") +
    accordionItem(
      "병원 실무 TIP",
      hospitalPracticeHtml(drug.id),
      "hospital"
    ) +
    accordionItem("주의사항", cautionHtml(drug.cautions), "caution") +
    accordionItem("Pediatric", pedHtml, "pediatric") +
    "</div>" +
    "</div>" +
    "</article>"
  );
}

function renderPocketGuide() {
  var grid = document.getElementById("pocketGuideGrid");
  if (!grid) return;
  var drugs =
    typeof POCKET_GUIDE_DRUGS !== "undefined" ? POCKET_GUIDE_DRUGS : [];
  if (!drugs.length) {
    grid.innerHTML = "";
    return;
  }
  grid.innerHTML = drugs.map(renderPocketDrugCard).join("");
}
