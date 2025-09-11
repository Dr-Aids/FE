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
    <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
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
          style={{
            width: "3rem",
            height: "3rem",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "0.8rem",
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
