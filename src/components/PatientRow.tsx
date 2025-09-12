import { useLocation, useNavigate } from "react-router-dom";
import InHospitalIcon from "./ui/InHospital";
import type { PatientListRow } from "../types/patientSummaryType";
import { useEffect, useState } from "react";
import { sortISOStrings } from "../utils/sortISOStrings";

type PatientRowProps = PatientListRow & { index: number };

export default function PatientRow({
  id,
  name,
  gender,
  age,
  birth,
  visiting,
  index,
}: PatientRowProps) {
  const [lastSession, setLastSession] = useState<number>(0);
  const [lastDate, setLastDate] = useState<string>("9999-99-99");
  const nav = useNavigate();
  const location = useLocation();
  const pageName = location.pathname.split("/")[1];
  function handleClickPatientRow() {
    if (pageName === "prescription") nav(`/${pageName}/${id}/${lastDate}`);
    else nav(`/${pageName}/${id}/${lastSession}`);
  }

  const accessToken = localStorage.getItem("accessToken");

  const fetchAllSession = async () => {
    try {
      if (!accessToken)
        throw new Error("잘못된 접근입니다 - 로그인 후 시도해주세요");

      const response = await fetch(`/api/session?patientId=${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.json();

      if (!response.ok) {
        if (data.code === "SESSION_NOT_FOUND") {
          setLastSession(0);
          return;
        }

        throw new Error(`HTTP Error - ${response.status}`);
      }

      setLastSession(data[data.length - 1].session);
    } catch (err) {
      console.log("에러메세지(fetchAllSession) : ", err);
    }
  };

  const fetchPrescriptionDates = async () => {
    try {
      if (!accessToken)
        throw new Error("잘못된 접근입니다 - 로그인 후 시도해주세요");
      const res = await fetch(`/api/prescriptions/dates?patientId=${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) throw new Error(`HTTP Error - ${res.status}`);
      const data: string[] = await res.json();

      // 중복 제거 후 최신순 정렬(원하면 'asc'로 변경)
      const uniq = Array.from(new Set(data));
      setLastDate(sortISOStrings(uniq, "asc")[uniq.length - 1]);
    } catch (err) {
      console.log("에러메세지(fetchPrescriptionDates) : ", err);
    }
  };

  useEffect(() => {
    fetchAllSession();
    fetchPrescriptionDates();
  }, []);
  return (
    <tr
      style={
        index % 2 === 0
          ? { backgroundColor: "#cbe8ee", borderRadius: "1rem" }
          : { backgroundColor: "#E6F1FD", borderRadius: "1rem" }
      }
      onClick={handleClickPatientRow}
    >
      <td>
        <div className="patient__name">
          {name} ({gender === "MALE" ? "남" : "여"})
        </div>
      </td>

      <td>
        <div className="patient__age">
          {age}세, {birth}
        </div>
      </td>

      <td>
        <InHospitalIcon inHospital={visiting} />
      </td>
    </tr>
  );
}
