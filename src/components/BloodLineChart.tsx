import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import "./BloodLineChart.css";

export default function BloodLineChart({ data }) {
  return (
    <div className="blood__chart__container">
      <LineChart width={470} height={280} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sys" stroke="#FF928A" />
        <Line type="monotone" dataKey="dia" stroke="#8979FF" />
      </LineChart>
    </div>
  );
}
