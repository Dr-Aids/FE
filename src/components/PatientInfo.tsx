import Button from "./Button";
import "./PatientInfo.css";

export default function PatientInfo({ name, age, birth, sex, disease }) {
  return (
    <div className="patient__info__container">
      <div className="patient__info__name__container">
        <div className="patient__info__name">{name}</div>
        <div className="patient__info__sex">{sex}</div>
      </div>
      |
      <div>
        {age}세 / {birth}
      </div>
      |<div>{disease}</div>
      <div className="patient__info__buttons">
        <Button content={"삭제"} onClick={() => alert("굿")} />
        <Button content={"수정"} onClick={() => alert("굿")} />
      </div>
      <select>
        <option>1회차 / 2025.04.28</option>
        <option>2회차 / 2025.04.29</option>
        <option>3회차 / 2025.05.02</option>
      </select>
    </div>
  );
}
