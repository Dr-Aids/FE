import { useParams } from "react-router-dom";
import type { Prescription } from "../../../types/PrescriptionTypes";
import "./PrescriptionInput.css";
import { useState } from "react";

interface PrescriptionInputPorps {
  onClose: () => void;
  prescription: Prescription;
  onChangedPrescription: () => void;
}

interface PrescriptionFormData extends Prescription {
  patientId: string;
}

interface PrescriptionFormErrors {
  hematapoieticAgent?: string;
  iu?: string;
  date?: string;
}

export default function PrescriptionInput({
  onClose,
  prescription,
  onChangedPrescription,
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

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formErrors, setFormErrors] = useState<PrescriptionFormErrors>({});

  const checkField = () => {
    const newErrors: PrescriptionFormErrors = {};
    if (!formData.date) {
      newErrors.date = "처방 날짜를 입력해주세요";
    }

    if (!formData.hematapoieticAgent) {
      newErrors.hematapoieticAgent = "조혈제를 입력해주세요";
    }

    if (!formData.iu) {
      newErrors.iu = "IU를 입력해주세요";
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0; // checkFiled의 반환이 true여야 데이터가 정상 입력된 상태
  };

  const handleInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const key = e.target.id as keyof PrescriptionFormErrors;
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (formErrors[key]) {
      setFormErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!checkField()) return;
    const accessToken = localStorage.getItem("accessToken");

    setIsLoading(true);
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

      onChangedPrescription();
      onClose();
    } catch (err) {
      console.log("에러메세지(처방 내역 수정) : ", err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className="prescription-input-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="date">날짜</label>
        <div className="form-input-col">
          <input
            type="date"
            id="date"
            value={formData.date}
            placeholder="2025-01-01"
            onChange={handleInput}
          />
          {formErrors.date && <span>{formErrors.date}</span>}
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="hematapoieticAgent">Hematinic</label>
        <div className="form-input-col">
          <input
            type="text"
            id="hematapoieticAgent"
            value={formData.hematapoieticAgent}
            placeholder="EPO"
            onChange={handleInput}
          />
          {formErrors.hematapoieticAgent && (
            <span>{formErrors.hematapoieticAgent}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="iu">IU</label>
        <div className="form-input-col">
          <input
            type="number"
            id="iu"
            value={formData.iu}
            placeholder="2000"
            onChange={handleInput}
          />
          {formErrors.iu && <span>{formErrors.iu}</span>}
        </div>
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? "수정 중..." : "수정"}
        </button>
      </div>
    </form>
  );
}
