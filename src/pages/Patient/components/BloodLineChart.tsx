import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

export default function BloodLineChart({ data }) {
  return (
    <div>
      <LineChart width={470} height={280} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Bad" stroke="#FF928A" />
        <Line type="monotone" dataKey="Good" stroke="#8979FF" />
      </LineChart>
    </div>
  );
}
