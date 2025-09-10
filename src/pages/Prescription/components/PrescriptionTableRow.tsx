import EditButton from "../../../components/ui/EditButton";

import TrashButton from "../../../components/ui/TrashButton";
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
      <td
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {description}
        <span>
          <EditButton />
          <TrashButton />
        </span>
      </td>
    </tr>
  );
}
