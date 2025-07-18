import "./PatientDetails.css";
import PRELineChart from "../components/PRELineChart";
import Record from "./Record";
import BarGraph from "./BarGraph";
import WeightBox from "./WeightBox";
import { weightData } from "../../../mocks/weightData";
import { preData } from "../../../mocks/preData";
import Button from "../../../components/ui/Button";
import BloodLineChart from "./BloodLineChart";
import { bloodData } from "../../../mocks/BloodData";

export default function PatientDetails() {
  return (
    <div className="patient-details__container">
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
          <div>
            <BarGraph data={weightData} />
          </div>
          <div>
            <PRELineChart data={preData} />
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
          <BloodLineChart data={bloodData} />
        </div>
        <div className="patient__page__record__container">
          <Record role={"nurse"} content={"간호사"} />
          <Record role={"doctor"} content={"의사"} />
        </div>
      </div>
    </div>
  );
}
