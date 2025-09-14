import React, { useState } from "react";
import "./WeightInput.css";
import type { WeightListItem } from "../../../types/PatientDetailTypes";
// import type { ResponseStatus } from "../../../types/ResponseStatus";

interface WeightInputProps {
  weightList?: WeightListItem;
  onClose: () => void;
  patientId: string;
  session: string;
  onChangedWeight: () => void;
}

type WeightFormData = {
  preWeight: string | null;
  dryWeight: string | null;
  postWeight: string | null;
  targetUF: string | null;
  controlUF: string | null;
  patientId: string;
  session: string;
};

interface WeightFormErrors {
  controlUF?: string;
  dryWeight?: string;
  postWeight?: string;
  preWeight?: string;
  targetUF?: string;
}

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
    controlUF: weightList?.controlUF?.toFixed(1) ?? null,
    dryWeight: weightList?.dryWeight?.toFixed(1) ?? null,
    postWeight: weightList?.postWeight?.toFixed(1) ?? null,
    preWeight: weightList?.preWeight?.toFixed(1) ?? null,
    targetUF: weightList?.targetUF?.toFixed(1) ?? null,
  });

  const [formErrors, setFormErrors] = useState<WeightFormErrors>({});

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const checkField = () => {
    const newErrors: WeightFormErrors = {};

    // 뭐가 필수데이터인지 몰라서 일단 5개중에 아래 3개만 필수록 입력하도록 함
    if (!formData.dryWeight) {
      newErrors.dryWeight = "건체중을 입력해주세요";
    }

    if (!formData.preWeight) {
      newErrors.preWeight = "현재 체중을 입력해주세요";
    }

    if (!formData.targetUF) {
      newErrors.targetUF = "목표 UF를 입력해주세요";
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0; // checkFiled의 반환이 true여야 데이터가 정상 입력된 상태
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.id as keyof WeightFormErrors;
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
    console.log(formData);

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
      // 에러 분기 처리
      if (!res.ok) {
        // const errorStatus: ResponseStatus = await res.json();
        // console.log(errorStatus);
        // if (errorStatus.status === 501) {

        // }

        throw new Error(`HTTP Error - ${res.status}`);
      }

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
    <form className="weight-input-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="preWeight">Pre-Weight</label>
        <div className="form-input-col">
          <input
            type="number"
            id="preWeight"
            value={formData.preWeight ?? ""}
            placeholder="10.0"
            onChange={handleInput}
            step={0.1}
          />
          {formErrors.preWeight && <span>{formErrors.preWeight}</span>}
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="postWeight">Post Weight</label>
        <div className="form-input-col">
          <input
            type="number"
            id="postWeight"
            value={formData.postWeight ?? ""}
            placeholder="10.0"
            onChange={handleInput}
            step={0.1}
          />
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="dryWeight">Dry Weight</label>
        <div className="form-input-col">
          <input
            type="number"
            id="dryWeight"
            value={formData.dryWeight ?? ""}
            placeholder="10.0"
            onChange={handleInput}
            step={0.1}
          />
          {formErrors.dryWeight && <span>{formErrors.dryWeight}</span>}
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="targetUF">Target UF</label>
        <div className="form-input-col">
          <input
            type="number"
            id="targetUF"
            value={formData.targetUF ?? ""}
            placeholder="10.0"
            onChange={handleInput}
            step={0.1}
          />
          {formErrors.targetUF && <span>{formErrors.targetUF}</span>}
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="controlUF">Control UF</label>
        <div className="form-input-col">
          <input
            type="number"
            id="controlUF"
            value={formData.controlUF ?? ""}
            placeholder="10.0"
            onChange={handleInput}
            step={0.1}
          />
        </div>
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
