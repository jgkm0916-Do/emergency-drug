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
    rememberFirst: "QT prolongation을 반드시 확인한다.",
    wrong: "용량(300/150)·Infusion 속도 혼동",
    right: "적응증별 용량 구분 + ECG/BP 감시",
    educatorTip: "리듬 안정화가 목적이다. QT·혈압을 함께 본다."
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
    rememberFirst: "800mg과 1600mg 농도를 반드시 구분한다.",
    wrong: "Bag 종류만 보고 rate를 그대로 씀",
    right: "라벨 농도 확인 → mL/h 환산 → Pump",
    educatorTip: "Premix는 농도 확인이 투여의 시작이다."
  }
};
