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
      그래프 그래프그래프
    </div>
  );
}
