import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";

import type { Hb } from "../../../../types/PrescriptionTypes";
import "./HbLineChart.css";

interface HbLineChart {
  data: Hb[] | null;
}

export default function HbLineChart({ data }: HbLineChart) {
  const chartData = data ?? [];
  return (
    <div className="hb__linechart__container">
      <ResponsiveContainer width="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="hemoglobin" stroke="blue" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
