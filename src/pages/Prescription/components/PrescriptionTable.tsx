import "./PrescriptionTable.css";
import PrescriptionTableRow from "./PrescriptionTableRow";
import { prescriptionData } from "../../../mocks/prescriptionData";
export default function PrescriptionTable() {
  return (
    <div className="prescription__table__container">
      <table className="prescription__table">
        <thead className="prescription__thead">
          <th>Date</th>
          <th>Hematinic</th>
          <th>IU</th>
          <th>Description</th>
        </thead>
        <tbody className="prescription__tbody">
          {prescriptionData.map((data, idx) => (
            <PrescriptionTableRow {...data} idx={idx} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
