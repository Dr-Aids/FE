import { useLocation, useNavigate } from "react-router-dom";
import "./PatientRow.css";
import InHospitalIcon from "./ui/InHospital";
import type { PatientListRow } from "../types/patientSummaryType";
import { useEffect, useState } from "react";

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
  const [seesionLength, setSessionLength] = useState<number>(0);
  const nav = useNavigate();
  const location = useLocation();
  const pageName = location.pathname.split("/")[1];
  function handleClickPatientRow() {
    // if (pageName === "remark") nav(`/${pageName}/${id}`);
    nav(`/${pageName}/${id}/${seesionLength}`);
  }

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const fetchAllSession = async () => {
      try {
        if (!accessToken)
          throw new Error("잘못된 접근입니다 - 로그인 후 시도해주세요");

        const response = await fetch(`/api/session?patientId=${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!response.ok) throw new Error(`HTTP Error - ${response.status}`);
        const data = await response.json();

        setSessionLength(data.length);
      } catch (err) {
        console.log("에러메세지(fetchAllSession) : ", err);
      }
    };
    fetchAllSession();
  }, []);
  return (
    <div
      className="patient__row__container"
      style={
        index % 2 === 0
          ? { backgroundColor: "#cbe8ee" }
          : { backgroundColor: "#E6F1FD" }
      }
      onClick={handleClickPatientRow}
    >
      <div className="patient__name">
        {name} ({gender === "MALE" ? "남" : "여"})
      </div>

      <div className="patient__age">
        {age}세, {birth}
      </div>
      <InHospitalIcon inHospital={visiting} />
    </div>
  );
}
