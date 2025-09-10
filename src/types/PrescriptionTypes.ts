export interface Prescription {
  date: string;
  description: string;
  hematapoieticAgent: string;
  id: number;
  iu: number;
}

export interface BloodResult {
  id: number;
  date: string;
  iron: number;
  ferritine: number;
  hematocrit: number;
  tibc: number;
  pth: number;
}

export interface Hb {
  id: number;
  hemoglobin: number;
  date: string;
}
