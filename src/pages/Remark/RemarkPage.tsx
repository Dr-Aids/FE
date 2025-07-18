import PatientListPage from "../../components/PatientListPage";
import PatientSummaryCard from "../../components/PatientSummaryCard.tsx";
import "./RemarkPage.css";
export default function RemarkPage() {
  return (
    <div className="remark-page__container">
      <div className="remark__main__content">
        <PatientSummaryCard
          name="정연준"
          age={18}
          birth="2002.07.31"
          sex="남"
          disease={"당뇨병성 신종"}
          pageName="환자 정보"
        />
        특이사항 오는 곳
      </div>
      <PatientListPage />
    </div>
  );
}
