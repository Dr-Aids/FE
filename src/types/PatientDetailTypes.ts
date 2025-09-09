export type WeightListItem = {
  averageWeight: number | null;
  controlUF: number | null;
  dryWeight: number | null;
  postWeight: number | null;
  preWeight: number | null;
  targetUF: number | null;
};

export type FiveSessionWeightList = Pick<
  WeightListItem,
  "preWeight" | "dryWeight" | "postWeight"
> & { session: number; date: string };

export type Bp = {
  bloodPressureId: number;
  time: string;
  sbp: number;
  dbp: number;
};

export interface BpNote {
  time: string;
  author: string | null;
  note: string | null;
  isChecked: boolean;
  bloodPressureId: string;
}
