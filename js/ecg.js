/* ECG SVG path 데이터와 ECG 표시 관련 함수 */

var ECG_PATHS = {
  /* 고칼륨: tent-shaped peaked T, 약간 넓은 QRS (한 박자 300u) */
  hyperkalemia:
    "M0 46 L68 46 C74 46 78 44 84 40 C90 43 94 46 100 46 L112 46 L116 49 L120 47 L126 31 L136 53 L142 46 L154 46 C168 46 176 42 188 28 C196 14 202 7 208 14 C216 28 228 46 242 46 L300 46 " +
    "M300 46 L368 46 C374 46 378 44 384 40 C390 43 394 46 400 46 L412 46 L416 49 L420 47 L426 31 L436 53 L442 46 L454 46 C468 46 476 42 488 28 C496 14 502 7 508 14 C516 28 528 46 542 46 L600 46 " +
    "M600 46 L668 46 C674 46 678 44 684 40 C690 43 694 46 700 46 L712 46 L716 49 L720 47 L726 31 L736 53 L742 46 L754 46 C768 46 776 42 788 28 C796 14 802 7 808 14 C816 28 828 46 842 46 L900 46 " +
    "M900 46 L968 46 C974 46 978 44 984 40 C990 43 994 46 1000 46 L1012 46 L1016 49 L1020 47 L1026 31 L1036 53 L1042 46 L1054 46 C1068 46 1076 42 1088 28 C1096 14 1102 7 1108 14 C1116 28 1128 46 1142 46 L1200 46"
};

function applyEcg(scenario) {
  document.getElementById("ecgLine").setAttribute("d", scenario.ecg);
  var ecgSvg = document.querySelector(".ecg svg");
  var beatPx = scenario.ecgBeatWidth != null ? scenario.ecgBeatWidth : 300;
  var hrNum = parseInt(String(scenario.hr || "60").replace(/[^\d]/g, ""), 10) || 60;
  var secPerBeat = Math.min(3, Math.max(0.3, 60 / hrNum));
  ecgSvg.style.setProperty("--ecg-shift", "-" + beatPx + "px");
  ecgSvg.style.setProperty("--ecg-dur", secPerBeat + "s");
}
