import { useState } from "react";
import "./SessionAdd.css";

interface SessionAddProps {
  onClose: () => void;
  patientId: string;
}

interface SessionFormData {
  patientId: string;
  preWeight: string | null;
  dryWeight: string | null;
  targetUF: string | null;
  date: string;
}

export default function SessionAdd({ patientId, onClose }: SessionAddProps) {
  const formatDate = (d = new Date()) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0"); // 01~12
    const dd = String(d.getDate()).padStart(2, "0"); // 01~31
    return `${yyyy}-${mm}-${dd}`;
  };

  const [formData, setFormData] = useState<SessionFormData>({
    patientId: patientId,
    dryWeight: null,
    preWeight: null,
    targetUF: null,
    date: formatDate(),
  });

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

    try {
      if (!accessToken)
        throw new Error("잘못된 접근입니다 - 로그인 후 시도해주세요");
      const res = await fetch(`/api/session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ ...formData }),
      });
      if (!res.ok) throw new Error(`HTTP Error - ${res.status}`);
    } catch (err) {
      console.log("에러메세지(투석 회차 추가) : ", err);
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
        <label htmlFor="date">날짜</label>
        <input
          type="text"
          id="date"
          value={formData.date}
          placeholder="2000-01-01"
          onChange={handleInput}
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
