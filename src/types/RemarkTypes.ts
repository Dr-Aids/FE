// 특이사항 - 전체
export interface RemarkPatient {
  date: string;
  id: number;
  patientName: string;
  picname: string;
  ruleName: string;
  session: number;
  type: "weight" | "bloodPressure";
  value: number;
}

// 특이사항 - 개인
export interface RemarkPersonal {
  date: "string";
  dbp: number;
  preWeight: number;
  sbp: number;
  session: number;
  specialNotes: {
    id: number;
    ruleName: string;
    type: "weight" | "bloodPressure";
    value: number;
  }[];
}

export interface RemarkBps {
  lastDbp: number;
  lastSbp: number;
  startDbp: number;
  startSbp: number;
}

export interface RemarkWeightCmp {
  averageWeight: number;
  beforePreWeight: number;
  gapBetweenAverageAndNow: number;
  gapBetweenBeforeAndNow: number;
}
