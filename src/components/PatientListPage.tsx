import type { PatientListRow } from "../types/patientSummaryType";
import "./PatientListPage.css";
import PatientsList from "./PatientsList";
import SectionHeader from "./SectionHeader";

export default function PatientListPage({
  patients,
  onPatientModified,
}: {
  patients: PatientListRow[] | null;
  onPatientModified?: () => void;
}) {
  return (
    <div className="patient-list-page__container">
      <div>
        <SectionHeader
          title={"Patients"}
          onPatientModified={onPatientModified}
        />
      </div>
      <div className="patient-list">
        {patients?.length === 0 ? (
          "환자를 추가해주세요"
        ) : (
          <PatientsList patients={patients!} />
        )}
      </div>
    </div>
  );
}
