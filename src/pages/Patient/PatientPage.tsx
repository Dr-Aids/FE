import WeightBox from "./components/WeightBox";
import "./PatientPage.css";

export default function PatientPage() {
  return (
    <div className="patient__page__container">
      <div className="patient__page__weight_list">
        <WeightBox title="Pre-Weight" weight={58.9} />
        <WeightBox title="Average-Weight" weight={57.9} />
        <WeightBox title="Pre-Weight" weight={59} />
        <WeightBox title="Pre-Weight" weight={59} />
        <WeightBox title="Pre-Weight" weight={59} />
      </div>

      <div className="patient__page__graph">그래프</div>
      <div className="patient__page__bp__container">
        <div>혈압</div>
        <div className="patient__page__record__container">
          <div className="patient__page__nurse">Nurse 레코드</div>
          <div className="patient__page__doctor">Doctor 레코드</div>
        </div>
      </div>
    </div>
  );
}
