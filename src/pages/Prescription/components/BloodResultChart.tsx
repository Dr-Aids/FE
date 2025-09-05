import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { bloodResultData } from "../../../mocks/bloodResultData";
export default function BloodResultChart({ data }) {
  return (
    <div
      style={{
        border: "1px solid rgba(220,220,220,0.5)",
        borderRadius: "10px",
        padding: "50px 50px 20px 20px",
      }}
    >
      <BarChart width={360} height={300} data={bloodResultData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Iron" fill="green" />
        <Bar dataKey="Ferritine" fill="red" />
        <Bar dataKey="TIBC" fill="pink" />
        <Bar dataKey="PTH" fill="skyblue" />
        <Bar dataKey="hematocrit" fill="black" />
      </BarChart>
    </div>
  );
}
