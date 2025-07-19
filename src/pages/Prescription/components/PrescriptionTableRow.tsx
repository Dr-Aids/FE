import "./PrescriptionTable.css";

export default function PrescriptionTableRow({
  date,
  hematinic,
  iu,
  description,
  idx,
}) {
  console.log(idx);
  return (
    <tr
      className="prescription__tr"
      style={
        idx % 2 === 0
          ? { backgroundColor: "#CBE8EE" }
          : { backgroundColor: "#E6F1FD" }
      }
    >
      <td>{date}</td>
      <td>{hematinic}</td>
      <td>{iu}</td>
      <td>{description}</td>
    </tr>
  );
}
