import { useLocation, useNavigate, useParams } from "react-router-dom";
import InHospitalIcon from "./ui/InHospital";
import type { PatientListRow } from "../types/patientSummaryType";
import { useEffect, useState } from "react";
import { sortISOStrings } from "../utils/sortISOStrings";
import "./PatientRow.css"; // CSS 파일 임포트
import { API_URL } from "../config";

type PatientRowProps = PatientListRow & { index: number };

export default function PatientRow({
  id,
  name,
  gender,
  age,
  birth,
  visiting,
}: PatientRowProps) {
  const [lastSession, setLastSession] = useState<number>(0);
  const [lastDate, setLastDate] = useState<string>("9999-99-99");
  const nav = useNavigate();
  const location = useLocation();
  const pageName = location.pathname.split("/")[1];

  // URL에서 patientId 파라미터를 가져옴
  const { patientId: selectedPatientId } = useParams<{ patientId?: string }>();

  function handleClickPatientRow() {
    if (pageName === "prescription") nav(`/${pageName}/${id}/${lastDate}`);
    else nav(`/${pageName}/${id}/${lastSession}`);
  }

  const accessToken = localStorage.getItem("accessToken");

  const fetchAllSession = async () => {
    try {
      if (!accessToken)
        throw new Error("잘못된 접근입니다 - 로그인 후 시도해주세요");

      const response = await fetch(`${API_URL}/session?patientId=${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) {
        if (response.status === 404) {
          setLastSession(0);
          return;
        }
        throw new Error(`HTTP Error - ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setLastSession(data[data.length - 1].session);
      } else {
        setLastSession(0);
      }
    } catch (err) {
      console.log("에러메세지(fetchAllSession) : ", err);
      setLastSession(0);
    }
  };

  const fetchPrescriptionDates = async () => {
    try {
      if (!accessToken)
        throw new Error("잘못된 접근입니다 - 로그인 후 시도해주세요");
      const res = await fetch(
        `${API_URL}/prescriptions/dates?patientId=${id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (!res.ok) throw new Error(`HTTP Error - ${res.status}`);
      const data: string[] = await res.json();

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

  // 현재 행이 선택되었는지 확인
  const isSelected = selectedPatientId === id.toString();

  const rowClassName = `patient-row ${
    isSelected ? "patient-row--selected" : ""
  }`;

  return (
    <tr className={rowClassName} onClick={handleClickPatientRow}>
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
