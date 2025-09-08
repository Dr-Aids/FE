import type { BpNote } from "../../../types/PatientDetailTypes";
import "./Record.css";
import RecordRow from "./RecordRow";

export default function Record({ records }: { records: BpNote[] }) {
  return (
    <div className="record__container">
      <div className="record__header">
        <div className="record__title">Records</div>
      </div>
      <div className="record__content">
        {records?.length !== 0 ? (
          records.map((item, idx) => {
            return (
              <div className="recordrow">
                <RecordRow
                  key={`${item.time} - ${item.author} : ${item.note} `}
                  {...item}
                />
                {idx !== records.length - 1 ? (
                  <hr style={{ color: "gray" }} />
                ) : (
                  ""
                )}
              </div>
            );
          })
        ) : (
          <span>기록이 존재하지 않습니다.</span>
        )}
      </div>
    </div>
  );
}
