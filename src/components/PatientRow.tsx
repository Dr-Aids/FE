import { useNavigate } from "react-router-dom";
import "./PatientRow.css";
import InHospitalIcon from "./ui/InHospital";

export default function PatientRow({
  id,
  name = "Name",
  age = "Age",
  birth = "Birth",
  gender = "none",
  inHospital = false,
  index,
  usingPage,
}) {
  const nav = useNavigate();
  function handleClickPatientRow() {
    switch (usingPage) {
      case "remark":
        nav(`/remark/${name}`);
        break;
      case "prescription":
        nav(`/prescription/${name}`);
        break;
      case "patient":
        nav(`/patient/${id}/1`);
        break;

      default:
        break;
    }
  }
  return (
    <div
      className="patient__container"
      style={
        index % 2 === 0
          ? { backgroundColor: "#cbe8ee" }
          : { backgroundColor: "#E6F1FD" }
      }
      onClick={handleClickPatientRow}
    >
      <div className="patient__name">
        {name} ({gender})
      </div>

      <div className="patient__age">
        {age}세, {birth}
      </div>
      <InHospitalIcon inHospital={inHospital} />
    </div>
  );
}
