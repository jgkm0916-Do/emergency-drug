/* 부서별 응급카트(E-cart) 데이터 · 렌더링 · 비교
 * 출처: 대전보훈병원 심폐소생술 관리규정 별첨4
 */

var ECART_DEPARTMENTS = [
  { id: "er", name: "ER", fullName: "ER 응급카트" },
  { id: "negative", name: "음압실", fullName: "음압실 응급카트" },
  { id: "icu", name: "ICU", fullName: "ICU 응급카트" },
  { id: "angio", name: "심혈관조영실", fullName: "심혈관조영실 응급카트" },
  { id: "ward", name: "병동", fullName: "병동 응급카트" },
  { id: "or", name: "수술실·내시경실·영상의학과", fullName: "수술실·내시경실·영상의학과 응급카트" },
  { id: "dialysis", name: "인공신장실", fullName: "인공신장실 응급카트" }
];

/* studyId: 기초 약물 학습 카드 data-study-id (없으면 null) */
var ECART_CATALOG = {
  adenosine: {
    id: "adenosine",
    name: "Adenosine",
    code: "MADEN",
    strength: "6mg/2ml/vial",
    studyId: "adenosine"
  },
  atropine: {
    id: "atropine",
    name: "Atropine",
    code: "—",
    strength: "0.5mg/1ml/amp",
    studyId: null
  },
  calcium: {
    id: "calcium",
    name: "Calcium gluconate",
    code: "MCAGLU",
    strength: "2g/20ml/amp (3%)",
    studyId: "calcium"
  },
  bicarbonate: {
    id: "bicarbonate",
    name: "Sodium bicarbonate",
    code: "MBIVON",
    strength: "1.68g/20ml/amp",
    studyId: "bicarbonate"
  },
  dobutamine: {
    id: "dobutamine",
    name: "Dobutamine",
    code: "—",
    strength: "250mg/5ml/amp",
    studyId: null
  },
  digoxin: {
    id: "digoxin",
    name: "Digoxin",
    code: "—",
    strength: "0.25mg/1ml/amp",
    studyId: null
  },
  epinephrine: {
    id: "epinephrine",
    name: "Epinephrine",
    code: "MEPI",
    strength: "1mg/1ml/amp",
    studyId: "epinephrine"
  },
  amiodarone: {
    id: "amiodarone",
    name: "Amiodarone HCL",
    code: "MCDR",
    strength: "150mg/3ml/Amp",
    studyId: "amiodarone"
  },
  magnesium: {
    id: "magnesium",
    name: "Magnesium sulfate",
    code: "—",
    strength: "2g/20ml/vial",
    studyId: null
  },
  norepinephrine: {
    id: "norepinephrine",
    name: "Norepinephrine bitartrate",
    code: "MLEVO",
    strength: "8 mg/4 mL/amp",
    studyId: "norepinephrine"
  },
  dopaminePremix: {
    id: "dopaminePremix",
    name: "Dopamine premix",
    code: "M8DOPAM",
    strength: "800mg/500ml/bag",
    studyId: "dopamine-premix",
    nameDetail: "Dextrose 25g + dopamine HCl 800mg"
  }
};

/* 부서별 비치 수량 (PDF 그대로). 없으면 해당 부서에 비치 안 됨 */
var ECART_STOCK = {
  er: {
    adenosine: 5,
    atropine: 10,
    calcium: 2,
    bicarbonate: 20,
    dobutamine: 2,
    digoxin: 3,
    epinephrine: 30,
    amiodarone: 5,
    magnesium: 2,
    norepinephrine: 10,
    dopaminePremix: 2
  },
  negative: {
    adenosine: 3,
    atropine: 2,
    calcium: 2,
    bicarbonate: 10,
    dobutamine: 2,
    epinephrine: 20,
    amiodarone: 4,
    magnesium: 1,
    norepinephrine: 4,
    dopaminePremix: 1
  },
  icu: {
    adenosine: 3,
    atropine: 10,
    calcium: 5,
    bicarbonate: 10,
    dobutamine: 2,
    digoxin: 5,
    epinephrine: 20,
    amiodarone: 4,
    magnesium: 2,
    norepinephrine: 10,
    dopaminePremix: 3
  },
  angio: {
    adenosine: 3,
    atropine: 10,
    calcium: 1,
    bicarbonate: 3,
    dobutamine: 2,
    digoxin: 5,
    epinephrine: 10,
    amiodarone: 3,
    magnesium: 1,
    norepinephrine: 1,
    dopaminePremix: 2
  },
  ward: {
    adenosine: 3,
    atropine: 2,
    calcium: 1,
    bicarbonate: 3,
    dobutamine: 2,
    digoxin: 1,
    epinephrine: 10,
    dopaminePremix: 1
  },
  or: {
    adenosine: 3,
    atropine: 2,
    calcium: 1,
    bicarbonate: 3,
    dobutamine: 2,
    digoxin: 1,
    epinephrine: 10,
    dopaminePremix: 1
  },
  dialysis: {
    adenosine: 3,
    atropine: 10,
    calcium: 1,
    bicarbonate: 3,
    dobutamine: 2,
    digoxin: 2,
    epinephrine: 10,
    amiodarone: 3,
    magnesium: 1,
    norepinephrine: 1,
    dopaminePremix: 2
  }
};

var ECART_COMPARE_ORDER = [
  "adenosine",
  "atropine",
  "calcium",
  "bicarbonate",
  "dobutamine",
  "digoxin",
  "epinephrine",
  "amiodarone",
  "magnesium",
  "norepinephrine",
  "dopaminePremix"
];

var currentEcartDept = "er";
var ecartCompareOpen = false;

function getEcartDept(id) {
  for (var i = 0; i < ECART_DEPARTMENTS.length; i++) {
    if (ECART_DEPARTMENTS[i].id === id) return ECART_DEPARTMENTS[i];
  }
  return ECART_DEPARTMENTS[0];
}

function getEcartDrugList(deptId) {
  var stock = ECART_STOCK[deptId] || {};
  var list = [];
  ECART_COMPARE_ORDER.forEach(function (drugId) {
    if (stock[drugId] != null) {
      var meta = ECART_CATALOG[drugId];
      list.push({
        id: drugId,
        name: meta.name,
        code: meta.code,
        strength: meta.strength,
        qty: stock[drugId],
        studyId: meta.studyId,
        nameDetail: meta.nameDetail || ""
      });
    }
  });
  return list;
}

function initEcartScreen() {
  renderEcartDeptTabs();
  fillEcartCompareSelects();
  selectEcartDepartment(currentEcartDept || "er");
}

function renderEcartDeptTabs() {
  var tabs = document.getElementById("ecartDeptTabs");
  if (!tabs) return;
  tabs.innerHTML = "";

  ECART_DEPARTMENTS.forEach(function (dept) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ecart-dept-tab" + (dept.id === currentEcartDept ? " is-active" : "");
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", dept.id === currentEcartDept ? "true" : "false");
    btn.textContent = dept.name;
    btn.onclick = function () {
      selectEcartDepartment(dept.id);
    };
    tabs.appendChild(btn);
  });
}

function fillEcartCompareSelects() {
  var base = document.getElementById("ecartCompareBase");
  var target = document.getElementById("ecartCompareTarget");
  if (!base || !target) return;

  function fill(sel, selectedId) {
    sel.innerHTML = "";
    ECART_DEPARTMENTS.forEach(function (dept) {
      var opt = document.createElement("option");
      opt.value = dept.id;
      opt.textContent = dept.name;
      if (dept.id === selectedId) opt.selected = true;
      sel.appendChild(opt);
    });
  }

  fill(base, currentEcartDept || "er");
  fill(target, currentEcartDept === "ward" ? "er" : "ward");
}

function selectEcartDepartment(deptId) {
  currentEcartDept = deptId;
  renderEcartDeptTabs();
  renderEcartDeptView();

  var base = document.getElementById("ecartCompareBase");
  if (base) base.value = deptId;
  if (ecartCompareOpen) renderEcartCompare();
}

function renderEcartDeptView() {
  var dept = getEcartDept(currentEcartDept);
  var list = getEcartDrugList(currentEcartDept);

  var summary = document.getElementById("ecartDeptSummary");
  if (summary) {
    summary.innerHTML =
      "<h3 class=\"ecart-dept-title\">" +
      dept.fullName +
      "</h3>" +
      "<p class=\"ecart-dept-count\">응급약물 <strong>" +
      list.length +
      "</strong>종</p>";
  }

  var grid = document.getElementById("ecartDrugGrid");
  if (!grid) return;
  grid.innerHTML = "";

  list.forEach(function (drug) {
    var card = document.createElement("article");
    card.className = "ecart-drug-card";
    card.setAttribute("tabindex", "0");

    var codeHtml =
      drug.code && drug.code !== "—"
        ? '<span class="ecart-code">' + drug.code + "</span>"
        : '<span class="ecart-code ecart-code--muted">코드 미기재</span>';

    card.innerHTML =
      "<h4 class=\"ecart-drug-name\">" +
      drug.name +
      "</h4>" +
      (drug.nameDetail
        ? '<p class="ecart-drug-sub">' + drug.nameDetail + "</p>"
        : "") +
      '<div class="ecart-drug-meta">' +
      '<div><span class="ecart-meta-label">병원코드</span>' +
      codeHtml +
      "</div>" +
      '<div><span class="ecart-meta-label">함량/제형</span><span class="ecart-meta-value">' +
      drug.strength +
      "</span></div>" +
      '<div><span class="ecart-meta-label">수량</span><span class="ecart-meta-qty">' +
      drug.qty +
      "개</span></div>" +
      "</div>" +
      '<button type="button" class="secondary-btn ecart-detail-btn">상세보기</button>';

    function openDetail(e) {
      if (e) e.stopPropagation();
      openEcartDrugDetail(drug);
    }

    card.querySelector(".ecart-detail-btn").onclick = openDetail;
    card.onclick = function (e) {
      if (e.target && e.target.classList.contains("ecart-detail-btn")) return;
      openDetail(e);
    };
    card.onkeydown = function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openDetail(e);
      }
    };

    grid.appendChild(card);
  });
}

function openEcartDrugDetail(drug) {
  if (drug.studyId) {
    showTab("study");
    setTimeout(function () {
      var el = document.querySelector(
        '.drug-card[data-study-id="' + drug.studyId + '"]'
      );
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      el.classList.add("ecart-study-highlight");
      setTimeout(function () {
        el.classList.remove("ecart-study-highlight");
      }, 2200);

      var toggle = el.querySelector(".detail-toggle-btn");
      var detail = el.querySelector(".drug-detail");
      if (
        toggle &&
        detail &&
        detail.classList.contains("hidden") &&
        typeof toggleDrugDetail === "function"
      ) {
        toggleDrugDetail(toggle);
      }
    }, 80);
    return;
  }

  alert(
    drug.name +
      "\n\n기초 약물 학습 탭에 상세 학습 카드가 아직 없습니다.\n응급카트 규정상의 함량/제형·수량만 이 화면에서 확인하세요."
  );
}

function toggleEcartComparePanel() {
  ecartCompareOpen = !ecartCompareOpen;
  var panel = document.getElementById("ecartComparePanel");
  var btn = document.getElementById("ecartCompareToggle");
  if (!panel) return;

  if (ecartCompareOpen) {
    panel.classList.remove("hidden");
    if (btn) btn.textContent = "비교 닫기";
    var base = document.getElementById("ecartCompareBase");
    if (base) base.value = currentEcartDept;
    renderEcartCompare();
  } else {
    panel.classList.add("hidden");
    if (btn) btn.textContent = "부서 비교";
  }
}

function renderEcartCompare() {
  var baseSel = document.getElementById("ecartCompareBase");
  var targetSel = document.getElementById("ecartCompareTarget");
  var table = document.getElementById("ecartCompareTable");
  if (!baseSel || !targetSel || !table) return;

  var baseId = baseSel.value;
  var targetId = targetSel.value;
  var baseDept = getEcartDept(baseId);
  var targetDept = getEcartDept(targetId);
  var baseStock = ECART_STOCK[baseId] || {};
  var targetStock = ECART_STOCK[targetId] || {};

  var thead = table.querySelector("thead");
  var tbody = table.querySelector("tbody");
  thead.innerHTML =
    "<tr><th>약물</th><th>" +
    baseDept.name +
    "</th><th>" +
    targetDept.name +
    "</th></tr>";
  tbody.innerHTML = "";

  ECART_COMPARE_ORDER.forEach(function (drugId) {
    var hasBase = baseStock[drugId] != null;
    var hasTarget = targetStock[drugId] != null;
    if (!hasBase && !hasTarget) return;

    var meta = ECART_CATALOG[drugId];
    var baseQty = hasBase ? baseStock[drugId] : null;
    var targetQty = hasTarget ? targetStock[drugId] : null;

    var tr = document.createElement("tr");
    var baseClass = "ecart-qty";
    var targetClass = "ecart-qty";

    if (baseQty == null) baseClass += " ecart-qty--none";
    if (targetQty == null) targetClass += " ecart-qty--none";

    if (baseQty != null && targetQty != null) {
      if (baseQty > targetQty) {
        baseClass += " ecart-qty--higher";
        targetClass += " ecart-qty--lower";
      } else if (targetQty > baseQty) {
        targetClass += " ecart-qty--higher";
        baseClass += " ecart-qty--lower";
      }
    } else if (baseQty != null && targetQty == null) {
      baseClass += " ecart-qty--higher";
    } else if (targetQty != null && baseQty == null) {
      targetClass += " ecart-qty--higher";
    }

    tr.innerHTML =
      "<td>" +
      meta.name +
      "</td>" +
      '<td class="' +
      baseClass +
      '">' +
      (baseQty == null ? "비치 안됨" : baseQty) +
      "</td>" +
      '<td class="' +
      targetClass +
      '">' +
      (targetQty == null ? "비치 안됨" : targetQty) +
      "</td>";
    tbody.appendChild(tr);
  });
}
