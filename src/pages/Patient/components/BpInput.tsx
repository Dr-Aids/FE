import { useEffect, useState } from "react";
import type { Bp } from "../../../types/PatientDetailTypes";
import "./BpInput.css";

interface BpInputProps {
  patientId: string;
  session: string;
  bps?: Bp[];
  onClose: () => void;
  onChangedBp: () => void;
}

//bps가 존재하지 않으면 등록, 존재하면 수정

// 수정할 때만 bloodId가 필요함

interface BpFormData {
  patientId: string;
  session: string;
  bloodId?: string;
  sbp: string;
  dbp: string;
  measurementTime: string;
}

export default function BpInput({
  patientId,
  session,
  bps,
  onClose,
  onChangedBp,
}: BpInputProps) {
  const [formData, setFormData] = useState<BpFormData>(
    bps == null
      ? {
          patientId: patientId,
          session: session,
          sbp: "",
          dbp: "",
          measurementTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
        }
      : {
          patientId: patientId,
          session: session,
          bloodId: bps[0]?.bloodPressureId.toString() ?? "",
          sbp: "",
          dbp: "",
          measurementTime: "",
        }
  );

  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const [isLoadingModify, setIsLoadingModify] = useState<boolean>(false);

  function todayAt(timeStr: string) {
    const [hh = "0", mm = "0", ss = "0"] = timeStr.split(":");
    const d = new Date(); // 오늘 (로컬 타임존)
    d.setHours(Number(hh), Number(mm), Number(ss), 0);
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);

    return local.toISOString();
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    setIsLoadingModify(true);
    try {
      if (!accessToken)
        throw new Error("잘못된 접근입니다 - 로그인 후 시도해주세요");
      const res = await fetch(`/api/blood-pressure`, {
        method: bps == null ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          ...formData,
          measurementTime: todayAt(formData.measurementTime),
        }),
      });
      if (!res.ok) throw new Error(`HTTP Error - ${res.status}`);

      onChangedBp();
      onClose();
      //   const data = await res.json();
    } catch (err) {
      console.log("에러메세지(혈액 정보 등록) : ", err);
    } finally {
      setIsLoadingModify(false);
    }
  };

  const handleClickDeleteBp = async () => {
    if (!confirm("정말로 삭제하시겠습니까?")) return;
    const accessToken = localStorage.getItem("accessToken");
    setIsLoadingDelete(true);
    try {
      if (!accessToken)
        throw new Error("잘못된 접근입니다 - 로그인 후 시도해주세요");
      const res = await fetch(
        `/api/blood-pressure?bloodId=${formData.bloodId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (!res.ok) throw new Error(`HTTP Error - ${res.status}`);

      onChangedBp();
      onClose();
    } catch (err) {
      console.log("에러메세지(환자 삭제) : ", err);
    } finally {
      setIsLoadingDelete(false);
    }
  };

  // 수정할 data를 바꿨을 때 해당 sbp,dbp를 보여주기 위한 useEffect
  useEffect(() => {
    if (bps == null || formData.bloodId === "") return;

    const nowData = bps!.filter(
      (bp) => formData.bloodId?.toString() === bp.bloodPressureId.toString()
    )[0];

    setFormData((prev) => ({
      ...prev,
      measurementTime: nowData.time,
      dbp: nowData.dbp?.toString() ?? "",
      sbp: nowData.sbp?.toString() ?? "",
    }));
  }, [formData.bloodId]);
  return (
    <form className="bp-input-form" onSubmit={handleSubmit}>
      {bps && (
        <div className="form-row">
          <label htmlFor="bloodId">수정할 시간 선택</label>
          <select
            id="bloodId"
            value={formData.bloodId}
            onChange={handleChangeOption}
            required
          >
            <option value="" hidden>
              선택하세요
            </option>
            {bps!.map((item) => (
              <option
                key={item.bloodPressureId}
                value={String(item.bloodPressureId)}
              >
                {item.time}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="form-row">
        <label htmlFor="measurementTime">
          시간 {bps == null ? "입력" : "변경"}
        </label>
        <input
          id="measurementTime"
          type="time"
          value={formData.measurementTime}
          placeholder="노트를 입력하세요"
          onChange={handleInput}
        />
      </div>

      <div className="form-row">
        <label htmlFor="sbp">수축기(sbp)</label>
        <input
          type="text"
          id="sbp"
          value={formData.sbp}
          placeholder="135"
          onChange={handleInput}
        />
      </div>

      <div className="form-row">
        <label htmlFor="sbp">이완기(dbp)</label>
        <input
          type="text"
          id="dbp"
          value={formData.dbp}
          placeholder="70"
          onChange={handleInput}
        />
      </div>

      <div className="form-actions">
        <button
          type="button"
          onClick={bps != null ? handleClickDeleteBp : onClose}
          disabled={isLoadingDelete}
        >
          {isLoadingDelete ? "삭제 중..." : bps != null ? "삭제" : "취소"}
        </button>
        <button type="submit" disabled={isLoadingModify}>
          {isLoadingModify ? "추가 중..." : bps != null ? "수정" : "추가"}
        </button>
      </div>
    </form>
  );
}
