import ContentBox from "./ContentBox";
import "./RemarkPersonalDetails.css";
import RemarkPersonalTable from "./RemarkPersonalTable";
import WeightCMPChart from "./WeightCMPChart";

export default function RemarkPersonalDetails() {
  return (
    <div className="remark__personal__content__container">
      <div>
        <RemarkPersonalTable />
      </div>
      <div className="remark__personal__graphs__container">
        <div>
          혈압기록
          {/* <BloodHistoryChart data={} /> */}
        </div>
        <div>
          <ContentBox title={"내원 시 BP"} content={"170/100"} />
          <ContentBox title={"현재 BP"} content={"136/76"} />
          <ContentBox title={"평균 몸무게에 비해"} content={"+1.8 kg"} />
          <ContentBox title={"현재 몸무게"} content={"58 kg"} />
        </div>
        <div>
          <WeightCMPChart />
        </div>
      </div>
    </div>
  );
}
