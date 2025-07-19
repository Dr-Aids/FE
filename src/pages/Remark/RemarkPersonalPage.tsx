import PatientListPage from "../../components/PatientListPage";
import PatientSummaryCard from "../../components/PatientSummaryCard.tsx";
import RemarkPersonalDetails from "./components/RemarkPersonalDetails.tsx";
import "./RemarkPersonalPage.css";

export default function RemarkPersonalPage() {
  return (
    <div className="remark-personal__container">
      <div className="remark-personal__main__content">
        <PatientSummaryCard
          name="정연준"
          age={18}
          birth="2002.07.31"
          sex="남"
          disease={"당뇨병성 신종"}
          pageName="환자 정보"
        />
        <RemarkPersonalDetails />
      </div>
      <PatientListPage usingPage={"remark"} />
    </div>
  );
}
