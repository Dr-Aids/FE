import "./PrescriptionTable.css";
import PrescriptionTableRow from "./PrescriptionTableRow";
import { prescriptionData } from "../../../mocks/prescriptionData";
export default function PrescriptionTable() {
  return (
    <table>
      <thead className="prescription__thead">
        <th>Date</th>
        <th>Hematinic</th>
        <th>IU</th>
        <th>Description</th>
      </thead>
      <tbody className="prescription__tbody">
        {prescriptionData.map((data) => (
          <PrescriptionTableRow {...data} />
        ))}
      </tbody>
    </table>
  );
}
