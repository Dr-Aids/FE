import "./MainContentWithPatient.css";
import PatientSummaryCard from "../components/PatientSummaryCard.tsx";
import { Outlet, useLocation, useParams } from "react-router-dom";
import PatientListPage from "../components/PatientListPage";
import SectionHeader from "../components/SectionHeader.tsx";
import { useEffect, useState } from "react";
import type { PatientListRow } from "../types/patientSummaryType.ts";

export default function MainContentWithPatient() {
  const { patientId, session } = useParams<{
    patientId: string;
    session: string;
  }>();

  const location = useLocation();
  const pageName = location.pathname.split("/")[1];

  const [patients, setPatients] = useState<PatientListRow[] | null>([]);

  // 환자목록 fetching하는 함수
  const fetchPatients = async () => {
    try {
      // 로그인 되어 있는지 확인 -> 액세스 토큰 저장되어 있는지
      // 없으면 잘못된 접근입니다. 메세지 띄워주기
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("잘못된 접근입니다");

      // 여기까지 온거면 로그인은 되어 있는 상태
      const response = await fetch("/api/patient/list", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      setPatients(data);
    } catch (err) {
      console.log("error : ", err);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="with-patient-layout__container">
      <div className="with-patient-layout__main__content">
        {!patientId && !session ? (
          <SectionHeader title={pageName}></SectionHeader>
        ) : (
          <SectionHeader title={pageName}>
            <PatientSummaryCard />
          </SectionHeader>
        )}
        <Outlet />
      </div>

      <PatientListPage patients={patients} onPatientModified={fetchPatients} />
    </div>
  );
}
