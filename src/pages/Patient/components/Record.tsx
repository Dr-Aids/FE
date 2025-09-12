import { useState } from "react";
import Modal from "../../../components/Modal";
import PlusButton from "../../../components/ui/PlusButton";
import type { Bp, BpNote } from "../../../types/PatientDetailTypes";
import "./Record.css";
import RecordRow from "./RecordRow";
import RecordInput from "./RecordInput";
import EmptyDataState from "../../../components/EmptyDataState";

interface RecordProps {
  records: BpNote[];
  bps: Bp[];
  session: string;
  onChangedRecord: () => void;
}

export default function Record({
  records,
  bps,
  session,
  onChangedRecord,
}: RecordProps) {
  const [openRecordModal, setOpenRecordModal] = useState<boolean>(false);

  if (bps.length === 0)
    return (
      <div className="record__container card-container">
        <div className="record__header">
          <h3 className="record__title">Records</h3>
        </div>
        <EmptyDataState
          type="bpnote"
          title=""
          description="혈압 데이터를 먼저 추가해주세요"
        />
      </div>
    );

  return (
    <div className="record__container card-container">
      <div className="record__header">
        <h3 className="record__title">Records</h3>
        {records.length !== 0 ? (
          <PlusButton onClick={() => setOpenRecordModal(true)} />
        ) : (
          ""
        )}
      </div>
      <div className="record__content">
        {records.length !== 0 ? (
          records.map((item, idx) => {
            if (item.author === null && item.note === null) return;
            return (
              <div
                className="recordrow"
                key={`${item.time} - ${item.author} : ${item.note} `}
              >
                <RecordRow
                  bpNote={item}
                  session={session}
                  onChangedRecord={onChangedRecord}
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
          <>
            <EmptyDataState
              type="bpnote"
              title="혈압 관련 노트가 존재하지 않습니다."
              description="노트를 작성하세요"
              onAction={() => setOpenRecordModal(true)}
              actionText="추가하기"
            />
          </>
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
          onChangedRecord={onChangedRecord}
        />
      </Modal>
    </div>
  );
}
