import BpIcon from "../../../assets/bp_icon.svg";
import WeightIcon from "../../../assets/weight_icon.svg";
export default function IconDataCard({
  type,
  value,
}: {
  type: "bp" | "weight";
  value: string;
}) {
  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={type === "bp" ? BpIcon : WeightIcon}
          alt={`${type} 아이콘`}
          width={20}
          height={20}
        />
        {type === "bp" ? "시작혈압" : "몸무게"}
      </div>
      <span>{value}</span>
    </div>
  );
}
