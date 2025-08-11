import type { Patient } from "../types/patientSummaryType";

export const patients: Patient[] = [
  {
    id: "p001",
    name: "김세희",
    age: 76,
    gender: "여",
    disease: "당뇨병성 신종",
    birth: "1964.11.18",
    inHospital: true,
    bloodTests: [
      { month: "1월", Ferritin: 80, Iron: 60, PTH: 70, TIBC: 65 },
      { month: "2월", Ferritin: 60, Iron: 55, PTH: 75, TIBC: 60 },
      { month: "3월", Ferritin: 85, Iron: 70, PTH: 65, TIBC: 75 },
    ],
    hemoglobinLevels: [
      { month: "4월", Hb: 12 },
      { month: "5월", Hb: 9.5 },
      { month: "6월", Hb: 12 },
    ],
    hematicRecords: [
      {
        date: "Jun 24, 2025",
        hematic: "에리스로포이에틴",
        iu: "5000IU",
        description: "혈압 상승으로 인해 해당 조혈제가 적당함",
      },
      {
        date: "Jun 24, 2025",
        hematic: "다베포에틴-알파",
        iu: "5000IU",
        description: "조혈제 반응이 낮아 용량을 유지함",
      },
      {
        date: "Jun 24, 2025",
        hematic: "다베포에틴-알파",
        iu: "10000IU",
        description: "헤모글로빈 수치 저하로 인해 용량 증량",
      },
    ],
    rounds: [
      {
        round: 1,
        date: "2025.04.21",
        preWeight: 100.2,
        avgWeight: 56.9,
        dryWeight: 50.0,
        targetUF: 6.2,
        postWeight: null,
        weights: [
          {
            date: "4/16",
            pre: 100.6,
            dry: 50,
            post: 50.3,
          },
          {
            date: "4/18",
            pre: 56.5,
            dry: 50,
            post: 50.1,
          },
          {
            date: "4/20",
            pre: 57.2,
            dry: 50,
            post: 50.3,
          },
          {
            date: "4/22",
            pre: 57.8,
            dry: 50,
            post: 50.7,
          },
          {
            date: "4/24",
            pre: 56.2,
            dry: 50,
            post: 50.3,
          },
        ],
        bloodPressure: [
          {
            time: "10:00",
            sys: 149,
            dia: 88,
          },
          {
            time: "11:00",
            sys: 141,
            dia: 90,
          },
          {
            time: "12:00",
            sys: 147,
            dia: 80,
          },
          {
            time: "13:00",
            sys: 132,
            dia: 71,
          },
          {
            time: "14:00",
            sys: 144,
            dia: 76,
          },
        ],
        records: [
          {
            time: "10:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "11:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "12:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "13:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
        ],
      },
      {
        round: 2,
        date: "2025.04.22",
        preWeight: 56.8,
        avgWeight: 57.3,
        dryWeight: 50.0,
        targetUF: 6.8,
        postWeight: 50.5,
        weights: [
          {
            date: "4/16",
            pre: 56.8,
            dry: 50,
            post: 50.8,
          },
          {
            date: "4/18",
            pre: 90.2,
            dry: 50,
            post: 50.4,
          },
          {
            date: "4/20",
            pre: 56.4,
            dry: 50,
            post: 50.3,
          },
          {
            date: "4/22",
            pre: 59.3,
            dry: 50,
            post: 50.3,
          },
          {
            date: "4/24",
            pre: 56.8,
            dry: 50,
            post: 50.5,
          },
        ],
        bloodPressure: [
          {
            time: "10:00",
            sys: 134,
            dia: 76,
          },
          {
            time: "11:00",
            sys: 143,
            dia: 75,
          },
          {
            time: "12:00",
            sys: 159,
            dia: 72,
          },
          {
            time: "13:00",
            sys: 147,
            dia: 77,
          },
          {
            time: "14:00",
            sys: 158,
            dia: 86,
          },
        ],
        records: [
          {
            time: "10:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "11:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "12:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "13:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
        ],
      },
      {
        round: 3,
        date: "2025.04.23",
        preWeight: 59.3,
        avgWeight: 57.7,
        dryWeight: 50.0,
        targetUF: 9.3,
        postWeight: null,
        weights: [
          {
            date: "4/16",
            pre: 56.5,
            dry: 50,
            post: 50.6,
          },
          {
            date: "4/18",
            pre: 58.9,
            dry: 50,
            post: 50.2,
          },
          {
            date: "4/20",
            pre: 56.7,
            dry: 50,
            post: 50.5,
          },
          {
            date: "4/22",
            pre: 57.1,
            dry: 50,
            post: 50.3,
          },
          {
            date: "4/24",
            pre: 59.3,
            dry: 50,
            post: 50.7,
          },
        ],
        bloodPressure: [
          {
            time: "10:00",
            sys: 141,
            dia: 82,
          },
          {
            time: "11:00",
            sys: 164,
            dia: 89,
          },
          {
            time: "12:00",
            sys: 143,
            dia: 75,
          },
          {
            time: "13:00",
            sys: 138,
            dia: 80,
          },
          {
            time: "14:00",
            sys: 148,
            dia: 86,
          },
        ],
        records: [
          {
            time: "10:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "11:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "12:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "13:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
        ],
      },
    ],
  },
  {
    id: "p002",
    name: "이민수",
    age: 82,
    gender: "남",
    disease: "허리디스크",
    birth: "1943.02.17",
    inHospital: false,
    rounds: [
      {
        round: 1,
        date: "2025.04.21",
        preWeight: 57.6,
        avgWeight: 57.7,
        dryWeight: 50.0,
        targetUF: 7.6,
        postWeight: null,
        weights: [
          {
            date: "4/16",
            pre: 58.0,
            dry: 50,
            post: 50.8,
          },
          {
            date: "4/18",
            pre: 56.7,
            dry: 50,
            post: 50.4,
          },
          {
            date: "4/20",
            pre: 59.1,
            dry: 50,
            post: 50.5,
          },
          {
            date: "4/22",
            pre: 57.1,
            dry: 50,
            post: 50.8,
          },
          {
            date: "4/24",
            pre: 57.6,
            dry: 50,
            post: 50.5,
          },
        ],
        bloodPressure: [
          {
            time: "10:00",
            sys: 161,
            dia: 87,
          },
          {
            time: "11:00",
            sys: 141,
            dia: 74,
          },
          {
            time: "12:00",
            sys: 156,
            dia: 80,
          },
          {
            time: "13:00",
            sys: 133,
            dia: 89,
          },
          {
            time: "14:00",
            sys: 150,
            dia: 81,
          },
        ],
        records: [
          {
            time: "10:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "11:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "12:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "13:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
        ],
      },
      {
        round: 2,
        date: "2025.04.22",
        preWeight: 57.3,
        avgWeight: 58.5,
        dryWeight: 50.0,
        targetUF: 7.3,
        postWeight: 50.7,
        weights: [
          {
            date: "4/16",
            pre: 58.8,
            dry: 50,
            post: 50.4,
          },
          {
            date: "4/18",
            pre: 59.3,
            dry: 50,
            post: 50.5,
          },
          {
            date: "4/20",
            pre: 59.0,
            dry: 50,
            post: 50.4,
          },
          {
            date: "4/22",
            pre: 58.2,
            dry: 50,
            post: 50.3,
          },
          {
            date: "4/24",
            pre: 57.3,
            dry: 50,
            post: 50.7,
          },
        ],
        bloodPressure: [
          {
            time: "10:00",
            sys: 151,
            dia: 78,
          },
          {
            time: "11:00",
            sys: 153,
            dia: 89,
          },
          {
            time: "12:00",
            sys: 150,
            dia: 76,
          },
          {
            time: "13:00",
            sys: 144,
            dia: 86,
          },
          {
            time: "14:00",
            sys: 130,
            dia: 75,
          },
        ],
        records: [
          {
            time: "10:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "11:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "12:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "13:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
        ],
      },
      {
        round: 3,
        date: "2025.04.23",
        preWeight: 59.1,
        avgWeight: 57.5,
        dryWeight: 50.0,
        targetUF: 9.1,
        postWeight: null,
        weights: [
          {
            date: "4/16",
            pre: 57.6,
            dry: 50,
            post: 50.3,
          },
          {
            date: "4/18",
            pre: 56.4,
            dry: 50,
            post: 50.2,
          },
          {
            date: "4/20",
            pre: 56.6,
            dry: 50,
            post: 50.4,
          },
          {
            date: "4/22",
            pre: 57.9,
            dry: 50,
            post: 50.9,
          },
          {
            date: "4/24",
            pre: 59.1,
            dry: 50,
            post: 50.4,
          },
        ],
        bloodPressure: [
          {
            time: "10:00",
            sys: 155,
            dia: 85,
          },
          {
            time: "11:00",
            sys: 159,
            dia: 71,
          },
          {
            time: "12:00",
            sys: 161,
            dia: 89,
          },
          {
            time: "13:00",
            sys: 136,
            dia: 74,
          },
          {
            time: "14:00",
            sys: 138,
            dia: 79,
          },
        ],
        records: [
          {
            time: "10:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "11:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "12:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "13:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
        ],
      },
    ],
  },
  {
    id: "p003",
    name: "정하윤",
    age: 37,
    gender: "여",
    birth: "1988.05.03",
    inHospital: true,
    rounds: [
      {
        round: 1,
        date: "2025.04.21",
        preWeight: 57.4,
        avgWeight: 57.3,
        dryWeight: 50.0,
        targetUF: 7.4,
        postWeight: null,
        weights: [
          {
            date: "4/16",
            pre: 56.5,
            dry: 50,
            post: 50.3,
          },
          {
            date: "4/18",
            pre: 58.2,
            dry: 50,
            post: 50.6,
          },
          {
            date: "4/20",
            pre: 57.5,
            dry: 50,
            post: 50.3,
          },
          {
            date: "4/22",
            pre: 56.8,
            dry: 50,
            post: 50.1,
          },
          {
            date: "4/24",
            pre: 57.4,
            dry: 50,
            post: 50.7,
          },
        ],
        bloodPressure: [
          {
            time: "10:00",
            sys: 150,
            dia: 87,
          },
          {
            time: "11:00",
            sys: 132,
            dia: 72,
          },
          {
            time: "12:00",
            sys: 151,
            dia: 73,
          },
          {
            time: "13:00",
            sys: 152,
            dia: 87,
          },
          {
            time: "14:00",
            sys: 142,
            dia: 76,
          },
        ],
        records: [
          {
            time: "10:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "11:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "12:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "13:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
        ],
      },
      {
        round: 2,
        date: "2025.04.22",
        preWeight: 59.4,
        avgWeight: 58.1,
        dryWeight: 50.0,
        targetUF: 9.4,
        postWeight: 50.3,
        weights: [
          {
            date: "4/16",
            pre: 56.7,
            dry: 50,
            post: 50.3,
          },
          {
            date: "4/18",
            pre: 57.0,
            dry: 50,
            post: 50.9,
          },
          {
            date: "4/20",
            pre: 58.4,
            dry: 50,
            post: 50.6,
          },
          {
            date: "4/22",
            pre: 58.9,
            dry: 50,
            post: 50.2,
          },
          {
            date: "4/24",
            pre: 59.4,
            dry: 50,
            post: 50.3,
          },
        ],
        bloodPressure: [
          {
            time: "10:00",
            sys: 168,
            dia: 76,
          },
          {
            time: "11:00",
            sys: 131,
            dia: 81,
          },
          {
            time: "12:00",
            sys: 142,
            dia: 83,
          },
          {
            time: "13:00",
            sys: 157,
            dia: 90,
          },
          {
            time: "14:00",
            sys: 153,
            dia: 89,
          },
        ],
        records: [
          {
            time: "10:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "11:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "12:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "13:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
        ],
      },
      {
        round: 3,
        date: "2025.04.23",
        preWeight: 57.1,
        avgWeight: 57.3,
        dryWeight: 50.0,
        targetUF: 7.1,
        postWeight: null,
        weights: [
          {
            date: "4/16",
            pre: 56.1,
            dry: 50,
            post: 50.3,
          },
          {
            date: "4/18",
            pre: 57.9,
            dry: 50,
            post: 50.3,
          },
          {
            date: "4/20",
            pre: 59.5,
            dry: 50,
            post: 50.5,
          },
          {
            date: "4/22",
            pre: 56.1,
            dry: 50,
            post: 50.3,
          },
          {
            date: "4/24",
            pre: 57.1,
            dry: 50,
            post: 50.5,
          },
        ],
        bloodPressure: [
          {
            time: "10:00",
            sys: 159,
            dia: 73,
          },
          {
            time: "11:00",
            sys: 166,
            dia: 88,
          },
          {
            time: "12:00",
            sys: 153,
            dia: 76,
          },
          {
            time: "13:00",
            sys: 149,
            dia: 74,
          },
          {
            time: "14:00",
            sys: 148,
            dia: 88,
          },
        ],
        records: [
          {
            time: "10:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "11:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "12:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "13:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
        ],
      },
    ],
  },
  {
    id: "p004",
    name: "최준호",
    age: 50,
    gender: "남",
    disease: "당뇨병성 굿굿",
    birth: "1975.08.22",
    inHospital: true,
    rounds: [
      {
        round: 1,
        date: "2025.04.21",
        preWeight: 57.5,
        avgWeight: 57.9,
        dryWeight: 50.0,
        targetUF: 7.5,
        postWeight: null,
        weights: [
          {
            date: "4/16",
            pre: 58.0,
            dry: 50,
            post: 50.5,
          },
          {
            date: "4/18",
            pre: 59.2,
            dry: 50,
            post: 50.6,
          },
          {
            date: "4/20",
            pre: 56.3,
            dry: 50,
            post: 50.3,
          },
          {
            date: "4/22",
            pre: 58.7,
            dry: 50,
            post: 50.3,
          },
          {
            date: "4/24",
            pre: 57.5,
            dry: 50,
            post: 50.7,
          },
        ],
        bloodPressure: [
          {
            time: "10:00",
            sys: 158,
            dia: 84,
          },
          {
            time: "11:00",
            sys: 157,
            dia: 81,
          },
          {
            time: "12:00",
            sys: 164,
            dia: 82,
          },
          {
            time: "13:00",
            sys: 162,
            dia: 88,
          },
          {
            time: "14:00",
            sys: 161,
            dia: 79,
          },
        ],
        records: [
          {
            time: "10:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "11:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "12:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "13:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
        ],
      },
      {
        round: 2,
        date: "2025.04.22",
        preWeight: 57.3,
        avgWeight: 57.4,
        dryWeight: 50.0,
        targetUF: 7.3,
        postWeight: 50.2,
        weights: [
          {
            date: "4/16",
            pre: 57.2,
            dry: 50,
            post: 50.3,
          },
          {
            date: "4/18",
            pre: 56.8,
            dry: 50,
            post: 50.3,
          },
          {
            date: "4/20",
            pre: 57.8,
            dry: 50,
            post: 50.6,
          },
          {
            date: "4/22",
            pre: 57.7,
            dry: 50,
            post: 50.8,
          },
          {
            date: "4/24",
            pre: 57.3,
            dry: 50,
            post: 50.2,
          },
        ],
        bloodPressure: [
          {
            time: "10:00",
            sys: 144,
            dia: 72,
          },
          {
            time: "11:00",
            sys: 134,
            dia: 74,
          },
          {
            time: "12:00",
            sys: 153,
            dia: 73,
          },
          {
            time: "13:00",
            sys: 158,
            dia: 80,
          },
          {
            time: "14:00",
            sys: 133,
            dia: 74,
          },
        ],
        records: [
          {
            time: "10:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "11:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "12:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "13:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
        ],
      },
      {
        round: 3,
        date: "2025.04.23",
        preWeight: 57.6,
        avgWeight: 57.9,
        dryWeight: 50.0,
        targetUF: 7.6,
        postWeight: null,
        weights: [
          {
            date: "4/16",
            pre: 57.5,
            dry: 50,
            post: 50.3,
          },
          {
            date: "4/18",
            pre: 59.1,
            dry: 50,
            post: 50.1,
          },
          {
            date: "4/20",
            pre: 58.7,
            dry: 50,
            post: 50.2,
          },
          {
            date: "4/22",
            pre: 56.6,
            dry: 50,
            post: 50.6,
          },
          {
            date: "4/24",
            pre: 57.6,
            dry: 50,
            post: 50.2,
          },
        ],
        bloodPressure: [
          {
            time: "10:00",
            sys: 133,
            dia: 90,
          },
          {
            time: "11:00",
            sys: 133,
            dia: 88,
          },
          {
            time: "12:00",
            sys: 147,
            dia: 72,
          },
          {
            time: "13:00",
            sys: 164,
            dia: 73,
          },
          {
            time: "14:00",
            sys: 165,
            dia: 77,
          },
        ],
        records: [
          {
            time: "10:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "11:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "12:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "13:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
        ],
      },
    ],
  },
  {
    id: "p005",
    name: "박지영",
    age: 67,
    gender: "여",
    disease: "복합부위 통증 증후군",
    birth: "1958.10.11",
    inHospital: true,
    rounds: [
      {
        round: 1,
        date: "2025.04.21",
        preWeight: 56.9,
        avgWeight: 57.2,
        dryWeight: 50.0,
        targetUF: 6.9,
        postWeight: null,
        weights: [
          {
            date: "4/16",
            pre: 56.5,
            dry: 50,
            post: 50.2,
          },
          {
            date: "4/18",
            pre: 57.3,
            dry: 50,
            post: 50.8,
          },
          {
            date: "4/20",
            pre: 58.5,
            dry: 50,
            post: 50.9,
          },
          {
            date: "4/22",
            pre: 57.0,
            dry: 50,
            post: 50.8,
          },
          {
            date: "4/24",
            pre: 56.9,
            dry: 50,
            post: 50.8,
          },
        ],
        bloodPressure: [
          {
            time: "10:00",
            sys: 134,
            dia: 82,
          },
          {
            time: "11:00",
            sys: 158,
            dia: 83,
          },
          {
            time: "12:00",
            sys: 142,
            dia: 74,
          },
          {
            time: "13:00",
            sys: 158,
            dia: 72,
          },
          {
            time: "14:00",
            sys: 158,
            dia: 71,
          },
        ],
        records: [
          {
            time: "10:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "11:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "12:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "13:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
        ],
      },
      {
        round: 2,
        date: "2025.04.22",
        preWeight: 56.9,
        avgWeight: 57.5,
        dryWeight: 50.0,
        targetUF: 6.9,
        postWeight: 50.4,
        weights: [
          {
            date: "4/16",
            pre: 59.3,
            dry: 50,
            post: 50.4,
          },
          {
            date: "4/18",
            pre: 56.8,
            dry: 50,
            post: 50.1,
          },
          {
            date: "4/20",
            pre: 56.8,
            dry: 50,
            post: 50.8,
          },
          {
            date: "4/22",
            pre: 57.6,
            dry: 50,
            post: 50.4,
          },
          {
            date: "4/24",
            pre: 56.9,
            dry: 50,
            post: 50.4,
          },
        ],
        bloodPressure: [
          {
            time: "10:00",
            sys: 135,
            dia: 83,
          },
          {
            time: "11:00",
            sys: 165,
            dia: 87,
          },
          {
            time: "12:00",
            sys: 150,
            dia: 81,
          },
          {
            time: "13:00",
            sys: 147,
            dia: 88,
          },
          {
            time: "14:00",
            sys: 164,
            dia: 71,
          },
        ],
        records: [
          {
            time: "10:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "11:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "12:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "13:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
        ],
      },
      {
        round: 4,
        date: "2025.04.23",
        preWeight: 59.1,
        avgWeight: 57.7,
        dryWeight: 50.0,
        targetUF: 9.1,
        postWeight: null,
        weights: [
          {
            date: "4/16",
            pre: 57.5,
            dry: 50,
            post: 50.7,
          },
          {
            date: "4/18",
            pre: 57.3,
            dry: 50,
            post: 50.1,
          },
          {
            date: "4/20",
            pre: 57.2,
            dry: 50,
            post: 50.2,
          },
          {
            date: "4/22",
            pre: 57.4,
            dry: 50,
            post: 50.7,
          },
          {
            date: "4/24",
            pre: 59.1,
            dry: 50,
            post: 50.3,
          },
        ],
        bloodPressure: [
          {
            time: "10:00",
            sys: 167,
            dia: 70,
          },
          {
            time: "11:00",
            sys: 168,
            dia: 71,
          },
          {
            time: "12:00",
            sys: 142,
            dia: 85,
          },
          {
            time: "13:00",
            sys: 160,
            dia: 90,
          },
          {
            time: "14:00",
            sys: 159,
            dia: 71,
          },
        ],
        records: [
          {
            time: "10:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "11:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "12:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "13:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
        ],
      },
      {
        round: 3,
        date: "2025.04.23",
        preWeight: 59.1,
        avgWeight: 57.7,
        dryWeight: 50.0,
        targetUF: 9.1,
        postWeight: null,
        weights: [
          {
            date: "4/16",
            pre: 57.5,
            dry: 50,
            post: 50.7,
          },
          {
            date: "4/18",
            pre: 57.3,
            dry: 50,
            post: 50.1,
          },
          {
            date: "4/20",
            pre: 57.2,
            dry: 50,
            post: 50.2,
          },
          {
            date: "4/22",
            pre: 57.4,
            dry: 50,
            post: 50.7,
          },
          {
            date: "4/24",
            pre: 59.1,
            dry: 50,
            post: 50.3,
          },
        ],
        bloodPressure: [
          {
            time: "10:00",
            sys: 167,
            dia: 70,
          },
          {
            time: "11:00",
            sys: 168,
            dia: 71,
          },
          {
            time: "12:00",
            sys: 142,
            dia: 85,
          },
          {
            time: "13:00",
            sys: 160,
            dia: 90,
          },
          {
            time: "14:00",
            sys: 159,
            dia: 71,
          },
        ],
        records: [
          {
            time: "10:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "11:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "12:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
          {
            time: "13:00",
            writer: "작성자",
            content: "기록 내용 예시입니다.",
          },
        ],
      },
    ],
  },
];
