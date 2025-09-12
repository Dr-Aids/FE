import EmptyDataState from "../components/EmptyDataState";
import "./NoPatientSelectedPage.css";

export default function NoPatientSelectedPage() {
  return (
    <div
      style={{
        padding: "3.5rem",
      }}
    >
      <div className="card-container sub__container">
        <EmptyDataState
          type="user"
          title="환자를 선택해주세요"
          description="우측 리스트에서 환자를 선택해주세요"
        />
      </div>
    </div>
  );
}
