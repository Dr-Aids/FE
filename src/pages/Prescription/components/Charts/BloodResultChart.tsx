import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import type { BloodResult } from "../../../../types/PrescriptionTypes";
import "./BloodResultChart.css";

interface BloodResultChartProps {
  data: BloodResult[] | null;
}

export default function BloodResultChart({ data }: BloodResultChartProps) {
  const chartData = data ?? [];
  return (
    <div className="blood__result__chart__container">
      <ResponsiveContainer width="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="iron" fill="green" activeBar={false} />
          <Bar dataKey="ferritine" fill="red" activeBar={false} />
          <Bar dataKey="tibc" fill="pink" activeBar={false} />
          <Bar dataKey="pth" fill="skyblue" activeBar={false} />
          <Bar dataKey="hematocrit" fill="black" activeBar={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
