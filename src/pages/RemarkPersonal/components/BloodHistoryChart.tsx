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
import "./BloodHistoryChart.css";

import { formatYMDTHM } from "../../../utils/formatYMDTHM";
import type { TwoBpsItem } from "../RemarkPersonalPage";

export default function BloodHistoryChart({ data }: { data: TwoBpsItem[] }) {
  if (!data || data.length === 0) {
    return <div>혈압 데이터가 없습니다.</div>;
  }

  return (
    <div className="blood__history__chart__container">
      {data.map((sessionData, index) => {
        return (
          <div key={index} style={{ width: data.length > 1 ? "50%" : "100%" }}>
            <h4>{sessionData.session}회차</h4>
            <ResponsiveContainer width="100%">
              <LineChart
                data={sessionData.bloodPressureDto.map((item) => ({
                  ...item,
                  time: formatYMDTHM(item.time).slice(9),
                }))}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="dbp"
                  name="DBP"
                  stroke="#8979FF"
                />
                <Line
                  type="monotone"
                  dataKey="sbp"
                  name="SBP"
                  stroke="#FF928A"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      })}
    </div>
  );
}
