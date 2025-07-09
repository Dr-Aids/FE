import "./PatientInfo.css";

export default function PatientInfo({ name, age, birth, sex, disease }) {
  return (
    <div className="patient__info__container">
      <div>
        {name} {sex}
      </div>
      <div>{age | birth}</div>
      <div>{disease}</div>
    </div>
  );
}
