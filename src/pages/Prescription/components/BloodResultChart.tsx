import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import type { BloodResult } from "../../../types/PrescriptionTypes";

interface BloodResultChartProps {
  data: BloodResult[] | null;
}

export default function BloodResultChart({ data }: BloodResultChartProps) {
  const chartData = data ?? [];
  return (
    <div
      style={{
        border: "1px solid rgba(220,220,220,0.5)",
        borderRadius: "10px",
        padding: "50px 50px 20px 20px",
      }}
    >
      <BarChart width={360} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="iron" fill="green" />
        <Bar dataKey="ferritine" fill="red" />
        <Bar dataKey="tibc" fill="pink" />
        <Bar dataKey="pth" fill="skyblue" />
        <Bar dataKey="hematocrit" fill="black" />
      </BarChart>
    </div>
  );
}
