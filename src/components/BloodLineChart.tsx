import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

import type { Bp } from "../types/PatientDetailTypes";

export default function BloodLineChart({ data }: { data: Bp[] }) {
  return (
    <div className="blood__chart__container">
      <LineChart width={470} height={280} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sbp" stroke="#FF928A" />
        <Line type="monotone" dataKey="dbp" stroke="#8979FF" />
      </LineChart>
    </div>
  );
}
