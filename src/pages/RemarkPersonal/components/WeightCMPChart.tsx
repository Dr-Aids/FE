import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "4회차\nPost-weight",
    base: 55.1,
    increase: 3.9,
  },
  {
    name: "평균\nweight",
    base: 57.2,
    increase: 1.8,
  },
];

export default function WeightCMPChart() {
  return (
    <BarChart
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      barCategoryGap={50}
      width={400}
      height={400}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis hide />
      <Tooltip />
      {/* 아래쪽 베이스 */}
      <Bar dataKey="base" stackId="a" fill="#255D6E">
        <LabelList dataKey="base" position="center" fill="#fff" fontSize={14} />
      </Bar>
      {/* 위쪽 증가분 */}
      <Bar dataKey="increase" stackId="a" fill="#E1F0FF">
        <LabelList
          dataKey={(entry) => `${entry.increase} 증가`}
          position="top"
          fill="#2563eb"
          fontSize={12}
        />
      </Bar>
    </BarChart>
  );
}
