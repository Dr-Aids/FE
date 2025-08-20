import { useLocation, useNavigate } from "react-router-dom";
import "./PatientRow.css";
import InHospitalIcon from "./ui/InHospital";
import type { PatientListRow } from "../types/patientSummaryType";

type PatientRowProps = PatientListRow & { index: number };

export default function PatientRow({
  id,
  name,
  gender,
  age,
  birth,
  visiting,
  index,
}: PatientRowProps) {
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
        {name} ({gender === "MALE" ? "남" : "여"})
      </div>

      <div className="patient__age">
        {age}세, {birth}
      </div>
      <InHospitalIcon inHospital={visiting} />
    </div>
  );
}
