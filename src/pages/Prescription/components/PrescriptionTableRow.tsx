import "./PrescriptionTable.css";

export default function PrescriptionTableRow({
  date,
  hematinic,
  iu,
  description,
}) {
  return (
    <tr className="prescription__tr">
      <td>{date}</td>
      <td>{hematinic}</td>
      <td>{iu}</td>
      <td>{description}</td>
    </tr>
  );
}
