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

import "./BarGraph.css";
import type { FiveSessionWeightList } from "../../../../types/PatientDetailTypes";
export default function BarGraph({ data }: { data: FiveSessionWeightList[] }) {
  return (
    <div className="bar__chart__container">
      <ResponsiveContainer width="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="preWeight" fill="#CBE8EE" activeBar={false} />
          <Bar dataKey="dryWeight" fill="#E6F1FD" activeBar={false} />
          <Bar dataKey="postWeight" fill="#7FBBE9" activeBar={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
