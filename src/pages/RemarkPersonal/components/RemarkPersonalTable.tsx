import type { PatientRoundData } from "../../../types/patientSummaryType";
import "./RemarkPersonalTable.css";

export default function RemarkPersonalTable({
  nowRound,
  prevRound,
}: {
  nowRound: PatientRoundData;
  prevRound: PatientRoundData | null;
}) {
  return (
    <div className="remark__personal__table__container">
      <table className="remark__personal__table">
        <thead>
          <tr>
            <th>구분</th>
            <th scope="col">
              {!prevRound
                ? "-"
                : prevRound?.round + `회차 / ` + prevRound?.date}
            </th>
            <th scope="col">
              {nowRound.round}회차 / {nowRound.date}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">상태</th>
            <td>시작혈압 몸무게</td>
            <td>시작혈압 몸무게</td>
          </tr>
          <tr>
            <th scope="row">몸무게</th>
            <td>시작혈압 몸무게</td>
            <td>시작혈압 몸무게</td>
          </tr>
          <tr>
            <th scope="row">혈압</th>
            <td>시작혈압 몸무게</td>
            <td>시작혈압 몸무게</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
