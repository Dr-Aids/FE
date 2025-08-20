import "./PatientsList.css";
import PatientRow from "./PatientRow";
import { useEffect, useState } from "react";

export default function PatientsList() {
  const [patients, setPatients] = useState([{}]);
  useEffect(() => {
    // 환자목록 fetching하는 함수
    const fetchPatients = async () => {
      try {
        // 로그인 되어 있는지 확인 -> 액세스 토큰 저장되어 있는지
        // 없으면 잘못된 접근입니다. 메세지 띄워주기
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw "잘못된 접근입니다";

        // 여기까지 온거면 로그인은 되어 있는 상태
        const response = await fetch("/api/patient/list", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const data = await response.json();
        setPatients(data);
      } catch (err) {
        console.log("error : ", err);
      }
    };

    // 실제 호출 부분
    fetchPatients();
  }, [patients]);
  return (
    <div className="patients__list__container">
      <div className="patients__list__title">
        <div>Patients / gender</div>
        <div>age / birth</div>
        <div>구분</div>
      </div>
      <div className="patients__list__list">
        {patients.map((patient, i) => (
          <PatientRow key={i} {...patient} index={i} />
        ))}
      </div>
    </div>
  );
}
