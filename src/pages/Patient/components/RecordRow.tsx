import EditButton from "../../../components/ui/EditButton";
import TrashButton from "../../../components/ui/TrashButton";
import type { BpNote } from "../../../types/PatientDetailTypes";
import { formatYMDTHM } from "../../../utils/formatYMDTHM";
import "./RecordRow.css";

export default function RecordRow({ time, isChecked, author, note }: BpNote) {
  return (
    <div className="recordrow__container">
      <input type="checkbox" checked={isChecked} />
      <span>{formatYMDTHM(time)}</span>
      <span style={{ color: "#6F9EA6", fontWeight: "bold", flexShrink: 0 }}>
        {author}
      </span>
      <span
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {note}
      </span>
      <span className="recordrow__buttons">
        <EditButton />
        <TrashButton />
      </span>
    </div>
  );
}
