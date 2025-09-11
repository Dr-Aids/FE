import { useParams } from "react-router-dom";
import BloodResultChart from "./components/Charts/BloodResultChart";
import HbLineChart from "./components/Charts/HbLineChart";
import "./PrescriptionPage.css";
import PrescriptionTable from "./components/PrescriptionTable";
import { useEffect, useState } from "react";
import type { BloodResult, Hb } from "../../types/PrescriptionTypes";

export default function PrescriptionPage() {
  const { patientId, date: rawDate } = useParams<{
    patientId: string;
    date: string;
  }>();

  const date = rawDate!.slice(0, 7);

  const [bloodResult, setBloodResult] = useState<BloodResult[] | null>(null);
  const [hb, setHb] = useState<Hb[] | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    const fetchBloodResult = async () => {
      try {
        if (!accessToken) throw new Error("잘못된 접근입니다");

        const response = await fetch(
          `/api/blood-test/all?patientId=${patientId}&targetDate=${rawDate}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (!response.ok) throw new Error(`HTTP Error - ${response.status}`);
        const data = await response.json();
        setBloodResult(data);
      } catch (err) {
        console.log("에러메세지(fetchBloodResult) : ", err);
      }
    };

    const fetchHb = async () => {
      try {
        if (!accessToken) throw new Error("잘못된 접근입니다");

        const response = await fetch(
          `/api/blood-test/only-hb?patientId=${patientId}&targetDate=${date}-01`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (!response.ok) throw new Error(`HTTP Error - ${response.status}`);
        const data = await response.json();
        setHb(data);
      } catch (err) {
        console.log("에러메세지(fetchBloodResult) : ", err);
      }
    };

    Promise.all([fetchBloodResult(), fetchHb()]);
  }, [patientId, date]);
  return (
    <div className="prescription__details__container">
      <div className="prescription__detail__graphs">
        <div className="prescription__blood__result__container card-container">
          <h3
            style={{
              color: "#1e6774",
            }}
          >
            혈액 검사 결과
          </h3>
          <BloodResultChart data={bloodResult} />
        </div>
        <div className="prescription__hb__container card-container">
          <h3
            style={{
              color: "#1e6774",
            }}
          >
            헤모글로빈
          </h3>
          <HbLineChart data={hb} />
        </div>
      </div>
      <PrescriptionTable patientId={patientId!} date={date!} />
    </div>
  );
}
