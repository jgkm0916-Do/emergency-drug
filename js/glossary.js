/* H's & T's 등 임상 약어 글로서리 */

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

var GLOSSARY_HS_TS_RE = /H[''\u2019]s\s*&\s*T[''\u2019]s/g;

function linkifyGlossaryTerms(text) {
  if (text == null || text === "") return text;
  return String(text).replace(GLOSSARY_HS_TS_RE, function (match) {
    return (
      '<button type="button" class="glossary-term" data-glossary="hs-ts" aria-expanded="false">' +
      '<span class="glossary-term-label">' +
      match +
      "</span>" +
      '<span class="glossary-term-icon" aria-hidden="true">ⓘ</span>' +
      "</button>"
    );
  });
}

function getGlossaryPopover() {
  var pop = document.getElementById("glossaryPopover");
  if (pop) return pop;

  pop = document.createElement("div");
  pop.id = "glossaryPopover";
  pop.className = "glossary-popover hidden";
  pop.setAttribute("role", "dialog");
  pop.setAttribute("aria-label", "H's & T's");
  document.body.appendChild(pop);
  return pop;
}

function buildGlossaryPopoverHtml(entry) {
  var html =
    '<div class="glossary-popover-head">' +
    '<span class="glossary-popover-title">' +
    entry.title +
    "</span>" +
    '<span class="glossary-popover-sub">' +
    entry.subtitle +
    "</span>" +
    '<button type="button" class="glossary-popover-close" aria-label="닫기">×</button>' +
    "</div>";

  entry.groups.forEach(function (group) {
    html += '<div class="glossary-group">';
    html += '<div class="glossary-group-label">' + group.label + "</div>";
    html += '<ul class="glossary-list">';
    group.items.forEach(function (item) {
      html +=
        '<li><span class="glossary-en">' +
        item.en +
        '</span><span class="glossary-ko">' +
        item.ko +
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
  document.querySelectorAll(".glossary-term[aria-expanded='true']").forEach(function (el) {
    el.setAttribute("aria-expanded", "false");
  });
}

function showGlossaryPopover(anchor) {
  var key = anchor.getAttribute("data-glossary");
  var entry = GLOSSARY[key];
  if (!entry) return;

  var pop = getGlossaryPopover();
  pop.innerHTML = buildGlossaryPopoverHtml(entry);
  pop.classList.remove("hidden");
  anchor.setAttribute("aria-expanded", "true");

  var rect = anchor.getBoundingClientRect();
  var popWidth = Math.min(300, window.innerWidth - 24);
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

    var term = e.target.closest(".glossary-term");
    if (term) {
      e.preventDefault();
      toggleGlossaryPopover(term);
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
