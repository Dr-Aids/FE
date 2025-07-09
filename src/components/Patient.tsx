import "./Patient.css";

export default function Patient({
  name = "Name",
  age = "Age",
  birth = "Birth",
  sex = "none",
}) {
  return (
    <div className="patient__container">
      <div className="patient__name">{name}</div>
      <div className="patient__age">{age}세</div>
      <div className="patient__birth">{birth}</div>
      <div className="patient__sex">{sex}</div>
    </div>
  );
}
