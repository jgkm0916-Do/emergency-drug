/* Pocket Guide — Drug Library data
 * studyId는 E-cart / Home tip 연동용. 프로토콜 수치는 기존 학습 카드·병원 TIP을 재사용.
 */
var POCKET_GUIDE_DRUGS = [
  {
    id: "epinephrine",
    title: "Epinephrine",
    code: "MEPI",
    images: [{ src: "images/MEPI.jpg", alt: "Epinephrine" }],
    when: ["Cardiac Arrest", "Pulseless VT/VF", "CPR"],
    purpose: ["관상동맥 관류압 증가", "심근 수축력 증가", "혈관수축"],
    checklist: ["CPR 진행 확인", "Route (IV/IO)", "Flush 준비", "ECG / BP"],
    admin: {
      route: "IV / IO",
      rate: "Bolus (프로토콜)",
      pump: "해당 없음 (bolus)",
      monitoring: "ECG · BP · ROSC"
    },
    mix: {
      hospital: true,
      lines: [
        { label: "제형", value: "1mg/1ml/amp" },
        { label: "Adult", value: "1mg IV" },
        { label: "투여", value: "IV/IO + Flush" }
      ]
    },
    cautions: ["빈맥", "고혈압", "부정맥", "심근 허혈"],
    pediatric: [
      "0.01mg/kg IV (1:1,000)",
      "0.1ml/kg IV (1:10,000)",
      "최대 1mg IV",
      "0.1mg/kg (1:1,000) ET · ET 최대 10mg"
    ],
    pediatricSource: "hospital"
  },
  {
    id: "adenosine",
    title: "Adenosine",
    code: "MADEN",
    images: [{ src: "images/MADEN.jpg", alt: "Adenosine" }],
    when: ["Stable SVT"],
    purpose: ["AV node 순간 차단", "리듬 전환"],
    checklist: ["Stable SVT 확인", "큰 정맥 Route", "ECG", "Flush 즉시 준비"],
    admin: {
      route: "IV (큰 정맥·근위부)",
      rate: "빠른 IV Push",
      pump: "해당 없음 (bolus)",
      monitoring: "ECG (일시적 asystole 가능)"
    },
    mix: {
      hospital: true,
      lines: [
        { label: "제형", value: "6mg/2ml/vial" },
        { label: "1st", value: "6mg IV push" },
        { label: "2nd", value: "12mg (1–2분 후 필요 시)" },
        { label: "핵심", value: "Push → 즉시 Flush" }
      ]
    },
    cautions: ["안면홍조", "흉통", "호흡곤란", "일시적 asystole"],
    pediatric: ["0.1–0.2mg/kg"],
    pediatricSource: "hospital"
  },
  {
    id: "amiodarone",
    title: "Amiodarone",
    code: "MCDR",
    images: [{ src: "images/MCDR.jpg", alt: "Amiodarone" }],
    when: ["Pulseless VT/VF", "VT", "Recurrent ventricular arrhythmia"],
    purpose: ["심실성 부정맥 억제", "리듬 안정화"],
    checklist: ["적응증 확인", "용량(300/150) 구분", "ECG · BP", "희석·속도 확인"],
    admin: {
      route: "IV",
      rate: "Bolus / Infusion (프로토콜)",
      pump: "Infusion 시 Pump 사용",
      monitoring: "ECG · BP · QT"
    },
    mix: {
      hospital: true,
      lines: [
        { label: "제형", value: "150mg/3ml/Amp" },
        { label: "VF/VT 1st", value: "300mg + 5DW 20mL IV" },
        { label: "VF/VT 2nd", value: "150mg + 5DW 20mL IV" },
        { label: "VT", value: "150mg IV over 10 min" },
        { label: "Infusion", value: "1mg/min 6h → 0.5mg/min" }
      ]
    },
    cautions: ["QT prolongation", "Hypotension", "Bradycardia", "24h 총량 2.2g 초과 주의"],
    pediatric: ["병원 프로토콜·체중 기반 투여 확인"],
    pediatricSource: "hospital"
  },
  {
    id: "calcium",
    title: "Calcium Gluconate",
    code: "MCAGLU",
    images: [{ src: "images/MCAGLU.jpg", alt: "Calcium Gluconate" }],
    when: ["Hyperkalemia + ECG 변화"],
    purpose: ["심근세포막 안정화"],
    checklist: ["ECG 변화 확인", "적응증 확인", "IV 확보", "칼륨 제거약 아님 인지"],
    admin: {
      route: "IV",
      rate: "IV slow",
      pump: "필요 시 프로토콜 확인",
      monitoring: "ECG 지속 관찰"
    },
    mix: {
      hospital: true,
      lines: [
        { label: "제형", value: "2g/20ml/amp (3%)" },
        { label: "목적", value: "Membrane stabilization" },
        { label: "투여", value: "IV slow" }
      ]
    },
    cautions: ["칼륨 제거 아님", "ECG 변화 지속 관찰", "혈관 자극"],
    pediatric: ["체중·프로토콜 기반 투여 확인"],
    pediatricSource: "ref"
  },
  {
    id: "bicarbonate",
    title: "Sodium Bicarbonate",
    code: "MBIVON",
    images: [{ src: "images/MBIVON.jpg", alt: "Sodium Bicarbonate" }],
    when: ["산증 동반 시 고려", "특정 독성·고칼륨 프로토콜"],
    purpose: ["산증 완화", "K 세포 내 이동 보조"],
    checklist: ["산증 동반 여부", "적응증 확인", "ABGA", "무조건 투여 금지"],
    admin: {
      route: "IV",
      rate: "프로토콜에 따름",
      pump: "프로토콜 확인",
      monitoring: "ABGA · Na · K"
    },
    mix: {
      hospital: true,
      lines: [
        { label: "제형", value: "1.68g/20ml/amp" },
        { label: "원칙", value: "산증 동반 시 고려" },
        { label: "투여", value: "프로토콜 용량" }
      ]
    },
    cautions: ["무조건 투여 금지", "Na 상승", "K 변화", "라인 상호작용"],
    pediatric: ["체중·프로토콜 기반 투여 확인"],
    pediatricSource: "ref"
  },
  {
    id: "dopamine",
    title: "Dopamine",
    code: "MDOPA",
    images: [{ src: "images/MDOPA.jpg", alt: "Dopamine" }],
    when: ["Hypotension", "Symptomatic Bradycardia"],
    purpose: ["BP 상승", "HR 증가", "관류 개선"],
    checklist: ["목표 BP/HR", "라벨·농도 확인", "Infusion pump", "정맥로 상태"],
    admin: {
      route: "IV infusion",
      rate: "처방에 따라 titration",
      pump: "필수",
      monitoring: "BP · HR · 부정맥"
    },
    mix: {
      hospital: false,
      lines: [
        { label: "제형", value: "제품 라벨 확인 (앰플)" },
        { label: "참고", value: "일반적으로 5–20 mcg/kg/min" },
        { label: "투여", value: "Infusion Pump" }
      ],
      note: "일반 권장 기준 · 병원 프로토콜 우선"
    },
    cautions: ["Tachycardia", "부정맥", "조직 허혈", "Pump 없이 투여 금지"],
    pediatric: ["체중 기반 지속 정주 (일반적으로 5–20 mcg/kg/min)"],
    pediatricSource: "ref"
  },
  {
    id: "norepinephrine",
    title: "Norepinephrine",
    code: "MLEVO",
    images: [{ src: "images/MLEVO.jpg", alt: "Norepinephrine" }],
    when: ["Septic Shock", "Severe Hypotension"],
    purpose: ["강한 혈관수축", "MAP 상승", "관류 유지"],
    checklist: ["저혈량 교정", "목표 MAP/BP", "정맥로 상태", "Infusion pump"],
    admin: {
      route: "IV infusion (큰 정맥/중심정맥 권장)",
      rate: "처방·프로토콜에 따라 titration",
      pump: "필수",
      monitoring: "MAP/BP · HR · 주입 부위"
    },
    mix: {
      hospital: true,
      highlight: true,
      bag: "5% DW 500mL",
      drug: "MLEVO 4 amp",
      lines: [
        { label: "활성 성분", value: "16 mg (4 mg × 4 amp)" },
        { label: "기준 농도", value: "32 mcg/mL (활성 성분 기준)" },
        { label: "투여", value: "Infusion Pump" }
      ],
      note: "라벨 8mg ≠ 활성 NE 8mg · 1 amp는 NE 4mg로 계산"
    },
    cautions: ["Extravasation", "조직괴사", "갑자기 중단 금지", "말초 허혈"],
    pediatric: ["체중 기반 지속 정주 · 목표 혈압에 따라 titration"],
    pediatricSource: "ref"
  },
  {
    id: "dopamine-premix",
    title: "Dopamine Premix",
    code: "M8DOPAM / M16DOPAM",
    images: [
      { src: "images/M8DOPAM.jpg", alt: "Dopamine Premix 800mg" },
      { src: "images/M16DOPAM.jpg", alt: "Dopamine Premix 1600mg" }
    ],
    when: ["Severe Hypotension", "Shock"],
    purpose: ["BP 상승", "Perfusion 개선"],
    checklist: ["800 vs 1600 농도 확인", "라벨 확인", "Infusion pump", "목표 BP"],
    admin: {
      route: "IV infusion",
      rate: "농도에 맞춰 mL/h 환산",
      pump: "필수",
      monitoring: "BP · HR · 부정맥"
    },
    mix: {
      hospital: true,
      lines: [
        { label: "M8DOPAM", value: "800mg/500ml/bag" },
        { label: "M16DOPAM", value: "제품 라벨 확인" },
        { label: "투여", value: "Infusion Pump" }
      ],
      note: "800mg / 1600mg 농도를 반드시 구분"
    },
    cautions: ["농도 혼동", "Tachycardia", "Pump 없이 투여 금지"],
    pediatric: ["체중·프로토콜 기반 투여 확인"],
    pediatricSource: "ref"
  }
];
