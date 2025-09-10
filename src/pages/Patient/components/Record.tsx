import { useState } from "react";
import Modal from "../../../components/Modal";
import PlusButton from "../../../components/ui/PlusButton";
import type { Bp, BpNote } from "../../../types/PatientDetailTypes";
import "./Record.css";
import RecordRow from "./RecordRow";
import RecordInput from "./RecordInput";

interface RecordProps {
  records: BpNote[];
  bps: Bp[];
  session: string;
}

export default function Record({ records, bps, session }: RecordProps) {
  const [openRecordModal, setOpenRecordModal] = useState<boolean>(false);

  return (
    <div className="record__container">
      <div className="record__header">
        <div className="record__title">Records</div>
        <PlusButton onClick={() => setOpenRecordModal(true)} />
      </div>
      <div className="record__content">
        {records?.length !== 0 ? (
          records.map((item, idx) => {
            if (item.author === null && item.note === null) return;
            return (
              <div className="recordrow">
                <RecordRow
                  key={`${item.time} - ${item.author} : ${item.note} `}
                  bpNote={item}
                  session={session}
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

      <Modal
        title="혈압 노트 등록"
        isOpen={openRecordModal}
        onClose={() => setOpenRecordModal(false)}
      >
        <RecordInput
          onClose={() => setOpenRecordModal(false)}
          bps={bps}
          session={session}
        />
      </Modal>
    </div>
  );
}
