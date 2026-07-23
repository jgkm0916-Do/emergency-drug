/* Pocket Guide — Drug Library data
 * studyId는 E-cart / Home tip 연동용. 용량·희석 수치는 기존 학습 카드·병원 TIP을 재사용.
 */
var POCKET_GUIDE_DRUGS = [
  {
    id: "epinephrine",
    title: "Epinephrine",
    code: "MEPI",
    images: [{ src: "images/MEPI.jpg", alt: "Epinephrine" }],
    when: [
      {
        title: "Cardiac Arrest",
        ko: "심정지",
        detail: "VF/pVT · PEA · Asystole"
      },
      {
        title: "Anaphylaxis",
        ko: "아나필락시스"
      }
    ],
    purpose: ["관상동맥 관류압 증가", "심근 수축력 증가", "혈관수축"],
    checklist: [
      "CPR 진행 확인",
      "Route 확인 (심정지: IV/IO)",
      "NS 20 mL Flush 준비",
      "ECG / BP"
    ],
    admin: {
      route: "IV / IO (Cardiac Arrest)",
      rate: "Bolus · 3–5분 간격 반복 (심정지)",
      pump: "해당 없음 (bolus)",
      monitoring: "ECG · BP · ROSC"
    },
    mix: {
      hospital: true,
      lines: [
        { label: "상황", value: "Cardiac Arrest Dose (심정지 시 투여)" },
        { label: "Adult", value: "1 mg IV/IO" },
        { label: "반복", value: "3–5분 간격" },
        { label: "Flush", value: "NS 20 mL Flush" }
      ],
      note:
        "Anaphylaxis는 IM(대퇴 전외측) 투여로, 심정지 IV/IO bolus와 경로·용량이 다릅니다. 아나필락시스 용량은 의사 처방 및 병원 지침을 확인하세요."
    },
    cautions: ["빈맥", "고혈압", "부정맥", "심근 허혈", "적응증별 투여 경로·용량 혼동 주의"],
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
    when: [
      { title: "Stable SVT", ko: "안정형 상심실성 빈맥" }
    ],
    purpose: ["AV node 순간 차단", "리듬 전환"],
    checklist: ["Stable SVT 확인", "큰 정맥 Route", "ECG", "NS 20 mL Flush 즉시 준비"],
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
        { label: "핵심", value: "Push → 즉시 NS 20 mL Flush" }
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
    when: [
      { title: "AFib", ko: "심방세동", detail: "병원 지침" },
      { title: "Refractory VF/pVT", ko: "불응성 심실세동·무맥성 심실빈맥" }
    ],
    purpose: ["심실성 부정맥 억제", "리듬 안정화"],
    checklist: ["적응증 확인 (AFib vs VT/VF)", "MCDR·수액 코드 확인", "ECG · BP", "Infusion rate 구간 확인"],
    admin: {
      route: "IV",
      rate: "AFib: Loading 10min 후 24hr 구간별 infusion",
      pump: "Infusion 시 Pump 사용",
      monitoring: "ECG · BP · QT"
    },
    mix: {
      hospital: true,
      form: "150mg/3ml/Amp (MCDR)",
      groups: [
        {
          title: "AFib · 병동 실무 세팅",
          subtitle: "본원 IMC 처방 기준",
          tone: "afib",
          lines: [
            { label: "Loading dose", value: "MCDR 1@ + MNS100B (10min)" },
            { label: "Maintenance dose", value: "MCDR 6@(900mg) + NS 1L (24hr)" },
            { label: "IV→PO 전환", value: "24hr 종료 후 코다론정(DCDR) 1T 복용 시작" }
          ]
        },
        {
          title: "VF / VT · 심정지 투여",
          subtitle: "Pulseless VT/VF 기준",
          tone: "arrest",
          lines: [
            { label: "1st", value: "300mg + 5DW 20mL IV" },
            { label: "2nd", value: "150mg + 5DW 20mL IV" }
          ]
        }
      ],
      note: "적응증에 맞는 구간만 확인하세요. AFib ≠ VF/VT. 위 세팅값은 병동 관행값으로, 처방 mg과 환자 상태에 따라 반드시 재계산·재확인하세요."
    },
    cautions: [
      "QT prolongation",
      "Hypotension",
      "Bradycardia",
      "24h 총량 2.2g 초과 주의",
      "세팅값은 편의상 반올림된 값 — 처방 mg 기준으로 반드시 재확인",
      "IV 24hr 종료 후 코다론정(DCDR) 경구 전환 스케줄 확인"
    ],
    pediatric: ["의사 처방·체중 기반 투여 확인"],
    pediatricSource: "hospital"
  },
  {
    id: "calcium",
    title: "Calcium Gluconate",
    code: "MCAGLU",
    images: [{ src: "images/MCAGLU.jpg", alt: "Calcium Gluconate" }],
    when: [
      { title: "Hyperkalemia", ko: "고칼륨혈증", detail: "ECG 변화 동반 시" }
    ],
    purpose: ["심근세포막 안정화"],
    checklist: ["ECG 변화 확인", "적응증 확인", "IV 확보", "칼륨 제거약 아님 인지"],
    admin: {
      route: "IV",
      rate: "IV slow",
      pump: "필요 시 의사 처방 및 병원 지침 확인",
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
    pediatric: ["체중·의사 처방 기반 투여 확인"],
    pediatricSource: "ref"
  },
  {
    id: "bicarbonate",
    title: "Sodium Bicarbonate",
    code: "MBIVON",
    images: [{ src: "images/MBIVON.jpg", alt: "Sodium Bicarbonate" }],
    when: [
      {
        title: "대사성 산증을 동반한 고칼륨혈증",
        detail: "무조건 투여하지 않음 · 산–염기 상태 확인 후 고려"
      },
      {
        title: "특정 약물 중독",
        detail: "삼환계 항우울제 등 sodium-channel blocker 중독"
      }
    ],
    purpose: [
      "대사성 산증 교정",
      "산증이 동반된 고칼륨혈증에서 K의 세포 내 이동 보조"
    ],
    checklist: ["산증 동반 여부", "적응증 확인", "ABGA", "무조건 투여 금지"],
    admin: {
      route: "IV",
      rate: "의사 처방에 따름",
      pump: "의사 처방 및 병원 지침 확인",
      monitoring: "ABGA · Na · K"
    },
    mix: {
      hospital: true,
      lines: [
        { label: "제형", value: "1.68g/20ml/amp" },
        { label: "원칙", value: "산증 동반 시 고려" },
        { label: "투여", value: "의사 처방 용량" }
      ]
    },
    cautions: ["무조건 투여 금지", "Na 상승", "K 변화", "라인 상호작용"],
    pediatric: ["체중·의사 처방 기반 투여 확인"],
    pediatricSource: "ref"
  },
  {
    id: "dopamine",
    title: "Dopamine",
    code: "MDOPA",
    images: [{ src: "images/MDOPA.jpg", alt: "Dopamine" }],
    when: [
      { title: "Symptomatic Bradycardia", ko: "증상성 서맥" },
      { title: "Hypotension", ko: "저혈압" }
    ],
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
      note: "일반 권장 기준 · 병원 지침 우선"
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
    when: [
      { title: "Septic Shock", ko: "패혈성 쇼크" },
      { title: "Severe Hypotension", ko: "중증 저혈압" }
    ],
    purpose: ["강한 혈관수축", "MAP 상승", "관류 유지"],
    checklist: ["저혈량 교정", "목표 MAP/BP", "정맥로 상태", "Infusion pump"],
    admin: {
      route: "IV infusion (큰 정맥/중심정맥 권장)",
      rate: "의사 처방에 따라 titration",
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
      { src: "images/M8DOPAM.jpg", alt: "Dopamine Premix M8DOPAM 400mg/500mL" },
      { src: "images/M16DOPAM.jpg", alt: "Dopamine Premix M16DOPAM 800mg/500mL" }
    ],
    when: [
      { title: "Severe Hypotension / Shock", ko: "중증 저혈압·쇼크" }
    ],
    purpose: ["BP 상승", "Perfusion 개선"],
    checklist: ["M8 vs M16 농도 확인", "라벨 총량(mg)·mcg/mL 확인", "Infusion pump", "목표 BP"],
    admin: {
      route: "IV infusion",
      rate: "농도에 맞춰 mL/h 환산",
      pump: "필수 (추가 희석 불필요)",
      monitoring: "BP · HR · 부정맥"
    },
    mix: {
      hospital: true,
      form: "Premix bag 500mL (추가 희석 불필요)",
      groups: [
        {
          title: "M8DOPAM",
          subtitle: "제품명 80mg = 100mL당 함량",
          tone: "afib",
          lines: [
            { label: "Bag 총량", value: "400mg / 500mL" },
            { label: "농도", value: "800 mcg/mL" },
            { label: "특징", value: "Premix · 미세 용량 조절에 유리" }
          ]
        },
        {
          title: "M16DOPAM",
          subtitle: "제품명 160mg = 100mL당 함량",
          tone: "arrest",
          lines: [
            { label: "Bag 총량", value: "800mg / 500mL" },
            { label: "농도", value: "1600 mcg/mL" },
            { label: "특징", value: "Premix · M8보다 농도 2배" }
          ]
        }
      ],
      compare: {
        title: "💉 M8 vs M16",
        headers: ["M8DOPAM", "M16DOPAM"],
        rows: [
          ["400mg / 500mL", "800mg / 500mL"],
          ["800 mcg/mL", "1600 mcg/mL"],
          ["Premix", "Premix"]
        ],
        points: [
          "M16 = M8의 2배 농도",
          "같은 mL/hr에서도 투여량 2배",
          "추가 희석 없이 Pump로 투여"
        ],
        warning:
          "같은 Pump 속도라도 M16은 M8보다 도파민이 2배 투여됩니다."
      },
      note:
        "제품명의 80mg/160mg은 100mL당 함량입니다. Bag 총량·mcg/mL을 라벨에서 확인하세요."
    },
    cautions: [
      "M8/M16 농도 혼동",
      "같은 rate로 농도 다른 bag 투여",
      "Tachycardia",
      "Pump 없이 투여 금지"
    ],
    pediatric: ["체중·의사 처방 기반 투여 확인"],
    pediatricSource: "ref"
  },
  {
    id: "atropine",
    title: "Atropine",
    code: "MAT",
    images: [{ src: "images/MAT.jpg", alt: "Atropine" }],
    when: [
      { title: "Symptomatic Bradycardia", ko: "증상성 서맥", detail: "1차 약물" }
    ],
    purpose: ["미주신경 차단", "심박수 증가"],
    checklist: [
      "서맥 원인/증상 확인",
      "ECG 지속 모니터링",
      "반복 투여 가능 여부 확인"
    ],
    admin: {
      route: "IV / IO bolus",
      rate: "Bolus (의사 처방)",
      pump: "해당 없음 (bolus)",
      monitoring: "HR · BP · ECG"
    },
    mix: {
      hospital: true,
      lines: [
        { label: "제형", value: "0.5mg/1ml/amp" },
        { label: "Adult", value: "1mg IV" },
        { label: "반복", value: "3–5분 간격 · 최대 총량 3mg" }
      ]
    },
    cautions: [
      "급성 심근허혈 — 심박수 과증가로 허혈 악화 가능",
      "3도 AV block / 이식 심장 — 효과 제한적일 수 있음"
    ],
    pediatric: ["0.02mg/kg IV", "0.04–0.06mg/kg ET"],
    pediatricSource: "hospital"
  }
];
