import "./PatientPage.css";

import PatientSummaryCard from "../../components/PatientSummaryCard.tsx";
import PatientDetails from "./components/PatientDetails.tsx";
import PatientListPage from "../../components/PatientListPage.tsx";

export default function PatientPage() {
  return (
    <div className="patient__page__container">
      <div className="patient__page__main__content">
        <PatientSummaryCard
          name="정연준"
          age={18}
          birth="2002.07.31"
          sex="남"
          disease={"당뇨병성 신종"}
          pageName="환자 정보"
        />
        <PatientDetails />
      </div>

      <PatientListPage />
    </div>
  );
}
