import { useLocation, useNavigate } from "react-router-dom";
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
}) {
  const nav = useNavigate();
  const location = useLocation();
  const pageName = location.pathname.split("/")[1];
  function handleClickPatientRow() {
    nav(`/${pageName}/${id}/1`);
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
