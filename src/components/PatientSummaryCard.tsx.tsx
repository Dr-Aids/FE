import Button from "./ui/Button";
import "./PatientSummaryCard.css";
import SectionHeader from "./SectionHeader";

export default function PatientSummaryCard({
  name,
  age,
  birth,
  sex,
  disease,
  pageName = "페이지명",
}) {
  return (
    <>
      <div className="patient__info__container">
        <SectionHeader title={"환자 정보"} />
        <div className="patient__info__main">
          <div className="patient__info__info">
            <div className="patient__info__name">{name}</div>
            <div className="patient__info__sex">{sex}</div>|
            <div>
              {age}세 / {birth}
            </div>
            |<div>{disease}</div>
            <div className="patient__info__buttons">
              <Button content={"삭제"} onClick={() => alert("굿")} />
              <Button content={"수정"} onClick={() => alert("굿")} />
            </div>
          </div>
          <select className="patient__info__dropdown">
            <option>1회차 / 2025.04.28</option>
            <option>2회차 / 2025.04.29</option>
            <option>3회차 / 2025.05.02</option>
          </select>
        </div>
      </div>
      <hr className="patient-summary-card__hr" />
    </>
  );
}
