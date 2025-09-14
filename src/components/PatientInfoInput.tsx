import React, { useState } from "react";
import type { PatientSummaryHeader } from "../types/patientSummaryType";
import "./PatientInfoInput.css";
import { useNavigate } from "react-router-dom";
import type { ResponseStatus } from "../types/ResponseStatus";

interface PatientInfoInputProps {
  patient?: PatientSummaryHeader;
  onClose: () => void;
  onPatientModified: () => void;
}

interface PatientFormErros {
  name?: string;
  age?: string;
  birth?: string;
  gender?: string;
  disease?: string;
  visiting?: string;
  pic?: string;
}

export default function PatientInfoInput({
  patient,
  onClose,
  onPatientModified,
}: PatientInfoInputProps) {
  const [formData, setFormData] = useState<PatientSummaryHeader>(
    patient
      ? {
          id: patient?.id ?? -1,
          name: patient?.name ?? "",
          age: patient?.age ?? 0,
          birth: patient?.birth ?? "",
          gender: patient?.gender ?? "MALE",
          disease: patient?.disease ?? "",
          visiting: patient?.visiting,
          pic: patient?.pic ?? "",
        }
      : {
          id: -1,
          name: "",
          age: 1,
          birth: "",
          gender: "MALE",
          disease: "",
          pic: "",
        }
  );
  const [formErrors, setFormErrors] = useState<PatientFormErros>({});

  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const checkField = () => {
    const newErrors: PatientFormErros = {};
    if (formData.name === "") {
      newErrors.name = "이름을 입력해주세요";
    }
    if (formData.age < 0) {
      newErrors.age = "올바른 나이를 입력해주세요";
    }

    if (!formData.birth) {
      newErrors.birth = "생년월일을 입력해주세요";
    }

    if (formData.disease === "") {
      newErrors.disease = "병명을 입력해주세요";
    }

    if (formData.visiting && !formData.visiting) {
      newErrors.visiting = "내원 여부를 선탹해주세요";
    }

    if (formData.pic === "") {
      newErrors.pic = "주치의를 입력해주세요";
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0; // checkFiled의 반환이 true여야 데이터가 정상 입력된 상태
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.id as keyof PatientFormErros;
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (formErrors[key]) {
      setFormErrors((prev) => ({ ...prev, [key]: undefined }));
    }
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
    if (!checkField()) return;
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
          body: JSON.stringify({
            ...formData,
            visiting: formData.visiting === "true" ? true : false,
          }),
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

        // 에러 분기 처리
        if (!res.ok) {
          const errorStatus: ResponseStatus = await res.json();
          if (errorStatus.status === 404) {
            if (errorStatus.code === "DOCTOR_NOT_FOUND") {
              setFormErrors((prev) => ({ ...prev, pic: errorStatus.message }));
              throw new Error(errorStatus.message);
            }
          }

          throw new Error(`HTTP Error - ${res.status}`);
        }

        // 성공했을 때 text 받고, text로부터 새로 추가된 환자 ID 추출하기
        // 그 후 추가한 환자 페이지로 이동
        const text = await res.text();

        const match = text.match(/\d+/); // text에서 추가된 투석회차 ID만 추출하기
        if (match) {
          const addedpatientId = Number(match[0]);

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
        <div className="form-input-col">
          <input
            type="text"
            id="name"
            value={formData.name}
            placeholder="홍길동"
            onChange={handleInput}
          />

          {formErrors.name && <span>{formErrors.name}</span>}
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="age">나이</label>
        <div className="form-input-col">
          <input
            type="number"
            id="age"
            value={formData.age}
            placeholder="23"
            onChange={handleInput}
            min={1}
          />
          {formErrors.age && <span>{formErrors.age}</span>}
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="birth">생년월일</label>
        <div className="form-input-col">
          <input
            type="date"
            id="birth"
            value={formData.birth}
            placeholder="2000-01-01"
            onChange={handleInput}
          />
          {formErrors.birth && <span>{formErrors.birth}</span>}
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="gender">성별</label>
        <div className="form-input-col">
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
      </div>

      <div className="form-row">
        <label htmlFor="disease">병명</label>
        <div className="form-input-col">
          <input
            type="text"
            id="disease"
            value={formData.disease}
            placeholder="당뇨병"
            onChange={handleInput}
          />
          {formErrors.disease && <span>{formErrors.disease}</span>}
        </div>
      </div>

      {patient && (
        <div className="form-row">
          <label htmlFor="visiting">내원 여부</label>
          <div className="form-input-col">
            <select
              id="visiting"
              onChange={handleChangeOption}
              value={formData.visiting}
              defaultValue={"true"}
            >
              <option value="" hidden>
                선택하세요
              </option>
              <option value={"true"}>내원</option>
              <option value={"false"}>외래</option>
            </select>
            {formErrors.visiting && <span>{formErrors.visiting}</span>}
          </div>
        </div>
      )}

      <div className="form-row">
        <label htmlFor="pic">주치의</label>
        <div className="form-input-col">
          <input
            disabled={patient != null}
            type="text"
            id="pic"
            value={formData.pic}
            placeholder="강희승"
            onChange={handleInput}
          />
          {formErrors.pic && <span>{formErrors.pic}</span>}
        </div>
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
