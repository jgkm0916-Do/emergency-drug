/* 시나리오 데이터 및 step별 문제 데이터 */

var scenarios = [

  {
    title: "CASE 1. Hyperkalemia",
    text: "82세 CKD 환자. K 7.2, HR 38, ECG에서 peaked T wave가 관찰됩니다.",
    hr: "38",
    bp: "88/50",
    spo2: "94%",

    /* 한 박자 300u: HR과 스크롤 주기 동기 + 고칼륨: tent-shaped peaked T, 약간 넓은 QRS */
    ecgBeatWidth: 300,
    ecg: ECG_PATHS.hyperkalemia,

    steps: [

      {
        question: "STEP 1. 가장 먼저 고려할 약물은?",
        options: [
          "Calcium gluconate",
          "Sodium bicarbonate",
          "Amiodarone"
        ],

        answer: "Calcium gluconate",

        correct:
          "정답입니다. ECG 변화가 동반된 고칼륨혈증에서는 심근 안정화가 가장 우선입니다.",

        wrong:
          "먼저 심장을 보호해야 합니다. Calcium gluconate는 심근 안정화 목적입니다."
      },

      {
        question: "STEP 2. Calcium gluconate의 투약 목적은?",

        options: [
          "칼륨 제거",
          "심근 안정화",
          "이뇨 촉진"
        ],

        answer: "심근 안정화",

        correct:
          "정답입니다. Calcium gluconate는 칼륨을 직접 제거하지 않고 심근을 안정화합니다.",

        wrong:
          "Calcium gluconate는 칼륨 제거 약물이 아닙니다."
      },

      {
        question: "STEP 3. 산증이 동반된 경우 추가 고려 가능한 약물은?",

        options: [
          "Sodium bicarbonate",
          "Adenosine",
          "Dobutamine"
        ],

        answer: "Sodium bicarbonate",

        correct:
          "정답입니다. 산증이 동반된 고칼륨혈증에서는 Sodium bicarbonate를 고려할 수 있습니다.",

        wrong:
          "산증이 동반된 경우 Sodium bicarbonate가 K의 세포 내 이동을 보조할 수 있습니다."
      }

    ]
  }

];
