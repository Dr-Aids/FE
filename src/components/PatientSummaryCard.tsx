import Button from "./ui/Button";
import "./PatientSummaryCard.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { PatientSummaryHeader } from "../types/patientSummaryType";
import { useEffect, useState } from "react";

type SessionItem = {
  session: number;
  date: string;
};

export default function PatientSummaryCard() {
  const nav = useNavigate();
  const location = useLocation();
  const { patientId, session } = useParams<{
    patientId: string;
    session: string;
  }>();
  const pageName = location.pathname.split("/")[1];

  const [patient, setPatient] = useState<PatientSummaryHeader | null>();
  const [sessions, setSessions] = useState<SessionItem[] | null>();

  const selectedValue = `${patientId}/${session}`;

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const fetchPatientSummary = async () => {
      try {
        if (!token)
          throw new Error("잘못된 접근입니다 - 로그인 후 시도해주세요");

        const response = await fetch(`/api/patient/info/${patientId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(`HTTP Error - ${response.status}`);
        const data = await response.json();
        setPatient(data);
      } catch (err) {
        console.log("에러메세지(fetchPatientSummary) : ", err);
      }
    };

    const fetchAllSession = async () => {
      try {
        if (!token)
          throw new Error("잘못된 접근입니다 - 로그인 후 시도해주세요");

        const response = await fetch(`/api/session/${patientId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(`HTTP Error - ${response.status}`);
        const data = await response.json();

        setSessions(data);
      } catch (err) {
        console.log("에러메세지(fetchAllSession) : ", err);
      }
    };

    // 함수 호출부
    Promise.all([fetchPatientSummary(), fetchAllSession()]);
  }, []);

  function handleChangeOption(e: React.ChangeEvent<HTMLSelectElement>) {
    const address = e.target.value;
    nav(`/${pageName}/${address}`);
  }

  if (!patient || !sessions) return <div>데이터 불러오는중...</div>;

  return (
    <div className="patient__info__container">
      <div className="patient__info__main">
        <div className="patient__info__info">
          <div className="patient__info__name">{patient.name}</div>
          <div className="patient__info__sex">
            {patient.gender === "MALE" ? "남" : "여"}
          </div>
          |
          <div>
            {patient.age}세 / {patient.birth}
          </div>
          |<div>{patient.disease}</div>
          <div className="patient__info__buttons">
            <Button content={"삭제"} onClick={() => alert("삭제버튼 누름")} />
            <Button content={"수정"} onClick={() => alert("수정버튼 누름")} />
          </div>
        </div>
        <form>
          <select
            className="patient__info__dropdown"
            onChange={handleChangeOption}
            value={selectedValue}
          >
            {sessions ? (
              sessions.map((item) => (
                <option
                  key={patient.id + "/" + item.session}
                  value={patient.id + "/" + item.session}
                >
                  {item.session}회차 / {item.date}
                </option>
              ))
            ) : (
              <></>
            )}
          </select>
        </form>
      </div>
    </div>
  );
}
