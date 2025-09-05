import type { Prescription } from "../../../types/PrescriptionTypes";
import "./PrescriptionTable.css";

interface PrescriptionTableRowProps extends Prescription {
  index: number;
}

export default function PrescriptionTableRow({
  id,
  index,
  date,
  hematapoieticAgent,
  iu,
  description,
}: PrescriptionTableRowProps) {
  return (
    <tr
      className="prescription__tr"
      style={
        index % 2 === 0
          ? { backgroundColor: "#CBE8EE" }
          : { backgroundColor: "#E6F1FD" }
      }
    >
      <td>{date}</td>
      <td>{hematapoieticAgent}</td>
      <td>{iu}IU</td>
      <td>{description}</td>
    </tr>
  );
}
