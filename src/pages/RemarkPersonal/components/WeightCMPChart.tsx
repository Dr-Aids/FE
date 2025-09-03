import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Rectangle,
} from "recharts";
import type { RemarkWeightCmp } from "../../../types/RemarkTypes";

interface WeightCMPChartProps extends RemarkWeightCmp {
  session: string;
}

const BORDER_COLOR = "#1E40AF";
const BORDER_WIDTH = 2;
const BORDER_RADIUS = 5;
const BASE_COLOR = "#015551";
const INCREASE_COLOR = "#57B4BA";
const DECREASE_COLOR = "#FE4F2D";

//--- Custom Bar Shapes for Precise Border Control ---

// 테두리 없이 상단 모서리만 둥근 막대 (감소 시 빨간 막대에 사용)
const TopRoundedBar = (props: any) => {
  const { fill, x, y, width, height } = props;
  return (
    <Rectangle
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      radius={[BORDER_RADIUS, BORDER_RADIUS, 0, 0]}
    />
  );
};

const FullBorderedBar = (props: any) => {
  const { fill, x, y, width, height } = props;
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      stroke={BORDER_COLOR}
      strokeWidth={BORDER_WIDTH}
      radius={BORDER_RADIUS}
    />
  );
};

const TopBorderedBar = (props: any) => {
  const { fill, x, y, width, height } = props;
  const d = `M${x},${y + height} L${x},${y + BORDER_RADIUS} Q${x},${y} ${
    x + BORDER_RADIUS
  },${y} L${x + width - BORDER_RADIUS},${y} Q${x + width},${y} ${x + width},${
    y + BORDER_RADIUS
  } L${x + width},${y + height}`;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={fill} />
      <path
        d={d}
        stroke={BORDER_COLOR}
        strokeWidth={BORDER_WIDTH}
        fill="none"
      />
    </g>
  );
};

const SideBorderedBar = (props: any) => {
  const { fill, x, y, width, height } = props;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={fill} />
      <path
        d={`M${x},${y + height} L${x},${y} M${x + width},${y + height} L${
          x + width
        },${y}`}
        stroke={BORDER_COLOR}
        strokeWidth={BORDER_WIDTH}
        fill="none"
      />
    </g>
  );
};

//--- Custom Label Component for Bar Interior ---
const InsideLabel = (props: any) => {
  const { x, y, width, height, value, isChange, isIncrease } = props;

  if (value === 0 && isChange) return null;

  let text;
  if (isChange) {
    text = `${value.toFixed(1)} ${isIncrease ? "증가" : "감소"}`;
  } else {
    text = value.toFixed(1);
  }

  return (
    <text
      x={x + width / 2}
      y={y + height / 2}
      textAnchor="middle"
      dominantBaseline="middle"
      style={{ fill: "white", fontWeight: "bold", fontSize: 14 }}
    >
      {text}
    </text>
  );
};

//--- Main Chart Component ---

const ComparisonChart = ({
  title,
  currentValue,
  compareValue,
}: {
  title: string;
  currentValue: number;
  compareValue: number;
}) => {
  const difference = currentValue - compareValue;
  const isIncrease = difference >= 0;

  const data = [
    {
      name: title,
      base: isIncrease ? compareValue : currentValue,
      change: Math.abs(difference),
    },
  ];

  return (
    <div style={{ textAlign: "center", padding: "10px" }}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={false} />
          <YAxis domain={[0, (dataMax: number) => dataMax * 1.2]} />
          <Tooltip
            cursor={{ fill: "rgba(240, 240, 240, 0.5)" }}
            formatter={(value: number, name: string) => {
              const roundedValue = value.toFixed(1);
              if (name === "base")
                return [roundedValue, isIncrease ? "비교값" : "현재값"];
              if (name === "change")
                return [roundedValue, isIncrease ? "증가량" : "감소량"];
              return [roundedValue, name];
            }}
          />

          {isIncrease ? (
            <>
              <Bar
                dataKey="base"
                stackId="a"
                fill={BASE_COLOR}
                shape={<SideBorderedBar />}
              >
                <LabelList dataKey="base" content={<InsideLabel />} />
              </Bar>
              <Bar
                dataKey="change"
                stackId="a"
                fill={INCREASE_COLOR}
                shape={<TopBorderedBar />}
              >
                <LabelList
                  dataKey="change"
                  content={<InsideLabel isChange isIncrease />}
                />
              </Bar>
            </>
          ) : (
            <>
              <Bar
                dataKey="base"
                stackId="a"
                fill={BASE_COLOR}
                shape={<FullBorderedBar />}
              >
                <LabelList dataKey="base" content={<InsideLabel />} />
              </Bar>
              <Bar
                dataKey="change"
                stackId="a"
                fill={DECREASE_COLOR}
                shape={<TopRoundedBar />}
              >
                <LabelList
                  dataKey="change"
                  content={<InsideLabel isChange isIncrease={false} />}
                />
              </Bar>
            </>
          )}
        </BarChart>
      </ResponsiveContainer>
      <div style={{ fontWeight: "bold", fontSize: "1.1em", marginTop: "5px" }}>
        <span>
          {compareValue.toFixed(1)}kg → {currentValue.toFixed(1)}kg
        </span>
      </div>
      <h4 style={{ marginTop: "10px" }}>{title}</h4>
    </div>
  );
};

export default function WeightCMPChart({
  session,
  averageWeight,
  beforePreWeight,
  gapBetweenBeforeAndNow,
}: WeightCMPChartProps) {
  const nowWeight =
    beforePreWeight != null && gapBetweenBeforeAndNow != null
      ? beforePreWeight + gapBetweenBeforeAndNow
      : null;

  if (
    nowWeight === null ||
    beforePreWeight === null ||
    averageWeight === null
  ) {
    return <div>차트 데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-around",
        flexWrap: "nowrap",
      }}
    >
      <div style={{ width: "100%", minWidth: "200px", maxWidth: "250px" }}>
        <ComparisonChart
          title={
            session !== "0" ? `${session}회차 대비 현재 몸무게` : "현재 몸무게"
          }
          currentValue={nowWeight}
          compareValue={beforePreWeight}
        />
      </div>
      <div style={{ width: "100%", minWidth: "200px", maxWidth: "250px" }}>
        <ComparisonChart
          title={`평균 대비 현재 몸무게`}
          currentValue={nowWeight}
          compareValue={averageWeight}
        />
      </div>
    </div>
  );
}
