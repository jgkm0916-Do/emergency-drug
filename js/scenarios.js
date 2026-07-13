/* 교육과정형 시나리오 데이터
 *
 * scenarios = { categoryId: [case, case, ...] }
 * CATEGORY_META = 카테고리 화면/진행률용 메타데이터
 *
 * 새 카테고리 추가 방법:
 * 1) CATEGORY_META에 항목 추가 (id, title, description, icon)
 * 2) scenarios[id]에 CASE 배열 추가 (각 CASE는 steps 3개)
 * 3) 필요 시 ECG_PATHS에 파형 추가
 */

var CATEGORY_META = [
  {
    id: "cardiacArrest",
    title: "Cardiac Arrest / CPR",
    shortTitle: "Cardiac Arrest",
    description: "심정지 상황에서 약물 선택 훈련",
    icon: "heart"
  },
  {
    id: "svt",
    title: "Tachyarrhythmia / SVT",
    shortTitle: "Tachyarrhythmia / SVT",
    description: "안정·불안정 빈맥에서 판단 훈련",
    icon: "zap"
  },
  {
    id: "bradycardia",
    title: "Bradycardia",
    shortTitle: "Bradycardia",
    description: "증상성 서맥·저심박출 약물 훈련",
    icon: "activity"
  },
  {
    id: "shock",
    title: "Shock / Hypotension",
    shortTitle: "Shock / Hypotension",
    description: "패혈성 쇼크·저혈압 승압제 훈련",
    icon: "droplet"
  },
  {
    id: "hyperkalemia",
    title: "Hyperkalemia",
    shortTitle: "Hyperkalemia",
    description: "고칼륨혈증 심근 안정화·이동 훈련",
    icon: "flask"
  }
];

var COMPREHENSIVE_META = {
  id: "comprehensive",
  title: "종합평가 (Random)",
  shortTitle: "종합평가",
  description: "전체 상황에서 무작위 5 CASE 평가",
  icon: "trophy",
  caseCount: 5
};

function step(question, options, answer, correct, wrong, rationale, learningPoint) {
  return {
    question: question,
    options: options,
    answer: answer,
    correct: correct,
    wrong: wrong,
    rationale: rationale,
    learningPoint: learningPoint
  };
}

var scenarios = {

  /* ---------- Cardiac Arrest / CPR ---------- */
  cardiacArrest: [
    {
      id: "ca-vf",
      caseLabel: "CASE 1 · VF",
      title: "VF",
      text: "72세 남성. 검사실에서 갑자기 쓰러졌습니다. 맥박이 없고 CPR 중이며, 모니터상 VF가 확인됩니다.",
      hr: "0",
      bp: "측정불가",
      spo2: "—",
      ecgBeatWidth: 120,
      ecgKey: "vf",
      steps: [
        step(
          "STEP 1. VF에서 약물보다 먼저 해야 할 처치는?",
          ["즉시 제세동 + 고품질 CPR", "Adenosine (MADEN) 투여", "Calcium gluconate (MCAGLU) 투여"],
          "즉시 제세동 + 고품질 CPR",
          "정답입니다. VF는 충격 가능 리듬으로 제세동과 고품질 CPR이 우선입니다.",
          "VF에서는 약물보다 제세동과 CPR이 우선입니다.",
          "AHA ACLS에서 VF/pVT의 핵심은 defibrillation입니다.",
          "무맥성 리듬과 맥박이 있는 리듬을 항상 구분하세요."
        ),
        step(
          "STEP 2. CPR 중 우선 고려하는 핵심 약물은?",
          ["Epinephrine (MEPI)", "Adenosine (MADEN)", "Dopamine premix (M8DOPAM)"],
          "Epinephrine (MEPI)",
          "정답입니다. Cardiac arrest에서 Epinephrine은 관상동맥 관류압을 올리는 핵심 약물입니다.",
          "심정지 시 1차 고려 약물은 Epinephrine(MEPI)입니다.",
          "Epinephrine의 α-작용은 관상동맥·뇌 관류압 유지에 기여합니다.",
          "투여 시점, route, flush 확인이 간호 핵심입니다."
        ),
        step(
          "STEP 3. Refractory VF에서 추가로 고려할 수 있는 약물은?",
          ["Amiodarone (MCDR)", "Norepinephrine (MLEVO)", "Sodium bicarbonate (MBIVON)"],
          "Amiodarone (MCDR)",
          "정답입니다. 난치성 VF에서는 Amiodarone을 고려할 수 있습니다.",
          "Refractory VF에서는 Amiodarone(MCDR)이 리듬 안정화 목적으로 고려됩니다.",
          "Shock와 Epinephrine 이후에도 지속되는 VF에서 항부정맥제를 고려합니다.",
          "병원코드 MCDR = Amiodarone."
        )
      ]
    },
    {
      id: "ca-pvt",
      caseLabel: "CASE 2 · Pulseless VT",
      title: "Pulseless VT",
      text: "68세 환자. 의식 소실, 맥박 없음. 모니터상 pulseless VT가 확인되어 CPR이 진행 중입니다.",
      hr: "0",
      bp: "측정불가",
      spo2: "—",
      ecgBeatWidth: 150,
      ecgKey: "pvt",
      steps: [
        step(
          "STEP 1. Pulseless VT를 올바르게 분류한 것은?",
          ["심정지(충격 가능 리듬) 처치", "Stable SVT로 Adenosine", "단순 관찰"],
          "심정지(충격 가능 리듬) 처치",
          "정답입니다. 맥박이 없으면 VT라도 심정지로 처치합니다.",
          "맥박 유무가 치료 경로를 결정합니다.",
          "Pulse present VT와 pulseless VT는 경로가 다릅니다.",
          "모니터 리듬만 보지 말고 반드시 맥박을 확인하세요."
        ),
        step(
          "STEP 2. Pulseless VT에서 우선 약물은?",
          ["Epinephrine (MEPI)", "Adenosine (MADEN)", "Dopamine (MDOPA)"],
          "Epinephrine (MEPI)",
          "정답입니다. 심정지 약물로 Epinephrine을 우선 고려합니다.",
          "Adenosine은 stable SVT, Dopamine은 서맥·저혈압 맥락의 약물입니다.",
          "ACLS cardiac arrest 약물 흐름에서 Epinephrine이 기본입니다.",
          "병원코드 MEPI = Epinephrine."
        ),
        step(
          "STEP 3. 지속되는 pulseless VT에서 추가 고려 약물은?",
          ["Amiodarone (MCDR)", "Norepinephrine (MLEVO)", "Calcium gluconate (MCAGLU)"],
          "Amiodarone (MCDR)",
          "정답입니다. Refractory pVT에서 Amiodarone을 고려합니다.",
          "Norepinephrine은 septic shock 1차 승압제, Calcium은 고칼륨 심근 안정화 약물입니다.",
          "상황별 1차 약물을 혼동하지 않는 것이 실전 판단의 핵심입니다.",
          "pVT 지속 시 MCDR(Amiodarone)을 떠올리세요."
        )
      ]
    },
    {
      id: "ca-pea",
      caseLabel: "CASE 3 · PEA",
      title: "PEA",
      text: "70세 환자. 의식·맥박이 없고 CPR 중입니다. 모니터에는 조직화된 리듬이 보이나 맥박이 만져지지 않습니다(PEA).",
      hr: "58",
      bp: "측정불가",
      spo2: "—",
      ecgBeatWidth: 300,
      ecgKey: "sinus",
      steps: [
        step(
          "STEP 1. PEA에서 우선 처치 원칙은?",
          ["고품질 CPR + 원인 평가 + Epinephrine 고려", "즉시 제세동만 반복", "Adenosine으로 리듬 전환"],
          "고품질 CPR + 원인 평가 + Epinephrine 고려",
          "정답입니다. PEA는 비충격 리듬으로 CPR·원인 교정·Epinephrine이 중심입니다.",
          "PEA는 VF처럼 제세동이 1차 치료가 아닙니다.",
          "AHA ACLS에서 PEA/asystole은 non-shockable algorithm입니다.",
          "리듬이 있어도 맥박이 없으면 PEA입니다."
        ),
        step(
          "STEP 2. PEA에서 우선 고려하는 약물은?",
          ["Epinephrine (MEPI)", "Amiodarone (MCDR)", "Adenosine (MADEN)"],
          "Epinephrine (MEPI)",
          "정답입니다. Non-shockable arrest에서도 Epinephrine을 고려합니다.",
          "Amiodarone은 주로 refractory VF/pVT, Adenosine은 stable SVT입니다.",
          "관류압 확보를 돕는 Epinephrine이 arrest 기본 약물입니다.",
          "투여 후 flush와 CPR 지속을 확인하세요."
        ),
        step(
          "STEP 3. PEA에서 간호사가 함께 확인해야 할 것은?",
          ["가역적 원인(H’s & T’s)과 고품질 CPR 질", "즉시 Adenosine push", "Stable로 보고 경과 관찰"],
          "가역적 원인(H’s & T’s)과 고품질 CPR 질",
          "정답입니다. PEA는 원인 교정이 결과에 큰 영향을 줍니다.",
          "PEA를 stable 리듬으로 오인하면 안 됩니다.",
          "저혈량, 저산소, 산증, 고칼륨, 혈전 등 원인을 팀과 공유합니다.",
          "약물만이 아니라 원인 탐색이 PEA의 핵심입니다."
        )
      ]
    },
    {
      id: "ca-asystole",
      caseLabel: "CASE 4 · Asystole",
      title: "Asystole",
      text: "65세 환자. 병실 심정지. 모니터상 asystole, 맥박 없음. 즉시 CPR이 시작되었습니다.",
      hr: "0",
      bp: "측정불가",
      spo2: "—",
      ecgBeatWidth: 300,
      ecgKey: "asystole",
      steps: [
        step(
          "STEP 1. Asystole에서 올바른 1차 접근은?",
          ["고품질 CPR + Epinephrine 고려 (비충격 리듬)", "즉시 제세동", "Adenosine 투여"],
          "고품질 CPR + Epinephrine 고려 (비충격 리듬)",
          "정답입니다. Asystole은 비충격 리듬으로 CPR과 Epinephrine이 중심입니다.",
          "Asystole에 제세동이나 Adenosine은 적절하지 않습니다.",
          "Lead 확인·증폭 확인 후 true asystole인지 확인하는 것도 중요합니다.",
          "VF fine과 asystole을 혼동하지 않도록 리드를 확인하세요."
        ),
        step(
          "STEP 2. Asystole에서 우선 약물은?",
          ["Epinephrine (MEPI)", "Amiodarone (MCDR)", "Dopamine premix (M16DOPAM)"],
          "Epinephrine (MEPI)",
          "정답입니다.",
          "Amiodarone은 VF/pVT refractory 맥락, premix는 쇼크·서맥 맥락입니다.",
          "Non-shockable algorithm의 기본 약물은 Epinephrine입니다.",
          "MEPI 투여 시점과 flush를 팀과 공유하세요."
        ),
        step(
          "STEP 3. 지속 관찰·재평가 항목으로 적절한 것은?",
          ["리듬 변화(VF 전환 여부), CPR 질, 가역적 원인", "Stable SVT로 재분류", "즉시 승압제만 증량"],
          "리듬 변화(VF 전환 여부), CPR 질, 가역적 원인",
          "정답입니다. 리듬이 shockable로 바뀌면 알고리즘을 전환해야 합니다.",
          "Asystole을 SVT로 재분류하면 안 됩니다.",
          "2분마다 리듬·맥박을 재평가합니다.",
          "상황 변화 = 알고리즘 전환."
        )
      ]
    }
  ],

  /* ---------- SVT / Tachyarrhythmia ---------- */
  svt: [
    {
      id: "svt-stable",
      caseLabel: "CASE 1 · Stable SVT",
      title: "Stable SVT",
      text: "45세 환자. 두근거림만 호소, 의식 명료. HR 180, BP 118/72, SpO₂ 98%. 규칙적 좁은 QRS 빈맥.",
      hr: "180",
      bp: "118/72",
      spo2: "98%",
      ecgBeatWidth: 200,
      ecgKey: "svt",
      steps: [
        step(
          "STEP 1. 안정 SVT에서 우선 고려할 약물은?",
          ["Adenosine (MADEN)", "Epinephrine (MEPI)", "Norepinephrine (MLEVO)"],
          "Adenosine (MADEN)",
          "정답입니다. Stable SVT에서는 Adenosine이 우선 고려됩니다.",
          "불안정 징후가 없으면 Adenosine을 우선 고려합니다.",
          "Vagal maneuver 후 Adenosine을 고려하는 ACLS 흐름입니다.",
          "불안정 빈맥에서는 synchronized cardioversion이 우선일 수 있습니다."
        ),
        step(
          "STEP 2. Adenosine의 주된 목적은?",
          ["AV node 순간 차단으로 리듬 전환 시도", "강한 혈관수축으로 MAP 상승", "심근막 안정화"],
          "AV node 순간 차단으로 리듬 전환 시도",
          "정답입니다.",
          "Adenosine은 승압제나 고칼륨 안정화 약물이 아닙니다.",
          "반감기가 짧아 빠른 IV push + flush가 중요합니다.",
          "MADEN 투여 시 ECG monitoring 필수."
        ),
        step(
          "STEP 3. 투여 직후 간호 관찰의 핵심은?",
          ["ECG / HR 변화", "소변량만 확인", "다음 날 전해질만 확인"],
          "ECG / HR 변화",
          "정답입니다. 일시적 무수축처럼 보일 수 있어 ECG 관찰이 핵심입니다.",
          "즉시 ECG·HR 관찰이 필요합니다.",
          "효과 판정과 안전 확인이 모두 ECG로 이뤄집니다.",
          "일시적 흉부 불편 가능성을 미리 안내하세요."
        )
      ]
    },
    {
      id: "svt-avnrt",
      caseLabel: "CASE 2 · AVNRT",
      title: "AVNRT",
      text: "32세 환자. 갑작스런 두근거림. HR 190, BP 122/78, 의식 명료. 규칙적 좁은 QRS로 AVNRT가 의심됩니다.",
      hr: "190",
      bp: "122/78",
      spo2: "99%",
      ecgBeatWidth: 180,
      ecgKey: "svt",
      steps: [
        step(
          "STEP 1. 혈역학적으로 안정한 AVNRT에서 약물 선택은?",
          ["Adenosine (MADEN)", "Amiodarone (MCDR)", "Calcium gluconate (MCAGLU)"],
          "Adenosine (MADEN)",
          "정답입니다. 안정된 발작성 상심실성 빈맥에서 Adenosine을 고려합니다.",
          "Amiodarone·Calcium은 이 상황의 1차가 아닙니다.",
          "AVNRT는 AV node 의존 기전이라 Adenosine이 진단·치료에 유용할 수 있습니다.",
          "Stable vs Unstable을 먼저 가르세요."
        ),
        step(
          "STEP 2. Adenosine 작용 설명으로 옳은 것은?",
          ["AV node를 순간 차단한다", "칼륨을 직접 제거한다", "MAP만 올린다"],
          "AV node를 순간 차단한다",
          "정답입니다.",
          "칼륨 제거·승압 목적이 아닙니다.",
          "짧은 작용으로 리듬 전환 또는 진단적 단서를 제공합니다.",
          "Push-flush 준비가 효과를 좌우합니다."
        ),
        step(
          "STEP 3. 간호 중재로 적절한 것은?",
          ["ECG 모니터링 연결 및 flush 준비", "도파민 premix부터 연결", "칼슘제부터 투여"],
          "ECG 모니터링 연결 및 flush 준비",
          "정답입니다.",
          "Adenosine 전에는 ECG와 flush 준비가 핵심입니다.",
          "준비되지 않은 투여는 효과가 떨어질 수 있습니다.",
          "IV 경로와 즉시 flush를 팀과 확인하세요."
        )
      ]
    },
    {
      id: "svt-recurrent",
      caseLabel: "CASE 3 · Recurrent SVT",
      title: "Recurrent SVT",
      text: "39세 환자. 과거 SVT 병력. 다시 HR 170, BP 124/80, 의식 명료. 좁은 QRS 규칙 빈맥이 재발했습니다.",
      hr: "170",
      bp: "124/80",
      spo2: "99%",
      ecgBeatWidth: 200,
      ecgKey: "svt",
      steps: [
        step(
          "STEP 1. 현재 분류로 적절한 것은?",
          ["혈역학적으로 안정된 SVT", "Pulseless VT", "Septic shock"],
          "혈역학적으로 안정된 SVT",
          "정답입니다.",
          "맥박·혈압이 유지되면 stable SVT로 접근합니다.",
          "분류가 맞아야 약물 경로가 결정됩니다.",
          "증상만으로 불안정이라 단정하지 마세요."
        ),
        step(
          "STEP 2. 우선 고려 약물은?",
          ["Adenosine (MADEN)", "Norepinephrine (MLEVO)", "Epinephrine (MEPI)"],
          "Adenosine (MADEN)",
          "정답입니다.",
          "승압제·심정지 약물은 이 상황의 1차가 아닙니다.",
          "규칙적 좁은 QRS + 안정 = Adenosine 후보.",
          "병원코드 MADEN = Adenosine."
        ),
        step(
          "STEP 3. 재발 SVT에서 추가 간호 포인트는?",
          ["유발 요인·재발 여부·ECG 지속 감시", "즉시 제세동만 반복", "약물 코드 확인 생략"],
          "유발 요인·재발 여부·ECG 지속 감시",
          "정답입니다.",
          "안정 SVT에 제세동을 반복하는 것은 적절하지 않습니다.",
          "재발 시 의료진과 추가 전략을 상의합니다.",
          "처치 후 재평가를 반복하세요."
        )
      ]
    },
    {
      id: "svt-adenosine-fail",
      caseLabel: "CASE 4 · Adenosine ineffective",
      title: "Adenosine ineffective",
      text: "50세 환자. Stable로 보여 Adenosine을 투여했으나 리듬이 지속됩니다. 이후 BP 78/42, 식은땀과 의식 저하가 나타났습니다. HR 185.",
      hr: "185",
      bp: "78/42",
      spo2: "93%",
      ecgBeatWidth: 180,
      ecgKey: "svt",
      steps: [
        step(
          "STEP 1. 불안정 징후가 나타난 지금 우선 원칙은?",
          ["Synchronized cardioversion 고려", "Adenosine만 계속 반복", "맥박 있으니 비동기 제세동"],
          "Synchronized cardioversion 고려",
          "정답입니다. 불안정 빈맥에서는 synchronized cardioversion이 우선될 수 있습니다.",
          "약물만 반복하거나 비동기 제세동으로 바로 가지 않습니다.",
          "Hypotension, shock, altered mentation 등이 있으면 즉시 cardioversion을 고려합니다.",
          "Stable이었더라도 언제든 Unstable로 전환될 수 있습니다."
        ),
        step(
          "STEP 2. 상황 변화 후 간호 모니터링 핵심은?",
          ["의식, BP, ECG/HR, 관류 상태", "체중만 확인", "피부 색소만 확인"],
          "의식, BP, ECG/HR, 관류 상태",
          "정답입니다.",
          "불안정 평가는 의식·혈압·관류·ECG가 핵심입니다.",
          "악화 시 심정지 전환 가능성을 염두에 둡니다.",
          "Assess–Intervene–Reassess를 반복하세요."
        ),
        step(
          "STEP 3. 이후 맥박이 소실되면?",
          ["심정지 알고리즘으로 전환(CPR·제세동 여부 재평가·Epinephrine 등)", "계속 Adenosine만 반복", "Dopamine premix만 증량"],
          "심정지 알고리즘으로 전환(CPR·제세동 여부 재평가·Epinephrine 등)",
          "정답입니다.",
          "무맥성이 되면 SVT 약물 경로를 유지하면 안 됩니다.",
          "Pulse loss = 알고리즘 전환.",
          "MEPI·충격 가능 리듬 여부를 다시 확인합니다."
        )
      ]
    }
  ],

  /* ---------- Bradycardia ---------- */
  bradycardia: [
    {
      id: "brady-symptomatic",
      caseLabel: "CASE 1 · Symptomatic bradycardia",
      title: "Symptomatic bradycardia",
      text: "79세 환자. HR 34, BP 84/50, 어지럼·식은땀. 고칼륨 소견은 없습니다.",
      hr: "34",
      bp: "84/50",
      spo2: "95%",
      ecgBeatWidth: 300,
      ecgKey: "bradycardia",
      steps: [
        step(
          "STEP 1. 증상성 서맥·저혈압에서 고려할 수 있는 약물은?",
          ["Dopamine (MDOPA)", "Adenosine (MADEN)", "Amiodarone (MCDR)"],
          "Dopamine (MDOPA)",
          "정답입니다.",
          "Adenosine은 빈맥(SVT) 약물입니다.",
          "서맥으로 심박출이 떨어진 상황에서 관류 지지가 필요할 수 있습니다.",
          "병원코드 MDOPA = Dopamine."
        ),
        step(
          "STEP 2. Dopamine 투여 목적에 가까운 것은?",
          ["HR/BP 상승을 통한 관류 개선", "AV node 순간 차단", "칼륨 직접 제거"],
          "HR/BP 상승을 통한 관류 개선",
          "정답입니다.",
          "AV node 차단·칼륨 제거 목적이 아닙니다.",
          "효과와 빈맥 부작용을 함께 관찰합니다.",
          "투여 중 ECG·HR을 유지하세요."
        ),
        step(
          "STEP 3. 투여 중 특히 관찰할 항목은?",
          ["Tachycardia / 부정맥", "소변 색만", "체온만"],
          "Tachycardia / 부정맥",
          "정답입니다.",
          "Dopamine은 빈맥·부정맥을 유발할 수 있습니다.",
          "효과(BP/HR)와 유해작용을 같이 봅니다.",
          "숫자와 증상 개선을 함께 재평가하세요."
        )
      ]
    },
    {
      id: "brady-inferior-mi",
      caseLabel: "CASE 2 · Inferior MI",
      title: "Inferior MI",
      text: "66세 환자. 하벽심근경색 의심. HR 38, BP 86/52, 오심·식은땀. 서맥이 동반됩니다.",
      hr: "38",
      bp: "86/52",
      spo2: "94%",
      ecgBeatWidth: 300,
      ecgKey: "bradycardia",
      steps: [
        step(
          "STEP 1. 증상성 서맥이 동반될 때 약물로 고려할 수 있는 것은?",
          ["Dopamine (MDOPA)", "Adenosine (MADEN)", "Calcium gluconate를 고칼륨 확인 없이"],
          "Dopamine (MDOPA)",
          "정답입니다. 증상성 서맥·저관류에서 Dopamine을 고려할 수 있습니다.",
          "Adenosine은 부적절하고, Calcium은 고칼륨 맥락에서 검토합니다.",
          "원인(허혈) 평가와 함께 관류 지지가 필요할 수 있습니다.",
          "약물 선택은 리듬 + 임상 맥락으로 결정합니다."
        ),
        step(
          "STEP 2. 이 상황에서 피해야 할 접근은?",
          ["Stable SVT로 보고 Adenosine 투여", "활력·증상 재평가", "ECG 지속 감시"],
          "Stable SVT로 보고 Adenosine 투여",
          "정답입니다. 서맥에 Adenosine은 맥락이 맞지 않습니다.",
          "재평가와 ECG 감시는 필요합니다.",
          "적응증이 다른 약물을 습관적으로 준비하지 마세요.",
          "서맥 ≠ Adenosine."
        ),
        step(
          "STEP 3. 간호 재평가 항목은?",
          ["HR, BP, 흉통·관류 증상, ECG", "체중만", "피부 보습만"],
          "HR, BP, 흉통·관류 증상, ECG",
          "정답입니다.",
          "허혈·서맥은 종합 재평가가 필요합니다.",
          "악화 시 심정지 전환 가능성을 염두에 둡니다.",
          "Assess → Intervene → Reassess."
        )
      ]
    },
    {
      id: "brady-drug-induced",
      caseLabel: "CASE 3 · Drug induced",
      title: "Drug induced",
      text: "78세 환자. 베타차단제 복용 중 HR 40, BP 88/54, 무기력. 약물 유발 서맥이 의심됩니다.",
      hr: "40",
      bp: "88/54",
      spo2: "96%",
      ecgBeatWidth: 300,
      ecgKey: "bradycardia",
      steps: [
        step(
          "STEP 1. 증상성 서맥에서 고려 가능한 약물은?",
          ["Dopamine (MDOPA)", "Amiodarone (MCDR)", "Adenosine (MADEN)"],
          "Dopamine (MDOPA)",
          "정답입니다.",
          "Amiodarone·Adenosine은 이 상황의 1차가 아닙니다.",
          "원인(약제) 확인과 함께 관류 지지가 필요할 수 있습니다.",
          "복용 약력을 반드시 확인하세요."
        ),
        step(
          "STEP 2. Dopamine premix 사용 시 확인점은?",
          ["M8DOPAM / M16DOPAM 농도·코드 구분", "아무 premix나 동일 사용", "색깔만 보고 선택"],
          "M8DOPAM / M16DOPAM 농도·코드 구분",
          "정답입니다.",
          "농도 혼동은 심각한 투약 오류로 이어집니다.",
          "동일 성분이라도 함량이 다르면 해석이 달라집니다.",
          "라벨 mg 함량을 구두로 재확인하세요."
        ),
        step(
          "STEP 3. 투여 목표로 적절한 것은?",
          ["HR/BP 상승과 관류 개선", "AV block을 일부러 유발", "즉시 무맥성으로 전환"],
          "HR/BP 상승과 관류 개선",
          "정답입니다.",
          "서맥 치료는 관류 개선이 목표입니다.",
          "증상·관류 개선이 임상적 성공 기준입니다.",
          "활력 개선이 환자 관류 개선인지 함께 확인."
        )
      ]
    },
    {
      id: "brady-av-block",
      caseLabel: "CASE 4 · Complete AV block",
      title: "Complete AV block",
      text: "81세 환자. Complete AV block 의심. HR 32, BP 80/48, 어지럼·처짐. SpO₂ 93%.",
      hr: "32",
      bp: "80/48",
      spo2: "93%",
      ecgBeatWidth: 300,
      ecgKey: "bradycardia",
      steps: [
        step(
          "STEP 1. 증상성 고도 서맥에서 약물로 고려할 수 있는 것은?",
          ["Dopamine (MDOPA)", "Adenosine (MADEN)", "Sodium bicarbonate를 산증 확인 없이"],
          "Dopamine (MDOPA)",
          "정답입니다.",
          "Adenosine은 부적절하고, bicarbonate는 산증 맥락에서 검토합니다.",
          "관류가 떨어진 증상성 서맥에서 Dopamine을 고려할 수 있습니다.",
          "필요 시 pacing 등 추가 전략은 의료진과 상의합니다."
        ),
        step(
          "STEP 2. 투여 중 최우선 모니터링은?",
          ["ECG, HR, BP", "체중만", "다음 교대 때 확인"],
          "ECG, HR, BP",
          "정답입니다.",
          "연속 모니터링이 필요합니다.",
          "효과와 빈맥·부정맥 부작용을 동시에 봅니다.",
          "모니터 트렌드를 보세요."
        ),
        step(
          "STEP 3. 반응이 없을 때 적절한 행동은?",
          ["활력·ECG 재평가 후 의료진과 재논의", "임의로 Adenosine 추가", "아무 승압제나 동시에 추가"],
          "활력·ECG 재평가 후 의료진과 재논의",
          "정답입니다.",
          "적응증 없는 약물 추가는 위험합니다.",
          "안 들으면 더 넣는 게 아니라 다시 평가합니다.",
          "Closed-loop communication을 유지하세요."
        )
      ]
    }
  ],

  /* ---------- Shock / Hypotension ---------- */
  shock: [
    {
      id: "shock-septic",
      caseLabel: "CASE 1 · Septic shock",
      title: "Septic shock",
      text: "67세 폐렴 환자. 수액 소생 후에도 BP 78/40, HR 122, 사지 냉감, lactate 상승.",
      hr: "122",
      bp: "78/40",
      spo2: "94%",
      ecgBeatWidth: 250,
      ecgKey: "sinus_tachy",
      steps: [
        step(
          "STEP 1. Septic shock의 일반적인 1차 vasopressor는?",
          ["Norepinephrine (MLEVO)", "Adenosine (MADEN)", "Amiodarone (MCDR)"],
          "Norepinephrine (MLEVO)",
          "정답입니다.",
          "Adenosine·Amiodarone은 쇼크 1차 승압제가 아닙니다.",
          "강한 혈관수축으로 MAP를 올리는 것이 초기 목표에 부합합니다.",
          "병원코드 MLEVO = Norepinephrine."
        ),
        step(
          "STEP 2. Norepinephrine의 주된 기대 효과는?",
          ["혈관수축으로 MAP/BP 상승", "AV node 순간 차단", "칼륨 직접 제거"],
          "혈관수축으로 MAP/BP 상승",
          "정답입니다.",
          "항부정맥·칼륨 제거 약물이 아닙니다.",
          "관류압 확보가 조직 산소화의 전제입니다.",
          "MAP/BP와 말초순환을 함께 감시하세요."
        ),
        step(
          "STEP 3. 투여 중 간호 핵심은?",
          ["BP/MAP, 말초순환, 정맥로(침윤) 확인", "ECG 없이 주관적 증상만", "약물 코드 확인 생략"],
          "BP/MAP, 말초순환, 정맥로(침윤) 확인",
          "정답입니다.",
          "승압제는 모니터링과 라인 관리가 필수입니다.",
          "말초 허혈·침윤은 주요 간호 위험입니다.",
          "MLEVO 투여 중 라인과 관류를 반복 확인하세요."
        )
      ]
    },
    {
      id: "shock-persistent",
      caseLabel: "CASE 2 · Persistent hypotension",
      title: "Persistent hypotension",
      text: "74세 요로패혈증. 항생제·수액 후에도 BP 80/46, HR 110. 의식이 다소 처집니다.",
      hr: "110",
      bp: "80/46",
      spo2: "95%",
      ecgBeatWidth: 260,
      ecgKey: "sinus_tachy",
      steps: [
        step(
          "STEP 1. 지속 저혈압 septic shock에서 우선 약물군은?",
          ["Vasopressor — Norepinephrine (MLEVO)", "AV node blocker — Adenosine", "Membrane stabilizer — Calcium"],
          "Vasopressor — Norepinephrine (MLEVO)",
          "정답입니다.",
          "Adenosine·Calcium은 septic shock 1차 승압 전략이 아닙니다.",
          "감염 쇼크에서 MAP 목표 달성이 중요합니다.",
          "Shock 카드: MLEVO first."
        ),
        step(
          "STEP 2. Dopamine premix 관련 옳은 설명은?",
          ["M8DOPAM과 M16DOPAM 농도·라벨을 구분한다", "M8과 M16은 항상 같다", "Premix는 코드 확인이 필요 없다"],
          "M8DOPAM과 M16DOPAM 농도·라벨을 구분한다",
          "정답입니다.",
          "800mg과 1600mg premix를 같은 것으로 취급하면 위험합니다.",
          "병원코드가 다른 이유를 간호 안전 관점에서 이해해야 합니다.",
          "M8 vs M16 = 농도 이중 확인."
        ),
        step(
          "STEP 3. 재평가 항목으로 적절한 것은?",
          ["MAP/BP, HR, 소변량·관류, 환자 반응", "피부색만 한 번", "다음 날 전해질만"],
          "MAP/BP, HR, 소변량·관류, 환자 반응",
          "정답입니다.",
          "쇼크는 연속 재평가가 필요합니다.",
          "목표 MAP 도달과 부작용을 함께 봅니다.",
          "숫자와 관류를 같이 보세요."
        )
      ]
    },
    {
      id: "shock-map",
      caseLabel: "CASE 3 · MAP 감소",
      title: "MAP 감소",
      text: "62세 감염 의심. BP 70/38로 MAP가 크게 감소, HR 128, SpO₂ 92%. 사지가 찹니다.",
      hr: "128",
      bp: "70/38",
      spo2: "92%",
      ecgBeatWidth: 240,
      ecgKey: "sinus_tachy",
      steps: [
        step(
          "STEP 1. MAP 유지를 위해 우선 고려할 약물은?",
          ["Norepinephrine (MLEVO)", "Adenosine (MADEN)", "Amiodarone (MCDR)"],
          "Norepinephrine (MLEVO)",
          "정답입니다.",
          "빈맥이라고 Adenosine부터 주면 안 됩니다.",
          "원인 교정과 함께 관류압 확보가 우선입니다.",
          "빈맥 = 항상 SVT가 아닙니다."
        ),
        step(
          "STEP 2. Norepinephrine 작용 설명으로 옳은 것은?",
          ["강한 혈관수축 → MAP 상승", "AV node 차단 → 리듬 전환", "심근막 안정화"],
          "강한 혈관수축 → MAP 상승",
          "정답입니다.",
          "AV node 차단은 Adenosine, 심근 안정화는 Calcium 개념입니다.",
          "약물-작용 매칭이 오답을 줄입니다.",
          "MLEVO = vasoconstriction / MAP."
        ),
        step(
          "STEP 3. 특히 주의할 간호 문제는?",
          ["정맥 침윤 및 말초 허혈", "일시적 AV block만 보면 충분", "칼륨 급저하만 관찰"],
          "정맥 침윤 및 말초 허혈",
          "정답입니다.",
          "승압제 침윤과 말초 허혈을 주의합니다.",
          "적절한 정맥로 관리와 지속 관찰이 필요합니다.",
          "라인 확인을 투약 체크리스트에 넣으세요."
        )
      ]
    },
    {
      id: "shock-perfusion",
      caseLabel: "CASE 4 · Poor perfusion",
      title: "Poor perfusion",
      text: "팀 브리핑: 수액 후에도 MAP가 안 오르고 말초 관류가 불량한 septic shock. HR 118, BP 76/42.",
      hr: "118",
      bp: "76/42",
      spo2: "94%",
      ecgBeatWidth: 250,
      ecgKey: "sinus_tachy",
      steps: [
        step(
          "STEP 1. 일반적인 1차 선택은?",
          ["Norepinephrine (MLEVO)", "Calcium gluconate (MCAGLU)", "Adenosine (MADEN)"],
          "Norepinephrine (MLEVO)",
          "정답입니다.",
          "Calcium은 고칼륨 안정화, Adenosine은 SVT 약물입니다.",
          "일반적인 중환자 실무에서 NE가 1차입니다.",
          "Shock → MLEVO first."
        ),
        step(
          "STEP 2. Dopamine(MDOPA) 사용 시 간호 핵심은?",
          ["HR/부정맥 관찰과 용량·농도 확인", "코드 확인 없이 속도만 올림", "ECG 모니터링 불필요"],
          "HR/부정맥 관찰과 용량·농도 확인",
          "정답입니다.",
          "농도·코드·ECG/HR 감시가 필수입니다.",
          "MDOPA와 M8/M16 premix를 혼동하지 않아야 합니다.",
          "Premix는 라벨을 두 번 읽으세요."
        ),
        step(
          "STEP 3. 효과 판정 재평가로 적절한 것은?",
          ["MAP 목표 도달 여부와 조직 관류 지표", "즉시 모든 승압제 중단", "호흡수만 보고 판단"],
          "MAP 목표 도달 여부와 조직 관류 지표",
          "정답입니다.",
          "승압 효과는 MAP와 관류로 판단합니다.",
          "숫자와 임상 관류를 함께 봐야 합니다.",
          "목표를 정하고 재평가하는 훈련이 실전입니다."
        )
      ]
    }
  ],

  /* ---------- Hyperkalemia ---------- */
  hyperkalemia: [
    {
      id: "hk-no-ecg",
      caseLabel: "CASE 1 · ECG 변화 없음",
      title: "ECG 변화 없음",
      text: "60세 CKD 환자. K 6.1. HR 78, BP 128/76. ECG에서 뚜렷한 전도장애·peaked T는 없습니다. 의식 명료.",
      hr: "78",
      bp: "128/76",
      spo2: "98%",
      ecgBeatWidth: 300,
      ecgKey: "sinus",
      steps: [
        step(
          "STEP 1. ECG 변화가 없을 때 가장 우선할 태도는?",
          ["ECG·활력 지속 감시하며 프로토콜·처방 확인", "무조건 즉시 Calcium gluconate", "Adenosine 투여"],
          "ECG·활력 지속 감시하며 프로토콜·처방 확인",
          "정답입니다. ECG 변화가 없으면 무조건 Calcium부터가 아닙니다.",
          "상황과 병원 프로토콜·처방에 따라 접근합니다.",
          "심독성 징후가 있을 때 심근 안정화 우선 개념이 강조됩니다.",
          "숫자(K)와 ECG를 함께 해석하세요."
        ),
        step(
          "STEP 2. Calcium gluconate의 역할을 바르게 말한 것은?",
          ["칼륨을 직접 낮추지 않고 심근을 안정화한다", "칼륨을 소변으로 바로 배설시킨다", "Septic shock 1차 승압제다"],
          "칼륨을 직접 낮추지 않고 심근을 안정화한다",
          "정답입니다.",
          "Calcium은 이뇨제·승압제가 아닙니다.",
          "안정화 / 이동 / 제거를 구분해야 합니다.",
          "‘칼슘 = 칼륨 수치 하락’으로 기억하지 마세요."
        ),
        step(
          "STEP 3. 이후 peaked T가 새로 나타나면?",
          ["심근 안정화(Calcium gluconate, MCAGLU)를 우선 고려", "Adenosine으로 전환", "관찰만 지속"],
          "심근 안정화(Calcium gluconate, MCAGLU)를 우선 고려",
          "정답입니다. ECG 변화가 나타나면 심보호가 우선입니다.",
          "Adenosine은 고칼륨 처치가 아닙니다.",
          "상황 변화에 따라 우선순위가 달라집니다.",
          "재평가가 학습의 핵심입니다."
        )
      ]
    },
    {
      id: "hk-tall-t",
      caseLabel: "CASE 2 · Tall T wave",
      title: "Tall T wave",
      text: "82세 CKD 환자. K 7.2, HR 38, BP 88/50. ECG에서 tall/peaked T wave가 관찰됩니다.",
      hr: "38",
      bp: "88/50",
      spo2: "94%",
      ecgBeatWidth: 300,
      ecgKey: "hyperkalemia",
      steps: [
        step(
          "STEP 1. 가장 먼저 고려할 약물은?",
          ["Calcium gluconate (MCAGLU)", "Sodium bicarbonate (MBIVON)", "Amiodarone (MCDR)"],
          "Calcium gluconate (MCAGLU)",
          "정답입니다. ECG 변화 동반 고칼륨에서는 심근 안정화가 우선입니다.",
          "먼저 심장을 보호해야 합니다.",
          "칼륨 제거보다 심근세포막 안정화가 앞설 수 있습니다.",
          "MCAGLU는 칼륨 수치를 직접 낮추지 않습니다."
        ),
        step(
          "STEP 2. Calcium gluconate 투여 목적은?",
          ["심근 안정화", "칼륨 제거", "이뇨 촉진"],
          "심근 안정화",
          "정답입니다.",
          "칼륨 제거 약물이 아닙니다.",
          "안정화 → 이동 → 제거 순서로 개념을 구분하세요.",
          "고칼륨 치료의 세 축을 혼동하지 마세요."
        ),
        step(
          "STEP 3. 산증 동반 시 추가 고려 약물은?",
          ["Sodium bicarbonate (MBIVON)", "Adenosine (MADEN)", "Dopamine (MDOPA)"],
          "Sodium bicarbonate (MBIVON)",
          "정답입니다.",
          "산증 동반 시 bicarbonate가 K 세포 내 이동을 보조할 수 있습니다.",
          "Bicarbonate는 무조건 투여가 아닙니다.",
          "MBIVON = 산증 동반 여부 확인 후 고려."
        )
      ]
    },
    {
      id: "hk-wide-qrs",
      caseLabel: "CASE 3 · Wide QRS",
      title: "Wide QRS",
      text: "70세 환자. K 7.6, HR 42, BP 86/50. ECG에서 peaked T와 함께 QRS가 넓어져 있습니다.",
      hr: "42",
      bp: "86/50",
      spo2: "93%",
      ecgBeatWidth: 300,
      ecgKey: "hyperkalemia_wide",
      steps: [
        step(
          "STEP 1. Wide QRS를 동반한 고칼륨에서 1차 개념은?",
          ["심근 안정화 — Calcium gluconate (MCAGLU)", "즉시 Amiodarone", "Adenosine"],
          "심근 안정화 — Calcium gluconate (MCAGLU)",
          "정답입니다. 전도장애가 있으면 심보호가 더욱 시급합니다.",
          "Amiodarone·Adenosine은 고칼륨 1차가 아닙니다.",
          "Wide QRS는 심독성 악화 신호로 해석할 수 있습니다.",
          "안정화가 이동/제거를 대체하지는 않습니다."
        ),
        step(
          "STEP 2. ‘세포 내 이동’ 보조에 해당하는 설명은?",
          ["Sodium bicarbonate (MBIVON) — 산증 동반 시 고려", "Calcium이 칼륨을 소변으로 배설", "Amiodarone이 칼륨을 이동"],
          "Sodium bicarbonate (MBIVON) — 산증 동반 시 고려",
          "정답입니다.",
          "Calcium은 제거/이동 약물이 아닙니다.",
          "안정화와 이동과 제거를 구분하세요.",
          "산증 여부가 bicarbonate 결정의 핵심입니다."
        ),
        step(
          "STEP 3. 투여 후 우선 재평가 항목은?",
          ["ECG(QRS/T)와 활력징후", "다음 주 외래만", "피부 보습만"],
          "ECG(QRS/T)와 활력징후",
          "정답입니다.",
          "심독성에서는 ECG 재평가가 필수입니다.",
          "전도장애·서맥·심정지 전환을 감시합니다.",
          "약물 투여는 재평가의 시작입니다."
        )
      ]
    },
    {
      id: "hk-dialysis",
      caseLabel: "CASE 4 · Dialysis patient",
      title: "Dialysis patient",
      text: "55세 유지투석 환자. 투석 지연. K 7.8, peaked T·QRS 확장 의심. HR 46, BP 92/58.",
      hr: "46",
      bp: "92/58",
      spo2: "95%",
      ecgBeatWidth: 300,
      ecgKey: "hyperkalemia",
      steps: [
        step(
          "STEP 1. ECG 변화가 있는 중증 고칼륨에서 1차 약물은?",
          ["Calcium gluconate (MCAGLU)", "Epinephrine (MEPI)", "Adenosine (MADEN)"],
          "Calcium gluconate (MCAGLU)",
          "정답입니다.",
          "Epinephrine·Adenosine은 이 상황의 1차가 아닙니다.",
          "투석(제거)이 궁극 치료여도 즉시 심보호가 먼저일 수 있습니다.",
          "MCAGLU = 심근 안정화."
        ),
        step(
          "STEP 2. 투석 전 간호사가 구분해야 할 개념은?",
          ["안정화 / 이동 / 제거", "모두 같은 작용", "승압만 하면 충분"],
          "안정화 / 이동 / 제거",
          "정답입니다.",
          "세 개념을 한 약물로 뭉개면 오판합니다.",
          "Calcium은 안정화, bicarbonate 등은 이동(조건), 투석은 제거.",
          "목적을 말로 설명할 수 있어야 합니다."
        ),
        step(
          "STEP 3. 산증이 확인되면 추가 고려는?",
          ["Sodium bicarbonate (MBIVON)", "Adenosine (MADEN)", "Amiodarone (MCDR)"],
          "Sodium bicarbonate (MBIVON)",
          "정답입니다.",
          "SVT·항부정맥 약물이 아닙니다.",
          "이동을 돕는 보조 치료이며 안정화를 대체하지 않습니다.",
          "안정화(MCAGLU)와 이동(MBIVON)을 세트로 기억하세요."
        )
      ]
    }
  ]
};

function getCategoryCases(categoryId) {
  return (scenarios[categoryId] || []).slice();
}

function getAllScenariosFlat() {
  var list = [];
  CATEGORY_META.forEach(function (meta) {
    getCategoryCases(meta.id).forEach(function (item) {
      list.push(item);
    });
  });
  return list;
}

function getCategoryMetaById(id) {
  if (id === COMPREHENSIVE_META.id) return COMPREHENSIVE_META;
  for (var i = 0; i < CATEGORY_META.length; i++) {
    if (CATEGORY_META[i].id === id) return CATEGORY_META[i];
  }
  return null;
}
