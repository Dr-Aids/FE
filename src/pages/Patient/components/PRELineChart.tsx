import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

export default function PRELineChart({ data }) {
  return (
    <div>
      <LineChart width={330} height={180} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="PRE" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}
