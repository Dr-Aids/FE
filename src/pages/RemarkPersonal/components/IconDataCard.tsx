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
          width={30}
          height={30}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "8px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span>{type === "bp" ? "시작혈압" : "몸무게"}</span>
        <h3
          style={{
            color: "black",
          }}
        >{`${value}${type !== "bp" ? "kg" : ""}`}</h3>
      </div>
    </div>
  );
}
