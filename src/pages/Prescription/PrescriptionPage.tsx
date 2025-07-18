import PatientListPage from "../../components/PatientListPage";
import PatientSummaryCard from "../../components/PatientSummaryCard.tsx";
import PrescriptionDetails from "./components/PrescriptionDetails.tsx";
import "./PrescriptionPage.css";
export default function Prescription() {
  return (
    <div className="prescription__page__container">
      <div className="prescription__main__content">
        <PatientSummaryCard
          name="정연준"
          age={18}
          birth="2002.07.31"
          sex="남"
          disease={"당뇨병성 신종"}
          pageName="예측 처방"
        />
        <PrescriptionDetails />
      </div>

      <PatientListPage />
    </div>
  );
}
