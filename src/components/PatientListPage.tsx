import "./PatientListPage.css";
import PatientsList from "./PatientsList";
import SectionHeader from "./SectionHeader";

export default function PatientListPage({ usingPage }) {
  return (
    <div className="patient-list-page__container">
      <SectionHeader title={"Patients"} />
      <PatientsList usingPage={usingPage} />
    </div>
  );
}
