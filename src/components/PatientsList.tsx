import "./PatientsList.css";
import PatientRow from "./PatientRow";
import type { PatientListRow } from "../types/patientSummaryType";

export default function PatientsList({
  patients,
}: {
  patients: PatientListRow[];
}) {
  // 실제 호출 부분

  return (
    <table className="patient__list__table">
      <thead>
        <tr>
          <th>
            <div>이름 (성별)</div>
          </th>
          <th>
            <div>생년월일</div>
          </th>
          <th>
            <div>구분</div>
          </th>
        </tr>
      </thead>
      <tbody>
        {patients
          ? patients.map((patient, i) => (
              <PatientRow key={i} {...patient} index={i} />
            ))
          : ""}
      </tbody>
    </table>
  );
}
