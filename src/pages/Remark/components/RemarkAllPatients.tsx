import "./RemarkAllPatients.css";
import { specialNoteData } from "../../../mocks/specialNoteData";

export default function RemarkAllPatients() {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th scope="col">환자명</th>
            <th scope="col">회차/날짜</th>
            <th scope="col">종류</th>
            <th scope="col">현재 회차 특이사항 / 상태</th>
            <th scope="col">이전 회차 특이사항 / 상태</th>
          </tr>
        </thead>
        <tbody>
          {specialNoteData.map((data) => (
            <tr>
              <td>{data.patientName}</td>
              <td>{data.sessionInfo}</td>
              <td>{data.type}</td>
              <td>{data.currentNote}</td>
              <td>{data.previousNote}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
