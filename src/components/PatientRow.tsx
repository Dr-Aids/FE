import "./PatientRow.css";
import InHospital from "./ui/InHospital";

export default function PatientRow({
  name = "Name",
  age = "Age",
  birth = "Birth",
  sex = "none",
  nowHospital = false,
  index,
}) {
  return (
    <div
      className="patient__container"
      style={
        index % 2 === 0
          ? { backgroundColor: "#cbe8ee" }
          : { backgroundColor: "#E6F1FD" }
      }
    >
      <div className="patient__name">
        {name} ({sex})
      </div>

      <div className="patient__age">
        {age}세, {birth}
      </div>
      <InHospital nowHospital={nowHospital} />
    </div>
  );
}
