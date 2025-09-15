import React, { useState } from "react";
import "./HospitalInput.css";
import type { ResponseStatus } from "../../../types/ResponseStatus";
import { API_URL } from "../../../config";

export default function HospitalInput({
  onClose,
  onHospitalAdded,
}: {
  onClose: () => void;
  onHospitalAdded: () => void;
}) {
  const [formData, setFormData] = useState<{ hospitalName: string }>({
    hospitalName: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const key = e.target.id;
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.hospitalName.trim()) {
      setError("병원 이름을 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/hospital?hospitalName=${formData.hospitalName}`,
        {
          method: "POST",
        }
      );

      if (!res.ok) {
        try {
          const errorData: ResponseStatus = await res.json();
          throw new Error(errorData.message || `HTTP Error - ${res.status}`);
        } catch (jsonError) {
          throw new Error(`HTTP Error - ${res.status}`);
        }
      }

      // 성공적으로 추가되었을 때 병원 목록을 다시 불러오고 모달을 닫습니다.
      onHospitalAdded();
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="hospital-input-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="hospitalName">병원 이름</label>
        <input
          type="text"
          id="hospitalName"
          value={formData.hospitalName}
          placeholder="서울병원"
          onChange={handleInput}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="form-actions">
        <button type="button" onClick={onClose} disabled={isLoading}>
          취소
        </button>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "추가 중..." : "추가"}
        </button>
      </div>
    </form>
  );
}
