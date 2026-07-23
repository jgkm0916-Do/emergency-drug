/* H's & T's 등 임상 약어 글로서리 + 약어 스택(약어 → EN → KO) */

function termEscape(str) {
  if (typeof escapeHtml === "function") return escapeHtml(str);
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

var CLINICAL_TERMS = {
  SVT: {
    abbr: "SVT",
    en: "Supraventricular Tachycardia",
    ko: "상심실성 빈맥",
    aliases: ["Stable SVT", "Tachyarrhythmia / SVT"]
  },
  VF: {
    abbr: "VF",
    en: "Ventricular Fibrillation",
    ko: "심실세동",
    aliases: ["Refractory VF/VT"]
  },
  VT: {
    abbr: "VT",
    en: "Ventricular Tachycardia",
    ko: "심실빈맥",
    aliases: ["Pulseless VT", "pVT"]
  },
  "VF/VT": {
    abbr: "VF / VT",
    en: "Ventricular Fibrillation / Ventricular Tachycardia",
    ko: "심실세동 / 심실빈맥",
    aliases: ["VF/VT", "pulseless VT·VF", "Pulseless VT/VF", "VT/VF"]
  },
  PEA: {
    abbr: "PEA",
    en: "Pulseless Electrical Activity",
    ko: "무맥성 전기활동"
  },
  ROSC: {
    abbr: "ROSC",
    en: "Return of Spontaneous Circulation",
    ko: "자발순환회복"
  },
  CPR: {
    abbr: "CPR",
    en: "CPR",
    ko: "",
    aliases: ["Cardiac Arrest / CPR", "Cardiac Arrest"]
  },
  AFib: {
    abbr: "AFib",
    en: "Atrial Fibrillation",
    ko: "심방세동",
    aliases: ["AFib (병원 지침)"]
  },
  Asystole: {
    abbr: "Asystole",
    en: "Asystole",
    ko: "무수축",
    aliases: ["asystole"]
  },
  ECG: {
    abbr: "ECG",
    en: "ECG",
    ko: "",
    aliases: ["ECG / BP", "ECG / BP monitoring", "ECG 변화"]
  },
  Bradycardia: {
    abbr: "Bradycardia",
    en: "Bradycardia",
    ko: "서맥",
    aliases: ["Bradycardia + Hypotension", "symptomatic bradycardia"]
  },
  Tachycardia: {
    abbr: "Tachycardia",
    en: "Tachycardia",
    ko: "빈맥"
  },
  Hypotension: {
    abbr: "Hypotension",
    en: "Hypotension",
    ko: "저혈압",
    aliases: ["Severe Hypotension", "Shock / Hypotension"]
  },
  Shock: {
    abbr: "Shock",
    en: "Shock",
    ko: "쇼크"
  },
  "Septic Shock": {
    abbr: "Septic Shock",
    en: "Septic Shock",
    ko: "패혈성 쇼크",
    aliases: ["Septic Shock / Severe Hypotension", "septic shock"]
  },
  Hyperkalemia: {
    abbr: "Hyperkalemia",
    en: "Hyperkalemia",
    ko: "고칼륨혈증",
    aliases: ["Hyperkalemia + ECG 변화"]
  },
  MAP: { abbr: "MAP", en: "Mean Arterial Pressure", ko: "평균동맥압" },
  BP: { abbr: "BP", en: "BP", ko: "" },
  HR: { abbr: "HR", en: "HR", ko: "" },
  SpO2: {
    abbr: "SpO₂",
    en: "Oxygen Saturation",
    ko: "산소포화도",
    aliases: ["SpO2"]
  },
  AVNRT: {
    abbr: "AVNRT",
    en: "AV Nodal Reentrant Tachycardia",
    ko: "방실결절 회귀성 빈맥"
  },
  Epinephrine: { abbr: "Epinephrine", en: "Epinephrine", ko: "에피네프린" },
  Adenosine: { abbr: "Adenosine", en: "Adenosine", ko: "아데노신" },
  Amiodarone: { abbr: "Amiodarone", en: "Amiodarone", ko: "아미오다론" },
  "Calcium Gluconate": {
    abbr: "Calcium Gluconate",
    en: "Calcium Gluconate",
    ko: "글루콘산칼슘"
  },
  "Sodium Bicarbonate": {
    abbr: "Sodium Bicarbonate",
    en: "Sodium Bicarbonate",
    ko: "탄산수소나트륨"
  },
  Dopamine: { abbr: "Dopamine", en: "Dopamine", ko: "도파민" },
  Norepinephrine: {
    abbr: "Norepinephrine",
    en: "Norepinephrine",
    ko: "노르에피네프린"
  },
  "Dopamine Premix": {
    abbr: "Dopamine Premix",
    en: "Dopamine Premix",
    ko: "도파민 프리믹스"
  },
  Atropine: { abbr: "Atropine", en: "Atropine", ko: "아트로핀" }
};

var GLOSSARY = {
  "hs-ts": {
    title: "H's & T's",
    subtitle: "심정지 가역적 원인",
    groups: [
      {
        label: "H's",
        items: [
          { en: "Hypovolemia", ko: "저혈량" },
          { en: "Hypoxia", ko: "저산소증" },
          { en: "Hydrogen ion (acidosis)", ko: "산증" },
          { en: "Hypo/Hyperkalemia", ko: "저/고칼륨혈증" },
          { en: "Hypothermia", ko: "저체온증" }
        ]
      },
      {
        label: "T's",
        items: [
          { en: "Tension pneumothorax", ko: "긴장성 기흉" },
          { en: "Tamponade", ko: "심장압전" },
          { en: "Toxins", ko: "중독" },
          { en: "Thrombosis (pulmonary)", ko: "폐색전증" },
          { en: "Thrombosis (coronary)", ko: "심근경색" }
        ]
      }
    ]
  }
};

Object.keys(CLINICAL_TERMS).forEach(function (key) {
  var t = CLINICAL_TERMS[key];
  var line = "";
  if (t.en && t.en !== t.abbr) {
    line = t.en;
    if (t.ko) line += " · " + t.ko;
  } else if (t.ko) {
    line = t.ko;
  }
  GLOSSARY[key] = {
    title: t.abbr,
    subtitle: line,
    simple: true
  };
});

var GLOSSARY_HS_TS_RE = /H[''\u2019]s\s*&\s*T[''\u2019]s/g;

var CLINICAL_INLINE_RE = new RegExp(
  "\\b(" +
    [
      "AVNRT",
      "ROSC",
      "PEA",
      "AFib",
      "MAP",
      "SVT",
      "pVT",
      "VF\\/VT",
      "VT\\/VF",
      "VF",
      "VT"
    ].join("|") +
    ")\\b",
  "g"
);

function lookupClinicalTerm(text) {
  if (text == null) return null;
  var raw = String(text).trim();
  if (!raw) return null;
  if (CLINICAL_TERMS[raw]) return CLINICAL_TERMS[raw];

  var keys = Object.keys(CLINICAL_TERMS);
  for (var i = 0; i < keys.length; i++) {
    var term = CLINICAL_TERMS[keys[i]];
    if (term.abbr === raw) return term;
    var aliases = term.aliases || [];
    for (var j = 0; j < aliases.length; j++) {
      if (aliases[j] === raw) return term;
    }
  }
  return null;
}

function termStackHtml(termOrKey, opts) {
  var term =
    typeof termOrKey === "string" ? lookupClinicalTerm(termOrKey) : termOrKey;
  if (!term) return "";
  opts = opts || {};
  var cls = "term-stack" + (opts.compact ? " term-stack--compact" : "");
  var html = '<span class="' + cls + '">';
  html += '<span class="term-abbr">' + termEscape(term.abbr) + "</span>";
  if (term.en && term.en !== term.abbr) {
    html += '<span class="term-en">' + termEscape(term.en) + "</span>";
  }
  if (term.ko) {
    html += '<span class="term-ko">' + termEscape(term.ko) + "</span>";
  }
  html += "</span>";
  return html;
}

function formatTermAwareText(text, opts) {
  opts = opts || {};
  if (text == null || text === "") return "";
  var term = lookupClinicalTerm(text);
  if (term) return termStackHtml(term, opts);
  var escaped = termEscape(text);
  if (opts.inlineLinkify === false) return escaped;
  return linkifyGlossaryTerms(escaped);
}

function linkifyGlossaryTerms(text) {
  if (text == null || text === "") return text;
  var out = String(text).replace(GLOSSARY_HS_TS_RE, function (match) {
    return (
      '<button type="button" class="glossary-term" data-glossary="hs-ts" aria-expanded="false">' +
      '<span class="glossary-term-label">' +
      match +
      "</span>" +
      '<span class="glossary-term-icon" aria-hidden="true">ⓘ</span>' +
      "</button>"
    );
  });

  out = out.replace(CLINICAL_INLINE_RE, function (match) {
    var key = match === "pVT" ? "VT" : match;
    if (match === "VT/VF" || match === "VF/VT") key = "VF/VT";
    if (!GLOSSARY[key] && !CLINICAL_TERMS[key]) return match;
    var term = CLINICAL_TERMS[key] || lookupClinicalTerm(match);
    var label = term ? term.abbr : match;
    return (
      '<button type="button" class="glossary-term" data-glossary="' +
      termEscape(key) +
      '" aria-expanded="false">' +
      '<span class="glossary-term-label">' +
      termEscape(label) +
      "</span>" +
      '<span class="glossary-term-icon" aria-hidden="true">ⓘ</span>' +
      "</button>"
    );
  });

  return out;
}

function getGlossaryPopover() {
  var pop = document.getElementById("glossaryPopover");
  if (pop) return pop;

  pop = document.createElement("div");
  pop.id = "glossaryPopover";
  pop.className = "glossary-popover hidden";
  pop.setAttribute("role", "dialog");
  pop.setAttribute("aria-label", "용어 설명");
  document.body.appendChild(pop);
  return pop;
}

function buildGlossaryPopoverHtml(entry) {
  var simple = entry.simple || !entry.groups || !entry.groups.length;
  var html =
    '<div class="glossary-popover-head' +
    (simple ? " glossary-popover-head--simple" : "") +
    '">' +
    '<span class="glossary-popover-title">' +
    termEscape(entry.title) +
    "</span>" +
    '<span class="glossary-popover-sub">' +
    termEscape(entry.subtitle || "") +
    "</span>" +
    '<button type="button" class="glossary-popover-close" aria-label="닫기">×</button>' +
    "</div>";

  if (simple) return html;

  (entry.groups || []).forEach(function (group) {
    html += '<div class="glossary-group">';
    html +=
      '<div class="glossary-group-label">' + termEscape(group.label) + "</div>";
    html += '<ul class="glossary-list">';
    (group.items || []).forEach(function (item) {
      html +=
        '<li><span class="glossary-en">' +
        termEscape(item.en) +
        '</span><span class="glossary-ko">' +
        termEscape(item.ko) +
        "</span></li>";
    });
    html += "</ul></div>";
  });

  return html;
}

function hideGlossaryPopover() {
  var pop = document.getElementById("glossaryPopover");
  if (!pop) return;
  pop.classList.add("hidden");
  document
    .querySelectorAll(".glossary-term[aria-expanded='true']")
    .forEach(function (el) {
      el.setAttribute("aria-expanded", "false");
    });
}

function showGlossaryPopover(anchor) {
  var key = anchor.getAttribute("data-glossary");
  var entry = GLOSSARY[key];
  if (!entry) {
    var term = lookupClinicalTerm(key);
    if (!term) return;
    var line = "";
    if (term.en && term.en !== term.abbr) {
      line = term.en;
      if (term.ko) line += " · " + term.ko;
    } else if (term.ko) {
      line = term.ko;
    }
    entry = {
      title: term.abbr,
      subtitle: line,
      simple: true
    };
  }

  var pop = getGlossaryPopover();
  pop.innerHTML = buildGlossaryPopoverHtml(entry);
  pop.classList.remove("hidden");
  pop.classList.toggle("glossary-popover--simple", !!entry.simple);
  anchor.setAttribute("aria-expanded", "true");

  var rect = anchor.getBoundingClientRect();
  var popWidth = Math.min(entry.simple ? 260 : 300, window.innerWidth - 24);
  pop.style.width = popWidth + "px";

  var left = rect.left + window.scrollX;
  if (left + popWidth > window.scrollX + window.innerWidth - 12) {
    left = window.scrollX + window.innerWidth - popWidth - 12;
  }
  if (left < window.scrollX + 12) left = window.scrollX + 12;

  pop.style.left = left + "px";
  pop.style.top = rect.bottom + window.scrollY + 8 + "px";

  requestAnimationFrame(function () {
    var popRect = pop.getBoundingClientRect();
    if (popRect.bottom > window.innerHeight - 8) {
      var above = rect.top + window.scrollY - popRect.height - 8;
      if (above > window.scrollY + 8) {
        pop.style.top = above + "px";
      }
    }
  });
}

function toggleGlossaryPopover(anchor) {
  var pop = document.getElementById("glossaryPopover");
  var open =
    pop &&
    !pop.classList.contains("hidden") &&
    anchor.getAttribute("aria-expanded") === "true";

  hideGlossaryPopover();
  if (!open) showGlossaryPopover(anchor);
}

function initGlossary() {
  document.addEventListener("click", function (e) {
    var closeBtn = e.target.closest(".glossary-popover-close");
    if (closeBtn) {
      hideGlossaryPopover();
      return;
    }

    var termBtn = e.target.closest(".glossary-term");
    if (termBtn) {
      e.preventDefault();
      toggleGlossaryPopover(termBtn);
      return;
    }

    var pop = document.getElementById("glossaryPopover");
    if (pop && !pop.classList.contains("hidden") && !pop.contains(e.target)) {
      hideGlossaryPopover();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") hideGlossaryPopover();
  });

  window.addEventListener("scroll", hideGlossaryPopover, { passive: true });
  window.addEventListener("resize", hideGlossaryPopover);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGlossary);
} else {
  initGlossary();
}
