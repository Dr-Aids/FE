import { useState } from "react";
import EditButton from "../../../components/ui/EditButton";
import TrashButton from "../../../components/ui/TrashButton";
import type { BpNote } from "../../../types/PatientDetailTypes";
import "./RecordRow.css";
import Modal from "../../../components/Modal";
import RecordInput from "./RecordInput";

interface RecordRowProps {
  bpNote: BpNote;
  session: string;
}

export default function RecordRow({ bpNote, session }: RecordRowProps) {
  const [openModifyRecord, setOpenRecordModifyRecord] =
    useState<boolean>(false);
  const { time, isChecked, author, note } = bpNote;

  const handleClickDeleteRecord = async () => {
    if (!confirm("정말로 삭제하시겠습니까?")) return;
    const accessToken = localStorage.getItem("accessToken");
    try {
      if (!accessToken)
        throw new Error("잘못된 접근입니다 - 로그인 후 시도해주세요");
      const res = await fetch(
        `/api/blood-pressure/notes?pressureId=${bpNote.bloodPressureId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (!res.ok) throw new Error(`HTTP Error - ${res.status}`);
      const data = await res.json();
      console.log(data.message);
    } catch (err) {
      console.log("에러메세지(혈압 노트 삭제) : ", err);
    }
  };
  return (
    <div className="recordrow__container">
      <div className="recordrow__info">
        <input type="checkbox" checked={isChecked} readOnly />
        <span>{time}</span>
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
      </div>
      <span className="recordrow__buttons">
        <EditButton onClick={() => setOpenRecordModifyRecord(true)} />
        <TrashButton onClick={handleClickDeleteRecord} />
      </span>

      <Modal
        title="혈압 노트 수정"
        isOpen={openModifyRecord}
        onClose={() => setOpenRecordModifyRecord(false)}
      >
        <RecordInput
          bpNote={bpNote}
          onClose={() => setOpenRecordModifyRecord(false)}
          session={session}
        />
      </Modal>
    </div>
  );
}
