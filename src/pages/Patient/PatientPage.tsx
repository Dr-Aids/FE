import Record from "./components/Record";
import WeightBox from "./components/WeightBox";
import "./PatientPage.css";

export default function PatientPage() {
  return (
    <div className="patient__page__container">
      <div className="patient__page__weight_list">
        <WeightBox title="Pre-Weight" weight={58.9} />
        <WeightBox title="Average-Weight" weight={57.9} />
        <WeightBox title="Dry-Weight" weight={59} />
        <WeightBox title="Target UF" weight={59} />
        <WeightBox title="Post-Weight" weight={59} />
      </div>
      <div className="patient__page__graph">
        *선택 회차의 최대 이전 5회까지만 표시됩니다.
        <div className="patient__page__graph_container">
          <div>그래프 1</div>
          <div>그래프 2</div>
        </div>
      </div>
      <div className="patient__page__bp__container">
        <div>혈압</div>
        <div className="patient__page__record__container">
          <Record role={"nurse"} content={"간호사"} />
          <Record role={"doctor"} content={"의사"} />
        </div>
      </div>
    </div>
  );
}
