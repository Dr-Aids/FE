import "./MainContentWithPatient.css";
import PatientSummaryCard from "../components/PatientSummaryCard.tsx";
import { Outlet, useLocation, useParams } from "react-router-dom";
import PatientListPage from "../components/PatientListPage";
import SectionHeader from "../components/SectionHeader.tsx";

export default function MainContentWithPatient() {
  const { patientId, session } = useParams<{
    patientId: string;
    session: string;
  }>();

  const location = useLocation();
  const pageName = location.pathname.split("/")[1];

  return (
    <div className="with-patient-layout__container">
      <div className="with-patient-layout__main__content">
        {!patientId && !session ? (
          <SectionHeader title={pageName}></SectionHeader>
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
