import BloodLineChart from "../../../components/BloodLineChart";
import type { PatientRoundData } from "../../../types/patientSummaryType";
import ContentBox from "./ContentBox";
import "./RemarkPersonalDetails.css";
import RemarkPersonalTable from "./RemarkPersonalTable";
import WeightCMPChart from "./WeightCMPChart";

export default function RemarkPersonalDetails({
  nowRound,
  prevRound,
}: {
  nowRound: PatientRoundData;
  prevRound: PatientRoundData | null;
}) {
  return (
    <div className="remark__personal__content__container">
      <div>
        <RemarkPersonalTable nowRound={nowRound} prevRound={prevRound} />
      </div>
      <div className="remark__personal__graphs__container">
        <div className="blood__history__container">
          혈압기록
          <BloodLineChart data={nowRound.bloodPressure} />
        </div>
        <div className="content__box__list">
          현재회차
          <ContentBox title={"내원 시 BP"} content={"170/100"} />
          <ContentBox title={"현재 BP"} content={"136/76"} />
          <ContentBox title={"평균 몸무게에 비해"} content={"+1.8 kg"} />
          <ContentBox title={"현재 몸무게"} content={"58 kg"} />
        </div>
        <div className="weight__cmp__container">
          몸무게 비교
          <WeightCMPChart />
        </div>
      </div>
    </div>
  );
}
