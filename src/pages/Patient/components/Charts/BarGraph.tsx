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
export default function BarGraph({ data }) {
  return (
    <div className="bar__chart__container">
      <ResponsiveContainer width="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="preWeight" fill="#CBE8EE" />
          <Bar dataKey="dryWeight" fill="#E6F1FD" />
          <Bar dataKey="postWeight" fill="#7FBBE9" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
