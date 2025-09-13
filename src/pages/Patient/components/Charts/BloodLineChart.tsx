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
import "./BloodLineChart.css";
import type { Bp } from "../../../../types/PatientDetailTypes";

export default function BloodLineChart({ data }: { data: Bp[] }) {
  return (
    <div className="blood__chart__container">
      <ResponsiveContainer width="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
                    <Line type="monotone" dataKey="sbp" stroke="#FF928A" activeDot={false} />
          <Line type="monotone" dataKey="dbp" stroke="#8979FF" activeDot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
