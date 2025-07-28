import "./RemarkAllPatients.css";
import { specialNoteData } from "../../../mocks/specialNoteData";
import BpIcon from "../../../assets/bp_icon.svg";
import WeightIcon from "../../../assets/weight_icon.svg";
import RemarkBasis from "./RemarkBasis";

export default function RemarkAllPatients() {
  return (
    <div className="remark__all__container">
      <table className="remark__table">
        <thead className="remark__thead">
          <tr>
            <th scope="col">담당의</th>
            <th scope="col">환자명</th>
            <th scope="col">회차/날짜</th>
            <th scope="col">종류</th>
            <th scope="col">상태</th>
          </tr>
        </thead>
        <tbody className="remark__tbody">
          {specialNoteData.map((data) => (
            <tr>
              <td>{data.doctor}</td>
              <td>{data.patientName}</td>
              <td>{data.sessionInfo}</td>
              <td>
                <img src={data.type === "체중" ? WeightIcon : BpIcon} />
                {data.type}
              </td>
              <td>{data.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="remark__basis__container">
        <RemarkBasis isWeight={false} />
        <RemarkBasis isWeight={true} />
      </div>
    </div>
  );
}
