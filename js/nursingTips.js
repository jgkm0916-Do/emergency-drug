/* Today's Nursing Tip — shared education tips for Home
 * Linked to Drug Library via studyId.
 * related[].action: "study" | "cheat"
 */
var NURSING_TIPS = [
  {
    id: "epinephrine",
    studyId: "epinephrine",
    title: "Epinephrine",
    code: "MEPI",
    before: [
      "CPR 진행 여부·투여 시점 확인",
      "적응증 확인 (cardiac arrest / pulseless VT·VF)",
      "Route 확인 (IV/IO)",
      "Flush 준비"
    ],
    during: [
      "CPR을 멈추지 않고 투여",
      "IV 또는 IO 투여",
      "투여 후 즉시 Flush",
      "모니터 확인"
    ],
    after: ["ROSC 여부", "ECG", "BP", "HR"],
    mistake: "Epinephrine 투여를 위해 CPR을 멈춤",
    memory: "약보다 CPR이 먼저다.",
    related: [
      { label: "CPR", action: "cheat", id: "cheat-cpr" },
      { label: "Drug Library", action: "study", id: "epinephrine" }
    ]
  },
  {
    id: "adenosine",
    studyId: "adenosine",
    title: "Adenosine",
    code: "MADEN",
    before: [
      "Stable SVT 여부 확인",
      "큰 정맥·근위부 Route 확인",
      "ECG monitoring 준비",
      "Flush 즉시 투여 준비"
    ],
    during: [
      "빠른 IV Push",
      "즉시 Flush",
      "ECG monitoring",
      "일시적 asystole 가능함을 인지"
    ],
    after: ["리듬 전환 여부", "ECG", "증상 변화", "BP"],
    mistake: "Adenosine 투여 후 Flush를 늦게 함",
    memory: "빠르게 투여하고 더 빠르게 Flush.",
    related: [
      { label: "SVT", action: "cheat", id: "cheat-svt" },
      { label: "Drug Library", action: "study", id: "adenosine" }
    ]
  },
  {
    id: "amiodarone",
    studyId: "amiodarone",
    title: "Amiodarone",
    code: "MCDR",
    before: [
      "VT/VF·적응증 확인",
      "용량 구분 (300 mg / 150 mg)",
      "희석·투여 속도 확인",
      "ECG·BP 모니터링 준비"
    ],
    during: [
      "의사 처방 용량·속도로 투여",
      "ECG monitoring",
      "BP 확인",
      "Infusion 전환 시 속도 재확인"
    ],
    after: ["리듬 안정화", "ECG", "BP", "QT prolongation"],
    mistake: "QT prolongation 확인을 놓침",
    memory: "QT prolongation을 반드시 확인한다.",
    related: [
      { label: "CPR", action: "cheat", id: "cheat-cpr" },
      { label: "Drug Library", action: "study", id: "amiodarone" }
    ]
  },
  {
    id: "calcium",
    studyId: "calcium",
    title: "Calcium Gluconate",
    code: "MCAGLU",
    before: [
      "Hyperkalemia + ECG 변화 확인",
      "적응증 확인",
      "IV 확보",
      "ECG 지속 관찰 준비"
    ],
    during: [
      "IV slow 투여",
      "ECG 변화 관찰",
      "투여 속도·경로 확인"
    ],
    after: ["ECG 변화", "BP", "증상", "K 재검 일정 확인"],
    mistake: "Calcium을 칼륨 제거약으로 생각함",
    memory: "Calcium은 심근세포막을 안정화한다.",
    related: [
      { label: "Hyperkalemia", action: "cheat", id: "cheat-hyperkalemia" },
      { label: "Drug Library", action: "study", id: "calcium" }
    ]
  },
  {
    id: "bicarbonate",
    studyId: "bicarbonate",
    title: "Sodium bicarbonate",
    code: "MBIVON",
    before: [
      "산증 동반 여부 확인",
      "적응증 확인 (무조건 투여하지 않음)",
      "ABGA·전해질 확인",
      "IV 확보"
    ],
    during: [
      "의사 처방에 따른 IV 투여",
      "투여 후 재평가",
      "다른 약물과의 상호작용·라인 확인"
    ],
    after: ["ABGA", "Na", "K", "임상 반응"],
    mistake: "산증 확인 없이 무조건 투여함",
    memory: "산증이 동반될 때 고려하며, 무조건 투여하지 않는다.",
    related: [
      { label: "Hyperkalemia", action: "cheat", id: "cheat-hyperkalemia" },
      { label: "CPR", action: "cheat", id: "cheat-cpr" },
      { label: "Drug Library", action: "study", id: "bicarbonate" }
    ]
  },
  {
    id: "dopamine",
    studyId: "dopamine",
    title: "Dopamine",
    code: "MDOPA",
    before: [
      "목표 BP·HR 확인",
      "제품 라벨·농도 확인",
      "Infusion pump 준비",
      "정맥로 상태 확인"
    ],
    during: [
      "Infusion pump 사용",
      "처방 rate 확인",
      "BP monitoring",
      "HR monitoring"
    ],
    after: ["BP 반응", "HR", "부정맥·tachycardia", "Infusion rate 재확인"],
    mistake: "Dopamine을 Pump 없이 투여",
    memory: "Dopamine 투여 중에는 tachycardia·부정맥을 반드시 관찰한다.",
    related: [
      { label: "Bradycardia", action: "cheat", id: "cheat-bradycardia" },
      { label: "Shock", action: "cheat", id: "cheat-shock" },
      { label: "Drug Library", action: "study", id: "dopamine" }
    ]
  },
  {
    id: "norepinephrine",
    studyId: "norepinephrine",
    title: "Norepinephrine",
    code: "MLEVO",
    before: [
      "저혈량 교정 여부 확인",
      "목표 MAP 또는 목표 혈압 확인",
      "투여 경로와 정맥로 상태 확인",
      "Infusion pump 준비"
    ],
    during: [
      "Infusion pump를 사용",
      "BP와 MAP을 지속적으로 모니터링",
      "말초정맥 투여 시 주입 부위를 자주 확인",
      "가능하면 큰 정맥 또는 중심정맥로 사용",
      "처방에 따라 서서히 적정"
    ],
    after: [
      "MAP/BP 반응",
      "HR 및 부정맥",
      "말초순환과 피부색",
      "소변량",
      "주입 부위의 통증, 창백, 부종, 냉감"
    ],
    mistake: "혈압 수치만 보고 주입 부위 확인을 놓침 · 중력 투여 · 갑자기 중단",
    memory:
      "Norepinephrine은 혈압만 올리는 약이 아니라, 지속적인 혈압 감시와 혈관 외 유출 관찰이 함께 필요한 약물이다.",
    related: [
      { label: "Shock", action: "cheat", id: "cheat-shock" },
      { label: "Drug Library", action: "study", id: "norepinephrine" }
    ]
  },
  {
    id: "dopamine-premix",
    studyId: "dopamine-premix",
    title: "Dopamine Premix",
    code: "M8DOPAM / M16DOPAM",
    before: [
      "M8 vs M16 농도 구분 (800 vs 1600 mcg/mL)",
      "제품 라벨 총량 확인",
      "Infusion pump 준비",
      "목표 혈압 확인"
    ],
    during: [
      "Infusion pump 사용",
      "농도에 맞는 rate 확인",
      "BP monitoring",
      "HR monitoring"
    ],
    after: ["BP 반응", "HR", "부정맥", "Infusion rate 재확인"],
    mistake: "M8/M16 농도를 구분하지 않고 같은 rate로 투여",
    memory:
      "Dopamine Premix는 M8(800 mcg/mL)과 M16(1600 mcg/mL) 농도를 반드시 구분한다.",
    related: [
      { label: "Shock", action: "cheat", id: "cheat-shock" },
      { label: "Drug Library", action: "study", id: "dopamine-premix" }
    ]
  }
];
