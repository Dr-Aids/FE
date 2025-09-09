import React, { useState } from "react";
import "./RecordInput.css";
import type { Bp } from "../../../types/PatientDetailTypes";

interface RecordInputProps {
  onClose: () => void;
  session: string;
  bps: Bp[];
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
}: RecordInputProps) {
  const [formData, setFormData] = useState<RecordFormData>({
    session: session,
    bloodId: "",
    note: "",
    isChecked: false,
  });

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

    const mock = {
      session: 1,
      bloodId: 3,
      note: "왜안되냐",
      isChecked: true,
    };

    try {
      console.log(requestBody);
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
      const data = await res.json();
      if (!res.ok)
        throw new Error(`HTTP Error - ${res.status} - ${data.message}`);

      onClose();
    } catch (err) {
      console.log("에러메세지(혈압 노트 등록) : ", err);
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
        >
          <option value="" disabled hidden>
            선택하세요
          </option>
          {bps.map((item) => (
            <option
              key={item.bloodPressureId} // ← key 추가
              value={String(item.bloodPressureId)} // ← value는 문자열 권장
            >
              {item.time}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <label htmlFor="note">노트</label>
        <textarea
          id="note"
          value={formData.note}
          placeholder="노트를 입력하세요"
          onChange={handleInput}
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
        <button type="submit">추가</button>
      </div>
    </form>
  );
}
