export interface PatientRecord {
  // 환자 기록 -> UI 수정하고 다시
  time: string;
  writer: string;
  content: string;
}

export interface BloodPressure {
  // 혈압
  time: string;
  sys: number; // 수축기
  dia: number; // 이완기
}

export interface WeightStat {
  date: string;
  pre: number;
  dry: number;
  post: number;
}

export interface PatientRoundData {
  round: number;
  date: string;
  preWeight: number;
  avgWeight: number;
  dryWeight: number;
  targetUF: number;
  postWeight?: number | null;
  weights: WeightStat[];
  bloodPressure: BloodPressure[];
  records: PatientRecord[];
}

export interface Patient {
  id: string;
  name: string;
  gender: "남" | "여";
  age: number;
  birth: string;
  inHospital: boolean;
  rounds: PatientRoundData[];
}
