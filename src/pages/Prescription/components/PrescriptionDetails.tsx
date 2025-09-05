import { useParams } from "react-router-dom";
import BloodResultChart from "./BloodResultChart";
import HbLineChart from "./HbLineChart";
import "./PrescriptionDetails.css";
import PrescriptionTable from "./PrescriptionTable";
import { useEffect } from "react";

export default function PrescriptionDetails() {
  const { patientId, date } = useParams<{
    patientId: string;
    date: string;
  }>();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    const fetchBloodResult = async () => {
      try {
        if (!accessToken) throw new Error("잘못된 접근입니다");

        const response = await fetch(
          `/api/blood-test/:patientId/:targetDate/all?patientId=${patientId}&targetDate=${date}-01`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (!response.ok) throw new Error(`HTTP Error - ${response.status}`);
        const data = await response.json();
      } catch (err) {
        console.log("에러메세지(fetchBloodResult) : ", err);
      }
    };

    const fetchHb = async () => {
      try {
        if (!accessToken) throw new Error("잘못된 접근입니다");

        const response = await fetch(
          `/api/blood-test/:patientId/:targetDate/only-hb?patientId=${patientId}&targetDate=${date}-01`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (!response.ok) throw new Error(`HTTP Error - ${response.status}`);
        const data = await response.json();
      } catch (err) {
        console.log("에러메세지(fetchBloodResult) : ", err);
      }
    };

    Promise.all([fetchBloodResult(), fetchHb()]);
  }, [patientId, date]);
  return (
    <div className="prescription__details__container">
      <div className="prescription__detail__graphs">
        <div className="prescription__blood__result__container">
          혈액 검사 결과
          <BloodResultChart />
        </div>
        <div className="prescription__hb__container">
          헤모글로빈
          <HbLineChart />
        </div>
      </div>
      <PrescriptionTable patientId={patientId!} date={date!} />
    </div>
  );
}
