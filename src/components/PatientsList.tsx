import "./PatientsList.css";
import PatientRow from "./PatientRow";
import { patients } from "../mocks/patientData";

export default function PatientsList({ usingPage }) {
  return (
    <div className="patients__list__container">
      <div className="patients__list__title">
        <div>Patients / gender</div>
        <div>age / birth</div>
        <div>구분</div>
      </div>
      <div className="patients__list__list">
        {patients.map((patient, i) => (
          <PatientRow key={i} {...patient} index={i} usingPage={usingPage} />
        ))}
      </div>
    </div>
  );
}
