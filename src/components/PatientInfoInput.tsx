import React, { useState } from "react";
import type { PatientSummaryHeader } from "../types/patientSummaryType";
import "./PatientInfoInput.css";
import { useNavigate } from "react-router-dom";

interface PatientInfoInputProps {
  patient?: PatientSummaryHeader;
  onClose: () => void;
  onPatientModified: () => void;
}
export default function PatientInfoInput({
  patient,
  onClose,
  onPatientModified,
}: PatientInfoInputProps) {
  const [formData, setFormData] = useState<PatientSummaryHeader>({
    id: patient?.id ?? -1,
    name: patient?.name ?? "",
    age: patient?.age ?? 0,
    birth: patient?.birth ?? "",
    gender: patient?.gender ?? "MALE",
    disease: patient?.disease ?? "",
    pic: patient?.pic ?? "",
  });

  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.id;
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

    if (patient) {
      try {
        if (!accessToken)
          throw new Error("잘못된 접근입니다 - 로그인 후 시도해주세요");
        const res = await fetch(`/api/patient/info/${patient.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ ...formData }),
        });
        if (!res.ok) throw new Error(`HTTP Error - ${res.status}`);

        // 성공했을 때 최신 데이터 반영 및 모달 닫기
        onPatientModified();
        onClose();
      } catch (err) {
        console.log("에러메세지(환자정보 수정) : ", err);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        if (!accessToken)
          throw new Error("잘못된 접근입니다 - 로그인 후 시도해주세요");
        const res = await fetch(`/api/patient/info`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ ...formData }),
        });
        if (!res.ok) throw new Error(`HTTP Error - ${res.status}`);

        // 성공했을 때 text 받고, text로부터 새로 추가된 환자 ID 추출하기
        // 그 후 추가한 환자 페이지로 이동
        const text = await res.text();

        const match = text.match(/\d+/); // text에서 추가된 투석회차 ID만 추출하기
        if (match) {
          const addedpatientId = Number(match[0]);
          console.log(addedpatientId);
          nav(`patient/${addedpatientId}/0`);
        }

        // 성공했을 때 최신 데이터 반영 및 모달 닫기
        onPatientModified();
        onClose();
      } catch (err) {
        console.log("에러메세지(환자 추가) : ", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form className="patient-info-modify-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="name">이름</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          placeholder="홍길동"
          onChange={handleInput}
        />
      </div>
      <div className="form-row">
        <label htmlFor="age">나이</label>
        <input
          type="text"
          id="age"
          value={formData.age}
          placeholder="23"
          onChange={handleInput}
        />
      </div>
      <div className="form-row">
        <label htmlFor="birth">생년월일</label>
        <input
          type="text"
          id="birth"
          value={formData.birth}
          placeholder="2000-01-01"
          onChange={handleInput}
        />
      </div>
      <div className="form-row">
        <label htmlFor="gender">성별</label>
        <select
          id="gender"
          onChange={handleChangeOption}
          defaultValue={formData.gender}
          value={formData.gender}
        >
          <option value={"MALE"}>남</option>
          <option value={"FEMALE"}>여</option>
        </select>
      </div>
      <div className="form-row">
        <label htmlFor="disease">병명</label>
        <input
          type="text"
          id="disease"
          value={formData.disease}
          placeholder="당뇨병"
          onChange={handleInput}
        />
      </div>
      <div className="form-row">
        <label htmlFor="pic">주치의</label>
        <input
          disabled={patient != null}
          type="text"
          id="pic"
          value={formData.pic}
          placeholder="강희승"
          onChange={handleInput}
        />
      </div>
      <div className="form-actions">
        <button type="button" onClick={onClose}>
          취소
        </button>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "추가 중..." : patient ? "수정" : "추가"}
        </button>
      </div>
    </form>
  );
}
