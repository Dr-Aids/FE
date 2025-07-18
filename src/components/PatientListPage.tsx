import "./PatientListPage.css";
import PatientsList from "./PatientsList";
import SectionHeader from "./SectionHeader";

export default function PatientListPage() {
  return (
    <div className="patient-list-page__container">
      <SectionHeader title={"Patients"} />
      <PatientsList />
    </div>
  );
}
