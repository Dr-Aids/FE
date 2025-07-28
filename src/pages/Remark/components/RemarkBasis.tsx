import "./RemarkBasis.css";
import BpIcon from "../../../assets/bp_icon.svg";
import WeightIcon from "../../../assets/weight_icon.svg";

export default function RemarkBasis({ isWeight }) {
  const title = isWeight ? (
    <div className="basis__title__weight">
      <img src={WeightIcon} /> 몸무게 특이사항 기준
    </div>
  ) : (
    <div className="basis__title__bp">
      <img src={BpIcon} /> 혈압 특이사항 기준
    </div>
  );
  const basis1 = isWeight
    ? "이전 투석 후 몸무게보다 증가 : (기준 3.5kg 증가)"
    : "투석 시작 시 혈압이 높음 : (1단계 : 150 이상, 2단계 : 160 이상, 3단계 : 180 이상)";
  const basis2 = isWeight
    ? "내원 시, 평균 몸무게보다 증가 : (기준 1kg 증가)"
    : "투석 중 혈압이 투석 시작 혈압보다 높음 : (30 이상 저하)";

  return (
    <div
      className="basis__container"
      style={
        isWeight
          ? { backgroundColor: "#E6F1FD" }
          : { backgroundColor: "rgba(255,183,183,0.2 )" }
      }
    >
      {title}
      <ul className={isWeight ? "basis__list__weight" : "basis__list__bp"}>
        <li>{basis1}</li>
        <li>{basis2}</li>
      </ul>
    </div>
  );
}
