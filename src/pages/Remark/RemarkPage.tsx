import PatientListPage from "../../components/PatientListPage";
import PatientSummaryCard from "../../components/PatientSummaryCard.tsx";
import RemarkAllPatients from "./components/RemarkAllPatients.tsx";
import "./RemarkPage.css";
export default function RemarkPage() {
  return (
    <div className="remark-page__container">
      <div className="remark__main__content">
        <PatientSummaryCard />
        <RemarkAllPatients />
      </div>
      <PatientListPage usingPage={"remark"} />
    </div>
  );
}
