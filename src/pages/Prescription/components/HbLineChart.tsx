import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { hbData } from "../../../mocks/hbData";

export default function HbLineChart({ data }) {
  return (
    <div
      style={{
        border: "1px solid rgba(220,220,220,0.5)",
        borderRadius: "10px",
        padding: "50px 50px 20px 20px",
      }}
    >
      <LineChart width={400} height={300} data={hbData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Hb" stroke="blue" />
      </LineChart>
    </div>
  );
}
