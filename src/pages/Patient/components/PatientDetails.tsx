import "./PatientDetails.css";
import PRELineChart from "../components/PRELineChart";
import Record from "./Record";
import BarGraph from "./BarGraph";
import WeightBox from "./WeightBox";
import Button from "../../../components/ui/Button";
import BloodLineChart from "./BloodLineChart";
import type { PatientRoundData } from "../../../types/patientSummaryType";

export default function PatientDetails({
  round,
  date,
  preWeight: Pre,
  avgWeight,
  dryWeight: Dry,
  targetUF,
  postWeight: Post,
  weights,
  bloodPressure,
  records,
}: PatientRoundData) {
  console.log(weights);
  return (
    <div className="patient-details__container">
      <div className="patient__page__weight_list">
        <WeightBox title="Pre-Weight" weight={Pre} />
        <WeightBox title="Average-Weight" weight={avgWeight} />
        <WeightBox title="Dry-Weight" weight={Dry} />
        <WeightBox title="Target UF" weight={targetUF} />
        <WeightBox title="Post-Weight" weight={Post} />
      </div>

      <div className="patient__page__graph">
        *선택 회차의 최대 이전 5회까지만 표시됩니다.
        <div className="patient__page__graph_container">
          <div>
            <BarGraph data={weights} />
          </div>
          <div>
            <PRELineChart data={weights} />
          </div>
        </div>
      </div>

      <div className="patient__page__bp__container">
        <div className="patient__page__bp__chart__container">
          <div className="patient__page__bp__chart__header">
            혈압
            <div className="patient__page__bp__buttons">
              <Button content={"삭제"} />
              <Button content={"수정"} />
            </div>
          </div>
          <BloodLineChart data={bloodPressure} />
        </div>
        <div className="patient__page__record__container">
          <Record role={"nurse"} content={"간호사"} />
          <Record role={"doctor"} content={"의사"} />
        </div>
      </div>
    </div>
  );
}
