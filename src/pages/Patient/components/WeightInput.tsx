import React, { useState } from "react";
import "./WeightInput.css";
import type { WeightListItem } from "../../../types/PatientDetailTypes";

interface WeightInputProps {
  weightList?: WeightListItem;
  onClose: () => void;
  patientId: string;
  session: string;
  onChangedWeight: () => void;
}

type WeightFormData = Omit<
  WeightListItem,
  "patientId" | "session" | "averageWeight"
> & {
  patientId: string;
  session: string;
};

export default function WeightInput({
  onClose,
  weightList,
  patientId,
  session,
  onChangedWeight,
}: WeightInputProps) {
  const [formData, setFormData] = useState<WeightFormData>({
    patientId: patientId,
    session: session,
    controlUF: weightList?.controlUF ?? null,
    dryWeight: weightList?.dryWeight ?? null,
    postWeight: weightList?.postWeight ?? null,
    preWeight: weightList?.preWeight ?? null,
    targetUF: weightList?.targetUF ?? null,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    setIsLoading(true);
    try {
      if (!accessToken)
        throw new Error("잘못된 접근입니다 - 로그인 후 시도해주세요");
      const res = await fetch(`/api/weight`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ ...formData }),
      });
      if (!res.ok) throw new Error(`HTTP Error - ${res.status}`);

      // 요청 성공시 최신 데이터 다시 렌더링 및 모달 닫기
      onChangedWeight();
      onClose();
    } catch (err) {
      console.log("에러메세지(체중정보 수정/추가) : ", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="patient-info-modify-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="preWeight">Pre-Weight</label>
        <input
          type="number"
          id="preWeight"
          value={formData.preWeight ?? ""}
          placeholder="10.0"
          onChange={handleInput}
        />
      </div>
      <div className="form-row">
        <label htmlFor="postWeight">Post Weight</label>
        <input
          type="number"
          id="postWeight"
          value={formData.postWeight ?? ""}
          placeholder="10.0"
          onChange={handleInput}
        />
      </div>
      <div className="form-row">
        <label htmlFor="dryWeight">Dry Weight</label>
        <input
          type="number"
          id="dryWeight"
          value={formData.dryWeight ?? ""}
          placeholder="10.0"
          onChange={handleInput}
        />
      </div>
      <div className="form-row">
        <label htmlFor="targetUF">Target UF</label>
        <input
          type="number"
          id="targetUF"
          value={formData.targetUF ?? ""}
          placeholder="10.0"
          onChange={handleInput}
        />
      </div>
      <div className="form-row">
        <label htmlFor="controlUF">Control UF</label>
        <input
          type="number"
          id="controlUF"
          value={formData.controlUF ?? ""}
          placeholder="10.0"
          onChange={handleInput}
        />
      </div>
      <div className="form-actions">
        <button type="button" onClick={onClose}>
          취소
        </button>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "추가 중..." : weightList ? "수정" : "추가"}
        </button>
      </div>
    </form>
  );
}
