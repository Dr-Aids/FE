import { useParams } from "react-router-dom";
import type { Prescription } from "../../../types/PrescriptionTypes";
import "./PrescriptionInput.css";
import { useState } from "react";

interface PrescriptionInputPorps {
  onClose: () => void;
  prescription: Prescription;
}

interface PrescriptionFormData extends Prescription {
  patientId: string;
}

export default function PrescriptionInput({
  onClose,
  prescription,
}: PrescriptionInputPorps) {
  const { patientId } = useParams<{ patientId: string }>();
  const [formData, setFormData] = useState<PrescriptionFormData>({
    patientId: patientId ?? "-1",
    date: prescription.date,
    id: prescription.id,
    iu: prescription.iu,
    description: prescription.description,
    hematapoieticAgent: prescription.hematapoieticAgent,
  });

  const handleInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const key = e.target.id;
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");

    try {
      if (!accessToken)
        throw new Error("잘못된 접근입니다 - 로그인 후 시도해주세요");
      const res = await fetch(`/api/prescriptions`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ ...formData }),
      });
      if (!res.ok) throw new Error(`HTTP Error - ${res.status}`);
    } catch (err) {
      console.log("에러메세지(처방 내역 수정) : ", err);
    }
  };
  return (
    <form className="patient-info-modify-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="date">날짜</label>
        <input
          type="date"
          id="date"
          value={formData.date}
          placeholder="2025-01-01"
          onChange={handleInput}
        />
      </div>

      <div className="form-row">
        <label htmlFor="hematapoieticAgent">Hematinic</label>
        <input
          type="text"
          id="hematapoieticAgent"
          value={formData.hematapoieticAgent}
          placeholder="EPO"
          onChange={handleInput}
        />
      </div>

      <div className="form-row">
        <label htmlFor="iu">IU</label>
        <input
          type="number"
          id="iu"
          value={formData.iu}
          placeholder="2000"
          onChange={handleInput}
        />
      </div>

      <div className="form-row">
        <label htmlFor="description">노트</label>
        <textarea
          id="description"
          value={formData.description}
          placeholder="노트를 입력하세요"
          onChange={handleInput}
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onClose}>
          취소
        </button>
        <button type="submit">수정</button>
      </div>
    </form>
  );
}
