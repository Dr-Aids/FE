import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
export default function BloodResultChart({ data }) {
  return (
    <div>
      <BarChart width={480} height={180} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Pre" fill="#CBE8EE" />
        <Bar dataKey="Dry" fill="#E6F1FD" />
        <Bar dataKey="Post" fill="#7FBBE9" />
        <Bar dataKey="Post" fill="#7FBBE9" />
      </BarChart>
    </div>
  );
}
