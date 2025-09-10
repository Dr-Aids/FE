import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

import type { Hb } from "../../../types/PrescriptionTypes";

interface HbLineChart {
  data: Hb[] | null;
}

export default function HbLineChart({ data }: HbLineChart) {
  const chartData = data ?? [];
  return (
    <div
      style={{
        border: "1px solid rgba(220,220,220,0.5)",
        borderRadius: "10px",
        padding: "50px 50px 20px 20px",
      }}
    >
      <LineChart width={400} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="hemoglobin" stroke="blue" />
      </LineChart>
    </div>
  );
}
