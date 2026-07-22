/* 교육과정형 시나리오 데이터 — 임상 추론(Clinical Reasoning) 훈련용
 *
 * scenarios = { categoryId: [case, case, ...] }
 * CATEGORY_META = 카테고리 화면/진행률용 메타데이터
 * DIFFICULTY_META = 난이도 배지 메타데이터
 *
 * 설계 원칙
 * - "정답 암기"가 아니라 "왜 그렇게 판단하는가"를 훈련한다.
 * - 모든 선택지는 실제 임상에서 고려 가능한 행동으로 작성한다.
 * - 차이는 "지금 이 환자에게 가장 적절/시급한 우선순위"에서 갈린다.
 * - 병원 프로토콜(희석/혼합/병원 규정)은 다루지 않는다(Drug Library·E-cart에서 제공).
 * - 난이도: basic 3 STEP / intermediate 4 STEP / advanced 5 STEP.
 *
 * case = { id, caseLabel, title, difficulty, rhythm, text, hr, bp, spo2,
 *          ecgBeatWidth, ecgKey, steps[] }
 * step = { question, options[], answer, correct, wrong, rationale, learningPoint }
 */

var DIFFICULTY_META = {
  basic: { id: "basic", label: "Basic", sub: "기초", tone: "basic", icon: "🟢" },
  intermediate: { id: "intermediate", label: "Intermediate", sub: "중급", tone: "intermediate", icon: "🟡" },
  advanced: { id: "advanced", label: "Advanced", sub: "심화", tone: "advanced", icon: "🔴" }
};

function getDifficultyMeta(id) {
  return DIFFICULTY_META[id] || null;
}

var CATEGORY_META = [
  {
    id: "cardiacArrest",
    title: "Cardiac Arrest / CPR",
    shortTitle: "Cardiac Arrest",
    description: "심정지 상황에서 임상 판단 훈련",
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
    description: "증상성 서맥·저관류 판단 훈련",
    icon: "activity"
  },
  {
    id: "shock",
    title: "Shock / Hypotension",
    shortTitle: "Shock / Hypotension",
    description: "쇼크·저혈압 순환 판단 훈련",
    icon: "droplet"
  },
  {
    id: "hyperkalemia",
    title: "Hyperkalemia",
    shortTitle: "Hyperkalemia",
    description: "고칼륨혈증 심독성 판단 훈련",
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
      caseLabel: "CASE · 검사실에서 발생한 심정지",
      title: "검사실에서 발생한 심정지",
      difficulty: "basic",
      rhythm: "VF",
      text: "72세 남성. 검사실에서 갑자기 쓰러졌습니다. 맥박이 없고 모니터상 VF가 확인되어 CPR이 시작되었습니다.",
      hr: "분석불가",
      bp: "측정불가",
      spo2: "—",
      ecgBeatWidth: 120,
      ecgKey: "vf",
      steps: [
        step(
          "STEP 1. 모니터에 VF, 맥박이 없습니다. 지금 이 환자에게 가장 먼저 해야 할 것은?",
          [
            "고품질 CPR을 유지하면서 즉시 제세동을 준비한다",
            "정맥로를 확보하고 Epinephrine부터 투여한다",
            "12-lead ECG를 찍어 리듬을 정밀 분석한다"
          ],
          "고품질 CPR을 유지하면서 즉시 제세동을 준비한다",
          "VF는 충격 가능 리듬입니다. 제세동이 생존을 좌우하는 결정적 치료이며, 그 사이 고품질 CPR로 관류를 유지합니다.",
          "약물이나 정밀 분석보다 제세동과 CPR이 먼저입니다.",
          "정맥로 확보·Epinephrine·리듬 재확인도 모두 필요한 일이지만, 첫 제세동을 늦추면서까지 먼저 할 일은 아닙니다. 약물은 제세동·CPR이 돌아가는 흐름 안에서 준비합니다.",
          "충격 가능 리듬(VF/pVT)에서는 ‘약보다 전기’ — 제세동 타이밍이 최우선입니다."
        ),
        step(
          "STEP 2. 제세동과 CPR을 이어가는 중, 이 환자에게 우선 고려하는 약물은?",
          ["Epinephrine (MEPI)", "Adenosine (MADEN)", "Norepinephrine (MLEVO)"],
          "Epinephrine (MEPI)",
          "심정지에서 Epinephrine은 α-작용으로 관상동맥·뇌 관류압을 높여 ROSC 가능성을 돕습니다.",
          "Adenosine은 맥박이 있는 안정 SVT, Norepinephrine은 맥박이 있는 쇼크의 승압제입니다.",
          "Adenosine·Norepinephrine 모두 실제 임상에서 쓰지만, 대상은 ‘맥박이 있는’ 환자입니다. 무맥성 심정지에는 해당하지 않습니다.",
          "약을 고를 때 ‘리듬 + 맥박 유무’를 먼저 떠올립니다. 무맥 = Epinephrine 흐름."
        ),
        step(
          "STEP 3. 제세동과 Epinephrine에도 VF가 지속됩니다. 추가로 고려할 약물은?",
          ["Amiodarone (MCDR)", "Calcium gluconate (MCAGLU)", "Sodium bicarbonate (MBIVON)"],
          "Amiodarone (MCDR)",
          "제세동·Epinephrine에도 지속되는 refractory VF/pVT에서는 항부정맥제 Amiodarone을 고려합니다.",
          "Calcium·Bicarbonate는 고칼륨·산증 등 특정 원인이 의심될 때 고려합니다.",
          "Calcium은 고칼륨혈증 심근 안정화, Bicarbonate는 산증·특정 중독에서 씁니다. 원인 단서가 있으면 쓸 수 있지만, 단서 없이 refractory VF의 기본 다음 카드는 Amiodarone입니다.",
          "제세동 → CPR → Epinephrine → (지속되면) Amiodarone. 원인약(Ca/Bicarb)은 단서가 있을 때."
        )
      ]
    },
    {
      id: "ca-pvt",
      caseLabel: "CASE · 병실에서 발생한 무맥성 심실빈맥",
      title: "병실에서 발생한 무맥성 심실빈맥",
      difficulty: "intermediate",
      rhythm: "Pulseless VT",
      text: "68세 환자. 의식이 없고 모니터에는 넓고 빠른 규칙적 QRS가 보입니다. 맥박을 확인하니 만져지지 않습니다.",
      hr: "188",
      bp: "측정불가",
      spo2: "—",
      ecgBeatWidth: 150,
      ecgKey: "pvt",
      steps: [
        step(
          "STEP 1. 모니터는 VT 양상인데 맥박이 없습니다. 이 상황을 어떻게 해석해야 하나요?",
          [
            "무맥성 심실빈맥(pulseless VT) — 심정지로 접근",
            "맥박이 있는 VT로 보고 항부정맥제부터 준비",
            "안정 SVT로 보고 미주신경 수기부터 시도"
          ],
          "무맥성 심실빈맥(pulseless VT) — 심정지로 접근",
          "리듬이 VT라도 맥박이 없으면 심정지입니다. 충격 가능 리듬으로 CPR·제세동 경로로 갑니다.",
          "맥박 유무가 치료 경로를 가릅니다. 지금은 무맥이므로 심정지 경로입니다.",
          "맥박이 있는 VT라면 항부정맥제나 동기화 심율동전환을, 좁은 QRS 안정 빈맥이면 미주신경/Adenosine을 고려합니다. 그러나 이 환자는 무맥이라 해당하지 않습니다.",
          "같은 ‘VT’라도 맥박이 있으면 완전히 다른 길입니다. 모니터보다 환자(맥박)를 먼저 봅니다."
        ),
        step(
          "STEP 2. pulseless VT로 판단했습니다. 가장 먼저 해야 하는 처치는?",
          [
            "고품질 CPR과 즉시 비동기 제세동",
            "동기화 심율동전환(synchronized cardioversion)",
            "12-lead ECG 판독을 마친 뒤 결정"
          ],
          "고품질 CPR과 즉시 비동기 제세동",
          "무맥성 VT는 VF와 같은 충격 가능 리듬으로, 비동기 제세동과 CPR이 우선입니다.",
          "동기화 심율동전환은 ‘맥박이 있는’ 불안정 빈맥에서 씁니다.",
          "동기화 심율동전환은 R파에 맞춰 방전하므로 맥박(리듬)이 있어야 합니다. 무맥에서는 동기화할 수 없어 비동기 제세동이 맞습니다. 정밀 판독을 기다리며 처치를 늦추지 않습니다.",
          "무맥 = 비동기 제세동, 유맥 불안정 = 동기화. 헷갈리기 쉬운 지점입니다."
        ),
        step(
          "STEP 3. CPR·제세동을 이어가며 우선 고려하는 약물은?",
          ["Epinephrine (MEPI)", "Adenosine (MADEN)", "Dopamine (MDOPA)"],
          "Epinephrine (MEPI)",
          "심정지 흐름의 기본 약물은 Epinephrine입니다.",
          "Adenosine은 안정 SVT, Dopamine은 증상성 서맥·저혈압 맥락의 약물입니다.",
          "Adenosine·Dopamine 모두 실제 쓰이는 약이지만 적응 상황이 다릅니다. 무맥성 리듬에는 해당하지 않습니다.",
          "상황별 1차 약을 혼동하지 않기: 무맥 → Epinephrine."
        ),
        step(
          "STEP 4. pulseless VT가 지속됩니다. 추가로 고려할 약물과 반드시 병행할 것은?",
          [
            "Amiodarone 고려 + 가역적 원인(H’s & T’s) 점검하며 CPR 지속",
            "Amiodarone 투여 후 CPR을 잠시 멈추고 반응을 관찰",
            "Norepinephrine을 함께 정주로 시작"
          ],
          "Amiodarone 고려 + 가역적 원인(H’s & T’s) 점검하며 CPR 지속",
          "Refractory pVT에서 Amiodarone을 고려하되, 원인 교정과 고품질 CPR을 멈추지 않는 것이 핵심입니다.",
          "약을 넣었다고 CPR을 멈추지 않습니다. 리듬·맥박 확인은 정해진 주기에 짧게 합니다.",
          "Norepinephrine은 맥박이 있는 쇼크의 승압제라 무맥에는 맞지 않습니다. 약물 투여가 CPR 중단의 이유가 되어서도 안 됩니다.",
          "약은 CPR·원인 교정 위에 얹는 것입니다. ‘H’s & T’s’를 팀과 함께 점검합니다."
        )
      ]
    },
    {
      id: "ca-asystole",
      caseLabel: "CASE · 병실에서 발생한 무수축 심정지",
      title: "병실에서 발생한 무수축 심정지",
      difficulty: "intermediate",
      rhythm: "Asystole",
      text: "65세 환자. 병실에서 심정지. 모니터가 거의 평탄하고 맥박이 없습니다. 즉시 CPR이 시작되었습니다.",
      hr: "0",
      bp: "측정불가",
      spo2: "—",
      ecgBeatWidth: 300,
      ecgKey: "asystole",
      steps: [
        step(
          "STEP 1. 모니터가 거의 평탄합니다. 지금 먼저 확인·판단할 것은?",
          [
            "리드·연결·이득(gain)을 확인해 asystole인지 확인하며 CPR 지속",
            "즉시 제세동을 시행한다",
            "미세 VF일 수 있으니 바로 Amiodarone을 준비한다"
          ],
          "리드·연결·이득(gain)을 확인해 asystole인지 확인하며 CPR 지속",
          "평탄선은 리드 분리·낮은 이득처럼 보일 수도 있어 확인이 필요합니다. 확인하는 동안에도 고품질 CPR은 계속합니다.",
          "Asystole은 비충격 리듬이라 제세동 대상이 아닙니다.",
          "미세 VF 감별은 중요하지만 그 대응이 ‘Amiodarone 준비’는 아닙니다. 실제 미세 VF로 확인되면 충격 가능 리듬 경로(제세동)로 전환합니다.",
          "평탄선 = 먼저 ‘진짜인지’ 확인. 그러나 CPR은 멈추지 않습니다."
        ),
        step(
          "STEP 2. Asystole에서 우선 고려하는 약물은?",
          ["Epinephrine (MEPI)", "Amiodarone (MCDR)", "Dopamine premix (M16DOPAM)"],
          "Epinephrine (MEPI)",
          "비충격 리듬(asystole/PEA)의 기본 약물은 Epinephrine입니다.",
          "Amiodarone은 충격 가능 리듬, premix는 맥박이 있는 쇼크·서맥 맥락입니다.",
          "Amiodarone은 VF/pVT처럼 충격 가능 리듬에서 의미가 있습니다. asystole에는 항부정맥제 적응이 없습니다.",
          "비충격 리듬 = Epinephrine 중심, 항부정맥제가 아닙니다."
        ),
        step(
          "STEP 3. Epinephrine 투여와 함께 팀이 집중해야 할 것은?",
          [
            "가역적 원인(H’s & T’s)을 찾아 교정하며 CPR 질 유지",
            "제세동 에너지를 최대로 올려 반복 시도",
            "안정 SVT 가능성을 배제하기 위한 Adenosine 투여"
          ],
          "가역적 원인(H’s & T’s)을 찾아 교정하며 CPR 질 유지",
          "asystole의 예후를 바꾸는 핵심은 교정 가능한 원인을 찾는 것입니다.",
          "asystole에 제세동·Adenosine은 적응이 되지 않습니다.",
          "제세동은 충격 가능 리듬에서만, Adenosine은 맥박이 있는 좁은 QRS 빈맥에서만 의미가 있습니다. 지금은 둘 다 아닙니다.",
          "안 되는 처치를 반복하기보다 ‘왜?(원인)’를 찾는 것이 진짜 치료입니다."
        ),
        step(
          "STEP 4. 2분 주기 리듬 확인에서 화면이 VF로 바뀌었습니다. 다음 판단은?",
          [
            "충격 가능 리듬 알고리즘으로 전환 — 제세동 준비",
            "그대로 asystole 경로를 유지",
            "즉시 Norepinephrine 정주를 시작"
          ],
          "충격 가능 리듬 알고리즘으로 전환 — 제세동 준비",
          "리듬이 shockable로 바뀌면 즉시 제세동 경로로 전환합니다.",
          "상황이 바뀌면 알고리즘도 바꿔야 합니다.",
          "Norepinephrine은 ROSC 이후 ‘맥박이 있는’ 저혈압 관리에 쓰지, 무맥 리듬 전환 대응이 아닙니다.",
          "심정지는 고정된 정답이 아니라 ‘리듬 변화에 따라 갈아타는’ 과정입니다."
        )
      ]
    },
    {
      id: "ca-pea",
      caseLabel: "CASE · CPR 중 확인된 무맥성 전기활동",
      title: "CPR 중 확인된 무맥성 전기활동",
      difficulty: "advanced",
      rhythm: "PEA",
      text: "70세 환자. 의식·맥박이 없고 CPR 중입니다. 모니터에는 조직화된 리듬이 보이지만 맥박이 만져지지 않습니다.",
      hr: "58",
      bp: "측정불가",
      spo2: "—",
      ecgBeatWidth: 300,
      ecgKey: "sinus",
      steps: [
        step(
          "STEP 1. 모니터에는 리듬이 보이는데 맥박이 없습니다. 이 상태는?",
          [
            "무맥성 전기활동(PEA) — 비충격 리듬 심정지",
            "관류가 유지되는 서맥",
            "충격 가능 리듬이므로 제세동 대상"
          ],
          "무맥성 전기활동(PEA) — 비충격 리듬 심정지",
          "리듬이 보여도 맥박이 없으면 PEA입니다. 비충격 리듬 심정지로 접근합니다.",
          "화면의 리듬보다 맥박 유무가 판단 기준입니다.",
          "관류가 유지되는 서맥이라면 맥박이 만져지고 증상 기반으로 접근합니다. 제세동은 VF/pVT에서만 의미가 있습니다.",
          "‘리듬 있음 ≠ 맥박 있음’ — PEA의 정의를 몸으로 기억합니다."
        ),
        step(
          "STEP 2. PEA에서 예후를 가장 크게 좌우하는 것은?",
          [
            "고품질 CPR + 교정 가능한 원인(H’s & T’s) 규명",
            "가능한 한 빨리 제세동 시행",
            "항부정맥제 조기 투여"
          ],
          "고품질 CPR + 교정 가능한 원인(H’s & T’s) 규명",
          "PEA·asystole은 원인 규명·교정이 핵심입니다. CPR 질을 유지하며 원인을 찾습니다.",
          "제세동·항부정맥제는 이 리듬의 치료가 아닙니다.",
          "제세동·Amiodarone은 충격 가능 리듬용입니다. PEA에서는 ‘왜 이렇게 됐는가’를 교정하지 못하면 약만으로 회복이 어렵습니다.",
          "PEA는 ‘원인병’입니다. 목록(H’s & T’s)을 떠올리는 습관이 실력입니다."
        ),
        step(
          "STEP 3. 이 상황에서 우선 고려하는 약물은?",
          ["Epinephrine (MEPI)", "Amiodarone (MCDR)", "Adenosine (MADEN)"],
          "Epinephrine (MEPI)",
          "비충격 리듬에서도 Epinephrine을 고려합니다.",
          "Amiodarone은 충격 가능 리듬, Adenosine은 안정 SVT의 약입니다.",
          "두 약 모두 적응 상황이 다릅니다. PEA의 기본 약물은 Epinephrine입니다.",
          "리듬을 먼저 분류하면 약은 따라옵니다."
        ),
        step(
          "STEP 4. Epinephrine을 투여했습니다. 동시에 간호사가 수행할 것은?",
          [
            "H’s & T’s를 팀과 점검하며 고품질 CPR 지속",
            "ROSC 확인을 위해 CPR을 자주 멈춘다",
            "제세동을 준비한다"
          ],
          "H’s & T’s를 팀과 점검하며 고품질 CPR 지속",
          "원인 교정과 CPR 지속이 핵심입니다. ROSC 확인은 정해진 주기에 짧게 합니다.",
          "CPR을 자주 멈추면 관류가 끊깁니다. PEA에 제세동은 적응이 아닙니다.",
          "H(저혈량·저산소·산증·칼륨 이상·저체온), T(긴장성 기흉·심장압전·독성·관상동맥·폐색전)를 팀과 나눠 점검합니다.",
          "약 투여는 끝이 아니라 재평가·원인 교정의 시작입니다."
        ),
        step(
          "STEP 5. CPR·Epinephrine·원인 점검에도 반응이 없습니다. 지금 팀의 판단은?",
          [
            "발견된 가역적 원인을 실제로 교정하고 소생 방향을 팀과 재논의",
            "Epinephrine 용량을 임의로 크게 늘린다",
            "근거 없이 승압제를 추가로 정주한다"
          ],
          "발견된 가역적 원인을 실제로 교정하고 소생 방향을 팀과 재논의",
          "긴장성 기흉 감압, 저혈량 수액 등 발견된 원인을 실제로 해결하고, 소생 방향을 팀과 closed-loop로 재논의합니다.",
          "용량 임의 증량·근거 없는 약 추가는 안전하지 않습니다.",
          "반응이 없을수록 ‘더 넣기’가 아니라 ‘왜 안 되는지(원인)’로 돌아가야 합니다. 약은 원인 교정을 대신할 수 없습니다.",
          "반응 없음 = 원인으로 회귀. 판단은 팀과 공유(closed-loop)합니다."
        )
      ]
    }
  ],
  /* ---------- SVT / Tachyarrhythmia ---------- */
  svt: [
    {
      id: "svt-stable",
      caseLabel: "CASE · 혈역학적으로 안정된 상심실성 빈맥",
      title: "혈역학적으로 안정된 상심실성 빈맥",
      difficulty: "basic",
      rhythm: "SVT (narrow-complex, regular)",
      text: "45세 환자. 두근거림만 호소하고 의식은 명료합니다. HR 180, BP 118/72, SpO₂ 98%. 규칙적인 좁은 QRS 빈맥입니다.",
      hr: "180",
      bp: "118/72",
      spo2: "98%",
      ecgBeatWidth: 200,
      ecgKey: "svt",
      steps: [
        step(
          "STEP 1. HR 180, BP 118/72, 의식 명료, 규칙적 좁은 QRS. 이 환자를 어떻게 분류하나요?",
          [
            "혈역학적으로 안정된 SVT",
            "불안정 빈맥 — 즉시 심율동전환 필요",
            "심정지 임박 — CPR 준비"
          ],
          "혈역학적으로 안정된 SVT",
          "혈압·의식이 유지되므로 안정 SVT입니다. 미주신경 수기·약물로 접근할 여유가 있습니다.",
          "불안정 징후(저혈압·의식저하·흉통·쇼크)가 없으면 안정으로 봅니다.",
          "불안정 징후가 있으면 동기화 심율동전환이 우선이고, 무맥이면 CPR입니다. 지금은 둘 다 아닙니다.",
          "빈맥은 항상 ‘안정/불안정’을 먼저 가릅니다."
        ),
        step(
          "STEP 2. 안정 SVT에서 (미주신경 수기 후) 우선 고려하는 약물은?",
          ["Adenosine (MADEN)", "Norepinephrine (MLEVO)", "Epinephrine (MEPI)"],
          "Adenosine (MADEN)",
          "안정된 좁은 QRS 규칙 빈맥에서 Adenosine은 AV node를 순간 차단해 리듬 전환을 시도합니다.",
          "Norepinephrine·Epinephrine은 오히려 심박수를 올릴 수 있어 이 상황의 1차가 아닙니다.",
          "승압제·심정지 약물은 쇼크·심정지 맥락에서 씁니다. 안정 SVT에 심박을 올리는 약을 주면 방향이 반대입니다.",
          "약의 ‘작용 방향’을 생각합니다 — 빈맥에 심박 올리는 약은 피합니다."
        ),
        step(
          "STEP 3. Adenosine 투여 직후 가장 먼저 관찰할 것은?",
          [
            "ECG·HR 변화(일시적 무수축 가능성 포함)",
            "다음 날 아침 전해질",
            "시간당 소변량만"
          ],
          "ECG·HR 변화(일시적 무수축 가능성 포함)",
          "짧은 무수축·리듬 전환이 즉시 나타날 수 있어 ECG·HR을 실시간으로 관찰합니다.",
          "효과·안전 판정이 모두 ECG로 이뤄지므로 지연 관찰만으로는 부족합니다.",
          "전해질·소변량도 의미 있는 지표지만, 투여 ‘직후’ 최우선 관찰은 리듬입니다.",
          "Adenosine = 투여와 동시에 모니터에서 눈을 떼지 않습니다."
        )
      ]
    },
    {
      id: "svt-avnrt",
      caseLabel: "CASE · 갑작스런 두근거림 (AVNRT 의심)",
      title: "갑작스런 두근거림 (AVNRT 의심)",
      difficulty: "intermediate",
      rhythm: "SVT / AVNRT",
      text: "32세 환자. 갑작스런 두근거림. HR 190, BP 122/78, 의식 명료. 규칙적인 좁은 QRS로 AVNRT가 의심됩니다.",
      hr: "190",
      bp: "122/78",
      spo2: "99%",
      ecgBeatWidth: 180,
      ecgKey: "svt",
      steps: [
        step(
          "STEP 1. HR 190의 규칙적 좁은 QRS 빈맥입니다. 약물·전기 치료 결정 전에 먼저 판단할 것은?",
          [
            "활력·의식·증상으로 안정 여부를 먼저 확인",
            "바로 Adenosine을 밀어 넣는다",
            "바로 동기화 심율동전환을 시행"
          ],
          "활력·의식·증상으로 안정 여부를 먼저 확인",
          "치료 경로는 안정/불안정에서 갈리므로 활력·의식·증상부터 확인합니다.",
          "약이나 전기 치료 결정보다 ‘안정 여부’ 판단이 먼저입니다.",
          "불안정하면 심율동전환, 안정이면 미주신경 수기/Adenosine입니다. 순서를 건너뛰면 과·소치료가 됩니다.",
          "판단의 첫 단추는 ‘환자 안정성 평가’입니다."
        ),
        step(
          "STEP 2. 안정으로 판단했습니다. 약물 전에 먼저 시도할 수 있는 것은?",
          [
            "미주신경 수기(vagal maneuver)",
            "즉시 제세동",
            "Norepinephrine 정주 시작"
          ],
          "미주신경 수기(vagal maneuver)",
          "안정 SVT에서는 비침습적인 미주신경 수기를 먼저 시도할 수 있습니다.",
          "제세동·승압제는 이 상황의 적응이 아닙니다.",
          "제세동은 충격 가능 무맥/불안정 리듬에서, Norepinephrine은 쇼크 승압에서 씁니다. 안정 SVT에는 맞지 않습니다.",
          "덜 침습적인 것부터: vagal → Adenosine."
        ),
        step(
          "STEP 3. 미주신경 수기에도 지속됩니다. 우선 고려하는 약물은?",
          ["Adenosine (MADEN)", "Amiodarone (MCDR)", "Calcium gluconate (MCAGLU)"],
          "Adenosine (MADEN)",
          "AVNRT처럼 AV node에 의존하는 빈맥에서 Adenosine이 진단·치료에 유용합니다.",
          "Amiodarone·Calcium은 이 상황의 1차가 아닙니다.",
          "Amiodarone은 광범위/난치성 부정맥, Calcium은 고칼륨 심근 안정화 맥락입니다. 지금 기전과 맞지 않습니다.",
          "기전(AV node 차단)과 리듬을 연결해 약을 고릅니다."
        ),
        step(
          "STEP 4. Adenosine 후 리듬이 정상으로 돌아왔습니다. 이후 간호는?",
          [
            "재발 여부·유발요인을 확인하며 ECG를 지속 감시",
            "모니터를 떼고 관찰을 종료",
            "예방적으로 Adenosine을 반복 투여"
          ],
          "재발 여부·유발요인을 확인하며 ECG를 지속 감시",
          "전환 후에도 재발할 수 있어 감시와 유발요인 파악이 필요합니다.",
          "증상이 사라져도 즉시 감시를 끊지 않습니다.",
          "예방적 반복 투여는 적응이 아니며, 재발 시 전략은 의료진과 상의합니다.",
          "전환은 끝이 아니라 재평가의 시작입니다."
        )
      ]
    },
    {
      id: "svt-recurrent",
      caseLabel: "CASE · 병력상 SVT가 재발한 환자",
      title: "병력상 SVT가 재발한 환자",
      difficulty: "intermediate",
      rhythm: "SVT (narrow-complex, regular)",
      text: "39세 환자. 과거 SVT 병력이 있습니다. HR 170, BP 124/80, 의식 명료. 좁은 QRS 규칙 빈맥이 다시 나타났습니다.",
      hr: "170",
      bp: "124/80",
      spo2: "99%",
      ecgBeatWidth: 200,
      ecgKey: "svt",
      steps: [
        step(
          "STEP 1. 과거 SVT 병력이 있는 환자입니다. 지금 상태를 어떻게 분류하나요?",
          [
            "혈역학적으로 안정된 재발성 SVT",
            "Pulseless VT",
            "Septic shock"
          ],
          "혈역학적으로 안정된 재발성 SVT",
          "맥박·혈압이 유지되는 좁은 QRS 규칙 빈맥으로 안정 SVT 재발입니다.",
          "무맥·쇼크 소견이 없으므로 그 경로가 아닙니다.",
          "Pulseless VT는 무맥, septic shock은 감염+저혈압 맥락입니다. 지금은 해당하지 않습니다.",
          "병력이 있어도 ‘지금 이 순간의 활력’로 다시 분류합니다."
        ),
        step(
          "STEP 2. 이 환자에게 지금 가장 적절한 첫 시도는?",
          [
            "미주신경 수기 후 필요 시 Adenosine",
            "즉시 동기화 심율동전환",
            "즉시 Amiodarone 정주"
          ],
          "미주신경 수기 후 필요 시 Adenosine",
          "안정 재발 SVT에서는 미주신경 수기 → Adenosine 순서가 합리적입니다.",
          "안정 상태에서 곧장 전기 치료·정주 항부정맥제로 가지 않습니다.",
          "심율동전환은 불안정에서, Amiodarone은 다른 부정맥/난치 맥락에서 고려합니다. 안정 상태에는 과합니다.",
          "안정 상태에서는 단계적 접근이 원칙입니다."
        ),
        step(
          "STEP 3. 우선 고려하는 약물은?",
          ["Adenosine (MADEN)", "Norepinephrine (MLEVO)", "Epinephrine (MEPI)"],
          "Adenosine (MADEN)",
          "규칙적 좁은 QRS + 안정 = Adenosine 후보입니다.",
          "승압·심정지 약물은 이 맥락의 1차가 아닙니다.",
          "Norepinephrine·Epinephrine은 쇼크·심정지에서의 약입니다. 지금 상황과 맞지 않습니다.",
          "리듬 + 안정성 → 약. 병원코드 MADEN = Adenosine."
        ),
        step(
          "STEP 4. Adenosine에도 리듬이 전환되지 않고 유지됩니다(여전히 안정). 다음 판단은?",
          [
            "활력 재확인 후 다음 전략을 의료진과 논의",
            "Adenosine을 무한 반복한다",
            "안 되니 바로 비동기 제세동"
          ],
          "활력 재확인 후 다음 전략을 의료진과 논의",
          "전환이 안 되면 활력을 재평가하고 다음 단계를 팀과 상의합니다.",
          "무한 반복·(안정 상태에서의) 비동기 제세동은 적절하지 않습니다.",
          "안정 상태가 유지되면 시간 여유가 있으므로 안전한 다음 전략을 논의합니다. 불안정으로 바뀌면 동기화 심율동전환을 고려합니다.",
          "안 들으면 ‘더’가 아니라 ‘재평가 + 상의’입니다."
        )
      ]
    },
    {
      id: "svt-adenosine-fail",
      caseLabel: "CASE · Adenosine 투여 후 불안정해진 빈맥",
      title: "Adenosine 투여 후 불안정해진 빈맥",
      difficulty: "advanced",
      rhythm: "SVT → unstable",
      text: "50세 환자. 안정으로 보여 Adenosine을 투여했으나 리듬이 지속됩니다. 이후 BP 78/42로 떨어지고 식은땀·의식 저하가 나타납니다. HR 185.",
      hr: "185",
      bp: "78/42",
      spo2: "93%",
      ecgBeatWidth: 180,
      ecgKey: "svt",
      steps: [
        step(
          "STEP 1. BP 78/42, 식은땀, 의식 저하가 새로 나타났습니다. 지금 상태 변화를 어떻게 해석하나요?",
          [
            "안정 → 불안정 빈맥으로 악화",
            "정상으로 회복되는 중",
            "단순한 불안(정신적) 반응"
          ],
          "안정 → 불안정 빈맥으로 악화",
          "저혈압·식은땀·의식 저하는 불안정 징후입니다. 치료 강도를 올려야 합니다.",
          "활력·의식 악화를 ‘불안’으로 넘기면 위험합니다.",
          "회복 중이라면 HR이 떨어지고 혈압이 오릅니다. 지금은 반대 양상이므로 악화로 해석합니다.",
          "Stable은 언제든 Unstable로 바뀔 수 있습니다 — 재평가가 생명입니다."
        ),
        step(
          "STEP 2. 맥박은 있으나 불안정한 빈맥입니다. 우선 고려하는 치료는?",
          [
            "동기화 심율동전환(synchronized cardioversion)",
            "Adenosine을 계속 반복",
            "맥박이 있어도 비동기 제세동"
          ],
          "동기화 심율동전환(synchronized cardioversion)",
          "맥박이 있는 불안정 빈맥의 핵심 치료는 동기화 심율동전환입니다.",
          "약만 반복하거나 비동기 제세동으로 바로 가지 않습니다.",
          "비동기 제세동은 무맥(VF/pVT)에서 씁니다. 유맥 불안정에서는 R파 동기화가 필요합니다.",
          "유맥 불안정 = 동기화, 무맥 = 비동기. 이 구분이 안전을 가릅니다."
        ),
        step(
          "STEP 3. 심율동전환을 준비·시행하며 간호사가 집중 관찰할 것은?",
          [
            "의식·BP·ECG/HR·관류 상태",
            "체중 변화",
            "피부 색소 침착"
          ],
          "의식·BP·ECG/HR·관류 상태",
          "불안정 평가·처치 반응은 의식·혈압·리듬·관류로 판단합니다.",
          "지금 상황과 무관한 지표에 집중하면 악화를 놓칩니다.",
          "악화 시 심정지 전환 가능성을 염두에 두고 연속 재평가합니다.",
          "Assess–Intervene–Reassess를 짧은 주기로 반복합니다."
        ),
        step(
          "STEP 4. 처치 중 맥박이 소실됐습니다. 지금 즉시 전환할 것은?",
          [
            "심정지 알고리즘 — 고품질 CPR 시작, 리듬 확인",
            "계속 동기화 심율동전환을 시도",
            "Adenosine을 재투여"
          ],
          "심정지 알고리즘 — 고품질 CPR 시작, 리듬 확인",
          "무맥이 되면 즉시 심정지 알고리즘(CPR·리듬 확인·제세동 여부 판단)으로 전환합니다.",
          "유맥 치료(동기화·Adenosine)를 무맥에서 이어가면 안 됩니다.",
          "동기화는 R파가 있어야 가능하고, Adenosine은 안정 SVT 약입니다. 무맥에는 모두 부적합합니다.",
          "맥박 소실 = 즉시 알고리즘 전환. 상황이 바뀌면 길도 바뀝니다."
        ),
        step(
          "STEP 5. CPR 중 리듬을 보니 VF입니다. 다음 판단은?",
          [
            "충격 가능 리듬 — 제세동 + CPR, 이후 Epinephrine 흐름",
            "안정 SVT 약물 경로로 복귀",
            "Norepinephrine 정주로 혈압부터 올린다"
          ],
          "충격 가능 리듬 — 제세동 + CPR, 이후 Epinephrine 흐름",
          "VF는 충격 가능 리듬이므로 제세동과 CPR, 이후 Epinephrine 흐름으로 진행합니다.",
          "무맥 심정지에서 SVT 경로·정주 승압제로 돌아가지 않습니다.",
          "Norepinephrine은 맥박이 돌아온 뒤(ROSC) 저혈압 관리에 쓰지, 무맥 VF 대응이 아닙니다.",
          "하나의 CASE 안에서도 안정 → 불안정 → 무맥 → VF로 길이 계속 바뀝니다."
        )
      ]
    }
  ],
  /* ---------- Bradycardia ---------- */
  bradycardia: [
    {
      id: "brady-symptomatic",
      caseLabel: "CASE · 어지럼·저혈압을 동반한 서맥",
      title: "어지럼·저혈압을 동반한 서맥",
      difficulty: "basic",
      rhythm: "Sinus bradycardia",
      text: "79세 환자. HR 34, BP 84/50, 어지럼·식은땀을 호소합니다. 고칼륨 소견은 없습니다.",
      hr: "34",
      bp: "84/50",
      spo2: "95%",
      ecgBeatWidth: 300,
      ecgKey: "bradycardia",
      steps: [
        step(
          "STEP 1. HR 34, BP 84/50, 어지럼·식은땀. 이 환자의 문제를 한마디로 하면?",
          [
            "증상성 서맥으로 관류가 저하된 상태",
            "무증상 서맥으로 관찰만 하면 되는 상태",
            "빈맥성 부정맥"
          ],
          "증상성 서맥으로 관류가 저하된 상태",
          "느린 맥박에 저혈압·어지럼·식은땀이 동반된 관류 저하 상태입니다.",
          "증상·저혈압이 있으므로 단순 관찰 대상이 아닙니다.",
          "무증상 서맥이면 관찰·원인 파악 위주지만, 증상이 있으면 개입이 필요합니다. 빈맥과는 방향이 반대입니다.",
          "서맥은 ‘숫자’보다 ‘증상·관류’로 개입 여부를 정합니다."
        ),
        step(
          "STEP 2. 증상성 서맥·저혈압에서 약물로 고려할 수 있는 것은?",
          ["Dopamine (MDOPA)", "Adenosine (MADEN)", "Amiodarone (MCDR)"],
          "Dopamine (MDOPA)",
          "관류가 떨어진 증상성 서맥에서 Dopamine 정주로 HR·BP를 지지할 수 있습니다.",
          "Adenosine·Amiodarone은 빈맥/부정맥 약으로 서맥에는 부적절합니다.",
          "Adenosine은 오히려 심박을 더 늦출 수 있어 서맥에서는 위험합니다. Amiodarone도 이 맥락의 약이 아닙니다.",
          "서맥에 심박을 낮추는 약(Adenosine)을 주지 않습니다."
        ),
        step(
          "STEP 3. Dopamine 정주 중 특히 관찰할 것은?",
          [
            "빈맥·부정맥 등 과교정과 HR/BP 반응",
            "소변 색만",
            "체온만"
          ],
          "빈맥·부정맥 등 과교정과 HR/BP 반응",
          "Dopamine은 빈맥·부정맥을 유발할 수 있어 효과와 부작용을 함께 봅니다.",
          "효과(HR/BP)와 유해작용을 같이 관찰해야 합니다.",
          "다른 지표도 필요하지만, 이 약의 핵심 위험은 과도한 심박 증가·부정맥입니다.",
          "정주 변력·승압 약물은 ‘효과’와 ‘부작용’을 한 화면에서 봅니다."
        )
      ]
    },
    {
      id: "brady-inferior-mi",
      caseLabel: "CASE · 하벽심근경색이 의심되는 서맥",
      title: "하벽심근경색이 의심되는 서맥",
      difficulty: "intermediate",
      rhythm: "Bradycardia",
      text: "66세 환자. 하벽심근경색이 의심됩니다. HR 38, BP 86/52, 오심·식은땀이 있고 서맥이 동반됩니다.",
      hr: "38",
      bp: "86/52",
      spo2: "94%",
      ecgBeatWidth: 300,
      ecgKey: "bradycardia",
      steps: [
        step(
          "STEP 1. 하벽 MI 의심 + HR 38 + 저혈압. 지금 가장 중요한 판단은?",
          [
            "허혈이 동반된 증상성 서맥으로 관류·원인을 함께 평가",
            "단순 미주신경성 실신",
            "빈맥성 부정맥"
          ],
          "허혈이 동반된 증상성 서맥으로 관류·원인을 함께 평가",
          "허혈 맥락의 증상성 서맥입니다. 관류 지지와 함께 원인(허혈) 평가가 필요합니다.",
          "저혈압·허혈 소견이 있어 단순 실신으로 보긴 어렵습니다.",
          "빈맥과는 방향이 반대이고, 원인(하벽 MI)을 고려해야 다음 처치가 이어집니다.",
          "리듬만 보지 말고 ‘왜 서맥인가(허혈)’를 함께 봅니다."
        ),
        step(
          "STEP 2. 이 상황에서 피해야 하는 판단은?",
          [
            "Stable SVT로 보고 Adenosine을 투여",
            "활력·증상을 재평가",
            "ECG를 지속 감시"
          ],
          "Stable SVT로 보고 Adenosine을 투여",
          "서맥 환자에게 Adenosine은 맥락이 맞지 않고 심박을 더 늦출 수 있어 위험합니다.",
          "재평가·ECG 감시는 오히려 반드시 해야 할 일입니다.",
          "적응증이 다른 약을 습관적으로 준비하면 안 됩니다. 서맥 ≠ Adenosine.",
          "‘해야 할 것’만큼 ‘하면 안 되는 것’을 아는 게 안전입니다."
        ),
        step(
          "STEP 3. 증상성 서맥으로 관류가 저하된 지금 고려할 약물은?",
          [
            "Dopamine (MDOPA)",
            "Adenosine (MADEN)",
            "고칼륨 확인 없이 Calcium gluconate"
          ],
          "Dopamine (MDOPA)",
          "증상성 서맥·저관류에서 Dopamine을 고려할 수 있습니다(원인 치료와 병행).",
          "Adenosine은 부적절하고, Calcium은 고칼륨이 확인될 때 검토합니다.",
          "Calcium은 고칼륨혈증 심근 안정화 맥락에서 쓰지, 확인 없이 서맥에 쓰지 않습니다.",
          "약 선택 = 리듬 + 임상 맥락(원인)."
        ),
        step(
          "STEP 4. 처치 중 재평가 항목으로 적절한 것은?",
          [
            "HR·BP·흉통/관류 증상·ECG 변화",
            "체중만",
            "피부 보습 상태만"
          ],
          "HR·BP·흉통/관류 증상·ECG 변화",
          "허혈 + 서맥은 종합 재평가가 필요하고 악화 시 심정지 전환도 대비합니다.",
          "핵심 지표(활력·흉통·ECG)를 빼면 악화를 놓칩니다.",
          "허혈이 진행하면 리듬·혈역학이 급변할 수 있습니다.",
          "Assess → Intervene → Reassess, 그리고 원인 치료로 연결합니다."
        )
      ]
    },
    {
      id: "brady-drug-induced",
      caseLabel: "CASE · 약제 관련 서맥이 의심되는 환자",
      title: "약제 관련 서맥이 의심되는 환자",
      difficulty: "intermediate",
      rhythm: "Bradycardia",
      text: "78세 환자. 베타차단제를 복용 중이며 HR 40, BP 88/54, 무기력합니다. 약물 유발 서맥이 의심됩니다.",
      hr: "40",
      bp: "88/54",
      spo2: "96%",
      ecgBeatWidth: 300,
      ecgKey: "bradycardia",
      steps: [
        step(
          "STEP 1. 베타차단제 복용 + HR 40 + 저혈압. 가장 가능성 높은 원인 방향은?",
          [
            "약제(베타차단제) 관련 서맥 가능성",
            "빈맥성 부정맥",
            "감염성 쇼크"
          ],
          "약제(베타차단제) 관련 서맥 가능성",
          "복용력과 서맥·저혈압을 함께 보면 약제 유발 서맥을 우선 고려합니다.",
          "빈맥·감염 쇼크와는 양상이 다릅니다.",
          "원인 방향을 잡아야 특수 치료·관류 지지 등 다음 단계가 이어집니다.",
          "서맥에서는 반드시 ‘복용 약력’을 확인합니다."
        ),
        step(
          "STEP 2. 증상성 서맥으로 관류가 저하된 지금 우선 고려할 약물은?",
          ["Dopamine (MDOPA)", "Adenosine (MADEN)", "Amiodarone (MCDR)"],
          "Dopamine (MDOPA)",
          "관류 지지를 위해 Dopamine 정주를 고려할 수 있습니다(원인 치료와 병행).",
          "Adenosine·Amiodarone은 이 상황의 1차가 아닙니다.",
          "특수 해독(예: glucagon 등)은 의료진 판단이며, 간호 우선순위는 관류 지지·모니터링입니다.",
          "원인 치료와 ‘관류 지지’를 동시에 굴립니다."
        ),
        step(
          "STEP 3. Dopamine premix를 준비할 때 반드시 확인할 것은?",
          [
            "M8DOPAM / M16DOPAM 농도·코드 구분",
            "색이 비슷하면 같은 것으로 사용",
            "코드 확인 없이 속도만 설정"
          ],
          "M8DOPAM / M16DOPAM 농도·코드 구분",
          "동일 성분이라도 함량(농도)이 다르면 투여 해석이 완전히 달라져 이중 확인이 필수입니다.",
          "색·습관으로 판단하면 심각한 투약 오류가 됩니다.",
          "농도 혼동은 과·소투여로 이어지는 대표적 안전사고입니다.",
          "Premix는 라벨의 mg 함량을 소리 내어 재확인합니다."
        ),
        step(
          "STEP 4. 투여 목표(성공 기준)로 적절한 것은?",
          [
            "HR/BP 상승과 어지럼·관류 증상의 개선",
            "일부러 AV block을 유발",
            "무맥성으로 전환되는지 관찰"
          ],
          "HR/BP 상승과 어지럼·관류 증상의 개선",
          "서맥 치료의 목표는 숫자와 함께 관류·증상이 좋아지는 것입니다.",
          "AV block 유발·무맥 전환은 치료 목표가 아닙니다.",
          "활력 수치 상승이 실제 관류 개선으로 이어지는지 함께 확인합니다.",
          "성공 = 숫자 + 증상/관류의 동반 개선."
        )
      ]
    },
    {
      id: "brady-av-block",
      caseLabel: "CASE · 고도 방실차단이 의심되는 서맥",
      title: "고도 방실차단이 의심되는 서맥",
      difficulty: "advanced",
      rhythm: "Complete AV block",
      text: "81세 환자. Complete AV block이 의심됩니다. HR 32, BP 80/48, 어지럼·처짐이 있고 SpO₂ 93%입니다.",
      hr: "32",
      bp: "80/48",
      spo2: "93%",
      ecgBeatWidth: 300,
      ecgKey: "bradycardia",
      steps: [
        step(
          "STEP 1. HR 32, BP 80/48, 어지럼·처짐. 이 상태를 어떻게 해석하나요?",
          [
            "고도 방실차단에 의한 증상성 서맥·저관류",
            "정상 변이",
            "안정 SVT"
          ],
          "고도 방실차단에 의한 증상성 서맥·저관류",
          "매우 느린 맥박과 저혈압·증상 — 고도 AV block에 의한 관류 저하입니다.",
          "증상·저혈압이 뚜렷해 정상 변이로 보기 어렵습니다.",
          "SVT는 빈맥이라 방향이 반대입니다. 지금은 서맥·저관류입니다.",
          "심각한 서맥일수록 ‘전기적 치료(pacing)’ 가능성도 함께 떠올립니다."
        ),
        step(
          "STEP 2. 지금 가장 시급한 목표는?",
          [
            "관류 회복(HR/BP 지지)과 pacing 필요성 평가",
            "칼륨 수치부터 정상화",
            "빈맥 조절"
          ],
          "관류 회복(HR/BP 지지)과 pacing 필요성 평가",
          "저관류를 되돌리는 것이 시급하며, 약물 반응이 부족하면 pacing을 고려합니다.",
          "빈맥 조절은 방향이 반대이고, 칼륨은 확인된 이상이 있을 때 다룹니다.",
          "고도 AV block은 약물 반응이 제한적일 수 있어 pacing 준비를 병행합니다.",
          "약이 안 들 상황을 미리 대비(전기적 치료)하는 것이 고급 판단입니다."
        ),
        step(
          "STEP 3. 관류가 떨어진 증상성 고도 서맥에서 약물로 고려할 수 있는 것은?",
          [
            "Dopamine (MDOPA)",
            "Adenosine (MADEN)",
            "산증 확인 없이 Sodium bicarbonate"
          ],
          "Dopamine (MDOPA)",
          "관류가 떨어진 증상성 고도 서맥에서 Dopamine 정주를 고려할 수 있습니다.",
          "Adenosine은 부적절하고, Bicarbonate는 산증이 확인될 때 검토합니다.",
          "Bicarbonate는 산증·특정 상황의 약이고, Adenosine은 심박을 더 낮춥니다. 지금은 둘 다 맞지 않습니다.",
          "서맥에 심박을 낮추는 약·근거 없는 약을 배제합니다."
        ),
        step(
          "STEP 4. 정주 중 최우선 모니터링은?",
          ["ECG·HR·BP 연속 감시", "다음 교대 때 한 번 확인", "체중만"],
          "ECG·HR·BP 연속 감시",
          "연속 모니터링으로 효과와 빈맥·부정맥 부작용을 동시에 봅니다.",
          "간헐 확인·무관 지표로는 급변을 놓칩니다.",
          "심각한 전도장애는 급격히 악화되거나 심정지로 갈 수 있습니다.",
          "고위험 환자일수록 모니터 트렌드를 실시간으로 봅니다."
        ),
        step(
          "STEP 5. Dopamine에도 HR·관류가 회복되지 않습니다. 다음 판단은?",
          [
            "활력·ECG 재평가 후 pacing 등 다음 전략을 의료진과 재논의",
            "임의로 Adenosine을 추가",
            "여러 승압제를 임의로 동시에 추가"
          ],
          "활력·ECG 재평가 후 pacing 등 다음 전략을 의료진과 재논의",
          "약물 반응이 없으면 재평가하고, pacing 등 다음 전략을 팀과 결정합니다.",
          "적응증 없는 약 추가·임의 병용은 위험합니다.",
          "고도 AV block은 약물보다 전기적 치료(pacing)가 결정적일 수 있습니다.",
          "안 들으면 ‘더 넣기’가 아니라 ‘경로 전환(pacing) + 팀 논의’입니다."
        )
      ]
    }
  ],
  /* ---------- Shock / Hypotension ---------- */
  shock: [
    {
      id: "shock-septic",
      caseLabel: "CASE · 수액 후에도 지속되는 패혈성 쇼크",
      title: "수액 후에도 지속되는 패혈성 쇼크",
      difficulty: "basic",
      rhythm: "Sinus tachycardia",
      text: "67세 폐렴 환자. 수액 소생 후에도 BP 78/40, HR 122, 사지 냉감, lactate 상승이 지속됩니다.",
      hr: "122",
      bp: "78/40",
      spo2: "94%",
      ecgBeatWidth: 250,
      ecgKey: "sinus_tachy",
      steps: [
        step(
          "STEP 1. 수액 후에도 BP 78/40, 냉감, lactate 상승. 이 환자의 핵심 문제는?",
          [
            "수액에 반응하지 않는 패혈성 쇼크(저관류)",
            "단순 탈수",
            "빈맥성 부정맥"
          ],
          "수액에 반응하지 않는 패혈성 쇼크(저관류)",
          "감염 + 수액 불응 저혈압 + 저관류(냉감·lactate) — 패혈성 쇼크입니다.",
          "수액에 반응하지 않으므로 단순 탈수로 보기 어렵습니다.",
          "빈맥은 쇼크의 보상 결과일 뿐, 일차 문제는 순환 부전입니다.",
          "빈맥은 원인이 아니라 결과일 수 있습니다 — 전체 그림을 봅니다."
        ),
        step(
          "STEP 2. 일반적으로 이 상황의 1차 vasopressor는?",
          ["Norepinephrine (MLEVO)", "Adenosine (MADEN)", "Amiodarone (MCDR)"],
          "Norepinephrine (MLEVO)",
          "패혈성 쇼크의 일반적 1차 승압제는 Norepinephrine으로, 혈관수축으로 MAP를 올립니다.",
          "Adenosine·Amiodarone은 부정맥 약으로 쇼크 승압제가 아닙니다.",
          "빈맥이라고 Adenosine을 주면 순환을 더 악화시킬 수 있습니다. Amiodarone도 이 맥락이 아닙니다.",
          "Shock → MLEVO(Norepinephrine) first."
        ),
        step(
          "STEP 3. Norepinephrine 정주 중 간호 핵심은?",
          [
            "MAP/BP·말초순환·정맥로 침윤 확인",
            "ECG 없이 주관적 증상만 확인",
            "약물 코드 확인은 생략"
          ],
          "MAP/BP·말초순환·정맥로 침윤 확인",
          "승압제는 목표 MAP 도달과 라인 안전(침윤·허혈) 관리가 함께 갑니다.",
          "모니터링·라인 확인·코드 확인을 생략하면 위험합니다.",
          "말초 정맥 침윤 시 조직 허혈이 생길 수 있어 라인 관리가 중요합니다.",
          "승압제 = 목표 MAP + 라인/관류 안전을 세트로 봅니다."
        )
      ]
    },
    {
      id: "shock-persistent",
      caseLabel: "CASE · 감염 치료 중 지속되는 저혈압",
      title: "감염 치료 중 지속되는 저혈압",
      difficulty: "intermediate",
      rhythm: "Sinus tachycardia",
      text: "74세 요로패혈증. 항생제·수액 후에도 BP 80/46, HR 110이며 의식이 다소 처집니다.",
      hr: "110",
      bp: "80/46",
      spo2: "95%",
      ecgBeatWidth: 260,
      ecgKey: "sinus_tachy",
      steps: [
        step(
          "STEP 1. 항생제·수액 후에도 저혈압·의식 저하가 지속됩니다. 지금 판단은?",
          [
            "치료에도 지속되는 패혈성 쇼크",
            "회복 중인 감염",
            "고칼륨성 부정맥"
          ],
          "치료에도 지속되는 패혈성 쇼크",
          "치료 중에도 저혈압·의식 저하가 지속되는 지속성 패혈성 쇼크입니다.",
          "활력·의식이 악화·정체면 회복 중으로 보기 어렵습니다.",
          "고칼륨·부정맥 단서가 없으므로 그 경로가 아닙니다.",
          "‘치료했다’가 아니라 ‘반응했는가’로 판단합니다."
        ),
        step(
          "STEP 2. 지금 우선 필요한 약물군은?",
          [
            "혈관수축 승압제 — Norepinephrine",
            "AV node 차단제 — Adenosine",
            "심근막 안정화제 — Calcium"
          ],
          "혈관수축 승압제 — Norepinephrine",
          "지속 저혈압 septic shock에서 목표 MAP 달성을 위해 Norepinephrine이 우선입니다.",
          "Adenosine·Calcium은 각각 빈맥·고칼륨 맥락의 약입니다.",
          "약을 ‘기전(약물군)’으로 분류하면 상황과 맞출 수 있습니다.",
          "약을 ‘무슨 군인가’로 묶어 상황에 매칭합니다."
        ),
        step(
          "STEP 3. Dopamine premix 관련 옳은 설명은?",
          [
            "M8DOPAM(저농도)과 M16DOPAM(고농도)을 구분해 다룬다",
            "M8과 M16은 항상 같다",
            "Premix는 코드 확인이 필요 없다"
          ],
          "M8DOPAM(저농도)과 M16DOPAM(고농도)을 구분해 다룬다",
          "같은 성분이라도 농도가 다르면 위험하므로 코드·농도를 구분합니다.",
          "동일 취급·코드 미확인은 투약 오류로 이어집니다.",
          "병원코드가 다른 이유를 안전 관점에서 이해해야 합니다.",
          "M8 vs M16 = 농도 이중 확인."
        ),
        step(
          "STEP 4. 재평가 항목으로 적절한 것은?",
          [
            "MAP/BP·HR·소변량/관류·환자 반응",
            "피부색 한 번만",
            "다음 날 전해질만"
          ],
          "MAP/BP·HR·소변량/관류·환자 반응",
          "쇼크는 목표 MAP 도달과 부작용을 연속 재평가합니다.",
          "단발/지연 확인만으로는 부족합니다.",
          "숫자(MAP)와 조직 관류(소변량 등)를 함께 봐야 진짜 반응을 압니다.",
          "목표를 정하고 반복 재평가 — 숫자 + 관류."
        )
      ]
    },
    {
      id: "shock-map",
      caseLabel: "CASE · MAP가 크게 감소한 쇼크",
      title: "MAP가 크게 감소한 쇼크",
      difficulty: "intermediate",
      rhythm: "Sinus tachycardia",
      text: "62세 감염 의심. BP 70/38로 MAP가 크게 감소했고 HR 128, SpO₂ 92%. 사지가 찹니다.",
      hr: "128",
      bp: "70/38",
      spo2: "92%",
      ecgBeatWidth: 240,
      ecgKey: "sinus_tachy",
      steps: [
        step(
          "STEP 1. BP 70/38(MAP 급감), HR 128, 사지 냉감. 핵심 문제는?",
          [
            "MAP 저하로 장기 관류가 위협받는 쇼크",
            "빈맥이 원인인 SVT",
            "고칼륨성 서맥"
          ],
          "MAP 저하로 장기 관류가 위협받는 쇼크",
          "낮은 MAP + 빈맥 + 냉감 — 관류압이 무너진 쇼크입니다.",
          "빈맥은 보상 반응일 수 있어 SVT로 단정하지 않습니다.",
          "서맥이 아니고 고칼륨 단서도 없어 그 경로가 아닙니다.",
          "빈맥 = 항상 SVT가 아닙니다. MAP·관류를 봅니다."
        ),
        step(
          "STEP 2. MAP 유지를 위해 우선 고려할 약물은?",
          ["Norepinephrine (MLEVO)", "Adenosine (MADEN)", "Amiodarone (MCDR)"],
          "Norepinephrine (MLEVO)",
          "MAP 유지를 위해 강한 혈관수축의 Norepinephrine을 우선 고려합니다.",
          "빈맥이라고 Adenosine부터 주면 순환이 더 나빠질 수 있습니다.",
          "원인 교정과 함께 관류압 확보가 우선입니다. Amiodarone도 이 맥락이 아닙니다.",
          "쇼크에서 첫 목표는 ‘MAP 확보’입니다."
        ),
        step(
          "STEP 3. Norepinephrine 작용 설명으로 옳은 것은?",
          [
            "강한 혈관수축 → MAP 상승",
            "AV node 차단 → 리듬 전환",
            "심근막 안정화"
          ],
          "강한 혈관수축 → MAP 상승",
          "α-작용 혈관수축으로 MAP를 올립니다.",
          "AV node 차단은 Adenosine, 심근 안정화는 Calcium 개념입니다.",
          "약-작용 매칭을 정확히 하면 오답이 줄어듭니다.",
          "MLEVO = 혈관수축 / MAP."
        ),
        step(
          "STEP 4. 특히 주의할 간호 문제는?",
          [
            "정맥 침윤 및 말초 허혈",
            "일시적 AV block만 보면 충분",
            "칼륨 급저하만 관찰"
          ],
          "정맥 침윤 및 말초 허혈",
          "강력 승압제는 침윤 시 조직 허혈 위험이 커 라인 관리가 핵심입니다.",
          "관련 없는 지표에만 집중하면 합병증을 놓칩니다.",
          "적절한 정맥로 확보·지속 관찰이 안전의 핵심입니다.",
          "승압제 투약 체크리스트에 ‘라인/침윤’을 넣습니다."
        )
      ]
    },
    {
      id: "shock-perfusion",
      caseLabel: "CASE · 말초 관류 저하가 뚜렷한 쇼크",
      title: "말초 관류 저하가 뚜렷한 쇼크",
      difficulty: "advanced",
      rhythm: "Sinus tachycardia",
      text: "팀 브리핑: 수액 후에도 MAP가 오르지 않고 말초 관류가 불량한 septic shock. HR 118, BP 76/42.",
      hr: "118",
      bp: "76/42",
      spo2: "94%",
      ecgBeatWidth: 250,
      ecgKey: "sinus_tachy",
      steps: [
        step(
          "STEP 1. 수액 후에도 MAP·관류가 회복되지 않습니다. 상태 해석은?",
          [
            "수액 불응성 저관류 쇼크(승압 필요)",
            "수액이 부족한 초기 탈수",
            "안정 SVT"
          ],
          "수액 불응성 저관류 쇼크(승압 필요)",
          "수액에도 MAP·관류가 회복되지 않는 쇼크로 승압이 필요합니다.",
          "이미 수액에 불응하므로 초기 탈수로 보기 어렵습니다.",
          "빈맥은 있으나 안정 SVT의 조건(안정 활력)과는 다릅니다.",
          "‘수액 반응성’을 판단 기준에 넣습니다."
        ),
        step(
          "STEP 2. 지금 일반적인 1차 선택은?",
          [
            "Norepinephrine 정주",
            "Calcium gluconate 정주",
            "Adenosine 정주"
          ],
          "Norepinephrine 정주",
          "중환자 실무에서 septic shock 1차 승압제는 Norepinephrine입니다.",
          "Calcium은 고칼륨, Adenosine은 SVT 약입니다.",
          "지금 문제는 순환 부전이지 고칼륨·빈맥이 아닙니다.",
          "Shock → MLEVO first."
        ),
        step(
          "STEP 3. Dopamine(MDOPA)을 함께 쓰게 될 때 간호 핵심은?",
          [
            "HR/부정맥 관찰과 용량·농도 확인",
            "코드 확인 없이 속도만 올림",
            "ECG 모니터링 생략"
          ],
          "HR/부정맥 관찰과 용량·농도 확인",
          "Dopamine은 빈맥·부정맥 위험이 있어 ECG/HR 감시와 농도·코드 확인이 필수입니다.",
          "코드 미확인·모니터링 생략은 위험합니다.",
          "MDOPA와 M8/M16 premix를 혼동하지 않도록 라벨을 재확인합니다.",
          "Premix·변력약은 ‘농도 + ECG’가 한 세트입니다."
        ),
        step(
          "STEP 4. 승압 효과 판정을 위한 재평가로 적절한 것은?",
          [
            "목표 MAP 도달 여부와 조직 관류 지표(소변량·의식·젖산 추세)",
            "즉시 모든 승압제 중단",
            "호흡수만 보고 판단"
          ],
          "목표 MAP 도달 여부와 조직 관류 지표(소변량·의식·젖산 추세)",
          "승압 효과는 MAP와 조직 관류로 종합 판정합니다.",
          "임의 중단·단일 지표 판단은 위험합니다.",
          "숫자(MAP)와 임상 관류(소변·의식)를 함께 봐야 실제 개선을 압니다.",
          "목표를 정하고 여러 지표로 재평가합니다."
        ),
        step(
          "STEP 5. 적절한 승압에도 MAP·관류가 개선되지 않습니다. 다음 판단은?",
          [
            "원인(감염원 등)·용량·수액 상태를 재평가하고 다음 전략을 팀과 논의",
            "승압제 속도만 무제한으로 올린다",
            "임의로 여러 승압제를 동시에 추가"
          ],
          "원인(감염원 등)·용량·수액 상태를 재평가하고 다음 전략을 팀과 논의",
          "반응이 없으면 원인·용량·수액 상태를 재평가하고 추가 승압·원인 치료를 팀과 결정합니다.",
          "무제한 증량·임의 병용은 안전하지 않습니다.",
          "감염원 조절 등 근본 원인이 해결되지 않으면 승압만으로는 한계가 있습니다.",
          "반응 없음 = 원인·근거로 회귀, 그리고 팀 결정."
        )
      ]
    }
  ],
  /* ---------- Hyperkalemia ---------- */
  hyperkalemia: [
    {
      id: "hk-no-ecg",
      caseLabel: "CASE · ECG 변화 없는 고칼륨혈증",
      title: "ECG 변화 없는 고칼륨혈증",
      difficulty: "basic",
      rhythm: "Sinus rhythm",
      text: "60세 CKD 환자. K 6.1. HR 78, BP 128/76. ECG에서 뚜렷한 전도장애·peaked T는 없고 의식은 명료합니다.",
      hr: "78",
      bp: "128/76",
      spo2: "98%",
      ecgBeatWidth: 300,
      ecgKey: "sinus",
      steps: [
        step(
          "STEP 1. K 6.1이지만 ECG 변화가 없고 활력이 안정적입니다. 지금 가장 적절한 태도는?",
          [
            "ECG·활력을 지속 감시하며 원인·처방을 확인",
            "무조건 즉시 Calcium gluconate 투여",
            "Adenosine 투여"
          ],
          "ECG·활력을 지속 감시하며 원인·처방을 확인",
          "ECG 변화가 없으면 무조건 Calcium부터가 아니라, 감시하며 원인·처방에 따라 접근합니다.",
          "심독성 징후가 없을 때 반사적으로 Calcium을 밀지 않습니다.",
          "Calcium 심근 안정화는 ECG 변화(심독성)가 있을 때 특히 우선됩니다. Adenosine은 고칼륨 처치가 아닙니다.",
          "K 숫자와 ECG를 ‘함께’ 해석합니다."
        ),
        step(
          "STEP 2. Calcium gluconate의 역할을 바르게 설명한 것은?",
          [
            "칼륨을 직접 낮추지 않고 심근을 안정화한다",
            "칼륨을 소변으로 바로 배설시킨다",
            "패혈성 쇼크의 1차 승압제다"
          ],
          "칼륨을 직접 낮추지 않고 심근을 안정화한다",
          "Calcium은 심근세포막을 안정화할 뿐, 칼륨 수치를 직접 내리지 않습니다.",
          "이뇨·승압 약물이 아닙니다.",
          "고칼륨 치료는 ‘안정화 / 이동 / 제거’로 나뉘며 Calcium은 안정화에 해당합니다.",
          "‘칼슘 = 칼륨 하락’이라는 오해를 버립니다."
        ),
        step(
          "STEP 3. 감시 중 새로 peaked T가 나타났습니다. 다음 판단은?",
          [
            "심근 안정화(Calcium gluconate, MCAGLU)를 우선 고려",
            "Adenosine으로 전환",
            "변화를 무시하고 관찰만 지속"
          ],
          "심근 안정화(Calcium gluconate, MCAGLU)를 우선 고려",
          "ECG 변화(심독성)가 나타나면 심장 보호가 우선입니다.",
          "Adenosine은 고칼륨 처치가 아니고, 새 ECG 변화를 무시해서는 안 됩니다.",
          "상황이 바뀌면(ECG 변화 출현) 우선순위도 바뀝니다.",
          "재평가에서 ECG 변화가 보이면 치료 강도를 올립니다."
        )
      ]
    },
    {
      id: "hk-tall-t",
      caseLabel: "CASE · Peaked T wave가 동반된 고칼륨혈증",
      title: "Peaked T wave가 동반된 고칼륨혈증",
      difficulty: "basic",
      rhythm: "Sinus bradycardia with peaked T",
      text: "82세 CKD 환자. K 7.2, HR 38, BP 88/50. ECG에서 tall/peaked T wave가 관찰됩니다.",
      hr: "38",
      bp: "88/50",
      spo2: "94%",
      ecgBeatWidth: 300,
      ecgKey: "hyperkalemia",
      steps: [
        step(
          "STEP 1. K 7.2 + peaked T + 서맥. 가장 시급한 위험은?",
          [
            "고칼륨에 의한 심독성(전도장애/부정맥) 위험",
            "단순 탈수",
            "감염성 쇼크"
          ],
          "고칼륨에 의한 심독성(전도장애/부정맥) 위험",
          "높은 K + peaked T + 서맥 — 심독성 위험이 시급합니다.",
          "탈수·감염 쇼크 소견과는 다릅니다.",
          "ECG 변화가 동반된 고칼륨은 심정지로 진행할 수 있어 심장 보호가 급합니다.",
          "고칼륨에서 무서운 건 ‘숫자’보다 ‘심독성(ECG)’입니다."
        ),
        step(
          "STEP 2. 가장 먼저 고려할 약물은?",
          ["Calcium gluconate (MCAGLU)", "Sodium bicarbonate (MBIVON)", "Amiodarone (MCDR)"],
          "Calcium gluconate (MCAGLU)",
          "ECG 변화가 동반된 고칼륨에서는 심근 안정화(Calcium)가 우선입니다.",
          "Amiodarone은 이 상황의 약이 아니고, Bicarbonate는 산증 동반 시 보조로 고려합니다.",
          "먼저 심장을 보호(안정화)한 뒤 이동·제거 전략을 이어갑니다.",
          "심독성 고칼륨: 안정화(Calcium)가 먼저입니다."
        ),
        step(
          "STEP 3. 산증이 동반된 경우 추가로 고려할 약물은?",
          ["Sodium bicarbonate (MBIVON)", "Adenosine (MADEN)", "Dopamine (MDOPA)"],
          "Sodium bicarbonate (MBIVON)",
          "산증 동반 시 Bicarbonate가 K의 세포 내 이동을 보조할 수 있습니다.",
          "Adenosine·Dopamine은 고칼륨 이동/제거 약이 아닙니다.",
          "Bicarbonate는 무조건이 아니라 산증 확인 후 고려합니다.",
          "안정화(Calcium)와 이동(조건부 Bicarbonate)을 구분합니다."
        )
      ]
    },
    {
      id: "hk-wide-qrs",
      caseLabel: "CASE · QRS 확장이 동반된 고칼륨혈증",
      title: "QRS 확장이 동반된 고칼륨혈증",
      difficulty: "intermediate",
      rhythm: "Wide QRS (hyperkalemia pattern)",
      text: "70세 환자. K 7.6, HR 42, BP 86/50. ECG에서 peaked T와 함께 QRS가 넓어져 있습니다.",
      hr: "42",
      bp: "86/50",
      spo2: "93%",
      ecgBeatWidth: 300,
      ecgKey: "hyperkalemia_wide",
      steps: [
        step(
          "STEP 1. peaked T에 더해 QRS가 넓어졌습니다. 이 ECG 소견의 의미는?",
          [
            "심독성이 진행 중(전도장애 악화)이라는 위험 신호",
            "정상 변이",
            "빈맥성 부정맥"
          ],
          "심독성이 진행 중(전도장애 악화)이라는 위험 신호",
          "QRS 확장은 고칼륨 심독성 악화 신호로 심정지 전 단계일 수 있습니다.",
          "정상 변이·빈맥과는 다릅니다.",
          "peaked T → wide QRS → sine wave로 악화될 수 있어 더 시급합니다.",
          "고칼륨 ECG는 ‘진행 단계’로 읽습니다."
        ),
        step(
          "STEP 2. Wide QRS를 동반한 고칼륨에서 1차 개념은?",
          [
            "심근 안정화 — Calcium gluconate (MCAGLU)",
            "즉시 Amiodarone",
            "Adenosine"
          ],
          "심근 안정화 — Calcium gluconate (MCAGLU)",
          "전도장애가 있으면 심장 보호(안정화)가 더욱 시급합니다.",
          "Amiodarone·Adenosine은 고칼륨 1차가 아닙니다.",
          "안정화는 이동/제거를 대체하진 않지만 가장 먼저 시간을 벌어 줍니다.",
          "심독성이 심할수록 Calcium 안정화의 우선순위가 올라갑니다."
        ),
        step(
          "STEP 3. ‘세포 내 이동’ 보조에 해당하는 설명은?",
          [
            "Sodium bicarbonate (MBIVON) — 산증 동반 시 고려",
            "Calcium이 칼륨을 소변으로 배설",
            "Amiodarone이 칼륨을 이동"
          ],
          "Sodium bicarbonate (MBIVON) — 산증 동반 시 고려",
          "산증이 동반되면 Bicarbonate가 K 이동을 보조할 수 있습니다.",
          "Calcium은 배설/이동 약이 아니고 Amiodarone은 무관합니다.",
          "안정화/이동/제거를 명확히 구분해야 오판을 막습니다.",
          "이동 보조의 조건은 ‘산증 여부’입니다."
        ),
        step(
          "STEP 4. 투여 후 우선 재평가 항목은?",
          ["ECG(QRS/T)와 활력징후", "다음 주 외래만", "피부 보습만"],
          "ECG(QRS/T)와 활력징후",
          "심독성에서는 ECG 재평가가 필수이며 전도장애·서맥·심정지 전환을 감시합니다.",
          "지연/무관 지표만으로는 악화를 놓칩니다.",
          "약물 투여는 재평가의 시작입니다(안정화 효과는 일시적).",
          "안정화 후에도 이동·제거·재평가로 이어가야 합니다."
        )
      ]
    },
    {
      id: "hk-dialysis",
      caseLabel: "CASE · 투석 지연 환자의 중증 고칼륨혈증",
      title: "투석 지연 환자의 중증 고칼륨혈증",
      difficulty: "advanced",
      rhythm: "Sinus bradycardia with peaked T",
      text: "55세 유지투석 환자. 투석이 지연되었습니다. K 7.8, peaked T·QRS 확장이 의심되고 HR 46, BP 92/58입니다.",
      hr: "46",
      bp: "92/58",
      spo2: "95%",
      ecgBeatWidth: 300,
      ecgKey: "hyperkalemia",
      steps: [
        step(
          "STEP 1. 유지투석 지연 + K 7.8 + ECG 변화 의심. 상태 해석은?",
          [
            "제거가 지연된 중증 심독성 고칼륨",
            "경증 무증상 고칼륨",
            "감염성 쇼크"
          ],
          "제거가 지연된 중증 심독성 고칼륨",
          "투석(제거) 지연 + ECG 변화 의심 + 높은 K — 중증 심독성 고칼륨입니다.",
          "ECG 변화·높은 K로 경증/무증상으로 보기 어렵습니다.",
          "감염 쇼크와는 맥락이 다릅니다. 문제는 칼륨 제거 지연과 심독성입니다.",
          "‘궁극 치료 = 투석’이라도 지금의 심독성은 즉시 다뤄야 합니다."
        ),
        step(
          "STEP 2. 궁극 치료가 투석(제거)이라도 ‘지금’ 먼저 할 것은?",
          [
            "심근 안정화(Calcium gluconate)로 시간 벌기",
            "투석까지 아무 처치 없이 대기",
            "Epinephrine 정주"
          ],
          "심근 안정화(Calcium gluconate)로 시간 벌기",
          "심독성이 있으면 투석 전에 Calcium으로 심장을 먼저 보호합니다.",
          "대기·Epinephrine은 지금의 심독성 대응이 아닙니다.",
          "안정화는 칼륨을 낮추진 않지만 치명적 부정맥까지 시간을 법니다.",
          "제거가 늦으면 ‘안정화’로 다리를 놓습니다."
        ),
        step(
          "STEP 3. 투석 전 간호사가 명확히 구분해야 할 개념은?",
          ["안정화 / 이동 / 제거", "모두 같은 작용", "승압만 하면 충분"],
          "안정화 / 이동 / 제거",
          "Calcium = 안정화, (조건부) Bicarbonate 등 = 이동, 투석 = 제거로 구분합니다.",
          "세 개념을 뭉개면 처치 순서를 오판합니다.",
          "각 처치의 ‘목적’을 말로 설명할 수 있어야 합니다.",
          "안정화·이동·제거 — 세 축을 분리해서 사고합니다."
        ),
        step(
          "STEP 4. 산증이 확인되면 이동을 돕기 위해 추가로 고려할 약물은?",
          ["Sodium bicarbonate (MBIVON)", "Adenosine (MADEN)", "Amiodarone (MCDR)"],
          "Sodium bicarbonate (MBIVON)",
          "산증 동반 시 Bicarbonate가 K 세포 내 이동을 보조할 수 있습니다.",
          "Adenosine·Amiodarone은 고칼륨 처치가 아닙니다.",
          "이동 보조는 안정화를 대체하지 않는 ‘병행/가교’ 치료입니다.",
          "안정화(Calcium)와 이동(조건부 Bicarbonate)을 세트로 기억합니다."
        ),
        step(
          "STEP 5. 안정화·이동을 했는데도 투석이 계속 지연되고 ECG가 악화됩니다. 다음 판단은?",
          [
            "심독성 재평가 + 이동 치료 유지하며 투석(제거)을 최우선으로 팀과 조율",
            "Calcium만 반복하면 칼륨이 내려간다고 보고 반복",
            "임의로 승압제를 추가"
          ],
          "심독성 재평가 + 이동 치료 유지하며 투석(제거)을 최우선으로 팀과 조율",
          "안정화·이동으로 시간을 버는 동안, 근본 치료인 투석(제거)을 앞당기도록 팀과 조율하고 심독성을 재평가합니다.",
          "Calcium 반복은 칼륨을 낮추지 못하고, 임의 승압제 추가는 문제 해결이 아닙니다.",
          "안정화·이동은 임시책이므로 제거(투석)가 이뤄져야 근본 해결입니다.",
          "임시책(안정화·이동)에 안주하지 말고 ‘제거(원인 해결)’로 연결합니다."
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