/* 병원 실무 TIP — Pocket Guide Accordion용 (암기 카드)
 * studyId 키. 프로토콜 변경 시 이 파일만 수정.
 *
 * Schema:
 * {
 *   rememberFirst: string,  // ⭐ 먼저 기억!
 *   wrong: string,          // ❌ 잘못된 계산/실수
 *   right: string,          // ⭕ 올바른 방법
 *   educatorTip: string     // 💡 교육간호사 TIP
 * }
 */
var HOSPITAL_TIPS = {
  norepinephrine: {
    rememberFirst:
      "큐프린주는 8mg로 표시되지만, 투여량 계산은 Norepinephrine 4mg 기준으로 한다.",
    wrong: "MLEVO 4@ (활성성분 Norepinephrine 32mg로 오인)",
    right: "MLEVO 4@ (활성성분 Norepinephrine 16mg가 정확)",
    educatorTip: "라벨의 숫자보다 활성 성분을 먼저 확인한다."
  },
  calcium: {
    rememberFirst: "Calcium은 칼륨을 제거하는 약이 아니다.",
    wrong: "고칼륨 → Calcium으로 K를 뺀다",
    right: "ECG 변화 시 심근세포막 안정화 목적",
    educatorTip: "Calcium은 심근세포막을 안정화한다."
  },
  epinephrine: {
    rememberFirst: "약보다 CPR이 먼저다.",
    wrong: "Epinephrine 주려고 CPR을 멈춤",
    right: "CPR 유지하며 IV/IO 투여 + Flush",
    educatorTip: "관상동맥 관류압을 올리는 핵심은 중단 없는 CPR이다."
  },
  adenosine: {
    rememberFirst: "Adenosine은 빠르게 투여하고 즉시 Flush.",
    wrong: "Push 후 Flush를 늦게 함",
    right: "빠른 Push → 즉시 Flush → ECG 확인",
    educatorTip: "반감기가 짧다. 속도가 효과를 좌우한다."
  },
  amiodarone: {
    rememberFirst:
      "AFib 우리 병원: ① MCDR 1@+MNS100B(10min) → ② MCDR 6@+NS1L(24hr)",
    right: [
      {
        label: "Maintenance dose 주입 속도",
        value: "360mg/6hr → 540mg/18hr",
        emphasize: false
      },
      {
        label: "6hr 구간",
        value: "360mg ÷ 0.9mg/mL = 66.7cc/hr → 약 67cc/hr",
        emphasize: true
      },
      {
        label: "18hr 구간",
        value: "540mg ÷ 0.9mg/mL = 33.3cc/hr → 약 33cc/hr",
        emphasize: true
      }
    ],
    educatorTip:
      "Loading(10min) 후 구간별 rate(약 67 → 약 33)를 반드시 확인한다. IV 종료 후 코다론정(DCDR) 경구 전환도 잊지 말 것."
  },
  bicarbonate: {
    rememberFirst: "산증이 동반될 때 고려하며, 무조건 투여하지 않는다.",
    wrong: "심정지면 무조건 Bicarb",
    right: "적응증·ABGA 확인 후 프로토콜 투여",
    educatorTip: "먼저 ‘왜 주는가’를 확인한다."
  },
  dopamine: {
    rememberFirst: "Dopamine은 Infusion Pump로 투여한다.",
    wrong: "일반 수액처럼 중력 점적",
    right: "Pump + BP/HR 지속 감시",
    educatorTip: "Tachycardia·부정맥을 반드시 관찰한다."
  },
  "dopamine-premix": {
    rememberFirst:
      "M8 = 400mg/500mL (800 mcg/mL), M16 = 800mg/500mL (1600 mcg/mL)",
    wrong: "제품명 80mg/160mg을 bag 총량으로 오인하거나, 같은 rate로 투여",
    right: "M16은 M8의 2배 농도 · 같은 mL/hr면 투여량 2배",
    educatorTip: "라벨의 총량(mg)과 mcg/mL을 먼저 확인한다."
  }
};
