import React, { useState } from "react";
import "./RecordInput.css";
import type { Bp, BpNote } from "../../../types/PatientDetailTypes";

// 수정하러 들어오는거면 bpNote를 받고, bps를 받지 않음
// 새로 추가하는거면 bps만 받고, bpNote를 받지않음
interface RecordInputProps {
  onClose: () => void;
  session: string;
  bps?: Bp[];
  bpNote?: BpNote;
  onChangedRecord: () => void;
}

interface RecordFormData {
  session: string;
  bloodId: string;
  note: string;
  isChecked: boolean;
}
export default function RecordInput({
  onClose,
  session,
  bps,
  bpNote,
  onChangedRecord,
}: RecordInputProps) {
  const isModify = !bps && bpNote != null;

  const [formData, setFormData] = useState<RecordFormData>({
    session: session,
    bloodId: bpNote?.bloodPressureId ?? "",
    note: bpNote?.note ?? "",
    isChecked: bpNote?.isChecked ?? false,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const key = e.target.id;
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      bloodId: e.target.value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");

    const requestBody = {
      session: formData.session,
      bloodId: Number(formData.bloodId),
      note: formData.note,
      isChecked: formData.isChecked,
    };
    setIsLoading(true);
    if (isModify) {
      try {
        if (!accessToken)
          throw new Error("잘못된 접근입니다 - 로그인 후 시도해주세요");
        const res = await fetch("/api/blood-pressure/notes", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(requestBody),
        });

        if (!res.ok) throw new Error(`HTTP Error - ${res.status} `);

        onChangedRecord();
        onClose();
      } catch (err) {
        console.log("에러메세지(혈압 노트 수정) : ", err);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        if (!accessToken)
          throw new Error("잘못된 접근입니다 - 로그인 후 시도해주세요");
        const res = await fetch("/api/blood-pressure/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(requestBody),
        });

        if (!res.ok) throw new Error(`HTTP Error - ${res.status} `);

        onChangedRecord();
        onClose();
      } catch (err) {
        console.log("에러메세지(혈압 노트 등록) : ", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form className="patient-info-modify-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="bloodId">시간 선택</label>
        <select
          id="bloodId"
          value={formData.bloodId}
          onChange={handleChangeOption}
          required // ← 빈 값이면 제출 안 되게
          disabled={isModify}
        >
          <option value="" hidden>
            {bpNote?.time ?? "선택하세요"}
          </option>
          {!isModify ? (
            bps!.map((item) => (
              <option
                key={item.bloodPressureId}
                value={String(item.bloodPressureId)}
              >
                {item.time}
              </option>
            ))
          ) : (
            <option key={bpNote.bloodPressureId}>{bpNote.time}</option>
          )}
        </select>
      </div>

      <div className="form-row">
        <label htmlFor="note">노트</label>
        <textarea
          id="note"
          value={formData.note}
          placeholder="노트를 입력하세요"
          onChange={handleInput}
          style={{
            minWidth: "30rem",
          }}
        />
      </div>

      <div className="form-row">
        <label htmlFor="isChecked">확인 완료</label>
        <input
          type="checkbox"
          id="isChecked"
          checked={formData.isChecked}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, isChecked: e.target.checked }))
          }
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onClose}>
          취소
        </button>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "추가 중..." : isModify ? "수정" : "추가"}
        </button>
      </div>
    </form>
  );
}
