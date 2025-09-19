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

import "./PRELineChart.css";
import type { FiveSessionWeightList } from "../../../../types/PatientDetailTypes";

export default function PRELineChart({
  data,
}: {
  data: FiveSessionWeightList[];
}) {
  return (
    <div className="prelinechart__container">
      <ResponsiveContainer width="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="preWeight"
            stroke="#8884d8"
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
