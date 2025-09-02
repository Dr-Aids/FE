import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
export default function BarGraph({ data }) {
  return (
    <div>
      <BarChart width={480} height={180} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="preWeight" fill="#CBE8EE" />
        <Bar dataKey="dryWeight" fill="#E6F1FD" />
        <Bar dataKey="postWeight" fill="#7FBBE9" />
      </BarChart>
    </div>
  );
}
