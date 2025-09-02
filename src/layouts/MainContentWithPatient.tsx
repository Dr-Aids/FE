import "./MainContentWithPatient.css";
import PatientSummaryCard from "../components/PatientSummaryCard.tsx";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { patients } from "../mocks/patientData.ts";
import PatientListPage from "../components/PatientListPage";
import SectionHeader from "../components/SectionHeader.tsx";

export default function MainContentWithPatient() {
  const { patientId, round } = useParams<{
    patientId?: string;
    round?: string;
  }>();
  const patient = patients.find((p) => p.id === patientId);

  const location = useLocation();
  const pageName = location.pathname.split("/")[1];

  return (
    <div className="with-patient-layout__container">
      <div className="with-patient-layout__main__content">
        {patient ? (
          <SectionHeader title={pageName}>
            <PatientSummaryCard />
          </SectionHeader>
        ) : (
          <SectionHeader title={pageName}>
            <PatientSummaryCard />
          </SectionHeader>
        )}
        <Outlet />
      </div>

      <PatientListPage />
    </div>
  );
}
